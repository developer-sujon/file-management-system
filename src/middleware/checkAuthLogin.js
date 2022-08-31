//external import
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

//internal import
const { createError } = require("../helper/errorHandler");

/**
 * @desc Check Auth
 * @access public
 * @route /api/v1/auth/login
 * @methud POST
 */

const auth = async (req) => {
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

  return decoded;
};

/**
 * @desc Check User Auth
 * @access public
 * @route /api/v1/auth/login
 * @methud POST
 */

const userAuth = async (req, res, next) => {
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
      {
        $match: { userName: decoded.userName },
      },
    ]);

    if (!user.length > 0) {
      throw createError("User Not Found", 401);
    }

    req.id = user[0]._id;
    req.userName = user[0].userName;
    req.email = user[0].email;

    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

/**
 * @desc Check Admin Auth
 * @access public
 * @route /api/v1/auth/login
 * @methud POST
 */
const adminAuth = async (req, res, next) => {
  try {
    const { userName } = req;

    const admin = await User.aggregate([
      {
        $match: {
          $and: [{ userName }, { roles: { $in: ["ADMIN"] } }],
        },
      },
    ]);

    if (!admin.length > 0) {
      throw createError("Invalid Credentials", 401);
    }

    req.roles = admin[0].roles;

    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

module.exports = {
  userAuth,
  adminAuth,
};
