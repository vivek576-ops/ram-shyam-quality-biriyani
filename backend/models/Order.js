const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    category: {
      type: String,
      trim: true
    },

    size: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },

    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true
    },

    pickupTime: {
      type: String,
      required: [true, 'Pickup time is required'],
      trim: true
    },

    orderType: {
      type: String,
      enum: ['Takeaway Parcel'],
      default: 'Takeaway Parcel'
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: 'At least one item is required'
      }
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    },

    tax: {
      type: Number,
      default: 0,
      min: 0
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    specialInstructions: {
      type: String,
      trim: true
    },

    paymentMethod: {
      type: String,
      enum: [
        'Pay at Hotel Counter',
        'UPI / Online'
      ],
      default: 'Pay at Hotel Counter'
    },

    status: {
      type: String,
      enum: [
        'Received',
        'Preparing',
        'Ready for Pickup',
        'Completed',
        'Cancelled'
      ],
      default: 'Received'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);