"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Heart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext"; // <--- Import the Hook

export function ProductActions({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  
  // Get the global addToCart function
  const { addToCart } = useCart(); 

  const handleIncrement = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    // Pass the product and the selected quantity to the Context
    addToCart(product, quantity); 
  };

  return (
    <div className="space-y-6">
      {/* QUANTITY SELECTOR */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Quantity:</span>
        <div className="flex items-center border border-slate-200 rounded-lg bg-white">
          <button 
            onClick={handleDecrement}
            className="p-2 hover:bg-slate-50 text-slate-600 disabled:opacity-50 transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-bold text-slate-900">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="p-2 hover:bg-slate-50 text-slate-600 disabled:opacity-50 transition-colors"
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {product.stock > 0 ? `${product.stock} items available` : "Out of Stock"}
        </span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <Button 
          size="lg" 
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider h-12 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-12 w-12 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 p-0 transition-colors"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}