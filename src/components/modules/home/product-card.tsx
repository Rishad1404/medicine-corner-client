"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Eye, PackageCheck, Heart, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext"; // <--- 1. IMPORT HOOK

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // 2. GET ADD TO CART FUNCTION
  const { addToCart } = useCart();

  useEffect(() => {
    setImgError(false);
  }, [product.image]);

  // --- SMART DATA LOGIC ---
  const manufacturer = product.manufacturer || "Generic";
  const categoryName = product.category?.name || product.category || "";
  const displayCategory = categoryName.length < 20 ? categoryName : ""; 

  // 3. HANDLE ADD TO CART CLICK
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to details page if wrapped in Link
    e.stopPropagation();
    addToCart(product, 1); // Add 1 item
  };

  return (
    <div
      className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 h-full flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${product.id}`} className="block w-full relative">
        {/* --- IMAGE CONTAINER --- */}
        <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-slate-800 isolate overflow-hidden">
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-start pointer-events-none">
            <div className="flex flex-col gap-2">
              {product.stock < 5 && product.stock > 0 && (
                <Badge variant="destructive" className="bg-red-500/90 backdrop-blur-sm text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                  Low Stock
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="secondary" className="bg-slate-900/90 text-white border-none shadow-sm text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                   Out of Stock
                </Badge>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="pointer-events-auto h-9 w-9 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-sm group/heart"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors duration-300",
                  isWishlisted ? "fill-red-500 text-red-500" : "text-slate-500 dark:text-slate-300 group-hover/heart:text-red-500"
                )}
              />
            </button>
          </div>

          {!imgError && product.image ? (
            <Image
              src={product.image.replace("i.ibb.co.com", "i.ibb.co")}
              alt={product.name}
              width={400}
              height={100}
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-slate-300">
              <PackageCheck className="h-10 w-10 mb-2 opacity-20" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                No Image
              </span>
            </div>
          )}

          {/* Quick View */}
          <div
            className={cn(
              "absolute inset-0 bg-black/20 backdrop-blur-[2px] z-20 flex items-center justify-center transition-all duration-300",
              isHovered ? "opacity-100 visible" : "opacity-0 invisible"
            )}
          >

            <Button
              variant="secondary"
              className="rounded-full px-6 h-10 font-bold text-[10px] uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-slate-900 dark:bg-slate-800 dark:text-white hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 border-none"
            >
              <Eye className="mr-2 h-3.5 w-3.5" /> Quick View
            </Button>
          </div>
        </div>
      </Link>

      {/* --- CONTENT AREA --- */}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="space-y-1.5">
          {/* --- MANUFACTURER & CATEGORY HEADER --- */}
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-500 truncate">
            <Factory className="h-3 w-3" />
            <span>{manufacturer}</span>
            {displayCategory && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400">{displayCategory}</span>
              </>
            )}
          </div>
          
          <Link href={`/shop/${product.id}`} className="group/title block">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover/title:text-indigo-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-end justify-between pt-4 mt-auto border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
              Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                ৳{product.price?.toLocaleString()}
              </span>
            </div>
          </div>

          <Button
            size="icon"
            onClick={handleAddToCart} // <--- 4. ATTACH HANDLER
            disabled={product.stock === 0}
            className="h-12 w-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 hover:dark:bg-indigo-600 hover:dark:text-white shadow-lg shadow-slate-900/10 dark:shadow-none transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}