const express = require("express");
const { body, param, validationResult } = require("express-validator");

const router = express.Router();
const controller = require("../controllers/CardController");

router.get("/", controller.getAll);

router.post(
  "/",
  body("cardName").isString(),
  body("cardDates").isArray({ min: 1 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    controller.post(req, res);
  },
);

// test if cardId exists
router.get(
  "/:cardId",
  param("cardId").isInt(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    controller.get(req, res);
  },
);

router.delete(
  "/:cardId",
  param("cardId").isInt(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    controller.delete(req, res);
  },
);

module.exports = router;
