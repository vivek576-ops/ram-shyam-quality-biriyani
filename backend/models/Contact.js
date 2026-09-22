const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[0-9+\s-]{10,15}$/, 'Please enter a valid mobile number']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    subject: {
      type: String,
      trim: true,
      default: 'General Inquiry'
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    status: {
      type: String,
      enum: ['New', 'Read', 'Contacted', 'Resolved'],
      default: 'New'
    },
    ipAddress: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Contact', contactSchema);
