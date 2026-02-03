"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card";

export function FeaturedShop({ medicines: rawMedicines }: { medicines: any }) {
  const products = Array.isArray(rawMedicines) 
    ? rawMedicines 
    : (rawMedicines?.data && Array.isArray(rawMedicines.data)) 
      ? rawMedicines.data 
      : [];

  if (products.length === 0) return null;

  return (

    <section className="relative py-32   overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/5 dark:bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-pink-600/5 dark:bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          // Added 'mb-24' to push the cards further down from the title
          className="flex flex-col items-center text-center mb-24 space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-900 dark:text-blue-200">
            <Sparkles className="h-3.5 w-3.5 text-pink-600 animate-pulse" /> 
            <span>Curated Selection</span>
          </div>
          
          <h2 className="text-2xl md:text-6xl font-black tracking-tighter text-blue-950 dark:text-white leading-[1.1]">
            Trusted Medical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-pink-600 dark:from-blue-400 dark:to-pink-500">
              Supplies & Care
            </span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-10">
            Explore our most popular healthcare essentials. 
            Verified by pharmacists for quality and effectiveness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16 mb-16">
          {products.slice(0, 8).map((product: any, index: number) => (
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: "easeOut" 
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}

          className="flex flex-col items-center gap-4 mt-20"
        >
          <Link href="/shop">
            <Button 
              className="h-16 px-12 rounded-full bg-pink-600 hover:bg-blue-900 text-white font-bold text-sm uppercase tracking-[0.15em] shadow-xl shadow-pink-600/20 hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              Go To Shop
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          

        </motion.div>

      </div>
    </section>
  );
}