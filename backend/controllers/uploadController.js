const cloudinary = require('../config/cloudinary');

const uploadDailyCurryImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image.'
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'ram-shyam/daily-curries',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) {
          return next(error);
        }

        return res.status(200).json({
          success: true,
          message: 'Daily curry image uploaded successfully.',
          imageUrl: result.secure_url
        });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDailyCurryImage
};