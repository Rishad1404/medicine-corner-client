"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { LogOut, User as UserIcon } from "lucide-react";

import { NavMain } from "@/components/shadcn-space/blocks/dashboard-shell-01/nav-main";
import { SiteHeader } from "@/components/shadcn-space/blocks/dashboard-shell-01/site-header";
import { adminRoutes } from "@/routes/adminRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { authClient } from "@/lib/auth-client"; // Import Auth Client

// Updated Props Interface to include Name/Email for the footer
interface AppSidebarProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
}

const AppSidebar = ({ user, children }: AppSidebarProps) => {
  const router = useRouter();

  // 1. Dynamic Route Selection (Case Insensitive)
  const getNavData = () => {
    // Convert role to UpperCase to match your Switch cases safely
    const role = user.role.toUpperCase();

    switch (role) {
      case "ADMIN":
        return adminRoutes;
      case "SELLER":
        return sellerRoutes;
      case "CUSTOMER":
      default:
        return customerRoutes;
    }
  };

  const navData = getNavData();

  // 2. Real Sign Out Logic
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); 
          router.refresh();
        },
      },
    });
  };

  return (
    <SidebarProvider>
      <Sidebar className="py-2 px-0 bg-background border-r">
        <div className="flex flex-col h-full bg-background">
          {/* ---------------- Header (Logo) ---------------- */}
          <SidebarHeader className="py-2 px-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Medicine Corner"
                    width={140}
                    height={60}
                    className="h-16 w-96 mx-auto object-contain"
                    priority
                  />
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          {/* ---------------- Content (Dynamic Menu) ---------------- */}
          <SidebarContent className="flex-1 overflow-hidden px-0 mt-4">
            <SimpleBar style={{ height: "100%" }}>
              <div className="px-4 pb-4">
                <NavMain items={navData} />
              </div>
            </SimpleBar>
          </SidebarContent>

          {/* ---------------- Footer (Sign Out) ---------------- */}
          <SidebarFooter className="p-4 border-t border-border bg-background/50">
            <div className="flex flex-col gap-2">
              {/* Dynamic Profile Preview */}
              <div className="flex items-center gap-3 px-2 mb-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {user.image ? (
                     <Image src={user.image} alt={user.name} width={32} height={32} />
                  ) : (
                     <UserIcon className="size-4 text-primary" />
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {user.role.toLowerCase()} Account
                  </span>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full justify-start gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="size-4" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </div>
      </Sidebar>

      {/* ---------------- Main Layout ---------------- */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-50 flex items-center border-b px-6 py-3 bg-background/95 backdrop-blur">
          {/* Pass user to SiteHeader if it needs to show profile/breadcrumbs */}
          <SiteHeader /> 
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;