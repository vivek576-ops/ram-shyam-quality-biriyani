import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import ItemDetailModal from './components/ItemDetailModal';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Catering from './pages/Catering';

// Scroll to top automatically on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app-shell">
          {/* Universal Sticky Navbar */}
          <Navbar />

          {/* Core Routes */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/catering" element={<Catering />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Universal Footer */}
          <Footer />

          {/* Floating WhatsApp Widget on All Pages */}
          <WhatsAppButton />

          {/* Interactive Cart Drawer */}
          <CartDrawer />

          {/* Quick-view Recipe & Item Detail Modal */}
          <ItemDetailModal />

          {/* Global Toast Notifications */}
          <Toast />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
