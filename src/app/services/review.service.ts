import { env } from "@/env";
import { cookies } from "next/headers";


export interface ReviewPayload {
  medicineId: string;
  rating: number;
  comment?: string;
}

const API_URL=env.API_URL;

export const reviewService = {

  addReview: async (payload: ReviewPayload) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data.message } };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Failed to add review" } };
    }
  },


  getReviewsByMedicine: async (medicineId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews/${medicineId}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: [], error: { message: data.message } };
      }

      return { data: data.data || [], error: null };
    } catch (error) {
      return { data: [], error: { message: "Failed to fetch reviews" } };
    }
  },
};
