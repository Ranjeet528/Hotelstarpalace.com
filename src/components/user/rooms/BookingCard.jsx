"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, CreditCard, Loader2 } from "lucide-react";
import { checkAvailability } from "@/services/booking.service";

export default function BookingCard({ room, settings }) {
  const isUnavailable =
    !settings?.bookingEnabled ||
    room?.status === "unavailable" ||
    room?.isCurrentlyBlocked;

  const today = new Date().toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);
  const [message, setMessage] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const totalGuests = adults + children;
  const capacityExceeded = totalGuests > (room?.capacity || 2);

  const totalPrice = (room?.price || 0) * (nights || 1);
  const gstPercentage = settings?.gstPercentage || 0;
  const gstAmount = (totalPrice * gstPercentage) / 100;
  const grandTotal = totalPrice + gstAmount;

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) {
      setMessage("Please select check-in and check-out date.");
      setAvailable(false);
      return;
    }

    if (capacityExceeded) {
      setMessage(`Maximum ${room.capacity} guests allowed.`);
      setAvailable(false);
      return;
    }

    try {
      setChecking(true);
      setMessage("");

      const res = await checkAvailability({
        roomId: room._id,
        checkIn,
        checkOut,
      });

      if (res.available) {
        setAvailable(true);
        setMessage("Room is available");
      } else {
        setAvailable(false);
        setMessage("Room is not available for selected dates.");
      }
    } catch (err) {
      console.log(err);
      setAvailable(false);
      setMessage(err?.response?.data?.message || "Unable to check availability.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-2xl border bg-white p-4 shadow-lg ring-1 ring-black/5 lg:p-5">
        <div className="border-b pb-3">
          <p className="text-sm text-gray-500">Starting From</p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-yellow-500">
            ₹{room?.price}
            <span className="text-base font-medium text-gray-500"> / Night</span>
          </h2>

          {isUnavailable && (
            <div className="mt-3 rounded-xl bg-red-50 px-3 py-2">
              <p className="text-center text-sm font-semibold text-red-600">
                Room currently unavailable
              </p>
            </div>
          )}

          {!settings?.bookingEnabled && (
            <div className="mt-3 rounded-xl bg-red-100 px-3 py-2">
              <p className="text-center text-sm font-semibold text-red-600">
                Online booking is temporarily unavailable.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800">
              Check In
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5">
              <CalendarDays size={17} className="shrink-0 text-yellow-500" />
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setAvailable(null);
                  setMessage("");
                }}
                disabled={isUnavailable}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800">
              Check Out
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5">
              <CalendarDays size={17} className="shrink-0 text-yellow-500" />
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setAvailable(null);
                  setMessage("");
                }}
                disabled={isUnavailable || !checkIn}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-800">
                Adults
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                disabled={isUnavailable}
                className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none"
              >
                {Array.from(
                  { length: room?.capacity || 2 },
                  (_, i) => i + 1
                ).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-800">
                Children
              </label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none"
              >
                {Array.from(
                  { length: (settings?.maxChildren || 2) + 1 },
                  (_, i) => i
                ).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-b from-gray-50 to-white p-4 ring-1 ring-gray-100">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Guests</span>
                <span className="font-medium text-gray-900">{totalGuests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights</span>
                <span className="font-medium text-gray-900">{nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room Price</span>
                <span className="font-medium text-gray-900">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST ({gstPercentage}%)</span>
                <span className="font-medium text-gray-900">
                  ₹{gstAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <span className="text-sm font-semibold text-gray-800">Total</span>
              <span className="text-lg font-bold text-green-600">
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {capacityExceeded && (
            <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">
              Maximum {room.capacity} guests allowed.
            </p>
          )}

          {message && (
            <div
              className={`rounded-xl px-3 py-2 text-sm font-medium ${
                available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {settings?.hotelNotice && (
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-2.5">
              <h4 className="text-sm font-semibold text-gray-900">
                Important Notice
              </h4>
              <p className="mt-1 text-sm leading-5 text-gray-700">
                {settings.hotelNotice}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={handleCheckAvailability}
              disabled={
                checking ||
                isUnavailable ||
                capacityExceeded ||
                !checkIn ||
                !checkOut
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checking ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Checking...
                </>
              ) : (
                <>
                  <CalendarDays size={18} />
                  Check Availability
                </>
              )}
            </button>

            {available && (
              <Link
                href={
                  `/booking?room=${room?._id}` +
                  `&checkIn=${checkIn}` +
                  `&checkOut=${checkOut}` +
                  `&adults=${adults}` +
                  `&children=${children}` +
                  `&price=${room.price}` +
                  `&nights=${nights}` +
                  `&gstPercentage=${gstPercentage}` +
                  `&gstAmount=${gstAmount}` +
                  `&totalAmount=${grandTotal}`
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-gray-900 transition hover:bg-yellow-600"
              >
                <CreditCard size={18} />
                Continue Booking
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}