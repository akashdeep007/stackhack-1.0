const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");
const Admin = require("../models/admin");
//login function
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedAdmin;
  Admin.findOne({ email: email })
    .then((Admin) => {
      if (!Admin) {
        const error = new Error("A Admin with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedAdmin = Admin;
      return bcrypt.compare(password, Admin.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedAdmin.email,
          AdminId: loadedAdmin._id.toString(),
        },
        "somesupersecretsecret",
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ token: token, AdminId: loadedAdmin._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const admin = new Admin({
        email: email,
        password: hashedPw,
      });
      return admin.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Admin created!", AdminId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
