"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BedDouble,
  CheckCircle2,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  LogIn,
  LogOut,
  Sparkles,
  Plus,
  CalendarDays,
  ArrowUpRight,
  Wallet,
  PieChart as PieChartIcon,
  Trophy,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { getDashboardStats } from "@/services/dashboard.service";
import { fetchBookings } from "@/services/booking.service";
import RecentPayments from "@/components/admin/dashboard/RecentPayments";
import TopCustomers from "@/components/admin/dashboard/TopCustomers";
import MonthlyRevenueChart from "@/components/admin/dashboard/MonthlyRevenueChart";
import BookingSourceChart from "@/components/admin/dashboard/BookingSourceChart";
import PaymentStatusChart from "@/components/admin/dashboard/PaymentStatusChart";

import TodayActivities from "@/components/admin/dashboard/TodayActivities";
import OccupancyCard from "@/components/admin/dashboard/OccupancyCard";


// ==========================
// HELPERS
// ==========================

const normalizeTrend = (trend) => {
  if (!Array.isArray(trend)) return [];

  return trend.map((point) => ({
    label:
      point.label ??
      point.month ??
      point.date ??
      point.day ??
      point._id ??
      "",
    revenue: Number(
      point.revenue ?? point.amount ?? point.total ?? point.value ?? 0
    ),
  }));
};

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const toDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const formatDate = (value) => {
  const d = toDate(value);
  if (!d) return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const ROOM_COLORS = {
  Available: "#22c55e",
  Booked: "#f97316",
  Blocked: "#eab308",
};

const BOOKING_STATUS_STYLES = {
  booked: "bg-green-100 text-green-700",
  checked_in: "bg-blue-100 text-blue-700",
  completed: "bg-purple-100 text-purple-700",
  checked_out: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-700",
  blocked: "bg-yellow-100 text-yellow-700",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
    blockedRooms: 0,
    revenue: 0,
    revenueTrend: [],
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    today: {
      newBookings: 0,
      checkIns: 0,
      checkOuts: 0,
      revenue: 0,
    },
    weeklyComparison: {
      thisWeek: { revenue: 0, bookings: 0 },
      lastWeek: { revenue: 0, bookings: 0 },
      percentChange: 0,
    },
    topRooms: [],
  });

  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const res = await getDashboardStats();
        const data = res.data?.data || res.data || {};

        setStats({
          totalRooms: data.totalRooms || 0,
          availableRooms: data.availableRooms || 0,
          bookedRooms: data.bookedRooms || 0,
          blockedRooms: data.blockedRooms || data.maintenanceRooms || 0,
          revenue: data.revenue || data.totalRevenue || 0,
          revenueTrend: data.revenueTrend || data.trend || [],
          totalBookings: data.totalBookings || 0,
          completedBookings: data.completedBookings || 0,
          cancelledBookings: data.cancelledBookings || 0,
          today: {
            newBookings: data.today?.newBookings || 0,
            checkIns: data.today?.checkIns || 0,
            checkOuts: data.today?.checkOuts || 0,
            revenue: data.today?.revenue || 0,
          },
          weeklyComparison: {
            thisWeek: {
              revenue: data.weeklyComparison?.thisWeek?.revenue || 0,
              bookings: data.weeklyComparison?.thisWeek?.bookings || 0,
            },
            lastWeek: {
              revenue: data.weeklyComparison?.lastWeek?.revenue || 0,
              bookings: data.weeklyComparison?.lastWeek?.bookings || 0,
            },
            percentChange: data.weeklyComparison?.percentChange || 0,
          },
          topRooms: data.topRooms || [],
        });
      } catch (error) {
        console.log("Dashboard Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecent = async () => {
      try {
        setRecentLoading(true);

        const res = await fetchBookings("all", 1, 5);
        const data = res.data?.data || res.data || [];

        setRecentBookings(data);
      } catch (error) {
        console.log("Recent bookings error:", error.message);
      } finally {
        setRecentLoading(false);
      }
    };

    fetchStats();
    fetchRecent();
  }, []);

  const trendData = useMemo(
    () => normalizeTrend(stats.revenueTrend),
    [stats.revenueTrend]
  );

  const roomData = useMemo(() => {
    const data = [
      { name: "Available", value: stats.availableRooms },
      { name: "Booked", value: stats.bookedRooms },
    ];

    if (stats.blockedRooms > 0) {
      data.push({ name: "Blocked", value: stats.blockedRooms });
    }

    return data.filter((d) => d.value > 0);
  }, [stats]);

  const occupancyRate =
    stats.totalRooms > 0
      ? Math.round((stats.bookedRooms / stats.totalRooms) * 100)
      : 0;

  const avgBookingValue =
    stats.completedBookings > 0
      ? Math.round(stats.revenue / stats.completedBookings)
      : 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-orange-600">
            {getGreeting()} 👋
          </p>
          <h1 className="mt-0.5 text-2xl sm:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="-mx-3.5 flex gap-2 overflow-x-auto px-3.5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Link
            href="/admin/bookings/check-in"
            className="flex shrink-0 items-center gap-1.5 rounded-full sm:rounded-2xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            <LogIn size={16} />
            Check-In
          </Link>
          <Link
            href="/admin/bookings/check-out"
            className="flex shrink-0 items-center gap-1.5 rounded-full sm:rounded-2xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            <LogOut size={16} />
            Check-Out
          </Link>
          <Link
            href="/admin/bookings/calender"
            className="flex shrink-0 items-center gap-1.5 rounded-full sm:rounded-2xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            <CalendarDays size={16} />
            Calendar
          </Link>
          <Link
            href="/admin/bookings/add"
            className="flex shrink-0 items-center gap-1.5 rounded-full sm:rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Plus size={16} />
            New Booking
          </Link>
        </div>
      </div>

      {/* TODAY SNAPSHOT */}
      <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-5 sm:p-7 text-white shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          <h2 className="font-bold">Today's Snapshot</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <TodayStat
            icon={<BedDouble size={18} />}
            iconBg="bg-blue-500/20 text-blue-300"
            label="New Bookings"
            value={loading ? "-" : stats.today.newBookings}
          />
          <TodayStat
            icon={<LogIn size={18} />}
            iconBg="bg-green-500/20 text-green-300"
            label="Check-Ins"
            value={loading ? "-" : stats.today.checkIns}
          />
          <TodayStat
            icon={<LogOut size={18} />}
            iconBg="bg-purple-500/20 text-purple-300"
            label="Check-Outs"
            value={loading ? "-" : stats.today.checkOuts}
          />
          <TodayStat
            icon={<IndianRupee size={18} />}
            iconBg="bg-amber-500/20 text-amber-300"
            label="Revenue"
            value={loading ? "-" : formatCurrency(stats.today.revenue)}
          />
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <StatCard
          icon={<BedDouble size={22} />}
          iconBg="bg-blue-50 text-blue-600"
          title="Total Rooms"
          value={loading ? "-" : stats.totalRooms}
        />

        <StatCard
          icon={<CheckCircle2 size={22} />}
          iconBg="bg-green-50 text-green-600"
          title="Occupancy Rate"
          value={loading ? "-" : `${occupancyRate}%`}
          footer={
            !loading && (
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
            )
          }
        />

        <StatCard
          icon={<Wallet size={22} />}
          iconBg="bg-purple-50 text-purple-600"
          title="Avg. Booking Value"
          value={loading ? "-" : formatCurrency(avgBookingValue)}
        />

        <StatCard
          icon={<IndianRupee size={22} />}
          iconBg="bg-orange-50 text-orange-600"
          title="Total Revenue"
          value={loading ? "-" : formatCurrency(stats.revenue)}
          footer={
            !loading && (
              <span className="text-xs font-medium text-gray-400">
                {stats.completedBookings} completed stays
              </span>
            )
          }
        />
      </div>

      {/* TODAY ACTIVITIES */}
      <TodayActivities />

      {/* CHARTS */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Revenue Trend</h2>
            <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              <TrendingUp size={13} />
              All time
            </div>
          </div>

          <RevenueChart data={trendData} loading={loading} />
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Room Distribution</h2>
            <PieChartIcon size={16} className="text-gray-400" />
          </div>

          <RoomChart data={roomData} loading={loading} />
        </div>
      </div>

      {/* MONTHLY REVENUE + BOOKING SOURCES */}
      <div className="grid gap-5 lg:grid-cols-2">
        <MonthlyRevenueChart />
        <BookingSourceChart />
      </div>

      {/* PAYMENT STATUS + OCCUPANCY */}
      <div className="grid gap-5 lg:grid-cols-2">
        <PaymentStatusChart />
        <OccupancyCard />
      </div>

      {/* WEEKLY COMPARISON + TOP ROOMS */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">
              This Week vs Last Week
            </h2>
            <TrendBadge percentChange={stats.weeklyComparison.percentChange} />
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center text-sm text-gray-400">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Last 7 Days</p>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.weeklyComparison.thisWeek.revenue)}
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  {stats.weeklyComparison.thisWeek.bookings} new bookings
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Previous 7 Days</p>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold text-gray-500">
                  {formatCurrency(stats.weeklyComparison.lastWeek.revenue)}
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  {stats.weeklyComparison.lastWeek.bookings} new bookings
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            <h2 className="font-bold text-gray-900">Top Performing Rooms</h2>
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center text-sm text-gray-400">
              Loading...
            </div>
          ) : stats.topRooms.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-center text-gray-400">
              <Trophy size={28} className="mb-2" />
              <p className="text-sm">No completed stays yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.topRooms.map((room, index) => (
                <div
                  key={room.roomId}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      index === 0
                        ? "bg-amber-100 text-amber-700"
                        : index === 1
                        ? "bg-gray-200 text-gray-600"
                        : index === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-white text-gray-400 border"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900">
                      {room.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {room.roomType || "Room"} · {room.bookings} bookings
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-orange-600">
                    {formatCurrency(room.revenue)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

  

      {/* RECENT PAYMENTS + TOP CUSTOMERS */}
      <div className="grid gap-5 lg:grid-cols-2">
        <RecentPayments />
        <TopCustomers />
      </div>

      {/* RECENT BOOKINGS */}
      <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
          <Link
            href="/admin/bookings/current"
            className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            View all
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {recentLoading ? (
          <div className="flex h-40 items-center justify-center text-sm text-gray-400">
            Loading...
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center text-center text-gray-400">
            <BedDouble size={28} className="mb-2" />
            <p className="text-sm">No bookings yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentBookings.map((b) => (
              <Link
                key={b._id}
                href={`/admin/bookings/${b._id}`}
                className="flex items-center justify-between gap-3 py-3.5 transition hover:bg-gray-50 -mx-2 px-2 rounded-xl"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-900">
                    {b.customerName}
                  </p>
                  <p className="truncate text-xs sm:text-sm text-gray-500">
                    {b.roomId?.title || "Deleted Room"} ·{" "}
                    {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden sm:block text-sm font-semibold text-gray-700">
                    {formatCurrency(b.price)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                      BOOKING_STATUS_STYLES[b.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {b.status?.replace("_", " ")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* STAT CARD */
function StatCard({ icon, iconBg, title, value, footer }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm transition hover:shadow-md">
      <div
        className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl ${iconBg}`}
      >
        {icon}
      </div>
      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">{title}</p>
      <h2 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">
        {value}
      </h2>
      {footer && <div className="mt-1">{footer}</div>}
    </div>
  );
}

/* TREND BADGE */
function TrendBadge({ percentChange }) {
  const isUp = percentChange > 0;
  const isDown = percentChange < 0;

  const colorClass = isUp
    ? "bg-green-50 text-green-700"
    : isDown
    ? "bg-red-50 text-red-700"
    : "bg-gray-100 text-gray-600";

  const Icon = isUp ? ArrowUp : isDown ? ArrowDown : Minus;

  return (
    <div
      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${colorClass}`}
    >
      <Icon size={13} />
      {Math.abs(percentChange)}%
    </div>
  );
}

/* TODAY STAT */
function TodayStat({ icon, iconBg, label, value }) {
  return (
    <div className="rounded-xl sm:rounded-2xl bg-white/[0.06] p-3.5 sm:p-4">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}
      >
        {icon}
      </div>
      <p className="mt-2.5 text-xs text-gray-400">{label}</p>
      <p className="mt-0.5 text-lg sm:text-xl font-bold">{value}</p>
    </div>
  );
}

/* REVENUE CHART */
function RevenueChart({ data, loading }) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        Loading chart...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center text-gray-400">
        <TrendingDown size={32} className="mb-2" />
        <p className="text-sm">No revenue data yet</p>
        <p className="mt-1 text-xs">Chart fills in as guests check out</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />

        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${v >= 1000 ? `${v / 1000}k` : v}`}
        />

        <Tooltip
          formatter={(value) => [formatCurrency(value), "Revenue"]}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #f0f0f0",
            fontSize: 13,
          }}
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#f97316"
          strokeWidth={2.5}
          fill="url(#revenueFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ROOM CHART */
function RoomChart({ data, loading }) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        Loading chart...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center text-gray-400">
        <BedDouble size={32} className="mb-2" />
        <p className="text-sm">No room data yet</p>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={95}
          paddingAngle={3}
          strokeWidth={0}
          label={({ name, value }) =>
            `${name} ${Math.round((value / total) * 100)}%`
          }
          labelLine={false}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={ROOM_COLORS[entry.name] || "#9ca3af"}
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(value, name) => [`${value} rooms`, name]}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #f0f0f0",
            fontSize: 13,
          }}
        />

        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}