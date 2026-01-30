import AppSidebar from "@/components/shadcn-space/blocks/dashboard-shell-01/app-sidebar";

export default function Page({ children }: { children: React.ReactNode }) {
  return <AppSidebar>{children}</AppSidebar>;
}
