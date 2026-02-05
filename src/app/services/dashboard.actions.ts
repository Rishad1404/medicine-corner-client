"use server";

import { orderService } from "@/app/services/order.service";

export async function getCustomerDashboardData() {
  const { data: orders } = await orderService.getCustomerOrders();
  
  if (!orders) return [];
  return orders;
}