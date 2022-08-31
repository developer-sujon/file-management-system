//External Import
const fs = require("fs");

/**
 * @desc Upload Images
 * @access public
 * @route /api/v1/storage/uploadFile
 * @methud POST
 */

const uploadFile = async (req, res) => {
  const filePath = req.file.path;
  const fileUrl = req.file.fileUrl;

  try {
    res.json({ filePath, fileUrl });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Remove Images
 * @access public
 * @route /api/v1/storage/removeFile/:fileUrl
 * @methud POST
 */

const removeFile = async (req, res) => {
  const directory = `public/${req.body.fileUrl}`;

  try {
    if (fs.existsSync(directory)) {
      fs.unlinkSync(directory);
    }
    res.json({ message: "File Remove Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = {
  uploadFile,
  removeFile,
};
