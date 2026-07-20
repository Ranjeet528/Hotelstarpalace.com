

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  CalendarDays,
  Phone,
  BedDouble,
  IndianRupee,
  User,
} from "lucide-react";

import { getBooking } from "@/services/booking.service";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const res = await getBooking(id);

        setBooking(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBooking();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-40 text-center text-xl">
        Loading booking...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="py-40 text-center">
        Booking not found
      </div>
    );
  }
    return (
    <section className="min-h-screen bg-gray-50 py-16">

      <div className="mx-auto max-w-5xl px-5">

        {/* Success Card */}
        <div className="rounded-3xl bg-white p-10 shadow-xl">

          {/* Success Icon */}
          <div className="flex flex-col items-center">

            <CheckCircle2
              size={90}
              className="text-green-500"
            />

            <h1 className="mt-6 text-4xl font-bold text-gray-900">
              Booking Confirmed 🎉
            </h1>

            <p className="mt-3 text-center text-lg text-gray-500">
              Thank you for choosing
              <span className="font-semibold text-yellow-600">
                {" "}Hotel Star Palace
              </span>
            </p>

          </div>

          {/* Booking ID */}
          <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">

            <p className="text-sm text-gray-500">
              Booking ID
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-wider text-green-700">
              {booking.bookingId}
            </h2>

          </div>

          {/* Booking Details */}

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border p-6">

              <div className="mb-5 flex items-center gap-3">

                <User className="text-yellow-500" />

                <h3 className="text-xl font-bold">
                  Guest Details
                </h3>

              </div>

              <div className="space-y-4">

                <p>
                  <span className="font-semibold">
                    Name :
                  </span>{" "}
                  {booking.customerName}
                </p>

                <p>
                  <span className="font-semibold">
                    Phone :
                  </span>{" "}
                  {booking.phone}
                </p>

                <p>
                  <span className="font-semibold">
                    Adults :
                  </span>{" "}
                  {booking.adults}
                </p>

                <p>
                  <span className="font-semibold">
                    Children :
                  </span>{" "}
                  {booking.children}
                </p>

              </div>

            </div>

            <div className="rounded-2xl border p-6">

              <div className="mb-5 flex items-center gap-3">

                <BedDouble className="text-yellow-500" />

                <h3 className="text-xl font-bold">
                  Room Details
                </h3>

              </div>

              <div className="space-y-4">

                <p>
                  <span className="font-semibold">
                    Room :
                  </span>{" "}
                  {booking.roomId?.title}
                </p>

                <p>
                  <span className="font-semibold">
                    Room Type :
                  </span>{" "}
                  {booking.roomId?.roomType}
                </p>

                <p>
                  <span className="font-semibold">
                    Price :
                  </span>{" "}
                  ₹{booking.price}
                </p>

              </div>

            </div>

          </div>
                    {/* Stay Details */}
          <div className="mt-8 rounded-2xl border p-6">

            <div className="mb-5 flex items-center gap-3">

              <CalendarDays className="text-yellow-500" />

              <h3 className="text-xl font-bold">
                Stay Details
              </h3>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">
                  Check In
                </p>

                <p className="mt-1 font-semibold">
                  {new Date(booking.checkIn).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Check Out
                </p>

                <p className="mt-1 font-semibold">
                  {new Date(booking.checkOut).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>

              </div>

            </div>

          </div>

          {/* Payment Summary */}
          <div className="mt-8 rounded-2xl border bg-gray-50 p-6">

            <div className="mb-5 flex items-center gap-3">

              <IndianRupee className="text-yellow-500" />

              <h3 className="text-xl font-bold">
                Payment Summary
              </h3>

            </div>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Room Charges (₹{booking.price} × {booking.nights} night{booking.nights > 1 ? "s" : ""})</span>
                <span>₹{booking.totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes</span>
                <span>Included</span>
              </div>

              <div className="flex justify-between border-t pt-4 text-xl font-bold">
                <span>Total Paid</span>
                <span>₹{booking.totalAmount}</span>
              </div>

            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col gap-4 md:flex-row">

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

  <Link
    href={`/booking/invoice?id=${booking._id}`}
    className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    📄
    <span>View Invoice</span>
  </Link>

  <Link
    href="/rooms"
    className="group flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-800 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:bg-yellow-50 hover:shadow-lg"
  >
    🏨
    <span>Explore Rooms</span>
  </Link>

  <Link
    href="/"
    className="group flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:shadow-xl"
  >
    🏠
    <span>Back to Home</span>
  </Link>

</div>

          </div>

        </div>

      </div>

    </section>
  );
}

