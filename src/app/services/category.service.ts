

import { env } from "@/env";

const API_URL = env.API_URL

export const categoryService = {
 
  getAllCategories: async () => {
    const res = await fetch(`${API_URL}/categories`, {
      next: { tags: ["categories"] },
      cache: "no-store",
    });
    return await res.json();
  },


  createCategory: async (data: { name: string; image?: string }) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials:"include"
    });
    return await res.json();
  },


  deleteCategory: async (id: string) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  },
};