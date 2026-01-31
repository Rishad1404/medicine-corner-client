
import { NavItem } from "@/types";
import { Layers, LayoutDashboard, Package, Users } from "lucide-react";


export const adminRoutes: NavItem[] = [
  { label: "Overview", isSection: true },
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },

  { label: "Management", isSection: true },
  { title: "Manage Users", icon: Users, href: "/admin/users" },
  { title: "All Orders", icon: Package, href: "/admin/orders" },
  { title: "Categories", icon: Layers, href: "/admin/categories" },
];