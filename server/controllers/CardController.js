const pool = require("../db/db");

const ApiError = require("../error/ApiError");

module.exports = {
  getAll: async (req, res) => {
    const userId = req.user.user_id;

    try {
      const cards = await pool.query("SELECT card_id, card_name FROM cards WHERE user_id = $1", [userId]);
      res.send(cards.rows);
    } catch (err) {
      res.status(500).send({ message: "cards not fetched" });
      throw err;
    }
  },

  post: async (req, res) => {
    const userId = req.user.user_id;
    const { cardName, cardDates } = req.body;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const cardId = await client.query("INSERT INTO cards (user_id, card_name) VALUES ($1, $2) RETURNING card_id", [userId, cardName]);

      cardDates.forEach(async (cardDate) => {
        await client.query("INSERT INTO card_dates (card_id, card_date) VALUES ($1, $2)", [cardId.rows[0].card_id, cardDate]);
      });

      await client.query("COMMIT");
      res.send({ card: { cardId: cardId.rows[0].card_id }, message: "card added" });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).send({ message: "card not added" });
      throw err;
    } finally {
      client.release();
    }
  },

  get: async (req, res) => {
    const { cardId } = req.params;

    const result = await pool.query("SELECT card_id FROM cards WHERE user_id = $1 AND card_id = $2", [req.user.user_id, cardId]);
    if (result.rows.length === 0) return res.status(403).send({ message: "Unauthorised request" });

    const client = await pool.connect();

    try {
      const cardData = {};
      cardData.cardId = cardId;

      const cardName = await client.query("SELECT card_name FROM cards WHERE card_id = $1 AND user_id = $2", [cardId, req.user.user_id]);

      if (cardName.rows.length === 0) return res.status(400).send({ message: "Invalid cardId" });

      cardData.cardName = cardName.rows[0].card_name;

      const cardDates = await client.query(`
      SELECT json_agg(json_build_object(
        'cardDateId', card_date_id,
        'cardDate', card_date
      )) FROM card_dates WHERE card_id = $1
      `, [cardId]);
      cardData.cardDates = cardDates.rows[0].json_agg;

      const tasks = await client.query(`
      SELECT json_agg((json_build_object(
        'taskId', tasks.task_id,
        'taskText', tasks.task_text,
        'taskDates', (
          SELECT json_object_agg(
            card_dates.card_date, task_status.task_done
          )
          FROM (cards
          INNER JOIN card_dates
          ON cards.card_id = card_dates.card_id)
          INNER JOIN task_status
          ON (task_status.task_id = tasks.task_id AND task_status.card_date_id = card_dates.card_date_id)
          GROUP BY cards.card_name
            )
          )
        ))
        FROM cards
        INNER JOIN tasks
        ON cards.card_id = tasks.card_id
        WHERE cards.card_id = $1
      `, [cardId]);
      cardData.tasks = tasks.rows[0].json_agg;

      res.send(cardData);
    } catch (err) {
      res.status(500).send({ message: "card not fetched" });
      throw err;
    } finally {
      client.release();
    }
  },

  // in dev
  patch: async (req, res) => {
    const { cardId } = req.params;
    const { cardName, cardDates } = req.body;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("UPDATE cards SET card_name = $1 WHERE card_id = $2 RETURNING card_id", [cardName, cardId]);

      cardDates.forEach(async (cardDate) => {
        await client.query("UPDATE card_dates SET card_date = $1 WHERE card_date_id = $2 RETURNING card_id", [cardId.rows[0].card_id, cardDate]);
      });

      await client.query("COMMIT");
      res.send({ message: "card updated" });
    } catch (err) {
      res.status(500).send({ message: "card not updated" });
      throw err;
    } finally {
      client.release();
    }
  },

  delete: async (req, res) => {
    const { cardId } = req.params;

    try {
      await pool.query("DELETE FROM cards WHERE card_id = $1", [cardId]);
      res.send({ message: "card deleted" });
    } catch (err) {
      res.status(500).send({ message: "card not deleted" });
      throw err;
    }
  },
};
