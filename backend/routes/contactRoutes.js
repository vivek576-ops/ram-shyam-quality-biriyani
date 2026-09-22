const express = require('express');
const router = express.Router();
const { submitContactForm, getAllContacts } = require('../controllers/contactController');

router.route('/')
  .post(submitContactForm)
  .get(getAllContacts);

module.exports = router;
