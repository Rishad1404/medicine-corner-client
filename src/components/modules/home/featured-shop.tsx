"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card";

export function FeaturedShop({ medicines: rawMedicines }: { medicines: any }) {
  // 1. DATA GUARD
  const products = Array.isArray(rawMedicines) 
    ? rawMedicines 
    : (rawMedicines?.data && Array.isArray(rawMedicines.data)) 
      ? rawMedicines.data 
      : [];

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* --- CENTERED HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16 space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
            <Sparkles className="h-3 w-3 animate-pulse" /> New Arrivals
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            Explore Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Premium Collection
            </span>
          </h2>
          
          <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
            Discover top-rated medical supplies and supplements. Verified quality for your daily health needs.
          </p>
        </motion.div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-12">
          {products.slice(0, 8).map((product: any, index: number) => (
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1, 
                ease: "easeOut" 
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM BUTTON --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link href="/shop">
            <Button className="h-14 px-10 rounded-full dark:bg-pink-600 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-1">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}