const pool = require("../db/db");

module.exports = {
  getAll: (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });

    pool.query("SELECT card_id, card_name FROM cards WHERE user_id = $1", [req.user.user_id], (error, result) => {
      if (error) throw error;
      res.send(result.rows);
    });
  },
  post: async (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const cardId = await client.query("INSERT INTO cards (user_id, card_name) VALUES ($1, $2) RETURNING card_id", [req.user.user_id, req.body.cardName]);

      req.body.cardDates.forEach(async (cardDate) => {
        await client.query("INSERT INTO card_dates (card_id, card_date) VALUES ($1, $2)", [cardId.rows[0].card_id, cardDate]);
      });

      await client.query("COMMIT");
      res.status(200).send({ message: "Success" });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  get: (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });

    const resObj = {
      cardName,
      tasks: [
        {
          taskName,
          taskDates: {
            date: true,
          },
        },
      ],
    };
  },
  put: (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });
  },
  delete: (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });
  },
};

// maybe delegate user.auth checks to Route?
