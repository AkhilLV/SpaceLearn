const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const database = require("./db/db");

const router = express.Router();

const { db } = database;

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(
  session({
    store: new SQLiteStore(),
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Login and register -> authentication
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) throw error;
    if (!user) {
      res.send({ message: "No user", status: 406 }); // 406 = unacceptable information
    } else {
      req.logIn(user, (error) => {
        if (error) throw error;
        res.send({ message: "Logged in", status: 200 });
      });
    }
  })(req, res, next);
});

app.post("/register", async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  db.get("SELECT * FROM users WHERE username = ?", [req.body.username], (error, row) => {
    if (row) {
      res.send({ message: "Exists", status: 409 }); // conflict with current state since user exists
    } else {
      db.run("Insert INTO users (username, password) values (?, ?)", [req.body.username, encryptedPassword], (error) => {
        if (error) {
          console.log(error);
        }
        res.send({ message: "Added", status: 200 });
      });
    }
  });
});

// Cards get their own route

app.post("/addCard", (req, res) => {
  if (!req.user) return res.send("Please log in");

  db.run("INSERT INTO cards (user_id, card_name, card_date) VALUES (?, ?, ?)", [req.user.id, req.body.cardName, req.body.cardDate], (error) => {
    if (error) console.log(error);
    console.log("Card added");
    db.all("SELECT card_id, card_name, card_date FROM cards WHERE user_id = ?", [req.user.id], (error, result) => {
      if (error) console.log(error);
      res.send(result);
    });
  });
});

app.post("/addTask", (req, res) => {
  if (!req.user) return res.send("Please log in");

  db.run("INSERT INTO tasks (card_id, task_text) VALUES (?, ?)", [req.body.cardId, req.body.taskText], (error) => {
    if (error) console.log(error);
    console.log("Task added");

    db.all("SELECT task_id, task_text, done_day_one, done_day_two, done_day_three, done_day_four FROM tasks WHERE card_id = ?", [req.body.cardId], (error, result) => {
      if (error) console.log(error);
      res.send(result);
    });
  });
});

app.get("/getCards", (req, res) => {
  if (!req.user) return res.send("Please log in");

  db.all("SELECT card_id, card_name, card_date FROM cards WHERE user_id = ?", [req.user.id], (error, result) => {
    if (error) console.log(error);
    res.send(result);
  });
});

app.post("/getTasks", (req, res) => {
  if (!req.user) return res.send("Please log in");

  db.all("SELECT task_id, task_text, done_day_one, done_day_two, done_day_three, done_day_four FROM tasks WHERE card_id = ?", [req.body.cardId], (error, result) => {
    if (error) console.log(error);
    res.send(result);
  });
});

app.post("/crossTask", (req, res) => {
  if (!req.user) return res.send("Please log in");

  db.run(`UPDATE tasks SET ${req.body.task_day} = ${req.body.set_to} WHERE task_id = ?`, [req.body.task_id], (error) => {
    if (error) console.log(error);
    db.all("SELECT task_id, task_text, done_day_one, done_day_two, done_day_three, done_day_four FROM tasks WHERE card_id = ?", [req.body.card_id], (error, result) => {
      if (error) console.log(error);
      res.send(result);
    });
  });
});

app.listen(PORT, () => {
  console.log("Server is running at PORT: 4000");
});

// Todo:
// 1. MVC
// 2. Switch to postgres
// 5. Learn to actually create a proper API

// To learn:
// 1. Node.js architecture for rest apis
