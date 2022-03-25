const db = require("../db/db");

module.exports = {
  get: (req, res) => {
    if (!req.user) return res.send("Please log in");

    db.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [req.body.cardId], (error, result) => {
      if (error) throw error;
      res.send(result.rows);
    });
  },
  post: (req, res) => {
    if (!req.user) return res.send("Please log in");

    db.query("INSERT INTO tasks (card_id, task_text) VALUES ($1, $2)", [req.body.cardId, req.body.taskText], (error) => {
      if (error) throw error;

      db.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [req.body.cardId], (error, result) => {
        if (error) throw error;
        res.send(result.rows);
      });
    });
  },
};
