"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import { addReview } from "@/actions/review.actions"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ReviewModalProps {
  medicineId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ medicineId, isOpen, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a star rating to continue.");
      return;
    }
    
    setLoading(true);

    try {
      const res = await addReview({ medicineId, rating, comment });
      
      if (res.success) {
        toast.success("Review submitted successfully!");
        // Reset form
        setRating(0);
        setComment("");
        onClose();
        router.refresh(); 
      } else {
        toast.error(res.message || "Failed to submit review");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-[2rem] border-0 shadow-2xl">
        
        {/* --- HEADER --- */}
        <div className="bg-blue-900 p-8 text-center relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -ml-10 -mb-10" />
            
            <DialogHeader className="relative z-10">
                <div className="mx-auto bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                    <MessageSquareQuote className="h-6 w-6 text-pink-400" />
                </div>
                <DialogTitle className="text-2xl font-black text-white tracking-tight">
                    Rate this Medicine
                </DialogTitle>
                <DialogDescription className="text-blue-200 font-medium">
                    How was your experience with this product?
                </DialogDescription>
            </DialogHeader>
        </div>

        {/* --- BODY --- */}
        <div className="p-8 bg-white dark:bg-slate-950 space-y-8">
            
            {/* 1. Star Rating Interaction */}
            <div className="flex flex-col items-center gap-3">
                <div className="flex gap-2" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="transition-transform duration-200 hover:scale-110 focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                className={cn(
                                    "h-10 w-10 transition-colors duration-200",
                                    (hoverRating || rating) >= star
                                        ? "fill-amber-400 text-amber-400 drop-shadow-md"
                                        : "fill-slate-100 text-slate-200 dark:fill-slate-800 dark:text-slate-700"
                                )}
                            />
                        </button>
                    ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                    {rating === 0 && "Select a Rating"}
                </span>
            </div>

            {/* 2. Comment Box */}
            <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">
                    Your Review (Optional)
                </label>
                <Textarea 
                    placeholder="Tell us more about the effectiveness, side effects, or delivery experience..." 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[140px] resize-none rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-4 text-sm focus-visible:ring-0 focus-visible:border-pink-500/50 focus-visible:bg-white transition-all dark:bg-slate-900 dark:border-slate-800"
                />
            </div>

            {/* 3. Action Buttons */}
            <div className="flex gap-3 pt-2">
                <Button 
                    variant="ghost" 
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 h-12 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    disabled={loading} 
                    className="flex-[2] h-12 rounded-xl bg-pink-600 hover:bg-blue-900 text-white font-bold text-sm uppercase tracking-wide shadow-lg shadow-pink-600/20 transition-all duration-300"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                        </div>
                    ) : (
                        "Submit Review"
                    )}
                </Button>
            </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}