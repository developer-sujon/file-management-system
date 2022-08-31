//external import
const { model, Schema } = require("mongoose");

const otpSchema = new Schema(
  {
    otpCode: {
      type: String,
      required: true,
    },
    otpStatus: {
      type: Number,
      default: 0,
      required: true,
    },
    otpCodeExpire: {
      type: Number,
      default: Date.now() + 30 * 60 * 1000,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (prop) => `Invalid Email Address: ${prop.value}`,
      },
      unique: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const OtpModel = model("Otp", otpSchema);
module.exports = OtpModel;
