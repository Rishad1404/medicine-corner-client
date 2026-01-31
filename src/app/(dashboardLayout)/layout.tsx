import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar";

export default function Page({
  admin,
  seller,
  customer,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
}) {
  const userInfo = {
    role: "ADMIN",
  };

  return (
    <AppSidebar user={userInfo}>
      {userInfo.role === "ADMIN" && admin}

      {userInfo.role === "SELLER" && seller}

      {userInfo.role === "CUSTOMER" && customer}
    </AppSidebar>
  );
}
