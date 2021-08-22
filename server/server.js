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
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000", // location of the react app were connecting to
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
app.post("/login", (req, res) => {

})

app.post("/register", async (req, res) => {

})

app.get("/getUser", (req, res) => {

})

// Start Server
app.listen(4000, () => {
  console.log("Server is running at PORT: 4000")
})