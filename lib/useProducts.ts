import { useEffect, useState } from "react";
import type { Product, StorageData } from "@/shared/types";


const STORAGE_KEY = "boticario_products";
const INIT_FLAG = "boticario_initialized";

function generateId(): string {
  return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function useProducts(initialProductsData: Omit<Product, "id" | "createdAt">[] = []) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const initialized = localStorage.getItem(INIT_FLAG);

      if (stored) {
        const data: StorageData = JSON.parse(stored);
        setProducts(data.products);
      } else if (!initialized && initialProductsData.length > 0) {
        // First time - initialize with example products
        const initialProducts: Product[] = initialProductsData.map((p) => ({
          ...p,
          id: generateId(),
          createdAt: Date.now(),
        }));

        const data: StorageData = {
          products: initialProducts,
          lastUpdated: Date.now(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem(INIT_FLAG, "true");
        setProducts(initialProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save products to localStorage
  const saveProducts = (newProducts: Product[]) => {
    try {
      const data: StorageData = {
        products: newProducts,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setProducts(newProducts);
    } catch (error) {
      console.error("Error loading products:", error);
      console.error("Error saving products:", error);
    }
  };

  // Add product
  const addProduct = (product: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...product,
      id: generateId(),
      createdAt: Date.now(),
    };
    saveProducts([...products, newProduct]);
    return newProduct;
  };

  // Update product
  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveProducts(updated);
  };

  // Delete product
  const deleteProduct = (id: string) => {
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
  };

  // Clear all products
  const clearProducts = () => {
    saveProducts([]);
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    clearProducts,
    saveProducts,
  };
}

