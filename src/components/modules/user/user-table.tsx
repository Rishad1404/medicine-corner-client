"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import { 
  User, 
  Trash2, 
  Ban, 
  Unlock, 
  Mail, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Fingerprint,
  CalendarDays,
  ShieldAlert,
  Search,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUserAction, updateUserStatusAction } from "@/actions/user.actions";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
}

export function UserManagementTable({ data }: { data: UserData[] }) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredData = useMemo(() => {
    return data.filter((user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [data, searchTerm, roleFilter, statusFilter]);

  const handleUpdateStatus = async (userId: string, currentStatus: string) => {
    setProcessingId(userId);
    const nextStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const toastId = toast.loading(`Syncing ${nextStatus.toLowerCase()} status...`);

    try {
      const result = await updateUserStatusAction(userId, nextStatus);
      if (result.success) {
        toast.success(`Account status updated`, { id: toastId });
        router.refresh();
      } else {
        toast.error(result.message || "Update failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Operation failed", { id: toastId });
    } finally {
      setProcessingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    const toastId = toast.loading("Deleting user record...");
    try {
      const result = await deleteUserAction(userToDelete);
      if (result.success) {
        toast.success("User permanently removed", { id: toastId });
        setUserToDelete(null); 
        router.refresh(); 
      } else {
        toast.error(result.message || "Delete failed", { id: toastId });
      }
    } catch (err: any) {
      toast.error("An error occurred", { id: toastId });
    }
  };

  const columns: ColumnDef<UserData>[] = [
    {
      header: "User Identity",
      cell: ({ row }) => (
        <div className="flex items-center gap-4 text-left">
          <div className="relative group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-200/60 dark:border-slate-700/50 shadow-sm transition-transform group-hover:scale-105">
              <User className="h-5 w-5" />
            </div>
            {row.original.status === "ACTIVE" && (
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 capitalize">
              {row.original.name}
            </span>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
              <Mail className="h-3 w-3 opacity-70" />
              <span>{row.original.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
        accessorKey: "createdAt",
        header: "Join Date",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
             <CalendarDays className="h-3.5 w-3.5 opacity-50" />
             {new Date(row.original.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )
    },
    {
      accessorKey: "role",
      header: "Privilege",
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <Badge variant="outline" className={cn(
            "font-black text-[10px] px-3 py-1 tracking-widest uppercase border-2 shadow-none",
            role === "ADMIN" ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400" 
            : role === "SELLER" ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400"
            : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400"
          )}>
            {role}
          </Badge>
        );
      }
    },
    {
      accessorKey: "status",
      header: "Account",
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
           <div className={cn("h-2 w-2 rounded-full", row.original.status === "BLOCKED" ? "bg-rose-500" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]")} />
           <span className={cn(
             "text-[11px] font-bold uppercase tracking-tight",
             row.original.status === "BLOCKED" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
           )}>
             {row.original.status}
           </span>
        </div>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-right pr-6 uppercase text-[10px] tracking-[0.2em] font-black text-slate-400">Security</div>,
      cell: ({ row }) => {
        const user = row.original;
        const isBusy = processingId === user.id;

        if (user.role === "ADMIN") return null;

        return (
          <div className="flex justify-end gap-3 pr-4">
            <Button
              onClick={() => handleUpdateStatus(user.id, user.status)}
              disabled={isBusy}
              variant="outline"
              className={cn(
                "h-9 px-4 font-bold text-[11px] uppercase border-2 transition-all active:scale-95",
                user.status === "BLOCKED" 
                  ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700"
              )}
            >
              {isBusy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : user.status === "BLOCKED" ? <Unlock className="h-4 w-4 mr-2" /> : <Ban className="h-4 w-4 mr-2" />}
              {user.status === "BLOCKED" ? "Restore" : "Restrict"}
            </Button>

            <Button
              onClick={() => setUserToDelete(user.id)}
              disabled={isBusy}
              variant="outline"
              className="h-9 w-9 p-0 border-2 border-slate-200 text-rose-500 hover:bg-rose-50 dark:border-slate-700 dark:hover:bg-rose-500/10 transition-all"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } }
  });

  return (
    <div className="space-y-6">
      {/* --- Filter Toolbar --- */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-[350px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl focus-visible:ring-indigo-500/30 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[140px] h-11 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-xs uppercase tracking-wider">
              <Filter className="h-3 w-3 mr-2 opacity-50" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-2">
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="SELLER">Seller</SelectItem>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-11 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-xs uppercase tracking-wider">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-2">
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* --- Table Body --- */}
      <div className="rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40 border-b-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.1em] text-slate-400">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="group border-b last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-all duration-300">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-8 py-5 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-30 text-slate-500">
                    <ShieldAlert className="h-12 w-12" />
                    <p className="text-sm font-black uppercase tracking-widest">No matching users found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- Confirm Delete Modal --- */}
      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent className="rounded-[2.5rem] border-none shadow-2xl dark:bg-slate-900">
          <AlertDialogHeader className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-rose-500" />
            </div>
            <div className="text-center space-y-2">
              <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Confirm Removal</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 font-medium px-4">
                This will permanently de-authorize this user and purge all session data.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3 mt-6">
            <AlertDialogCancel className="flex-1 rounded-2xl border-2 font-bold hover:bg-slate-50">Abort</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="flex-1 rounded-2xl bg-rose-600 hover:bg-rose-700 font-bold shadow-lg shadow-rose-500/20">Purge Record</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* --- Pagination Footer --- */}
      <div className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
           <ShieldCheck className="h-3.5 w-3.5" /> Registry Entries: {filteredData.length}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft className="h-4 w-4" /></Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-xs font-black">{table.getState().pagination.pageIndex + 1}</div>
          <Button variant="ghost" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}