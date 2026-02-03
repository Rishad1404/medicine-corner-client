"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

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

  return (
    <aside className="w-full space-y-6">
      {/* ---------------- Categories ---------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Categories
          </h3>
          {selectedCategory && (
            <button
              onClick={() => updateParams({ category: null })}
              className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>

        <div className="space-y-1">
          {categories.length ? (
            categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={cn(
                    "w-full text-left px-2 py-1.5 rounded-md text-xs transition-all duration-200 flex items-center justify-between",
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-bold dark:bg-indigo-900/20 dark:text-indigo-300"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                  )}
                >
                  <span className="truncate">{cat}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  )}
                </button>
              );
            })
          ) : (
            <p className="text-[10px] text-slate-400 px-2">
              No categories found
            </p>
          )}
        </div>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* ---------------- Price ---------------- */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 px-1">
          Price Range
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
              ৳
            </span>
            <Input
              type="number"
              min={0}
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="h-8 pl-5 text-[11px]"
            />
          </div>

          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
              ৳
            </span>
            <Input
              type="number"
              min={0}
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-8 pl-5 text-[11px]"
            />
          </div>
        </div>

        <Button
          onClick={applyPriceFilter}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase text-[10px] h-8"
        >
          Apply
        </Button>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* ---------------- Brands (UI only for now) ---------------- */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100 px-1">
          Brands
        </h3>

        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
          <Input
            placeholder="Search..."
            className="h-7 pl-7 text-[10px]"
          />
        </div>
      </div>
    </aside>
  );
}
