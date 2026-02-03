"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Loader2,
  MapPin,
  CreditCard,
  Banknote,
  ShoppingBag,
  User,
  Phone,
  Building2,
  Truck,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import { createOrderAction } from "@/actions/orders.actions";
import { cn } from "@/lib/utils";

export function CheckoutForm() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(60);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
    paymentMethod: "COD",
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
      items: cart.map((item) => ({
        medicineId: item.id,
        quantity: item.quantity,
      })),
      shippingAddress: `${formData.address}, ${formData.city}`,
      paymentMethod: formData.paymentMethod,
      totalAmount: grandTotal,
      name: formData.name,
      phone: formData.phone,
    };

    const result = await createOrderAction(orderPayload);

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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-secondary/50 p-6 rounded-full mb-4">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2 mb-6 max-w-xs">
          Add some medicines to your cart before proceeding to checkout.
        </p>
        <Button onClick={() => router.push("/shop")} className="rounded-full px-8">
          Browse Medicines
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()} 
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">Please fill in your details to complete the order.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT: INFORMATION --- */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Shipping Section */}
          <Card className="border-none shadow-sm bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary mb-1">
                <MapPin className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Step 1</span>
              </div>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Where should we deliver your medicine?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Receiver's Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      required
                      placeholder="Enter your name"
                      className="pl-10 bg-secondary/30 border-none h-11"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      required
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="pl-10 bg-secondary/30 border-none h-11"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Delivery Address</Label>
                <Textarea
                  id="address"
                  required
                  placeholder="House no, Flat no, Landmark..."
                  className="min-h-[100px] bg-secondary/30 border-none resize-none p-4"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="city"
                      className="pl-10 bg-secondary/30 border-none h-11"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                   <div className="bg-primary/10 p-2 rounded-full">
                      <Truck className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                      <p className="text-xs font-bold uppercase text-primary tracking-tighter">Delivery Fee</p>
                      <p className="text-sm font-semibold text-foreground">৳{deliveryFee}</p>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card className="border-none shadow-sm bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary mb-1">
                <CreditCard className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Step 2</span>
              </div>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="COD"
                onValueChange={(val) => setFormData({ ...formData, paymentMethod: val })}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="cod"
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all",
                    formData.paymentMethod === "COD" ? "border-primary bg-primary/5" : "border-transparent bg-secondary/30 hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="COD" id="cod" className="sr-only" />
                    <Banknote className={cn("h-5 w-5", formData.paymentMethod === "COD" ? "text-primary" : "text-muted-foreground")} />
                    <span className="font-bold">Cash On Delivery</span>
                  </div>
                  {formData.paymentMethod === "COD" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </Label>
                
                {/* Placeholder for future payment methods */}
                <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-dashed border-muted-foreground/20 opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="font-bold">Online Payment</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-muted px-2 py-0.5 rounded text-muted-foreground">Soon</span>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* --- RIGHT: SUMMARY --- */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24 border-none shadow-xl bg-card overflow-hidden">
            <div className="bg-primary p-6 text-primary-foreground">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Summary
              </h3>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="h-14 w-14 shrink-0 bg-secondary/50 rounded-xl overflow-hidden relative border border-border">
                      {item.image && (
                        <Image
                          src={item.image.replace("i.ibb.co.com", "i.ibb.co")}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <Separator className="bg-border/50 my-6" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground font-medium">
                  <span>Items Total</span>
                  <span>৳{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground font-medium">
                  <span>Shipping Fee</span>
                  <span>৳{deliveryFee}</span>
                </div>
                <Separator className="bg-border/50" />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-2xl font-black text-primary tracking-tight">৳{grandTotal}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-8 h-12 text-base font-bold shadow-lg shadow-primary/20"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...
                  </>
                ) : (
                  "Confirm Order"
                )}
              </Button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Secure Checkout
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}