const express = require("express");
const cors = require("cors");

require("dotenv").config();

const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

const cookieParser = require("cookie-parser");
const session = require("express-session");

const PgSession = require("connect-pg-simple")(session);
const pool = require("./db/db");

const isLoggedIn = require("./middleware/isLoggedIn");

const AuthRoute = require("./routes/Auth");
const CardRoute = require("./routes/Card");
const TaskRoute = require("./routes/Task");

const apiErrorHandler = require("./error/apiErrorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  session({
    store: new PgSession({ pool }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/auth", AuthRoute);
app.use("/cards", isLoggedIn, CardRoute);
CardRoute.use("/:cardId/tasks", isLoggedIn, TaskRoute);

app.use(apiErrorHandler);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));

module.exports = app; // for testing
