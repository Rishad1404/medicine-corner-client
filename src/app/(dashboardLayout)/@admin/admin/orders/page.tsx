import { orderService } from "@/app/services/order.service";
import { OrderManagementTable } from "@/components/modules/admin/order-table";
import { 
  ShoppingCart, 
  PackageCheck, 
  CheckCircle2, 
  Copyright, 
  TrendingUp 
} from "lucide-react";

export default async function AllOrdersPage() {
  const response = await orderService.getAllOrders();
  const orders = response?.data || [];


  const deliveredOrders = orders.filter(
    (o: any) => o.status === "DELIVERED"
  ).length;
  
  const totalRevenue = orders.reduce(
    (acc: number, o: any) => acc + o.totalAmount, 
    0
  );

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 p-6 lg:p-10 flex flex-col">
      <div className="mx-auto max-w-[1600px] w-full space-y-10 flex-grow">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-xl shadow-amber-500/20">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">
                Order Management
              </h1>
            </div>
            <p className="font-medium text-slate-500 dark:text-slate-400">
              Oversee the complete fulfillment pipeline and customer transactions.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-8 px-8 py-5 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
             <div className="flex flex-col items-center min-w-[100px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
                </div>
                <span className="text-xl font-black text-emerald-600">৳{totalRevenue.toLocaleString()}</span>
             </div>
             
             <div className="h-10 w-[2px] bg-slate-100 dark:bg-slate-800" />
             
             <div className="flex flex-col items-center text-center min-w-[100px]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Delivered</span>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 fill-amber-50" />
                    <span className="text-xl font-black text-slate-900 dark:text-white">{deliveredOrders}</span>
                </div>
             </div>
          </div>
        </div>

        {/* --- TABLE --- */}
        {/* Passing the orders to the high-performance table component */}
        <OrderManagementTable data={orders} />
      </div>

      {/* --- FOOTER --- */}
      <footer className="mx-auto max-w-[1600px] w-full mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 pb-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/5 rounded-full border border-blue-100 dark:border-blue-500/10 text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-400">
          <PackageCheck className="h-4 w-4" /> 
          Fulfillment System Active: {orders.length} Records Logged
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
           <Copyright className="h-4 w-4" /> {new Date().getFullYear()} Medicine Corner
        </div>
      </footer>
    </div>
  );
}