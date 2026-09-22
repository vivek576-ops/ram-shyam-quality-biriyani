// Backend Food Image Matcher based on Dish Names

const CURRY_PRESET_IMAGES = {
  // Chicken Fry Piece Biryani
  biryani_single: '/images/chicken_fry_biryani.jpg',
  biryani_full: '/images/chicken_fry_biryani.jpg',
  biryani_family: '/images/biryani_family.jpg',
  chicken_biryani: '/images/chicken_fry_biryani.jpg',

  // Veg Specials
  meals: '/images/meals.jpg',
  veg_biryani: '/images/veg_biryani.jpg',

  // Curries
  sambar: '/images/sambar.jpg',
  dal: '/images/dal.jpg',
  stuffed_brinjal: '/images/stuffed_brinjal.jpg',

  // Non-Veg Curries
  fish_curry: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=80',
  chicken_curry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80',
  natukodi_curry: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=80',
  mutton_curry: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=900&q=80',
  egg_curry: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',
  prawns_curry: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80'
};

const getDishImage = (dishName = '', isVeg = true, customImage = '') => {
  if (customImage && !customImage.includes('photo-1589302168068') && !customImage.includes('photo-1596797038530')) {
    return customImage;
  }

  const name = dishName.toLowerCase().trim();

  // 1. Specific Biryani Variants
  if (name.includes('biryani')) {
    if (name.includes('veg')) {
      return CURRY_PRESET_IMAGES.veg_biryani;
    }
    if (name.includes('family')) {
      return CURRY_PRESET_IMAGES.biryani_family;
    }
    return CURRY_PRESET_IMAGES.biryani_single;
  }

  // 2. Meals
  if (name.includes('meal') || name.includes('thali') || name.includes('bhojanam')) {
    return CURRY_PRESET_IMAGES.meals;
  }

  // 3. Sambar
  if (name.includes('sambar') || name.includes('sambhar')) {
    return CURRY_PRESET_IMAGES.sambar;
  }

  // 4. Dal / Pappu
  if (name.includes('dal') || name.includes('pappu') || name.includes('tadka')) {
    return CURRY_PRESET_IMAGES.dal;
  }

  // 5. Non-Veg Curries
  if (name.includes('fish') || name.includes('chepa') || name.includes('machli')) {
    return CURRY_PRESET_IMAGES.fish_curry;
  }
  if (name.includes('prawn') || name.includes('royya') || name.includes('shrimp')) {
    return CURRY_PRESET_IMAGES.prawns_curry;
  }
  if (name.includes('mutton') || name.includes('lamb') || name.includes('gosht') || name.includes('boti')) {
    return CURRY_PRESET_IMAGES.mutton_curry;
  }
  if (name.includes('egg') || name.includes('guddu') || name.includes('anda')) {
    return CURRY_PRESET_IMAGES.egg_curry;
  }
  if (name.includes('natu') || name.includes('country chicken')) {
    return CURRY_PRESET_IMAGES.natukodi_curry;
  }
  if (name.includes('chicken') || name.includes('kodi') || name.includes('murgh')) {
    return CURRY_PRESET_IMAGES.chicken_curry;
  }

  // 6. Stuffed Brinjal Curry / Gutti Vankaya
  if (name.includes('brinjal') || name.includes('vankaya') || name.includes('baingan') || name.includes('eggplant')) {
    return CURRY_PRESET_IMAGES.stuffed_brinjal;
  }

  // Fallback based on veg flag
  return isVeg ? CURRY_PRESET_IMAGES.stuffed_brinjal : CURRY_PRESET_IMAGES.chicken_curry;
};

module.exports = {
  getDishImage,
  CURRY_PRESET_IMAGES
};
