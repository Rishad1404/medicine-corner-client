import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const categoryService = {
  getCategories: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        console.log("Backend Error:", res.status, res.statusText);
        return { data: [], error: { message: "Failed to fetch categories" } };
      }

      const categories = await res.json();

      return { data: categories || [], error: null };
    } catch (error) {
      console.log(error);
      return { data: [], error: { message: "Something Went Wrong" } };
    }
  },

  createCategory: async (data: { name: string; image?: string }) => {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      body: JSON.stringify(data),
    });


    if (!res.ok) {
      return {
        success: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }

    return await res.json();
  },

  deleteCategory: async (id: string) => {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieString,
      },
    });
    return await res.json();
  },
  updateCategory: async (
    id: string,
    data: { name: string; image?: string },
  ) => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  },
};
