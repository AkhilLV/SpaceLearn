const passport = require("passport");
const bcrypt = require("bcryptjs");
const pool = require("../db/db");

const ApiError = require("../error/ApiError");

module.exports = {
  login: (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) throw err;
      if (!user) {
        next(ApiError.badRequest({ message: "user_not_found" })); // change message to error, breaking change
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({ message: "user_logged_in" });
        });
      }
    })(req, res, next);
  },
  register: async (req, res, next) => {
    const { username, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    pool.query("SELECT username FROM users WHERE username = $1", [username], (err, result) => {
      if (err) throw err;
      if (result.rows.length) return next(ApiError.badRequest({ message: "user_exists" }));

      pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, encryptedPassword], (err) => {
        if (err) throw err;
        res.send({ message: "user_added" });
      });
    });
  },
};
