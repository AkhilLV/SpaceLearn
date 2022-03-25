const db = require("../db/db");

module.exports = {
  get: (req, res) => {
    if (!req.user) return res.send("Please log in");

    db.query("SELECT card_id, card_name, card_date FROM cards WHERE user_id = $1", [req.user.user_id], (error, result) => {
      if (error) throw error;
      res.send(result.rows);
    });
  },
  post: (req, res) => {
    if (!req.user) return res.send("Please log in");

    db.query("INSERT INTO cards (user_id, card_name, card_date) VALUES ($1, $2, $3)", [req.user.user_id, req.body.cardName, req.body.cardDate], (error) => {
      if (error) throw error;
      db.query("SELECT card_id, card_name, card_date FROM cards WHERE user_id = $1", [req.user.user_id], (error, result) => {
        if (error) throw error;
        res.send(result.rows);
      });
    });
  },
};
