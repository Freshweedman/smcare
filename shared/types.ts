export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  vegan?: boolean;
  volume?: string;
  createdAt: number;
}

export interface StorageData {
  products: Product[];
  lastUpdated: number;
}

