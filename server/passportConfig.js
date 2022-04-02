const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("./db/db");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      pool.query("SELECT * FROM users WHERE username = $1", [username], (error, user) => {
        if (error) throw error;
        if (user.rowCount === 0) return done(null, false); // -> no error, no user

        const correctPassword = user.rows[0].password;
        bcrypt.compare(password, correctPassword, (error, result) => {
          if (error) throw error;
          if (result === true) {
            return done(null, user.rows);
          }
          return done(null, false);
        });
      });
    }),
  );

  passport.serializeUser((user, cb) => {
    const userId = user[0].user_id;
    cb(null, userId); // serialize stores a cookie with user.id inside of it
  });

  passport.deserializeUser((id, cb) => {
    pool.query("SELECT user_id, username FROM users WHERE user_id = $1", [id], (error, user) => {
      cb(error, user.rows[0]);
    });
  });
};
