"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, LogOut, CalendarDays, LayoutDashboard, ChevronDown } from "lucide-react";
import { Cinzel, Jost } from "next/font/google";

import { useAuth } from "@/context/AuthContext";

/* =========================================================
   TYPE SYSTEM
   Cinzel -> carved / engraved feel for the wordmark text,
             paired with the logo artwork.
   Jost   -> clean geometric sans for navigation + utility
             text, kept quiet so the wordmark can lead.
========================================================= */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* =========================================================
   SIGNATURE ELEMENT — Gold Mark
   A small ornamental flourish — two hairlines converging on
   a rotated diamond — the kind of motif found in Rajasthani
   jewellery and textile borders. Sits beneath the active or
   hovered nav item instead of a plain underline.

   IMPORTANT: this is positioned absolutely (outside normal
   layout flow) by its wrapper, so it never adds extra height
   to the nav item. That's what keeps every item in the nav
   row — links, the login pill, the profile trigger — sitting
   on the exact same baseline.
========================================================= */
function GoldMark({ lit = false }) {
  return (
    <span
      aria-hidden="true"
      className="flex items-center justify-center gap-1.5 h-2"
    >
      <span
        className={`h-px rounded-full bg-current transition-all duration-500 ease-out motion-reduce:transition-none ${
          lit ? "w-3.5 opacity-100" : "w-0 opacity-0"
        }`}
      />
      <span
        className={`h-1.5 w-1.5 rotate-45 bg-current transition-all duration-500 ease-out motion-reduce:transition-none ${
          lit ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
      <span
        className={`h-px rounded-full bg-current transition-all duration-500 ease-out motion-reduce:transition-none ${
          lit ? "w-3.5 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </span>
  );
}

export default function Header() {
  const router = useRouter();
  const { user, logout, isAdmin, isSuperAdmin } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [mounted, setMounted] = useState(false);

  const profileRef = useRef(null);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    router.push("/login");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      setScrolled(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close the profile dropdown on outside click / Escape.
  useEffect(() => {
    if (!profileOpen) return;

    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [profileOpen]);

  // Close mobile menu / dropdown on route change.
  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Restaurant", href: "/restaurant" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 motion-reduce:transition-none ${jost.className} ${
          solid
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(201,162,39,0.35)]"
            : "bg-transparent"
        }`}
      >
        {/* ultra-faint jali (lattice) texture — only once the header
            is on solid ground, never over the hero image */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(201,162,39,0.05) 0px, rgba(201,162,39,0.05) 1px, transparent 1px, transparent 13px), repeating-linear-gradient(-45deg, rgba(201,162,39,0.05) 0px, rgba(201,162,39,0.05) 1px, transparent 1px, transparent 13px)",
          }}
        />

        {/* hairline gold rule along the base of the header */}
        <div
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-px w-full transition-opacity duration-500 ${
            solid ? "opacity-100" : "opacity-40"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, #C9A227 20%, #E8C766 50%, #C9A227 80%, transparent)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
         <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            {/* ================= LOGO ================= */}
            <Link
              href="/"
              className={`group flex items-center gap-3 transition-all duration-700 motion-reduce:transition-none ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              <Image
                src="/StarPalaceLogo.png"
                alt="Hotel Star Palace"
                width={160}
                height={108}
                priority
                className="h-16 sm:h-20 lg:h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />

              <div className="block">
                <h1
                  className={`${cinzel.className} text-[11px] sm:text-lg lg:text-2xl tracking-[0.04em] sm:tracking-[0.1em] lg:tracking-[0.14em] leading-none whitespace-nowrap transition-colors duration-500 ${
                    solid ? "text-[#1C1712]" : "text-white"
                  }`}
                >
                  HOTEL STAR PALACE
                </h1>

                <div className="mt-1 sm:mt-1.5 flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`h-px w-3 sm:w-4 transition-colors duration-500 ${
                      solid ? "bg-[#C9A227]" : "bg-[#E8C766]"
                    }`}
                  />
                  <p
                    className={`text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium whitespace-nowrap transition-colors duration-500 ${
                      solid ? "text-[#8A6B12]" : "text-[#E8C766]"
                    }`}
                  >
                    Luxury &amp; Comfort
                  </p>
                </div>
              </div>
            </Link>

            {/* ================= DESKTOP NAV ================= */}
            <nav
              aria-label="Primary"
              className="hidden md:flex items-center gap-1"
            >
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                const lit = active || hovered === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHovered(link.href)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative flex items-center px-4 py-2.5 text-[13px] font-medium tracking-[0.05em] uppercase transition-all duration-700 motion-reduce:transition-none ${
                      mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    } ${
                      lit
                        ? "text-[#8A6B12]"
                        : solid
                        ? "text-[#1C1712] hover:text-[#8A6B12]"
                        : "text-white/90 hover:text-white"
                    }`}
                    style={{ transitionDelay: mounted ? `${i * 60}ms` : "0ms" }}
                  >
                    {link.name}
                    {/* absolutely positioned -> adds zero height to the
                        link, so every nav-row item shares one baseline */}
                    <span
                      className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 ${
                        lit
                          ? "text-[#C9A227]"
                          : solid
                          ? "text-[#C9A227]"
                          : "text-[#E8C766]"
                      }`}
                    >
                      <GoldMark lit={lit} />
                    </span>
                  </Link>
                );
              })}

              {user ? (
                <div className="relative ml-4" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={profileOpen}
                    className={`flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium uppercase tracking-[0.03em] transition-all duration-300 ${
                      solid
                        ? "text-[#1C1712] hover:bg-black/5"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#E8C766] to-[#C9A227] text-white">
                      <User size={16} />
                    </span>

                    <span className="max-w-[110px] truncate normal-case tracking-normal">
                      {user.name}
                    </span>

                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 mt-3 w-60 origin-top-right rounded-2xl border border-[#C9A227]/25 bg-white p-2 shadow-[0_12px_40px_rgba(28,23,18,0.25)] transition-all duration-200 z-[60] ${
                      profileOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1C1712] transition-colors hover:bg-[#C9A227]/10"
                    >
                      <User size={17} className="text-[#8A6B12]" />
                      Profile
                    </Link>

                    <Link
                      href="/my-bookings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1C1712] transition-colors hover:bg-[#C9A227]/10"
                    >
                      <CalendarDays size={17} className="text-[#8A6B12]" />
                      My Bookings
                    </Link>

                    {(isAdmin || isSuperAdmin) && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1C1712] transition-colors hover:bg-[#C9A227]/10"
                      >
                        <LayoutDashboard size={17} className="text-[#8A6B12]" />
                        Dashboard
                      </Link>
                    )}

                    <div className="my-2 h-px bg-[#C9A227]/15" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`ml-4 relative overflow-hidden rounded-full px-6 py-2.5 text-[13px] font-semibold tracking-[0.05em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 ${
                    solid
                      ? "text-[#1C1712] focus-visible:ring-offset-white"
                      : "text-white focus-visible:ring-offset-transparent"
                  } ${
                    solid
                      ? "bg-gradient-to-b from-[#E8C766] to-[#C9A227] shadow-[0_2px_10px_rgba(201,162,39,0.45)] hover:shadow-[0_4px_16px_rgba(201,162,39,0.6)] hover:-translate-y-0.5"
                      : "border border-[#E8C766]/70 hover:bg-white/10 hover:border-[#E8C766] hover:-translate-y-0.5"
                  }`}
                >
                  Login
                </Link>
              )}
            </nav>

            {/* ================= MOBILE BUTTON ================= */}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`md:hidden rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] ${
                solid ? "text-[#1C1712]" : "text-white"
              }`}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out motion-reduce:transition-none ${
            open ? "max-h-[calc(100vh-6rem)]" : "max-h-0"
          }`}
        >
          <div className="relative bg-white shadow-xl border-t border-[#C9A227]/30 px-5 py-6 flex flex-col max-h-[calc(100vh-6rem)] overflow-y-auto">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3 py-3.5 text-sm font-medium uppercase tracking-[0.05em] transition-all duration-300 motion-reduce:transition-none border-b border-[#C9A227]/15 ${
                    open
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-3"
                  } ${active ? "text-[#8A6B12]" : "text-[#1C1712]"}`}
                  style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
                >
                  {link.name}
                  <span className={active ? "text-[#C9A227]" : "text-transparent"}>
                    <GoldMark lit={active} />
                  </span>
                </Link>
              );
            })}

            {user ? (
              <>
                <div className="mt-2 flex items-center gap-3 px-3 py-3 border-b border-[#C9A227]/15">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#E8C766] to-[#C9A227] text-white">
                    <User size={16} />
                  </span>
                  <span className="text-sm font-semibold text-[#1C1712] truncate">
                    {user.name}
                  </span>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3.5 text-sm font-medium text-[#1C1712] border-b border-[#C9A227]/15"
                >
                  <User size={18} className="text-[#8A6B12]" />
                  Profile
                </Link>

                <Link
                  href="/my-bookings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3.5 text-sm font-medium text-[#1C1712] border-b border-[#C9A227]/15"
                >
                  <CalendarDays size={18} className="text-[#8A6B12]" />
                  My Bookings
                </Link>

                {(isAdmin || isSuperAdmin) && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3.5 text-sm font-medium text-[#1C1712] border-b border-[#C9A227]/15"
                  >
                    <LayoutDashboard size={18} className="text-[#8A6B12]" />
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-3.5 text-sm font-medium text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-4">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-full py-3.5 text-sm font-semibold uppercase tracking-[0.05em] text-[#1C1712] bg-gradient-to-b from-[#E8C766] to-[#C9A227] shadow-[0_2px_10px_rgba(201,162,39,0.4)]"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

   {/* Spacer only for non-home pages */}
{!isHome && (
  <div className="h-20 md:h-28" />
)}
    </>
  );
}