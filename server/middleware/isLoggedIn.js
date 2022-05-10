const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ message: "not_logged_in" });
};

module.exports = isLoggedIn;
