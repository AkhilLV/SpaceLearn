const { Pool } = require("pg");

const isTestDatabase = process.env.NODE_ENV === "test" && true;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: isTestDatabase ? "space_learn_test" : "space_learn",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

module.exports = pool;
