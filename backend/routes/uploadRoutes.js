const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const verifyAdminPin = require('../middleware/adminAuth');
const {
  uploadDailyCurryImage
} = require('../controllers/uploadController');

router.post(
  '/daily-curry-image',
  verifyAdminPin,
  upload.single('image'),
  uploadDailyCurryImage
);

module.exports = router;