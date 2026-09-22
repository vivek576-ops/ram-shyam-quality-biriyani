export const MENU_CATEGORIES = [
  'All',
  'Non-Veg',
  'Veg',
  'Curries'
];

export const MENU_ITEMS = [
  // ==========================================
  // 1. NON-VEG (CHICKEN FRY PIECE BIRYANI)
  // ==========================================
  {
    id: 'bir-cf-single',
    name: 'Chicken Fry Piece Biryani (Single)',
    category: 'Non-Veg',
    price: 120,
    description: 'Aromatic basmati biryani layered with crispy spiced chicken fry piece, caramelized onions & spicy salan.',
    detailedDescription: 'Authentic local village recipe: Fresh chicken marinated in traditional spices, deep-fried to crisp perfection and served over steaming aromatic basmati biryani rice with gravy and raita.',
    image: '/images/chicken_fry_biryani.jpg',
    isVeg: false,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Spicy',
    portionSize: 'Single Portion (Serves 1 | Fresh Chicken Fry Piece)',
    prepTime: 'Hot & Ready for Parcel'
  },
  {
    id: 'bir-cf-full',
    name: 'Chicken Fry Piece Biryani (Full)',
    category: 'Non-Veg',
    price: 200,
    description: 'Hearty full portion of basmati biryani layered with generous crispy chicken fry pieces, rich gravy & raita.',
    detailedDescription: 'Our hallmark full specialty: Generous portion of fragrant basmati biryani loaded with crispy golden fried chicken pieces, caramelized onions, boiled egg, mirchi ka salan, and cool raita.',
    image: '/images/chicken_fry_biryani.jpg',
    isVeg: false,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Spicy',
    portionSize: 'Full Portion (Serves 1-2 | Generous Chicken Fry Pieces)',
    prepTime: 'Hot & Ready for Parcel'
  },
  {
    id: 'bir-cf-family',
    name: 'Chicken Fry Piece Biryani (Family Pack)',
    category: 'Non-Veg',
    price: 350,
    description: 'Jumbo family feast handi packed with fragrant biryani rice, multiple crispy chicken fry pieces, boiled eggs & extra salan.',
    detailedDescription: 'Grand royal family pack designed for sharing: Jumbo sealed hot container packed with aromatic dum biryani rice, an abundance of crispy chicken fry pieces, boiled eggs, double portion salan, and raita.',
    image: '/images/biryani_family.jpg',
    isVeg: false,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Spicy',
    portionSize: 'Family Pack (Serves 3-4 | Jumbo Container with Eggs & Salan)',
    prepTime: 'Hot & Ready for Parcel'
  },

  // ==========================================
  // 2. VEG (MEALS & VEG BIRYANI)
  // ==========================================
  {
    id: 'veg-meals',
    name: 'Meals',
    category: 'Veg',
    price: 60,
    description: 'Authentic South Indian Veg Meals: Steamed white rice served with mixed curries, homestyle dal, piping hot sambar & papad.',
    detailedDescription: 'Nutritious homestyle South Indian meal parcel: Heap of fluffy white rice served with mixed freshly cooked curries, comforting dal tadka, hot vegetable sambar, rasam, and crunchy papad.',
    image: '/images/meals.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: false,
    spiceLevel: 'Medium',
    portionSize: 'Full Meal Parcel (Serves 1 | Rice & Mixed Curries)',
    prepTime: 'Ready in 2 mins'
  },
  {
    id: 'veg-biryani',
    name: 'Veg Biryani',
    category: 'Veg',
    price: 60,
    description: 'Fragrant long-grain basmati rice cooked with fresh seasonal garden vegetables, whole spices, mint, and pure ghee.',
    detailedDescription: 'Aromatic vegetarian delight: Premium basmati rice slow-cooked dum style with tender carrots, beans, green peas, caramelized onions, fresh herbs, and mild aromatic spices. Served with raita and gravy.',
    image: '/images/veg_biryani.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: true,
    spiceLevel: 'Medium',
    portionSize: 'Regular Portion (Serves 1 | 450g Fragrant Basmati)',
    prepTime: 'Hot & Ready for Parcel'
  },

  // ==========================================
  // 3. CURRIES (ONLY 3 ITEMS: Sambar, Dal, Stuffed Brinjal Curry)
  // ==========================================
  {
    id: 'curry-sambar',
    name: 'Sambar',
    category: 'Curries',
    price: 20,
    description: 'Traditional slow-cooked lentil stew simmered with drumsticks, shallots, tamarind, curry leaves, and South Indian spices.',
    detailedDescription: 'Authentic South Indian Sambar made daily with fresh toor dal, drumsticks, shallots, tomatoes, and freshly roasted spice powder. Tempered with mustard seeds, curry leaves, and dry red chillies.',
    image: '/images/sambar.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: false,
    spiceLevel: 'Medium',
    portionSize: '250ml Hot Parcel Container',
    prepTime: 'Ready in 2 mins'
  },
  {
    id: 'curry-dal',
    name: 'Dal',
    category: 'Curries',
    price: 20,
    description: 'Homestyle yellow toor dal simmered to creamy perfection and tempered with desi ghee, cumin, garlic, and red chillies.',
    detailedDescription: 'Comforting, healthy yellow dal cooked fresh every morning. Tempered in pure ghee with crushed garlic cloves, cumin seeds, mustard, curry leaves, and sun-dried chillies.',
    image: '/images/dal.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: false,
    spiceLevel: 'Medium',
    portionSize: '250ml Hot Parcel Container',
    prepTime: 'Ready in 2 mins'
  },
  {
    id: 'curry-stuffed-brinjal',
    name: 'Stuffed Brinjal Curry (Gutti Vankaya)',
    category: 'Curries',
    price: 40,
    description: '★ DAILY SPECIAL: Small purple eggplants slow-cooked in roasted peanut, sesame & coconut spiced masala gravy. Uploaded daily with cost.',
    detailedDescription: 'Authentic Andhra signature: Tender small baby brinjals slit and stuffed with roasted sesame, peanuts and spice blend, simmered in thick gravy. Uploaded daily with cost.',
    image: '/images/stuffed_brinjal.jpg',
    isVeg: true,
    isBestseller: true,
    isSpecial: true,
    isDailySpecialItem: true,
    spiceLevel: 'Spicy',
    portionSize: '250ml Hot Parcel Container',
    prepTime: 'Fresh Today (Uploaded Daily with Cost)'
  }
];
