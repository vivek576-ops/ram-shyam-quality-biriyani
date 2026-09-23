import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Star, ShieldCheck, Clock, Award, ShoppingBag, ArrowRight, Sparkles, Heart, ChevronRight, CheckCircle2, MapPin, Phone, Store, Utensils, MessageCircle, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';
import { APP_CONFIG } from '../config';

const Home = () => {
  const { addToCart, openItemModal } = useCart();

  // Signature dishes
  const fryPieceBiryani = MENU_ITEMS.find(item => item.id === 'bir-cf-full') || MENU_ITEMS[0];
  const vegAndCurryItems = MENU_ITEMS.filter(item => item.category === 'Veg' || item.category === 'Curries').slice(0, 4);

  const testimonials = [
    {
      id: 1,
      name: 'Ramesh Varma',
      role: 'Regular Customer (Ambajipeta)',
      rating: 5,
      comment: 'The Chicken Fry Piece Biryani is hands down the best in the Ambajipeta - Irusumanda area! The crispy spiced chicken with the aromatic basmati rice is top notch. Pre-booking saves waiting time at the counter.',
      dish: 'Chicken Fry Piece Biryani (Full)'
    },
    {
      id: 2,
      name: 'Lakshmi Narayana',
      role: 'Regular Customer (Irusumanda)',
      rating: 5,
      comment: 'Their pure Veg Meals and hot Sambar & Dal parcels are fresh and comforting. Quality rice, authentic flavor, and quick service.',
      dish: 'South Indian Veg Meals'
    },
    {
      id: 3,
      name: 'Kavitha Devi',
      role: 'Family Regular',
      rating: 5,
      comment: 'Their daily fresh Veg Curries like Gutti Vankaya and Paneer with hot rice are unbeatable. Everything is packed piping hot in clean sealed containers.',
      dish: 'Daily Fresh Veg Curries'
    }
  ];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-overlay"></div>
        <div className="hero-glow-sphere"></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            {/* Service Badge */}
            <div className="hero-badge animate-fade-in">
              <Store size={16} className="text-gold" />
              <span>HOT TAKEAWAY PARCELS • COUNTER PICKUP AT IRUSUMANDA</span>
            </div>

            {/* Restaurant Title */}
            <h1 className="hero-title animate-slide-up">
              RAM & SHYAM
              <span className="hero-title-highlight">QUALITY BIRIYANI</span>
            </h1>

            {/* Tagline */}
            <p className="hero-tagline animate-slide-up delay-1">
              "Authentic Taste. Premium Quality. Unforgettable Biryani."
            </p>

            <p className="hero-desc animate-slide-up delay-2">
              Serving our famous <strong>Chicken Fry Piece Biryani</strong> (Single ₹120, Full ₹200, Family Pack ₹350), traditional <strong>Veg Meals (₹60) & Veg Biryani (₹70)</strong>, and fresh <strong>Curries (Sambar ₹20, Dal ₹20 & Daily Veg Curries)</strong>. Pre-book your hot parcel online and collect fresh at our hotel!
            </p>

            {/* CTAs */}
            <div className="hero-cta-group animate-slide-up delay-3">
              <Link to="/menu" className="btn-primary-gold hero-btn-main">
                <ShoppingBag size={20} />
                <span>Pre-Book Food Parcel</span>
              </Link>

              <a
                href={`https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Ram & Shyam Quality Biriyani, I would like to place a food order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-chat hero-btn-sub"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Order (7032118129)</span>
              </a>
            </div>

            {/* Live Stats */}
            <div className="hero-stats-row animate-fade-in delay-4">
              <div className="stat-item">
                <span className="stat-number">₹120 / ₹200 / ₹350</span>
                <span className="stat-label">Chicken Fry Piece Biryani</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">₹60 / ₹70</span>
                <span className="stat-label">Veg Meals & Veg Biryani</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">₹20</span>
                <span className="stat-label">Hot Sambar & Dal</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">0 Min</span>
                <span className="stat-label">Counter Waiting</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Food Graphic Card */}
          <div className="hero-visual-wrapper animate-fade-in">
            <div className="hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
                alt="Ram & Shyam Chicken Fry Piece Biryani Parcel"
                className="hero-main-img"
              />
              <div className="hero-floating-card top-float">
                <Flame size={20} className="text-gold" />
                <div>
                  <div className="card-mini-title">Chicken Fry Piece Biryani</div>
                  <div className="card-mini-sub">Single (₹120) • Full (₹200) • Family (₹350)</div>
                </div>
              </div>

              <div className="hero-floating-card bottom-float">
                <div className="rating-pill">
                  <Star size={16} fill="#D4AF37" color="#D4AF37" />
                  <strong>Irusumanda, Ambajipeta Rd</strong>
                </div>
                <span className="card-mini-sub">Hotline: 7032118129</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW TAKEAWAY PRE-BOOKING WORKS */}
      <section className="section py-4 bg-card-dark">
        <div className="container">
          <div className="delivery-perks-grid">
            <div className="perk-item">
              <span className="perk-icon">📱</span>
              <div>
                <h4>1. Pre-Book Online / WhatsApp</h4>
                <p>Choose your Biryani size or Veg items and select your pickup quantity.</p>
              </div>
            </div>
            <div className="perk-item">
              <span className="perk-icon">🍲</span>
              <div>
                <h4>2. Fresh Hot Handi Packing</h4>
                <p>We pack your food fresh in hot, leak-proof, food-grade parcel containers.</p>
              </div>
            </div>
            <div className="perk-item">
              <span className="perk-icon">🏪</span>
              <div>
                <h4>3. Hotel Counter Pickup</h4>
                <p>Visit our hotel in Irusumanda, show your token/WhatsApp, and collect instantly!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE CHICKEN FRY PIECE BIRYANI SHOWCASE */}
      {fryPieceBiryani && (
        <section className="section signature-section">
          <div className="container">
            <div className="section-header-center">
              <span className="section-label">OUR SPECIALITY DELICACY</span>
              <h2 className="section-heading">Signature Chicken Fry Piece Biryani</h2>
              <div className="gold-divider-line"></div>
              <p className="section-subtitle">
                Prepared with succulent, crispy marinated chicken pieces, whole spices, and fragrant basmati rice. Available in Single, Full, and Family Pack sizes.
              </p>
            </div>

            <div className="featured-fry-piece-grid">
              <div className="fry-piece-showcase-card">
                <div className="fry-piece-img-box" onClick={() => openItemModal(fryPieceBiryani)}>
                  <img src={fryPieceBiryani.image} alt={fryPieceBiryani.name} className="fry-piece-img" />
                  <div className="card-top-tags">
                    <span className="badge-nonveg">▲ Non-Veg</span>
                    <span className="badge-bestseller">★ Most Popular</span>
                  </div>
                </div>

                <div className="fry-piece-info-box">
                  <div className="title-row">
                    <h3>Chicken Fry Piece Biryani</h3>
                    <span className="price-tag text-gold">₹120 – ₹350</span>
                  </div>
                  <p className="desc-text">{fryPieceBiryani.detailedDescription}</p>

                  {/* 3 Portion Sizes Box */}
                  <div className="sizes-pricing-grid">
                    <div className="size-price-card">
                      <span className="s-name">Single Portion</span>
                      <strong className="s-price text-gold">₹120</strong>
                      <span className="s-serves">Serves 1 • Chicken Fry Piece</span>
                    </div>
                    <div className="size-price-card size-card-featured">
                      <span className="s-name">Full Portion</span>
                      <strong className="s-price text-gold">₹200</strong>
                      <span className="s-serves">Serves 1-2 • Generous Pcs</span>
                    </div>
                    <div className="size-price-card">
                      <span className="s-name">Family Pack</span>
                      <strong className="s-price text-gold">₹350</strong>
                      <span className="s-serves">Serves 3-4 • Jumbo Container + Eggs</span>
                    </div>
                  </div>

                  <div className="actions-row mt-4">
                    <Link to="/menu" className="btn-primary-gold btn-block">
                      <ShoppingBag size={18} />
                      <span>Pre-Book Chicken Fry Piece Biryani</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. VEG MEALS & FRESH CURRIES SHOWCASE */}
      <section className="section bg-card-dark">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">HOT VEG MEAL PACKS & FRESH CURRIES</span>
              <h2 className="section-heading">Veg Meals, Veg Biryani & Fresh Curries</h2>
            </div>
            <Link to="/menu" className="btn-secondary-outline d-none-mobile">
              <span>View Full Menu</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="menu-grid four-col-grid mt-4">
            {vegAndCurryItems.map((item) => (
              <div key={item.id} className="menu-card mini-card">
                <div className="menu-card-media" onClick={() => openItemModal(item)}>
                  <img src={item.image} alt={item.name} className="menu-card-img" />
                  <div className="card-top-tags">
                    <span className="badge-veg">● Pure Veg</span>
                  </div>
                </div>

                <div className="menu-card-body">
                  <div className="card-title-price">
                    <h4 className="card-item-title" onClick={() => openItemModal(item)}>
                      {item.name}
                    </h4>
                    <span className="card-item-price">₹{item.price}</span>
                  </div>
                  <p className="card-item-desc short-desc">{item.description}</p>
                  
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="btn-primary-gold btn-block add-cart-btn mt-2"
                  >
                    <ShoppingBag size={16} />
                    <span>Pre-Book (₹{item.price})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">CUSTOMER REVIEWS</span>
            <h2 className="section-heading">Loved by Foodies in Irusumanda</h2>
            <div className="gold-divider-line"></div>
          </div>

          <div className="testimonials-grid mt-4">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="t-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <p className="t-comment">"{t.comment}"</p>
                <div className="t-user">
                  <div>
                    <strong className="t-name">{t.name}</strong>
                    <span className="t-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
