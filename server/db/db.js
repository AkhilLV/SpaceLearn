const { Pool } = require("pg");

const pool = new Pool({
  user: "akhil",
  password: "password",
  database: "space_learn",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
