"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  MoreHorizontal,
  Search,
  Eye,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// --- 1. TYPES ---
export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  stock: number;
  expiryDate: string;
  image?: string;
  category?: { name: string };
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface MedicineTableProps {
  data: Medicine[];
  meta: Meta;
}

// --- 2. HELPER COMPONENTS ---
function StatusBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
        Out of Stock
      </Badge>
    );
  }
  if (stock <= 5) {
    return (
      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
        Low Stock ({stock})
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
      In Stock ({stock})
    </Badge>
  );
}

// --- 3. MAIN COMPONENT ---
export function MedicineTable({ data, meta }: MedicineTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  // --- ACTIONS ---
  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== "page") params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    const toastId = toast.loading("Deleting item...");
    try {
      const res = await fetch(`/api/medicines/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast.success("Item deleted", { id: toastId });
      router.refresh();
    } catch (err) {
      toast.error("Could not delete item", { id: toastId });
    }
  };

  // --- COLUMNS DEFINITION ---
  const columns: ColumnDef<Medicine>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Product Details",
      cell: ({ row }) => (
        <div className="flex flex-col py-1">
          <span className="font-semibold text-sm text-foreground">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">{row.original.manufacturer}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
         <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10">
            {row.original.category?.name || "N/A"}
         </span>
      ),
    },
    {
      accessorKey: "stock",
      header: "Status",
      cell: ({ row }) => <StatusBadge stock={row.getValue("stock")} />,
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium font-mono text-sm">
           ৳{Number(row.getValue("price")).toLocaleString()}
        </div>
      ),
    },
    {
      id: "actions",
      // 👇 ADDED HEADER HERE
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/seller/medicines/${row.original.id}`} className="cursor-pointer flex items-center">
                  <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" /> View Details
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/dashboard/seller/medicines/${row.original.id}/edit`} className="cursor-pointer flex items-center">
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" /> Edit Info
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer flex items-center"
                onClick={() => handleDelete(row.original.id)}
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  // --- TABLE INSTANCE ---
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta.totalPage,
    state: {
      pagination: {
        pageIndex: meta.page - 1,
        pageSize: meta.limit,
      },
      sorting,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  });

  const pageNumbers = Array.from({ length: meta.totalPage }, (_, i) => i + 1);

  const currentSort = searchParams.get("sortBy") 
    ? `${searchParams.get("sortBy")}-${searchParams.get("sortOrder")}` 
    : "createdAt-desc";

  return (
    <div className="space-y-4">
      
      {/* --- TOOLBAR --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card rounded-lg p-4 border shadow-sm">
        
        {/* Left: Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input
               placeholder="Filter medicines..."
               defaultValue={searchParams.get("search") || ""}
               onChange={(e) => updateUrl("search", e.target.value)}
               className="pl-9 h-9 bg-background focus-visible:ring-1"
             />
          </div>

          <Select
             value={currentSort}
             onValueChange={(value) => handleSort(value)}
           >
             <SelectTrigger className="w-full sm:w-[180px] h-9">
               <Filter className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
               <SelectValue placeholder="Sort by" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="createdAt-desc">Newest Added</SelectItem>
               <SelectItem value="price-asc">Price: Low to High</SelectItem>
               <SelectItem value="price-desc">Price: High to Low</SelectItem>
               <SelectItem value="stock-asc">Stock: Low to High</SelectItem>
             </SelectContent>
           </Select>
        </div>
        
        {/* Right: Rows & Selection */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Rows:</span>
            <Select
              value={String(meta.limit)}
              onValueChange={(value) => updateUrl("limit", value)}
            >
              <SelectTrigger className="h-9 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {Object.keys(rowSelection).length > 0 && (
             <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                 {Object.keys(rowSelection).length} selected
             </div>
          )}
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/40 hover:bg-muted/40">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-11 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/30 data-[state=selected]:bg-muted/50 transition-colors border-b last:border-0 border-border/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-[300px] text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Search className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                    <p className="text-base font-medium text-muted-foreground">No medicines found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- PAGINATION --- */}
      <div className="flex items-center justify-between border-t p-4 bg-card rounded-b-lg">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{(meta.page - 1) * meta.limit + 1}</span> to{" "}
          <span className="font-medium text-foreground">{Math.min(meta.page * meta.limit, meta.total)}</span> of{" "}
          <span className="font-medium text-foreground">{meta.total}</span> entries
        </p>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateUrl("page", String(meta.page - 1))}
            disabled={meta.page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {pageNumbers.slice(Math.max(0, meta.page - 3), meta.page + 2).map((page) => (
            <Button
              key={page}
              variant={meta.page === page ? "default" : "outline"}
              size="sm"
              className={cn("h-8 w-8 p-0", meta.page === page ? "pointer-events-none" : "")}
              onClick={() => updateUrl("page", String(page))}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateUrl("page", String(meta.page + 1))}
            disabled={meta.page >= meta.totalPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}