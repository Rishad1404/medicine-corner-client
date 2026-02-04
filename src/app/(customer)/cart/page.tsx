"use client";

import { useCart } from "@/context/CartContext"; // 1. Import the hook
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  // 2. Access the live cart data and functions
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();

  // 3. Shipping logic (matches your checkout logic)
  const shipping = 60.00; // You can make this dynamic based on city later if you wish
  const total = cartTotal + (cart.length > 0 ? shipping : 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="p-6 bg-slate-100 rounded-full">
          <ShoppingBag className="h-12 w-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
        <p className="text-slate-500 text-center max-w-xs">
          Looks like you haven't added any medicine to your cart yet.
        </p>
        <Button asChild className="bg-slate-900">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
          Shopping Cart
        </h1>
        <p className="text-slate-500 text-sm mt-1">Review your items before proceeding to checkout.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT SIDE: Cart Items Table */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[400px] font-bold text-slate-700">Product</TableHead>
                    <TableHead className="text-center font-bold text-slate-700">Quantity</TableHead>
                    <TableHead className="text-right font-bold text-slate-700">Price</TableHead>
                    <TableHead className="text-right font-bold text-slate-700">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id} className="group transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                            <Image
                              src={item.image.replace("i.ibb.co.com", "i.ibb.co")}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                               ৳{item.price} per unit
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                            <button 
                                onClick={() => updateQuantity(item.id, "minus")}
                                className="px-2 py-1 hover:bg-slate-200 transition-colors"
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-slate-900">
                                {item.quantity}
                            </span>
                            <button 
                                onClick={() => updateQuantity(item.id, "plus")}
                                className="px-2 py-1 hover:bg-slate-200 transition-colors"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-600">
                        ৳{item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-black text-slate-900">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-slate-200 shadow-xl overflow-hidden">
            <CardHeader className="bg-slate-900 py-5">
              <CardTitle className="text-white text-sm font-bold uppercase tracking-widest text-center">
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold text-slate-900">৳{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping (Estimate)</span>
                <span className="font-bold text-slate-900">৳{shipping.toFixed(2)}</span>
              </div>
              
              <div className="py-2">
                  <div className="flex gap-2">
                    <Input placeholder="Coupon Code" className="h-10 text-xs" />
                    <Button variant="secondary" className="h-10 text-xs font-bold">Apply</Button>
                  </div>
              </div>

              <Separator className="bg-slate-100" />
              
              <div className="flex justify-between items-center py-2">
                <span className="text-lg font-bold text-slate-900">Grand Total</span>
                <span className="text-2xl font-black text-emerald-600">৳{total.toFixed(2)}</span>
              </div>
            </CardContent>
            
            <CardFooter className="p-6 bg-slate-50">
              <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider shadow-lg" asChild>
                <Link href="/checkout" className="flex items-center justify-center gap-2">
                  Checkout Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}