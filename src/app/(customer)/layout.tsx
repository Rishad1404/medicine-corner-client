import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar"; 
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const user = session?.data?.user;

  if (!user) {
    redirect("/login");
  }

  return (
    <AppSidebar user={user as any}>
      {children}
    </AppSidebar>
  );
}