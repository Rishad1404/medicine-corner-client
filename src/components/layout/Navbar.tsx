"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { NavMenu } from "@/components/shared/nav-menu";
import { NavigationSheet } from "@/components/shared/navigation-sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
// Removed CartButton import

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur h-20 border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Login - Hidden on mobile, visible on desktop (md) */}
          <Button className="hidden md:inline-flex font-semibold" variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>

          {/* Register - Hidden on mobile, visible on desktop (md) */}
          <Button className="hidden md:inline-flex font-semibold" asChild>
            <Link href="/register">Register</Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;