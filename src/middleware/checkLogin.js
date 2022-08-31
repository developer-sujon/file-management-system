//external import
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

//internal import
const { createError } = require("../helper/errorHandler");

const checkLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw createError("Unauthorized Credentials ", 401);
    }

    let token = authorization.split(" ")[1];

    if (!token) {
      throw createError("No Token", 401);
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      throw createError("Invalid Token", 401);
    }

    const user = await User.aggregate([
      { $match: { userName: decoded.userName } },
    ]);

    if (!user.length > 0) {
      throw createError("User Not Found", 401);
    }

    req.id = user[0]._id;
    req.userName = user[0].userName;

    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

module.exports = checkLogin;
