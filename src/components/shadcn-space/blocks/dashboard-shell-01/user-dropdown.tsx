"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon, LayoutDashboard, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// Define props to receive the user details
interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
  trigger?: React.ReactNode;
}

export default function UserDropdown({ user, trigger }: UserDropdownProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  // 1. Dynamic Route Logic
  const isCustomer = user.role === "CUSTOMER";
  const isSeller = user.role === "SELLER";
  const isAdmin = user.role === "ADMIN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
           // Fallback trigger if none provided
           <Button variant="ghost" className="relative h-8 w-8 rounded-full">
             {/* Avatar code here... */}
           </Button>
        )}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          
          {/* 🟢 SCENARIO 1: CUSTOMER */}
          {isCustomer && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/orders" className="cursor-pointer">
                  <Package className="mr-2 h-4 w-4" />
                  <span>My Orders</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/cart" className="cursor-pointer">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>My Cart</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {/* 🔵 SCENARIO 2: SELLER & ADMIN */}
          {(isSeller || isAdmin) && (
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/${user.role.toLowerCase()}`} className="cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}

          {/* ⚪ SHARED: Profile */}
          <DropdownMenuItem asChild>
            <Link href={isCustomer ? "/profile" : "/dashboard/profile"} className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}