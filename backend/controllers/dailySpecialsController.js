const DailySpecial = require('../models/DailySpecial');
const { isConnected } = require('../config/db');
const cloudinary = require('../config/cloudinary');

// In-memory store fallback for daily veg curries (strictly Stuffed Brinjal Curry)
let memoryDailySpecials = [
  {
    _id: 'spec-01',
    name: 'Stuffed Brinjal Curry (Gutti Vankaya)',
    description: '★ TODAY SPECIAL: Small purple eggplants slow-cooked in roasted peanut, sesame & coconut spiced gravy.',
    price: 40,
    portionSize: '250ml Container',
    isVeg: true,
    category: 'Curries',
    image: '/images/stuffed_brinjal.jpg',
    isAvailableToday: true,
    spiceLevel: 'Spicy'
  }
];

// @desc    Get Today's Active Daily Curries
// @route   GET /api/daily-specials
// @access  Public
const getDailySpecials = async (req, res, next) => {
  try {
    let specials;
    if (isConnected) {
      // Purge any legacy paneer or cashew curries from MongoDB
      await DailySpecial.deleteMany({
        name: { $regex: /paneer|cashew|kaju|okra|bendakaya/i }
      });

      specials = await DailySpecial.find().sort({ createdAt: -1 });
      if (specials.length === 0) {
        await DailySpecial.insertMany(memoryDailySpecials);
        specials = await DailySpecial.find();
      }
    } else {
      specials = memoryDailySpecials;
    }

    // Ensure the image is accurately resolved to match the dish name
    const mappedSpecials = specials.map(item => {
      const doc = item.toObject ? item.toObject() : item;

    return {
      ...doc,
      image: doc.image || ''
   };
  });

    return res.status(200).json({
      success: true,
      count: mappedSpecials.length,
      todayDate: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }),
      data: mappedSpecials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add / Update Today's Curry with Cost (Owner Action)
// @route   POST /api/daily-specials
// @access  Owner (PIN Protected: 1234)
const addDailySpecial = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      portionSize,
      spiceLevel,
      isVeg,
      isAvailableToday
    } = req.body;

    // Image is required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select a food photo.'
      });
    }

    // Validate curry name
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Curry name is required.'
      });
    }

    // Convert Veg/Non-Veg value correctly
    const isPureVeg = isVeg !== false && isVeg !== 'false';

    // Upload selected image to Cloudinary
    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'ram-shyam/daily-curries',
          resource_type: 'image'
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    const newCurryData = {
      name: name.trim(),

      description: description
        ? description.trim()
        : (
            isPureVeg
              ? 'Freshly prepared daily special veg curry.'
              : 'Freshly cooked authentic non-veg curry.'
          ),

      price: Number(price) || (isPureVeg ? 40 : 120),

      portionSize: portionSize || '250ml Container',

      spiceLevel: spiceLevel || 'Medium',

      isVeg: isPureVeg,

      category: isPureVeg ? 'Curries' : 'Non-Veg',

      // EXACT Cloudinary photo URL
      image: imageUrl,

      isAvailableToday:
        isAvailableToday !== undefined
          ? (
              isAvailableToday === true ||
              isAvailableToday === 'true'
            )
          : true,

      createdAt: new Date()
    };

    let created;

    if (isConnected) {
      created = await DailySpecial.create(newCurryData);
    } else {
      created = {
        _id: `mem_special_${Date.now()}`,
        ...newCurryData
      };

      memoryDailySpecials.unshift(created);
    }

    console.log(
      `[Daily Specials] Owner uploaded today's curry: ${newCurryData.name} (₹${newCurryData.price})`
    );

    return res.status(201).json({
      success: true,
      message: `Successfully uploaded "${newCurryData.name}" (₹${newCurryData.price}) to Today’s Curries!`,
      data: created
    });

  } catch (error) {
    console.error('[Daily Specials] Upload failed:', error);
    next(error);
  }
};

// @desc    Toggle Availability of a Daily Curry
// @route   PATCH /api/daily-specials/:id/toggle
// @access  Owner
const toggleSpecialStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updated;

    if (isConnected) {
      const item = await DailySpecial.findById(id);
      if (item) {
        item.isAvailableToday = !item.isAvailableToday;
        await item.save();
        updated = item;
      }
    } else {
      const idx = memoryDailySpecials.findIndex(s => s._id === id);
      if (idx !== -1) {
        memoryDailySpecials[idx].isAvailableToday = !memoryDailySpecials[idx].isAvailableToday;
        updated = memoryDailySpecials[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Curry is now ${updated.isAvailableToday ? 'ACTIVE on today’s menu' : 'OFF today’s menu'}`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDailySpecials,
  addDailySpecial,
  toggleSpecialStatus
};
