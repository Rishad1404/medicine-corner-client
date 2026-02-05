"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel, 
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
  ArrowUpDown, // Icon for sortable headers
} from "lucide-react";
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
import { MedicineDetailsModal } from "./medicine-details-modal";
import { deleteMedicine } from "@/actions/medicine.actions"; 
import { EditMedicineModal } from "./edit-medicine-form";

// --- TYPES ---
export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  stock: number;
  expiryDate: string;
  image?: string;
  description?: string;
  categoryId?: string; 
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

function StatusBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <Badge variant="outline" className="border-red-200 dark:border-red-800 bg-red-500/10 text-red-700 dark:text-red-400">Out of Stock</Badge>;
  if (stock <= 5) return <Badge variant="outline" className="border-amber-200 dark:border-amber-800 bg-amber-500/10 text-amber-700 dark:text-amber-400">Low Stock</Badge>;
  return <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">In Stock ({stock})</Badge>;
}

export function MedicineTable({ data, meta }: MedicineTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Local State for Client-Side features
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]); // Sort state
  const [globalFilter, setGlobalFilter] = useState(""); // Search state

  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null);

  // Helper for Server-Side Pagination only
  const updatePage = (newPage: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`${pathname}?${params.toString()}`);
  };

  const confirmDelete = async () => {
    if (!medicineToDelete) return;
    const toastId = toast.loading("Deleting item...");
    try {
      const result = await deleteMedicine(medicineToDelete);
      if (!result.success) throw new Error(result.message);
      toast.success(result.message, { id: toastId });
      setMedicineToDelete(null); 
      router.refresh(); 
    } catch (err: any) {
      toast.error(err.message || "Could not delete item", { id: toastId });
    }
  };

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
    },
    {
      accessorKey: "name",
      // Sortable Header
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Details
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
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
      // Custom filter function if needed, but default global filter works on string values
      cell: ({ row }) => (
         <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted/50 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10">
            {row.original.category?.name || "N/A"}
         </span>
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => <StatusBadge stock={row.getValue("stock")} />,
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div className="text-right">
             <Button
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Price
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </Button>
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="text-right font-medium font-mono text-sm">
           ৳{Number(row.getValue("price")).toLocaleString()}
        </div>
      ),
    },
    {
      id: "actions",
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
              <DropdownMenuItem onClick={() => { setSelectedMedicine(row.original); setIsViewOpen(true); }} className="cursor-pointer">
                 <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSelectedMedicine(row.original); setIsEditOpen(true); }} className="cursor-pointer">
                  <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" /> Edit Info
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setMedicineToDelete(row.original.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10 cursor-pointer">
                <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Client-Side Sorting
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    // Client-Side Filtering
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString", // Case-insensitive string search
    state: {
      pagination: { pageIndex: meta.page - 1, pageSize: meta.limit },
      sorting,
      globalFilter,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    manualPagination: true, // We tell table we handle page count manually, but sort/filter happens on current data
    pageCount: meta.totalPage,
  });

  const pageNumbers = Array.from({ length: meta.totalPage }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* TOOLBAR: 
        Left: Sort Dropdown (Optional, since headers are clickable now)
        Right: Search Input (Moved here as requested)
      */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-1 gap-4">
        
        {/* Left: Sort Selector (Manual control if user prefers dropdown over headers) */}
        <div className="flex items-center gap-2">
             <Select 
                value={sorting[0]?.id ? `${sorting[0].id}-${sorting[0].desc ? 'desc' : 'asc'}` : ""} 
                onValueChange={(val) => {
                    const [id, dir] = val.split('-');
                    setSorting([{ id, desc: dir === 'desc' }]);
                }}
             >
              <SelectTrigger className="w-[180px] h-9 bg-background">
                <SelectValue placeholder="Sort By..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low - High</SelectItem>
                <SelectItem value="price-desc">Price: High - Low</SelectItem>
                <SelectItem value="name-asc">Name: A - Z</SelectItem>
                <SelectItem value="stock-asc">Stock: Low - High</SelectItem>
              </SelectContent>
            </Select>
            {/* Clear Sort Button */}
            {sorting.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setSorting([])} className="h-9 text-xs">
                    Reset
                </Button>
            )}
        </div>

        {/* Right: Search Filter & Selection Count */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
             {Object.keys(rowSelection).length > 0 && (
                <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded whitespace-nowrap">
                    {Object.keys(rowSelection).length} selected
                </div>
             )}
             
             <div className="relative w-full sm:w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search visible items..." 
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-9 h-9 bg-background focus-visible:ring-1" 
                />
             </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-muted/30 data-[state=selected]:bg-muted/50 transition-colors border-b last:border-0 border-border/50">
                  {row.getVisibleCells().map((cell) => (<TableCell key={cell.id} className="p-4 align-middle">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>))}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-[300px] text-center"><div className="flex flex-col items-center justify-center space-y-2"><div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center"><Search className="h-5 w-5 text-muted-foreground/50" /></div><p className="text-base font-medium text-muted-foreground">No medicines found</p></div></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination (Server Side) */}
      <div className="flex items-center justify-between p-4">
        <p className="text-sm text-muted-foreground">
            Page <span className="font-medium text-foreground">{meta.page}</span> of <span className="font-medium text-foreground">{meta.totalPage}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updatePage(String(meta.page - 1))} disabled={meta.page <= 1}><ChevronLeft className="h-4 w-4" /></Button>
          {pageNumbers.slice(Math.max(0, meta.page - 3), meta.page + 2).map((page) => (
             <Button key={page} variant={meta.page === page ? "default" : "outline"} size="sm" className={cn("h-8 w-8 p-0", meta.page === page ? "pointer-events-none" : "")} onClick={() => updatePage(String(page))}>{page}</Button>
          ))}
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updatePage(String(meta.page + 1))} disabled={meta.page >= meta.totalPage}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Modals */}
      <MedicineDetailsModal medicine={selectedMedicine} open={isViewOpen} onOpenChange={setIsViewOpen} />
      <EditMedicineModal medicine={selectedMedicine} open={isEditOpen} onOpenChange={setIsEditOpen} />
      <AlertDialog open={!!medicineToDelete} onOpenChange={(open) => !open && setMedicineToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete Item</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}