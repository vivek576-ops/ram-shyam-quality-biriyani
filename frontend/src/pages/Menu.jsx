import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Flame, ShoppingBag, Store, Check, Sparkles, X, Lock, RefreshCw, MessageCircle, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import DailyCurryManagerModal from '../components/DailyCurryManagerModal';
import { APP_CONFIG } from '../config';
import { getDishImage } from '../utils/imageHelper';

const Menu = () => {
  const { addToCart, openItemModal } = useCart();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('ALL'); // 'ALL' | 'VEG' | 'NON_VEG'
  const [addedItemIds, setAddedItemIds] = useState({});

  // Owner Daily Curries Modal State
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [dailySpecialsList, setDailySpecialsList] = useState([]);
  const [todayDateStr, setTodayDateStr] = useState('');

  // Fetch live daily specials from backend
  const fetchDailySpecials = async () => {
    try {
      const res = await fetch(`${APP_CONFIG.apiBaseUrl}/api/daily-specials`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setDailySpecialsList(json.data);
          if (json.todayDate) setTodayDateStr(json.todayDate);
        }
      }
    } catch (e) {
      console.warn('Could not fetch daily specials from backend', e);
    }
  };

  useEffect(() => {
    fetchDailySpecials();
  }, []);

  // Sync category if URL search param changes
  useEffect(() => {
    const cat = new URLSearchParams(location.search).get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location.search]);

  // Map ALL active uploaded daily curries (both Veg and Non-Veg!)
  const activeUploadedCurries = dailySpecialsList
    .filter(item => item.isAvailableToday !== false)
    .map(s => {
      const isPureVeg = s.isVeg !== false && s.isVeg !== 'false';
      return {
        id: s._id || `dcurry-${s.name.replace(/\s+/g, '-').toLowerCase()}`,
        name: s.name,
        category: isPureVeg ? 'Curries' : 'Non-Veg',
        price: Number(s.price) || (isPureVeg ? 40 : 120),
        description: s.description || (isPureVeg ? 'Fresh vegetable curry cooked fresh today. Uploaded daily with cost.' : 'Freshly cooked authentic non-veg curry.'),
        detailedDescription: s.detailedDescription || s.description || 'Cooked fresh today with authentic local spices. Packed hot in 250ml container.',
        image: getDishImage(s.name, isPureVeg, s.image),
        isVeg: isPureVeg,
        isBestseller: true,
        isSpecial: true,
        isDailySpecialItem: true,
        spiceLevel: s.spiceLevel || 'Medium',
        portionSize: s.portionSize || '250ml Hot Parcel Container',
        prepTime: 'Fresh Today (Uploaded Daily)'
      };
    });

  // Base static items (3 Biryanis, Meals, Veg Biryani, Sambar, Dal)
  const baseStaticItems = MENU_ITEMS.filter(item => !item.isDailySpecialItem);
  const defaultDailyCurry = MENU_ITEMS.find(item => item.isDailySpecialItem);

  // If owner uploaded active daily curries, include all of them!
  // If none active, fallback to the default Stuffed Brinjal Curry
  const curriesToDisplay = activeUploadedCurries.length > 0 
    ? activeUploadedCurries 
    : (defaultDailyCurry ? [defaultDailyCurry] : []);

  const combinedMenuItems = [
    ...baseStaticItems.map(dish => ({
      ...dish,
      image: getDishImage(dish.name, dish.isVeg, dish.image)
    })),
    ...curriesToDisplay
  ];

  const categories = ['All', 'Non-Veg', 'Veg', 'Curries'];

  const handleAddToCart = (dish) => {
    const itemToOrder = {
      ...dish,
      price: dish.price,
      selectedSize: dish.portionSize || 'Parcel Box'
    };

    addToCart(itemToOrder, 1);
    setAddedItemIds(prev => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  // Filter items
  const filteredItems = combinedMenuItems.filter((item) => {
    // Category match
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Curries') {
        // Under Curries tab, show Sambar, Dal, and ANY uploaded curry (Veg or Non-Veg)
        if (item.category !== 'Curries' && !item.isDailySpecialItem) {
          return false;
        }
      } else if (selectedCategory === 'Non-Veg') {
        // Under Non-Veg tab, show Non-Veg Biryanis and any uploaded Non-Veg Curries
        if (item.isVeg) return false;
      } else if (selectedCategory === 'Veg') {
        // Under Veg tab, show only Veg items
        if (!item.isVeg) return false;
      }
    }

    // Dietary match
    if (dietaryFilter === 'VEG' && !item.isVeg) return false;
    if (dietaryFilter === 'NON_VEG' && item.isVeg) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  return (
    <div className="menu-page">
      {/* 1. MENU HERO HEADER */}
      <section className="page-hero-banner menu-hero-banner">
        <div className="container">
          <div className="page-hero-content">
            <div className="service-model-badge">
              <Store size={16} className="text-gold" />
              <span>HOT PARCELS READY DAILY • COUNTER PICKUP AT IRUSUMANDA</span>
            </div>
            <h1 className="page-hero-title">
              Our Authentic <span className="text-gold">Restaurant Menu</span>
            </h1>
            <p className="page-hero-sub">
              Freshly cooked <strong>Chicken Fry Piece Biryani</strong> (Single, Full, Family Pack), traditional <strong>Veg Meals & Veg Biryani</strong>, and hot <strong>Curries (Sambar, Dal & Daily Fresh Curries)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TODAY'S DAILY CURRIES BANNER WITH OWNER UPLOAD TRIGGER */}
      <section className="daily-curries-highlight-section">
        <div className="container">
          <div className="daily-curries-card">
            <div className="daily-curries-left">
              <div className="daily-tag">
                <Sparkles size={16} className="text-gold" />
                <span>TODAY’S FRESH CURRIES ({todayDateStr || 'Freshly Cooked Daily'})</span>
              </div>
              <h3 className="daily-heading">Daily Fresh Curries — Cooked Fresh Every Morning</h3>
              <p className="daily-text">
                Fresh vegetable and non-veg curries cooked daily with authentic local spices. Packed hot in 250ml parcel containers.
              </p>
            </div>

            <div className="daily-curries-right">
              {/* Owner Portal Quick Button */}
              <button
                type="button"
                onClick={() => setIsOwnerModalOpen(true)}
                className="btn-owner-manager"
                title="Restaurant Owner: Upload Today's Curry"
              >
                <Lock size={15} />
                <span>Owner: Upload Today’s Curry & Cost (Veg / Non-Veg)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MENU CONTROLS & FILTER BAR */}
      <section className="menu-controls-section">
        <div className="container">
          <div className="menu-controls-card">
            {/* Search Input */}
            <div className="search-bar-wrapper">
              <Search className="search-icon text-gold" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Biryani, Meals, Sambar, Dal, Curries..."
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="dietary-filter-group">
              <button
                type="button"
                className={`dietary-btn ${dietaryFilter === 'ALL' ? 'dietary-active' : ''}`}
                onClick={() => setDietaryFilter('ALL')}
              >
                All Items
              </button>
              <button
                type="button"
                className={`dietary-btn veg-pill ${dietaryFilter === 'VEG' ? 'dietary-active-veg' : ''}`}
                onClick={() => setDietaryFilter('VEG')}
              >
                <span className="dot-veg"></span> Pure Veg
              </button>
              <button
                type="button"
                className={`dietary-btn nonveg-pill ${dietaryFilter === 'NON_VEG' ? 'dietary-active-nonveg' : ''}`}
                onClick={() => setDietaryFilter('NON_VEG')}
              >
                <span className="dot-nonveg"></span> Non-Veg
              </button>
            </div>
          </div>

          {/* Category Navigation Tabs */}
          <div className="category-tabs-row">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-tab-btn ${selectedCategory === cat ? 'category-tab-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'Non-Veg' && '🍗 '}
                {cat === 'Veg' && '🥗 '}
                {cat === 'Curries' && '🍲 '}
                {cat === 'All' && '✨ '}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MENU ITEMS GRID */}
      <section className="section menu-items-section">
        <div className="container">
          <div className="results-status-bar">
            <div className="results-count">
              Showing <strong>{filteredItems.length}</strong> items in{' '}
              <span className="text-gold">"{selectedCategory}"</span>
            </div>
            {(searchQuery || dietaryFilter !== 'ALL' || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDietaryFilter('ALL');
                  setSelectedCategory('All');
                }}
                className="reset-filters-link"
              >
                Reset all filters
              </button>
            )}
          </div>

          {filteredItems.length === 0 ? (
            /* No Results */
            <div className="no-results-box">
              <div className="no-results-icon">🍲</div>
              <h3>No matching dishes found</h3>
              <p>Try searching for a different dish name or reset your category filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDietaryFilter('ALL');
                  setSelectedCategory('All');
                }}
                className="btn-primary-gold mt-4"
              >
                Show All Menu Items
              </button>
            </div>
          ) : (
            /* Menu Grid */
            <div className="menu-grid full-menu-grid">
              {filteredItems.map((dish) => {
                return (
                  <div key={dish.id} className="menu-card full-card">
                    {/* Image Media with name-based photo */}
                    <div className="menu-card-media" onClick={() => openItemModal(dish)}>
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="menu-card-img"
                        loading="lazy"
                      />
                      <div className="menu-card-overlay">
                        <span className="quick-view-badge">Quick View & Details</span>
                      </div>

                      {/* Badges */}
                      <div className="card-top-tags">
                        {dish.isVeg ? (
                          <span className="badge-veg">● Pure Veg</span>
                        ) : (
                          <span className="badge-nonveg">▲ Non-Veg</span>
                        )}
                        {dish.isBestseller && (
                          <span className="badge-bestseller">★ Bestseller</span>
                        )}
                        {dish.isDailySpecialItem && (
                          <span className="badge-special">★ Today's Fresh Curry</span>
                        )}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="menu-card-body">
                      <div className="card-title-price">
                        <h3
                          className="card-item-title"
                          onClick={() => openItemModal(dish)}
                        >
                          {dish.name}
                        </h3>
                        <span className="card-item-price">₹{dish.price}</span>
                      </div>

                      <p className="card-item-desc">{dish.description}</p>

                      <div className="card-meta-row">
                        <span className="portion-tag">
                          {dish.portionSize}
                        </span>
                        <span className="spice-tag flex-center text-gold">
                          <Flame size={13} className="mr-1" /> {dish.spiceLevel || 'Medium'}
                        </span>
                      </div>

                      {/* Actions: Pre-Book Parcel */}
                      <div className="card-actions-row">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(dish)}
                          className={`btn-primary-gold btn-block add-cart-btn ${
                            addedItemIds[dish.id] ? 'btn-success-green' : ''
                          }`}
                        >
                          {addedItemIds[dish.id] ? (
                            <>
                              <Check size={18} />
                              <span>Added to Parcel Tray!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={18} />
                              <span>Pre-Book Parcel (₹{dish.price})</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 5. HOTEL CONTACT & HOTLINE INFO BANNER */}
      <section className="section bg-card-dark py-4">
        <div className="container">
          <div className="catering-banner-card">
            <div className="catering-content">
              <span className="section-label text-gold">HOT PARCELS & PRE-BOOKING</span>
              <h2 className="section-heading">Pre-Book Online & Collect Fresh at Counter</h2>
              <p className="catering-text">
                Enjoy hot Chicken Fry Piece Biryani, pure Veg Meals, and fresh Curries prepared daily at our Irusumanda hotel. Pre-book your parcel to skip waiting!
              </p>
              <div className="catering-actions mt-3">
                <a
                  href={`https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Ram & Shyam Quality Biriyani, I would like to place a food parcel order.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-chat"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp Order (7032118129)</span>
                </a>
                <a
                  href={`tel:${APP_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                  className="btn-secondary-outline"
                >
                  <PhoneCall size={18} />
                  <span>Call Hotel: {APP_CONFIG.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Daily Curries Management Modal */}
      <DailyCurryManagerModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        dailyCurries={dailySpecialsList}
        onCurriesUpdated={fetchDailySpecials}
      />
    </div>
  );
};

export default Menu;
