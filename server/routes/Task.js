const express = require("express");

const router = express.Router({ mergeParams: true });

const controller = require("../controllers/TaskController");

router.get("/", controller.get);
router.post("/", controller.post);

router.put("/:taskId", controller.put);
router.patch("/:taskId/:cardDateId", controller.patch);
router.delete("/:taskId", controller.delete);

module.exports = router;
