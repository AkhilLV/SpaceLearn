const pool = require("../db/db");

module.exports = {
  get: async (req, res) => {
    const { cardId } = req.params;

    try {
      const tasks = await pool.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [cardId]);
      res.send(tasks.rows);
    } catch (err) {
      res.status(500).send({ message: "tasks not fetched" });
      throw err;
    }
  },

  post: async (req, res) => {
    const { cardId } = req.params;
    const { taskText } = req.body;

    const client = await pool.connect();

    try {
      const cardDateIds = await client.query("SELECT card_date_id FROM card_dates WHERE card_id = $1", [cardId]);

      await client.query("BEGIN");

      const taskId = await client.query("INSERT INTO tasks (card_id, task_text) VALUES ($1, $2) RETURNING task_id", [cardId, taskText]);
      cardDateIds.rows.forEach(async (cardDateId) => {
        await client.query("INSERT INTO task_status (task_id, card_date_id) VALUES ($1, $2)", [taskId.rows[0].task_id, cardDateId.card_date_id]);
      });

      await client.query("COMMIT");
      res.send({ message: "task added" });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).send({ message: "task not added" });
      throw err;
    } finally {
      client.release();
    }
  },

  updateText: async (req, res) => {
    const { taskId } = req.params;
    const { taskText } = req.body;

    try {
      await pool.query("UPDATE tasks SET task_text = $1 WHERE task_id = $2", [taskText, taskId]);
      res.send({ message: "task updated" });
    } catch (err) {
      res.status(500).send({ message: "task text not updated" });
      throw err;
    }
  },

  updateStatus: async (req, res) => {
    const { taskId, cardDateId } = req.params;
    const { taskDone } = req.body;

    try {
      await pool.query("UPDATE task_status SET task_done = $1 WHERE task_id = $2 AND card_date_id = $3", [taskDone, taskId, cardDateId]);
      res.send({ message: "Success" });
    } catch (err) {
      res.status(500).send({ message: "task status not updated" });
      throw err;
    }
  },

  delete: async (req, res) => {
    const { taskId } = req.params;

    try {
      await pool.query("DELETE FROM tasks WHERE task_id = $1", [taskId]);
      res.send({ message: "task deleted" });
    } catch (err) {
      res.status(500).send({ message: "task not deleted" });
      throw err;
    }
  },
};

// todo:
// res sends success if id not found
