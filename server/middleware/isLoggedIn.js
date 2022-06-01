const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  if (process.env.NODE_ENV === "test") {
    req.user = {};
    req.user.user_id = 1;
    return next();
  }

  res.status(400).send({ message: "not_logged_in" });
};

module.exports = isLoggedIn;
