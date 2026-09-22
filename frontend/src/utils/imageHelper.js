// Frontend Food Image Matcher based on Dish Names

export const CURRY_PRESET_IMAGES = {
  biryani_single: '/images/chicken_fry_biryani.jpg',
  biryani_full: '/images/chicken_fry_biryani.jpg',
  biryani_family: '/images/biryani_family.jpg',

  meals: '/images/meals.jpg',
  veg_biryani: '/images/veg_biryani.jpg',
  sambar: '/images/sambar.jpg',
  dal: '/images/dal.jpg',
  stuffed_brinjal: '/images/stuffed_brinjal.jpg',

  // Non-Veg
  fish_curry:
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=80',

  chicken_curry:
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80',

  natukodi_curry:
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=80',

  mutton_curry:
    'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=900&q=80',

  egg_curry:
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',

  prawns_curry:
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80',

  // Generic veg categories
  paneer_curry:
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80',

  aloo_curry:
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',

  tomato_curry:
    'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80',

  palak_curry:
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',

  mushroom_curry:
    'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=900&q=80',

  mixed_veg:
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80'
};


// ---------------------------------------------------------
// Normalize dish name
// ---------------------------------------------------------

const normalizeDishName = (dishName = '') => {
  return dishName
    .toLowerCase()
    .trim()
    .replace(/[()_,.-]/g, ' ')
    .replace(/\s+/g, ' ');
};


// ---------------------------------------------------------
// Check whether dish contains any keyword
// ---------------------------------------------------------

const containsAny = (name, keywords) => {
  return keywords.some(keyword => name.includes(keyword));
};


// ---------------------------------------------------------
// Main Dish Image Matcher
// ---------------------------------------------------------

