const CateringRequest = require('../models/CateringRequest');

// @desc    Create catering enquiry
// @route   POST /api/catering
// @access  Public
const createCateringRequest = async (req, res, next) => {
  try {
    const {
      customerName,
      customerPhone,
      email,
      eventType,
      eventDate,
      eventTime,
      guestCount,
      venue,
      foodRequirements,
      specialRequirements
    } = req.body;

    const errors = {};

    if (!customerName || customerName.trim().length < 2) {
      errors.customerName = 'Customer name is required';
    }

    const phoneRegex = /^[0-9+\s-]{10,15}$/;

    if (!customerPhone || !phoneRegex.test(customerPhone.trim())) {
      errors.customerPhone = 'Valid phone number is required';
    }

    if (!eventType || !eventType.trim()) {
      errors.eventType = 'Event type is required';
    }

    if (!eventDate) {
      errors.eventDate = 'Event date is required';
    }

    if (!eventTime) {
      errors.eventTime = 'Event time is required';
    }

    if (!guestCount || Number(guestCount) < 1) {
      errors.guestCount = 'Guest count must be at least 1';
    }

    if (!venue || !venue.trim()) {
      errors.venue = 'Venue is required';
    }

    if (!foodRequirements || !foodRequirements.trim()) {
      errors.foodRequirements =
        'Please mention your food requirements';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid catering enquiry details',
        errors
      });
    }

    const cateringRequest = await CateringRequest.create({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      email: email ? email.trim() : '',
      eventType: eventType.trim(),
      eventDate,
      eventTime: eventTime.trim(),
      guestCount: Number(guestCount),
      venue: venue.trim(),
      foodRequirements: foodRequirements.trim(),
      specialRequirements: specialRequirements
        ? specialRequirements.trim()
        : ''
    });

    // Creates a WhatsApp draft link for the customer.
    // It does NOT automatically send a WhatsApp message.
    const ownerWhatsApp =
      process.env.WHATSAPP_NUMBER || '';

    let whatsappText =
      `*🎉 RAM & SHYAM QUALITY BIRIYANI - CATERING ENQUIRY*\n`;

    whatsappText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    whatsappText += `*Customer:* ${cateringRequest.customerName}\n`;
    whatsappText += `*Phone:* ${cateringRequest.customerPhone}\n`;
    whatsappText += `*Event:* ${cateringRequest.eventType}\n`;
    whatsappText += `*Date:* ${new Date(
      cateringRequest.eventDate
    ).toLocaleDateString('en-IN')}\n`;
    whatsappText += `*Time:* ${cateringRequest.eventTime}\n`;
    whatsappText += `*Guests:* ${cateringRequest.guestCount}\n`;
    whatsappText += `*Venue:* ${cateringRequest.venue}\n`;
    whatsappText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    whatsappText += `*Food Requirements:*\n`;
    whatsappText += `${cateringRequest.foodRequirements}\n`;

    if (cateringRequest.specialRequirements) {
      whatsappText += `━━━━━━━━━━━━━━━━━━━━━\n`;
      whatsappText += `*Special Requirements:*\n`;
      whatsappText += `${cateringRequest.specialRequirements}\n`;
    }

    whatsappText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    whatsappText += `_Please contact the customer regarding the catering quotation._`;

    const whatsappUrl = ownerWhatsApp
      ? `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(
          whatsappText
        )}`
      : null;

    console.log(
      `[Catering Enquiry] ${cateringRequest.customerName} - ${cateringRequest.eventType} - ${cateringRequest.guestCount} guests`
    );

    return res.status(201).json({
      success: true,
      message:
        'Catering enquiry submitted successfully. Our team will contact you shortly.',
      data: {
        requestId: cateringRequest._id,
        whatsappUrl,
        cateringRequest
      }
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Get all catering enquiries
// @route   GET /api/catering
// @access  Owner only
const getCateringRequests = async (req, res, next) => {
  try {
    const requests = await CateringRequest.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Update catering enquiry status
// @route   PATCH /api/catering/:id/status
// @access  Owner only
const updateCateringRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      'New',
      'Contacted',
      'Quotation Sent',
      'Confirmed',
      'Completed',
      'Cancelled'
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid catering enquiry status.'
      });
    }

    const request =
      await CateringRequest.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true
        }
      );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Catering enquiry not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Catering enquiry status updated successfully.',
      data: request
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createCateringRequest,
  getCateringRequests,
  updateCateringRequestStatus
};