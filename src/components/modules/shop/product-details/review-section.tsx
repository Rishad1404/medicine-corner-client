import { getReviews } from "@/actions/review.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export async function ReviewSection({ medicineId }: { medicineId: string }) {
  const reviews = await getReviews(medicineId);

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  // Helper to render stars
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div
      className="bg-white mt-12 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 scroll-mt-20"
      id="reviews"
    >
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        Customer Reviews
      </h2>

      {/* --- RATINGS SUMMARY --- */}
      <div className="flex flex-col lg:flex-col md:flex-row gap-12 mb-12">
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-black text-slate-900 dark:text-white">
              {averageRating}
            </span>
            <div className="flex flex-col">
              <StarRating rating={Math.round(Number(averageRating))} />
              <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {totalReviews} Verified Reviews
              </span>
            </div>
          </div>

          {/* Rating Distribution Bars */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r: any) => r.rating === star).length;
              const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-slate-600 w-4">{star}</span>
                  <Star className="h-3 w-3 text-slate-400" />
                  <Progress value={percent} className="h-2 flex-1" />
                  <span className="text-xs text-slate-400 w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- NO REVIEWS OR REVIEWS LIST --- */}
        <div className="flex-1">
          {totalReviews === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <Star className="h-10 w-10 text-slate-300 mb-3" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                No reviews yet
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                This product hasn’t received any reviews yet. Be the first to share your experience.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                      <AvatarImage src={review.customer?.image || ""} />
                      <AvatarFallback className="bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {review.customer?.name}
                        </p>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {formatDistanceToNow(new Date(review.createdAt))} ago
                        </span>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {review.comment || "No comment provided."}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                      <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({review.likes || 0})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
