import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 1 to 5
  className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  const maxStars = 5;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <Star
            key={index}
            className={cn(
              "w-4 h-4",
              isFilled ? "text-[#F58220] fill-[#F58220]" : "text-gray-300 fill-transparent"
            )}
          />
        );
      })}
    </div>
  );
}

