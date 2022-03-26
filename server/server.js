const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const db = require("./db/db");

const AuthRoute = require("./routes/Auth");
const CardRoute = require("./routes/Card");
const TaskRoute = require("./routes/Task");

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
    store: new PgSession({
      pool: db,
    }),
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/auth", AuthRoute);
app.use("/cards", CardRoute);
CardRoute.use("/:cardId/tasks", TaskRoute);

app.post("/addTask", (req, res) => {
  if (!req.user) return res.send("Please log in");

  db.query("INSERT INTO tasks (card_id, task_text) VALUES ($1, $2)", [req.body.cardId, req.body.taskText], (error) => {
    if (error) throw error;

    db.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [req.body.cardId], (error, result) => {
      if (error) throw error;
      res.send(result.rows);
    });
  });
});

app.post("/getTasks", (req, res) => {
  if (!req.user) return res.send("Please log in");

  db.query("SELECT task_id, task_text FROM tasks WHERE card_id = $1", [req.body.cardId], (error, result) => {
    if (error) throw error;
    res.send(result.rows);
  });
});

app.post("/crossTask", (req, res) => {
  if (!req.user) return res.send("Please log in");

  db.query(`UPDATE tasks SET ${req.body.task_day} = ${req.body.set_to} WHERE task_id = $1`, [req.body.task_id], (error) => {
    if (error) throw error;
    db.query("SELECT task_id, task_text, done_day_one, done_day_two, done_day_three, done_day_four FROM tasks WHERE card_id = $1", [req.body.card_id], (error, result) => {
      if (error) throw error;
      res.send(result.rows);
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
