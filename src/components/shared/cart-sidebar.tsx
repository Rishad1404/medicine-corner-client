"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartSidebar() {
  // Dummy Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Napa Extra Pain Reliever",
      price: 2.50,
      quantity: 2,
      image: "/logo.png",
      category: "Medicine" // Added a category for better visuals
    },
    {
      id: 2,
      name: "Surgical Face Mask",
      price: 12.00,
      quantity: 1,
      image: "/logo.png",
      category: "Supplies"
    },
  ]);

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='relative w-fit cursor-pointer hover:opacity-80 transition-opacity group'>
          <div className="p-2 rounded-full group-hover:bg-muted transition-colors">
             <ShoppingCartIcon className='size-6 text-foreground' />
          </div>
          {itemCount > 0 && (
            <Badge className='absolute top-0 right-0 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px] border-2 border-background'>
              {itemCount}
            </Badge>
          )}
        </div>
      </SheetTrigger>

      {/* h-full and flex-col ensures the footer stays at the bottom */}
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0 gap-0 bg-background border-l shadow-2xl">
        
        {/* HEADER */}
        <SheetHeader className="px-6 py-4 border-b mt-5">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="size-5" />
            Your Cart
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {itemCount} items
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* SCROLLABLE LIST */}
        <ScrollArea className="flex-1 w-full">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-0">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-6 border-b hover:bg-muted/30 transition-colors">
                  {/* Image */}
                  <div className="h-20 w-20 relative shrink-0 rounded-lg overflow-hidden border bg-white shadow-sm">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-contain p-1"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="font-bold text-sm shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.category}
                      </p>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 border rounded-full px-2 py-0.5 bg-background shadow-sm">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 rounded-full hover:bg-muted text-muted-foreground"
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 rounded-full hover:bg-muted text-foreground"
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4 p-8 text-center">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCartIcon className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                  Looks like you haven't added anything to your cart yet.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          )}
        </ScrollArea>

        {/* FOOTER - SUMMARY */}
        {cartItems.length > 0 && (
          <div className="border-t bg-muted/20 p-6 space-y-4 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <SheetFooter>
              <Button className="w-full h-11 text-md shadow-lg" size="lg" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}