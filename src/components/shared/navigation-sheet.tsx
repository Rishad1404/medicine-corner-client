"use client";

import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, LayoutDashboard, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { NavMenu } from "@/components/shared/nav-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


interface NavigationSheetProps {
  user?: any | null; 
}

export const NavigationSheet = ({ user }: NavigationSheetProps) => {
  // 1. Control the open state
  const [isOpen, setIsOpen] = useState(false);

  // 2. Helper to close sheet
  const closeSheet = () => setIsOpen(false);

  const router = useRouter();

  // 3. Dynamic Dashboard Link Logic
  const getDashboardLink = () => {
    if (!user?.role) return "/dashboard";
    // If CUSTOMER -> /dashboard
    // If SELLER -> /seller
    // If ADMIN -> /admin
    return user.role === "CUSTOMER" ? "/dashboard" : `/${user.role.toLowerCase()}`;
  };

    const handleSignOut = async () => {
      await authClient.signOut();
      router.push("/login");
    };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="flex flex-col px-6 py-3">
        <div className="pt-4" onClickCapture={closeSheet}>
            <Logo />
        </div>
        
        {/* Navigation Links - Wrapped in onClick to close sheet when a link is clicked */}
        <div onClick={closeSheet}>
           <NavMenu className="mt-6 [&>div]:h-full" orientation="vertical" />
        </div>

        {/* --- AUTH BUTTONS SECTION --- */}
        <div className="flex flex-col gap-3 pb-6 mt-auto">
          
          {!user ? (
            /* GUEST VIEW */
            <>
              <Button className="w-full font-semibold" variant="outline" asChild onClick={closeSheet}>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="w-full font-semibold bg-pink-600 hover:bg-blue-900 text-white" asChild onClick={closeSheet}>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            /* LOGGED IN VIEW */
            <>
              <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
                 <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                    {user.name?.[0] || <User className="h-5 w-5" />}
                 </div>
                 <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold truncate text-slate-900 dark:text-white">{user.name}</span>
                    <span className="text-[10px] text-slate-500 truncate">{user.email}</span>
                 </div>
              </div>

              {/* Dashboard Link */}
              <Button className="w-full font-semibold justify-start" variant="outline" asChild onClick={closeSheet}>
                <Link href={getDashboardLink()}>
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
              
              {/* Sign Out Button */}
              <Button 
                className="w-full font-semibold justify-start text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200" 
                variant="outline" 
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </>
          )}

        </div>
      </SheetContent>
    </Sheet>
  );
};