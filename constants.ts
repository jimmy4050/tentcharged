import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Alpine Explorer 2-Person Tent',
    price: '¥1,299',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop',
    description: 'A lightweight and durable tent for two, perfect for high-altitude trekking. Features a waterproof rainfly and easy-setup pole system.',
    category: '2-Person',
  },
  {
    id: 2,
    name: 'Family Camping Cabin 6-Person',
    price: '¥2,599',
    imageUrl: 'https://picsum.photos/seed/tent2/800/600',
    description: 'Spacious and comfortable, this tent is ideal for family camping trips. Includes a room divider and multiple windows for ventilation.',
    category: 'Family',
  },
  {
    id: 3,
    name: 'Ultralight Solo Hiker Tent',
    price: '¥899',
    imageUrl: 'https://picsum.photos/seed/tent3/800/600',
    description: 'Designed for the solo adventurer, this tent weighs just 1.2kg. It packs down small and sets up in minutes, making it perfect for backpacking.',
    category: 'Solo',
  },
  {
    id: 4,
    name: 'All-Weather Expedition Dome',
    price: '¥3,499',
    imageUrl: 'https://picsum.photos/seed/tent4/800/600',
    description: 'A geodesic dome tent built to withstand extreme weather conditions. Trusted by mountaineers and polar explorers for its stability and insulation.',
    category: 'Expedition',
  },
  {
    id: 5,
    name: 'Quick-Pitch Beach Shelter',
    price: '¥599',
    imageUrl: 'https://picsum.photos/seed/tent5/800/600',
    description: 'Enjoy a day at the beach with this easy-to-set-up shelter. Provides UPF 50+ sun protection and features sand pockets for stability.',
    category: 'Shelter',
  },
  {
    id: 6,
    name: 'Luxury Glamping Yurt',
    price: '¥5,899',
    imageUrl: 'https://picsum.photos/seed/tent6/800/600',
    description: 'Experience the outdoors in style with our luxury yurt. Made from premium canvas with a solid frame, it offers a glamorous camping experience.',
    category: 'Glamping',
  },
];