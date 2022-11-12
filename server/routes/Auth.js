const express = require("express");
const { body, validationResult } = require("express-validator");

const ApiError = require("../error/ApiError");

const router = express.Router();
const controller = require("../controllers/AuthController");

router.post(
  "/login",
  body("username").isString().isLength({ min: 1 }),
  body("password").isString(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.login(req, res, next);
  }
);

router.post(
  "/register",
  body("username").isString().isLength({ min: 1 }),
  body("password").isString().isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.register(req, res, next);
  }
);

router.post(
  "/reset",
  body("newPassword").isString().isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(ApiError.badRequest({ errors: errors.array() }));
      return;
    }

    controller.reset(req, res, next);
  }
);

router.post("/logout", (req, res, next) => {
  controller.logout(req, res, next);
});

module.exports = router;
