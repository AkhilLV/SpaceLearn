const express = require("express")
const cors = require("cors")
const passport = require("passport")
const passportLocal = require("passport-local").Strategy
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const SQLiteStore = require('connect-sqlite3')(session)

const database = require("./db/db.js")
const db = database.db

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(
  session({
    store: new SQLiteStore,
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
)

app.use(cookieParser("secretcode"))

app.use(passport.initialize())
app.use(passport.session())
require("./passportConfig")(passport)

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err
    if (!user) {
      res.send({ message: "No user", status: 406 }) // 406 = unacceptable information
    }
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send({ message: "Logged in", status: 200 })
      })
    }
  })
    (req, res, next)
})

app.post("/register", async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10)

  db.get(`SELECT * FROM users WHERE username = ?`, [req.body.username], (err, row) => {
    if (row) {
      res.send({ message: "Exists", status: 409 }) // conflict with current state since user exists
    } else {
      db.run("Insert INTO users (username, password) values (?, ?)", [req.body.username, encryptedPassword], (err) => {
        if (err) {
          console.log(err)
        }
        res.send({ message: "Added", status: 200 })
      })
    }
  })
})

app.post("/addCard", (req, res) => {
  if (!req.user) return res.send("Please log in")

  db.run("INSERT INTO cards (user_id, card_name, card_date) VALUES (?, ?, ?)", [req.user.id, req.body.cardName, req.body.cardDate], (err) => {
    if (err) console.log(err)
    console.log("Card added")
    db.all("SELECT card_id, card_name, card_date FROM cards WHERE user_id = ?", [req.user.id], (err, result) => {
      if (err) console.log(err)
      res.send(result)
    })
  })
})

app.post("/addTask", (req, res) => {
  if (!req.user) return res.send("Please log in")
})

app.get("/getCards", (req, res) => {
  if (!req.user) return res.send("Please log in")

  db.all("SELECT card_id, card_name, card_date FROM cards WHERE user_id = ?", [req.user.id], (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

// Start Server
app.listen(4000, () => {
  console.log("Server is running at PORT: 4000")
})

