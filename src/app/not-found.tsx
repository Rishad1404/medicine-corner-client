/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      
      {/* 1. Large Animated 404 Text */}
      <div className="relative">
        <h1 className="text-[10rem] font-bold leading-none tracking-tighter text-muted/30 select-none sm:text-[14rem]">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-foreground sm:text-4xl">
            Page Not Found
          </span>
        </div>
      </div>

      {/* 2. Helpful Description */}
      <p className="mx-auto mt-6 max-w-md text-muted-foreground md:text-lg">
        Sorry, the page you are looking for doesn't exist or has been moved.
        Here are some helpful links:
      </p>

      {/* 3. Action Buttons */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        {/* Primary Action: Go Home */}
        <Button asChild size="lg" className="gap-2">
          <Link href="/">
            <Home className="size-4" />
            Back to Home
          </Link>
        </Button>

        {/* Secondary Action: Contact Support */}
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/contact">
            <MessageSquare className="size-4" />
            Contact Support
          </Link>
        </Button>
      </div>

      {/* Optional: Go Back Link */}
      <div className="mt-12">
        <Button variant="link" asChild className="text-muted-foreground">
          <Link href="/" className="gap-2">
            <ArrowLeft className="size-4" />
            Go back to previous page
          </Link>
        </Button>
      </div>
    </div>
  );
}