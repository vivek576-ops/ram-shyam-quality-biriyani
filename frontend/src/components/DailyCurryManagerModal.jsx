import React, { useState } from 'react';
import { X, Lock, Plus, Check, Sparkles, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { APP_CONFIG } from '../config';
import { CURRY_PRESET_IMAGES } from '../utils/imageHelper';

const DailyCurryManagerModal = ({ isOpen, onClose, dailyCurries, onCurriesUpdated }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Add Form State (Supports BOTH Veg & Non-Veg Curries)
  const [newCurry, setNewCurry] = useState({
    name: '',
    isVeg: true,
    price: '40',
    portionSize: '250ml Container',
    spiceLevel: 'Medium',
    description: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  if (!isOpen) return null;

  const handleVerifyPin = async (e) => {
  e.preventDefault();
  setAuthError('');

  try {
    const res = await fetch(
      `${APP_CONFIG.apiBaseUrl}/api/admin/verify-pin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pin })
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      setAuthError(data.message || 'Incorrect Owner PIN.');
      return;
    }

    setIsAuthenticated(true);
    setAuthError('');
  } catch (error) {
    console.error('PIN verification error:', error);
    setAuthError('Unable to connect to the server.');
  }
};

  const handleImageSelect = (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    setSelectedImage(null);
    setImagePreview('');
    return;
  }

  if (!file.type.startsWith('image/')) {
    setStatusMessage('Please select an image file.');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setStatusMessage('Image must be smaller than 5 MB.');
    return;
  }

  setSelectedImage(file);
  setImagePreview(URL.createObjectURL(file));
  setStatusMessage('');
};

  const handleCurryTypeToggle = (isPureVeg) => {
  setNewCurry(prev => ({
    ...prev,
    isVeg: isPureVeg,
    price: isPureVeg ? '40' : '120'
  }));
};

 const handleCurryNameChange = (nameVal) => {
  setNewCurry(prev => ({
    ...prev,
    name: nameVal
  }));
}; 

  const handleSelectPreset = (presetName, priceVal, isPureVeg) => {
    setNewCurry(prev => ({
      ...prev,
      name: presetName,
      isVeg: isPureVeg,
      price: priceVal
    }));
  };

  const handleAddNewCurry = async (e) => {
  e.preventDefault();

  if (!newCurry.name.trim()) {
    setStatusMessage('Please enter the curry name.');
    return;
  }

  if (!selectedImage) {
    setStatusMessage('Please select an actual food photo.');
    return;
  }

  setIsSubmitting(true);
  setStatusMessage('');

  try {
    const formData = new FormData();

    formData.append('name', newCurry.name.trim());
    formData.append('description', newCurry.description || '');
    formData.append('price', newCurry.price);
    formData.append('portionSize', newCurry.portionSize);
    formData.append('spiceLevel', newCurry.spiceLevel);
    formData.append('isVeg', String(newCurry.isVeg));
    formData.append('isAvailableToday', 'true');

    // Actual food photo
    formData.append('image', selectedImage);

    const res = await fetch(
      `${APP_CONFIG.apiBaseUrl}/api/daily-specials`,
      {
        method: 'POST',

        // Send Owner PIN through header
        headers: {
          'x-admin-pin': pin
        },

        // IMPORTANT:
        // Do NOT set Content-Type manually.
        // Browser will create multipart/form-data boundary.
        body: formData
      }
    );

    const data = await res.json();

    if (res.ok && data.success) {
      setStatusMessage(
        `✓ Added "${newCurry.name}" (₹${newCurry.price}) to Today’s Menu!`
      );

      // Reset curry form
      setNewCurry({
        name: '',
        isVeg: true,
        price: '40',
        portionSize: '250ml Container',
        spiceLevel: 'Medium',
        description: '',
        image: ''
      });

      // Clear selected image
      setSelectedImage(null);
      setImagePreview('');

      if (onCurriesUpdated) {
        onCurriesUpdated();
      }
    } else {
      setStatusMessage(
        data.message || 'Error uploading curry.'
      );
    }
  } catch (error) {
    console.error('Daily curry upload error:', error);

    setStatusMessage(
      'Unable to upload curry. Please check your server connection.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const handleRefreshCurries = async () => {
  try {
    setStatusMessage('Refreshing menu...');

    if (onCurriesUpdated) {
      await onCurriesUpdated();
    }

    setStatusMessage('✓ Menu refreshed successfully.');
  } catch (error) {
    console.error('Refresh failed:', error);
    setStatusMessage('Unable to refresh menu.');
  }
};

  const handleToggleCurry = async (id) => {
  try {
    const res = await fetch(
      `${APP_CONFIG.apiBaseUrl}/api/daily-specials/${id}/toggle`,
      {
        method: 'PATCH',
        headers: {
          'x-admin-pin': pin
        }
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      setStatusMessage(data.message || 'Unable to update curry status.');
      return;
    }

    setStatusMessage(
      data.message || 'Curry availability updated successfully.'
    );

    if (onCurriesUpdated) {
      await onCurriesUpdated();
    }

  } catch (error) {
    console.error('Toggle failed:', error);
    setStatusMessage(
      'Unable to update curry status. Please check the server.'
    );
  }
};


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog admin-curry-dialog" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="admin-modal-header">
          <div className="admin-badge">
            <Sparkles size={16} className="text-gold" />
            <span>OWNER PORTAL</span>
          </div>
          <h3 className="admin-modal-title">Upload Daily Special Curries</h3>
          <p className="admin-modal-sub">
            Upload today’s fresh Veg or Non-Veg curry with custom cost. Dishes immediately appear on the live restaurant menu!
          </p>
        </div>

        {!isAuthenticated ? (
          /* PIN Authentication Screen */
          <div className="admin-pin-screen">
            <div className="lock-icon-circle">
              <Lock size={28} className="text-gold" />
            </div>
            <h4>Enter Owner PIN to Update Menu</h4>
            <p className="text-muted text-sm mb-4">
              Enter your security PIN
            </p>

            <form onSubmit={handleVerifyPin} className="pin-form">
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit PIN"
                className="form-input pin-input"
                autoFocus
              />
              {authError && <div className="error-message">{authError}</div>}

              <button type="submit" className="btn-primary-gold btn-block mt-3">
                <span>Unlock Menu Manager</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Manager Screen */
          <div className="admin-manager-content">
            {/* 1. Add Today's Curry Form */}
            <form onSubmit={handleAddNewCurry} className="add-curry-box">
              <h4 className="box-title">
                <Plus size={18} className="text-gold mr-1" /> Upload Today’s Fresh Curry
              </h4>

              {/* Curry Type Selector: Pure Veg vs Non-Veg */}
              <div className="form-group mb-3">
                <label className="form-label font-semibold">Select Curry Type *</label>
                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.3rem' }}>
                  <button
                    type="button"
                    onClick={() => handleCurryTypeToggle(true)}
                    className={`dietary-btn veg-pill ${newCurry.isVeg ? 'dietary-active-veg' : ''}`}
                    style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <span className="dot-veg"></span>
                    <strong>Pure Veg Curry</strong>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCurryTypeToggle(false)}
                    className={`dietary-btn nonveg-pill ${!newCurry.isVeg ? 'dietary-active-nonveg' : ''}`}
                    style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <span className="dot-nonveg"></span>
                    <strong>Non-Veg Curry (Chicken/Fish/Mutton)</strong>
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="quick-presets-row mb-3">
                <span className="text-xs text-muted block mb-1">Quick Select Dish:</span>
                <div className="preset-buttons-wrap">
                  {newCurry.isVeg ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Stuffed Brinjal Curry (Gutti Vankaya)', '40', true, CURRY_PRESET_IMAGES.stuffed_brinjal)}
                        className="preset-btn"
                      >
                        🍆 Stuffed Brinjal (₹20)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Gongura Veg Curry', '40', true, '')}
                        className="preset-btn"
                      >
                        🌿 Gongura Curry (₹20)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Aloo Kurma', '30', true, '')}
                        className="preset-btn"
                      >
                        🥔 Aloo Kurma (₹20)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Tomato Curry', '30', true, '')}
                        className="preset-btn"
                      >
                        🍅 Tomato Curry (₹20)
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Andhra Fish Curry (Chepala Pulusu)', '120', false, CURRY_PRESET_IMAGES.fish_curry)}
                        className="preset-btn"
                      >
                        🐟 Fish Curry (₹60)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Andhra Chicken Curry', '120', false, CURRY_PRESET_IMAGES.chicken_curry)}
                        className="preset-btn"
                      >
                        🍗 Chicken Curry (₹60)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Natukodi Pulusu (Country Chicken)', '150', false, CURRY_PRESET_IMAGES.natukodi_curry)}
                        className="preset-btn"
                      >
                        🍲 Natukodi Pulusu (₹60)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Mutton Curry', '180', false, CURRY_PRESET_IMAGES.mutton_curry)}
                        className="preset-btn"
                      >
                        🍖 Mutton Curry (₹60)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('Egg Curry', '60', false, CURRY_PRESET_IMAGES.egg_curry)}
                        className="preset-btn"
                      >
                        🍳 Egg Curry (₹60)
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="admin-form-grid">
                <div className="form-group">
                  <label className="form-label">{newCurry.isVeg ? 'Veg' : 'Non-Veg'} Curry Name *</label>
                  <input
                    type="text"
                    required
                    placeholder={newCurry.isVeg ? "e.g. Stuffed Brinjal / Gongura Curry" : "e.g. Fish Curry / Andhra Chicken Curry"}
                    value={newCurry.name}
                    onChange={(e) => handleCurryNameChange(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Daily Cost (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newCurry.price}
                    onChange={(e) => setNewCurry({ ...newCurry, price: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Actual Food Photo Upload */}  
              <div className="form-group mt-3 mb-3">
                <label className="form-label font-semibold">
                  Food Photo *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="form-input"
                />

              <p className="text-muted text-xs mt-1">
                 Select the actual photo of today's curry. Maximum 5 MB.
              </p>
            </div>

            {imagePreview && (
              <div className="image-preview-card mt-2 mb-3">
                <img
                  src={imagePreview}
                  alt="Selected curry preview"
                  className="matched-thumb-img"
                />

            <div className="matched-thumb-info">
              <span className="thumb-label">
                <Check size={14} className="text-green inline mr-1" />
                  Photo Selected
              </span>

              <span className="thumb-dish-name">
                {newCurry.name || 'Today’s Curry'}
              </span>
            </div>
          </div>
        )}

              <div className="admin-form-grid mt-2">
                <div className="form-group">
                  <label className="form-label">Portion Container</label>
                  <input
                    type="text"
                    value={newCurry.portionSize}
                    onChange={(e) => setNewCurry({ ...newCurry, portionSize: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Spice Level</label>
                  <select
                    value={newCurry.spiceLevel}
                    onChange={(e) => setNewCurry({ ...newCurry, spiceLevel: e.target.value })}
                    className="form-input"
                  >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Spicy">Spicy</option>
                  </select>
                </div>
              </div>

              <div className="form-group mt-2">
                <label className="form-label">Short Description (Optional)</label>
                <input
                  type="text"
                  placeholder={newCurry.isVeg ? "e.g. Cooked with roasted peanut & coconut masala" : "e.g. Fresh local fish simmered in tangy tamarind pulusu"}
                  value={newCurry.description}
                  onChange={(e) => setNewCurry({ ...newCurry, description: e.target.value })}
                  className="form-input"
                />
              </div>

              {statusMessage && (
                <div className="status-toast-bar mt-2 text-gold font-semibold text-sm">
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-gold btn-block mt-3"
              >
                <span>{isSubmitting ? 'Uploading to Menu...' : `Upload "${newCurry.name || 'Curry'}" (₹${newCurry.price}) to Website`}</span>
              </button>
            </form>

            {/* 2. Currently Active Daily Curries List */}
            <div className="active-curries-list-section">
              <div className="list-header-row">
                <h4>Today’s Active Daily Curries ({dailyCurries ? dailyCurries.length : 0})</h4>
                <button
                  type="button"
                  onClick={handleRefreshCurries}
                  className="refresh-btn text-gold text-sm flex-center"
                >
                <RefreshCw size={14} className="mr-1" />
                    Refresh
                </button>
              </div>

              <div className="curry-toggle-cards">
                {dailyCurries && dailyCurries.length > 0 ? (
                  dailyCurries.map((curry) => (
                    <div key={curry._id || curry.id} className="curry-toggle-row">
                      <img
                        src={curry.image}
                        alt={curry.name}
                        className="list-thumb-tiny"
                      />
                      <div className="curry-info" style={{ flexGrow: 1, marginLeft: '0.8rem' }}>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.4rem' }}>
                          <span className={curry.isVeg !== false ? "dot-veg" : "dot-nonveg"}></span>
                          <strong className="curry-name">{curry.name}</strong>
                          <span className="text-xs text-muted">({curry.isVeg !== false ? 'Veg' : 'Non-Veg'})</span>
                        </div>
                        <span className="curry-price text-gold">₹{curry.price} • {curry.portionSize || '250ml'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleCurry(curry._id || curry.id)}
                        className={`toggle-status-badge ${
                          curry.isAvailableToday !== false ? 'badge-active' : 'badge-off'
                        }`}
                      >
                        {curry.isAvailableToday !== false ? (
                          <>
                            <Eye size={14} /> <span>Live on Menu</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} /> <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-sm">No daily curries uploaded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyCurryManagerModal;
