const mongoose = require('mongoose');

const dailySpecialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Curry name is required'],
      trim: true
    },
    description: {
      type: String,
      default: 'Freshly prepared daily special curry with authentic traditional spices.'
    },
    price: {
      type: Number,
      required: true,
      default: 120
    },
    portionSize: {
      type: String,
      default: '250ml Container'
    },
    isVeg: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      default: 'Today’s Veg Curries'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
    },
    isAvailableToday: {
      type: Boolean,
      default: true
    },
    spiceLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Spicy'],
      default: 'Medium'
    },
    updatedBy: {
      type: String,
      default: 'Owner'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('DailySpecial', dailySpecialSchema);
