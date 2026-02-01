
import { NavItem } from "@/types";
import { ContainerIcon, LayoutDashboard, ListOrdered, PillIcon } from "lucide-react";

export const sellerRoutes: NavItem[] = [
  { label: "Overview", isSection: true },
  { title: "Dashboard", icon: LayoutDashboard, href: "/seller" },

  { label: "Inventory Management", isSection: true },
  { title: "Create Medicine",icon:PillIcon, href: "/seller/medicines/create" },
  { title: "Manage Medicines",icon:ContainerIcon, href: "/seller/medicines" }, 
  { label: "Sales", isSection: true },
  { title: "Manage Orders", icon: ListOrdered, href: "/seller/orders" },
];