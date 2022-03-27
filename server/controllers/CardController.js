const db = require("../db/db");

module.exports = {
  getAll: (req, res) => {
    if (!req.user) return res.send("Please log in");

    db.query("SELECT card_id, card_name FROM cards WHERE user_id = $1", [req.user.user_id], (error, result) => {
      if (error) throw error;
      res.send(result.rows);
    });
  },
  post: (req, res) => {
    if (!req.user) return res.send("Please log in");

    db.query("INSERT INTO cards (user_id, card_name) VALUES ($1, $2) RETURNING card_id", [req.user.user_id, req.body.cardName], (error, cardId) => {
      if (error) throw error;
      console.log();

      

      db.query("SELECT card_id, card_name FROM cards WHERE user_id = $1", [req.user.user_id], (error, result) => {
        if (error) throw error;
        res.send(result.rows);
      });
    });
  },

  get: (req, res) => {
    if (!req.user) return res.send("Please log in");
  },
  put: (req, res) => {
    if (!req.user) return res.send("Please log in");
  },
  delete: (req, res) => {
    if (!req.user) return res.send("Please log in");
  },
};
