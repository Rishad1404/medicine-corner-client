"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose, // 👈 Import this
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, X } from "lucide-react"; // 👈 Import 'X'
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartSidebar() {
  const { cart, cartTotal, removeFromCart, updateQuantity, cartCount } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* WRAPPER: relative allows absolute positioning of the badge */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer group">
          
          {/* ICON */}
          <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />

          {/* BADGE: Top-Right Corner */}
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-background animate-in zoom-in-50 duration-300">
              {cartCount}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0 gap-0 border-l border-border bg-background"
      >
        {/* HEADER */}
        <SheetHeader className="px-6 py-5 border-b border-border/60 bg-background/95 backdrop-blur-sm sticky top-0 z-10 flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart
            <span className="text-muted-foreground font-medium text-sm ml-2">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </SheetTitle>

          {/* ❌ CLOSE BUTTON */}
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-secondary">
               <X className="h-4 w-4" />
               <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        {/* SCROLLABLE LIST */}
        <ScrollArea className="flex-1 px-6">
          {cart.length > 0 ? (
            <div className="py-6 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 group relative"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="h-24 w-24 shrink-0 bg-secondary/30 rounded-xl overflow-hidden relative border border-border/50">
                    <Image
                      src={item.image.replace("i.ibb.co.com", "i.ibb.co")}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="96px"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-sm leading-tight text-foreground line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors -mt-0.5 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-primary font-bold text-sm">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-lg bg-background shadow-sm h-8">
                        <button
                          onClick={() => updateQuantity(item.id, "minus")}
                          className="w-8 h-full flex items-center justify-center hover:bg-secondary/80 text-muted-foreground transition-colors rounded-l-lg"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <Separator orientation="vertical" className="h-4 bg-border" />
                        <span className="w-8 text-center text-xs font-semibold tabular-nums text-foreground">
                          {item.quantity}
                        </span>
                        <Separator orientation="vertical" className="h-4 bg-border" />
                        <button
                          onClick={() => updateQuantity(item.id, "plus")}
                          className="w-8 h-full flex items-center justify-center hover:bg-secondary/80 text-muted-foreground transition-colors rounded-r-lg"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-24 w-24 bg-secondary/30 rounded-full flex items-center justify-center animate-pulse">
                <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-foreground">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                  Looks like you haven't added any medicine yet.
                </p>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="p-6 bg-background border-t border-border z-10 space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>৳{cartTotal.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-end">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">৳{cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid gap-2">
                <Button
                  className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/10"
                  size="lg"
                  asChild
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                {/* Optional: Add a close button at bottom too for better UX on mobile */}
                <SheetClose asChild>
                    <Button variant="outline" className="w-full">Continue Shopping</Button>
                </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}