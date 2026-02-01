"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Keep for non-field usage (Checkbox)
import { Separator } from "@/components/ui/separator";
import { Field, FieldLabel, FieldError } from "@/components/ui/field"; // Custom Fields

import AuthBackgroundShape from "@/assets/svg/auth-background-shape";
import { authClient } from "@/lib/auth-client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// 1. Define Schema
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const session = authClient.useSession();

  const route = useRouter();

  // 2. Initialize Form
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Logged In Successfully", { id: toastId });


        const user = data.user as any;
        if (user.role === "ADMIN") {
          route.push("/admin"); // Redirect Admin to Dashboard
        } else {
          route.push("/"); // Redirect Customer/Seller to Home
        }
      } catch (error) {
        toast.error("Something went wrong, please try again", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
    console.log(data);
  };

  return (
    <div className="relative flex items-center justify-center overflow-x-hidden px-4 py-20 mb-20 sm:px-6 lg:px-8">
      <div className="absolute">
        <AuthBackgroundShape />
      </div>

      <Card className="z-1 w-full border-1 shadow-md sm:max-w-lg">
        <CardHeader className="gap-6 text-center flex flex-col items-center">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Medicine Corner Logo"
            className="h-16 object-contain"
            width={180}
            height={48}
            priority
          />

          <div>
            <CardTitle className="mb-1.5 text-2xl">
              Sign in to Medicine Corner
            </CardTitle>
            <CardDescription className="text-base">
              Ship Faster and Focus on Growth.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {/* Email */}
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-1" data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="leading-5">
                        Email address*
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your email address"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Password */}
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field
                      className="w-full space-y-1"
                      data-invalid={isInvalid}
                    >
                      <FieldLabel htmlFor={field.name} className="leading-5">
                        Password*
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={isVisible ? "text" : "password"}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="••••••••••••••••"
                          className="pr-9"
                          aria-invalid={isInvalid}
                        />
                        <Button
                          type="button" // Prevent form submission
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setIsVisible((prevState) => !prevState)
                          }
                          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                        >
                          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                          <span className="sr-only">
                            {isVisible ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between gap-y-2">
                <div className="flex items-center gap-3">
                  <Checkbox id="rememberMe" className="size-6" />
                  <Label htmlFor="rememberMe" className="text-muted-foreground">
                    {" "}
                    Remember Me
                  </Label>
                </div>

                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={!canSubmit}
                  >
                    {isSubmitting
                      ? "Signing in..."
                      : "Sign in to Medicine Corner"}
                  </Button>
                )}
              />
            </form>

            <p className="text-muted-foreground text-center">
              New on our platform?{" "}
              <a
                href="/register"
                className="text-card-foreground hover:underline"
              >
                Create an account
              </a>
            </p>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <p>or</p>
              <Separator className="flex-1" />
            </div>

            <Button
              onClick={() => handleGoogleLogin()}
              variant="ghost"
              className="w-full"
              asChild
            >
              <Link href="#">
                <svg
                  className="h-4 w-4 mr-2" // Added mr-2 for spacing
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
