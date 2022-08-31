//external import
const jwt = require("jsonwebtoken");

const generateToken = async (payLoad, expiresIn) => {
  return await jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
    expiresIn: expiresIn || "24h",
  });
};

module.exports = generateToken;
