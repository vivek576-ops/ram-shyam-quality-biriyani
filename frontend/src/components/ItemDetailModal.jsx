import React, { useState, useEffect } from 'react';
import { X, Flame, Clock, Sparkles, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ItemDetailModal = () => {
  const { selectedItem, closeItemModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setQuantity(1);
      if (selectedItem.variants && selectedItem.variants.length > 0) {
        const defaultVar = selectedItem.variants.find(v => v.isDefault) || selectedItem.variants[0];
        setSelectedVariant(defaultVar);
      } else {
        setSelectedVariant(null);
      }
    }
  }, [selectedItem]);

  if (!selectedItem) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : selectedItem.price;

  const handleAdd = () => {
    const itemToAdd = {
      ...selectedItem,
      price: currentPrice,
      selectedSize: selectedVariant ? selectedVariant.size : (selectedItem.portionSize || 'Regular')
    };
    addToCart(itemToAdd, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeItemModal();
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={closeItemModal}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeItemModal} className="modal-close-btn" aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-image-wrapper">
          <img src={selectedItem.image} alt={selectedItem.name} className="modal-item-img" />
          <div className="modal-badge-row">
            {selectedItem.isVeg ? (
              <span className="badge-veg">● Pure Veg</span>
            ) : (
              <span className="badge-nonveg">▲ Non-Veg</span>
            )}
            {selectedItem.isBestseller && (
              <span className="badge-bestseller">★ Bestseller</span>
            )}
            {selectedItem.isSpecial && (
              <span className="badge-special">👑 Chef Special</span>
            )}
          </div>
        </div>

        <div className="modal-body-content">
          <div className="modal-title-row">
            <div>
              <h3 className="modal-item-title">{selectedItem.name}</h3>
              <span className="category-pill-label text-gold text-xs font-semibold">{selectedItem.category}</span>
            </div>
            <span className="modal-item-price">₹{currentPrice}</span>
          </div>

          <p className="modal-item-desc">
            {selectedItem.detailedDescription || selectedItem.description}
          </p>

          {/* Variant / Size Options Selector (e.g. for Chicken Fry Piece Biryani) */}
          {selectedItem.variants && selectedItem.variants.length > 0 && (
            <div className="modal-variants-section">
              <label className="variants-heading">Select Portion Size for Parcel:</label>
              <div className="variant-options-grid">
                {selectedItem.variants.map((v) => (
                  <button
                    key={v.size}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`variant-option-card ${
                      selectedVariant && selectedVariant.size === v.size ? 'variant-card-active' : ''
                    }`}
                  >
                    <span className="v-size-name">{v.size}</span>
                    <span className="v-size-label">{v.label}</span>
                    <strong className="v-size-price text-gold">₹{v.price}</strong>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="modal-specs-grid">
            <div className="spec-card">
              <span className="spec-label">Packaging</span>
              <span className="spec-val">Sealed Hot Parcel</span>
            </div>
            <div className="spec-card">
              <span className="spec-label">Spice Level</span>
              <span className="spec-val flex-center text-gold">
                <Flame size={14} className="mr-1" /> {selectedItem.spiceLevel || 'Medium'}
              </span>
            </div>
            {selectedItem.calories && (
              <div className="spec-card">
                <span className="spec-label">Energy</span>
                <span className="spec-val">{selectedItem.calories}</span>
              </div>
            )}
            <div className="spec-card">
              <span className="spec-label">Service</span>
              <span className="spec-val">Counter Pickup</span>
            </div>
          </div>

          <div className="modal-action-bar">
            <div className="modal-qty-control">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="qty-number">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`btn-primary-gold modal-add-btn ${isAdded ? 'btn-success-green' : ''}`}
            >
              {isAdded ? (
                <>
                  <Check size={20} />
                  <span>Added to Parcel Tray!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={20} />
                  <span>Pre-Book Parcel • ₹{currentPrice * quantity}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;
