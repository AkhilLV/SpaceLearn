const passport = require("passport");
const bcrypt = require("bcryptjs");
const pool = require("../db/db");

module.exports = {
  login: (req, res, next) => {
    passport.authenticate("local", (error, user) => {
      if (error) throw error;
      if (!user) {
        res.status(400).send({ message: "user_not_found" });
      } else {
        req.logIn(user, (error) => {
          if (error) throw error;
          res.send({ message: "user_logged_in" });
        });
      }
    })(req, res, next);
  },
  register: async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    pool.query("SELECT username FROM users WHERE username = $1", [req.body.username], (error, result) => {
      if (error) throw error;
      if (result.rows.length) return res.status(400).send({ message: "user_exists" });

      pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, encryptedPassword], (error) => {
        if (error) throw error;
        res.send({ message: "user_added" });
      });
    });
  },
};
