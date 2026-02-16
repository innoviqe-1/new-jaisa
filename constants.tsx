
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dell Latitude 7490 - Core i7 8th Gen',
    brand: 'Dell',
    category: 'Laptop',
    price: 24999,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?auto=format&fit=crop&q=80&w=800'
    ],
    condition: 'Excellent',
    specs: { processor: 'i7-8650U', ram: '16GB', storage: '512GB SSD', screen: '14" FHD' },
    features: ['Backlit Keyboard', 'Fingerprint Reader', 'Certified Refurbished']
  },
  {
    id: '2',
    name: 'HP EliteBook 840 G5 - Sleek Design',
    brand: 'HP',
    category: 'Laptop',
    price: 22499,
    originalPrice: 78000,
    image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585241936239-09ca8658a7cc?auto=format&fit=crop&q=80&w=800'
    ],
    condition: 'Good',
    specs: { processor: 'i5-8350U', ram: '8GB', storage: '256GB SSD', screen: '14" FHD' },
    features: ['Aluminum Body', 'Fast Charging', 'Bang & Olufsen Audio']
  },
  {
    id: '3',
    name: 'Apple MacBook Pro M1 - Space Grey',
    brand: 'Apple',
    category: 'MacBook',
    price: 64999,
    originalPrice: 122900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611186871348-b1ec696e5237?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800'
    ],
    condition: 'Excellent',
    specs: { processor: 'Apple M1', ram: '8GB', storage: '256GB SSD', screen: '13.3" Retina' },
    features: ['Touch Bar', 'Magic Keyboard', 'All-day battery']
  },
  {
    id: '4',
    name: 'Lenovo ThinkPad T480 - Durability King',
    brand: 'Lenovo',
    category: 'Laptop',
    price: 19999,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800'
    ],
    condition: 'Excellent',
    specs: { processor: 'i5-8250U', ram: '16GB', storage: '512GB SSD', screen: '14" FHD' },
    features: ['Hot-swap Battery', 'TrackPoint', 'Military Grade']
  },
  {
    id: '5',
    name: 'Dell 24" UltraSharp Monitor',
    brand: 'Dell',
    category: 'Monitor',
    price: 8999,
    originalPrice: 18500,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    condition: 'Excellent',
    specs: { screen: '24" IPS', resolution: '1920x1080' },
    features: ['Height Adjustable', 'USB Hub', 'Thin Bezels']
  },
  {
    id: '6',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    category: 'Accessory',
    price: 4499,
    originalPrice: 10995,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
    condition: 'Excellent',
    specs: {},
    features: ['Quiet Clicks', 'MagSpeed Scrolling', 'Multi-device']
  }
];

export const CATEGORIES = [
  { name: 'Laptops', icon: '💻' },
  { name: 'MacBooks', icon: '🍎' },
  { name: 'Monitors', icon: '🖥️' },
  { name: 'Desktops', icon: '⌨️' },
  { name: 'Accessories', icon: '🖱️' }
];

export const TRUST_SIGNALS = [
  { title: '1-Year Warranty', desc: 'Stress-free ownership', icon: '🛡️' },
  { title: '7-Day Return', desc: 'No questions asked', icon: '🔄' },
  { title: 'Free Delivery', desc: 'Safe & Pan-India', icon: '🚚' },
  { title: 'Cash on Delivery', desc: 'Pay when you receive', icon: '💵' }
];
