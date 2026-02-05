"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import { 
  PackageCheck, 
  Truck, 
  XCircle, 
  Clock, 
  Loader2, 
  User,
  Settings2,
  Mail
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { updateOrderStatusAction } from "@/actions/orders.actions";

// 1. UPDATED INTERFACE to match your working Admin table
export interface Order {
  id: string;
  totalAmount: number;
  status: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  customer?: { 
    name: string; 
    email: string;
    image?: string | null; 
  };
  items?: any[];
}

export function OrderTable({ data }: { data: Order[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setLoadingId(orderId);
    const toastId = toast.loading(`Updating status...`);
    try {
      const result = await updateOrderStatusAction(orderId, newStatus);
      if (result.success) {
        toast.success(`Order moved to ${newStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Connection error", { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ORDER ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
          #{row.original.id.slice(-8)}
        </span>
      ),
    },
    {
      header: "CUSTOMER",
      cell: ({ row }) => {

        const customer = row.original.customer;
        
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 overflow-hidden">
               {customer?.image ? (
                  <img src={customer.image} alt={customer.name} className="h-full w-full object-cover" />
               ) : (
                  <User className="h-4.5 w-4.5" />
               )}
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                {customer?.name || "Guest User"}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <Mail className="h-3 w-3 text-slate-400" />
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                   {customer?.email || "No email"}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: "REVENUE",
      cell: ({ row }) => (
        <span className="text-sm font-bold text-slate-900 dark:text-white">
          ৳{(row.original.totalAmount ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.original.status;
        const variants: Record<string, string> = {
          PLACED: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
          PROCESSING: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
          SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
          DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
          CANCELLED: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
        };
        return (
          <Badge variant="outline" className={cn("px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-wider", variants[status])}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "DATE",
      cell: ({ row }) => (
        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">UPDATE</div>,
      cell: ({ row }) => {
        const order = row.original;
        const isUpdating = loadingId === order.id;

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={isUpdating} 
                  className="h-8 px-3 font-semibold border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs dark:text-slate-300"
                >
                  {isUpdating ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Settings2 className="h-3.5 w-3.5 mr-2 text-primary" />}
                  Update
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[190px] rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 uppercase">Change Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "PROCESSING")} className="cursor-pointer dark:focus:bg-slate-800"><Clock className="h-4 w-4 text-blue-500 mr-2" /> Processing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "SHIPPED")} className="cursor-pointer dark:focus:bg-slate-800"><Truck className="h-4 w-4 text-indigo-500 mr-2" /> Shipped</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "DELIVERED")} className="cursor-pointer dark:focus:bg-slate-800"><PackageCheck className="h-4 w-4 text-emerald-500 mr-2" /> Delivered</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "CANCELLED")} className="text-rose-600 dark:text-rose-400 cursor-pointer dark:focus:bg-rose-900/10"><XCircle className="h-4 w-4 mr-2" /> Cancel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } }
  });

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-11 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/30 dark:hover:bg-slate-800/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-slate-400 text-sm font-medium">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 border-slate-200 dark:border-slate-800 dark:text-slate-300" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
          <Button variant="outline" size="sm" className="h-8 border-slate-200 dark:border-slate-800 dark:text-slate-300" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}