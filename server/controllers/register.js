const fs = require("fs");
const path = require("path");
const qr = require("qr-image");

const nodemailer = require("nodemailer");
const sendgridtransport = require("nodemailer-sendgrid-transport");

const { validationResult } = require("express-validator/check");

const Registration = require("../models/registration");

const transporter = nodemailer.createTransport(
  sendgridtransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getRegistration = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 15;
  let totalItems;
  Registration.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Registration.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((Registrations) => {
      res.status(200).json({
        message: "Fetched Registration Details Successfully.",
        Registrations: Registrations,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSingleRegistration = (req, res, next) => {
  const regId = req.params.regId;
  Registration.findById(regId)
    .then((reg) => {
      if (!reg) {
        const error = new Error("Could not find Registration Details");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Registration Details fetched", registration: reg });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postNewRegistration = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const IdCardUrl = req.body.IdCardUrl;
  const Fullname = req.body.Fullname;
  const EmailId = req.body.EmailId;
  const MobileNumber = req.body.MobileNumber;
  const RegistrationType = req.body.RegistrationType;
  const TicketNumber = req.body.TicketNumber;
  Registration.findOne({ EmailId: EmailId }).then((user) => {
    if (user) {
      return res.status(201).json({
        message: " Already Registered ",
        result: user._id,
      });
    }
    const registration = new Registration({
      IdCardUrl: IdCardUrl,
      Fullname: Fullname,
      EmailId: EmailId,
      MobileNumber: MobileNumber,
      RegistrationType: RegistrationType,
      TicketNumber: TicketNumber,
    });
    registration
      .save()
      .then((result) => {
        // Generate QR Code from text
        var qr_png = qr.imageSync(
          [
            result._id,
            result.Fullname,
            result.EmailId,
            result.RegistrationType,
            result.TicketNumber,
          ],
          {
            type: "png",
          }
        );
        // Generate a random file name
        let qr_code_file_name = new Date().getTime() + ".png";
        fs.writeFileSync("./public/qr/" + qr_code_file_name, qr_png, (err) => {
          if (err) {
            throw err;
          }
        });

        transporter.sendMail(
          {
            to: EmailId,
            from: "beingakscool@gmail.com",
            subject: "Registered Succesfully",
            html: "<h5>Your Registration id is " + registration._id + "</h5>",
            attachments: [
              {
                path: "./public/qr/" + qr_code_file_name,
                qr_png,
              },
            ],
          },
          (err, info) => {
            if (err) {
              throw err;
            }
            res.status(201).json({
              message: "Registered successfully!",
              result: result,
            });
          }
        );
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.getcount = (req, res, next) => {
  const counttype = req.params.counttype;
  Registration.countDocuments({ RegistrationType: counttype }, function (
    err,
    result
  ) {
    if (err) {
      throw err;
    } else {
      res.json("Number of documents in the collection: " + result);
    }
  });
};
