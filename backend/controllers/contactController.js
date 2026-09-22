const Contact = require('../models/Contact');
const { isConnected, memoryStore } = require('../config/db');

// @desc    Submit Contact Inquiry Form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res, next) => {
  try {
    const { name, mobile, email, message, subject } = req.body;

    // Server-side validation
    const errors = {};
    if (!name || name.trim().length < 2) {
      errors.name = 'Please provide a valid full name (minimum 2 characters)';
    }

    const mobileRegex = /^[0-9+\s-]{10,15}$/;
    if (!mobile || !mobileRegex.test(mobile.trim())) {
      errors.mobile = 'Please provide a valid 10-digit mobile number';
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    if (!message || message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters long';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check the provided details.',
        errors
      });
    }

    const contactData = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      status: 'New',
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
      createdAt: new Date()
    };

    let savedContact;
    if (isConnected) {
      savedContact = await Contact.create(contactData);
    } else {
      // In-memory fallback
      savedContact = {
        _id: `mem_contact_${Date.now()}`,
        ...contactData
      };
      memoryStore.contacts.unshift(savedContact);
    }

    console.log(`[Contact Form] New submission received from: ${contactData.name} (${contactData.mobile})`);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will contact you shortly.',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact inquiries (Admin/Debug view)
// @route   GET /api/contact
// @access  Public
const getAllContacts = async (req, res, next) => {
  try {
    if (isConnected) {
      const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
      return res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } else {
      return res.status(200).json({ success: true, count: memoryStore.contacts.length, data: memoryStore.contacts });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactForm,
  getAllContacts
};
