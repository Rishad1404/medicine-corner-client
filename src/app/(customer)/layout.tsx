import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar"; 
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // 👈 1. Import this

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Pass headers to getSession
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const user = session?.data?.user;

  // 3. NOW the check will work correctly
  if (!user) {
    redirect("/login");
  }

  // Optional: Redirect if not a customer
  // if (user.role !== "CUSTOMER") { ... }

  return (
    <AppSidebar user={user as any}>
      {children}
    </AppSidebar>
  );
}