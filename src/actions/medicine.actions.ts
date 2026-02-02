"use server";

import { medicineService } from "@/app/services/medicine.service";
import { Medicine } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getBlogs = async () => {
  return await medicineService.getCategories();
};

export const createMedicine = async (data: Medicine) => {
  
  const res = await medicineService.createMedicine(data);


  return res;
};

export const getSellerMedicines = async () => {
  return await medicineService.getSellerMedicines();
};

export const deleteMedicine = async (id: string) => {
  const result = await medicineService.deleteMedicine(id);

  if (result.success) {
    // This refreshes the page data automatically so the item disappears from the table
    revalidatePath("/dashboard/seller/medicines");
  }

  return result;
};

export const updateMedicineServerAction = async (id: string, data: any) => {

  const result = await medicineService.updateMedicine(id, data); 

  if (result.success) {
    revalidatePath("/seller/medicines");
  }
  return result;
};
