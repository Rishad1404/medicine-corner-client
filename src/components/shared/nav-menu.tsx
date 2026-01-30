"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils"; 
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const pathname = usePathname();

  // List of your links
  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                asChild

                className={cn(
                  navigationMenuTriggerStyle(), 
                  "text text-[16px]", 
                  isActive && "font-bold"
                )}
              >
                <Link href={link.href}>{link.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};