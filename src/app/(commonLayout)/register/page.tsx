"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Store } from "lucide-react"; // Icons for clear distinction

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import AuthBackgroundShape from "@/assets/svg/auth-background-shape";
import { Label } from "@/components/ui/label";

const Register = () => {
  // 1. State to track the Role (Default to customer)
  const [role, setRole] = useState<"CUSTOMER" | "SELLER">("CUSTOMER");

  return (
    <div className="relative flex py-20 mb-20 items-center justify-center overflow-x-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute">
        <AuthBackgroundShape />
      </div>

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
          {/* 2. Role Selection Buttons */}
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
            {/* 3. The Registration Form */}
            {/* IMPORTANT: Pass the 'role' to your form component so it can be sent to the DB.
               Example: <RegisterForm selectedRole={role} />
               
               Below is a standard HTML structure if you don't have a separate component yet.
            */}
            <form className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="userEmail" className="leading-5">
                  Full Name
                </Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userEmail" className="leading-5">
                  Email address*
                </Label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userEmail" className="leading-5">
                  Password*
                </Label>
                <input
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* Hidden Input to ensure role is submitted if using standard form submission */}
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

            <Button variant="ghost" className="w-full" asChild>
              <Link href="#">
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
                Sign up with Google
              </Link>
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-foreground hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
