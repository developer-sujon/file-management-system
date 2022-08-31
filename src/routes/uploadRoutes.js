//External Import
const uploadRoutes = require("express").Router();

//Internal Import
const { imageUpload, resizeImg } = require("../middleware/multer/uploadPhoto");
const { uploadFile, removeFile } = require("../controller/uploadControllers");

//Upload Images
uploadRoutes.post(
  "/uploadFile",
  imageUpload.single("img"),
  resizeImg,
  uploadFile,
);

//Remove Images
uploadRoutes.delete("/removeFile", removeFile);

module.exports = {
  uploadRoutes,
};
