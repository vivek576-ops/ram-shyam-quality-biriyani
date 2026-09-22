const express = require('express');

const router = express.Router();

const {
  getDailySpecials,
  addDailySpecial,
  toggleSpecialStatus
} = require('../controllers/dailySpecialsController');

const upload = require('../middleware/upload');
const verifyAdminPin = require('../middleware/adminAuth');

router.route('/')
  .get(getDailySpecials)
  .post(
    verifyAdminPin,
    upload.single('image'),
    addDailySpecial
  );

router.route('/:id/toggle')
  .patch(
    verifyAdminPin,
    toggleSpecialStatus
  );

module.exports = router;