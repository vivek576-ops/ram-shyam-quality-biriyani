import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, CheckCircle, ShieldCheck, Clock, MapPin, Store, Utensils, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { APP_CONFIG } from '../config';

const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    grandTotal,
    addToast
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Pre-Booking Pickup State
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    pickupTime: 'In 15-20 Minutes',
    customTime: '',
    instructions: '',
    paymentMethod: 'Pay at Counter / UPI'
  });

  const [formErrors, setFormErrors] = useState({});

  if (!isCartOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCheckout = () => {
    const errors = {};
    if (!customer.name.trim() || customer.name.trim().length < 2) {
      errors.name = 'Please enter your name';
    }
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!customer.phone.trim() || !phoneRegex.test(customer.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const effectivePickupTime = customer.pickupTime === 'Custom Time' && customer.customTime.trim()
    ? customer.customTime.trim()
    : customer.pickupTime;

  // Build pre-formatted WhatsApp Message specifically addressed to the Owner (7032118129)
  const buildWhatsAppParcelUrl = () => {
    const ownerNumber = APP_CONFIG.whatsappNumber; // 917032118129
    let text = `*🍗 ${APP_CONFIG.restaurantName} - PRE-BOOKING PARCEL*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Customer:* ${customer.name}\n`;
    text += `*Phone:* ${customer.phone}\n`;
    text += `*Expected Pickup Time:* ⏰ ${effectivePickupTime}\n`;
    text += `*Service:* Takeaway Counter Parcel Pickup\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*PARCEL ITEMS LIST:*\n`;
    cartItems.forEach((it, idx) => {
      const sizeTag = it.selectedSize ? ` (${it.selectedSize})` : (it.portionSize ? ` (${it.portionSize})` : '');
      text += `${idx + 1}. *${it.name}*${sizeTag} x ${it.quantity} = ₹${it.price * it.quantity}\n`;
    });
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Subtotal:* ₹${subtotal}\n`;
    text += `*TOTAL PARCEL AMOUNT: ₹${grandTotal}*\n`;
    if (customer.instructions) {
      text += `*Packing Note:* ${customer.instructions}\n`;
    }
    text += `*Payment:* ${customer.paymentMethod}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `_Please keep the hot parcel packed & ready for pickup at hotel counter. Thank you!_`;

    return `https://wa.me/${ownerNumber}?text=${encodeURIComponent(text)}`;
  };

  // Submit Pre-Booking Order to Backend & WhatsApp
  const handlePlaceOrder = async (sendToWhatsApp = true) => {
    if (!validateCheckout()) return;

    setIsSubmitting(true);
    const whatsappUrl = buildWhatsAppParcelUrl();

    try {
      // 1. Submit to Backend API
      const res = await fetch(`${APP_CONFIG.apiBaseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customer.name,
          customerPhone: customer.phone,
          pickupTime: effectivePickupTime,
          orderType: 'Takeaway Parcel',
          items: cartItems,
          specialInstructions: customer.instructions,
          paymentMethod: customer.paymentMethod
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrderConfirmed({
          ...data.data,
          whatsappUrl: data.data.whatsappUrl || whatsappUrl
        });
        clearCart();
        addToast(`Pre-Booking Confirmed! Token: ${data.data.orderId}`, 'success');

        if (sendToWhatsApp) {
          window.open(data.data.whatsappUrl || whatsappUrl, '_blank');
        }
      } else {
        // Fallback WhatsApp
        window.open(whatsappUrl, '_blank');
        setOrderConfirmed({
          orderId: `RSB-PARCEL-${Date.now().toString().slice(-5)}`,
          pickupTime: effectivePickupTime,
          totalAmount: grandTotal,
          whatsappUrl
        });
        clearCart();
        addToast('Pre-booking details sent to WhatsApp!', 'success');
      }
    } catch {
      window.open(whatsappUrl, '_blank');
      setOrderConfirmed({
        orderId: `RSB-PARCEL-${Date.now().toString().slice(-5)}`,
        pickupTime: effectivePickupTime,
        totalAmount: grandTotal,
        whatsappUrl
      });
      clearCart();
      addToast('Pre-booking details sent to WhatsApp!', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setOrderConfirmed(null);
    setIsCheckingOut(false);
    closeCart();
  };

  return (
    <div className="cart-backdrop" onClick={closeCart}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} className="text-gold" />
            <div>
              <h3>Hot Parcel Pre-Booking Tray</h3>
              <span className="parcel-sub-note">★ Counter Takeaway & Pickup</span>
            </div>
          </div>
          <button onClick={closeCart} className="cart-close-btn" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {/* Parcel Service Banner */}
        <div className="parcel-service-banner">
          <Store size={18} className="text-gold flex-shrink-0" />
          <span>
            <strong>Pre-Book & Collect:</strong> Fresh food will be packed hot in sealed containers. Visit hotel counter & collect with zero waiting!
          </span>
        </div>

        {/* Order Confirmed View */}
        {orderConfirmed ? (
          <div className="order-confirmed-view">
            <div className="confirmation-icon-wrapper">
              <CheckCircle size={64} className="text-gold animate-bounce" />
            </div>
            <h3 className="confirm-title">Parcel Pre-Booked!</h3>
            <p className="confirm-subtitle">
              Thank you, <strong>{customer.name}</strong>. Your food parcel is being prepared fresh. Please visit our hotel counter for pickup!
            </p>

            <div className="order-receipt-card">
              <div className="receipt-row">
                <span>Pickup Token:</span>
                <strong className="text-gold text-lg">{orderConfirmed.orderId}</strong>
              </div>
              <div className="receipt-row">
                <span>Expected Pickup:</span>
                <strong className="text-gold">{orderConfirmed.pickupTime}</strong>
              </div>
              <div className="receipt-row">
                <span>Total Amount:</span>
                <strong className="text-gold text-lg">₹{orderConfirmed.totalAmount}</strong>
              </div>
              <div className="receipt-row">
                <span>Restaurant Location:</span>
                <span className="text-muted text-xs">{APP_CONFIG.contact.address}</span>
              </div>
            </div>

            <div className="confirm-actions">
              <a
                href={orderConfirmed.whatsappUrl || buildWhatsAppParcelUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-chat btn-block"
              >
                <MessageCircle size={20} />
                <span>Send Token to Owner (WhatsApp: 7032118129)</span>
              </a>
              <button onClick={resetModal} className="btn-secondary-outline btn-block mt-3">
                Pre-Book More Items
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Tray State */
          <div className="cart-empty-view">
            <div className="empty-pot-icon">🍗</div>
            <h4>Your parcel tray is empty!</h4>
            <p>Select Chicken Fry Piece Biryani (Single/Full/Family), Rice & Curries, or Today’s fresh Veg Curries to pre-book.</p>
            <button
              onClick={() => {
                closeCart();
                window.location.href = '/menu';
              }}
              className="btn-primary-gold mt-4"
            >
              Browse Menu & Pre-Book
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Pre-Booking Checkout Form */
          <div className="cart-checkout-view">
            <div className="checkout-back-link" onClick={() => setIsCheckingOut(false)}>
              ← Back to Selected Dishes
            </div>

            <h4 className="checkout-section-title">Pre-Booking Pickup Details</h4>

            <div className="checkout-form-fields">
              {/* Name */}
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Ramesh Kumar"
                  className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                />
                {formErrors.name && <span className="error-text">{formErrors.name}</span>}
              </div>

              {/* Mobile Phone */}
              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 9876543210"
                  className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                />
                {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
              </div>

              {/* Expected Pickup Time Slot */}
              <div className="form-group">
                <label className="form-label">
                  <Clock size={15} className="text-gold inline mr-1" />
                  When will you visit hotel for pickup? *
                </label>
                <select
                  name="pickupTime"
                  value={customer.pickupTime}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="In 15-20 Minutes">⚡ Fast Pickup: In 15–20 Minutes</option>
                  <option value="In 30-45 Minutes">⏰ In 30–45 Minutes</option>
                  <option value="Today Lunch (1:00 PM - 2:30 PM)">🍱 Today Lunch (1:00 PM – 2:30 PM)</option>
                  <option value="Today Dinner (7:30 PM - 9:30 PM)">🌙 Today Dinner (7:30 PM – 9:30 PM)</option>
                  <option value="Custom Time">✍ Specify Custom Time</option>
                </select>

                {customer.pickupTime === 'Custom Time' && (
                  <input
                    type="text"
                    name="customTime"
                    value={customer.customTime}
                    onChange={handleInputChange}
                    placeholder="e.g. Today at 2:15 PM / 8:45 PM"
                    className="form-input mt-2"
                  />
                )}
              </div>

              {/* Packing / Cooking Note */}
              <div className="form-group">
                <label className="form-label">Special Packing / Curry Note</label>
                <input
                  type="text"
                  name="instructions"
                  value={customer.instructions}
                  onChange={handleInputChange}
                  placeholder="e.g. Pack extra salan/raita, less spicy"
                  className="form-input"
                />
              </div>

              {/* Payment Mode */}
              <div className="form-group">
                <label className="form-label">Payment Mode</label>
                <select
                  name="paymentMethod"
                  value={customer.paymentMethod}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="Pay at Counter (Cash / UPI)">Pay at Hotel Counter (Cash / UPI / QR Code)</option>
                  <option value="Google Pay / PhonePe / Paytm">Online UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="WhatsApp Pay Direct">WhatsApp Pay Direct</option>
                </select>
              </div>
            </div>

            {/* Bill Calculation */}
            <div className="cart-bill-summary compact-summary">
              <div className="bill-row">
                <span>Items Subtotal ({cartItems.length} dishes):</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="bill-row">
                <span>Parcel Packaging:</span>
                <span className="text-green">FREE (Sealed Leakproof Boxes)</span>
              </div>
              <div className="bill-row total-row">
                <span>Total Payable Amount:</span>
                <span className="text-gold text-lg">₹{grandTotal}</span>
              </div>
            </div>

            {/* WhatsApp Confirmation to Owner (7032118129) */}
            <div className="checkout-btn-group">
              <button
                type="button"
                onClick={() => handlePlaceOrder(true)}
                disabled={isSubmitting}
                className="btn-whatsapp-chat btn-block"
              >
                <MessageCircle size={20} />
                <span>
                  {isSubmitting
                    ? 'Confirming Pre-Booking...'
                    : 'Confirm Pre-Booking on WhatsApp (7032118129)'}
                </span>
              </button>

              <p className="owner-phone-note text-center text-xs text-muted mt-2">
                📲 Sends your exact parcel items list directly to the owner's phone (<strong>+91 7032118129</strong>)
              </p>
            </div>
          </div>
        ) : (
          /* Dish List View */
          <>
            <div className="cart-items-scroll">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <h5 className="cart-item-title">{item.name}</h5>
                        {item.selectedSize && (
                          <span className="size-badge-pill text-gold text-xs font-semibold">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item-delete"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="cart-item-meta">
                      <span className="cart-item-portion">{item.portionSize || 'Parcel Box'}</span>
                      <span className="cart-item-price">₹{item.price}</span>
                    </div>
                    <div className="cart-item-bottom">
                      <div className="quantity-control">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="item-row-total">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Tray Calculation */}
            <div className="cart-drawer-footer">
              <div className="cart-bill-summary">
                <div className="bill-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="bill-row">
                  <span>Takeaway Packaging</span>
                  <span className="text-green">FREE Hot Packing</span>
                </div>
                <div className="bill-row total-row">
                  <span>Total Amount</span>
                  <span className="text-gold">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="btn-primary-gold btn-block cart-proceed-btn"
              >
                <span>Proceed to Pre-Book Parcel</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
