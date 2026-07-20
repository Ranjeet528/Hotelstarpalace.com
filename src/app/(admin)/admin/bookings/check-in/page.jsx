"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  BedDouble,
  User,
  Phone,
  Clock,
} from "lucide-react";

import {
  fetchBookings,
  checkInBooking,
} from "@/services/booking.service";

export default function CheckInPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ==============================
  // LOAD BOOKINGS (today only)
  // ==============================
  const loadBookings = async () => {
    try {
      setLoading(true);

      const res = await fetchBookings("booked");

     const data = res.data || [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

const todayBookings = data.filter((booking) => {
  const now = new Date();

  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);

  return (
    booking.status === "booked" &&
    checkIn <= now &&
    checkOut > now
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

  // ==============================
  // SEARCH FILTER
  // ==============================
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

  // ==============================
  // CHECK IN
  // ==============================
  const handleCheckIn = async (id) => {
    const ok = confirm("Confirm guest check-in?");

    if (!ok) return;

    try {
      await checkInBooking(id);

      alert("Guest Checked In ✅");

      loadBookings();
    } catch (err) {
      console.log(err);

      alert(err?.response?.data?.message || "Check-In Failed");
    }
  };

  // ==============================
  // STATS
  // ==============================
  const stats = {
    total: filteredBookings.length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-3xl bg-white border shadow-sm p-6">
        <h1 className="text-3xl font-bold">Today's Check-In</h1>

        <p className="text-gray-500 mt-1">Guests arriving today</p>

        {/* SEARCH */}
        <div className="relative mt-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Booking ID / Name / Phone"
            className="w-full h-12 rounded-xl border pl-12 pr-4 outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* CARD */}
      <div className="rounded-3xl bg-white border shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Today's Arrivals</h2>

          <div className="rounded-xl bg-green-100 px-4 py-2 text-green-700 font-semibold">
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
            <CalendarDays size={55} className="mx-auto text-gray-400" />

            <h2 className="mt-5 text-2xl font-bold">No Check-In Today</h2>

            <p className="mt-2 text-gray-500">
              There are no guests arriving today.
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
                      <p className="text-xs text-blue-600 font-semibold">
                        {booking.bookingId}
                      </p>

                      <h2 className="mt-1 text-lg font-bold">
                        {booking.customerName}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {booking.phone}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      BOOKED
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
                        {new Date(booking.checkIn).toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Room Price</p>

                      <p className="mt-1 font-semibold text-orange-600">
                        ₹{booking.price}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCheckIn(booking._id)}
                    className="mt-5 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                  >
                    Check In Guest
                  </button>
                </div>
              ))}
            </div>

            {/* =========================
                  DESKTOP TABLE
            ========================= */}
            <div className="hidden overflow-hidden rounded-3xl border bg-white shadow-sm md:block mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left">Booking ID</th>
                      <th className="px-6 py-4 text-left">Guest</th>
                      <th className="px-6 py-4 text-left">Phone</th>
                      <th className="px-6 py-4 text-left">Room</th>
                      <th className="px-6 py-4 text-left">Guests</th>
                      <th className="px-6 py-4 text-left">Check-In</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-5 font-semibold text-blue-600">
                          {booking.bookingId}
                        </td>

                        <td className="px-6 py-5">
                          {booking.customerName}
                        </td>

                        <td className="px-6 py-5">{booking.phone}</td>

                        <td className="px-6 py-5">
                          {booking.roomId?.title}
                        </td>

                        <td className="px-6 py-5">
                          {booking.adults}
                          {booking.children > 0 &&
                            ` + ${booking.children}`}
                        </td>

                        <td className="px-6 py-5">
                          {new Date(booking.checkIn).toLocaleString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => handleCheckIn(booking._id)}
                            className="rounded-xl bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
                          >
                            Check In
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