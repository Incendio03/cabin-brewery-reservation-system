// Mock data for rooms/KTV
import { images } from '../assets/images';

export const rooms = [
  {
    id: 1,
    name: 'Amber Room',
    type: 'KTV',
    capacity: 8,
    price: 60.0,
    description: 'Cozy KTV room perfect for smaller groups with premium sound equipment.',
    amenities: ['Karaoke System', 'Private Bar', 'Comfortable Seating'],
    image: images.rooms.amberRoom,
  },
  {
    id: 2,
    name: 'Lager Suite',
    type: 'KTV',
    capacity: 15,
    price: 100.0,
    description: 'Large KTV room for bigger parties with state-of-the-art audio and video systems.',
    amenities: ['Karaoke System', 'Private Bar', 'Dance Floor', 'Mood Lighting'],
    image: images.rooms.lagerSuite,
  },
  {
    id: 3,
    name: 'Stout Lounge',
    type: 'Private Room',
    capacity: 10,
    price: 75.0,
    description: 'Elegant private room for meetings or intimate gatherings with complimentary drinks.',
    amenities: ['Private Bar', 'Meeting Equipment', 'Premium Furniture'],
    image: images.rooms.stoutLounge,
  },
  {
    id: 4,
    name: 'Pilsner Hall',
    type: 'Private Room',
    capacity: 25,
    price: 150.0,
    description: 'Our largest room, perfect for events and parties with full service included.',
    amenities: ['Private Bar', 'Sound System', 'Private Bathroom', 'Waitstaff Service'],
    image: images.rooms.pilsnerHall,
  },
];
