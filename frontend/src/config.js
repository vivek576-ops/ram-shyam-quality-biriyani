// Central Configuration for Ram & Shyam Quality Biriyani

export const APP_CONFIG = {
  restaurantName: 'RAM & SHYAM QUALITY BIRIYANI',
  shortName: 'Ram & Shyam',
  subtitle: 'QUALITY BIRIYANI',
  tagline: 'Authentic Chicken Fry Piece Biryani • Daily Fresh Veg Curries • Catering Services',
  
  // Owner WhatsApp Configuration
  // 7032118129 -> 917032118129
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '917032118129',
  ownerPhone: '7032118129',
  
  // Default WhatsApp Inquiry Message
  defaultWhatsAppMessage: 'Hello Ram & Shyam Quality Biriyani, I would like to pre-book a parcel / inquire about catering services.',

  // Contact Details
  contact: {
    phone: '+91 70321 18129',
    displayPhone: '+91 70321 18129',
    whatsapp: '+91 70321 18129',
    email: 'orders@ramshyambiriyani.com',
    supportEmail: 'contact@ramshyambiriyani.com',
    address: 'JXP2+79F, Puletikuru - Ambajipeta Rd, Irusumanda, Andhra Pradesh 533239',
    area: 'Irusumanda, Ambajipeta Road, Andhra Pradesh',
    timings: 'Monday – Sunday: 11:30 AM – 10:30 PM (Hot Parcels Ready Daily)',
    counterPickupHours: '11:30 AM – 10:30 PM',
    dineInHours: '11:30 AM – 10:30 PM',
    serviceNote: '★ Hot Parcel Counter Takeaway & Bulk Catering Services (Pre-Book & Collect at Hotel)',
    googleMapLocationUrl: 'https://maps.google.com/?q=JXP2%2B79F,+Puletikuru+-+Ambajipeta+Rd,+Irusumanda,+Andhra+Pradesh+533239',
    googleMapEmbedUrl: 'https://maps.google.com/maps?q=JXP2%2B79F,+Puletikuru+-+Ambajipeta+Rd,+Irusumanda,+Andhra+Pradesh+533239&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },

  // Social Links
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com'
  },

  // API Base URL
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
};

export default APP_CONFIG;
