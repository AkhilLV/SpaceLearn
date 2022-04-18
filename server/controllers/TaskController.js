const pool = require("../db/db");

module.exports = {
  get: async (req, res) => {
    const tasks = await pool.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [req.params.cardId]);
    res.send(tasks.rows);
  },
  post: async (req, res) => {
    const client = await pool.connect();
    try {
      const { cardId } = req.params;
      await client.query("BEGIN");
      const taskId = await client.query("INSERT INTO tasks (card_id, task_text) VALUES ($1, $2) RETURNING task_id", [cardId, req.body.taskText]);

      const cardDateIds = await client.query("SELECT card_date_id FROM card_dates WHERE card_id = $1", [cardId]);
      cardDateIds.rows.forEach(async (cardDateId) => {
        await client.query("INSERT INTO task_status (task_id, card_date_id) VALUES ($1, $2)", [taskId.rows[0].task_id, cardDateId.card_date_id]);
      });

      await client.query("COMMIT");
      res.status(200).send({ message: "Success" });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(400).send({ message: "Failed" });
      throw err;
    } finally {
      client.release();
    }
  },
  put: async (req, res) => {
    await pool.query("UPDATE tasks SET task_text = $1 WHERE task_id = $2", [req.body.taskText, req.params.taskId]);
    res.send({ message: "Success" });
  },
  delete: async (req, res) => {
    await pool.query("DELETE FROM tasks WHERE task_id = $1", [req.params.taskId]);
    res.send({ message: "Success" });
  },
};

// todo:
// res sends success if id not found
