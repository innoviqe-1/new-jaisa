
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Laptop' | 'Desktop' | 'Monitor' | 'Accessory' | 'MacBook';
  price: number;
  originalPrice: number;
  image: string;
  images?: string[]; // Multiple images for the carousel
  condition: 'Excellent' | 'Good' | 'Fair';
  specs: {
    processor?: string;
    ram?: string;
    storage?: string;
    screen?: string;
    resolution?: string;
  };
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type Page = 'home' | 'shop' | 'product-detail' | 'cart' | 'sell';

export interface AppState {
  currentPage: Page;
  selectedProduct: Product | null;
  cart: CartItem[];
  searchQuery: string;
}
