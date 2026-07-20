"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Phone,
  Mail,
  Users,
  FileText,
  CalendarDays,
  IndianRupee,
  Search,
  XCircle,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

// =========================
// SAFE DATE HELPERS
// =========================

const toDate = (value) => {
  if (!value) return null;

  const d = new Date(value);

  return isNaN(d.getTime()) ? null : d;
};

const formatDateTime = (value) => {
  const d = toDate(value);

  if (!d) return "-";

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function GuestBookingDetails() {
  const router = useRouter();

  const params = useParams();

  const searchParams = useSearchParams();

  const bookingId = params.bookingId;

  const phone = searchParams.get("phone");

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  const [cancelling, setCancelling] = useState(false);

  // =====================
  // LOAD BOOKING
  // =====================

  const loadBooking = async () => {
    try {
      const res = await axios.post(
        `${API}/bookings/track`,
        {
          bookingId,
          phone,
        }
      );

      setBooking(res.data.booking);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Booking not found"
      );

      router.push("/track-booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooking();
  }, []);

  // =====================
  // CALCULATE NIGHTS
  // =====================

  const nights = useMemo(() => {
    if (!booking) return 1;

    const inDate = toDate(booking.checkIn);

    const outDate = toDate(booking.checkOut);

    if (!inDate || !outDate) return 1;

    const diff =
      (outDate - inDate) /
      (1000 * 60 * 60 * 24);

    return diff > 0 ? Math.ceil(diff) : 1;
  }, [booking]);

  // =====================
  // TOTAL
  // =====================

  const total = useMemo(() => {
    if (!booking) return 0;

    return (
      booking.totalAmount ||
      booking.price * nights
    );
  }, [booking, nights]);

  // =====================
  // CANCEL BOOKING
  // =====================

  const cancelBooking = async () => {
    const ok = confirm(
      "Cancel this booking?"
    );

    if (!ok) return;

    try {
      setCancelling(true);

      const res = await axios.put(
        `${API}/bookings/guest-cancel`,
        {
          bookingId,
          phone,
        }
      );

      toast.success(res.data.message);

      loadBooking();
    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center">
        Loading Booking...
      </div>
    );
  }

  if (!booking) return null;
  return (
  <div className="bg-gray-50 py-10">
    <div className="mx-auto max-w-7xl px-4">

      {/* HEADER */}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>

          <Link
            href="/track-booking"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <h1 className="mt-3 text-3xl font-bold">
            Booking Details
          </h1>

          <p className="mt-1 text-gray-500">
            {booking.bookingId}
          </p>

        </div>

        <span
          className={`rounded-full px-5 py-2 font-semibold ${
            booking.status === "booked"
              ? "bg-green-100 text-green-700"
              : booking.status === "checked_in"
              ? "bg-blue-100 text-blue-700"
              : booking.status === "completed"
              ? "bg-purple-100 text-purple-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {booking.status}
        </span>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-6 lg:col-span-2">

          {/* ROOM */}

          <div className="overflow-hidden rounded-3xl bg-white shadow">

            <div className="relative h-72">

              <Image
                src={
                  booking.roomId?.images?.[0] ||
                  "/images/no-image.jpg"
                }
                fill
                alt={booking.roomId?.title}
                className="object-cover"
              />

            </div>

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {booking.roomId?.title}
              </h2>

              <p className="mt-2 text-gray-500">
                {booking.roomId?.roomType}
              </p>

            </div>

          </div>

          {/* GUEST */}

          <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
              Guest Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <p className="text-gray-500">
                  Name
                </p>

                <p className="font-semibold">
                  {booking.customerName}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Phone
                </p>

                <p className="flex items-center gap-2 font-semibold">
                  <Phone size={18}/>
                  {booking.phone}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Email
                </p>

                <p className="flex items-center gap-2 font-semibold">
                  <Mail size={18}/>
                  {booking.email || "-"}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Guests
                </p>

                <p className="flex items-center gap-2 font-semibold">
                  <Users size={18}/>
                  {booking.adults} Adults
                  {booking.children > 0 &&
                    ` • ${booking.children} Children`}
                </p>

              </div>

            </div>

          </div>

          {/* STAY */}

          <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
              Stay Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <p className="text-gray-500">
                  Check In
                </p>

                <p className="font-semibold">
                  {formatDateTime(booking.checkIn)}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Check Out
                </p>

                <p className="font-semibold">
                  {formatDateTime(booking.checkOut)}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Nights
                </p>

                <p className="font-semibold">
                  {nights}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Payment
                </p>

                <p className="font-semibold capitalize">
                  {booking.paymentStatus}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="sticky top-24 rounded-3xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Booking Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>
                  Room Price
                </span>

                <span>
                  ₹{booking.price}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Nights
                </span>

                <span>
                  {nights}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Payment
                </span>

                <span className="capitalize">
                  {booking.paymentStatus}
                </span>

              </div>

              <hr/>

              <div className="flex justify-between text-xl font-bold text-orange-600">

                <span>Total</span>

                <span>
                  ₹{total.toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            {booking.status === "booked" && (

              <button
                onClick={cancelBooking}
                disabled={cancelling}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600"
              >
                <XCircle size={18}/>
                {cancelling
                  ? "Cancelling..."
                  : "Cancel Booking"}
              </button>

            )}


          </div>

        </div>

      </div>

    </div>
  </div>
);
}