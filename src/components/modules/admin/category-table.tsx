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
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Package,
  Fingerprint,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { deleteCategoryAction } from "@/actions/category.actions";
import { CategoryFormModal } from "./create-category-modal";

export interface CategoryData {
  id: string;
  name: string;
  image?: string;
  _count?: { medicines: number };
}

export function CategoryManagementTable({ data }: { data: CategoryData[] }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!idToDelete) return;
    setIsDeleting(idToDelete);
    const toastId = toast.loading("Purging category from registry...");

    const result = await deleteCategoryAction(idToDelete);
    if (result.success) {
      toast.success("Category successfully removed", { id: toastId });
      setIdToDelete(null);
      router.refresh();
    } else {
      toast.error(result.message || "Failed to delete", { id: toastId });
    }
    setIsDeleting(null);
  };

  const columns: ColumnDef<CategoryData>[] = [
    {
      header: "Category Identity",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900 flex items-center justify-center shadow-sm">
            {row.original.image ? (
              <img
                src={row.original.image}
                alt={row.original.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-6 w-6 text-slate-300" />
            )}
          </div>
          <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-slate-100">
              {row.original.name}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Fingerprint className="h-3 w-3" /> ID:{" "}
              {row.original.id.slice(-8).toUpperCase()}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Inventory Volume",
      cell: ({ row }) => {
        // We saw '_count: { medicines: X }' in your console
        const count = row.original._count?.medicines || 0;

        return (
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-600">
              {count} Products
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="text-right pr-6 uppercase text-[10px] font-black tracking-widest text-slate-400">
          Operations
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-end gap-3 pr-4">
          {/* Edit Modal Button */}
          <CategoryFormModal mode="edit" category={row.original} />

          <Button
            onClick={() => setIdToDelete(row.original.id)}
            disabled={isDeleting === row.original.id}
            variant="outline"
            className="h-9 w-9 p-0 border-2 border-slate-200 dark:border-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all shadow-sm active:scale-95"
          >
            {isDeleting === row.original.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4.5 w-4.5" />
            )}
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40 border-b-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-16 px-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400"
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
                  className="border-b last:border-0 hover:bg-indigo-50/30 dark:hover:bg-slate-800/40 transition-all duration-300"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-10 py-6 align-middle"
                    >
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
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center gap-3 opacity-30 text-slate-500">
                    <ImageIcon className="h-12 w-12" />
                    <p className="text-sm font-black uppercase tracking-widest">
                      No categories registered
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <AlertDialog
        open={!!idToDelete}
        onOpenChange={(open) => !open && setIdToDelete(null)}
      >
        <AlertDialogContent className="rounded-[2.5rem] border-none shadow-2xl dark:bg-slate-900">
          <AlertDialogHeader className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-rose-500" />
            </div>
            <div className="text-center space-y-2">
              <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 font-medium px-4">
                Deleting this category will un-link it from all associated
                products. This process is irreversible.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3 mt-6">
            <AlertDialogCancel className="flex-1 rounded-2xl border-2 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="flex-1 rounded-2xl bg-rose-600 hover:bg-rose-700 font-bold shadow-lg shadow-rose-500/20"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* --- PAGINATION CONTROLS --- */}
      <div className="flex items-center justify-end gap-3 px-6">
        <Button
          variant="ghost"
          size="sm"
          className="h-10 px-4 font-black text-[11px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Prev
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-xs font-black shadow-lg shadow-slate-900/20">
          {table.getState().pagination.pageIndex + 1}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 px-4 font-black text-[11px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
