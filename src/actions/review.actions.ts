"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL=env.API_URL

export const addReview = async (data: { medicineId: string; rating: number; comment: string }) => {
  const cookieStore = await cookies();
  const token = cookieStore.toString();

  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: token,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to submit review" };
  }
};


export const getReviews = async (medicineId: string) => {
  try {
    const res = await fetch(`${API_URL}/reviews/${medicineId}`, {
      cache: "no-store", 
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, data: [] };
  }
};
