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
import { CartSidebar } from "@/components/shared/cart-sidebar"; // Ensure this path matches where you saved Step 2

const Navbar = () => {
  const session = authClient.useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl h-20 border-b bg-background/80">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          

          <CartSidebar />

          <ModeToggle />

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <UserDropdown
                user={user as any}
                trigger={
                  <div className="rounded-full border shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
                    <Avatar className="size-9">
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
            <>
              <Button className="hidden md:inline-flex font-semibold" variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="hidden md:inline-flex font-semibold" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}

          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;