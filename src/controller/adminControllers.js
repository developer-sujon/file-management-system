//external import
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

//internal import
const UserModel = require("../model/UserModel");

/**
 * @desc Select All User
 * @access public
 * @route /api/v1/admin/selectUser
 * @methud GET
 */

const selectAllUser = async (req, res) => {
  try {
    const users = await UserModel.aggregate([
      {
        $project: {
          name: 1,
          phone: 1,
          userName: 1,
          email: 1,
          roles: 1,
          postCount: 1,
          followes: 1,
          following: 1,
          avatar: 1,
        },
      },
    ]);

    res.json(users);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Block User
 * @access private
 * @route /api/v1/admin/blockUser
 * @methud PUT
 */

const blockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    await UserModel.findByIdAndUpdate(id, {
      accountStatus: "REJECTED",
    });

    res.json({ message: "This User Block Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Unblock User
 * @access private
 * @route /api/v1/admin/unBlockUser
 * @methud PUT
 */

const unBlockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    await UserModel.findByIdAndUpdate(id, {
      accountStatus: "ACTIVE",
    });

    res.json({ message: "This User Unblock Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = { selectAllUser, blockUser, unBlockUser };
