import { adminService } from "@/app/services/admin.service";
import { AdminDashboardStats } from "@/components/modules/admin/admin-stats";

export default async function AdminDashboardPage() {
  const statsRes = await adminService.getPlatformStats();
  const stats = statsRes?.data || {};

  return (
    <div className="min-h-screen p-6 lg:p-6">
      <div className="mx-auto max-w-[1600px] space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight uppercase">
            PLATFORM OVERVIEW
          </h1>

        </div>

        {/* Stats Section */}
        <AdminDashboardStats stats={stats} />


      </div>
    </div>
  );
}