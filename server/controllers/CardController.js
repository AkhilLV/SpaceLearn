const pool = require("../db/db");

const ApiError = require("../error/ApiError");

module.exports = {
  getAll: async (req, res, next) => {
    const userId = req.user.user_id;

    try {
      const cards = await pool.query(
        "SELECT card_id, card_name, card_color FROM cards WHERE user_id = $1",
        [userId]
      );
      res.send(cards.rows);
    } catch (err) {
      next(ApiError.internal({ errors: err }));
      throw err;
    }
  },

  get: async (req, res, next) => {
    const { cardId } = req.params;

    try {
      const card = await pool.query(
        `
      SELECT json_build_object(
        'cardId', cards.card_id,
        'cardName', cards.card_name,
        'tasks', (
          SELECT json_agg(json_build_object(
            'taskId', tasks.task_id,
            'taskText', tasks.task_text,
            'taskDates', (
              SELECT json_agg(json_build_object(
                'taskDateId', task_dates.task_date_id,
                'taskDate', task_dates.task_date,
                'isTaskDone', task_dates.task_done
              ))
              FROM task_dates
              WHERE task_dates.task_id = tasks.task_id
            )
          ))
          FROM tasks
          WHERE tasks.card_id = $1
        )
      ) AS data
      FROM cards
        WHERE cards.card_id = $1
    `,
        [cardId]
      );

      res.send(card.rows[0]);
    } catch (err) {
      next(ApiError.internal({ errors: err }));
      throw err;
    }
  },

  getAllByDate: async (req, res, next) => {
    try {
      const tasks = await pool.query(
        `SELECT cards.card_name AS "cardName", tasks.card_id AS "cardId", tasks.task_id AS "taskId", task_date_id AS "taskDateId", task_text AS "taskText", task_done AS "taskDone" FROM tasks
      INNER JOIN task_dates ON tasks.task_id = task_dates.task_id
      INNER JOIN cards ON tasks.card_id = cards.card_id
      WHERE task_date = $1 AND cards.user_id = $2`,
        [req.query.date, req.user.user_id]
      );

      res.json(tasks.rows);
    } catch (err) {
      next(ApiError.internal({ errors: err }));
      throw err;
    }
  },

  getAllBetweenDates: async (req, res, next) => {
    const { startDate, endDate } = req.query;
    try {
      const tasks = await pool.query(
        `SELECT 
        task_dates.task_date AS date, 
        json_agg(
          json_build_object(
            'taskText', tasks.task_text, 
            'cardName', cards.card_name
          )
        ) AS tasks 
      FROM 
        task_dates 
        JOIN tasks ON task_dates.task_id = tasks.task_id 
        JOIN cards ON tasks.card_id = cards.card_id 
      WHERE 
        task_dates.task_date BETWEEN $1 AND $2
        AND task_dates.task_done = FALSE
        AND cards.user_id = $3
      GROUP BY
        task_dates.task_date
      `,
        [startDate, endDate, req.user.user_id]
      );

      res.json(tasks.rows);
    } catch (err) {
      next(ApiError.internal({ errors: err }));
      throw err;
    }
  },

  post: async (req, res, next) => {
    const userId = req.user.user_id;
    const { cardName, cardColor } = req.body;

    try {
      const newCard = await pool.query(
        "INSERT INTO cards (user_id, card_name, card_color) VALUES ($1, $2, $3) RETURNING card_id, card_name, card_color",
        [userId, cardName, cardColor]
      );

      res.send({
        data: {
          card: {
            cardId: newCard.rows[0].card_id,
            cardName,
            cardColor,
          },
        },
        message: "card added",
      });
    } catch (err) {
      next(ApiError.internal({ errors: err }));
      throw err;
    }
  },

  updateCard: async (req, res, next) => {
    const { cardId } = req.params;
    const { cardName, cardColor } = req.body;

    try {
      await pool.query(
        "UPDATE cards SET card_name = $1, card_color = $2 WHERE card_id = $3",
        [cardName, cardColor, cardId]
      );

      res.send({
        data: {
          card: {
            cardId,
            cardName,
          },
        },
        message: "card name updated",
      });
    } catch (err) {
      next(ApiError.internal({ errors: err }));
      throw err;
    }
  },

  delete: async (req, res, next) => {
    const { cardId } = req.params;

    try {
      await pool.query("DELETE FROM cards WHERE card_id = $1", [cardId]);
      res.send({ message: "card deleted" });
    } catch (err) {
      next(ApiError.internal({ errors: err }));
      throw err;
    }
  },
};
