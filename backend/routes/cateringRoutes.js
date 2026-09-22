const express = require('express');

const router = express.Router();

const {
  createCateringRequest,
  getCateringRequests,
  updateCateringRequestStatus
} = require('../controllers/cateringController');

const verifyAdminPin = require('../middleware/adminAuth');

router.post('/', createCateringRequest);

router.get(
  '/',
  verifyAdminPin,
  getCateringRequests
);

router.patch(
  '/:id/status',
  verifyAdminPin,
  updateCateringRequestStatus
);

module.exports = router;