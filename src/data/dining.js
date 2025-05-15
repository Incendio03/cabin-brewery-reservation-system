// Mock data for dining options
import { images } from '../assets/images';

export const diningOptions = [
  {
    id: 1,
    name: 'Main Brewery Restaurant',
    capacity: 100,
    description: 'Our main dining area with views of the brewing facilities, serving our full menu selection.',
    image: images.dining.mainRestaurant,
    openingHours: '11:00 AM - 10:00 PM',
    cuisineType: 'Brewery Gastro Pub',
  },
  {
    id: 2,
    name: 'Outdoor Beer Garden',
    capacity: 60,
    description: 'Enjoy your meals and drinks in our scenic outdoor garden with fire pits and heaters for cooler evenings.',
    image: images.dining.beerGarden,
    openingHours: '12:00 PM - 9:00 PM',
    cuisineType: 'Casual Dining',
  },
  {
    id: 3,
    name: 'The Barrel Room',
    capacity: 30,
    description: 'Intimate dining space surrounded by our aging barrels, perfect for a more private experience.',
    image: images.dining.barrelRoom,
    openingHours: '5:00 PM - 10:00 PM',
    cuisineType: 'Fine Dining',
  },
  {
    id: 4,
    name: 'Tasting Corner',
    capacity: 20,
    description: 'Small plates and beer flights in our tasting area, ideal for sampling our various offerings.',
    image: images.dining.tastingCorner,
    openingHours: '2:00 PM - 8:00 PM',
    cuisineType: 'Tapas & Tastings',
  },
];
