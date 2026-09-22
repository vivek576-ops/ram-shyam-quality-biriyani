const express = require('express');

const router = express.Router();

const {
  createCateringRequest
} = require('../controllers/cateringController');

router
  .route('/')
  .post(createCateringRequest);

module.exports = router;