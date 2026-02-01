import ProfileBlock from "@/components/shadcn-space/blocks/dashboard-shell-01/profile";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // 👈 Import headers

export default async function ProfilePage() {

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  
  const user = session?.data?.user;

  if (!user) {
    redirect("/login");
  }

  return <ProfileBlock user={user as any} />;
}