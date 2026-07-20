"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, Menu, ExternalLink } from "lucide-react";

import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { useAuth } from "@/context/AuthContext";

// Placeholder until real notifications are wired up
const notifications = [
  {
    id: 1,
    title: "New booking received",
    desc: "Deluxe Room · Check-in Jul 22",
    time: "5m ago",
    unread: true,
  },
  {
    id: 2,
    title: "Refund request submitted",
    desc: "Booking #HS-2291",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    title: "New review posted",
    desc: "4.5★ on Executive Suite",
    time: "Yesterday",
    unread: false,
  },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // CLOSE NOTIFICATION DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (loading) return;

    // USER LOGIN NAHI HAI
    if (!user) {
      const timer = setTimeout(() => {
        router.replace("/login");
      }, 300);

      return () => clearTimeout(timer);
    }

    // ADMIN ACCESS CHECK
    if (user.role !== "admin" && user.role !== "superadmin") {
      router.replace("/");
      return;
    }
  }, [loading, user, router]);

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F5F2]">
        <div className="flex items-center gap-3 text-sm font-medium text-[#6B7182]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#B8985A] border-t-transparent" />
          Checking access...
        </div>
      </div>
    );
  }

  // WITHOUT USER SHOW NOTHING
  if (!user) {
    return null;
  }

  // WRONG ROLE SHOW NOTHING
  if (user.role !== "admin" && user.role !== "superadmin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F6F5F2]">
      {/* SIDEBAR */}
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* RIGHT SIDE */}
      <div className="flex min-h-screen flex-col lg:ml-72">
        {/* HEADER */}
        <header
          className="
            sticky top-0 z-30
            flex h-20 items-center justify-between
            border-b border-[#E7E4DB]
            bg-white/90
            px-4 backdrop-blur-md
            md:px-8
          "
        >
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="
                rounded-lg border border-[#E7E4DB]
                p-2 text-[#5E6474]
                transition-colors hover:bg-[#F6F5F2]
                lg:hidden
              "
            >
              <Menu size={19} />
            </button>

            <div>
              <h1 className="text-[17px] font-semibold leading-none text-[#1B1E27]">
                Hotel Star Palace
              </h1>
              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#9AA0B0]">
                Management System
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* VIEW WEBSITE */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-1.5
                rounded-full border border-[#E7E4DB]
                px-2.5 py-2 sm:px-3.5
                text-[12.5px] font-medium text-[#5E6474]
                transition-colors
                hover:border-[#B8985A]/40 hover:bg-[#B8985A]/[0.06] hover:text-[#8A6E33]
              "
            >
              <span className="hidden sm:inline">View Website</span>
              <ExternalLink size={14} />
            </Link>

            {/* NOTIFICATIONS */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="
                  relative rounded-full p-2.5
                  text-[#5E6474]
                  transition-colors
                  hover:bg-[#F6F5F2] hover:text-[#1B1E27]
                "
              >
                <Bell size={19} />
                {unreadCount > 0 && (
                  <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C25B4A] text-[9px] font-semibold text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div
                  className="
                    absolute right-0 top-[calc(100%+10px)] z-40
                    w-80 overflow-hidden
                    rounded-2xl border border-[#E7E4DB]
                    bg-white shadow-xl shadow-black/[0.06]
                  "
                >
                  <div className="flex items-center justify-between border-b border-[#F0EEE7] px-4 py-3">
                    <span className="text-[13px] font-semibold text-[#1B1E27]">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-[#B8985A]/10 px-2 py-0.5 text-[10.5px] font-medium text-[#8A6E33]">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-6 text-center text-[12.5px] text-[#9AA0B0]">
                        No notifications yet
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="
                            flex gap-3 border-b border-[#F6F5F2]
                            px-4 py-3 last:border-b-0
                            hover:bg-[#F9F8F5]
                          "
                        >
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                              n.unread ? "bg-[#B8985A]" : "bg-transparent"
                            }`}
                          />
                          <div className="min-w-0">
                            <p className="truncate text-[12.5px] font-medium text-[#1B1E27]">
                              {n.title}
                            </p>
                            <p className="truncate text-[12px] text-[#9AA0B0]">
                              {n.desc}
                            </p>
                            <p className="mt-0.5 text-[10.5px] text-[#B4B9C4]">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <button className="w-full border-t border-[#F0EEE7] py-2.5 text-[12px] font-medium text-[#8A6E33] hover:bg-[#F9F8F5]">
                    Mark all as read
                  </button>
                </div>
              )}
            </div>

            {/* DIVIDER */}
            <span className="hidden h-8 w-px bg-[#E7E4DB] md:block" />

            {/* USER */}
            <div className="hidden flex-col text-right md:flex">
              <span className="text-[13px] font-semibold leading-tight text-[#1B1E27]">
                {user.name}
              </span>
              <span className="text-[11px] capitalize text-[#9AA0B0]">
                {user.role}
              </span>
            </div>

            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                bg-gradient-to-br from-[#D8BA80] to-[#B8985A]
                text-[14px] font-semibold text-white
                shadow-sm shadow-[#B8985A]/30
              "
            >
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}