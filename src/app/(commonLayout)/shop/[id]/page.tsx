import { medicineService } from "@/app/services/medicine.service";
import { ProductActions } from "@/components/modules/shop/product-details/product-actions";
import { ReviewSection } from "@/components/modules/shop/product-details/review-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ProductDetailsPage({ params }: Props) {
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
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      
      {/* 1. CLEAN BREADCRUMB HEADER */}
      <div className=" bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className=" mx-auto px-4 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-slate-500 hover:text-slate-900 -ml-2 gap-2 hover:bg-transparent"
          >
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4" /> Back to Shop
            </Link>
          </Button>
          
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
             <span>Shop</span>
             <span className="text-slate-300">/</span>
             <span className="text-slate-900 dark:text-slate-100">{product.category?.name || "Medicine"}</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN PRODUCT GRID */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* LEFT COLUMN: IMAGE GALLERY (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 shadow-sm">
               {/* Status Badge */}
               {product.stock > 0 ? (
                 <Badge className="absolute top-4 left-4 z-10 bg-emerald-500 hover:bg-emerald-600 border-none">
                    In Stock
                 </Badge>
               ) : (
                 <Badge variant="destructive" className="absolute top-4 left-4 z-10">
                    Out of Stock
                 </Badge>
               )}

               {product.image ? (
                <Image
                  src={product.image.replace("i.ibb.co.com", "i.ibb.co")}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-slate-50 text-slate-300">
                  <span className="text-sm font-bold uppercase tracking-widest">No Image Available</span>
                </div>
              )}
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                     <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">100% Authentic</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Sourced directly from manufacturers.</p>
                  </div>
               </div>
               <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <Truck className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                     <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Fast Delivery</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Delivery within 24h inside Dhaka.</p>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT DETAILS (Span 7) */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Header Info */}
            <div className="mb-6 border-b border-slate-100 pb-6">
               <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wide font-bold">
                    {product.category?.name || "Medicine"}
                  </Badge>
                  {product.manufacturer && (
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                       <span className="w-1 h-1 rounded-full bg-slate-300" />
                       {product.manufacturer}
                    </span>
                  )}
               </div>
               
               <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                 {product.name}
               </h1>

               <div className="flex items-baseline gap-3">
                 <span className="text-3xl font-bold text-indigo-600">
                   ৳{hasDiscount ? product.discountPrice : product.price}
                 </span>
                 {hasDiscount && (
                   <>
                     <span className="text-lg text-slate-400 line-through decoration-slate-300 decoration-2">
                       ৳{product.price}
                     </span>
                     <Badge variant="destructive" className="ml-1">
                        -{discountPercentage}% OFF
                     </Badge>
                   </>
                 )}
               </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate prose-sm max-w-none mb-8 text-slate-600 leading-relaxed">
               <p>{product.description || "No description provided for this product."}</p>
               
               {/* Quick Highlights List (Static Example) */}
               <ul className="mt-4 space-y-2 list-none pl-0">
                  <li className="flex items-center gap-2">
                     <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                     <span>Clinically tested & approved</span>
                  </li>
                  <li className="flex items-center gap-2">
                     <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                     <span>Standard pharmacy grade</span>
                  </li>
               </ul>
            </div>

            {/* Action Area */}
            <div className="mt-auto">
               <ProductActions product={product} />
            </div>

          </div>
        </div>

        {/* 3. REVIEWS SECTION */}
        <div className="mt-20 lg:mt-32">
           <ReviewSection medicineId={id} />
        </div>
      </main>
    </div>
  );
}