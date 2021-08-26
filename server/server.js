const express = require("express")
const cors = require("cors")
const passport = require("passport")
const passportLocal = require("passport-local").Strategy
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const session = require("express-session")

const database = require("./db/db.js")
const db = database.db

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
)

app.use(
  session({
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
      res.status(400)
      res.send("No User Exists")
    }
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        console.log("User logged in")
        res.send("Logged in")
      })
    }
  })
    (req, res, next)
})

app.post("/register", async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10)

  db.get(`SELECT * FROM users WHERE username = ?`, [req.body.username], (err, row) => {
    if (row) {
      console.log("User Exists")
    } else {
      db.run("Insert INTO users (username, password) values (?, ?)", [req.body.username, encryptedPassword], (err, res) => {
        if (err) {
          console.log(err)
        }
        console.log("User Added")
      })
    }
  })
})

app.get("/tasks", (req, res) => {
  console.log("tasks")
  console.log(req.user)
  res.send(req.user)
})

// Start Server
app.listen(4000, () => {
  console.log("Server is running at PORT: 4000")
})