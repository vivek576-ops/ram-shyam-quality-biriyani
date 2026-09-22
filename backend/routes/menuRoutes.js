const express = require('express');
const router = express.Router();
const { getMenuItems, getMenuItemById } = require('../controllers/menuController');

router.route('/')
  .get(getMenuItems);

router.route('/:id')
  .get(getMenuItemById);

module.exports = router;
