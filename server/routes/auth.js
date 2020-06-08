const express = require("express");
const { body } = require("express-validator/check");
const authController = require("../controllers/auth");
const admin = require("../models/admin");
const router = express.Router();

router.post("/login", authController.login);
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return admin.findOne({ email: value }).then((adminDoc) => {
          if (adminDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.register
);

module.exports = router;
