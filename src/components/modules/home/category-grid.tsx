"use client";

import Link from "next/link";
import { 
  Activity, 
  Stethoscope, 
  Microscope, 
  ShieldCheck, 
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export function CategoryGrid({ categories: rawCategories }: { categories: any }) {
  // Safe data extraction
  const categories = Array.isArray(rawCategories) 
    ? rawCategories 
    : (rawCategories?.data && Array.isArray(rawCategories.data)) 
      ? rawCategories.data 
      : [];

  if (categories.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 pb-10 overflow-hidden transition-colors duration-300">
      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center mb-16 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400">
          <Activity className="h-3 w-3 animate-pulse" /> 
          Therapeutic Classes
        </div>
        
        {/* Light: Blue-900 | Dark: White */}
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-blue-900 dark:text-white leading-none">
          Specialized <span className="text-pink-600 dark:text-pink-500">Care</span>
        </h2>
        
        <div className="h-1.5 w-12 bg-pink-600 dark:bg-pink-500 rounded-full" />
        
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl text-sm md:text-base">
          Access verified pharmaceutical supplies classified by medical category.
        </p>
      </motion.div>

      {/* --- GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.slice(0, 6).map((cat: any, index: number) => (
          <motion.div
            key={cat.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              href={`/shop?category=${cat.name}`}
              // Light: White bg, Slate border | Dark: Slate-900 bg, Slate-800 border
              // Hover: Pink border for both
              className="group relative flex flex-col items-center p-8 rounded-[2rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:border-pink-600 dark:hover:border-pink-500 hover:shadow-[0_20px_50px_rgba(219,39,119,0.15)] dark:hover:shadow-[0_20px_50px_rgba(219,39,119,0.1)] transition-all duration-500"
            >
              {/* Arrow Icon */}
              <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                <ChevronRight className="h-4 w-4 text-pink-600 dark:text-pink-400" />
              </div>

              {/* Icon Container */}
              <div className="relative h-20 w-20 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:bg-pink-50 dark:group-hover:bg-pink-500/10 transition-colors overflow-hidden">
                {cat.image ? (
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  // Default Icon: Slate -> Pink on Hover
                  <Stethoscope className="text-slate-300 dark:text-slate-600 h-8 w-8 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors" />
                )}
              </div>

              <div className="space-y-1 text-center">
                {/* Text: Blue-900 (Light) -> Pink (Hover) | White (Dark) -> Pink (Hover) */}
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-900 dark:text-slate-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors block">
                  {cat.name}
                </span>
                
                {/* Verified Badge */}
                <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                   <ShieldCheck className="h-2.5 w-2.5 text-pink-500" />
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Verified</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* --- TRUST BAR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 flex items-center justify-center gap-8 py-6 border-t border-slate-100 dark:border-slate-800"
      >
        <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity group cursor-default">
           <Microscope className="h-4 w-4 group-hover:rotate-12 transition-transform text-pink-600 dark:text-pink-400" />
           <span className="text-[10px] font-bold uppercase tracking-widest text-blue-900 dark:text-slate-300">Lab Tested Inventory</span>
        </div>
        
        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
        
        <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity group cursor-default">
           <ShieldCheck className="h-4 w-4 group-hover:scale-110 transition-transform text-pink-600 dark:text-pink-400" />
           <span className="text-[10px] font-bold uppercase tracking-widest text-blue-900 dark:text-slate-300">Drug Admin Approved</span>
        </div>
      </motion.div>
    </section>
  );
}