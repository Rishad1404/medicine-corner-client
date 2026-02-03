import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Star, ThumbsUp, User } from "lucide-react";

const MOCK_REVIEWS = [
  {
    id: "1",
    user: { name: "Rahim Ahmed", image: "" },
    rating: 5,
    comment: "Excellent medicine, delivered within 2 hours in Dhaka!",
    createdAt: new Date("2024-02-01"),
    likes: 12,
  },
  {
    id: "2",
    user: { name: "Sadia Islam", image: "" },
    rating: 4,
    comment: "Good product, delivery was fast.",
    createdAt: new Date("2024-01-28"),
    likes: 3,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${
            s <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewSection({ medicineId }: { medicineId: string }) {
  const reviews = MOCK_REVIEWS;

  const total = reviews.length;
  const avg =
    total > 0
      ? (reviews.reduce((a, r) => a + r.rating, 0) / total).toFixed(1)
      : "0.0";

  return (
    <section
      id="reviews"
      className="bg-white dark:bg-slate-900 rounded-3xl border p-8 md:p-12 scroll-mt-20"
    >
      <div className="flex flex-col md:flex-row gap-12">
        {/* SUMMARY */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-2">
            Customer Reviews
          </h2>

          <div className="flex gap-4 items-end mb-6">
            <span className="text-5xl font-black">{avg}</span>
            <div>
              <StarRating rating={Math.round(Number(avg))} />
              <p className="text-sm text-slate-500">
                {total} Verified Reviews
              </p>
            </div>
          </div>

          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(r => r.rating === star).length;
            const percent = total ? (count / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2 mb-2">
                <span className="w-4 font-bold">{star}</span>
                <Progress value={percent} className="h-2" />
                <span className="w-6 text-xs text-right">{count}</span>
              </div>
            );
          })}

          <Button className="w-full mt-6">Write a Review</Button>
        </div>

        {/* LIST */}
        <div className="flex-1">
          <h3 className="text-sm font-bold uppercase mb-6">
            Recent Feedback
          </h3>

          {reviews.map((r) => (
            <div key={r.id} className="mb-8">
              <div className="flex gap-3 mb-2">
                <Avatar>
                  <AvatarImage src={r.user.image || undefined} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-bold">{r.user.name}</p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={r.rating} />
                    <span className="text-xs text-slate-400">
                      {r.createdAt.toDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 pl-12">
                {r.comment}
              </p>

              <button className="pl-12 mt-3 text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" /> Helpful ({r.likes})
              </button>

              <Separator className="mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
