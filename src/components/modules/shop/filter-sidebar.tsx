"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react"; // Added Filter icon
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"; // Optional: for visual flair

interface FilterSidebarProps {
  categories?: string[];
}

export function FilterSidebar({ categories = [] }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  /* ---------------- Sync URL → Local State ---------------- */
  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  /* ---------------- Param Helper ---------------- */
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", "1"); // always reset pagination

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`/shop?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  /* ---------------- Category ---------------- */
  const handleCategory = (cat: string) => {
    if (selectedCategory === cat) {
      updateParams({ category: null });
    } else {
      updateParams({ category: cat });
    }
  };

  /* ---------------- Price ---------------- */
  const applyPriceFilter = () => {
    const min = minPrice ? Math.max(0, Number(minPrice)) : null;
    const max = maxPrice ? Math.max(0, Number(maxPrice)) : null;

    if (min !== null && max !== null && min > max) return;

    updateParams({
      minPrice: min !== null ? String(min) : null,
      maxPrice: max !== null ? String(max) : null,
    });
  };

  // Check if any filter is active
  const hasActiveFilters = selectedCategory || minPrice || maxPrice;

  return (
    <aside className="w-full space-y-8 bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
      
      {/* ---------------- Header ---------------- */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-black uppercase tracking-wider text-blue-900 dark:text-white flex items-center gap-2">
           <Filter className="h-4 w-4 text-pink-600" /> Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                router.push("/shop"); // Reset all
            }}
            className="text-[10px] font-bold text-pink-600 hover:text-blue-900 transition-colors flex items-center gap-1 bg-pink-50 dark:bg-pink-900/20 px-2 py-1 rounded-full"
          >
            <X className="h-3 w-3" /> Clear All
          </button>
        )}
      </div>

      {/* ---------------- Categories ---------------- */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Categories
        </h3>

        <div className="space-y-1">
          {categories.length ? (
            categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all duration-300 flex items-center justify-between group border border-transparent",
                    isActive
                      ? "bg-pink-50 text-pink-700 border-pink-100 font-bold dark:bg-pink-900/10 dark:text-pink-300 dark:border-pink-900/30"
                      : "text-slate-600 hover:bg-slate-50 hover:pl-4 dark:text-slate-400 dark:hover:bg-slate-900"
                  )}
                >
                  <span className="truncate">{cat}</span>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-pink-600 animate-pulse" />
                  )}
                </button>
              );
            })
          ) : (
            <p className="text-[10px] text-slate-400 italic">
              No categories found
            </p>
          )}
        </div>
      </div>

      {/* ---------------- Price ---------------- */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Price Range
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 group-focus-within:text-pink-600 transition-colors">
                ৳
              </span>
              <Input
                type="number"
                min={0}
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-10 pl-7 text-xs rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/10 transition-all dark:bg-slate-900 dark:focus:bg-slate-950"
              />
            </div>

            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 group-focus-within:text-pink-600 transition-colors">
                ৳
              </span>
              <Input
                type="number"
                min={0}
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-10 pl-7 text-xs rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/10 transition-all dark:bg-slate-900 dark:focus:bg-slate-950"
              />
            </div>
          </div>

          <Button
            onClick={applyPriceFilter}
            className="w-full bg-pink-600 hover:bg-blue-900 text-white font-bold uppercase tracking-wide text-[10px] h-10 rounded-xl shadow-lg shadow-pink-600/20 transition-all duration-300"
          >
            Apply Filter
          </Button>
        </div>
      </div>

      {/* ---------------- Brands (Visual Placeholder) ---------------- */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Search Brands
        </h3>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            placeholder="Search brand..."
            className="h-10 pl-9 text-xs rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-500/10 transition-all dark:bg-slate-900 dark:focus:bg-slate-950"
          />
        </div>
      </div>
    </aside>
  );
}