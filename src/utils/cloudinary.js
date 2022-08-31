//External import
const cloudinary = require("cloudinary");
const { createError } = require("../helper/errorHandler");

//confiqure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const cloudinaryUpload = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });

   
    return {
      url: data?.secure_url,
    };
  } catch (e) {
    createError(e.message, e.status);
  }
};

module.exports = cloudinaryUpload;
