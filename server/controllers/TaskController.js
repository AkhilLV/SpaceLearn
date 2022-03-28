const db = require("../db/db");

module.exports = {
  get: (req, res) => {
    if (!req.user) return res.send("Please log in");

    console.log(req.params);
  },
  post: (req, res) => {
    if (!req.user) return res.send("Please log in");

    console.log(req.params);
  },
  put: (req, res) => {
    if (!req.user) return res.send("Please log in");

    console.log(req);
  },
  delete: (req, res) => {
    if (!req.user) return res.send("Please log in");
  },
};
