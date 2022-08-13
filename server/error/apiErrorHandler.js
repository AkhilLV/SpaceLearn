const ApiError = require("./ApiError");

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json("something went wrong");
  throw err;
};

module.exports = apiErrorHandler;
