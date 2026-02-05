import { medicineService } from "@/app/services/medicine.service";
import { ProductActions } from "@/components/modules/shop/product-details/product-actions";
import { ReviewSection } from "@/components/modules/shop/product-details/review-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ProductDetailsPage({ params }: Props) {
  // Await params for Next.js 15+ compatibility
  const { id } = await params;

  const response = await medicineService.getSingleMedicine(id);
  const product = response?.data;

  if (!product) return notFound();

  // Calculate Discount
  const hasDiscount =
    product.discountPrice &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      
      {/* 1. HEADER / BREADCRUMB */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-slate-500 hover:text-pink-600 dark:text-slate-400 dark:hover:text-pink-400 gap-2 hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-colors"
          >
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4" /> Back to Shop
            </Link>
          </Button>
          
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
             <span>Shop</span>
             <span className="text-slate-300">/</span>
             <span className="text-blue-900 dark:text-slate-200">{product.category?.name || "Medicine"}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        
        {/* 2. TOP SECTION: IMAGE + CORE DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* --- LEFT: COMPACT IMAGE (Span 4) --- */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
               
               {/* Stock Badge */}
               {product.stock > 0 ? (
                 <Badge className="absolute top-4 left-4 z-10 bg-emerald-500 text-white border-none px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md">
                   In Stock
                 </Badge>
               ) : (
                 <Badge variant="destructive" className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md">
                   Out of Stock
                 </Badge>
               )}

               {/* Discount Badge */}
               {hasDiscount && (
                 <Badge className="absolute top-4 right-4 z-10 bg-pink-600 text-white border-none px-3 py-1 text-xs font-bold shadow-md animate-pulse">
                   -{discountPercentage}%
                 </Badge>
               )}

               {product.image ? (
                <Image
                  src={product.image.replace("i.ibb.co.com", "i.ibb.co")}
                  alt={product.name}
                  fill
                  className="object-cover p-10 transition-transform duration-500 hover:scale-110"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-300">
                  <AlertCircle className="h-10 w-10 mb-2 opacity-50" />
                  <span className="text-xs font-bold uppercase tracking-widest">No Image</span>
                </div>
              )}
            </div>
            
            {/* Trust Signals (Below Image) */}
            <div className="grid grid-cols-2 gap-3">
               <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                  <ShieldCheck className="h-5 w-5 text-blue-900 dark:text-blue-400 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">Authentic</span>
               </div>
               <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-900/30">
                  <Truck className="h-5 w-5 text-pink-600 dark:text-pink-400 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-300">Fast Delivery</span>
               </div>
            </div>
          </div>

          {/* --- RIGHT: DETAILS & ACTIONS (Span 8) --- */}
          <div className="lg:col-span-8 flex flex-col h-full">
            
            <div className="mb-6">
               <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className="rounded-full border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                    {product.category?.name || "Medicine"}
                  </Badge>
                  {product.manufacturer && (
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                       {product.manufacturer}
                    </span>
                  )}
               </div>
               
               <h1 className="text-3xl md:text-5xl font-black text-blue-900 dark:text-white tracking-tight mb-6 leading-tight">
                 {product.name}
               </h1>

               {/* Price Block */}
               <div className="flex items-center gap-4 mb-8 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 w-fit shadow-sm">
                 <div className="flex flex-col">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Price</span>
                     <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black text-pink-600 dark:text-pink-500">
                            ৳{hasDiscount ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}
                        </span>
                        {hasDiscount && (
                            <span className="text-lg text-slate-400 line-through decoration-slate-300 decoration-2">
                            ৳{product.price.toLocaleString()}
                            </span>
                        )}
                     </div>
                 </div>
               </div>

               {/* Action Component (Add to Cart / Quantity) */}
               <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <ProductActions product={product} />
               </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: DESCRIPTION & REVIEWS */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Description & Highlights (Span 8) */}
            <div className="lg:col-span-8 space-y-10">
                
                {/* Description Card */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-black text-blue-900 dark:text-white mb-6 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-pink-600" />
                        Product Description
                    </h3>
                    <div className="prose prose-slate dark:prose-invert prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed max-w-none">
                       <p>{product.description || "No detailed description available for this product."}</p>
                    </div>
                </div>

                {/* Highlights Card */}
                <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
                    <h3 className="text-lg font-black text-blue-900 dark:text-blue-300 mb-4 uppercase tracking-wider">
                        Key Highlights
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <li className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-blue-100 dark:border-slate-800">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Clinically Tested</span>
                       </li>
                       <li className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-blue-100 dark:border-slate-800">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Original Packaging</span>
                       </li>
                       <li className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-blue-100 dark:border-slate-800">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Long Expiry Date</span>
                       </li>
                       <li className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-blue-100 dark:border-slate-800">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Stored at 25°C</span>
                       </li>
                    </ul>
                </div>
            </div>

            {/* Reviews (Span 12 - Full Width below description) */}
            <div className="lg:col-span-12 mt-8">
               <ReviewSection medicineId={id} />
            </div>

        </div>
      </main>
    </div>
  );
}