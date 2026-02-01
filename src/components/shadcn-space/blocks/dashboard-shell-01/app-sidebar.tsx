"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  SidebarTrigger, // ✅ Imported SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // ✅ Imported Separator

import { Bell, HomeIcon, LogOut, User as UserIcon } from "lucide-react";

import { NavMain } from "@/components/shadcn-space/blocks/dashboard-shell-01/nav-main";
import { adminRoutes } from "@/routes/adminRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { authClient } from "@/lib/auth-client";


const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= texts.length) {
      setIndex(0); 
      return;
    }

    const timeout = setTimeout(() => {

      if (!reverse && subIndex <= texts[index].length) {
        setCurrentText(texts[index].substring(0, subIndex));
        setSubIndex((prev) => prev + 1);
      } 

      else if (reverse && subIndex >= 0) {
        setCurrentText(texts[index].substring(0, subIndex));
        setSubIndex((prev) => prev - 1);
      } 

      else {
        setReverse(!reverse);
        if (reverse) {
          setIndex((prev) => prev + 1); 
        }
      }
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="text-xl font-bold text-muted-foreground hidden md:inline-block">
      {currentText}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
};


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

  const getNavData = () => {
    const role = user.role.toUpperCase();
    switch (role) {
      case "ADMIN": return adminRoutes;
      case "SELLER": return sellerRoutes;
      case "CUSTOMER": default: return customerRoutes;
    }
  };

  const navData = getNavData();

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

          <SidebarContent className="flex-1 overflow-hidden px-0 mt-4">
            <SimpleBar style={{ height: "100%" }}>
              <div className="px-4 pb-4">
                <NavMain items={navData} />
              </div>
            </SimpleBar>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border bg-background/50">
             {/* ... (Your Footer code remains exactly the same as before) ... */}
             <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-2 mb-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    <Image src={user.image} alt={user.name} width={32} height={32} />
                  ) : (
                    <UserIcon className="size-4 text-primary" />
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()} Account</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-1">
                <Button variant="ghost" className="w-full justify-start gap-2 h-9" asChild>
                  <Link href="/"><HomeIcon className="size-4" />Home</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 h-9" asChild>
                  <Link href="/profile"><UserIcon className="size-4" />Profile</Link>
                </Button>
              </div>
              <Button variant="destructive" className="w-full justify-start gap-2" onClick={handleSignOut}>
                <LogOut className="size-4" />Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </div>
      </Sidebar>

      {/* ---------------- Main Layout ---------------- */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        

        <header className="sticky top-0 z-50 flex items-center justify-between border-b px-6 py-3 bg-background/95 backdrop-blur">

          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 hidden md:block" />
          </div>

  
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <TypewriterText 
               texts={[
                 `Welcome back, ${user.name.split(" ")[0]}! 👋`,
                 "Ship Faster 🚀",
                 "Focus on Growth 📈",
                 "Medicine Corner 💊"
               ]} 
             />
          </div>


          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative group">
              <Bell className="size-5 transition-transform duration-300 group-hover:rotate-[20deg]" />
              <span className="absolute top-2 right-2 size-2.5 rounded-full bg-red-500 border-2 border-background animate-pulse" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;