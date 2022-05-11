const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(400).send({ message: "not_logged_in" });
};

module.exports = isLoggedIn;
