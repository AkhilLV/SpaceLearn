const cors = require("cors")
const express = require("express")
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
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
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
app.post("/login", passport.authenticate('local'), (req, res) => {
  console.log("/login: ", req.user)

  res.send("Logged in")
})

app.post("/register", async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10)

  db.get(`SELECT * FROM users WHERE username = ?`, [req.body.username], (err, row) => {
    if (row) {
      console.log("User exists")
      res.send({ message: "User exists" })
    } else {
      db.run("Insert INTO users (username, password) values (?, ?)", [req.body.username, encryptedPassword], (err) => {
        if (err) { console.log(err) }

        console.log("User added")
        res.send({ message: "User added" })
      })
    }
  })
})

app.get("/tasks", (req, res) => {
  console.log("Tasks", req.user)
  res.send(req.user)
})

// Start Server
app.listen(4000, () => {
  console.log("Server is running at PORT: 4000")
})