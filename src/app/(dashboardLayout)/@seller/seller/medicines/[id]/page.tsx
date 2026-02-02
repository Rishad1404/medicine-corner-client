import { medicineService } from "@/app/services/medicine.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  ArrowLeft, 
  Pencil, 
  Calendar, 
  Package, 
  Factory, 
  Tag, 
  AlertCircle 
} from "lucide-react";
import Image from "next/image"; // If you use Next.js Image
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MedicineDetailsPage({ params }: PageProps) {
  // 1. Resolve Params (Next.js 15)
  const { id } = await params;

  // 2. Fetch Data
  const { data: medicine, error } = await medicineService.getSingleMedicine(id);

  if (error || !medicine) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-semibold">Medicine not found</h2>
        <Link href="/dashboard/seller/medicines">
          <Button variant="outline">Go Back</Button>
        </Link>
      </div>
    );
  }

  // Helper for Stock Color
  const getStockColor = (stock: number) => {
    if (stock <= 0) return "text-red-600 bg-red-50 border-red-200";
    if (stock <= 5) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-emerald-600 bg-emerald-50 border-emerald-200";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/seller/medicines">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Product Details</h1>
            <p className="text-sm text-muted-foreground">
              View and manage specifications
            </p>
          </div>
        </div>
        <Link href={`/dashboard/seller/medicines/${id}/edit`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" /> Edit Medicine
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: IMAGE --- */}
        <div className="md:col-span-1">
          <div className="rounded-xl border bg-white overflow-hidden shadow-sm aspect-square relative flex items-center justify-center p-4">
            {medicine.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center text-muted-foreground">
                 <Package className="h-16 w-16 mb-2 opacity-20" />
                 <span className="text-sm">No Image Available</span>
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: INFO --- */}
        <div className="md:col-span-2 space-y-6">
          
          <Card>
            <CardContent className="p-6 space-y-6">
              
              {/* Title & Price */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                     <Badge variant="secondary" className="font-normal text-muted-foreground">
                        {medicine.category?.name || "Uncategorized"}
                     </Badge>
                     <Badge variant="outline" className={getStockColor(medicine.stock)}>
                        {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
                     </Badge>
                   </div>
                   <h2 className="text-3xl font-bold text-foreground">{medicine.name}</h2>
                   <div className="flex items-center text-muted-foreground mt-1">
                      <Factory className="mr-2 h-4 w-4" />
                      {medicine.manufacturer}
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-sm text-muted-foreground mb-1">Selling Price</p>
                   <p className="text-4xl font-mono font-medium text-foreground">
                      ৳{medicine.price.toLocaleString()}
                   </p>
                </div>
              </div>

              <Separator />

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                
                {/* Stock Level */}
                <div className="space-y-1">
                   <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center">
                     <Package className="mr-2 h-3 w-3" /> Current Stock
                   </span>
                   <p className="text-xl font-semibold">
                      {medicine.stock} <span className="text-sm font-normal text-muted-foreground">units</span>
                   </p>
                </div>

                {/* Expiry Date */}
                <div className="space-y-1">
                   <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center">
                     <Calendar className="mr-2 h-3 w-3" /> Expiry Date
                   </span>
                   <p className="text-xl font-semibold">
                      {new Date(medicine.expiryDate).toLocaleDateString("en-GB", {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                   </p>
                </div>

                {/* Added Date */}
                <div className="space-y-1">
                   <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center">
                     <Tag className="mr-2 h-3 w-3" /> Added On
                   </span>
                   <p className="text-base font-medium pt-1">
                      {new Date(medicine.createdAt || Date.now()).toLocaleDateString()}
                   </p>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Description</h3>
                <div className="text-sm text-muted-foreground leading-relaxed">
                   {medicine.description ? (
                      <p>{medicine.description}</p>
                   ) : (
                      <p className="italic opacity-50">No description provided for this product.</p>
                   )}
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}