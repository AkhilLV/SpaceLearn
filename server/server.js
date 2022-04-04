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

// Routes
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ message: "not_logged_in" });
};

app.use("/auth", AuthRoute);
app.use("/cards", isLoggedIn, CardRoute);
CardRoute.use("/:cardId/tasks", isLoggedIn, TaskRoute);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
