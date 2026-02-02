"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Eye, Printer, Download, Stethoscope, 
  CreditCard, ArrowRight, Package, CheckCircle2,
  ReceiptText, Info
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function OrderDetailsModal({ order }: { order: any }) {
  const isPayable = order.status === "PLACED" || order.status === "PENDING";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 gap-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border-2 hover:bg-slate-950 hover:text-white transition-all shadow-sm"
        >
          <Eye className="h-4 w-4" /> View Invoice
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-[95vw] md:max-w-5xl rounded-2xl border-none p-0 overflow-hidden shadow-2xl bg-white dark:bg-slate-950">
        
        {/* --- BRAND HEADER --- */}
        <div className="bg-slate-950 px-10 py-6 flex flex-wrap justify-between items-center text-white border-b border-indigo-500/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
                <span className="font-black uppercase tracking-tighter text-xl leading-none">Medicine Corner</span>
                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">Digital Health Network</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-4">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Billing System</span>
                <span className="text-xs font-bold text-emerald-500">v2.0 Encrypted</span>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" className="h-9 w-9 rounded-lg bg-slate-800 text-slate-300 hover:text-white"><Printer className="h-4 w-4" /></Button>
              <Button variant="secondary" size="icon" className="h-9 w-9 rounded-lg bg-slate-800 text-slate-300 hover:text-white"><Download className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[80vh]">
          <div className="p-8 md:p-12 space-y-10">
            
            {/* --- INVOICE TOP DATA --- */}
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="grid grid-cols-2 gap-12 md:gap-16">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Billed To</span>
                  <div className="space-y-1">
                    <p className="font-black text-lg text-slate-900 dark:text-white capitalize">{order.customer?.name}</p>
                    <p className="text-sm font-medium text-slate-500">{order.customer?.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Order Identity</span>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase">#{order.id.slice(-12)}</p>
                    <p className="text-sm font-bold text-slate-500">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                  </div>
                </div>
              </div>

              <div className="md:text-right space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Pipeline Status</span>
                <div className={cn(
                  "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border-2",
                  order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                )}>
                  <CheckCircle2 className="h-3 w-3 mr-2" />
                  {order.status}
                </div>
              </div>
            </div>

            {/* --- PRODUCTS TABLE --- */}
            <div className="w-full border-2 border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Medicine Description</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Qty</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Unit Rate</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {order.items.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400">
                            <Package className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white capitalize">{item.medicine.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center text-sm font-black text-slate-600">{item.quantity}</td>
                      <td className="px-6 py-5 text-right text-sm font-medium text-slate-500">৳{item.price.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right text-sm font-black text-slate-900 dark:text-white">৳{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- CALCULATIONS & REDIRECT --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
              <div className="flex items-start gap-4 p-5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 max-w-sm">
                  <Info className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-indigo-700 dark:text-indigo-400 leading-relaxed">
                      Please note: Medicines once sold are only returnable under specific pharmacy conditions. Ensure the Reference ID is visible during any customer support interaction.
                  </p>
              </div>
              
              <div className="w-full lg:w-96 space-y-6">
                <div className="space-y-3 px-2">
                  <div className="flex justify-between items-center text-xs font-black uppercase text-slate-400 tracking-widest">
                    <span>Grand Total</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">৳{order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                
                {isPayable ? (
                  <Link href={`/checkout/${order.id}`} className="block">
                    <Button className="w-full h-16 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-500/30 group transition-all active:scale-[0.98]">
                      <CreditCard className="mr-3 h-5 w-5" /> 
                      Complete Checkout
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-3 p-5 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-100 dark:border-emerald-900 rounded-xl text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest">
                    <CheckCircle2 className="h-5 w-5" /> All Payments Secured
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* --- BOTTOM BAR --- */}
        <div className="bg-slate-50 dark:bg-slate-900/50 px-10 py-4 text-center border-t-2 border-slate-100 dark:border-slate-800">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Official Transaction Registry • 2026 Medicine Corner</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}