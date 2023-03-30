const express = require("express");
const { body, param, validationResult, check } = require("express-validator");

const ApiError = require("../error/ApiError");

const router = express.Router({ mergeParams: true });

const controller = require("../controllers/TaskController");

router.get("/", param("cardId").isInt(), (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(ApiError.badRequest({ errors: errors.array() }));
    return;
  }

  if (req.query.date) {
    controller.getTasksByDate(req, res);
    return;
  }

  controller.get(req, res);
});

router.post(
  "/",
  param("cardId").isInt(),
  body("taskText").isString().isLength({ min: 1 }),
  body("taskDates").isArray({ min: 1 }),
  check("taskDates.*").isISO8601(),
  (req, res, next) => {
    console.log(req.params, req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.post(req, res);
  }
);

router.patch(
  "/:taskId/",
  param("cardId").isInt(),
  param("taskId").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
    }
  }
);

router.put(
  "/:taskId/:taskDateId",
  param("cardId").isInt(),
  param("taskId").isInt(),
  param("taskDateId").isInt(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.crossTask(req, res);
  }
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
  }
);

module.exports = router;
