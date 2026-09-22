const Order = require('../models/Order');


// Helper to generate unique order token/ID
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-5);
  const random = Math.floor(10 + Math.random() * 90);
  return `RSB-PARCEL-${timestamp}${random}`;
};

// @desc    Create a Pre-Booking Parcel Order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      customerPhone,
      pickupTime,
      orderType,
      items,
      specialInstructions,
      paymentMethod
    } = req.body;

    // Validation
    const errors = {};
    if (!customerName || customerName.trim().length < 2) {
      errors.customerName = 'Customer name is required';
    }

    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!customerPhone || !phoneRegex.test(customerPhone.trim())) {
      errors.customerPhone = 'Valid 10-digit phone number is required';
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      errors.items = 'Your parcel tray must contain at least one item';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pre-booking details',
        errors
      });
    }

    // Calculate totals server-side
    let subtotal = 0;
    const sanitizedItems = items.map(item => {
      const price = Number(item.price) || 0;
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      subtotal += price * quantity;
      return {
        id: item.id || item.itemId,
        name: item.name,
        size: item.selectedSize || item.portionSize || '',
        price,
        quantity,
        category: item.category || 'Special'
      };
    });

    const tax = 0; // No GST added to takeaway parcel total
    const totalAmount = subtotal;

    const orderId = generateOrderId();
    const formattedPickupTime = pickupTime || 'In 15-20 Minutes';

    const orderData = {
      orderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      pickupTime: formattedPickupTime,
      orderType: orderType || 'Takeaway Parcel',
      items: sanitizedItems,
      subtotal,
      tax,
      deliveryFee: 0,
      totalAmount,
      specialInstructions: specialInstructions ? specialInstructions.trim() : '',
      paymentMethod: paymentMethod || 'Pay at Hotel Counter',
      status: 'Received',
      createdAt: new Date()
    };

    const savedOrder = await Order.create(orderData);

    // Build pre-formatted WhatsApp Message specifically addressed to the Owner (7032118129)
    const ownerWhatsApp = process.env.WHATSAPP_NUMBER || '917032118129';
    let whatsappText = `*🍗 RAM & SHYAM QUALITY BIRIYANI - NEW PRE-BOOKING PARCEL*\n`;
    whatsappText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    whatsappText += `*Parcel Token:* ${orderId}\n`;
    whatsappText += `*Customer Name:* ${orderData.customerName}\n`;
    whatsappText += `*Phone:* ${orderData.customerPhone}\n`;
    whatsappText += `*Expected Pickup Time:* ⏰ ${formattedPickupTime}\n`;
    whatsappText += `*Service:* Takeaway Counter Parcel\n`;
    whatsappText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    whatsappText += `*ITEMS TO PACK:*\n`;
    orderData.items.forEach((it, idx) => {
      const sizeNote = it.size ? ` (${it.size})` : '';
      whatsappText += `${idx + 1}. *${it.name}*${sizeNote} x ${it.quantity} = ₹${it.price * it.quantity}\n`;
    });
    whatsappText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    whatsappText += `*Subtotal:* ₹${subtotal}\n`;
    whatsappText += `*Takeaway Packaging:* FREE Hot Packing\n`;
    whatsappText += `*TOTAL PARCEL BILL: ₹${totalAmount}*\n`;
    if (orderData.specialInstructions) {
      whatsappText += `*Special Note:* ${orderData.specialInstructions}\n`;
    }
    whatsappText += `*Payment:* ${orderData.paymentMethod}\n`;
    whatsappText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    whatsappText += `_Please keep the hot parcel ready for counter pickup. Thank you!_`;

    const encodedWhatsAppUrl = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(whatsappText)}`;

    console.log(`[Parcel Pre-Booked] ${orderId} by ${orderData.customerName} (Pickup: ${formattedPickupTime}) - Total: ₹${totalAmount}`);

    return res.status(201).json({
      success: true,
      message: 'Pre-Booking Confirmed! Please collect your hot parcel at the restaurant counter.',
      data: {
        orderId,
        pickupTime: formattedPickupTime,
        totalAmount,
        orderType: orderData.orderType,
        whatsappUrl: encodedWhatsAppUrl,
        order: savedOrder
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order details by Order ID
// @route   GET /api/orders/:orderId
// @access  Public
const getOrderByOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${orderId} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrderByOrderId
};
