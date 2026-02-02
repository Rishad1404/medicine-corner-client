import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Medicine } from "./medicine-table"; 
import { Calendar, Package, Factory, Tag, Image as ImageIcon, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MedicineDetailsModalProps {
  medicine: Medicine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MedicineDetailsModal({ 
  medicine, 
  open, 
  onOpenChange 
}: MedicineDetailsModalProps) {
  
  if (!medicine) return null;

  // Helper for Status UI
  const getStatusConfig = (stock: number) => {
    if (stock <= 0) return { label: "Out of Stock", color: "text-red-700 bg-red-50 border-red-200", icon: XCircle };
    if (stock <= 5) return { label: "Low Stock", color: "text-amber-700 bg-amber-50 border-amber-200", icon: AlertTriangle };
    return { label: "In Stock", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: CheckCircle2 };
  };

  const status = getStatusConfig(medicine.stock);
  const StatusIcon = status.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0">
        
        {/* HEADER */}
        <DialogHeader className="px-6 py-4 border-b bg-muted/5">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold tracking-tight">Product Specifications</DialogTitle>
            {/* ID or Code could go here */}
            <span className="text-xs text-muted-foreground font-mono pr-8">ID: {medicine.id.slice(-6).toUpperCase()}</span>
          </div>
        </DialogHeader>

        <div className=" md:grid-cols-12 gap-0">
          
          {/* LEFT: IMAGE SECTION (4 cols) */}
          <div className="md:col-span-5 bg-muted/10 p-6 flex items-center justify-center border-r">
            <div className="aspect-square w-full max-w-[280px] bg-white rounded-xl border shadow-sm flex items-center justify-center p-4 relative overflow-hidden">
              {medicine.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={medicine.image} 
                  alt={medicine.name} 
                  className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground/40">
                  <ImageIcon className="h-16 w-16 mb-3 opacity-20" />
                  <span className="text-sm font-medium">No Image Available</span>
                </div>
              )}
              
              {/* Floating Category Badge over Image */}
              <div className="absolute top-3 left-3">
                 <Badge variant="secondary" className="shadow-sm backdrop-blur-md bg-white/80 hover:bg-white/90 text-foreground/80 border-black/5">
                    {medicine.category?.name || "General"}
                 </Badge>
              </div>
            </div>
          </div>

          {/* RIGHT: DETAILS SECTION (7 cols) */}
          <div className="md:col-span-7 p-6 space-y-8 flex flex-col h-full">
            
            {/* 1. Title & Manuf */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight leading-tight mb-1.5">
                    {medicine.name}
                  </h2>
                  <div className="flex items-center text-muted-foreground text-sm font-medium">
                    <Factory className="mr-1.5 h-3.5 w-3.5" />
                    {medicine.manufacturer}
                  </div>
                </div>
                
                {/* Status Badge */}
                <Badge variant="outline" className={cn("px-2.5 py-1 flex items-center gap-1.5 shadow-sm", status.color)}>
                  <StatusIcon className="h-3.5 w-3.5" />
                  {status.label}
                </Badge>
              </div>
            </div>

            {/* 2. Price Section */}
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
               <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Unit Price</p>
               <div className="flex items-baseline gap-1">
                 <span className="text-lg font-medium text-muted-foreground">৳</span>
                 <span className="text-4xl font-mono font-bold text-primary tracking-tighter">
                    {medicine.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                 </span>
               </div>
            </div>

            {/* 3. Detailed Specs Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
               
               {/* Stock */}
               <div className="space-y-1.5">
                  <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    <Package className="mr-2 h-3.5 w-3.5" /> Stock Quantity
                  </div>
                  <div className="text-lg font-medium tabular-nums pl-5.5">
                    {medicine.stock} <span className="text-sm text-muted-foreground font-normal">units</span>
                  </div>
               </div>

               {/* Expiry */}
               <div className="space-y-1.5">
                  <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                     <Calendar className="mr-2 h-3.5 w-3.5" /> Expiry Date
                  </div>
                  <div className="text-lg font-medium tabular-nums pl-5.5">
                    {new Date(medicine.expiryDate).toLocaleDateString("en-GB", {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
               </div>

               {/* Added Date (Optional) */}
               <div className="space-y-1.5">
                  <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                     <Tag className="mr-2 h-3.5 w-3.5" /> Listed On
                  </div>
                  <div className="text-sm font-medium pl-5.5 text-muted-foreground">
                    {/* Assuming you might have createdAt, or fall back to today/expiry logic */}
                     {new Date().toLocaleDateString("en-GB")} 
                  </div>
               </div>
            </div>
            
            <div className="flex-1"></div> {/* Spacer to push content up if needed */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}