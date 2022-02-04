const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const database = require("./db/db");

const { db } = database;

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      db.get("SELECT * FROM users WHERE username = ?", [username], (error, user) => {
        if (error) throw error;
        if (!user) return done(null, false); // -> no erroror, no user

        // eslint-disable-next-line no-shadow
        bcrypt.compare(password, user.password, (error, result) => {
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
    cb(null, user.id); // serialize stores a cookie with user.id inside of it
  });

  passport.deserializeUser((id, cb) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (error, user) => {
      cb(error, user);
    });
  });
};
