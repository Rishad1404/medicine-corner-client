"use server";

import { userService } from "@/app/services/user.service";
import { revalidatePath } from "next/cache";



export const updateUserStatusAction = async (userId: string, newStatus: string) => {
  try {

    const result = await userService.updateUserStatus(userId, { status: newStatus });
    
    if (result.success) {
      revalidatePath("/admin/users");
      return { success: true };
    }
    
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: "Connection error" };
  }
};

export const deleteUserAction = async (userId: string) => {
  try {
    const result = await userService.deleteUser(userId);
    
    if (result.success) {
      // THIS IS THE FIX: It clears the cache for the admin users page
      revalidatePath("/admin/users"); 
      return { success: true };
    }
    
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};