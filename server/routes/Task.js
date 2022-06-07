const express = require("express");
const { body, param, validationResult } = require("express-validator");

const ApiError = require("../error/ApiError");

const router = express.Router({ mergeParams: true });

const controller = require("../controllers/TaskController");

router.get(
  "/",
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

router.post(
  "/",
  param("cardId").isInt(),
  body("taskText").isString().isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.post(req, res);
  },
);

router.put(
  "/:taskId",
  param("cardId").isInt(),
  param("taskId").isInt(),
  body("taskText").isString().isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.updateText(req, res);
  },
);

router.patch(
  "/:taskId/:cardDateId",
  param("cardId").isInt(),
  param("taskId").isInt(),
  param("cardDateId").isInt(),
  body("taskDone").isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.updateStatus(req, res);
  },
);

router.delete(
  "/:taskId",
  param("cardId").isInt(),
  param("taskId").isInt(),
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
