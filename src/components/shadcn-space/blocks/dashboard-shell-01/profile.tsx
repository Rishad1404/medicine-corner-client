"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, MapPin, Phone, User, Save, ShieldCheck, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ProfileBlockProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role: string;
    phone?: string;   
    address?: string; 
  };
}

export default function ProfileBlock({ user }: ProfileBlockProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
          <p className="text-muted-foreground">
            Manage your personal information and shipping details.
          </p>
        </div>
        <div className="flex items-center gap-2">
           {/* Role Badge */}
           <Badge variant="secondary" className="text-sm px-3 py-1 capitalize">
              {user.role.toLowerCase()} Account
           </Badge>
        </div>
      </div>

      <Separator />

      {/* 2. Main Layout with Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[400px] mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* --- TAB: GENERAL --- */}
        <TabsContent value="general">
          <div className="grid gap-6 md:grid-cols-[250px_1fr]">
            {/* Left: Avatar Card */}
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
                <div className="relative group">
                   <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={user.image || ""} className="object-cover" />
                    <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {/* Upload Button Overlay */}
                  <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-sm">
                    <Camera className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Right: Form */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your public profile and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="name" defaultValue={user.name} className="pl-9" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email" defaultValue={user.email} className="pl-9 bg-muted" disabled />
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Contact support to change your email.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="+880 1..." className="pl-9" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end border-t bg-muted/50 p-4">
                 <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                 </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* --- TAB: SHIPPING --- */}
        <TabsContent value="shipping">
           <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>
                  This address will be used as the default for all your orders.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid gap-2">
                    <Label>Street Address</Label>
                    <div className="relative">
                       <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                       <Textarea className="min-h-[100px] pl-9 pt-2" placeholder="123 Main St, Apt 4B" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                       <Label>City</Label>
                       <Input placeholder="Dhaka" />
                    </div>
                    <div className="grid gap-2">
                       <Label>Postal Code</Label>
                       <Input placeholder="1212" />
                    </div>
                 </div>
              </CardContent>
              <CardFooter className="justify-end border-t bg-muted/50 p-4">
                 <Button onClick={handleSave}>Save Address</Button>
              </CardFooter>
           </Card>
        </TabsContent>

        {/* --- TAB: SECURITY --- */}
        <TabsContent value="security">
          <Card>
             <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and account security.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="grid gap-2">
                   <Label>Current Password</Label>
                   <Input type="password" />
                </div>
                <div className="grid gap-2">
                   <Label>New Password</Label>
                   <Input type="password" />
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-900">
                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                    <span>Two-factor authentication is currently disabled.</span>
                </div>
             </CardContent>
             <CardFooter className="justify-end border-t bg-muted/50 p-4">
                <Button variant="secondary">Update Password</Button>
             </CardFooter>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}