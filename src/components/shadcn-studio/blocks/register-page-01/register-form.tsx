"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";



export function RegisterForm() {
  const [role, setRole] = useState<"CUSTOMER" | "SELLER">("CUSTOMER");

  return (
    <Card className="z-10 w-full border-1 shadow-md sm:max-w-lg">
      <CardHeader className="gap-6 text-center flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Medicine Corner Logo"
          width={180}
          height={48}
          className="h-12 w-auto object-contain"
          priority
        />

        <div>
          <CardTitle className="mb-1.5 text-2xl">Create an Account</CardTitle>
          <CardDescription className="text-base">
            Join us as a{" "}
            <span className="font-semibold text-primary capitalize">
              {role}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {/* Role Selection Buttons */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={role === "CUSTOMER" ? "default" : "outline"}
            className={`h-12 gap-2 text-base ${
              role === "CUSTOMER"
                ? "shadow-md ring-2 ring-primary ring-offset-2"
                : "border-dashed text-muted-foreground"
            }`}
            onClick={() => setRole("CUSTOMER")}
          >
            <User className="size-4" />
            Customer
          </Button>

          <Button
            type="button"
            variant={role === "SELLER" ? "default" : "outline"}
            className={`h-12 gap-2 text-base ${
              role === "SELLER"
                ? "shadow-md ring-2 ring-primary ring-offset-2"
                : "border-dashed text-muted-foreground"
            }`}
            onClick={() => setRole("SELLER")}
          >
            <Store className="size-4" />
            Seller
          </Button>
        </div>

        <div className="space-y-4">
          {/* Form */}
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <input
                id="fullName"
                name="fullName"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email address*</Label>
              <input
                id="email"
                name="email"
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password*</Label>
              <input
                id="password"
                name="password"
                type="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Hidden Input for Role */}
            <input type="hidden" name="role" value={role} />

            <Button type="submit" className="w-full font-semibold">
              Sign Up as {role === "CUSTOMER" ? "CUSTOMER" : "SELLER"}
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <p className="text-xs text-muted-foreground">OR</p>
            <Separator className="flex-1" />
          </div>

          {/* Google Button */}
          <Button variant="ghost" className="w-full" asChild>
            <Link href="#">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 488 512" fill="currentColor">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              Sign up with Google
            </Link>
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-foreground hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}