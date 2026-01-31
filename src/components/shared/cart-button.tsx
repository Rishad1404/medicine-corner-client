"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCartIcon } from "../ui/shopping-cart";

export default function CartButton() {
  // TODO: Connect this to your cart state (Zustand/Redux) later
  const numItems = 0; 

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      asChild
    >
      <Link href="/cart">

        <ShoppingCartIcon className="h-5 w-5 border rounded-full p-3 mr-2" />
        

        {numItems > 0 && (
          <Badge 
            variant="destructive" 

            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
          >
            {numItems}
          </Badge>
        )}
        <span className="sr-only">Open cart</span>
      </Link>
    </Button>
  );
}