export const getDishImage = (
  dishName = '',
  isVeg = true,
  customImage = ''
) => {

  const name = normalizeDishName(dishName);

  // -------------------------------------------------------
  // 1. If a REAL custom image was supplied, use it
  // -------------------------------------------------------

  if (
    customImage &&
    !customImage.includes('unsplash.com/photo-1589302168068') &&
    !customImage.includes('photo-1596797038530')
  ) {
    return customImage;
  }


  // -------------------------------------------------------
  // 2. Biryani
  // -------------------------------------------------------

  if (containsAny(name, [
    'biryani',
    'biriyani',
    'biriyani'
  ])) {

    if (
      containsAny(name, [
        'veg',
        'vegetable',
        'paneer'
      ])
    ) {
      return CURRY_PRESET_IMAGES.veg_biryani;
    }

    if (
      containsAny(name, [
        'family',
        'family pack',
        'family size'
      ])
    ) {
      return CURRY_PRESET_IMAGES.biryani_family;
    }

    return CURRY_PRESET_IMAGES.biryani_single;
  }


  // -------------------------------------------------------
  // 3. Meals / Thali
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'meal',
      'meals',
      'thali',
      'bhojanam',
      'andhra meals',
      'south indian meals'
    ])
  ) {
    return CURRY_PRESET_IMAGES.meals;
  }


  // -------------------------------------------------------
  // 4. Fish
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'fish',
      'chepa',
      'chepala',
      'meen',
      'machli',
      'fish curry',
      'fish pulusu',
      'chepala pulusu',
      'fish masala'
    ])
  ) {
    return CURRY_PRESET_IMAGES.fish_curry;
  }


  // -------------------------------------------------------
  // 5. Prawns / Shrimp
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'prawn',
      'prawns',
      'royya',
      'royyala',
      'shrimp',
      'jhinga'
    ])
  ) {
    return CURRY_PRESET_IMAGES.prawns_curry;
  }


  // -------------------------------------------------------
  // 6. Mutton / Lamb
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'mutton',
      'lamb',
      'gosht',
      'boti',
      'keema',
      'mutton masala',
      'mutton curry',
      'mutton pulusu'
    ])
  ) {
    return CURRY_PRESET_IMAGES.mutton_curry;
  }


  // -------------------------------------------------------
  // 7. Egg
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'egg',
      'eggs',
      'guddu',
      'gudlu',
      'anda',
      'andaa',
      'egg masala',
      'egg curry'
    ])
  ) {
    return CURRY_PRESET_IMAGES.egg_curry;
  }


  // -------------------------------------------------------
  // 8. Country Chicken / Natukodi
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'natukodi',
      'natu kodi',
      'country chicken',
      'country bird'
    ])
  ) {
    return CURRY_PRESET_IMAGES.natukodi_curry;
  }


  // -------------------------------------------------------
  // 9. Chicken
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'chicken',
      'kodi',
      'murgh',
      'murg',
      'chicken curry',
      'chicken masala',
      'chicken pulusu',
      'chicken gravy',
      'andhra chicken'
    ])
  ) {
    return CURRY_PRESET_IMAGES.chicken_curry;
  }


  // -------------------------------------------------------
  // 10. Brinjal / Vankaya
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'brinjal',
      'vankaya',
      'vankai',
      'gutti vankaya',
      'stuffed brinjal',
      'eggplant',
      'baingan',
      'baingan masala',
      'brinjal masala'
    ])
  ) {
    return CURRY_PRESET_IMAGES.stuffed_brinjal;
  }


  // -------------------------------------------------------
  // 11. Paneer
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'paneer',
      'panner',
      'paneer butter',
      'kadai paneer',
      'palak paneer',
      'matar paneer',
      'paneer masala',
      'paneer gravy'
    ])
  ) {
    return CURRY_PRESET_IMAGES.paneer_curry;
  }


  // -------------------------------------------------------
  // 12. Aloo / Potato
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'aloo',
      'alu',
      'potato',
      'potatoes',
      'batata',
      'aloo kurma',
      'aloo curry',
      'potato curry'
    ])
  ) {
    return CURRY_PRESET_IMAGES.aloo_curry;
  }


  // -------------------------------------------------------
  // 13. Tomato
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'tomato',
      'tomato curry',
      'tomato masala',
      'tomato gravy'
    ])
  ) {
    return CURRY_PRESET_IMAGES.tomato_curry;
  }


  // -------------------------------------------------------
  // 14. Gongura
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'gongura',
      'sorrel',
      'pulicha keerai'
    ])
  ) {
    return CURRY_PRESET_IMAGES.tomato_curry;
  }


  // -------------------------------------------------------
  // 15. Dal / Pappu
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'dal',
      'daal',
      'pappu',
      'toor dal',
      'moong dal',
      'masoor dal',
      'dal fry',
      'dal tadka',
      'tadka'
    ])
  ) {
    return CURRY_PRESET_IMAGES.dal;
  }


  // -------------------------------------------------------
  // 16. Sambar
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'sambar',
      'sambhar'
    ])
  ) {
    return CURRY_PRESET_IMAGES.sambar;
  }


  // -------------------------------------------------------
  // 17. Palak / Spinach
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'palak',
      'spinach',
      'keerai',
      'saag'
    ])
  ) {
    return CURRY_PRESET_IMAGES.palak_curry;
  }


  // -------------------------------------------------------
  // 18. Mushroom
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'mushroom',
      'mushrooms',
      'button mushroom',
      'kadai mushroom'
    ])
  ) {
    return CURRY_PRESET_IMAGES.mushroom_curry;
  }


  // -------------------------------------------------------
  // 19. Mixed Vegetables
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'mixed veg',
      'mixed vegetable',
      'vegetable curry',
      'veg curry',
      'veg masala',
      'vegetable masala',
      'sabzi',
      'subzi'
    ])
  ) {
    return CURRY_PRESET_IMAGES.mixed_veg;
  }


  // -------------------------------------------------------
  // 20. Kurma / Korma
  // -------------------------------------------------------

  if (
    containsAny(name, [
      'kurma',
      'korma'
    ])
  ) {
    return CURRY_PRESET_IMAGES.mixed_veg;
  }


  // -------------------------------------------------------
  // 21. Final fallback
  // -------------------------------------------------------
  // We DON'T assume every unknown dish is Stuffed Brinjal.
  // We use a neutral category image instead.

  return isVeg
    ? CURRY_PRESET_IMAGES.mixed_veg
    : CURRY_PRESET_IMAGES.chicken_curry;
};