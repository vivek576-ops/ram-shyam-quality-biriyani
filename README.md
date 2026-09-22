# 🍗 RAM & SHYAM QUALITY BIRIYANI — Premium Restaurant Web Application

A **high-end, modern, ultra-responsive, full-stack restaurant website** for **RAM & SHYAM QUALITY BIRIYANI**.

> **"Authentic Taste. Premium Quality. Unforgettable Biryani."**

Built with a luxury dark-gold visual theme, rich interactive dining tray (shopping cart), WhatsApp ordering concierge, and a Node.js + Express backend with resilient database handling.

---

## 🌟 Key Highlights & Features

### 1. 🎨 Luxury Aesthetic & Design
- **Theme**: Deep obsidian charcoal (`#0B0B0C`, `#121217`) paired with royal gold gradients (`#D4AF37`, `#F3C64F`), saffron amber accents, and crisp cream typography.
- **Typography**: Regal serif headings (*Cinzel* & *Playfair Display*) and modern UI (*Outfit* & *Plus Jakarta Sans*).
- **Micro-Interactions**: Glassmorphism, card elevation effects, glowing buttons, steam animations, and instant responsive layouts.

### 2. 📱 Complete 4 Core Pages (React Router v6)
1. **Home (`/`)**:
   - Majestic Hero section with live trust stats (32+ Spices, 100% Halal & Fresh, 25k+ Foodies, 15+ Yrs Tradition).
   - "Why Choose Us" 4 Pillars of Royal Quality.
   - Signature Dum Biryanis & Best-selling appetizers showcase.
   - Customer Testimonials grid with 5-star rating proof.
   - Interactive Restaurant Visit & Hotline banner.
2. **About Us (`/about`)**:
   - The Ram & Shyam legacy story (Est. 2011).
   - Step-by-step 4-Phase Dum Pukht cooking philosophy.
   - Sourcing & Kitchen Hygiene standards (FSSAI, zero synthetic colors, pure ghee).
   - **"Our Promise"** signature luxury banner.
   - Mission, Vision & Core Values.
3. **Menu (`/menu`)**:
   - Categories: **Biryani**, **Starters**, **Vegetarian**, **Beverages**, and **All**.
   - Live real-time search & dietary filter (All / Pure Veg / Non-Veg).
   - Menu cards with prices (in ₹), spice levels, portion sizes, detailed descriptions, and instant **Add to Tray** trigger.
   - Quick-view recipe and nutritional breakdown modal.
4. **Contact Us (`/contact`)**:
   - Real restaurant contact details (Address, Phone, WhatsApp, Support Email, Operating Hours).
   - Embedded Google Maps location.
   - Fully validated Contact Form connected directly to backend `POST /api/contact` with loading spinners and luxury success banner.

### 3. 🛍️ Interactive Cart & Dual Checkout System
- Persistent shopping tray with quantity adjuster, spice notes, and live totals calculation (Subtotal, 5% GST, Delivery fees).
- Order Type Selection: **Home Delivery**, **Takeaway**, or **Dine-In**.
- **Two Checkout Channels**:
  1. **Direct WhatsApp Order**: Formats complete itemized order with total, customer address, and sends directly to the restaurant's WhatsApp.
  2. **Online Backend Order**: Stores order securely in MongoDB / backend system and returns unique Order ID (e.g., `RSB-2026-XXXX`).

### 4. 💬 WhatsApp Integration
- Floating pulse widget fixed on every page.
- Fully configurable restaurant phone number via `.env` / `config.js`.
- Pre-filled message: *"Hello Ram & Shyam Quality Biriyani, I would like to know more about your menu and place an order."*

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router DOM (v6), Lucide Icons, CSS3 Variables & Glassmorphism.
- **Backend**: Node.js, Express.js, Mongoose (MongoDB), Helmet, CORS, Morgan.
- **Resilience**: Automatic in-memory fallback store if MongoDB is offline, guaranteeing 100% uptime for contact forms and orders during development.

---

## 📁 Project Structure

```text
ram-and-shyam-quality-biriyani/
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Sticky luxury navbar with cart badge
│   │   │   ├── Footer.jsx          # 4-column footer with hours & links
│   │   │   ├── WhatsAppButton.jsx  # Floating WhatsApp widget
│   │   │   ├── CartDrawer.jsx      # Slide-out interactive tray & checkout
│   │   │   ├── ItemDetailModal.jsx # Dish quick-view modal
│   │   │   └── Toast.jsx           # Floating toaster alerts
│   │   ├── context/
│   │   │   └── CartContext.jsx     # Global Cart state & WhatsApp link builder
│   │   ├── data/
│   │   │   └── menuData.js         # Menu dataset with pricing and photos
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Menu.jsx
│   │   │   └── Contact.jsx
│   │   ├── config.js               # WhatsApp & Contact config
│   │   ├── index.css               # Luxury Dark-Gold Theme CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB connection + in-memory fallback
│   ├── controllers/
│   │   ├── contactController.js    # Contact validation & storage
│   │   ├── menuController.js       # Menu API & seed loader
│   │   └── orderController.js      # Order processing & WhatsApp generator
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Order.js
│   │   └── MenuItem.js
│   ├── routes/
│   │   ├── contactRoutes.js
│   │   ├── menuRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── data/
│   │   └── seedData.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── .env.example
├── package.json                    # Root scripts for running both servers
└── README.md
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- *(Optional)* **MongoDB** running locally or via MongoDB Atlas URI.

### 2. Install Dependencies

You can install all dependencies for both frontend and backend using:

```bash
# In the root directory
npm run install:all
```

Or install separately:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configuration & Environment Variables

Create `.env` in the `backend/` folder:
```bash
# Copy backend example
cp backend/.env.example backend/.env
```

Ensure the variables are configured:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/ram_shyam_biriyani
WHATSAPP_NUMBER=919876543210
RESTAURANT_NAME="RAM & SHYAM QUALITY BIRIYANI"
```

> **Note on WhatsApp Number**: Enter country code followed by digits without `+` or spaces (e.g., `919876543210` for India).

---

## 💻 Running the Application

### Option A: Run Both Frontend & Backend Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```

### Option B: Run in Separate Terminals

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# App will open at http://localhost:5173
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server & Database Health status |
| `GET` | `/api/menu` | Fetch all menu items (supports `?category=`, `?search=`, `?isVeg=`) |
| `GET` | `/api/menu/:id` | Fetch single menu item details |
| `POST` | `/api/contact` | Submit contact inquiry (validates Name, Phone, Email, Message) |
| `GET` | `/api/contact` | View received inquiries |
| `POST` | `/api/orders` | Create order & receive verified totals + WhatsApp payload |
| `GET` | `/api/orders/:orderId` | Track order by Order ID |

---

## 🛡️ License

© 2026 **RAM & SHYAM QUALITY BIRIYANI**. All Rights Reserved.
