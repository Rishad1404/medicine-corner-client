"use server";

import { orderService } from "@/app/services/order.service";
import { revalidatePath } from "next/cache";

export const updateOrderStatusAction = async (orderId: string, status: string) => {
  const result = await orderService.updateOrderStatus(orderId, status);
  
  if (result.success) {
    revalidatePath("/seller/orders");
  }
  
  return result;
};