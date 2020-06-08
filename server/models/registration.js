const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema(
  {
    Fullname: {
      type: String,
      required: true,
    },
    MobileNumber: {
      type: Number,
      required: true,
    },
    EmailId: {
      type: String,
      required: true,
      unique: true,
    },
    IdCardUrl: {
      type: String,
      required: true,
    },
    RegistrationType: {
      type: String,
      required: true,
    },
    TicketNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
