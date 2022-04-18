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

  get: (req, res) => {
    // const cardId = req.params.id;
    // const resObj = {
    //   cardName,
    //   tasks: [
    //     {
    //       taskName,
    //       taskDates: {
    //         date: true,
    //       },
    //     },
    //   ],
    // };
    pool.query("SELECT * FROM cards, tasks WHERE cards.card_id = tasks.task_id AND cards.card_id = ", [req.user.user_id], (err, result) => {
      if (err) throw err;
      res.send(result.rows);
    });
  },
  put: (req, res) => {
    
  },
  delete: async (req, res) => {
    await pool.query("DELETE FROM cards WHERE card_id = $1", [req.params.cardId]);
    res.send({ message: "Success" });
  },
};
