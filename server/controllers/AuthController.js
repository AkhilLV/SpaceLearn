const passport = require("passport");
const bcrypt = require("bcryptjs");
const pool = require("../db/db");

module.exports = {
  login: (req, res, next) => {
    passport.authenticate("local", (error, user) => {
      if (error) throw error;
      if (!user) {
        res.send({ message: "No user", status: 400 });
      } else {
        req.logIn(user, (error) => {
          if (error) throw error;
          res.send({ message: "Logged in", status: 200 });
        });
      }
    })(req, res, next);
  },
  register: async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    pool.query("SELECT username FROM users WHERE username = $1", [req.body.username], (error, result) => {
      if (error) throw error;
      if (result.rows.length) {
        res.send({ message: "Exists", status: 409 }); // user exists
      } else {
        pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, encryptedPassword], (error) => {
          if (error) throw error;
          res.send({ message: "Added", status: 200 });
        });
      }
    });
  },
};
