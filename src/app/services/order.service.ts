import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const orderService = {

  getSellerOrders: async function (page = 1, limit = 10) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${API_URL}/seller/orders?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          next: { tags: ["orders"] },
        }
      );

      const response = await res.json();
      return response;
    } catch (error) {
      return { success: false, message: "Failed to fetch orders" };
    }
  },

  // 2. Update Order Status
  updateOrderStatus: async function (orderId: string, status: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/seller/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      return await res.json();
    } catch (error) {
      return { success: false, message: "Failed to update order status" };
    }
  },
};