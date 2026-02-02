"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  CircleDot,
  Calendar,
  ShoppingBag,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { OrderDetailsModal } from "./customer-order-details";

export function CustomerOrderTable({ data }: { data: any[] }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Order ID",
        accessorKey: "id",
        cell: ({ row }) => (
          <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            #{row.original.id.slice(-8)}
          </span>
        ),
      },
      {
        header: "Date",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
            <Calendar className="h-3.5 w-3.5 opacity-50" />
            {new Date(row.original.createdAt).toLocaleDateString()}
          </div>
        ),
      },
      {
        header: "Total Price",
        accessorKey: "totalAmount",
        cell: ({ row }) => (
          <span className="text-sm font-black text-slate-900 dark:text-white">
            ৳{row.original.totalAmount.toLocaleString()}
          </span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <div
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2",
                status === "DELIVERED"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : status === "CANCELLED"
                    ? "bg-rose-50 text-rose-600 border-rose-100"
                    : "bg-blue-50 text-blue-600 border-blue-100",
              )}
            >
              <CircleDot
                className={cn(
                  "h-2.5 w-2.5",
                  status !== "DELIVERED" && "animate-pulse",
                )}
              />
              {status}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: () => (
          <div className="text-right uppercase text-[10px] tracking-widest font-black text-slate-400 pr-4">
            Action
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-end pr-4">
            {/* Passing the current row's order data to the modal */}
            <OrderDetailsModal order={row.original} />
          </div>
        ),
      },
    ],
    [],
  );

  const filteredData = useMemo(() => {
    let result = data;
    if (statusFilter !== "ALL") {
      result = result.filter((o) => o.status === statusFilter);
    }
    return result;
  }, [data, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  });

  return (
    <div className="space-y-6">
      {/* --- Filter Toolbar --- */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by Order ID..."
            className="pl-10 h-11 rounded-2xl border-none bg-slate-50 dark:bg-slate-800 focus-visible:ring-indigo-500/20"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px] h-11 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-[10px] uppercase tracking-wider">
            <Filter className="h-3.5 w-3.5 mr-2 opacity-50" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-2">
            <SelectItem value="ALL">All Orders</SelectItem>
            <SelectItem value="PLACED">Placed</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="SHIPPED">Shipped</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- Table --- */}
      <div className="rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-8 py-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-48 text-center"
                >
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <ShoppingBag className="h-10 w-10" />
                    <p className="text-xs font-black uppercase tracking-widest">
                      No matching purchases
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- Pagination --- */}
      <div className="flex items-center justify-between px-4">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 rounded-xl font-bold text-[10px] uppercase"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 rounded-xl font-bold text-[10px] uppercase"
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
