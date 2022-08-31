const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/.test(v);
        },
        message: (prop) => `Invalid Phone Number: ${prop.value}`,
      },
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
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
    password: {
      type: String,
      minlength: [6, "Password is too short"],
      required: true,
    },
    roles: {
      type: [String],
      enum: ["USER", "MODERATOR", "ADMIN"],
      default: ["USER"],
      required: true,
    },
    accountStatus: {
      type: String,
      enum: ["PENDING", "ACTIVE", "REJECTED"],
      default: "PENDING",
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/portfolio-66931.appspot.com/o/client-3.png?alt=media&token=4f615887-cbda-49c9-b279-194fe7b7a802",
    },
  },
  { versionKey: false, timestamps: true },
);

const UserModel = model("User", userSchema);
module.exports = UserModel;
