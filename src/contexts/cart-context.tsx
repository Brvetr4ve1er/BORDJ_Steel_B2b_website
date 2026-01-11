/**
 * Shopping Cart Context and Hooks
 * Manages cart state across the application
 */

'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ShoppingCart, CartItem, Product } from '@/types/ecommerce';

// Cart Actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: ShoppingCart };

// Initial Cart State
const initialCart: ShoppingCart = {
  id: '',
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Calculate cart totals
function calculateTotals(items: CartItem[]): Pick<ShoppingCart, 'subtotal' | 'tax' | 'shipping' | 'total'> {
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  // 19% VAT in Algeria
  const tax = subtotal * 0.19;
  
  // Simple shipping calculation
  const shipping = subtotal > 50000 ? 0 : 1500; // Free shipping over 50,000 DZD

  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
}

// Cart Reducer
function cartReducer(state: ShoppingCart, action: CartAction): ShoppingCart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === product.id);

      let newItems: CartItem[];
      
      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [
          ...state.items,
          {
            productId: product.id,
            product,
            quantity,
          },
        ];
      }

      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
        updatedAt: new Date(),
      };
    }

    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      const newItems = state.items.filter(item => item.productId !== productId);
      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
        updatedAt: new Date(),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId } });
      }

      const newItems = state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
        updatedAt: new Date(),
      };
    }

    case 'CLEAR_CART':
      return {
        ...initialCart,
        id: state.id,
        updatedAt: new Date(),
      };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
}

// Cart Context
interface CartContextType {
  cart: ShoppingCart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert date strings back to Date objects
        parsedCart.createdAt = new Date(parsedCart.createdAt);
        parsedCart.updatedAt = new Date(parsedCart.updatedAt);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
