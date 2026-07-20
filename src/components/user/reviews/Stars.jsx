"use client";

import { Star } from "lucide-react";

export default function Stars({
  rating = 0,
  size = 18,
  showValue = false,
}) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`transition-all ${
              star <= fullStars
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {showValue && (
        <span className="text-sm font-semibold text-gray-700">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  );
}