const bcrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy

const database = require("./db/db.js")
const db = database.db

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) throw err
        if (!user) return done(null, false) // -> no error, no user
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err
          if (result === true) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      })
    })
  )

  passport.serializeUser((user, cb) => {
    cb(null, user.id) // serialize stores a cookie with user.id inside of it
  })

  passport.deserializeUser((id, cb) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
      const userInformation = {
        data: user,
      }
      cb(err, userInformation)
    })
  })
}