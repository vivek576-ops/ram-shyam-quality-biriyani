import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, Flame, PhoneCall, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { APP_CONFIG } from '../config';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart, subtotal } = useCart();
  const location = useLocation();

  // Scroll listener for sticky glass header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Catering', path: '/catering' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Banner with phone & timing */}
      <div className="top-announcement-bar">
        <div className="container top-bar-container">
          <div className="top-bar-left">
            <span className="live-pill">
              <span className="live-dot"></span> PRE-BOOKING OPEN
            </span>
            <span className="top-bar-text">
              <Clock size={13} className="top-bar-icon" /> 11:30 AM – 11:00 PM • Counter Parcel Pickup
            </span>
          </div>
          <div className="top-bar-right">
            <a href={`tel:${APP_CONFIG.contact.phone.replace(/\s+/g, '')}`} className="top-bar-link">
              <PhoneCall size={13} className="top-bar-icon" /> Hotline: {APP_CONFIG.contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-emblem">
              <Flame className="logo-icon" size={24} />
            </div>
            <div className="logo-text-group">
              <span className="logo-title">RAM & SHYAM</span>
              <span className="logo-subtitle">QUALITY BIRIYANI</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-links-list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'nav-link-active' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: Parcel Tray Trigger + Pre-Book CTA */}
          <div className="navbar-actions">
            {/* Parcel Tray Trigger */}
            <button
              onClick={openCart}
              className="cart-btn"
              aria-label={`View Parcel Tray (${totalItems} items)`}
            >
              <div className="cart-icon-wrapper">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </div>
              <span className="cart-btn-price d-none-mobile">
                {subtotal > 0 ? `₹${subtotal}` : 'Parcel Tray'}
              </span>
            </button>

            {/* Pre-Book CTA */}
            <Link to="/menu" className="btn-primary-gold btn-order-now">
              <span>Pre-Book Food</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <div className="mobile-nav-content">
            <div className="mobile-logo-header">
              <div className="logo-text-group">
                <span className="logo-title">RAM & SHYAM</span>
                <span className="logo-subtitle">QUALITY BIRIYANI</span>
              </div>
            </div>

            <ul className="mobile-links-list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'mobile-link-active' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-footer">
              <Link to="/menu" className="btn-primary-gold btn-block">
                View Menu & Pre-Book
              </Link>
              <div className="mobile-contact-pill">
                <PhoneCall size={16} />
                <span>Call Hotel: {APP_CONFIG.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
