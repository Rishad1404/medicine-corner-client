import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import Link from "next/link";
import { MedicineTable } from "@/components/modules/seller/medicine-table";
import { getSellerMedicines } from "@/actions/medicine.actions";

export default async function ManageMedicinesPage() {
  

  const response = await getSellerMedicines();
  
  if (!response.success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 text-red-500">
        <AlertCircle className="h-10 w-10" />
        <p className="text-lg font-semibold">Error: {response.message || "Failed to load medicines"}</p>
        <Button variant="outline" asChild>
          <Link href="/seller">Go Back</Link>
        </Button>
      </div>
    );
  }

  const medicines = response.data || [];

  return (
    <div className="min-h-screen space-y-6 p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
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

      <div className="border rounded-md shadow-sm bg-background">

        <MedicineTable
          data={medicines}
          meta={{
            page: 1,
            limit: 10,
            total: medicines.length,
            totalPage: 1,
          }}
        />
      </div>
    </div>
  );
}