# SpaceLearn

A glorified todo-list. Create spaced learning cards for your tasks!

### Features:

1. Create spaced learning cards for upto 4 days

### Upcoming:

1. UI/UX revamp
2. Desktop and mobile notifications

### How to run:

Prerequisites:

- Node.js
- PostgreSQL

1. Run client locally:

   ```bash
   cd client
   npm install
   npm start
   ```

2. ```bash
   cd server
   npm install
   npm run start
   ```

3. Set up postgres database:
   ```bash
   cd server/scripts
   chmod 700 reset-database.sh
   ./reset-database.sh
   ```
