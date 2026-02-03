"use server";

import { reviewService } from "@/app/services/review.service";

export const getReviews = async (medicineId: string) => {
  const res = await reviewService.getReviewsByMedicine(medicineId);
  return res.data || [];
};

export const createReview = async (payload: {
  medicineId: string;
  rating: number;
  comment?: string;
}) => {
  return await reviewService.addReview(payload);
};
