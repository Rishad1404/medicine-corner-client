"use client"; // 👈 Keeps Auth working properly

import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MedicineTable } from "@/components/modules/seller/medicine-table";
import { getSellerMedicines } from "@/actions/medicine.actions";

export default function ManageMedicinesPage() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getSellerMedicines();
        if (res.success) {
          setMedicines(res.data || []);
        } else {
          setError(res.message || "Failed to load medicines");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    // 👇 1. Added Background Colors for Light & Dark Mode
    <div className="min-h-screen space-y-6 p-6  transition-colors duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Medicines
          </h1>
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


      <div className="border rounded-md shadow-sm">
        {error ? (
          <div className="p-10 text-center text-red-500">
            {error}. Please try again.
          </div>
        ) : (
          <MedicineTable
            data={medicines}
            meta={{
              page: 1,
              limit: 10,
              total: medicines.length,
              totalPage: 1,
            }}
          />
        )}
      </div>
    </div>
  );
}