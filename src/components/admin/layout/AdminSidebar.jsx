"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  Users,
  MessageSquare,
  Star,
  Settings,
  X,
  Hotel,
  CreditCard,
  Wallet,
  ChevronDown,
  ChevronRight,
  Link2,
  Boxes,
  RefreshCcw,
  BarChart3,
  BadgeIndianRupee,
} from "lucide-react";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  const [channelOpen, setChannelOpen] = useState(
    pathname.startsWith("/admin/channel-manager")
  );

  const menus = [
    {
      section: "MAIN",
      items: [
        { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Rooms", path: "/admin/rooms", icon: BedDouble },
        { name: "Bookings", path: "/admin/bookings/current", icon: CalendarDays },
      ],
    },
    {
      section: "FINANCE",
      items: [
        { name: "Payments", path: "/admin/payments", icon: CreditCard },
        { name: "Refund Requests", path: "/admin/refunds", icon: Wallet },
      ],
    },
    {
      section: "CUSTOMERS",
      items: [
        { name: "Users", path: "/admin/users", icon: Users },
        { name: "Reviews", path: "/admin/reviews", icon: Star },
        { name: "Contact Messages", path: "/admin/contact", icon: MessageSquare },
      ],
    },
    {
      section: "SYSTEM",
      items: [{ name: "Settings", path: "/admin/settings", icon: Settings }],
    },
  ];

  const channelMenus = [
    { name: "Dashboard", path: "/admin/channel-manager", icon: BarChart3 },
    { name: "Channels", path: "/admin/channel-manager/channels", icon: Link2 },
    { name: "Room Mapping", path: "/admin/channel-manager/room-mapping", icon: BedDouble },
    { name: "Inventory", path: "/admin/channel-manager/inventory", icon: Boxes },
    { name: "Rate Plans", path: "/admin/channel-manager/rate-plans", icon: BadgeIndianRupee },
    { name: "Sync Logs", path: "/admin/channel-manager/sync-logs", icon: RefreshCcw },
    { name: "Settings", path: "/admin/channel-manager/settings", icon: Settings },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          border-r border-[#232838]
          bg-[#11141C]
          text-[#E8E5DD]

          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
          lg:fixed
        `}
      >
        {/* LOGO */}
        <div className="flex h-20 items-center justify-between border-b border-[#232838] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B8985A]/40 bg-[#B8985A]/10">
              <span className="font-serif text-lg text-[#D8BA80]">H</span>
            </div>

            <div>
              <h1 className="text-[15px] font-semibold leading-none tracking-wide">
                Hotel Star Palace
              </h1>
              <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#8A8F9E]">
                Admin Console
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-[#8A8F9E] hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex h-[calc(100vh-80px)] flex-col px-4 pt-6">
          <nav className="flex-1 space-y-7 overflow-y-auto pr-1">
            {menus.map((section) => (
              <div key={section.section}>
                <p className="mb-2.5 flex items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5E6474]">
                  <span className="h-px w-3 bg-[#B8985A]/50" />
                  {section.section}
                </p>

                <div className="space-y-0.5">
                  {section.items.map((menu) => {
                    const Icon = menu.icon;
                    const active =
                      pathname === menu.path ||
                      pathname.startsWith(menu.path + "/");

                    return (
                      <Link
                        key={menu.path}
                        href={menu.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          group relative flex items-center gap-3
                          rounded-lg
                          py-2.5 pl-4 pr-3
                          text-[13.5px]
                          transition-colors duration-150

                          ${
                            active
                              ? "bg-[#B8985A]/10 text-[#F1EDE3]"
                              : "text-[#9AA0B0] hover:bg-white/[0.04] hover:text-[#E8E5DD]"
                          }
                        `}
                      >
                        <span
                          className={`
                            absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full
                            transition-opacity duration-150
                            ${active ? "bg-[#D8BA80] opacity-100" : "opacity-0"}
                          `}
                        />
                        <Icon
                          size={17}
                          strokeWidth={active ? 2.2 : 1.8}
                          className={active ? "text-[#D8BA80]" : "text-[#6B7182] group-hover:text-[#B8985A]"}
                        />
                        <span className={active ? "font-medium" : "font-normal"}>
                          {menu.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* CHANNEL MANAGER */}
            <div>
              <p className="mb-2.5 flex items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5E6474]">
                <span className="h-px w-3 bg-[#B8985A]/50" />
                Channel Manager
              </p>

              <button
                onClick={() => setChannelOpen(!channelOpen)}
                className="
                  flex w-full items-center
                  justify-between
                  rounded-lg
                  py-2.5 pl-4 pr-3
                  text-[13.5px]
                  text-[#9AA0B0]
                  transition-colors duration-150
                  hover:bg-white/[0.04]
                  hover:text-[#E8E5DD]
                "
              >
                <div className="flex items-center gap-3">
                  <Hotel size={17} strokeWidth={1.8} className="text-[#6B7182]" />
                  <span>Channels</span>
                </div>

                <ChevronRight
                  size={15}
                  className={`text-[#5E6474] transition-transform duration-200 ${
                    channelOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  grid overflow-hidden transition-all duration-200 ease-in-out
                  ${channelOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                `}
              >
                <div className="min-h-0">
                  <div className="mt-1 ml-[26px] space-y-0.5 border-l border-[#232838] pl-4">
                    {channelMenus.map((item) => {
                      const Icon = item.icon;
                      const active =
                        pathname === item.path ||
                        pathname.startsWith(item.path + "/");

                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`
                            flex items-center gap-2.5
                            rounded-lg
                            py-2 px-3
                            text-[13px]
                            transition-colors duration-150

                            ${
                              active
                                ? "bg-[#B8985A]/10 text-[#F1EDE3] font-medium"
                                : "text-[#828898] hover:bg-white/[0.04] hover:text-[#E8E5DD]"
                            }
                          `}
                        >
                          <Icon
                            size={15}
                            strokeWidth={active ? 2.2 : 1.8}
                            className={active ? "text-[#D8BA80]" : "text-[#5E6474]"}
                          />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* FOOTER */}
          <div className="mt-4 border-t border-[#232838] py-4">
            <div className="relative overflow-hidden rounded-xl border border-[#232838] bg-white/[0.02] px-4 py-3.5">
              <span className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-[#B8985A]/10" />
              <p className="text-[13px] font-medium text-[#E8E5DD]">
                Hotel Management
              </p>
              <p className="mt-0.5 text-[11px] text-[#6B7182]">
                Everything, in one place
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}