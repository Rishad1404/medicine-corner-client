// src/app/services/admin.service.ts
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const adminService = {

  getAllUsers: async function (page = 1, limit = 10) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/admin/users?page=${page}&limit=${limit}`, {
      headers: { Cookie: cookieStore.toString() },
    });
    return await res.json();
  },

 
  updateUserStatus: async function (userId: string, isBlocked: boolean) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Cookie: cookieStore.toString() 
      },
      body: JSON.stringify({ isBlocked }),
    });
    return await res.json();
  },


  getPlatformStats: async function () {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/admin/stats`, {
      headers: { Cookie: cookieStore.toString() },
    });
    return await res.json();
  }
};