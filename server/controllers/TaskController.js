const pool = require("../db/db");

module.exports = {
  get: async (req, res) => {
    const tasks = await pool.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [req.params.cardId]);
    res.send(tasks.rows);
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
      res.status(200).send({ message: "task added" });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(400).send({ message: "task not added" });
      throw err;
    } finally {
      client.release();
    }
  },

  put: async (req, res) => {
    const { taskId } = req.params;
    const { taskText } = req.body;

    if (typeof taskId !== "number") return res.send({ message: "taskId should be a number" });
    if (typeof taskText !== "string") return res.send({ message: "taskText should be a string" });

    await pool.query("UPDATE tasks SET task_text = $1 WHERE task_id = $2", [taskText, taskId]);
    res.send({ message: "Success" });
  },

  patch: async (req, res) => {
    const { taskId, cardDateId } = req.params;
    const { taskDone } = req.body;

    if (typeof taskDone !== "boolean") return res.status(404).send({ message: "taskDone should be boolean" });

    try {
      await pool.query("UPDATE task_status SET task_done = $1 WHERE task_id = $2 AND card_date_id = $3", [taskDone, taskId, cardDateId]);
      res.send({ message: "Success" });
    } catch (err) {
      res.status(400).send({ message: "task not patched" });
      throw err;
    }
  },

  delete: async (req, res) => {
    await pool.query("DELETE FROM tasks WHERE task_id = $1", [req.params.taskId]);
    res.send({ message: "Success" });
  },
};

// todo:
// res sends success if id not found
