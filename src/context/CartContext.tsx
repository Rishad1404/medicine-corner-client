"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// 1. Define the Cart Item Type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

// 2. Define the Context Type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, action: "plus" | "minus") => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

// 3. Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. EXPORT THE PROVIDER (This is what layout.tsx needs)
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("medicine-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("medicine-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // --- Actions ---
  const addToCart = (product: any, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      if (existing) {
        if (existing.quantity + qty > product.stock) {
          toast.error(`Only ${product.stock} items in stock!`);
          return prev;
        }
        toast.success("Cart updated");
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      
      toast.success("Added to cart");
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.discountPrice || product.price, // Handle discount
          image: product.image,
          quantity: qty,
          stock: product.stock,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed");
  };

  const updateQuantity = (id: string, action: "plus" | "minus") => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (action === "plus") {
             if (item.quantity < item.stock) return { ...item, quantity: item.quantity + 1 };
             else toast.error("Max stock reached");
          }
          if (action === "minus" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("medicine-cart");
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 5. EXPORT THE HOOK (This is what components use)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};