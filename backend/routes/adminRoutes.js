const express = require('express');
const router = express.Router();

const { verifyAdminPin } = require('../controllers/adminController');

router.post('/verify-pin', verifyAdminPin);

module.exports = router;