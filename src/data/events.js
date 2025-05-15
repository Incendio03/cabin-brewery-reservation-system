// Mock data for upcoming events
import { images } from '../assets/images';

export const events = [
  {
    id: 1,
    title: 'Live Jazz Night',
    date: '2025-05-20',
    time: '7:00 PM - 10:00 PM',
    description: 'Enjoy soothing jazz music while sipping on our craft beer selection.',
    image: images.events.jazzNight,
    ticketPrice: 15.99,
    available: true,
  },
  {
    id: 2,
    title: 'Beer Tasting Event',
    date: '2025-05-25',
    time: '2:00 PM - 5:00 PM',
    description: 'Sample our newest brews and learn about the brewing process from our master brewers.',
    image: images.events.beerTasting,
    ticketPrice: 25.99,
    available: true,
  },
  {
    id: 3,
    title: 'Summer Brewery Tour',
    date: '2025-06-05',
    time: '1:00 PM - 3:00 PM',
    description: 'Take a guided tour of our brewery facilities and learn how our craft beers are made.',
    image: images.events.breweryTour,
    ticketPrice: 10.99,
    available: true,
  },
  {
    id: 4,
    title: 'Local Band Night',
    date: '2025-06-10',
    time: '8:00 PM - 11:00 PM',
    description: 'Support local musicians while enjoying our specialty brews.',
    image: images.events.bandNight,
    ticketPrice: 12.99,
    available: true,
  },
];
