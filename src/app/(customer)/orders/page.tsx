import { orderService } from "@/app/services/order.service";
import { CustomerOrderTable } from "@/components/modules/customer/customer-order-table";

import { ShoppingBag, CheckCircle2, CreditCard } from "lucide-react";

export default async function CustomerOrdersPage() {
  const { data: orders } = await orderService.getCustomerOrders();
  const validOrders = orders || [];

  // Summary stats for the user
  const totalSpent = validOrders.reduce((acc: number, o: any) => acc + o.totalAmount, 0);
  const activeOrders = validOrders.filter((o: any) => o.status !== "DELIVERED" && o.status !== "CANCELLED").length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Purchase History
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Manage your orders, track shipments, and download invoices.
          </p>
        </div>

        {/* User Stats Bar */}
        <div className="flex items-center gap-6 px-6 py-4 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex flex-col px-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Spent</span>
              <span className="text-lg font-black text-emerald-600">৳{totalSpent.toLocaleString()}</span>
           </div>
           <div className="h-8 w-[2px] bg-slate-100 dark:bg-slate-800" />
           <div className="flex flex-col px-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">In Progress</span>
              <span className="text-lg font-black text-amber-500">{activeOrders} Orders</span>
           </div>
        </div>
      </div>

      {/* --- TABLE MODULE --- */}
      <CustomerOrderTable data={validOrders} />
    </div>
  );
}