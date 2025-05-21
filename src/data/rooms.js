// Mock data for rooms/KTV
import { images } from '../assets/images';

export const rooms = [
  {
    id: 'ktv-vip-bar',
    name: 'VIP KTV Bar Room',
    type: 'KTV',
    capacity: 20,
    price: 3500.0,
    description: 'Exclusive KTV room with a fully stocked bar, premium sound and lighting. Payment is consumable.',
    amenities: ['Karaoke System', 'Private Bar', 'Premium Sound System', 'Comfortable Seating', 'Large Screen Display'],
    image: images.rooms.vipKtvBarRoom || 'https://placehold.co/600x400/e9e0d0/2C1810?text=VIP+KTV+Bar',
  },
  {
    id: 'vip-room',
    name: 'VIP Room',
    type: 'Private Room',
    capacity: 30,
    price: 5000.0,
    description: 'Spacious VIP room for larger gatherings, perfect for private parties or corporate events. Payment is consumable.',
    amenities: ['Private Bar', 'Lounge Seating', 'Projector and Screen', 'Dedicated Staff', 'Customizable Layout'],
    image: images.rooms.vipRoom || 'https://placehold.co/600x400/e9e0d0/2C1810?text=VIP+Room',
  },
];
