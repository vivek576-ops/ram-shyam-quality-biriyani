import React, { createContext, useContext, useState, useEffect } from 'react';
import { APP_CONFIG } from '../config';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_biryani_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [orderType, setOrderType] = useState('Takeaway'); // 'Delivery' | 'Takeaway' | 'Dine-In'

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rs_biryani_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  // Toast Notification System
  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add Item to Cart
  const addToCart = (item, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });

    addToast(`Added "${item.name}" (x${qty}) to your cart! 🍗`, 'success');
  };

  // Update Item Quantity
  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove Item
  const removeFromCart = (id) => {
    const item = cartItems.find(i => i.id === id);
    setCartItems(prev => prev.filter(i => i.id !== id));
    if (item) {
      addToast(`Removed "${item.name}" from cart`, 'info');
    }
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Totals Calculations
  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

// Takeaway Parcel — no GST or delivery fee added in the website total
  const tax = 0;
  const deliveryFee = 0;

  const grandTotal = subtotal;

  // Drawer Controls
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Quick View Modal Controls
  const openItemModal = (item) => setSelectedItem(item);
  const closeItemModal = () => setSelectedItem(null);

  // Generate WhatsApp Order URL
  const generateWhatsAppUrl = (customer) => {
    const phone = APP_CONFIG.whatsappNumber;
    let text = `*🍗 ${APP_CONFIG.restaurantName} - DIRECT ORDER*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Customer:* ${customer.name || 'Guest'}\n`;
    text += `*Phone:* ${customer.phone || 'Not Provided'}\n`;
    text += `*Order Type:* ${orderType}\n`;
    if (customer.address && orderType === 'Delivery') {
      text += `*Address:* ${customer.address}\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*ORDER ITEMS:*\n`;
    cartItems.forEach((it, idx) => {
      text += `${idx + 1}. ${it.name} x ${it.quantity} = ₹${it.price * it.quantity}\n`;
    });
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Subtotal:* ₹${subtotal}\n`;
    text += `*Takeaway Packaging:* FREE Hot Packing\n`;
    text += `*GRAND TOTAL: ₹${grandTotal}*\n`;
    if (customer.instructions) {
      text += `*Note:* ${customer.instructions}\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `_Please confirm my order. Thank you!_`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        tax,
        deliveryFee,
        grandTotal,
        orderType,
        setOrderType,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        selectedItem,
        openItemModal,
        closeItemModal,
        toasts,
        addToast,
        removeToast,
        generateWhatsAppUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
