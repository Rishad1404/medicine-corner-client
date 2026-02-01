"use server"

import { medicineService } from "@/app/services/medicine.service"
import { Medicine } from "@/types";

export const getBlogs=async()=>{
    return await medicineService.getCategories();
}

export const createMedicine=async(data:Medicine)=>{
    const res=await medicineService.createMedicine(data)

    return res;
}