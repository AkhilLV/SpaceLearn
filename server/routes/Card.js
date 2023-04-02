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

router.get(
  "/",
  query("date").optional().isISO8601(),
  query("startDate").optional().isISO8601(),
  query("endDate").optional().isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    if (req.query.date) {
      controller.getAllByDate(req, res, next);
      return;
    }

    if (req.query.startDate && req.query.endDate) {
      controller.getAllBetweenDates(req, res, next);
      return;
    }

    controller.getAll(req, res, next);
  }
);

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
