import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const sellerService = {
  getSellerStats: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/seller/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      return await res.json();
    } catch (error) {
      return { success: false, message: "Failed to load dashboard stats" };
    }
  },
};