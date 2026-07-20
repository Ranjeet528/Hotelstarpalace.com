"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  BedDouble,
  IndianRupee,
  Users,
  LogIn,
  LogOut,
  History,
  Plus,
} from "lucide-react";

import {
  fetchBookings,
  cancelAdminBooking,
} from "@/services/booking.service";

// ==========================
// SAFE DATE HELPERS
// ==========================
// Handles: missing values, invalid date strings, and epoch numbers.
// Always returns a display-safe string instead of "Invalid Date".

const toDate = (value) => {
  if (!value) return null;

  const d = new Date(value);

  return isNaN(d.getTime()) ? null : d;
};

const formatDate = (value) => {
  const d = toDate(value);

  if (!d) return "-";

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getNights = (checkIn, checkOut) => {
  const inDate = toDate(checkIn);
  const outDate = toDate(checkOut);

  if (!inDate || !outDate) return 1;

  const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);

  return diff > 0 ? Math.ceil(diff) : 1;
};

export default function CurrentBookings() {
  const [bookings, setBookings] = useState([]);

  // ==========================
  // SEARCH & FILTER
  // ==========================
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roomFilter, setRoomFilter] = useState("all");

  // ==========================
  // LOAD BOOKINGS
  // ==========================
  // "Current Bookings" should show every stay that hasn't checked out
  // yet — that includes both "booked" (arriving) and "checked_in"
  // (currently staying) guests. Only checked_out/completed/cancelled
  // bookings should disappear from here (they belong in History).
  const ACTIVE_STATUSES = ["booked", "checked_in"];

  const load = async () => {
    try {
      const res = await fetchBookings("all");
      const allData = res.data?.data || res.data || [];

      const data = allData.filter((b) => ACTIVE_STATUSES.includes(b.status));

      // Debug helper: if dates are still missing after this fix,
      // check the console to see the actual shape of a booking object
      // returned by your API (field name might differ, e.g. checkInDate).
      if (data[0]) {
        console.log("Sample booking object:", data[0]);
      }

      setBookings(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ==========================
  // CANCEL BOOKING
  // ==========================
  const cancel = async (id) => {
    const ok = confirm("Are you sure you want to cancel this booking?");

    if (!ok) return;

    try {
      await cancelAdminBooking(id);
      load();
    } catch (err) {
      console.log(err.message);
    }
  };

  // ==========================
  // FILTERED BOOKINGS
  // ==========================
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        booking.bookingId?.toLowerCase().includes(keyword) ||
        booking.customerName?.toLowerCase().includes(keyword) ||
        booking.phone?.includes(keyword);

      const matchStatus =
        statusFilter === "all" ? true : booking.status === statusFilter;

      const matchRoom =
        roomFilter === "all" ? true : booking.roomId?._id === roomFilter;

      return matchSearch && matchStatus && matchRoom;
    });
  }, [bookings, search, statusFilter, roomFilter]);

  // ==========================
  // DASHBOARD STATS
  // ==========================
  const stats = useMemo(() => {
    const today = new Date().toDateString();

    const active = bookings.length;

    const checkIns = bookings.filter((booking) => {
      const d = toDate(booking.checkIn);
      return d && d.toDateString() === today;
    }).length;

    const checkOuts = bookings.filter((booking) => {
      const d = toDate(booking.checkOut);
      return d && d.toDateString() === today;
    }).length;

    const revenue = bookings.reduce((sum, booking) => {

  const nights = getNights(
    booking.checkIn,
    booking.checkOut
  );

  const roomAmount =
    (booking.price || 0) * nights;

  return sum +
    (booking.totalAmount || roomAmount);

}, 0);

    return { active, checkIns, checkOuts, revenue };
  }, [bookings]);

  // ==========================
  // UNIQUE ROOMS
  // ==========================
  const rooms = useMemo(() => {
    const map = new Map();

    bookings.forEach((booking) => {
      if (booking.roomId) {
        map.set(booking.roomId._id, booking.roomId);
      }
    });

    return [...map.values()];
  }, [bookings]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* =========================
          HEADER
      ========================== */}
      <div className="lg:sticky lg:top-20 z-20 rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-3.5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between lg:block">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                Current Bookings
              </h1>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-base text-gray-500">
                Manage all active hotel bookings
              </p>
            </div>

            {/* +Booking stays next to the title on mobile so the pill
                row below is reserved for navigation only */}
            <Link
              href="/admin/bookings/add"
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-black px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 lg:hidden"
            >
              <Plus size={15} />
              Booking
            </Link>
          </div>

          {/* NAV PILLS — single-line horizontal scroll on mobile,
              wraps normally from sm/lg up */}
          <div className="-mx-3.5 flex gap-2 overflow-x-auto px-3.5 pb-1 sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow sm:rounded-2xl sm:px-6 sm:py-3">
              <BedDouble size={16} className="sm:hidden" />
              Current
            </div>

            <Link
              href="/admin/bookings/check-in"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 transition hover:bg-gray-200 sm:rounded-2xl sm:px-6 sm:py-3"
            >
              <LogIn size={16} />
              Check-In
            </Link>

            <Link
              href="/admin/bookings/check-out"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 transition hover:bg-gray-200 sm:rounded-2xl sm:px-6 sm:py-3"
            >
              <LogOut size={16} />
              Check-Out
            </Link>

            <Link
              href="/admin/bookings/calender"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 transition hover:bg-gray-200 sm:rounded-2xl sm:px-6 sm:py-3"
            >
              <CalendarDays size={16} />
              Calendar
            </Link>

            <Link
              href="/admin/bookings/history"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 transition hover:bg-gray-200 sm:rounded-2xl sm:px-6 sm:py-3"
            >
              <History size={16} />
              History
            </Link>

            <Link
              href="/admin/bookings/add"
              className="hidden shrink-0 items-center gap-1.5 rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:flex"
            >
              <Plus size={16} />
              Booking
            </Link>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mt-3 sm:mt-6 grid gap-2.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Booking ID / Customer / Phone..."
              className="h-10 sm:h-12 w-full rounded-xl border pl-10 sm:pl-12 pr-4 text-sm sm:text-base outline-none transition focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:contents">
            {/* ROOM */}
            <select
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="h-10 sm:h-12 w-full rounded-xl border px-3 sm:px-4 text-sm sm:text-base outline-none focus:border-orange-500"
            >
              <option value="all">All Rooms</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.title}
                </option>
              ))}
            </select>

            {/* STATUS */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 sm:h-12 w-full rounded-xl border px-3 sm:px-4 text-sm sm:text-base outline-none focus:border-orange-500"
            >
              <option value="all">All Status</option>
              <option value="booked">Booked</option>
              <option value="checked_in">Checked In</option>
            </select>
          </div>
        </div>
      </div>

      {/* =========================
          DASHBOARD CARDS
      ========================== */}
      <div className="-mx-3.5 flex gap-3 overflow-x-auto px-3.5 pb-1 sm:mx-0 sm:grid sm:gap-5 sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="w-[46%] shrink-0 rounded-2xl border bg-white p-4 shadow-sm sm:w-auto sm:rounded-3xl sm:p-6">
          <Users size={26} className="text-blue-600 sm:hidden" />
          <Users size={34} className="hidden text-blue-600 sm:block" />
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-gray-500">
            Active Bookings
          </p>
          <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold">
            {stats.active}
          </h2>
        </div>

        <div className="w-[46%] shrink-0 rounded-2xl border bg-white p-4 shadow-sm sm:w-auto sm:rounded-3xl sm:p-6">
          <CalendarDays size={26} className="text-green-600 sm:hidden" />
          <CalendarDays
            size={34}
            className="hidden text-green-600 sm:block"
          />
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-gray-500">
            Today's Check-In
          </p>
          <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold">
            {stats.checkIns}
          </h2>
        </div>

        <div className="w-[46%] shrink-0 rounded-2xl border bg-white p-4 shadow-sm sm:w-auto sm:rounded-3xl sm:p-6">
          <BedDouble size={26} className="text-purple-600 sm:hidden" />
          <BedDouble
            size={34}
            className="hidden text-purple-600 sm:block"
          />
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-gray-500">
            Today's Check-Out
          </p>
          <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold">
            {stats.checkOuts}
          </h2>
        </div>

        <div className="w-[46%] shrink-0 rounded-2xl border bg-white p-4 shadow-sm sm:w-auto sm:rounded-3xl sm:p-6">
          <IndianRupee size={26} className="text-orange-600 sm:hidden" />
          <IndianRupee
            size={34}
            className="hidden text-orange-600 sm:block"
          />
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-gray-500">
            Expected Revenue
          </p>
          <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold break-all">
            ₹{stats.revenue.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* MOBILE + TABLET (cards) */}
      <div className="grid gap-3 sm:gap-4 md:hidden">
        {filteredBookings.length === 0 ? (
          <div className="rounded-2xl sm:rounded-3xl bg-white p-8 sm:p-10 text-center shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold">
              No Bookings Found
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Try changing search or filters.
            </p>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const nights = getNights(b.checkIn, b.checkOut);
           const roomAmount =
  (b.price || 0) * nights;

const total =
  b.totalAmount ||
  roomAmount;

            return (
              <div
                key={b._id}
                className="rounded-2xl sm:rounded-3xl border bg-white p-4 sm:p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold truncate">
                      {b.customerName}
                    </h2>
                    <p className="text-sm text-gray-500">{b.phone}</p>
                    <p className="mt-1 text-xs font-medium text-blue-600">
                      {b.bookingId}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      b.status === "booked"
                        ? "bg-green-100 text-green-700"
                        : b.status === "checked_in"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl sm:rounded-2xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Room</p>
                    <p className="mt-1 font-semibold truncate">
                      {b.roomId?.title}
                    </p>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Guests</p>
                    <p className="mt-1 font-semibold">
                      {b.adults} Adult{b.adults > 1 ? "s" : ""}
                      {b.children > 0 && ` • ${b.children} Child`}
                    </p>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Check In</p>
                    <p className="mt-1 font-medium">{formatDate(b.checkIn)}</p>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Check Out</p>
                    <p className="mt-1 font-medium">
                      {formatDate(b.checkOut)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl sm:rounded-2xl bg-orange-50 p-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-lg sm:text-xl font-bold text-orange-600">
                      ₹{total.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/bookings/${b._id}`}
                      className="rounded-xl bg-blue-500 px-4 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => cancel(b._id)}
                      className="rounded-xl bg-red-500 px-4 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DESKTOP (table) */}
      <div className="hidden overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold">
                  Booking
                </th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold">
                  Guest
                </th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold">
                  Room
                </th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold">
                  Stay
                </th>
                <th className="px-4 lg:px-6 py-4 text-center text-sm font-semibold">
                  Guests
                </th>
                <th className="px-4 lg:px-6 py-4 text-right text-sm font-semibold">
                  Amount
                </th>
                <th className="px-4 lg:px-6 py-4 text-center text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-4 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const nights = getNights(b.checkIn, b.checkOut);
                 const roomAmount =
  (b.price || 0) * nights;

const total =
  b.totalAmount ||
  roomAmount;

                  return (
                    <tr
                      key={b._id}
                      className="border-b transition hover:bg-orange-50"
                    >
                      <td className="px-4 lg:px-6 py-5">
                        <p className="font-semibold text-blue-600">
                          {b.bookingId}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatDate(b.createdAt)}
                        </p>
                      </td>

                      <td className="px-4 lg:px-6 py-5">
                        <p className="font-semibold">{b.customerName}</p>
                        <p className="text-sm text-gray-500">{b.phone}</p>
                      </td>

                      <td className="px-4 lg:px-6 py-5">
                        <p className="font-semibold">{b.roomId?.title}</p>
                        <p className="text-sm text-gray-500">
                          {b.roomId?.roomType}
                        </p>
                      </td>

                      <td className="px-4 lg:px-6 py-5">
                        <p>{formatDate(b.checkIn)}</p>
                        <p className="text-sm text-gray-500">
                          to {formatDate(b.checkOut)}
                        </p>
                      </td>

                      <td className="px-4 lg:px-6 py-5 text-center">
                        {b.adults}
                        {b.children > 0 && ` + ${b.children}`}
                      </td>

                      <td className="px-4 lg:px-6 py-5 text-right font-bold text-orange-600">
                        ₹{total.toLocaleString("en-IN")}
                      </td>

                      <td className="px-4 lg:px-6 py-5 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            b.status === "booked"
                              ? "bg-green-100 text-green-700"
                              : b.status === "checked_in"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>

                      <td className="px-4 lg:px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/bookings/${b._id}`}
                            className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                          >
                            View
                          </Link>

                          <button
                            onClick={() => cancel(b._id)}
                            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}