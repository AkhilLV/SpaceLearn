const { Pool } = require("pg");

const db = new Pool({
  user: "akhil",
  password: "password",
  database: "test1",
  host: "localhost",
  port: 5432,
});

const handleError = (error) => {
  if (error) {
    console.log(error);
  }
};

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    username TEXT,
    password TEXT
  )
`, handleError);

db.query(`
  CREATE TABLE IF NOT EXISTS cards (
    card_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER REFERENCES users (user_id),
    card_name TEXT,
    card_date DATE
  )
`, handleError);

// tasks get their own table. include date IN task. do away with day_one, day_two ...
db.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    task_id BIGSERIAL NOT NULL PRIMARY KEY,
    card_id INTEGER REFERENCES cards (card_id),
    task_text TEXT
  )
`, handleError);

db.query(`
  CREATE TABLE IF NOT EXISTS task_status (
    task_status BIGSERIAL NOT NULL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks (task_id),
    date DATE NOT NULL,
    done BOOLEAN NOT NULL
  )
`, handleError);

module.exports = { db };

// Todo:
// Switch to postgres
// Add foreign key constraints
