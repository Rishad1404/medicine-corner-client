import { getReviews } from "@/actions/review.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, User, MessageSquareQuote } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export async function ReviewSection({ medicineId }: { medicineId: string }) {
  // 1. Fetch the raw response (which is an object like { success: true, data: [...] })
  const response = await getReviews(medicineId);

  // 2. FIX: Extract the actual array from response.data
  // If response.data is undefined, default to empty array [] to prevent crash
  const reviews = Array.isArray(response) ? response : (response?.data || []);

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  // Helper to render stars
  const StarRating = ({ rating, size = "md" }: { rating: number, size?: "sm" | "md" }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "transition-all",
            size === "md" ? "h-4 w-4" : "h-3 w-3",
            star <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200 dark:fill-slate-800 dark:text-slate-700"
          )}
        />
      ))}
    </div>
  );

  return (
    <div
      className="bg-white mt-12 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 scroll-mt-24 shadow-sm"
      id="reviews"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-900/20">
             <MessageSquareQuote className="h-6 w-6 text-pink-600 dark:text-pink-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-blue-900 dark:text-white tracking-tight">
            Customer Reviews
        </h2>
      </div>

      {/* --- RATINGS SUMMARY --- */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12 border-b border-slate-100 dark:border-slate-800 pb-12">
        {/* Left: Big Number & Breakdown */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div className="flex items-center gap-6">
            <span className="text-6xl font-black text-blue-900 dark:text-white tracking-tighter">
              {averageRating}
            </span>
            <div className="flex flex-col gap-1.5">
              <StarRating rating={Math.round(Number(averageRating))} />
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Based on {totalReviews} Reviews
              </span>
            </div>
          </div>

          {/* Rating Distribution Bars */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              // SAFE NOW: reviews is guaranteed to be an array here
              const count = reviews.filter((r: any) => r.rating === star).length;
              const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 w-12">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{star}</span>
                    <Star className="h-3 w-3 text-slate-300 dark:text-slate-600" />
                  </div>
                  {/* Custom Progress Color: Pink */}
                  <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-pink-600 dark:bg-pink-500 rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400 w-8 text-right">{percent.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Write Review Call to Action (Optional visual filler) */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
             <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-blue-900 dark:text-white">Share your experience</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Purchased this medicine? Let others know how it worked for you.
                </p>
             </div>
        </div>
      </div>

      {/* --- REVIEWS LIST --- */}
      <div className="flex-1">
        {totalReviews === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-slate-300 dark:text-slate-600" />
            </div>
            <h4 className="text-lg font-bold text-blue-900 dark:text-white">
              No reviews yet
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
              This product hasn’t received any reviews yet. Be the first to share your experience after purchase.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className="group p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-pink-100 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
                    <AvatarImage src={review.customer?.image || ""} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-slate-800 dark:text-slate-300 font-bold">
                      {review.customer?.name?.[0] || <User className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <p className="text-base font-bold text-blue-900 dark:text-white">
                        {review.customer?.name || "Verified Customer"}
                      </p>
                      <span className="text-xs font-medium text-slate-400">
                        {formatDistanceToNow(new Date(review.createdAt))} ago
                      </span>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pl-[4rem]">
                  {review.comment || "No comment provided."}
                </p>

                {/* Helpful Actions */}
                <div className="flex items-center gap-4 mt-4 pl-[4rem]">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-pink-600 transition-colors group/btn">
                    <ThumbsUp className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" /> 
                    Helpful ({review.likes || 0})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}