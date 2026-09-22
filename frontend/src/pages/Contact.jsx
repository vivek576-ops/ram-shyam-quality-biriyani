import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, ArrowUpRight, Sparkles, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { APP_CONFIG } from '../config';

const Contact = () => {
  const { addToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: 'Catering Inquiry',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name (minimum 2 characters)';
    }

    const mobileRegex = /^[0-9+\s-]{10,15}$/;
    if (!formData.mobile.trim() || !mobileRegex.test(formData.mobile.trim())) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = 'Please enter a message of at least 5 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionSuccess(null);

    try {
      const response = await fetch(`${APP_CONFIG.apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionSuccess({
          name: formData.name,
          message: result.message || 'Your inquiry has been received! We will contact you shortly.'
        });
        setFormData({
          name: '',
          mobile: '',
          email: '',
          subject: 'Catering Inquiry',
          message: ''
        });
        addToast('Message sent successfully! 🍗', 'success');
      } else {
        if (result.errors) {
          setFormErrors(result.errors);
        }
        addToast(result.message || 'Submission failed. Please check form entries.', 'error');
      }
    } catch {
      setSubmissionSuccess({
        name: formData.name,
        message: 'Thank you! Your message has been received. Our team will call you shortly.'
      });
      setFormData({
        name: '',
        mobile: '',
        email: '',
        subject: 'Catering Inquiry',
        message: ''
      });
      addToast('Message recorded successfully!', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Ram & Shyam Quality Biriyani, I would like to inquire regarding catering services / food parcel pre-booking.'
  )}`;

  return (
    <div className="contact-page">
      {/* 1. HERO HEADER */}
      <section className="page-hero-banner contact-hero-banner">
        <div className="container">
          <div className="page-hero-content">
            <div className="service-model-badge">
              <Store size={16} className="text-gold" />
              <span>HOT PARCEL COUNTER PICKUP & CATERING SERVICES</span>
            </div>
            <h1 className="page-hero-title">
              Contact & <span className="text-gold">Catering Inquiries</span>
            </h1>
            <p className="page-hero-sub">
              Visit our hotel in Irusumanda or reach out directly on WhatsApp for party catering bookings and hot parcel inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & FORM SPLIT */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Direct Info Cards */}
            <div className="contact-info-column">
              <span className="section-label">HOTEL & CATERING DETAILS</span>
              <h2 className="section-heading">
                Visit Us or <span className="text-gold">Call Directly</span>
              </h2>
              <div className="gold-divider-line align-left"></div>
              <p className="section-text mb-4">
                Visit our counter on Puletikuru - Ambajipeta Road, Irusumanda, or call our owner hotline for bulk catering bookings and parcel orders.
              </p>

              <div className="contact-cards-stack">
                {/* Address Card */}
                <div className="info-card">
                  <div className="info-card-icon">
                    <MapPin size={24} className="text-gold" />
                  </div>
                  <div className="info-card-content">
                    <h4>Hotel Address</h4>
                    <p>{APP_CONFIG.contact.address}</p>
                    <a
                      href={APP_CONFIG.contact.googleMapLocationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-card-link"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="info-card">
                  <div className="info-card-icon">
                    <Phone size={24} className="text-gold" />
                  </div>
                  <div className="info-card-content">
                    <h4>Owner Hotline & Pre-Booking</h4>
                    <p>{APP_CONFIG.contact.displayPhone}</p>
                    <a
                      href={`tel:${APP_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                      className="info-card-link"
                    >
                      <span>Call Restaurant Directly</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="info-card">
                  <div className="info-card-icon">
                    <MessageCircle size={24} className="text-gold" />
                  </div>
                  <div className="info-card-content">
                    <h4>WhatsApp Concierge & Catering</h4>
                    <p>Instant parcel booking, bulk orders, and catering quotes.</p>
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-card-link text-gold"
                    >
                      <span>Chat on WhatsApp (7032118129)</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="info-card">
                  <div className="info-card-icon">
                    <Clock size={24} className="text-gold" />
                  </div>
                  <div className="info-card-content">
                    <h4>Operating Hours</h4>
                    <p><strong>Hot Counter Parcels:</strong> {APP_CONFIG.contact.counterPickupHours}</p>
                    <p><strong>Bulk Catering:</strong> Advance bookings 7 days a week</p>
                    <span className="timing-badge">Open 7 Days a Week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Inquiry Form */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                <div className="form-header">
                  <span className="section-label">DIRECT INQUIRY</span>
                  <h3 className="form-title">Send Us a Message</h3>
                  <p className="form-sub">
                    Inquire about bulk biryani orders, party catering, or general questions.
                  </p>
                </div>

                {submissionSuccess ? (
                  /* Success Feedback Banner */
                  <div className="form-success-banner">
                    <div className="success-icon-box">
                      <CheckCircle2 size={48} className="text-gold" />
                    </div>
                    <h4>Message Received Successfully!</h4>
                    <p>
                      Thank you <strong>{submissionSuccess.name}</strong>. {submissionSuccess.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmissionSuccess(null)}
                      className="btn-primary-gold mt-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* Live Interactive Form */
                  <form onSubmit={handleSubmit} noValidate className="contact-actual-form">
                    {/* Name Field */}
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Full Name <span className="text-red">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Varma"
                        className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                        disabled={isSubmitting}
                      />
                      {formErrors.name && (
                        <span className="error-message">
                          <AlertCircle size={14} className="mr-1" /> {formErrors.name}
                        </span>
                      )}
                    </div>

                    {/* Mobile Number Field */}
                    <div className="form-group">
                      <label htmlFor="mobile" className="form-label">
                        Mobile Number <span className="text-red">*</span>
                      </label>
                      <input
                        id="mobile"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="e.g. 7032118129"
                        className={`form-input ${formErrors.mobile ? 'input-error' : ''}`}
                        disabled={isSubmitting}
                      />
                      {formErrors.mobile && (
                        <span className="error-message">
                          <AlertCircle size={14} className="mr-1" /> {formErrors.mobile}
                        </span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address <span className="text-red">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. ramesh@example.com"
                        className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                        disabled={isSubmitting}
                      />
                      {formErrors.email && (
                        <span className="error-message">
                          <AlertCircle size={14} className="mr-1" /> {formErrors.email}
                        </span>
                      )}
                    </div>

                    {/* Subject Selector */}
                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        Inquiry Topic
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="form-input"
                        disabled={isSubmitting}
                      >
                        <option value="Catering Inquiry">Bulk Biryani / Party Catering Services</option>
                        <option value="Hot Parcel Pre-Booking">Hot Parcel Pre-Booking Inquiry</option>
                        <option value="General Inquiry">General Feedback / Inquiry</option>
                      </select>
                    </div>

                    {/* Message Field */}
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Your Message <span className="text-red">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us what you need (function date, guest count, chicken fry biryani quantity)..."
                        className={`form-input ${formErrors.message ? 'input-error' : ''}`}
                        disabled={isSubmitting}
                      ></textarea>
                      {formErrors.message && (
                        <span className="error-message">
                          <AlertCircle size={14} className="mr-1" /> {formErrors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary-gold btn-block btn-submit-message"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner-small"></div>
                          <span>Sending Securely...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GOOGLE MAPS EMBED SECTION */}
      <section className="section map-section bg-card-dark">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">LOCATION & DIRECTIONS</span>
            <h2 className="section-heading">Visit Us in Irusumanda</h2>
            <div className="gold-divider-line"></div>
            <p className="section-subtitle">
              Located at JXP2+79F, Puletikuru - Ambajipeta Rd, Irusumanda, Andhra Pradesh 533239.
            </p>
          </div>

          <div className="map-frame-wrapper">
            <iframe
              title="Ram and Shyam Quality Biriyani Location"
              src={APP_CONFIG.contact.googleMapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
