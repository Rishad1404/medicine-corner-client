import { env } from "@/env";
import { Medicine } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const medicineService = {
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

  createMedicine: async (medicineData: Medicine) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/seller/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const data = await res.json();
      if (data.error) {
        return { data: null, error: { message: data.error } };
      }

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getSellerMedicines: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/seller/medicines`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch medicines");
      }

      const response = await res.json();

      return { data: response.data || [], error: null };
    } catch (error) {
      console.log("Service Error:", error);
      return { data: [], error: { message: "Something went wrong" } };
    }
  },

  getSingleMedicine: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/medicines/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch medicine");

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Service Error:", error);
      return {
        data: null,
        error: { message: "Could not load medicine details" },
      };
    }
  },

  deleteMedicine: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/seller/medicines/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to delete",
        };
      }

      const response = await res.json();
      return {
        success: true,
        message: "Medicine deleted successfully",
        data: response,
      };
    } catch (error) {
      console.error("Service Delete Error:", error);
      return { success: false, message: "Network error or server down" };
    }
  },

  updateMedicine: async function (id: string, medicineData: any) {
    try {
      const cookieStore = await cookies();
      const methodUsed = "PATCH";
      const res = await fetch(`${API_URL}/seller/medicines/${id}`, {
        method: methodUsed,
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to update",
        };
      }

      const response = await res.json();
      return {
        success: true,
        message: "Medicine updated successfully",
        data: response,
      };
    } catch (error) {
      console.error("Service Update Error:", error);
      return { success: false, message: "Network error" };
    }
  },

  getAllMedicines: async (search?: string, category?: string) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("searchTerm", search);
      if (category) params.append("category", category);

      const res = await fetch(`${API_URL}/medicines?${params.toString()}`, {
        next: { tags: ["medicines"] },
        cache: "no-store",
      });

      const result = await res.json();

      return result;
    } catch (error) {
      return { data: [], error };
    }
  },

  getFilteredMedicines: async (query: Record<string, any> = {}) => {
    try {
      const params = new URLSearchParams();

      if (query.search) params.append("search", query.search);
      if (query.category) params.append("category", query.category);
      if (query.minPrice) params.append("minPrice", query.minPrice);
      if (query.maxPrice) params.append("maxPrice", query.maxPrice);
      if (query.page) params.append("page", query.page);
      if (query.limit) params.append("limit", query.limit);
      if (query.sortBy) params.append("sortBy", query.sortBy);
      if (query.sortOrder) params.append("sortOrder", query.sortOrder);

      const res = await fetch(`${API_URL}/medicines?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      return await res.json();
    } catch (error: any) {
      console.error("Error in getFilteredMedicines:", error);
      return { data: [], meta: { page: 1, total: 0 } };
    }
  },
};
