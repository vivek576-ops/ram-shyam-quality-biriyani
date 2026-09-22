const express = require('express');
const router = express.Router();
const { createOrder, getOrderByOrderId } = require('../controllers/orderController');

router.route('/')
  .post(createOrder);

router.route('/:orderId')
  .get(getOrderByOrderId);

module.exports = router;
