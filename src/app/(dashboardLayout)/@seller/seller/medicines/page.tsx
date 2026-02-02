import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";


import { medicineService } from "@/app/services/medicine.service";
import { MedicineTable } from "@/components/modules/seller/medicine-table";

// We will create this component in the next step

export default async function ManageMedicinesPage() {
  // 1. Fetch data on the server
  const { data: medicines, error } = await medicineService.getSellerMedicines();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medicines</h1>
          <p className="text-muted-foreground">
            Manage your inventory, prices, and stock levels.
          </p>
        </div>
        <Link href="/seller/medicines/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Medicine
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="border rounded-md">
        {error ? (
          <div className="p-10 text-center text-red-500">
            Failed to load medicines. Please try again.
          </div>
        ) : (
          /* We pass the data to the Client Component here */
          <MedicineTable
            data={medicines || []}
            meta={{
              page: 1,
              limit: 10,
              total: medicines?.length || 0,
              totalPage: 1,
            }}
          />
        )}
      </div>
    </div>
  );
}
