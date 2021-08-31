const sqlite3 = require("sqlite3")

const dbFilePath = __dirname + "/users.db"
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.log("Could not connect to database", err)
  } else {
    console.log("Connected to database")
  }
})

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`)

db.run(`
  CREATE TABLE IF NOT EXISTS cards (
    card_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date DATE
  )
`)

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id INTEGER,
    text TEXT,
    done BOOLEAN
  )
`)

module.exports = { db }