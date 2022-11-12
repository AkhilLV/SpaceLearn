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

    pool.query(
      "SELECT username FROM users WHERE username = $1",
      [username],
      (err, result) => {
        if (err) throw err;
        if (result.rows.length) {
          return next(ApiError.badRequest({ message: "user_exists" }));
        }

        pool.query(
          "INSERT INTO users (username, password) VALUES ($1, $2)",
          [username, encryptedPassword],
          (err) => {
            if (err) throw err;
            res.send({ message: "user_added" });
          }
        );
      }
    );
  },
  reset: async (req, res, next) => {
    const { newPassword } = req.body;

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    try {
      pool.query("UPDATE users SET password = $1 WHERE user_id = $2", [
        encryptedPassword,
        req.user.user_id,
      ]);
      res.send({
        message: "password updated",
      });
    } catch (err) {
      next(ApiError.internal({ errors: err }));
      throw err;
    }
  },
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(ApiError.internal({ errors: err }));
      }
    });

    res.send("logged out");
  },
};
