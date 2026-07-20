"use client";

import { MessageCircle, Star } from "lucide-react";

export default function EmptyReview() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">

      {/* Icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
        <MessageCircle
          size={32}
          className="text-yellow-500"
        />
      </div>


      <h3 className="text-xl font-bold text-gray-800">
        No Reviews Yet
      </h3>


      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        Be the first guest to share your experience at
        Hotel Star Palace.
      </p>


      {/* Stars Preview */}
      <div className="mt-5 flex items-center gap-1">

        {[1,2,3,4,5].map((item)=>(
          <Star
            key={item}
            size={22}
            className="text-gray-300"
          />
        ))}

      </div>


      <p className="mt-3 text-sm font-medium text-yellow-600">
        Your feedback helps other guests
      </p>

    </div>
  );
}