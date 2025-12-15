import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '@/data/restaurants';
import { Product } from '@/data/instamart';

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface InstamartCartItem extends Product {
  quantity: number;
}

interface CartContextType {
  // Food Cart
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  addItem: (item: MenuItem, restaurantId: string, restaurantName: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getDeliveryFee: () => number;
  getTaxes: () => number;
  getGrandTotal: () => number;
  
  // Instamart Cart
  instamartItems: InstamartCartItem[];
  addInstamartItem: (item: Product) => void;
  removeInstamartItem: (itemId: string) => void;
  updateInstamartQuantity: (itemId: string, quantity: number) => void;
  clearInstamartCart: () => void;
  getInstamartTotalItems: () => number;
  getInstamartTotalPrice: () => number;
  getInstamartDeliveryFee: () => number;
  getInstamartTaxes: () => number;
  getInstamartGrandTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Food cart state
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  
  // Instamart cart state
  const [instamartItems, setInstamartItems] = useState<InstamartCartItem[]>([]);

  // Food cart functions
  const addItem = (item: MenuItem, restId: string, restName: string) => {
    // If adding from different restaurant, clear cart first
    if (restaurantId && restaurantId !== restId) {
      setItems([]);
    }
    
    setRestaurantId(restId);
    setRestaurantName(restName);

    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1, restaurantId: restId, restaurantName: restName }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.id !== itemId);
      if (newItems.length === 0) {
        setRestaurantId(null);
        setRestaurantName(null);
      }
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
  };

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);
  
  const getTotalPrice = () => items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const getDeliveryFee = () => {
    const total = getTotalPrice();
    if (total >= 500) return 0;
    if (total >= 200) return 25;
    return 40;
  };
  
  const getTaxes = () => Math.round(getTotalPrice() * 0.05);
  
  const getGrandTotal = () => getTotalPrice() + getDeliveryFee() + getTaxes();

  // Instamart cart functions
  const addInstamartItem = (item: Product) => {
    setInstamartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeInstamartItem = (itemId: string) => {
    setInstamartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateInstamartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeInstamartItem(itemId);
      return;
    }
    setInstamartItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, quantity } : i
    ));
  };

  const clearInstamartCart = () => {
    setInstamartItems([]);
  };

  const getInstamartTotalItems = () => instamartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const getInstamartTotalPrice = () => instamartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const getInstamartDeliveryFee = () => {
    const total = getInstamartTotalPrice();
    if (total >= 299) return 0;
    return 25;
  };
  
  const getInstamartTaxes = () => Math.round(getInstamartTotalPrice() * 0.05);
  
  const getInstamartGrandTotal = () => getInstamartTotalPrice() + getInstamartDeliveryFee() + getInstamartTaxes();

  return (
    <CartContext.Provider value={{
      // Food cart
      items,
      restaurantId,
      restaurantName,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      getDeliveryFee,
      getTaxes,
      getGrandTotal,
      // Instamart cart
      instamartItems,
      addInstamartItem,
      removeInstamartItem,
      updateInstamartQuantity,
      clearInstamartCart,
      getInstamartTotalItems,
      getInstamartTotalPrice,
      getInstamartDeliveryFee,
      getInstamartTaxes,
      getInstamartGrandTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
