import { sellerService } from "@/app/services/seller.service";
import { orderService } from "@/app/services/order.service";
import { DashboardStats } from "@/components/modules/seller/dashboard-stats";
import { OrderTable } from "@/components/modules/seller/order-table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download } from "lucide-react";
import Link from "next/link";

export default async function SellerDashboardPage() {
  // 1. Fetch data (Server Component)
  const [statsRes, ordersRes] = await Promise.all([
    sellerService.getSellerStats(),
    orderService.getSellerOrders(1, 10)
  ]);

  const stats = statsRes?.data || {};
  const orders = ordersRes?.data || [];

  return (
    // 👇 Added dark:bg-slate-950 and transition-colors
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 p-6 lg:p-10 transition-colors duration-300">
      <div className="mx-auto max-w-[1600px] space-y-12">
        
        {/* Header / Hero Section */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            {/* 👇 Added dark:text-white */}
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Commerce Overview
            </h1>
            {/* 👇 Added dark:text-slate-400 */}
            <p className="mt-1 font-medium text-slate-500 dark:text-slate-400">
              Manage your pharmacy operations and track fulfillment performance.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* 👇 Added dark:bg-slate-900 dark:border-slate-800 for the outline button */}
            <Button variant="outline" className="rounded-xl border-2 font-bold h-11 dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
            <Link href="/seller/medicines/create">
              <Button className="rounded-xl font-bold h-11 px-6 shadow-lg shadow-primary/20">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Medicine
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <DashboardStats stats={stats} />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {/* 👇 Added dark:text-slate-400 */}
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Recent Sales Pipeline
                </h2>
              </div>
              <Link href="/seller/orders" className="text-xs font-bold text-primary hover:underline">
                View All Orders
              </Link>
            </div>
            
            {/* Order Table */}
            <OrderTable data={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}