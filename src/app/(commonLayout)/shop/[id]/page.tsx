import { medicineService } from "@/app/services/medicine.service";
import { ProductActions } from "@/components/modules/shop/product-details/product-actions";
import { ReviewSection } from "@/components/modules/shop/product-details/review-section";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Truck, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = params;

  const response = await medicineService.getSingleMedicine(id);
  const product = response?.data;

  if (!product) notFound();

  const hasDiscount =
    product.discountPrice &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-slate-500 hover:text-slate-900 -ml-3 gap-1"
          >
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4" /> Back to Shop
            </Link>
          </Button>
          <Separator orientation="vertical" className="mx-4 h-6" />
          <span className="text-sm font-medium text-slate-900 truncate max-w-md">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* IMAGE */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-200 dark:border-slate-800 aspect-square flex items-center justify-center">
              {product.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={product.image.replace("i.ibb.co.com", "i.ibb.co")}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <span className="text-slate-300 font-bold">No Image</span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {["100% Authentic", "Cash on Delivery", "Easy Returns"].map(
                (text) => (
                  <div
                    key={text}
                    className="flex flex-col items-center p-3 bg-white border rounded-xl shadow-sm"
                  >
                    <ShieldCheck className="h-5 w-5 text-emerald-500 mb-2" />
                    <span className="text-[10px] font-bold uppercase text-slate-600">
                      {text}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* INFO */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                  {product.category?.name || "Medicine"}
                </Badge>
                {product.manufacturer && (
                  <span className="text-[10px] font-bold text-slate-400 uppercase border-l pl-2">
                    {product.manufacturer}
                  </span>
                )}
              </div>

              <Link
                href="#reviews"
                className="flex items-center gap-1 text-amber-500"
              >
                <Star className="h-4 w-4 fill-current" />
                <span className="underline text-sm">
                  4.8 (24 Reviews)
                </span>
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6">
              {product.name}
            </h1>

            <div className="flex items-end gap-4 mb-8 p-6 bg-white rounded-2xl border">
              <span className="text-5xl font-black text-indigo-600">
                ৳{hasDiscount ? product.discountPrice : product.price}
              </span>

              {hasDiscount && (
                <div>
                  <span className="block text-lg line-through text-slate-400">
                    ৳{product.price}
                  </span>
                  <Badge className="bg-rose-500 text-white">
                    SAVE {discountPercentage}%
                  </Badge>
                </div>
              )}
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase mb-2">
                Description
              </h3>
              <p className="text-slate-600">
                {product.description ||
                  "No detailed description available."}
              </p>
            </div>

            <ProductActions product={product} />

            <div className="mt-10 p-5 bg-indigo-50 border rounded-2xl flex gap-4">
              <Truck className="h-6 w-6 text-indigo-600" />
              <p className="text-sm text-indigo-800">
                Dhaka: <b>24h</b> • Outside Dhaka: <b>2–3 days</b>
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-16" />

        <ReviewSection medicineId={id} />
      </div>
    </div>
  );
}
