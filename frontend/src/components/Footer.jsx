import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Phone, Mail, MapPin, Clock, MessageCircle, Heart, ArrowUpRight } from 'lucide-react';
import { APP_CONFIG } from '../config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const whatsappDirectUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    APP_CONFIG.defaultWhatsAppMessage
  )}`;

  return (
    <footer className="site-footer">
      {/* Decorative Gold Top Border Line */}
      <div className="footer-gold-glow-bar"></div>

      <div className="container footer-container">
        {/* Column 1: Brand & Legacy */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <div className="logo-emblem">
              <Flame className="logo-icon" size={24} />
            </div>
            <div className="logo-text-group">
              <span className="logo-title">RAM & SHYAM</span>
              <span className="logo-subtitle">QUALITY BIRIYANI</span>
            </div>
          </div>
          <p className="footer-desc">
            Serving signature Chicken Fry Piece Biryani, daily fresh vegetable curries, and traditional function catering in Irusumanda (Puletikuru - Ambajipeta Road).
          </p>
          <div className="footer-badges">
            <span className="quality-pill">✨ Hot Takeaway Parcels</span>
            <span className="quality-pill">👑 Bulk Catering Available</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links-list">
            <li>
              <Link to="/" className="footer-link">
                <span className="link-bullet">›</span> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                <span className="link-bullet">›</span> About Our Story
              </Link>
            </li>
            <li>
              <Link to="/menu" className="footer-link">
                <span className="link-bullet">›</span> Restaurant Menu
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                <span className="link-bullet">›</span> Contact & Directions
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Menu Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">Our Specialities</h4>
          <ul className="footer-links-list">
            <li>
              <Link to="/menu" className="footer-link">
                <span className="link-bullet">›</span> Chicken Fry Piece Biryani (Single / Full / Family)
              </Link>
            </li>
            <li>
              <Link to="/menu" className="footer-link">
                <span className="link-bullet">›</span> Rice & Veg Curries Meal Parcels
              </Link>
            </li>
            <li>
              <Link to="/menu" className="footer-link">
                <span className="link-bullet">›</span> Today’s Fresh Veg Curries
              </Link>
            </li>
            <li>
              <Link to="/menu" className="footer-link">
                <span className="link-bullet">›</span> Function & Event Catering Services
              </Link>
            </li>
            <li>
              <Link to="/menu" className="footer-link">
                <span className="link-bullet">›</span> Special Non-Veg Curries (Daily Specials)
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Hours */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Visit & Order</h4>
          <ul className="footer-contact-list">
            <li className="contact-item">
              <MapPin size={18} className="contact-icon text-gold" />
              <span>{APP_CONFIG.contact.address}</span>
            </li>
            <li className="contact-item">
              <Phone size={18} className="contact-icon text-gold" />
              <div>
                <a href={`tel:${APP_CONFIG.contact.phone.replace(/\s+/g, '')}`} className="phone-link">
                  {APP_CONFIG.contact.phone}
                </a>
              </div>
            </li>
            <li className="contact-item">
              <Mail size={18} className="contact-icon text-gold" />
              <a href={`mailto:${APP_CONFIG.contact.email}`} className="phone-link">
                {APP_CONFIG.contact.email}
              </a>
            </li>
            <li className="contact-item">
              <Clock size={18} className="contact-icon text-gold" />
              <span>{APP_CONFIG.contact.timings}</span>
            </li>
          </ul>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-cta"
          >
            <MessageCircle size={18} />
            <span>Order via WhatsApp</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            © {currentYear} <strong>RAM & SHYAM QUALITY BIRIYANI</strong>. All Rights Reserved.
          </p>
          <div className="footer-tagline">
            <span>Authentic Taste</span> • <span>Premium Quality</span> • <span>Unforgettable Biryani</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
