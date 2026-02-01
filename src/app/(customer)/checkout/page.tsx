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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreditCard, Truck } from "lucide-react";

export default async function CheckoutPage() {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  if (!session?.data?.user) redirect("/login");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN: Shipping Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Details
              </CardTitle>
              <CardDescription>Where should we send your medicine?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" defaultValue={session.data.user.name?.split(" ")[0]} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea placeholder="123 Main St, Apartment 4B" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input placeholder="Dhaka" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+880 1..." />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 border p-4 rounded-md">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Cash on Delivery
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pay when you receive your order.
                  </p>
                </div>
                {/* Add Radio Group here later if adding online payment */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Dummy Item 1 */}
              <div className="flex justify-between text-sm">
                <span>Napa Extra (x2)</span>
                <span>$5.00</span>
              </div>
              {/* Dummy Item 2 */}
              <div className="flex justify-between text-sm">
                <span>Sergel 20mg (x1)</span>
                <span>$8.00</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>$13.00</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>$2.00</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>$15.00</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">Place Order ($15.00)</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}