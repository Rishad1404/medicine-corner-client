"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Search, X, Loader2, ArrowUpDown, Check, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function ShopHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [isSearching, setIsSearching] = useState(false);
  const isFirstRender = useRef(true);


  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const currentUrlSearch = searchParams.get("search") || "";
    if (searchTerm === currentUrlSearch) return;

    setIsSearching(true);

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      

      params.delete("page"); 

      router.push(`/shop?${params.toString()}`);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, searchParams, router]);


  const handleSort = (field: string | null, order: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (field && order) {
      params.set("sortBy", field);
      params.set("sortOrder", order);
    } else {
      params.delete("sortBy");
      params.delete("sortOrder");
    }

    params.delete("page"); // Reset pagination
    router.push(`/shop?${params.toString()}`);
  };

  // Helper for Active Checkmarks
  const isSortActive = (field: string | null, order: string | null) => {
    const currentField = searchParams.get("sortBy");
    const currentOrder = searchParams.get("sortOrder");
    if (!field && !order) return !currentField && !currentOrder;
    return currentField === field && currentOrder === order;
  };

  const getSortLabel = () => {
    const field = searchParams.get("sortBy");
    const order = searchParams.get("sortOrder");
    if (field === "price" && order === "asc") return "PRICE: LOW TO HIGH";
    if (field === "price" && order === "desc") return "PRICE: HIGH TO LOW";
    return "FEATURED";
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* SEARCH INPUT (Matches OrderTable Style) */}
          <div className="relative w-full md:max-w-md group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors pointer-events-none">
              {isSearching ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
            </div>
            
            <Input 
              placeholder="SEARCH MEDICINES..." 
              className="h-9 pl-9 pr-8 rounded-lg border-slate-200 bg-slate-50 text-xs font-medium placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-400 focus-visible:border-slate-400 transition-all uppercase tracking-wide"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          
          {/* SORT DROPDOWN (Matches OrderTable Actions) */}
          <div className="flex items-center gap-2 w-full md:w-auto">
             <Button variant="outline" className="md:hidden flex-1 h-9 text-xs font-bold uppercase tracking-wider text-slate-500 border-slate-200">
                <SlidersHorizontal className="h-3.5 w-3.5 mr-2" /> Filters
             </Button>

             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button 
                   variant="outline" 
                   size="sm" 
                   className="h-9 px-4 min-w-[180px] justify-between font-bold text-[10px] uppercase tracking-wider text-slate-600 border-slate-200 bg-white hover:bg-slate-50 flex-1 md:flex-none shadow-sm"
                 >
                   <span className="flex items-center">
                     <ArrowUpDown className="h-3.5 w-3.5 mr-2 text-slate-400" />
                     {getSortLabel()}
                   </span>
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-[200px] p-1 rounded-lg border-slate-200 shadow-md">
                 <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">Sort Order</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 
                 <DropdownMenuItem onClick={() => handleSort(null, null)} className="text-xs font-medium cursor-pointer py-2">
                   FEATURED
                   {isSortActive(null, null) && <Check className="h-3 w-3 ml-auto text-emerald-600" />}
                 </DropdownMenuItem>
                 
                 <DropdownMenuItem onClick={() => handleSort("price", "asc")} className="text-xs font-medium cursor-pointer py-2">
                   PRICE: LOW TO HIGH
                   {isSortActive("price", "asc") && <Check className="h-3 w-3 ml-auto text-emerald-600" />}
                 </DropdownMenuItem>
                 
                 <DropdownMenuItem onClick={() => handleSort("price", "desc")} className="text-xs font-medium cursor-pointer py-2">
                   PRICE: HIGH TO LOW
                   {isSortActive("price", "desc") && <Check className="h-3 w-3 ml-auto text-emerald-600" />}
                 </DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
          </div>

        </div>
      </div>
    </div>
  );
}