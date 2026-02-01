
import { NavItem } from "@/types";
import { CreditCard, Package, ShoppingCart, User } from "lucide-react";

export const customerRoutes: NavItem[] = [
  { label: "My Shopping", isSection: true },
  { title: "My Cart", icon: ShoppingCart, href: "/cart" },


  { label: "My Account", isSection: true },
  { title: "My Orders", icon: Package, href: "/orders" },
  { title: "My Profile", icon: User, href: "/profile" },
];
