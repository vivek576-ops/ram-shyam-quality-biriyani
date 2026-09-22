const menuItems = [
  // ==========================================
  // 1. NON-VEG (CHICKEN FRY PIECE BIRYANI)
  // ==========================================
  {
    itemId: 'bir-cf-single',
    name: 'Chicken Fry Piece Biryani (Single)',
    description: 'Aromatic basmati biryani layered with crispy spiced chicken fry piece, caramelized onions & spicy salan.',
    price: 120,
    category: 'Non-Veg',
    image: '/images/chicken_fry_biryani.jpg',
    isVeg: false,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Spicy',
    portionSize: 'Single Portion (Serves 1 | Fresh Chicken Fry Piece)',
    available: true
  },
  {
    itemId: 'bir-cf-full',
    name: 'Chicken Fry Piece Biryani (Full)',
    description: 'Hearty full portion of basmati biryani layered with generous crispy chicken fry pieces, rich gravy & raita.',
    price: 220,
    category: 'Non-Veg',
    image: '/images/chicken_fry_biryani.jpg',
    isVeg: false,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Spicy',
    portionSize: 'Full Portion (Serves 1-2 | Generous Chicken Fry Pieces)',
    available: true
  },
  {
    itemId: 'bir-cf-family',
    name: 'Chicken Fry Piece Biryani (Family Pack)',
    description: 'Jumbo family feast handi packed with fragrant biryani rice, multiple crispy chicken fry pieces, boiled eggs & extra salan.',
    price: 350,
    category: 'Non-Veg',
    image: '/images/biryani_family.jpg',
    isVeg: false,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Spicy',
    portionSize: 'Family Pack (Serves 3-4 | Jumbo Container with Eggs & Salan)',
    available: true
  },

  // ==========================================
  // 2. VEG (MEALS & VEG BIRYANI)
  // ==========================================
  {
    itemId: 'veg-meals',
    name: 'Meals',
    description: 'Authentic South Indian Veg Meals: Steamed white rice served with mixed curries, homestyle dal, piping hot sambar & papad.',
    price: 60,
    category: 'Veg',
    image: '/images/meals.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: false,
    spiceLevel: 'Medium',
    portionSize: 'Full Meal Parcel (Serves 1 | Rice & Mixed Curries)',
    available: true
  },
  {
    itemId: 'veg-biryani',
    name: 'Veg Biryani',
    description: 'Fragrant long-grain basmati rice cooked with fresh seasonal garden vegetables, whole spices, mint, and pure ghee.',
    price: 60,
    category: 'Veg',
    image: '/images/veg_biryani.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Medium',
    portionSize: 'Regular Portion (Serves 1 | 450g Fragrant Basmati)',
    available: true
  },

  // ==========================================
  // 3. CURRIES (ONLY 3 ITEMS: Sambar, Dal, Stuffed Brinjal Curry)
  // ==========================================
  {
    itemId: 'curry-sambar',
    name: 'Sambar',
    description: 'Traditional slow-cooked lentil stew simmered with drumsticks, shallots, tamarind, curry leaves, and South Indian spices.',
    price: 20,
    category: 'Curries',
    image: '/images/sambar.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: false,
    spiceLevel: 'Medium',
    portionSize: '250ml Hot Parcel Container',
    available: true
  },
  {
    itemId: 'curry-dal',
    name: 'Dal',
    description: 'Homestyle yellow toor dal simmered to creamy perfection and tempered with desi ghee, cumin, garlic, and red chillies.',
    price: 20,
    category: 'Curries',
    image: '/images/dal.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: false,
    spiceLevel: 'Medium',
    portionSize: '250ml Hot Parcel Container',
    available: true
  },
  {
    itemId: 'curry-stuffed-brinjal',
    name: 'Stuffed Brinjal Curry (Gutti Vankaya)',
    description: '★ DAILY SPECIAL: Small purple eggplants slow-cooked in roasted peanut, sesame & coconut spiced masala gravy. Uploaded daily with cost.',
    price: 40,
    category: 'Curries',
    image: '/images/stuffed_brinjal.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Spicy',
    portionSize: '250ml Hot Parcel Container',
    available: true
  }
];

module.exports = menuItems;
