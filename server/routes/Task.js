const express = require("express");

const router = express.Router({ mergeParams: true });

const controller = require("../controllers/TaskController");

router.get("/", controller.get); // wrong? /cards/1/tasks
router.post("/", controller.post);

module.exports = router;

// should cards carry tasks with it?
