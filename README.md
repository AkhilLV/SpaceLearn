# SpaceLearn

Turn your to-do list into a powerful task manager with spaced learning cards. This method not only helps you manage your tasks effectively but also enhances your retention and learning of the material involved.

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

2. Run server locally:

   ```bash
   cd server
   npm install
   npm start
   ```

3. Set up postgres database:
   ```bash
   cd server/scripts
   chmod 700 reset-database.sh
   ./reset-database.sh
   ```
