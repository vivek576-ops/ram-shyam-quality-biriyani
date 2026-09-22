import React, { useState } from 'react';
import { APP_CONFIG } from '../config';

const Catering = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    email: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    venue: '',
    foodRequirements: '',
    specialRequirements: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await fetch(
        `${APP_CONFIG.apiBaseUrl}/api/catering`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Failed to submit catering enquiry'
        );
      }

      setSuccess(
        '🎉 Catering enquiry submitted successfully!'
        );

        setWhatsappUrl(result.data?.whatsappUrl || '');

      setFormData({
        customerName: '',
        customerPhone: '',
        email: '',
        eventType: '',
        eventDate: '',
        eventTime: '',
        guestCount: '',
        venue: '',
        foodRequirements: '',
        specialRequirements: ''
      });
    } catch (err) {
      console.error('Catering submission error:', err);

      setError(
        err.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="catering-page">
      <div className="container">

        {/* Hero */}
        <div className="catering-hero">
          <span className="section-label">
            CATERING SERVICES
          </span>

          <h1>
            Make Your Event
            <br />
            <span>Special With Us</span>
          </h1>

          <p>
            From family celebrations to weddings, birthdays,
            corporate events and large functions — enjoy
            authentic RAM & SHYAM QUALITY BIRIYANI catering.
          </p>
        </div>

        {/* Catering Form */}
        <div className="catering-form-wrapper">

          <div className="catering-form-heading">
            <h2>Request Catering</h2>

            <p>
              Tell us about your event. Our team will contact
              you with catering details and quotation.
            </p>
          </div>

         {success && (
            <div className="catering-success">
            <div>{success}</div>

            <p>
                Your enquiry has been recorded successfully.
                Please send the enquiry to our WhatsApp so our team can contact you.
            </p>

            {whatsappUrl && (
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-chat catering-whatsapp-btn"
                >
                💬 Send Enquiry to WhatsApp
                </a>
            )}
            </div>
        )}
          {error && (
            <div className="catering-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Customer Details */}
            <div className="form-section">
              <h3>Customer Details</h3>

              <div className="form-grid">

                <div className="form-group">
                  <label htmlFor="customerName">
                    Full Name *
                  </label>

                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customerPhone">
                    Phone Number *
                  </label>

                  <input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>

              </div>
            </div>

            {/* Event Details */}
            <div className="form-section">
              <h3>Event Details</h3>

              <div className="form-grid">

                <div className="form-group">
                  <label htmlFor="eventType">
                    Event Type *
                  </label>

                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select event type
                    </option>

                    <option value="Wedding">
                      Wedding
                    </option>

                    <option value="Birthday Party">
                      Birthday Party
                    </option>

                    <option value="Engagement">
                      Engagement
                    </option>

                    <option value="Reception">
                      Reception
                    </option>

                    <option value="Corporate Event">
                      Corporate Event
                    </option>

                    <option value="Family Function">
                      Family Function
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="guestCount">
                    Number of Guests *
                  </label>

                  <input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    min="1"
                    value={formData.guestCount}
                    onChange={handleChange}
                    placeholder="e.g. 100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventDate">
                    Event Date *
                  </label>

                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventTime">
                    Event Time *
                  </label>

                  <input
                    id="eventTime"
                    name="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="venue">
                    Event Venue *
                  </label>

                  <input
                    id="venue"
                    name="venue"
                    type="text"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="Enter event venue / location"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Food Details */}
            <div className="form-section">
              <h3>Food Requirements</h3>

              <div className="form-group">
                <label htmlFor="foodRequirements">
                  What would you like for your event? *
                </label>

                <textarea
                  id="foodRequirements"
                  name="foodRequirements"
                  value={formData.foodRequirements}
                  onChange={handleChange}
                  placeholder="Example: Chicken Biryani, Mutton Biryani, Chicken 65, Raita, etc."
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialRequirements">
                  Special Requirements
                </label>

                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  placeholder="Serving staff, food counters, decoration requirements, etc."
                  rows="4"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary-gold catering-submit-btn"
              disabled={loading}
            >
              {loading
                ? 'Submitting Enquiry...'
                : 'Submit Catering Enquiry'}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Catering;