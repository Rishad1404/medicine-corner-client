"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Eye, PackageCheck, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Reset error state if product changes
  useEffect(() => {
    setImgError(false);
  }, [product.image]);

  return (
    <div
      className="group mb-10 relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- IMAGE AREA (The Fix) --- */}
      <Link
        href={`/shop/${product.id}`}
        className="relative block w-full aspect-[4/3] rounded-t-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 isolate"
      >
        {/* Stock Badge */}
        {product.stock < 5 && (
          <div className="absolute top-4 left-4 z-20">
            <Badge
              variant="destructive"
              className="bg-red-500 text-white border-none shadow-sm text-[10px] uppercase tracking-wider"
            >
              Low Stock
            </Badge>
          </div>
        )}

        {!imgError && product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            /* 2. VISIBILITY FIX: Removed 'opacity-0' */
            className="object-cover transition-transform duration-500 group-hover:scale-110 z-10"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority
            unoptimized// Force it to load without Next.js server processing
          />
        ) : (
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-slate-300">
            <Pill className="h-12 w-12 mb-2 opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
              Verified Product
            </span>
          </div>
        )}

        {/* Quick View Overlay (Appears on Hover) */}
        <div
          className={cn(
            "absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            variant="secondary"
            className="rounded-full px-5 font-bold text-[10px] uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Eye className="mr-2 h-3 w-3" /> View Details
          </Button>
        </div>
      </Link>

      {/* --- CONTENT AREA --- */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title & Category */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
            {product.category?.name || "Healthcare"}
          </p>
          <Link href={`/shop/${product.id}`}>
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight hover:text-indigo-600 transition-colors truncate">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Price
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              ৳{product.price?.toLocaleString()}
            </span>
          </div>

          <Button
            size="icon"
            className="h-11 w-11 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white shadow-lg shadow-slate-900/10 transition-all hover:scale-105 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
