"use client";

import { useEffect, useState } from "react";
import { 
  Users, BarChart3, CreditCard, ShieldAlert, ArrowUpRight,
  Globe, Activity, Server, Zap, ShieldCheck, 
  ArrowRight, Clock, Radio, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Universal Stat Card (Light/Dark Optimized)
function AdminStatCard({ title, value, subtext, icon: Icon, colorClass, trend }: any) {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all hover:shadow-2xl dark:hover:border-primary/50 hover:-translate-y-2">
      {/* Dynamic Glow Background */}
      <div className={cn("absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-[0.05] dark:opacity-[0.15] transition-transform duration-1000 group-hover:scale-150", colorClass)} />
      
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all group-hover:rotate-12", colorClass)}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 border border-emerald-100 dark:border-emerald-500/20">
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">{trend}</span>
            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">{title}</p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{value}</h3>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">{subtext}</p>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboardStats({ stats }: { stats: any }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-10">
      
      {/* --- LIVE SYSTEM BAR (Dark/Light) --- */}
      <div className="flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
             <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">System Monitoring Live</span>
          </div>
          <div className="h-6 w-[2px] bg-slate-100 dark:bg-slate-800 hidden md:block" />
          <div className="hidden md:flex items-center gap-3 text-slate-600 dark:text-slate-300">
             <Clock className="h-4 w-4 text-primary" />
             <span className="text-sm font-black font-mono tracking-widest">{time || "00:00:00"}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden lg:flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase">Region</span>
              <span className="text-xs font-bold dark:text-white">ASIA-SOUTH-1</span>
           </div>
           <div className="h-8 w-24 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">99.9% UPTIME</span>
           </div>
        </div>
      </div>

      {/* --- GRID 1: CORE METRICS --- */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title="Gross Volume"
          value={`৳${(stats?.totalRevenue ?? 0).toLocaleString()}`}
          subtext="Net platform earnings"
          icon={CreditCard}
          colorClass="bg-gradient-to-br from-slate-900 to-slate-700 dark:from-indigo-600 dark:to-blue-700"
          trend="+22%"
        />
        <AdminStatCard
          title="Active Users"
          value={stats?.totalUsers ?? 0}
          subtext="Verified accounts"
          icon={Users}
          colorClass="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-cyan-600"
          trend="+5.4%"
        />
        <AdminStatCard
          title="Total Orders"
          value={stats?.totalOrders ?? 0}
          subtext="Fulfillment items"
          icon={BarChart3}
          colorClass="bg-gradient-to-br from-violet-600 to-purple-800 dark:from-purple-600 dark:to-pink-700"
          trend="+14%"
        />
        <AdminStatCard
          title="System Alerts"
          value={stats?.alerts ?? 0}
          subtext="Critical updates"
          icon={ShieldAlert}
          colorClass="bg-gradient-to-br from-rose-600 to-red-800 dark:from-rose-500 dark:to-orange-600"
          trend="Action"
        />
      </div>

      {/* --- GRID 2: INFRASTRUCTURE & LOGS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Dark Mode Optimized Infrastructure Card */}
        <div className="lg:col-span-2 rounded-[3.5rem] bg-slate-950 p-12 text-white shadow-2xl relative overflow-hidden group border-4 border-slate-900 dark:border-primary/20">
          <div className="relative z-10 flex flex-col justify-between h-full space-y-12">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl group-hover:scale-110 transition-transform">
                    <Server className="h-7 w-7 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 block">Core Infrastructure</span>
                    <h2 className="text-4xl font-black tracking-tighter italic">Systems Optimal</h2>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Load</p>
                    <p className="text-sm font-black text-emerald-400">1.2k req/s</p>
                 </div>
                 <Radio className="h-6 w-6 text-emerald-500 animate-pulse" />
              </div>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { label: "CPU Usage", val: "14%", color: "bg-emerald-500" },
                 { label: "Memory", val: "62%", color: "bg-blue-500" },
                 { label: "Latency", val: "18ms", color: "bg-purple-500" },
                 { label: "Active DB", val: "94/100", color: "bg-amber-500" }
               ].map((item, i) => (
                 <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group/stat">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">{item.label}</p>
                    <p className="text-2xl font-black group-hover:text-emerald-400 transition-colors">{item.val}</p>
                    <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: item.val.includes('%') ? item.val : '94%' }} />
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <Globe className="absolute -right-32 -bottom-32 h-[35rem] w-[35rem] text-white/5 pointer-events-none group-hover:rotate-90 transition-transform duration-[15000ms] ease-linear" />
        </div>

        {/* Security Log Card (Light/Dark Optimized) */}
        <div className="rounded-[3.5rem] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 flex flex-col shadow-sm">
          <div className="space-y-10 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                 <Activity className="h-4 w-4 text-emerald-500" /> Platform Logs
              </h3>
              <div className="flex gap-1">
                 <div className="h-1 w-3 bg-primary rounded-full" />
                 <div className="h-1 w-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
              </div>
            </div>

            <div className="space-y-8">
               <LogItem icon={ShieldCheck} title="Backup Sync" desc="Cloud instance mirror finished" color="text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400" />
               <LogItem icon={Zap} title="Auto-Scale" desc="Spun up 2 new worker nodes" color="text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400" />
               <LogItem icon={ShieldAlert} title="Auth Guard" desc="Blocked 3 suspicious attempts" color="text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400" />
            </div>
          </div>

          <button className="mt-10 w-full py-5 rounded-[1.5rem] bg-slate-950 dark:bg-primary text-[11px] font-black uppercase tracking-[0.3em] text-white hover:opacity-90 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-2">
            Security Overview <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper for Logs
function LogItem({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="flex gap-5 group cursor-pointer">
      <div className={cn("h-12 w-12 shrink-0 rounded-2xl border border-transparent flex items-center justify-center transition-all group-hover:scale-110 shadow-sm", color)}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="w-full">
        <p className="text-sm font-black text-slate-900 dark:text-white">{title}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}