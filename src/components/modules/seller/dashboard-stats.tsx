"use client";

import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Clock, 
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  trend: "up" | "down" | "neutral";
  colorClass: string;
}

// 1. Individual Metric Card Component
function StatCard({ title, value, change, icon: Icon, trend, colorClass }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all hover:shadow-2xl hover:-translate-y-1">
      {/* Decorative background glow */}
      <div className={cn("absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-[0.03] dark:opacity-[0.05] transition-transform group-hover:scale-150", colorClass)} />
      
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          {/* Icon Box */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors group-hover:bg-white dark:group-hover:bg-slate-700">
            <Icon className={cn("h-6 w-6", colorClass.replace('bg-', 'text-').replace('/10', ''))} />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              {title}
            </p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {value}
            </h3>
          </div>
        </div>
        
        {/* Trend Indicator */}
        <div className={cn(
          "flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold border",
          trend === "up" 
            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20" 
            : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700"
        )}>
          {trend === "up" && <ArrowUpRight className="h-3 w-3" />}
          {change}
        </div>
      </div>
    </div>
  );
}

// 2. Main Dashboard Stats Component
export function DashboardStats({ stats }: { stats: any }) {
  // Simple logic to calculate progress (e.g., target of 20 orders per day)
  const targetOrders = 20;
  const currentOrders = stats?.totalOrders ?? 0;
  const progressPercentage = Math.min(Math.round((currentOrders / targetOrders) * 100), 100);

  return (
    <div className="space-y-10">
      
      {/* ROW 1: METRIC CARDS */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenue"
          value={`৳${(stats?.totalRevenue ?? 0).toLocaleString()}`}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          colorClass="bg-emerald-600/10"
        />
        <StatCard
          title="Orders"
          value={stats?.totalOrders ?? 0}
          change="+8%"
          trend="up"
          icon={ShoppingCart}
          colorClass="bg-blue-600/10"
        />
        <StatCard
          title="Medicines"
          value={stats?.totalMedicines ?? 0}
          change="Live"
          trend="neutral"
          icon={Package}
          colorClass="bg-violet-600/10"
        />
        <StatCard
          title="Pending"
          value={stats?.pendingOrders ?? 0}
          change="Action"
          trend="neutral"
          icon={Clock}
          colorClass="bg-amber-600/10"
        />
      </div>

      {/* ROW 2: OPERATIONAL OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Fulfillment Progress Card */}
        {/* Note: This card stays dark in both modes for contrast, but we adjust the background slightly for dark mode */}
        <div className="lg:col-span-2 rounded-[2.5rem] bg-slate-900 dark:bg-slate-800 p-10 text-white shadow-2xl relative overflow-hidden group border border-slate-800 dark:border-slate-700">
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Zap className="h-4 w-4 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Performance Metric</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white">Daily Fulfillment Goal</h2>
              <p className="text-slate-400 text-base font-medium max-w-md">
                You have successfully processed <span className="text-white font-bold">{currentOrders}</span> orders today. 
                Keep it up to maintain your high seller rating!
              </p>
            </div>

            <div className="mt-12 space-y-5">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Completion Rate</span>
                   <p className="text-sm text-slate-300 font-medium">Target: {targetOrders} Orders/Day</p>
                </div>
                <span className="text-3xl font-black text-emerald-400">{progressPercentage}%</span>
              </div>
              <div className="h-4 w-full bg-slate-800 dark:bg-slate-950/50 rounded-full overflow-hidden p-1 border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
            </div>
          </div>
          
          {/* Decorative background Icon */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
             <Package className="h-80 w-80 -mr-16 -mb-16 text-slate-400" />
          </div>
        </div>

        {/* Quick Insights Card */}
        <div className="rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 flex flex-col justify-between shadow-sm">
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 flex items-center gap-3">
              <Megaphone className="h-4 w-4 text-primary" /> Seller Insights
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-5">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 font-black text-lg shadow-sm border border-amber-100 dark:border-amber-500/20">
                  !
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">Inventory Alert</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1">
                    Some items are nearing low-stock levels. Consider restocking soon.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-500/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">Account Status</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1">
                    Your pharmacy is fully verified and compliant with health regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-8 w-full py-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-primary dark:hover:bg-primary transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none border border-transparent dark:border-slate-700">
            View Full Report
          </button>
        </div>

      </div>
    </div>
  );
}