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
  ShoppingCart, 
  Eye, 
  Mail, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
  CalendarDays,
  Search,
  Filter,
  CircleDot,
  PackageCheck,
  ShieldAlert,
  Wallet,
  Pill,
  Settings2
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateOrderStatusAction } from "@/actions/orders.actions";

export interface OrderData {
  id: string;
  totalAmount: number;
  status: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    quantity: number;
    medicine: {
      name: string;
    };
  }[];
}

const ORDER_STATUSES = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export function OrderManagementTable({ data }: { data: OrderData[] }) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredData = useMemo(() => {
    return data.filter((order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.customer?.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const handleUpdateStatus = async (orderId: string, nextStatus: OrderData["status"]) => {
    setProcessingId(orderId);
    const toastId = toast.loading(`Updating fulfillment to ${nextStatus}...`);

    try {
      const result = await updateOrderStatusAction(orderId, nextStatus);
      if (result.success) {
        toast.success(`Order set to ${nextStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(result.message || "Sync failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Operation failed", { id: toastId });
    } finally {
      setProcessingId(null);
    }
  };

  const columns = useMemo<ColumnDef<OrderData>[]>(() => [
    {
      header: "Order Reference",
      cell: ({ row }) => (
        <div className="flex items-center gap-4 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-amber-500 border border-slate-200/60 dark:border-slate-700/50 shadow-sm transition-transform hover:scale-105">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
              #{row.original.id.slice(-8)}
            </span>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <CalendarDays className="h-3 w-3 opacity-70" />
              <span>{new Date(row.original.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Customer Identity",
      cell: ({ row }) => (
        <div className="flex flex-col space-y-0.5">
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100 capitalize">
            {row.original.customer?.name || "Unregistered Guest"}
          </span>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <Mail className="h-3 w-3 opacity-70" />
            <span>{row.original.customer?.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Package Size",
      cell: ({ row }) => {
        const itemCount = row.original.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
        return (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Pill className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
            </div>
            <span className="text-xs font-black text-slate-600 dark:text-slate-400">
              {itemCount} Items
            </span>
          </div>
        );
      }
    },
    {
      header: "Total Revenue",
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Wallet className="h-4 w-4" />
          </div>
          <span className="text-sm font-black text-slate-900 dark:text-white">
            ৳{row.original.totalAmount.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      header: "Fulfillment",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant="outline" className={cn(
            "font-black text-[10px] px-3 py-1 tracking-widest uppercase border-2 shadow-none rounded-xl",
            status === "DELIVERED" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" 
            : status === "PLACED" ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
            : status === "PROCESSING" ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
            : status === "SHIPPED" ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20"
            : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
          )}>
            <CircleDot className={cn("h-3 w-3 mr-1.5", status !== "DELIVERED" && status !== "CANCELLED" && "animate-pulse")} />
            {status}
          </Badge>
        );
      }
    },
    {
      id: "actions",
      header: () => <div className="text-right pr-6 uppercase text-[10px] tracking-[0.2em] font-black text-slate-400 dark:text-slate-500">Security</div>,
      cell: ({ row }) => {
        const order = row.original;
        const isBusy = processingId === order.id;

        return (
          <div className="flex justify-end gap-3 pr-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={isBusy}
                  variant="outline"
                  className="h-9 px-4 font-bold text-[11px] uppercase border-2 border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all active:scale-95"
                >
                  {isBusy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Settings2 className="h-4 w-4 mr-2" />}
                  Change Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-2xl border-2 dark:border-slate-800 p-1.5 shadow-xl bg-white dark:bg-slate-900">
                <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-3 py-2">Workflow</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-slate-800" />
                {ORDER_STATUSES.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleUpdateStatus(order.id, status)}
                    disabled={order.status === status}
                    className={cn(
                      "rounded-xl font-bold text-xs uppercase px-3 py-2 cursor-pointer transition-colors dark:text-slate-300 dark:focus:bg-slate-800",
                      order.status === status ? "bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-600" : "hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                    )}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ], [processingId]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search Order Reference or Identity..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl focus-visible:ring-indigo-500/30 transition-all font-medium dark:text-slate-200 dark:placeholder:text-slate-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] h-11 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-xs uppercase tracking-wider dark:text-slate-300 dark:bg-slate-900">
              <Filter className="h-3 w-3 mr-2 opacity-50" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-2 dark:border-slate-800 dark:bg-slate-900">
              <SelectItem value="ALL">All Entries</SelectItem>
              {ORDER_STATUSES.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40 border-b-2 dark:border-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="group border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-all duration-300">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-8 py-5 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-30 text-slate-500 dark:text-slate-400">
                    <ShieldAlert className="h-12 w-12" />
                    <p className="text-sm font-black uppercase tracking-widest">Registry is currently empty</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
           <PackageCheck className="h-3.5 w-3.5" /> Total Records: {filteredData.length}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="dark:text-slate-400 dark:hover:text-slate-200" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft className="h-4 w-4" /></Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-black">{table.getState().pagination.pageIndex + 1}</div>
          <Button variant="ghost" className="dark:text-slate-400 dark:hover:text-slate-200" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}