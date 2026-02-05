"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CustomerOrderTable } from "@/components/modules/customer/customer-order-table";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Package, 
  Clock, 
  TrendingUp, 
  Sparkles,
  ShoppingBag,
  Loader2,
  ArrowRight
} from "lucide-react";
import { getCustomerDashboardData } from "@/app/services/dashboard.actions";
export default function CustomerDashboard() {
  const session = authClient.useSession();
  const router = useRouter();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session.isPending === false && !session.data) {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const data = await getCustomerDashboardData();
        setOrders(data || []);
      } catch (error) {
        console.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [session, router]);

  if (session.isPending || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-pink-600" />
      </div>
    );
  }

  const user = session.data?.user;
  const validOrders = orders;
  
  // 1. SLICE DATA: Only take the first 5 for the table view
  const recentOrders = validOrders.slice(0, 5);

  // 2. KEEP FULL DATA FOR STATS
  const totalSpent = validOrders.reduce((acc: number, o: any) => acc + o.totalAmount, 0);
  const completedOrders = validOrders.filter((o: any) => o.status === "DELIVERED").length;
  const activeOrders = validOrders.filter((o: any) => 
    o.status !== "DELIVERED" && o.status !== "CANCELLED"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-blue-900 dark:bg-slate-900 p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20 mx-1">
         <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
         
         <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-pink-300 backdrop-blur-md">
               <Sparkles className="h-3 w-3" /> 
               Overview
            </div>
            
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-200">{user?.name?.split(' ')[0] || "Customer"}</span>
              </h1>
              <p className="text-blue-200 dark:text-slate-400 max-w-lg text-base md:text-lg font-medium leading-relaxed">
                Welcome to your personal health hub. Track your ongoing orders and review your purchase history.
              </p>
            </div>
         </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Spent */}
        <div className="group p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:shadow-pink-500/5 hover:-translate-y-1 transition-all duration-300">
           <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                 <CreditCard className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                Lifetime
              </span>
           </div>
           <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Total Spent</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                ৳{totalSpent.toLocaleString()}
              </h3>
           </div>
        </div>

        {/* Active Orders */}
        <div className="group p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:shadow-pink-500/5 hover:-translate-y-1 transition-all duration-300">
           <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                 <Clock className="h-6 w-6" />
              </div>
              {activeOrders > 0 && (
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}
           </div>
           <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">In Progress</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {activeOrders} <span className="text-base font-bold text-slate-400">Orders</span>
              </h3>
           </div>
        </div>

        {/* Completed */}
        <div className="group p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:shadow-pink-500/5 hover:-translate-y-1 transition-all duration-300">
           <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                 <Package className="h-6 w-6" />
              </div>
           </div>
           <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Delivered</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {completedOrders} <span className="text-base font-bold text-slate-400">Orders</span>
              </h3>
           </div>
        </div>
      </div>

      {/* --- RECENT ACTIVITY TABLE --- */}
      <div className="space-y-6 pt-4">
         <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-blue-900 dark:text-white flex items-center gap-3">
               <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-900/20">
                 <TrendingUp className="h-5 w-5 text-pink-600 dark:text-pink-400" />
               </div>
               Recent Activity
            </h2>

            {/* 3. VIEW ALL BUTTON */}
            <Button variant="ghost" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 font-bold text-xs uppercase tracking-wide gap-1" asChild>
                <Link href="/customer/orders">
                    View All <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </Button>
         </div>
         
         <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-1">
            {recentOrders.length > 0 ? (
                // 4. Passing only the slice
                <CustomerOrderTable data={recentOrders} />
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-full mb-4">
                        <ShoppingBag className="h-10 w-10 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">No orders yet</h3>
                    <p className="text-slate-500 max-w-xs mx-auto text-sm mt-2">
                        Looks like you haven't placed any orders yet. Visit the shop to get started.
                    </p>
                </div>
            )}
         </div>
      </div>

    </div>
  );
}