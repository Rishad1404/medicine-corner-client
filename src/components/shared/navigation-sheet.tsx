import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { NavMenu } from "@/components/shared/nav-menu";
import Link from "next/link"; // Import Link

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      
      {/* Added flex layout to SheetContent to push buttons to bottom */}
      <SheetContent side="left" className="flex flex-col px-6 py-3">
        <div className="pt-4">
            <Logo />
        </div>
        
        {/* Navigation Links */}
        <NavMenu className="mt-6 [&>div]:h-full" orientation="vertical" />

        {/* Login & Register Buttons (Pushed to bottom using mt-auto) */}
        <div className="flex flex-col gap-3 pb-6 mt-10">
          <Button className="w-full font-semibold" variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button className="w-full font-semibold" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};