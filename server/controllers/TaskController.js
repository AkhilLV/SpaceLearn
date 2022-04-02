const pool = require("../db/db");

module.exports = {
  get: async (req, res) => {
    if (!req.user) return res.status(400).send({ message: "not_logged_in" });

    const tasks = await pool.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [req.params.cardId]);
    res.send(tasks.rows);
  },
  post: async (req, res) => {
    if (!req.user) return res.status(400).send({ message: "not_logged_in" });

    await pool.query("INSERT INTO tasks (card_id, task_text) VALUES ($1, $2)", [req.params.cardId, req.body.taskText]);
    res.send({ message: "Success" });
  },
  put: (req, res) => {
    if (!req.user) return res.status(400).send({ message: "not_logged_in" });

    console.log(req);
  },
  delete: (req, res) => {
    if (!req.user) return res.status(400).send({ message: "not_logged_in" });
  },
};
