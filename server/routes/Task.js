const express = require("express");

const router = express.Router({ mergeParams: true });

const controller = require("../controllers/TaskController");

router.get("/", controller.get);
router.post("/", controller.post);

router.put("/:taskId", controller.updateText);
router.patch("/:taskId/:cardDateId", controller.updateStatus);
router.delete("/:taskId", controller.delete);

module.exports = router;
