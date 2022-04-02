const pool = require("../db/db");

module.exports = {
  get: async (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });

    const tasks = await pool.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [req.params.cardId]);
    res.send(tasks.rows);
  },
  post: async (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });

    await pool.query("INSERT INTO tasks (card_id, task_text) VALUES ($1, $2)", [req.params.cardId, req.body.taskText]);
    res.send({ message: "Success" });
  },
  put: async (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });

    await pool.query("UPDATE tasks SET task_text = $1 WHERE task_id = $2", [req.body.taskText, req.params.taskId]);
    res.send({ message: "Success" });
  },
  delete: async (req, res) => {
    if (!req.user) return res.status(404).send({ message: "not_logged_in" });

    await pool.query("DELETE FROM tasks WHERE task_id = $1", [req.params.taskId]);
    res.send({ message: "Success" });
  },
};

// todo:
// res sends success if id not found
