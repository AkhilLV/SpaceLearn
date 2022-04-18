DROP DATABASE IF EXISTS space_learn;

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
  card_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS card_dates (
  card_date_id BIGSERIAL NOT NULL PRIMARY KEY,
  card_id INTEGER NOT NULL REFERENCES cards (card_id) ON DELETE CASCADE,
  card_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  task_id BIGSERIAL NOT NULL PRIMARY KEY,
  card_id INTEGER NOT NULL REFERENCES cards (card_id) ON DELETE CASCADE,
  task_text VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS task_status (
  task_status_id BIGSERIAL NOT NULL PRIMARY KEY,
  task_id INTEGER NOT NULL REFERENCES tasks (task_id),
  card_date_id INTEGER NOT NULL REFERENCES card_dates (card_date_id),
  task_done BOOLEAN DEFAULT FALSE NOT NULL
);

-- Creates a session store for passport.js/express sessions
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
