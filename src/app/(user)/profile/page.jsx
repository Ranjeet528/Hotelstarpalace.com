"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  ArrowLeft,
  BadgeCheck,
  Clock,
  Crown,
  CalendarCheck2,
} from "lucide-react";
import { Cinzel } from "next/font/google";

import { useAuth } from "@/context/AuthContext";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const [stats, setStats] = useState({
    total: null,
    upcoming: null,
  });

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API}/bookings/my-bookings`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data.success) {
          const now = new Date();
          const upcoming = data.bookings.filter(
            (b) =>
              new Date(b.checkOut) >= now &&
              !["cancelled", "completed"].includes(b.status)
          ).length;

          setStats({ total: data.bookings.length, upcoming });
        }
      } catch (err) {
        console.log("Profile stats fetch error:", err);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f3]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#C9A227]/25 border-t-[#C9A227]" />
          <p className="text-sm uppercase tracking-[0.2em] text-[#8A6B12]">
            Loading Profile
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#faf8f3] px-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A227]/10">
          <ShieldCheck size={28} className="text-[#8A6B12]" />
        </div>

        <h2 className={`${cinzel.className} text-2xl text-[#1C1712]`}>
          Please Login First
        </h2>

        <p className="text-gray-500 max-w-sm">
          Sign in to view your profile, saved details and booking history.
        </p>

        <Link
          href="/login"
          className="mt-2 rounded-full bg-gradient-to-b from-[#E8C766] to-[#C9A227] px-8 py-3 text-sm font-semibold uppercase tracking-[0.05em] text-[#1C1712] shadow-[0_4px_16px_rgba(201,162,39,0.35)] transition hover:-translate-y-0.5"
        >
          Login
        </Link>
      </div>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "—";

  const isStaff = user.role === "admin" || user.role === "superadmin";

  return (
    <main className="min-h-screen bg-[#faf8f3] pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto px-5">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#8A6B12] mb-6 sm:mb-8 transition hover:text-[#C9A227]"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-[#C9A227]/20 bg-white shadow-xl">
          {/* Cover */}
          <div className="relative h-36 sm:h-44 bg-gradient-to-r from-[#8A6B12] via-[#C9A227] to-[#E8C766]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 14px)",
              }}
            />
          </div>

          <div className="px-5 sm:px-10 pb-8 sm:pb-10">
            {/* Avatar + identity row */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 -mt-14 sm:-mt-16">
              <div className="h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-full bg-white p-1.5 shadow-lg">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-[#E8C766] to-[#C9A227] text-4xl font-semibold text-white">
                    {user.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-0 sm:pb-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1
                    className={`${cinzel.className} text-2xl sm:text-3xl text-[#1C1712]`}
                  >
                    {user.name}
                  </h1>

                  {isStaff && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#1C1712] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#E8C766]">
                      <Crown size={12} />
                      {user.role}
                    </span>
                  )}
                </div>

                <div className="mt-1.5 flex items-center gap-2">
                  <span className="h-px w-4 bg-[#C9A227]" />
                  <p className="text-xs uppercase tracking-[0.25em] text-[#8A6B12]">
                    Luxury Member · Hotel Star Palace
                  </p>
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <StatChip
                icon={<CalendarCheck2 size={18} />}
                label="Total Bookings"
                value={stats.total ?? "—"}
              />
              <StatChip
                icon={<Clock size={18} />}
                label="Upcoming Stays"
                value={stats.upcoming ?? "—"}
              />
              <div className="col-span-2 sm:col-span-1">
                <StatChip
                  icon={<CalendarDays size={18} />}
                  label="Member Since"
                  value={memberSince}
                />
              </div>
            </div>

            {/* Details */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ProfileItem
                icon={<Mail size={20} />}
                title="Email"
                value={user.email || "—"}
              />

              <ProfileItem
                icon={<Phone size={20} />}
                title="Phone"
                value={user.phone || "—"}
              />

              <ProfileItem
                icon={<ShieldCheck size={20} />}
                title="Role"
                value={user.role}
              />

              <ProfileItem
                icon={<BadgeCheck size={20} />}
                title="Account Status"
                value={user.isVerified ? "Verified" : "Pending Verification"}
                tone={user.isVerified ? "good" : "warn"}
              />
            </div>

            {/* Actions */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="rounded-full bg-gradient-to-b from-[#E8C766] to-[#C9A227] px-6 py-3 text-sm font-semibold uppercase tracking-[0.03em] text-[#1C1712] shadow-[0_4px_14px_rgba(201,162,39,0.35)] transition hover:-translate-y-0.5">
                Edit Profile
              </button>

              <Link
                href="/my-bookings"
                className="rounded-full border border-[#C9A227] px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.03em] text-[#8A6B12] transition hover:bg-[#C9A227]/10"
              >
                My Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatChip({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#C9A227]/15 bg-[#faf8f3] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#8A6B12]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-[#1C1712]">{value}</p>
        <p className="truncate text-[11px] uppercase tracking-[0.08em] text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
}

function ProfileItem({ icon, title, value, tone = "neutral" }) {
  const toneClasses =
    tone === "good"
      ? "text-green-600"
      : tone === "warn"
      ? "text-amber-600"
      : "text-[#1C1712]";

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[#faf8f3] p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`truncate font-medium capitalize ${toneClasses}`}>
          {value}
        </p>
      </div>
    </div>
  );
}