import { Users, ShieldCheck, Copyright } from "lucide-react";
import { userService } from "@/app/services/user.service";
import { UserManagementTable } from "@/components/modules/user/user-table";

export default async function ManageUsersPage() {
  // 1. Fetch data directly on the server
  const response = await userService.getAllUsers();
  const users = response?.data || [];

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 p-6 lg:p-10 flex flex-col">
      <div className="mx-auto max-w-[1600px] w-full space-y-10 flex-grow">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
                <Users className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                User Management
              </h1>
            </div>
            <p className="font-medium text-slate-500 dark:text-slate-400 max-w-2xl">
              Monitor platform members, manage access levels, and enforce security protocols across all accounts in real-time.
            </p>
          </div>

          {/* Quick Stats Overlay */}
          <div className="hidden lg:flex items-center gap-8 px-8 py-5 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Members</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">{users.length}</span>
            </div>
            <div className="h-10 w-[2px] bg-slate-100 dark:bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Environment</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">Live & Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        {/* Note: Search & Filters are now inside this component */}
        <UserManagementTable data={users} />
      </div>

      {/* --- FOOTER SECTION --- */}
      <footer className="mx-auto max-w-[1600px] w-full mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 pb-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/5 rounded-full border border-emerald-100 dark:border-emerald-500/10">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-500 uppercase tracking-[0.2em]">
            Verified Database Connection: Secure SSL
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
          <Copyright className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">
            {new Date().getFullYear()} All rights reserved to{" "}
            <span className="text-slate-900 dark:text-white font-black">Medicine Corner</span>
          </span>
        </div>
      </footer>
    </div>
  );
}