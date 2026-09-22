const mongoose = require('mongoose');

const cateringRequestSchema = new mongoose.Schema(
  {
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

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true
    },

    eventDate: {
      type: Date,
      required: [true, 'Event date is required']
    },

    eventTime: {
      type: String,
      required: [true, 'Event time is required'],
      trim: true
    },

    guestCount: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: 1
    },

    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true
    },

    foodRequirements: {
      type: String,
      required: [true, 'Food requirements are required'],
      trim: true
    },

    specialRequirements: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: [
        'New',
        'Contacted',
        'Quotation Sent',
        'Confirmed',
        'Completed',
        'Cancelled'
      ],
      default: 'New'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'CateringRequest',
  cateringRequestSchema
);