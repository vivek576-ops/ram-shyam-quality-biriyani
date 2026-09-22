const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    isVeg: {
      type: Boolean,
      default: false
    },
    isBestseller: {
      type: Boolean,
      default: false
    },
    isSpecial: {
      type: Boolean,
      default: false
    },
    spiceLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Spicy', 'Extra Spicy', 'Customizable'],
      default: 'Medium'
    },
    portionSize: {
      type: String,
      default: 'Serves 1'
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
