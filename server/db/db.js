const { Pool } = require("pg");

const isTestDatabase = process.env.NODE_ENV === "test" && true;

const pool = new Pool({
  user: "akhil",
  password: "password",
  database: isTestDatabase ? "space_learn_test" : "space_learn",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
