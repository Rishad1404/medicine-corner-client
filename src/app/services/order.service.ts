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
        },
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

  getAllOrders: async function (page = 1, limit = 10) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${API_URL}/admin/orders?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          next: { tags: ["orders"] },
        },
      );

      const response = await res.json();
      return response;
    } catch (error) {
      return { success: false, message: "Failed to fetch orders" };
    }
  },

  updateOrderStatusAdmin: async (id: string, status: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/admin/orders/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  },

  getCustomerOrders: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return await res.json();
  },

createOrder: async (orderData: any, token?: string) => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // STRATEGY 1: Standard Bearer Token
          Authorization: `Bearer ${token}`, 
          
          // STRATEGY 2: Forward it as a Cookie (Better Auth often needs this!)
          Cookie: `better-auth.session_token=${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();
      
      if (!res.ok) {
        // Log the actual error from the backend to understand WHY it failed
        console.error("Backend Error Response:", result);
        throw new Error(result.message || "Server rejected the request");
      }

      return result;
    } catch (error: any) {
      console.error("Order Service Error:", error);
      return {
        success: false,
        message: error.message || "Failed to place order",
      };
    }
  },
};
