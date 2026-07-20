import { Suspense } from "react";
import BookingClient from "./BookingClient";

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="py-32 text-center text-lg">
        Loading Booking...
      </div>
    }>
      <BookingClient />
    </Suspense>
  );
}