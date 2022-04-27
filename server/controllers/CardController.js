const pool = require("../db/db");

module.exports = {
  getAll: (req, res) => {
    pool.query("SELECT card_id, card_name FROM cards WHERE user_id = $1", [req.user.user_id], (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    });
  },
  post: async (req, res) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const cardId = await client.query("INSERT INTO cards (user_id, card_name) VALUES ($1, $2) RETURNING card_id", [req.user.user_id, req.body.cardName]);

      req.body.cardDates.forEach(async (cardDate) => {
        await client.query("INSERT INTO card_dates (card_id, card_date) VALUES ($1, $2)", [cardId.rows[0].card_id, cardDate]);
      });

      await client.query("COMMIT");
      res.send({ message: "Success" });
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  get: async (req, res) => {
    const client = await pool.connect();
    const { cardId } = req.params;

    const cardData = await client.query(`
    SELECT json_build_object(
      'cardName', cards.card_name,
      'tasks', json_agg(json_build_object(
        'taskId', tasks.task_id,
        'taskText', tasks.task_text,
        'taskDates', (
          SELECT json_agg(json_build_object(
            'date', card_dates.card_date,
            'done', task_status.task_done
          ))
          FROM (cards
          INNER JOIN card_dates
          ON cards.card_id = card_dates.card_id)
          INNER JOIN task_status
          ON (task_status.task_id = tasks.task_id AND task_status.card_date_id = card_dates.card_date_id)
          GROUP BY cards.card_name
        )
      )
      )
    )
    FROM cards
    INNER JOIN tasks
    ON cards.card_id = tasks.card_id
    WHERE cards.card_id = $1
    GROUP BY cards.card_name;
    `, [cardId]);

    res.send(cardData.rows[0].json_build_object);
  },
  put: (req, res) => {
    
  },
  delete: async (req, res) => {
    await pool.query("DELETE FROM cards WHERE card_id = $1", [req.params.cardId]);
    res.send({ message: "Success" });
  },
};
