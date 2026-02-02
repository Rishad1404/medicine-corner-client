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
  CheckCircle2, 
  Loader2, 
  ChevronDown,
  User,
  ChevronLeft,
  ChevronRight,
  Settings2
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

export interface Order {
  id: string;
  totalAmount: number;
  status: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  customer?: { name: string; email: string };
}

export function OrderTable({ data }: { data: Order[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setLoadingId(orderId);
    const toastId = toast.loading(`Syncing with database...`);
    try {
      const result = await updateOrderStatusAction(orderId, newStatus);
      if (result.success) {
        toast.success(`Order moved to ${newStatus}`, { id: toastId });
        router.refresh();
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Database connection error", { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ORDER ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs font-bold text-slate-500 uppercase">
          #{row.original.id.slice(-8)}
        </span>
      ),
    },
    {
      header: "CUSTOMER",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-200">
            <User className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 leading-none">
              {row.original.customer?.name || "Guest User"}
            </span>
            <span className="text-[11px] font-medium text-slate-500 mt-1">
              {row.original.customer?.email || "No email provided"}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "REVENUE",
      cell: ({ row }) => (
        <span className="text-sm font-bold text-slate-900">
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
          PLACED: "bg-slate-100 text-slate-700 border-slate-200",
          PROCESSING: "bg-blue-50 text-blue-700 border-blue-200",
          SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200",
          DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
          CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
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
        <span className="text-sm text-slate-600 font-medium">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">UPDATE STATUS</div>,
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
                  className="h-8 px-3 font-semibold border-slate-200 bg-white hover:bg-slate-50 transition-all text-xs"
                >
                  {isUpdating ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Settings2 className="h-3.5 w-3.5 mr-2 text-primary" />}
                  Update
                  <ChevronDown className="h-3 w-3 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[190px] p-1 rounded-lg shadow-lg border-slate-200">
                <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-tight">Database Transition</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "PROCESSING")} className="rounded-md gap-2 py-2 cursor-pointer text-sm font-medium">
                   <Clock className="h-4 w-4 text-blue-500" /> Start Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "SHIPPED")} className="rounded-md gap-2 py-2 cursor-pointer text-sm font-medium">
                   <Truck className="h-4 w-4 text-indigo-500" /> Dispatch Order
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "DELIVERED")} className="rounded-md gap-2 py-2 cursor-pointer text-sm font-medium">
                   <PackageCheck className="h-4 w-4 text-emerald-500" /> Mark Delivered
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "CANCELLED")} className="rounded-md gap-2 py-2 text-rose-600 cursor-pointer text-sm font-medium focus:bg-rose-50">
                   <XCircle className="h-4 w-4" /> Void (Cancel)
                </DropdownMenuItem>
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
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 border-b border-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-11 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/30 transition-colors">
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
                  No orders found in database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-3 font-semibold border-slate-200 bg-white text-xs disabled:opacity-50 shadow-sm" 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-3 font-semibold border-slate-200 bg-white text-xs disabled:opacity-50 shadow-sm" 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}