const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const pool = require("./db/db");

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
      pool,
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

app.post("/crossTask", (req, res) => {
  if (!req.user) return res.status(400).send({ message: "not_logged_in" });

  pool.query(`UPDATE tasks SET ${req.body.task_day} = ${req.body.set_to} WHERE task_id = $1`, [req.body.task_id], (error) => {
    if (error) throw error;
    pool.query("SELECT task_id, task_text, done_day_one, done_day_two, done_day_three, done_day_four FROM tasks WHERE card_id = $1", [req.body.card_id], (error, result) => {
      if (error) throw error;
      res.send(result.rows);
    });
  });
});

app.listen(PORT, () => console.log("Server is running at PORT: 4000"));

// Todo
// Seed database
// Test APIs
