"use server";

import { categoryService } from "@/app/services/category.service";
import { revalidatePath } from "next/cache";


export const createCategoryAction = async (data: { name: string; image?: string }) => {
  try {
    const result = await categoryService.createCategory(data);
    
    if (result.success) {
      revalidatePath("/admin/categories");
    }
    
    return result;
  } catch (error) {
    return { success: false, message: "Network connection failed" };
  }
};


export const deleteCategoryAction = async (id: string) => {
  try {
    const result = await categoryService.deleteCategory(id);
    
    if (result.success) {
      revalidatePath("/admin/categories");
    }
    
    return result;
  } catch (error) {
    return { success: false, message: "Deletion failed on server" };
  }
};


export const updateCategoryAction = async (id: string, data: { name: string; image?: string }) => {
  try {

    const result = await categoryService.updateCategory(id, data);
    
    if (result.success) {
      revalidatePath("/admin/categories");
    }
    
    return result;
  } catch (error) {
    return { success: false, message: "Update synchronization failed" };
  }
};