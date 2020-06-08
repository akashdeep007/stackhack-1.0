const express = require("express");
const { body } = require("express-validator/check");

const registrationController = require("../controllers/register");
const isAuth = require("../middleware/is-auth");

const router = express.Router();
//for testing comment out auth
router.get("/registration", isAuth, registrationController.getRegistration);
router.get(
  "/registration/:regId",
  isAuth,
  registrationController.getSingleRegistration
);

router.get("/count/:counttype", isAuth, registrationController.getcount);

router.post(
  "/registration",
  [
    body("Fullname").trim(),
    body("EmailId").trim().isEmail().normalizeEmail(),
    body("MobileNumber").trim().isMobilePhone(),
    body("RegistrationType").trim(),
    body("TicketNumber").trim().isNumeric(),
  ],
  registrationController.postNewRegistration
);

module.exports = router;
