import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ShieldCheck, Heart, Award, Sparkles, CheckCircle2, UtensilsCrossed, Users, Compass, Eye, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../config';

const About = () => {
  return (
    <div className="about-page">
      {/* 1. ABOUT HERO HEADER */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-label">OUR LEGACY & PASSION</span>
            <h1 className="page-hero-title">
              The Story of <span className="text-gold">Ram & Shyam</span>
            </h1>
            <p className="page-hero-sub">
              A decades-old celebration of royal Hyderabadi culinary craftsmanship, authentic secret spices, and unconditional love for biryani.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE ORIGIN STORY */}
      <section className="section about-story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image-column">
              <div className="story-image-card">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80"
                  alt="Ram & Shyam handi dum preparation"
                  className="story-main-image"
                />
                <div className="story-caption-overlay">
                  <span className="story-badge">EST. 2011</span>
                  <h4>Mastering the Dum Pukht Legacy</h4>
                </div>
              </div>
            </div>

            <div className="story-text-column">
              <span className="section-label">HOW IT ALL BEGAN</span>
              <h2 className="section-heading">
                A Journey Born from <span className="text-gold">Uncompromising Taste</span>
              </h2>
              <div className="gold-divider-line align-left"></div>

              <p className="section-text">
                Founded with a deep devotion to authentic culinary craftsmanship, <strong>RAM & SHYAM QUALITY BIRIYANI</strong> in Irusumanda (Puletikuru - Ambajipeta Road) was created with a single, unwavering mission: to serve unforgettable <strong>Chicken Fry Piece Biryani</strong>, wholesome <strong>Rice & Veg Curries Meals</strong>, and dependable <strong>Event Catering Services</strong>.
              </p>

              <p className="section-text">
                In an era of commercial shortcuts, we refuse to compromise. Our signature Chicken Fry Piece Biryani is made with crispy, locally-spiced chicken layered over fragrant basmati rice. Our daily fresh vegetable curries are cooked fresh every dawn with farm-sourced produce, and our catering team serves functions across Irusumanda and surrounding regions.
              </p>

              <div className="story-quote-box">
                <p className="quote-text">
                  "Biryani is not fast food. It is our heritage written in saffron, basmati, and genuine passion."
                </p>
                <span className="quote-author">— Ram & Shyam Quality Biriyani</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR COOKING PHILOSOPHY (The 4 Sacred Steps) */}
      <section className="section philosophy-section bg-card-dark">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">CULINARY RIGOR</span>
            <h2 className="section-heading">Our 4-Step Dum Pukht Philosophy</h2>
            <div className="gold-divider-line"></div>
            <p className="section-subtitle">
              We practice the authentic Mughal and Nizami method of Dum Pukht (slow-breathing cooking).
            </p>
          </div>

          <div className="steps-process-grid">
            <div className="step-process-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Overnight Marination</h3>
              <p className="step-desc">
                Fresh meat cuts are bathed in thick hung yogurt, freshly pounded ginger-garlic paste, raw papaya, and 32 secret whole spices for deep tenderness.
              </p>
            </div>

            <div className="step-process-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Aged Basmati Rice</h3>
              <p className="step-desc">
                2-year aged long-grain basmati is parboiled with whole spices, cinnamon sticks, and bay leaves until precisely 70% cooked to absorb rich gravy.
              </p>
            </div>

            <div className="step-process-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Dough-Sealed Handi</h3>
              <p className="step-desc">
                Layers of marinated meat, saffron milk, fried onions (birista), fresh mint, coriander, and pure cow ghee are hermetically sealed with fresh dough.
              </p>
            </div>

            <div className="step-process-card">
              <div className="step-number">04</div>
              <h3 className="step-title">Gentle Charcoal Dum</h3>
              <p className="step-desc">
                Placed over glowing wood charcoal, the trapped steam (dum) circulates inside the vessel, infusing every grain with unforgettable aroma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. QUALITY INGREDIENTS & HYGIENE */}
      <section className="section ingredients-section">
        <div className="container">
          <div className="ingredients-grid">
            <div className="ingredients-text-column">
              <span className="section-label">SOURCING & CLEANLINESS</span>
              <h2 className="section-heading">
                Quality You Can Taste, <br />
                <span className="text-gold">Hygiene You Can Trust</span>
              </h2>
              <div className="gold-divider-line align-left"></div>

              <p className="section-text">
                Every ingredient in our kitchen is hand-selected each morning. We never use artificial colors, chemical tenderizers, MSG, or stale reheated food.
              </p>

              <div className="hygiene-feature-stack">
                <div className="hygiene-item">
                  <div className="hygiene-icon-box">
                    <ShieldCheck size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4>FSSAI Certified & Spotless Kitchens</h4>
                    <p>Strict daily sanitation protocols, temperature checks, and UV sterilized cooking stations.</p>
                  </div>
                </div>

                <div className="hygiene-item">
                  <div className="hygiene-icon-box">
                    <Sparkles size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4>Pure Saffron & Golden Cow Ghee</h4>
                    <p>We infuse genuine Kashmiri saffron strands and pure desi cow ghee for natural radiance and aroma.</p>
                  </div>
                </div>

                <div className="hygiene-item">
                  <div className="hygiene-icon-box">
                    <Award size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4>Daily Fresh Farm Poultry & Halal Meat</h4>
                    <p>Sourced from trusted ethical suppliers every dawn. 100% Halal certified and freshly cut.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ingredients-visual-column">
              <div className="ingredients-collage">
                <img
                  src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80"
                  alt="Fresh biryani ingredients"
                  className="ing-img-1"
                />
                <div className="ing-floating-badge">
                  <Sparkles size={20} className="text-gold" />
                  <span>100% Natural Flavors Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "OUR PROMISE" SECTION */}
      <section className="section promise-full-section bg-card-dark">
        <div className="container">
          <div className="promise-royal-box">
            <div className="royal-crest">
              <Flame size={36} className="text-gold" />
            </div>
            <span className="section-label text-gold">UNWAVERING COMMITMENT</span>
            <h2 className="promise-main-heading">Our Promise</h2>
            <div className="gold-divider-line"></div>

            <blockquote className="promise-grand-quote">
              "Every plate of biryani is prepared with carefully selected ingredients, authentic spices, and a passion for delivering unforgettable taste."
            </blockquote>

            <div className="promise-sign-block">
              <span className="sign-brand">RAM & SHYAM QUALITY BIRIYANI</span>
              <span className="sign-sub">Hyderabad • Since 2011</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MISSION & VISION */}
      <section className="section mission-vision-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <Compass size={32} className="text-gold" />
              </div>
              <h3 className="mission-title">Our Mission</h3>
              <p className="mission-text">
                To preserve the sacred legacy of slow-cooked Hyderabadi Dum Biryani by upholding pristine hygiene, unadulterated royal spices, and making world-class gourmet biryani accessible and affordable for every family.
              </p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <Eye size={32} className="text-gold" />
              </div>
              <h3 className="mission-title">Our Vision</h3>
              <p className="mission-text">
                To be celebrated as the undisputed gold standard for authentic Dum Pukht cuisine across India, revered for our unwavering quality, warmth of hospitality, and unforgettable flavor consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CUSTOMERS TRUST US */}
      <section className="section trust-section bg-card-dark">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">THE TRUST FACTOR</span>
            <h2 className="section-heading">Why Thousands of Families Trust Us</h2>
            <div className="gold-divider-line"></div>
          </div>

          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-stat">25,000+</span>
              <h4 className="trust-label">Happy Guests Served</h4>
              <p className="trust-sub">Consistently rated 4.9/5 stars across all major food platforms.</p>
            </div>

            <div className="trust-item">
              <span className="trust-stat">100%</span>
              <h4 className="trust-label">Fresh Batches</h4>
              <p className="trust-sub">Never stored overnight. Every handi is prepared fresh for the day.</p>
            </div>

            <div className="trust-item">
              <span className="trust-stat">0%</span>
              <h4 className="trust-label">Artificial Additives</h4>
              <p className="trust-sub">Pure color from saffron, chili and turmeric—no chemical dyes ever.</p>
            </div>

            <div className="trust-item">
              <span className="trust-stat">15-20m</span>
              <h4 className="trust-label">Hot Parcel Pickup</h4>
              <p className="trust-sub">Piping hot insulated takeaway packaging ready at hotel counter.</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/menu" className="btn-primary-gold btn-lg">
              <span>Experience The Taste • View Menu</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
