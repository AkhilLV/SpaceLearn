const pool = require("../db/db");

module.exports = {
  get: async (req, res) => {
    const { cardId } = req.params;

    try {
      const tasks = await pool.query(
        "SELECT task_id, task_text FROM tasks WHERE card_id = $1",
        [cardId]
      );
      res.send(tasks.rows);
    } catch (err) {
      res.status(500).send({ message: "tasks not fetched" });
      throw err;
    }
  },

  getTasksByDate: async (req, res) => {
    const { cardId } = req.params;

    try {
      const tasks = await pool.query(
        `SELECT tasks.task_id AS "taskId", task_date_id AS "taskDateId", task_text AS "taskText", task_done AS "taskDone" FROM tasks
        INNER JOIN task_dates ON tasks.task_id = task_dates.task_id
        WHERE tasks.card_id = $1 AND task_date = $2`,
        [cardId, req.query.date]
      );
      res.send(tasks.rows);
    } catch (err) {
      res.status(500).send({ message: "tasks not fetched" });
      throw err;
    }
  },

  getAll: async (req, res) => {
    const { cardId } = req.params;

    try {
      const tasks = await pool.query(
        "SELECT task_id, task_text FROM tasks WHERE card_id = $1",
        [cardId]
      );
      res.send(tasks.rows);
    } catch (err) {
      res.status(500).send({ message: "tasks not fetched" });
      throw err;
    }
  },

  post: async (req, res) => {
    const { cardId } = req.params;
    const { taskText, taskDates } = req.body;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const taskId = await client.query(
        "INSERT INTO tasks (card_id, task_text) VALUES ($1, $2) RETURNING task_id",
        [cardId, taskText]
      );

      // https://stackoverflow.com/questions/61315162/js-array-map-returning-empty
      const addedTaskDates = await Promise.all(
        taskDates.map(async (taskDate) => {
          const taskDateSQL = await client.query(
            // sql needs a "" wrapper around aliases to prevent conversions to lowercase
            // eslint-disable-next-line quotes
            'INSERT INTO task_dates (task_id, task_date) VALUES ($1, $2) RETURNING task_date_id AS "taskDateId", task_date AS "taskDate"',
            [taskId.rows[0].task_id, taskDate]
          );

          return taskDateSQL.rows[0];
        })
      );

      await client.query("COMMIT");
      res.send({
        data: {
          task: {
            taskId: taskId.rows[0].task_id,
            taskText,
            taskDates: addedTaskDates,
          },
        },
        message: "task added",
      });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).send({ message: "task not added" });
      throw err;
    } finally {
      client.release();
    }
  },

  updateTask: async (req, res) => {
    const { taskId } = req.params;
    const { taskText, taskDates } = req.body;

    try {
      await pool.query("UPDATE tasks SET task_text = $1 WHERE task_id = $2", [
        taskText,
        taskId,
      ]);

      res.send({ message: "task text updated" });
    } catch (err) {
      res.status(500).send({ message: "task text not updated" });
      throw err;
    }
  },

  patch: async (req, res) => {
    const { taskId } = req.params;
    const { taskText } = req.body;
    try {
      await pool.query("UPDATE tasks SET task_text = $1 WHERE task_id = $2", [
        taskText,
        taskId,
      ]);

      // TODO

      // we want keep the taskDates that are already in the database,
      // but remove the ones that are not in the request
      // also add the ones that are in the request but not in the database

      res.send({ message: "task status updated" });
    } catch (err) {
      res.status(500).send({ message: "task status not updated" });
      throw err;
    }
  },

  crossTask: async (req, res) => {
    const { taskDateId } = req.params;
    const { taskDone } = req.query;

    try {
      await pool.query(
        "UPDATE task_dates SET task_done = $1 WHERE task_date_id = $2",
        [taskDone, taskDateId]
      );
      res.send({ message: "task status updated" });
    } catch (err) {
      res.status(500).send({ message: "task status not updated" });
      throw err;
    }
  },

  delete: async (req, res) => {
    const { taskId } = req.params;

    try {
      await pool.query("DELETE FROM tasks WHERE task_id = $1", [taskId]);
      res.send({ message: "task deleted" });
    } catch (err) {
      res.status(500).send({ message: "task not deleted" });
      throw err;
    }
  },
};

// todo:
// res sends success if id not found
