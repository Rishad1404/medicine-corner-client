"use client";

import Link from "next/link";
import { User, Store, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import * as z from "zod";

import { useForm } from "@tanstack/react-form"; 
import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(4, "This field is required"),
  email: z.email(),
  password: z.string().min(6, "Minimum length is 8"),
  role: z.string(),
});

export function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {

      const toastId= toast.loading("Creating Account")
      try {
        const {data,error}=await authClient.signUp.email(value);
        if(error){
          toast.error(error.message,{id:toastId});
          return;
        }

        toast.success("Registered Successfully",{id:toastId})
        router.push("/")

      } catch (error) {
        toast.error("Something went wrong, please try again",{id:toastId})
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
    <Card className="z-10 w-full border-1 shadow-md sm:max-w-lg">
      <CardHeader className="gap-6 text-center flex flex-col items-center">
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

          <form.Subscribe
            selector={(state) => state.values.role}
            children={(role) => (
              <CardDescription className="text-base">
                Join us as a{" "}
                <span className="font-semibold text-primary capitalize">
                  {role.toUpperCase()}
                </span>
              </CardDescription>
            )}
          />
        </div>
      </CardHeader>

      <CardContent>
        <form.Subscribe
          selector={(state) => state.values.role}
          children={(role) => (
            <div className="mb-6 grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={role === "CUSTOMER" ? "default" : "outline"}
                className={`h-12 gap-2 text-base ${
                  role === "CUSTOMER"
                    ? "shadow-md ring-2 ring-primary ring-offset-2"
                    : "border-dashed text-muted-foreground"
                }`}
                onClick={() => form.setFieldValue("role", "CUSTOMER")}
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
                onClick={() => form.setFieldValue("role", "SELLER")}
              >
                <Store className="size-4" />
                Seller
              </Button>
            </div>
          )}
        />

        <FieldGroup className="space-y-4">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            {/* Full Name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;

                return (
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <input
                      id="name"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Enter your full name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Email */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="email">Email address*</FieldLabel>
                    <input
                      id="email"
                      type="email"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Enter your email address"
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
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="password">Password*</FieldLabel>
                    <div className="relative">
                      <input
                        id="password"
                        type={isVisible ? "text" : "password"}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Enter password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? (
                          <EyeOff className="size-4 text-muted-foreground" />
                        ) : (
                          <Eye className="size-4 text-muted-foreground" />
                        )}
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

            {/* Submit Button */}
            <form.Subscribe
              selector={(state) => [
                state.canSubmit,
                state.isSubmitting,
                state.values.role,
              ]}
              children={([canSubmit, isSubmitting, role]) => (
                <Button
                  type="submit"
                  className="w-full font-semibold"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "Signing Up..." : `Sign Up as ${role}`}
                </Button>
              )}
            />
          </form>

          {/* Footer Links */}
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <p className="text-xs text-muted-foreground">OR</p>
            <Separator className="flex-1" />
          </div>

          <Button variant="ghost" className="w-full" asChild>
            <Link href="#">Sign up with Google</Link>
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
        </FieldGroup>
      </CardContent>
    </Card>
  );
}