const express = require("express");

const router = express.Router();

const controller = require("../controllers/CardController");

router.get("/", controller.getAll);
router.post("/", controller.post);

router.get("/:cardId", controller.get);
router.put("/:cardId", controller.put);
router.delete("/:cardId", controller.delete);

module.exports = router;
