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

export const createOrder = async (orderData: any) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("better-auth.session_token")?.value;

  if (!token) {
    return { success: false, message: "Unauthorized: Please login first." };
  }

  // Debugging: Print token to your VS Code terminal to prove it exists
  console.log("Token being sent:", token.substring(0, 10) + "...");

  // Pass the token to the service
  const result = await orderService.createOrder(orderData, token);

  if (result?.success) {
    revalidatePath("/profile");
  }

  return result;
};