// src/app/admin/categories/page.tsx
import { categoryService } from "@/app/services/category.service";
import { CategoryManagementTable } from "@/components/modules/admin/category-table";
import { CategoryFormModal } from "@/components/modules/admin/create-category-modal";
import { LayoutGrid, ShieldCheck, Copyright, Database } from "lucide-react";

export default async function ManageCategoriesPage() {
  // 1. Fetch live data - Destructure 'data' from your service's return object
  const { data: categories } = await categoryService.getCategories();

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 p-6 lg:p-10 flex flex-col">
      <div className="mx-auto max-w-[1600px] w-full space-y-10 flex-grow">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Inventory Categories
              </h1>
            </div>
            <p className="font-medium text-slate-500 dark:text-slate-400 max-w-2xl">
              Classify medical inventory into logical groups to optimize store navigation and streamline customer experience.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-8 px-8 py-5 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Groups</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">{categories?.data.length || 0}</span>
            </div>
            <div className="h-10 w-[2px] bg-slate-100 dark:bg-slate-800" />
            <div className="flex flex-col text-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">Live Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- ACTIONS BAR --- */}
        <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Database className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Management Mode</span>
               <span className="text-sm font-bold text-slate-900 dark:text-white">Active Directory</span>
            </div>
          </div>
          <CategoryFormModal mode="create" />
        </div>


        <CategoryManagementTable data={categories.data || []} />
      </div>

      {/* --- FOOTER SECTION --- */}
      <footer className="mx-auto max-w-[1600px] w-full mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 pb-10">
        <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-50 dark:bg-emerald-500/5 rounded-full border border-emerald-100 dark:border-emerald-500/10">
          <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
          <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-500 uppercase tracking-[0.25em]">
            Verified Registry: {categories?.length || 0} Nodes
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Copyright className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">
            {new Date().getFullYear()} Medicine Corner
          </span>
        </div>
      </footer>
    </div>
  );
}