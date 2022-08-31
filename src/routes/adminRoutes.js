//External Import
const adminRoutes = require("express").Router();

//Internal Import
const { blockUser, unBlockUser } = require("../controller/adminControllers");
const { userAuth, adminAuth } = require("../middleware/checkAuthLogin");

//Block User
adminRoutes.put("/blockUser/:id", userAuth, adminAuth, blockUser);

//Unblock User
adminRoutes.put("/unBlockUser/:id", userAuth, adminAuth, unBlockUser);

module.exports = adminRoutes;
