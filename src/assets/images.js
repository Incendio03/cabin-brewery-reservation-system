/**
 * Utility functions for generating placeholder images
 * These are used for demonstration purposes in the static website
 */

// Function to get a colored placeholder image with text
export const getPlaceholderImage = (width, height, text, bgColor = 'e9e0d0', textColor = '2C1810') => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Generate placeholder images for different sections of the website
export const images = {
  // Hero Images
  hero: getPlaceholderImage(1200, 600, 'The Cabin Brewery', '2C1810', 'ffffff'),
  
  // Dining areas
  dining: {
    mainRestaurant: getPlaceholderImage(600, 400, 'Main Restaurant'),
    beerGarden: getPlaceholderImage(600, 400, 'Beer Garden'),
    barrelRoom: getPlaceholderImage(600, 400, 'Barrel Room'),
    tastingCorner: getPlaceholderImage(600, 400, 'Tasting Corner'),
  },
  
  // Rooms
  rooms: {
    amberRoom: getPlaceholderImage(600, 400, 'Amber Room'),
    lagerSuite: getPlaceholderImage(600, 400, 'Lager Suite'),
    stoutLounge: getPlaceholderImage(600, 400, 'Stout Lounge'),
    pilsnerHall: getPlaceholderImage(600, 400, 'Pilsner Hall'),
  },
  
  // Events
  events: {
    jazzNight: getPlaceholderImage(600, 400, 'Jazz Night'),
    beerTasting: getPlaceholderImage(600, 400, 'Beer Tasting'),
    breweryTour: getPlaceholderImage(600, 400, 'Brewery Tour'),
    bandNight: getPlaceholderImage(600, 400, 'Band Night'),
  },
  
  // Features
  features: {
    craftBeer: getPlaceholderImage(600, 400, 'Craft Beer Selection'),
    ktvRoom: getPlaceholderImage(600, 400, 'KTV Room'),
    breweryTour: getPlaceholderImage(600, 400, 'Brewery Tour'),
  },
};

export default images;
