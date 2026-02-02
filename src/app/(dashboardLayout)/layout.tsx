/* eslint-disable @typescript-eslint/no-explicit-any */
 // 1. Use Server Auth Instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar";
import { authClient } from "@/lib/auth-client";

export default async function Layout({
  children,
  admin,
  seller,
  customer,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
}) {
  // 2. Fetch session properly with headers
const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(), 
    },
  });

  // 3. Redirect if not logged in
  if (!data) {
    return redirect("/login");
  }

 const user=data.user
  const role = (user as any).role.toUpperCase();

  return (
    <AppSidebar user={{ ...user, role }}>
      
      {/* 5. Render Parallel Routes based on Role */}
      {role === "ADMIN" && admin}

      {role === "SELLER" && seller}

      {role === "CUSTOMER" && customer}

    </AppSidebar>
  );
}