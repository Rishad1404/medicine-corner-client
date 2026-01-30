import { ArrowRight, Pill, Truck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

export default function HeroSection() {
  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-24 sm:py-32">
      {/* Background Animation */}
      <AnimatedGridPattern
        className={cn(
          "mask-[radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12 opacity-50"
        )}
        duration={3}
        maxOpacity={0.1}
        numSquares={30}
      />
      
      <div className="relative z-10 max-w-4xl text-center">
        {/* Badge / Announcement */}
        <Badge
          asChild
          className="mb-8 rounded-full border-primary/20 bg-primary/10 px-4 py-1 text-primary hover:bg-primary/20"
          variant="secondary"
        >
          <Link href="/shop" className="flex items-center gap-2">
            <Truck className="size-4" />
            <span className="text-sm font-medium">Fast Delivery Across the City</span>
            <ArrowRight className="size-3" />
          </Link>
        </Badge>

        {/* Main Headline */}
        <h1 className="font-bold text-4xl text-blue-950 tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Your Trusted <span className=" text-pink-600">Online Pharmacy</span>
          <br className="hidden sm:block" /> & Healthcare Partner
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Order genuine medicines, healthcare products, and wellness essentials from the comfort of your home. 
          Verified pharmacists, 100% authentic products, and lightning-fast delivery.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="h-12 rounded-full px-8 text-base font-medium bg-blue-950 transition-all hover:scale-105" size="lg" asChild>
            <Link href="/shop">
              Order Medicine <Pill className="ml-2 size-5" />
            </Link>
          </Button>
          
          <Button
            className="h-12 rounded-full px-8 text-white font-medium shadow-sm transition-all hover:bg-muted"
            size="lg"
            variant="outline"
            asChild
          >
            <Link href="/about" className="bg-pink-600 text-white shadow-sm transition-all hover:scale-105">
              Learn More
            </Link>
          </Button>
        </div>

        {/* Trust Indicators (Optional small text below) */}
        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-green-500" />
            100% Genuine
          </div>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-green-500" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-green-500" />
            Secure Payment
          </div>
        </div>

      </div>
    </div>
  );
}