const express = require("express");
const {
  body,
  check,
  param,
  query,
  validationResult,
} = require("express-validator");

const ApiError = require("../error/ApiError");

const router = express.Router();
const controller = require("../controllers/CardController");

router.get("/", (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(ApiError.badRequest({ errors: errors.array() }));
    return;
  }

  controller.getAll(req, res, next);
});

router.get("/:cardId", param("cardId").isInt(), (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(ApiError.badRequest({ errors: errors.array() }));
    return;
  }

  controller.get(req, res, next);
});

router.post(
  "/",
  body("cardName").isString().isLength({ min: 1 }),
  body("cardColor").isHexColor(),
  // check("cardDates.*").isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.post(req, res, next);
  }
);

router.patch(
  "/:cardId",
  param("cardId").isInt(),
  body("cardName").isString().isLength({ min: 1 }),
  body("cardColor").isHexColor(),
  // body("cardDates").isArray({ min: 1 }),
  // check("cardDates.*.cardDateId").isInt(),
  // check("cardDates.*.cardDate").isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.updateCard(req, res, next);
  }
);

router.delete("/:cardId", param("cardId").isInt(), (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(ApiError.badRequest({ errors: errors.array() }));
    return;
  }

  controller.delete(req, res, next);
});

module.exports = router;
