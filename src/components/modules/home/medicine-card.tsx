"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Pill, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MedicineCard({ medicine }: { medicine: any }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [medicine.image]);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 p-4 transition-all hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10">
      
      {/* 1. STRUCTURAL FIX: 
          Link is now the direct relative parent with fixed height.
          We removed the inner <div> wrapper.
      */}
      <Link 
        href={`/shop/${medicine.id}`} 
        className="relative block w-full h-64 rounded-[2rem] overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 isolate"
      >
        {!imgError && medicine.image ? (
          <Image
            src={medicine.image}
            alt={medicine.name}
            fill
            /* 2. VISIBILITY FIX: Removed 'opacity-0' */
            className="object-cover transition-transform duration-500 group-hover:scale-110 z-10"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={true} 
            unoptimized={true} // Force it to load without Next.js server processing
          />
        ) : (
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-slate-300">
            <Pill className="h-12 w-12 mb-2 opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
              Verified Product
            </span>
          </div>
        )}
      </Link>

      <div className="mt-6 px-2 space-y-4 pb-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 block mb-1 text-left">
            {medicine.category?.name || "General Care"}
          </span>
          <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight capitalize truncate text-left">
            {medicine.name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
            ৳{medicine.price?.toLocaleString()}
          </span>

          <Button className="h-12 w-12 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white transition-all shadow-lg active:scale-90 p-0">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}