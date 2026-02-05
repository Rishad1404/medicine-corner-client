"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { NavMenu } from "@/components/shared/nav-menu";
import { NavigationSheet } from "@/components/shared/navigation-sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import UserDropdown from "@/components/shadcn-space/blocks/dashboard-shell-01/user-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CartSidebar } from "@/components/shared/cart-sidebar";

const Navbar = () => {
  const session = authClient.useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl h-20 border-b bg-background/80">
      {/* Added 'relative' here so we can absolute center the logo on mobile */}
      <div className="relative mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* --- LEFT SECTION --- */}
        <div className="flex items-center">
            {/* 1. Mobile Menu (Hamburger) - Visible only on Mobile */}
            <div className="md:hidden mr-2">
                <NavigationSheet user={user}/>
            </div>

            {/* 2. Desktop Logo - Hidden on Mobile */}
            <div className="hidden md:block">
                <Logo />
            </div>
        </div>

        {/* --- CENTER SECTION --- */}
        
        {/* 3. Mobile Logo - Absolutely Centered */}
        <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo />
        </div>

        {/* 4. Desktop Menu - Hidden on Mobile */}
        <NavMenu className="hidden md:block" />


        {/* --- RIGHT SECTION (Actions) --- */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          <CartSidebar />

          <ModeToggle />

          {user ? (
            <div className="flex items-center gap-2">
              <UserDropdown
                user={user as any}
                trigger={
                  <div className="rounded-full border shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
                    <Avatar className="size-8 sm:size-9"> {/* Made slightly smaller on mobile */}
                      <AvatarImage 
                        src={user.image || ""} 
                        alt={user.name || "User"} 
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                }
              />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button className="font-semibold" variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="font-semibold" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
          
          {/* Note: Removed NavigationSheet from here as it is now on the left */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;