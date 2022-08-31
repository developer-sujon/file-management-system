//external import
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//internal import
const UserModel = require("../model/UserModel");
const { createError } = require("../helper/errorHandler");
const generateToken = require("../helper/generateToken");

/**
 * @desc Register User
 * @access public
 * @route /api/v1/auth/registrationUser
 * @methud POST
 */

const registrationUser = async (req, res) => {
  const { name, userName, email, password, phone } = req.body;

  const newUser = UserModel({
    name,
    userName,
    email,
    password,
    phone,
  });

  try {
    if (!name || !email || !password || !userName) {
      throw createError("Invalid Data", 400);
    }

    const exitUser = await UserModel.aggregate([
      { $match: { $or: [{ userName }, { email }, { phone }] } },
    ]);

    if (exitUser && exitUser.length > 0) {
      throw createError("User Already Register", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;

    const user = await newUser.save();

    delete user._doc.password;

    res.status(201).json(user);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Login User
 * @access public
 * @route /api/v1/auth/loginUser
 * @methud POST
 */

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createError("Invalid Data", 400);
    }

    const exitUser = await UserModel.aggregate([{ $match: { email } }]);

    if (!exitUser.length > 0) {
      throw createError("User Not found", 404);
    }

    const verifyPassword = await bcrypt.compare(password, exitUser[0].password);

    if (!verifyPassword) {
      throw createError("Unauthorized Credentials", 401);
    }

    const payLoad = {
      id: exitUser[0]._id,
      userName: exitUser[0].userName,
      roles: exitUser[0].roles,
      email: exitUser[0].email,
    };

    const token = await generateToken(payLoad);

    res.json({
      accessToken: token,
    });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = {
  registrationUser,
  loginUser,
};
