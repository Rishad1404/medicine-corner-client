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
import { 
  Camera, Mail, MapPin, Phone, User, Save, 
  ShieldCheck, CreditCard, CheckCircle2, 
  KeyRound, BellRing, UserCheck 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProfileBlockProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role: string;
  };
}

export default function ProfileBlock({ user }: ProfileBlockProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* 1. HERO / COVER SECTION */}
      <div className="relative mb-20">
        <div className="h-48 w-full rounded-xl bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 border border-border/50" />
        
        <div className="absolute -bottom-12 left-8 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-background shadow-2xl transition-transform group-hover:scale-[1.02]">
              <AvatarImage src={user.image || ""} className="object-cover" />
              <AvatarFallback className="text-4xl font-bold bg-muted">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-1 right-1 h-9 w-9 rounded-full shadow-lg">
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="pb-2 space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 capitalize py-0.5">
                {user.role.toLowerCase()}
              </Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" /> {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        
        {/* 2. SIDEBAR INFO */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="shadow-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">85% Complete</span>
                <span className="text-muted-foreground">Almost there!</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Email Verified
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Account Secured
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-60">
                  <div className="h-4 w-4 rounded-full border-2 border-muted" /> Add Phone Number
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/[0.02] border-primary/10">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-lg">
                    <UserCheck className="h-5 w-5 text-primary" />
                 </div>
                 <div className="text-sm font-medium">Verified Identity</div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your identity has been verified as a {user.role.toLowerCase()} on Medicine Corner. This builds trust with our community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 3. MAIN FORM CONTENT */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="general" className="w-full space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="bg-muted/50 p-1 border">
                <TabsTrigger value="general" className="gap-2">
                  <User className="h-3.5 w-3.5" /> General
                </TabsTrigger>
                <TabsTrigger value="shipping" className="gap-2">
                  <MapPin className="h-3.5 w-3.5" /> Shipping
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <KeyRound className="h-3.5 w-3.5" /> Security
                </TabsTrigger>
              </TabsList>
            </div>

            {/* --- TAB: GENERAL --- */}
            <TabsContent value="general" className="space-y-6">
              <Card className="shadow-sm border-border/50">
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                  <CardDescription>Manage your primary contact information.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+880 1XXX-XXXXXX" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user.email} disabled className="bg-muted/50" />
                    <p className="text-[11px] text-muted-foreground italic px-1">
                      Verified email cannot be changed directly.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t justify-end py-3">
                   <Button className="gap-2 shadow-sm">
                      <Save className="h-4 w-4" /> Save Profile
                   </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* --- TAB: SHIPPING --- */}
            <TabsContent value="shipping">
              <Card className="shadow-sm border-border/50">
                <CardHeader>
                  <CardTitle>Default Shipping Address</CardTitle>
                  <CardDescription>Set your primary location for fast checkouts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Street Address</Label>
                    <Textarea className="min-h-[100px] bg-muted/20" placeholder="123 Road, Area, House No..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input placeholder="e.g. Dhaka" />
                    </div>
                    <div className="space-y-2">
                      <Label>Postal Code</Label>
                      <Input placeholder="e.g. 1212" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t justify-end py-3">
                   <Button variant="outline" className="gap-2">
                      <Save className="h-4 w-4" /> Update Address
                   </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* --- TAB: SECURITY --- */}
            <TabsContent value="security" className="space-y-6">
              <Card className="shadow-sm border-border/50">
                <CardHeader>
                  <CardTitle>Password Management</CardTitle>
                  <CardDescription>We recommend changing your password every 6 months.</CardDescription>
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
                </CardContent>
                <CardFooter className="bg-muted/30 border-t justify-end py-3 text-right">
                  <Button variant="secondary" className="gap-2">Update Security</Button>
                </CardFooter>
              </Card>

              <Card className="border-blue-100 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900/50 shadow-none">
                 <CardContent className="pt-6 flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                       <BellRing className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Security Notification</h4>
                       <p className="text-xs text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
                          Your last password change was 3 months ago. Enabling 2FA (Two-Factor Authentication) will significantly improve your account safety.
                       </p>
                    </div>
                 </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}