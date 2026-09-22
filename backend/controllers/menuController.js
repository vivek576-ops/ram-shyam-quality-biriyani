const MenuItem = require('../models/MenuItem');
const seedData = require('../data/seedData');
const { isConnected } = require('../config/db');

// @desc    Get all menu items with filtering & search
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res, next) => {
  try {
    const { category, isVeg, search, isSpecial, isBestseller, refresh } = req.query;

    let items;
    if (isConnected) {
      const count = await MenuItem.countDocuments();
      if (count !== seedData.length || refresh === 'true') {
        await MenuItem.deleteMany({});
        await MenuItem.insertMany(seedData);
      }

      const query = {};
      if (category && category !== 'All') query.category = category;
      if (isVeg !== undefined && isVeg !== '') query.isVeg = isVeg === 'true';
      if (isSpecial === 'true') query.isSpecial = true;
      if (isBestseller === 'true') query.isBestseller = true;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      items = await MenuItem.find(query);
    } else {
      // Filter from seedData
      items = seedData.filter(item => {
        if (category && category !== 'All' && item.category !== category) return false;
        if (isVeg !== undefined && isVeg !== '' && item.isVeg !== (isVeg === 'true')) return false;
        if (isSpecial === 'true' && !item.isSpecial) return false;
        if (isBestseller === 'true' && !item.isBestseller) return false;
        if (search) {
          const s = search.toLowerCase();
          return item.name.toLowerCase().includes(s) || item.description.toLowerCase().includes(s);
        }
        return true;
      });
    }

    const categories = [
      'All',
      'Non-Veg',
      'Veg',
      'Curries'
    ];

    return res.status(200).json({
      success: true,
      count: items.length,
      categories,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single menu item by ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let item;
    if (isConnected) {
      item = await MenuItem.findOne({ itemId: id });
    }
    if (!item) {
      item = seedData.find(i => i.itemId === id || i._id === id);
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById
};
