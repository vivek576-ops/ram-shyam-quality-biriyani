const express = require('express');

const router = express.Router();

const {
  createCateringRequest,
  getCateringRequests,
  updateCateringRequestStatus,
  deleteCateringRequest
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

// Owner-only: delete completed/cancelled enquiry
router.delete(
  '/:id',
  verifyAdminPin,
  deleteCateringRequest
);

module.exports = router;