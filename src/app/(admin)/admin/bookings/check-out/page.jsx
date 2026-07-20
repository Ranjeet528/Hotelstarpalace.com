"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, CalendarCheck } from "lucide-react";

import {
  fetchBookings,
  checkOutBooking,
} from "@/services/booking.service";

export default function CheckOutPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ==========================
  // LOAD BOOKINGS (today's checkouts only)
  // ==========================
  const loadBookings = async () => {
    try {
      setLoading(true);

      const res = await fetchBookings("checked_in");
      console.log("API RESPONSE:", res);

    const data = res.data || [];
    console.log("BOOKINGS DATA:", data);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const todayBookings = data.filter((booking) => {
        const checkOut = new Date(booking.checkOut);

        return (
          checkOut >= today &&
          checkOut < tomorrow &&
          booking.status === "checked_in"
        );
      });

      setBookings(todayBookings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // ==========================
  // SEARCH FILTER
  // ==========================
  const filteredBookings = useMemo(() => {
    const keyword = search.toLowerCase();

    return bookings.filter((booking) => {
      return (
        booking.bookingId?.toLowerCase().includes(keyword) ||
        booking.customerName?.toLowerCase().includes(keyword) ||
        booking.phone?.includes(keyword)
      );
    });
  }, [bookings, search]);

  // ==========================
  // CHECK OUT
  // ==========================
  const handleCheckOut = async (id) => {
    const ok = confirm("Confirm guest check-out?");

    if (!ok) return;

    try {
      await checkOutBooking(id);

      alert("Guest Checked Out Successfully ✅");

      loadBookings();
    } catch (err) {
      console.log(err);

      alert(err?.response?.data?.message || "Checkout Failed");
    }
  };

  const stats = {
    total: filteredBookings.length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Today's Check-Out</h1>

        <p className="mt-1 text-gray-500">Guests leaving today</p>

        <div className="relative mt-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Booking ID / Customer / Phone"
            className="h-12 w-full rounded-xl border pl-12 pr-4 outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* CARD */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Today's Departures</h2>

          <div className="rounded-xl bg-red-100 px-4 py-2 font-semibold text-red-700">
            {stats.total} Guests
          </div>
        </div>

        {/* =========================
              LOADING / EMPTY
        ========================= */}
        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            Loading...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <CalendarCheck size={55} className="mx-auto text-gray-400" />

            <h2 className="mt-5 text-2xl font-bold">No Check-Out Today</h2>

            <p className="mt-2 text-gray-500">
              There are no guests leaving today.
            </p>
          </div>
        ) : (
          <>
            {/* =========================
                  MOBILE
            ========================= */}
            <div className="grid gap-5 md:hidden mt-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-3xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-blue-600">
                        {booking.bookingId}
                      </p>

                      <h2 className="mt-1 text-lg font-bold">
                        {booking.customerName}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {booking.phone}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      CHECKED IN
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Room</p>

                      <p className="mt-1 font-semibold">
                        {booking.roomId?.title}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Guests</p>

                      <p className="mt-1 font-semibold">
                        {booking.adults}
                        {booking.children > 0 &&
                          ` + ${booking.children}`}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Check-In</p>

                      <p className="mt-1 font-medium">
                        {new Date(
                          booking.checkIn
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Check-Out</p>

                      <p className="mt-1 font-medium">
                        {new Date(
                          booking.checkOut
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-orange-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Amount</p>

                        <p className="text-xl font-bold text-orange-600">
                          ₹{booking.price?.toLocaleString("en-IN") ?? 0}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCheckOut(booking._id)}
                        className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                      >
                        Check Out
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* =========================
                  DESKTOP
            ========================= */}
            <div className="hidden overflow-hidden rounded-3xl border bg-white shadow-sm md:block mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="px-6 py-4 text-left">Booking</th>
                      <th className="px-6 py-4 text-left">Guest</th>
                      <th className="px-6 py-4 text-left">Room</th>
                      <th className="px-6 py-4 text-left">Check In</th>
                      <th className="px-6 py-4 text-left">Check Out</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-semibold text-blue-600">
                            {booking.bookingId}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-semibold">
                            {booking.customerName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {booking.phone}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          {booking.roomId?.title}
                        </td>

                        <td className="px-6 py-5">
                          {new Date(booking.checkIn).toLocaleString()}
                        </td>

                        <td className="px-6 py-5">
                          {new Date(booking.checkOut).toLocaleString()}
                        </td>

                        <td className="px-6 py-5 text-right font-bold text-orange-600">
                          ₹{booking.price?.toLocaleString("en-IN") ?? 0}
                        </td>

                        <td className="px-6 py-5 text-center">
                          <button
                            onClick={() => handleCheckOut(booking._id)}
                            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
                          >
                            Check Out
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}