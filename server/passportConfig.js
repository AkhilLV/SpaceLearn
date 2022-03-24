const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const db = require("./db/db");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      db.query("SELECT * FROM users WHERE username = $1", [username], (error, user) => {
        if (error) throw error;
        console.log(user);
        if (user.rowCount === 0) return done(null, false); // -> no error, no user

        const correctPassword = user.rows[0].password;
        bcrypt.compare(password, correctPassword, (error, result) => {
          if (error) throw error;
          if (result === true) {
            return done(null, user);
          }
          return done(null, false);
        });
      });
    }),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.rows[0].user_id); // serialize stores a cookie with user.id inside of it
  });

  passport.deserializeUser((id, cb) => {
    db.query("SELECT * FROM users WHERE user_id = $1", [id], (error, user) => {
      cb(error, user.rows[0]);
    });
  });
};
