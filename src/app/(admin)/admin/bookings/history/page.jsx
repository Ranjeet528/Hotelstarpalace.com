
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  History,
  IndianRupee,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Eye,
} from "lucide-react";

import { fetchBookings } from "@/services/booking.service";

// ===================================================
// DATE HELPERS
// ===================================================

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

const getNights = (checkIn, checkOut) => {
  const inDate = toDate(checkIn);
  const outDate = toDate(checkOut);
  if (!inDate || !outDate) return 1;

  const diff =
    (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24);

  return diff <= 0 ? 1 : Math.ceil(diff);
};

const calculateTotal = (booking) => {
  return (booking.price || 0) * getNights(booking.checkIn, booking.checkOut);
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// ===================================================
// COMPONENT
// ===================================================

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ===============================================
  // LOAD BOOKINGS
  // ===============================================

  const loadBookings = async (currentPage = 1) => {
    try {
      setLoading(true);

      const res = await fetchBookings("all", currentPage, 10);

      let data = res.data?.data || res.data || [];

      // Only completed & cancelled bookings
      data = data.filter((booking) =>
        ["completed", "cancelled"].includes(booking.status)
      );

      setBookings(data);
      setTotalPages(res.data?.pagination?.totalPages || 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings(page);
  }, [page]);

  // ===============================================
  // SEARCH + FILTER
  // ===============================================

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        booking.bookingId?.toLowerCase().includes(keyword) ||
        booking.customerName?.toLowerCase().includes(keyword) ||
        booking.phone?.includes(keyword);

      const matchStatus =
        statusFilter === "all" ? true : booking.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  // ===============================================
  // STATS
  // ===============================================

  const stats = useMemo(() => {
    const completed = filteredBookings.filter(
      (b) => b.status === "completed"
    ).length;

    const cancelled = filteredBookings.filter(
      (b) => b.status === "cancelled"
    ).length;

    const revenue = filteredBookings
      .filter((b) => b.status === "completed")
      .reduce((sum, booking) => sum + calculateTotal(booking), 0);

    return {
      total: filteredBookings.length,
      completed,
      cancelled,
      revenue,
    };
  }, [filteredBookings]);

  return (
    <div className="space-y-6">
      {/* ===========================================
          HEADER
      =========================================== */}
      <div className="rounded-3xl border bg-white shadow-sm p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/bookings/current"
                className="flex h-11 w-11 items-center justify-center rounded-xl border hover:bg-gray-50"
              >
                <ArrowLeft size={20} />
              </Link>

              <div>
                <h1 className="text-3xl font-bold">Booking History</h1>
                <p className="mt-1 text-gray-500">
                  Completed & Cancelled Bookings
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/bookings"
              className="rounded-xl bg-black px-5 py-3 font-medium text-white hover:opacity-90"
            >
              Current Bookings
            </Link>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Booking ID / Customer / Phone..."
              className="h-12 w-full rounded-xl border pl-12 pr-4 outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-12 rounded-xl border px-4 outline-none focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* ===========================================
          STATS
      =========================================== */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <History size={34} className="text-orange-600" />
          <p className="mt-4 text-gray-500">Total Records</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.total}</h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <CheckCircle2 size={34} className="text-green-600" />
          <p className="mt-4 text-gray-500">Completed</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.completed}</h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <XCircle size={34} className="text-red-600" />
          <p className="mt-4 text-gray-500">Cancelled</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.cancelled}</h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <IndianRupee size={34} className="text-blue-600" />
          <p className="mt-4 text-gray-500">Revenue</p>
          <h2 className="mt-2 text-3xl font-bold">
            ₹{stats.revenue.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* ===========================================
          LOADING
      =========================================== */}
      {loading ? (
        <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
          Loading Booking History...
        </div>
      ) : (
        <>
          {/* ===========================================
              MOBILE CARDS
          =========================================== */}
          <div className="grid gap-5 md:hidden">
            {filteredBookings.length === 0 ? (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                <History size={55} className="mx-auto text-gray-400" />
                <h2 className="mt-5 text-2xl font-bold">No Booking History</h2>
                <p className="mt-2 text-gray-500">
                  No completed or cancelled bookings found.
                </p>
              </div>
            ) : (
              filteredBookings.map((booking) => {
                const nights = getNights(booking.checkIn, booking.checkOut);
                const total = calculateTotal(booking);

                return (
                  <div
                    key={booking._id}
                    className="rounded-3xl border bg-white p-5 shadow-sm"
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-blue-600">
                          {booking.bookingId}
                        </p>
                        <h2 className="mt-1 text-lg font-bold">
                          {booking.customerName}
                        </h2>
                        <p className="text-sm text-gray-500">{booking.phone}</p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* DETAILS */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Room</p>
                        <p className="mt-1 font-semibold">
                          {booking.roomId?.title || "Deleted Room"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Guests</p>
                        <p className="mt-1 font-semibold">
                          {booking.adults}
                          {booking.children > 0 && ` + ${booking.children}`}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Check In</p>
                        <p className="mt-1 text-sm font-medium">
                          {formatDate(booking.checkIn)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Check Out</p>
                        <p className="mt-1 text-sm font-medium">
                          {formatDate(booking.checkOut)}
                        </p>
                      </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="mt-5 rounded-2xl bg-orange-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Nights</p>
                          <p className="font-bold">{nights}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Amount</p>
                          <p className="text-xl font-bold text-orange-600">
                            ₹{total.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ACTION */}
                    <div className="mt-5">
                      <Link
                        href={`/admin/bookings/${booking._id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                      >
                        <Eye size={18} />
                        View Booking
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ===========================================
              DESKTOP TABLE
          =========================================== */}
          <div className="hidden overflow-hidden rounded-3xl border bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">Booking</th>
                    <th className="px-6 py-4 text-left">Guest</th>
                    <th className="px-6 py-4 text-left">Room</th>
                    <th className="px-6 py-4 text-left">Stay</th>
                    <th className="px-6 py-4 text-center">Guests</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-16 text-center text-gray-500"
                      >
                        No booking history found.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => {
                      const total = calculateTotal(booking);

                      return (
                        <tr
                          key={booking._id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-5">
                            <p className="font-semibold text-blue-600">
                              {booking.bookingId}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {formatDateTime(booking.createdAt)}
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
                            <p className="font-semibold">
                              {booking.roomId?.title || "Deleted Room"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.roomId?.roomType}
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <p>{formatDate(booking.checkIn)}</p>
                            <p className="text-sm text-gray-500">
                              to {formatDate(booking.checkOut)}
                            </p>
                          </td>

                          <td className="px-6 py-5 text-center">
                            {booking.adults}
                            {booking.children > 0 && ` + ${booking.children}`}
                          </td>

                          <td className="px-6 py-5 text-right font-bold text-orange-600">
                            ₹{total.toLocaleString("en-IN")}
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex justify-center">
                              <Link
                                href={`/admin/bookings/${booking._id}`}
                                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                              >
                                <Eye size={16} />
                                View
                              </Link>
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

          {/* ===========================================
              PAGINATION
          =========================================== */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-xl border bg-white px-5 py-2 disabled:opacity-40 hover:bg-gray-50"
            >
              Previous
            </button>

            <div className="rounded-xl bg-gray-100 px-5 py-2 font-semibold">
              Page {page} / {totalPages}
            </div>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-xl border bg-white px-5 py-2 disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
