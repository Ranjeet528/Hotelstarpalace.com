"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Clock,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { getUserById } from "@/services/user.service";

// ==========================
// SMALL HELPERS
// ==========================

const formatDate = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  return isNaN(d) ? "-" : d.toLocaleDateString("en-IN");
};

const formatDateTime = (value) => {
  if (!value) return "Never";
  const d = new Date(value);
  return isNaN(d) ? "Never" : d.toLocaleString("en-IN");
};

const roleBadgeClass = (role) => {
  if (role === "superadmin") return "bg-purple-100 text-purple-700";
  if (role === "admin") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-700";
};

const paymentBadgeClass = (status) =>
  status === "paid"
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";

const statusBadgeClass = (status) => {
  if (status === "booked") return "bg-blue-100 text-blue-700";
  if (status === "checked_in") return "bg-green-100 text-green-700";
  if (status === "completed") return "bg-gray-200 text-gray-700";
  return "bg-red-100 text-red-700";
};

export default function UserDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});

  // ==========================
  // FETCH USER
  // ==========================
  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUserById(id);
      setUser(res.user);
      setBookings(res.bookings || []);
      setStats(res.stats || {});
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading this user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  // ==========================
  // LOADING STATE
  // ==========================
  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 p-6 text-gray-500 sm:p-10">
        <Loader2 size={28} className="animate-spin text-orange-500" />
        <p>Loading user details...</p>
      </div>
    );
  }

  // ==========================
  // ERROR STATE
  // ==========================
  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 p-6 text-center sm:p-10">
        <AlertTriangle size={28} className="text-red-500" />
        <p className="text-gray-700">{error}</p>
        <button
          onClick={fetchUser}
          className="mt-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Try again
        </button>
      </div>
    );
  }

  // ==========================
  // NOT FOUND STATE
  // ==========================
  if (!user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 p-6 text-center sm:p-10">
        <p className="text-lg font-semibold text-gray-700">User not found</p>
        <p className="text-sm text-gray-500">
          This user may have been removed or the link is incorrect.
        </p>
      </div>
    );
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">User Details</h1>
        <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
          View user profile and booking history.
        </p>
      </div>

      {/* ===================== */}
      {/* PROFILE CARD */}
      {/* ===================== */}
      <div className="rounded-2xl bg-white p-5 shadow sm:rounded-3xl sm:p-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left lg:gap-8">
          {/* Avatar */}
          <div
            className="
              flex
              h-20
              w-20
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-orange-500
              text-3xl
              font-bold
              text-white
              sm:h-28
              sm:w-28
              sm:text-4xl
            "
          >
            {initial}
          </div>

          {/* Details */}
          <div className="grid w-full flex-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <div className="mt-1.5 flex items-center justify-center gap-2 sm:justify-start">
                <User size={18} className="shrink-0" />
                <span className="break-words font-semibold">
                  {user.name || "-"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <div className="mt-1.5 flex items-center justify-center gap-2 sm:justify-start">
                <Mail size={18} className="shrink-0" />
                <span className="break-all">{user.email || "-"}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <div className="mt-1.5 flex items-center justify-center gap-2 sm:justify-start">
                <Phone size={18} className="shrink-0" />
                <span>{user.phone || "-"}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <div className="mt-1.5 flex items-center justify-center gap-2 sm:justify-start">
                <Shield size={18} className="shrink-0" />
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${roleBadgeClass(
                    user.role
                  )}`}
                >
                  {user.role || "user"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <div className="mt-1.5 flex items-center justify-center gap-2 sm:justify-start">
                <Calendar size={18} className="shrink-0" />
                <span>{formatDate(user.createdAt)}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <div className="mt-1.5 flex items-center justify-center gap-2 sm:justify-start">
                <Clock size={18} className="shrink-0" />
                <span>{formatDateTime(user.lastLogin)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* STATS */}
      {/* ===================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <div className="rounded-2xl bg-white p-5 shadow sm:rounded-3xl sm:p-6">
          <p className="text-sm text-gray-500 sm:text-base">Total Bookings</p>
          <h2 className="mt-2 text-3xl font-bold text-orange-600 sm:mt-3 sm:text-4xl">
            {stats.totalBookings || 0}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow sm:rounded-3xl sm:p-6">
          <p className="text-sm text-gray-500 sm:text-base">Total Nights</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600 sm:mt-3 sm:text-4xl">
            {stats.totalNights || 0}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow sm:rounded-3xl sm:p-6">
          <p className="text-sm text-gray-500 sm:text-base">Total Spent</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600 sm:mt-3 sm:text-4xl">
            ₹{(stats.totalSpent || 0).toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* ===================== */}
      {/* BOOKING HISTORY */}
      {/* ===================== */}
      <div className="overflow-hidden rounded-2xl bg-white shadow sm:rounded-3xl">
        <div className="border-b p-5 sm:p-6">
          <h2 className="text-xl font-bold sm:text-2xl">Booking History</h2>
        </div>

        {bookings.length === 0 ? (
          <div className="py-16 text-center text-gray-500 sm:py-20">
            No bookings found.
          </div>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="divide-y sm:hidden">
              {bookings.map((booking) => (
                <div key={booking._id} className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{booking.bookingId}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    {booking.roomId?.title || "-"}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{formatDate(booking.checkIn)}</span>
                    <span>→</span>
                    <span>{formatDate(booking.checkOut)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600">
                      ₹{booking.totalAmount}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentBadgeClass(
                        booking.paymentStatus
                      )}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left">Booking ID</th>
                    <th className="px-6 py-4 text-center">Room</th>
                    <th className="px-6 py-4 text-center">Check In</th>
                    <th className="px-6 py-4 text-center">Check Out</th>
                    <th className="px-6 py-4 text-center">Amount</th>
                    <th className="px-6 py-4 text-center">Payment</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-5 font-semibold">
                        {booking.bookingId}
                      </td>

                      <td className="px-6 py-5 text-center">
                        {booking.roomId?.title || "-"}
                      </td>

                      <td className="px-6 py-5 text-center">
                        {formatDate(booking.checkIn)}
                      </td>

                      <td className="px-6 py-5 text-center">
                        {formatDate(booking.checkOut)}
                      </td>

                      <td className="px-6 py-5 text-center font-semibold text-green-600">
                        ₹{booking.totalAmount}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentBadgeClass(
                            booking.paymentStatus
                          )}`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}