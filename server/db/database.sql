CREATE DATABASE space_learn;

\c space_learn

CREATE TABLE IF NOT EXISTS users (
  user_id BIGSERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(255) NOT NULl UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cards (
  card_id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (user_id),
  card_name VARCHAR(255) NOT NULL,
  card_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  task_id BIGSERIAL NOT NULL PRIMARY KEY,
  card_id INTEGER NOT NULL REFERENCES cards (card_id),
  task_text VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS task_status (
  task_status_id BIGSERIAL NOT NULL PRIMARY KEY,
  task_id INTEGER NOT NULL REFERENCES tasks (task_id),
  task_date DATE NOT NULL,
  task_done BOOLEAN NOT NULL
);