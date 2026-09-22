import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { APP_CONFIG } from '../config';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Target WhatsApp API URL with pre-filled message
  const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    APP_CONFIG.defaultWhatsAppMessage
  )}`;

  return (
    <div className="floating-whatsapp-container">
      {/* Tooltip on Hover */}
      <div className={`whatsapp-tooltip ${isHovered ? 'tooltip-visible' : ''}`}>
        <span className="tooltip-title">Order on WhatsApp</span>
        <span className="tooltip-sub">Instant response & menu</span>
      </div>

      {/* Pulsing Ripple Rings */}
      <div className="whatsapp-pulse-ring"></div>
      <div className="whatsapp-pulse-ring ring-delay"></div>

      {/* Floating Button Anchor */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className="whatsapp-svg-icon" size={32} />
      </a>
    </div>
  );
};

export default WhatsAppButton;
