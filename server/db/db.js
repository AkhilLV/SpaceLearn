const sqlite3 = require("sqlite3");

const dbFilePath = `${__dirname}/users.db`;
const db = new sqlite3.Database(dbFilePath, (error) => {
  if (error) {
    console.log("Could not connect to database", error);
  } else {
    console.log("Connected to database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS cards (
    card_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    card_name TEXT,
    card_date DATE
  )
`);

// tasks get their own table. include date IN task. do away with day_one, day_two ...
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id INTEGER,
    task_text TEXT,
    done_day_one BOOLEAN DEFAULT FALSE,
    done_day_two BOOLEAN DEFAULT FALSE,
    done_day_three BOOLEAN DEFAULT FALSE,
    done_day_four BOOLEAN DEFAULT FALSE
  )
`);

module.exports = { db };
