"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  Phone,
  Loader2,
  Moon,
  Receipt,
  X,
  AlertTriangle,
} from "lucide-react";
import { Cinzel } from "next/font/google";

import { useAuth } from "@/context/AuthContext";
import { cancelUserBooking } from "@/services/booking.service";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const API = process.env.NEXT_PUBLIC_API_URL;

const STATUS_STYLES = {
  booked: "bg-green-100 text-green-700",
  checked_in: "bg-blue-100 text-blue-700",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-600",
  no_show: "bg-orange-100 text-orange-700",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "cancelled", label: "Cancelled" },
];

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API}/bookings/my-bookings`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log("Booking Fetch Error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const confirmCancel = async () => {
    if (!cancelTarget) return;

    setCancelling(true);

    try {
      const data = await cancelUserBooking(cancelTarget._id);

      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === cancelTarget._id
              ? {
                ...b,
                status: "cancelled",
                cancelledBy: data.booking?.cancelledBy || "user",
                cancelledByUser: data.booking?.cancelledByUser,
                cancelledAt: data.booking?.cancelledAt,
                cancelReason: data.booking?.cancelReason,
              }
              : b
          )
        );

        setCancelTarget(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Could not cancel booking");
    } finally {
      setCancelling(false);
    }
  };

  const now = new Date();

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (filter === "all") return true;
      if (filter === "cancelled") return b.status === "cancelled";
      if (filter === "upcoming")
        return (
          new Date(b.checkOut) >= now &&
          !["cancelled", "completed"].includes(b.status)
        );
      if (filter === "past")
        return new Date(b.checkOut) < now || b.status === "completed";
      return true;
    });
  }, [bookings, filter]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f3]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#C9A227]" size={40} />
          <p className="text-sm uppercase tracking-[0.2em] text-[#8A6B12]">
            Loading Bookings
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#faf8f3] px-5 text-center">
        <h1 className={`${cinzel.className} text-2xl text-[#1C1712]`}>
          Please Login
        </h1>

        <p className="text-gray-500 max-w-sm">
          Sign in to view and manage your Hotel Star Palace reservations.
        </p>

        <Link
          href="/login"
          className="rounded-full bg-gradient-to-b from-[#E8C766] to-[#C9A227] px-8 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-[#1C1712] shadow-[0_4px_16px_rgba(201,162,39,0.35)] transition hover:-translate-y-0.5"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-5 py-10 lg:px-20 pt-28 sm:pt-32">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className={`${cinzel.className} text-3xl lg:text-4xl text-[#1C1712]`}>
              My Bookings
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your Hotel Star Palace reservations
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.05em] transition ${filter === f.key
                    ? "bg-gradient-to-b from-[#E8C766] to-[#C9A227] text-[#1C1712] shadow-[0_2px_8px_rgba(201,162,39,0.35)]"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-[#C9A227]/40 hover:text-[#8A6B12]"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl bg-red-100 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {filteredBookings.length === 0 && (
          <div className="rounded-2xl border border-[#C9A227]/10 bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-[#1C1712]">
              No bookings found
            </h2>

            <p className="mt-2 text-gray-500">
              {filter === "all"
                ? "You have not booked any room yet."
                : `You don't have any ${filter} bookings.`}
            </p>

            <Link
              href="/rooms"
              className="mt-6 inline-block rounded-full bg-gradient-to-b from-[#E8C766] to-[#C9A227] px-7 py-3 text-sm font-semibold uppercase tracking-[0.03em] text-[#1C1712] shadow-[0_4px_14px_rgba(201,162,39,0.3)]"
            >
              Explore Rooms
            </Link>
          </div>
        )}

        {/* BOOKINGS */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => {
            const room = booking.roomId;
            const canCancel =
              booking.status === "booked" && new Date(booking.checkIn) > now;

            return (
              <div
                key={booking._id}
                className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-md lg:flex-row"
              >
                {/* IMAGE */}
                <div className="relative h-56 w-full shrink-0 lg:w-72">
                  {room?.images?.[0] ? (
                    <Image
                      src={room.images[0]}
                      alt={room.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#faf8f3] text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1712]">
                        {room?.title || "Room"}
                      </h2>
                      {room?.roomType && (
                        <p className="mt-1 text-sm uppercase tracking-[0.08em] text-[#8A6B12]">
                          {room.roomType}
                        </p>
                      )}
                    </div>

                    <span
                      className={`rounded-full px-4 py-1 text-sm capitalize ${STATUS_STYLES[booking.status] ||
                        "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 text-gray-600 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={18} />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString("en-IN")}
                        {" - "}
                        {new Date(booking.checkOut).toLocaleDateString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Moon size={18} />
                      <span>
                        {booking.nights} Night{booking.nights > 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={18} />
                      <span>
                        {booking.adults} Adults
                        {booking.children > 0 &&
                          ` · ${booking.children} Children`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={18} />
                      {booking.phone}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Booking ID</p>
                      <p className="font-semibold text-[#1C1712]">
                        {booking.bookingId}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold text-[#C9A227]">
                        ₹{booking.totalAmount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                    <Link
                      href={`/booking/invoice?id=${booking._id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 px-5 py-2.5 text-sm font-semibold text-[#8A6B12] transition hover:bg-[#C9A227]/10"
                    >
                      <Receipt size={16} />
                      View Invoice
                    </Link>

                    {canCancel && (
                      <button
                        onClick={() => setCancelTarget(booking)}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <X size={16} />
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CANCEL CONFIRM MODAL */}
      {cancelTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={22} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-[#1C1712]">
              Cancel this booking?
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Booking{" "}
              <span className="font-semibold text-[#1C1712]">
                {cancelTarget.bookingId}
              </span>{" "}
              will be marked as cancelled. This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setCancelTarget(null)}
                disabled={cancelling}
                className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Keep Booking
              </button>

              <button
                onClick={confirmCancel}
                disabled={cancelling}
                className="flex-1 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}