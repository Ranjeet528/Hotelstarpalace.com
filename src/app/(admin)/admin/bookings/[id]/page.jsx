"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

import {
  ArrowLeft,
  Phone,
  Mail,
  Users,
  CheckCircle2,
  XCircle,
  Download,
} from "lucide-react";

import {
  getBooking,
  cancelAdminBooking,
} from "@/services/booking.service";

import BookingInvoice from "@/components/user/booking/BookingInvoice";

// ==========================
// SAFE DATE HELPERS
// ==========================

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

export default function BookingDetailsPage({ params }) {
  const { id } = use(params);

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const invoiceRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${booking?.bookingId}`,
  });

  const loadBooking = async () => {
    try {
      const res = await getBooking(id);
      const data = res.data || res.booking || res.data?.booking || null;
      setBooking(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooking();
  }, [id]);

  const nights = useMemo(() => {
    if (!booking) return 0;
    const inDate = toDate(booking.checkIn);
    const outDate = toDate(booking.checkOut);
    if (!inDate || !outDate) return 1;
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.ceil(diff) : 1;
  }, [booking]);

  const total = useMemo(() => {
    if (!booking) return 0;
    const roomAmount = (booking.price || 0) * nights;
    return booking.totalAmount || roomAmount;
  }, [booking, nights]);

  // Only bookings with status "booked" can be cancelled
  const isActive = booking?.status === "booked";

  const cancel = async () => {
    if (!isActive) return; // extra safety
    const ok = confirm("Cancel this booking?");
    if (!ok) return;

    try {
      setCancelling(true);
      await cancelAdminBooking(id);
      await loadBooking();
    } catch (err) {
      console.log(err);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-xl">Loading Booking...</div>
    );
  }

  if (!booking) {
    return <div className="py-32 text-center">Booking not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={
              isActive
                ? "/admin/bookings/current"
                : "/admin/bookings/history"
            }
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <h1 className="mt-3 text-3xl font-bold">Booking Details</h1>

          <p className="mt-1 text-gray-500">
            Booking ID : {booking.bookingId}
          </p>
        </div>

        <span
          className={`rounded-full px-5 py-2 font-semibold ${
            booking.status === "booked"
              ? "bg-green-100 text-green-700"
              : booking.status === "completed"
              ? "bg-blue-100 text-blue-700"
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
          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <div className="relative h-72">
              <Image
                src={
                  booking.roomId?.images?.length
                    ? booking.roomId.images[0]
                    : "/images/no-image.jpg"
                }
                alt={booking.roomId?.title || "Room"}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold">{booking.roomId?.title}</h2>
              <p className="mt-2 text-gray-500">{booking.roomId?.roomType}</p>
            </div>
          </div>

          {/* GUEST */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">Guest Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-gray-500">Customer</p>
                <p className="mt-1 font-semibold">{booking.customerName}</p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="mt-1 flex items-center gap-2 font-semibold">
                  <Phone size={18} />
                  {booking.phone}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="mt-1 flex items-center gap-2 font-semibold">
                  <Mail size={18} />
                  {booking.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Guests</p>
                <p className="mt-1 flex items-center gap-2 font-semibold">
                  <Users size={18} />
                  {booking.adults} Adults
                  {booking.children > 0 && ` • ${booking.children} Children`}
                </p>
              </div>
            </div>
          </div>

          {/* STAY */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">Stay Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-gray-500">Check In</p>
                <p className="mt-1 font-semibold">
                  {formatDateTime(booking.checkIn)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Check Out</p>
                <p className="mt-1 font-semibold">
                  {formatDateTime(booking.checkOut)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Nights</p>
                <p className="mt-1 font-semibold">{nights}</p>
              </div>

              <div>
                <p className="text-gray-500">Created</p>
                <p className="mt-1 font-semibold">
                  {formatDateTime(booking.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* SPECIAL REQUEST */}
          {booking.specialRequest && (
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-xl font-bold">Special Request</h2>
              <p className="text-gray-600 leading-7">
                {booking.specialRequest}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">Booking Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Room Price</span>
                <span>₹{booking.price?.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Nights</span>
                <span>{nights}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ₹
                  {(
                    booking.subtotal || booking.price * nights
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST ({booking.gstPercentage || 0}%)</span>
                <span>₹{(booking.gstAmount || 0).toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Status</span>
                <span
                  className={`font-semibold ${
                    booking.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.paymentStatus || "Pending"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Payment Method</span>
                <span>{booking.paymentMethod || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment ID</span>
                <span className="text-xs">{booking.paymentId || "-"}</span>
              </div>

              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-orange-600">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* ==========================================
                ACTION AREA - status based
            ========================================== */}

            <button
              onClick={handlePrint}
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
            >
              <Download size={18} />
              Download Invoice
            </button>

            {isActive ? (
              <button
                onClick={cancel}
                disabled={cancelling}
                className="mt-8 w-full rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {cancelling ? "Cancelling..." : "Cancel Booking"}
              </button>
            ) : booking.status === "completed" ? (
              <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-blue-50 py-3 font-semibold text-blue-700">
                <CheckCircle2 size={18} />
                Booking Completed
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-center gap-2 font-semibold text-red-700">
                  <XCircle size={18} />
                  Booking Cancelled
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cancelled By</span>
                    <span className="font-semibold capitalize">
                      {booking.cancelledBy === "admin"
                        ? "Admin"
                        : booking.cancelledBy === "user"
                        ? "Customer"
                        : "System"}
                    </span>
                  </div>

                  {booking.cancelledByUser && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cancelled User</span>
                      <span className="font-semibold">
                        {booking.cancelledByUser?.name || "-"}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-500">Cancelled At</span>
                    <span className="font-semibold">
                      {booking.cancelledAt
                        ? formatDateTime(booking.cancelledAt)
                        : "-"}
                    </span>
                  </div>

                  <div>
                    <p className="mb-1 text-gray-500">Reason</p>
                    <p className="rounded-lg border bg-white p-3 text-gray-700">
                      {booking.cancelReason || "-"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Off-screen, NOT display:none — react-to-print clones this node as-is,
          so a `hidden` (display:none) wrapper would print blank. Positioning
          it off-canvas keeps it out of the user's view but still renders. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-9999px",
          width: "0",
          height: "0",
          overflow: "hidden",
        }}
      >
        <div ref={invoiceRef}>
          <BookingInvoice booking={booking} />
        </div>
      </div>
    </div>
  );
}