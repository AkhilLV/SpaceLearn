const express = require("express");
const {
  body, check, param, validationResult,
} = require("express-validator");

const ApiError = require("../error/ApiError");

const router = express.Router();
const controller = require("../controllers/CardController");

router.get("/", controller.getAll);

router.post(
  "/",
  body("cardName").isString().isLength({ min: 1 }),
  body("cardDates").isArray({ min: 1 }),
  check("cardDates.*").isISO8601(), // checks if each item in [cardDates] is a date
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.post(req, res);
  },
);

router.get(
  "/:cardId",
  param("cardId").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.get(req, res);
  },
);

router.delete(
  "/:cardId",
  param("cardId").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.delete(req, res);
  },
);

module.exports = router;
