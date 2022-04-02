const pool = require("../db/db");

module.exports = {
  get: (req, res) => {
    if (!req.user) return res.status(400).send({ message: "not_logged_in" });

    console.log(req.params);
  },
  post: (req, res) => {
    if (!req.user) return res.status(400).send({ message: "not_logged_in" });

    console.log(req.params);
  },
  put: (req, res) => {
    if (!req.user) return res.status(400).send({ message: "not_logged_in" });

    console.log(req);
  },
  delete: (req, res) => {
    if (!req.user) return res.status(400).send({ message: "not_logged_in" });
  },
};
