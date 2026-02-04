"use server";

import { orderService } from "@/app/services/order.service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateOrderStatusAction = async (orderId: string, status: string) => {
  const result = await orderService.updateOrderStatus(orderId, status);
  
  if (result.success) {
    revalidatePath("/seller/orders");
  }
  
  return result;
};

export const createOrderAction = async (data: any) => {
  try {
    const result = await orderService.createOrder(data);
    
    if (result.success) {
      revalidatePath("/dashboard/orders");
    }
    
    return result;
  } catch (error) {
    return { success: false, message: "Network connection failed" };
  }
};
