"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, MapPin, CreditCard, Banknote, ShoppingBag, User, Phone, Building2, Truck } from "lucide-react";
import Image from "next/image";
import { createOrder } from "@/actions/orders.actions";


export function CheckoutForm() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(60);

  const [formData, setFormData] = useState({
    name: "", phone: "", address: "", city: "Dhaka", paymentMethod: "COD"
  });

  useEffect(() => {
    const city = formData.city.toLowerCase().trim();
    setDeliveryFee(city.includes("dhaka") ? 60 : 120);
  }, [formData.city]);

  const grandTotal = cartTotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error("Your cart is empty");

    setLoading(true);
    const orderPayload = {
      products: cart.map(item => ({ product: item.id, quantity: item.quantity })),
      shippingAddress: `${formData.address}, ${formData.city}`, 
      paymentMethod: formData.paymentMethod,
      totalAmount: grandTotal,
      name: formData.name, 
      phone: formData.phone 
    };

    const result = await createOrder(orderPayload);

    if (result?.success) {
      toast.success("Order placed successfully!");
      clearCart(); 
      router.push("/profile");
    } else {
      toast.error(result?.message || "Failed to place order");
    }
    setLoading(false);
  };

  if (cart.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <ShoppingBag className="h-10 w-10 text-slate-300 mb-2" />
              <h2 className="text-xl font-bold text-slate-900">Cart is empty</h2>
              <Button size="sm" className="mt-4 bg-slate-900 text-white" onClick={() => router.push("/shop")}>Return to Shop</Button>
          </div>
      );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

      {/* --- LEFT: INPUTS --- */}
      <div className="lg:col-span-2 space-y-4">
        
        {/* Shipping */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-3 px-5">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
               <MapPin className="h-4 w-4 text-emerald-600" /> Shipping Info
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-5">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                   <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
                   <div className="relative">
                     <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                     <Input required placeholder="Rahim Ahmed" className="pl-9 h-9 text-sm"
                       value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-1.5">
                   <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone</Label>
                   <div className="relative">
                     <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                     <Input required placeholder="017..." className="pl-9 h-9 text-sm"
                       value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                   </div>
                </div>
             </div>
             
             <div className="space-y-1.5">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Address</Label>
                <Textarea required placeholder="Full Address..." className="min-h-[80px] text-sm resize-none"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
             </div>

             <div className="space-y-1.5">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">City</Label>
                <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input className="pl-9 h-9 text-sm" value={formData.city} 
                       onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                   <Truck className="h-3 w-3" />
                   {formData.city.toLowerCase().includes('dhaka') ? "Inside Dhaka: 60৳" : "Outside Dhaka: 120৳"}
                </p>
             </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-3 px-5">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
               <CreditCard className="h-4 w-4 text-emerald-600" /> Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
             <RadioGroup defaultValue="COD" onValueChange={(val) => setFormData({...formData, paymentMethod: val})}>
                <div className={`flex items-center justify-between p-3 rounded-lg border transition-all ${formData.paymentMethod === 'COD' ? 'border-slate-800 bg-slate-50' : 'border-slate-100'}`}>
                   <div className="flex items-center space-x-3">
                     <RadioGroupItem value="COD" id="cod" className="text-slate-900" />
                     <Label htmlFor="cod" className="cursor-pointer font-bold text-sm text-slate-700">Cash On Delivery</Label>
                   </div>
                   <Banknote className="h-5 w-5 text-emerald-600" />
                </div>
             </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* --- RIGHT: SUMMARY --- */}
      <div className="lg:col-span-1">
         <Card className="sticky top-20 border-slate-200 shadow-lg bg-white">
            <CardHeader className="bg-slate-900 py-3 text-center">
               <CardTitle className="text-white text-sm font-bold uppercase tracking-widest">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
               <div className="space-y-3 mb-5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 py-1">
                       <div className="h-10 w-10 shrink-0 bg-slate-50 rounded border border-slate-100 relative">
                           {item.image && (
                               <Image src={item.image.replace("i.ibb.co.com", "i.ibb.co")} alt={item.name} fill className="object-contain p-0.5" />
                           )}
                       </div>
                       <div className="flex-1 min-w-0 flex flex-col justify-center">
                           <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
                           <p className="text-[10px] text-slate-500">Qty: {item.quantity}</p>
                       </div>
                       <span className="font-bold text-slate-900 text-xs self-center">৳{item.price * item.quantity}</span>
                    </div>
                  ))}
               </div>
               
               <Separator className="my-3" />
               
               <div className="space-y-2">
                  <div className="flex justify-between text-slate-500 text-xs font-medium">
                     <span>Subtotal</span>
                     <span>৳{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-xs font-medium">
                     <span>Delivery</span>
                     <span className="text-slate-800 font-bold">৳{deliveryFee}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                     <span className="text-slate-800 font-bold text-base">Total</span>
                     <span className="text-emerald-600 font-black text-xl">৳{grandTotal}</span>
                  </div>
               </div>

               <Button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold h-10" disabled={loading}>
                 {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Place Order"}
               </Button>
            </CardContent>
         </Card>
      </div>
    </form>
  );
}