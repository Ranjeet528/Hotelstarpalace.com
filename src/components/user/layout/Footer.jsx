import Image from "next/image";
import Link from "next/link";

import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUp,
  ChevronRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>

      {/* ================= BOOKING CTA ================= */}

      <section className="relative z-20 -mb-20 px-5">

        <div className="max-w-7xl mx-auto">

          <div className="overflow-hidden rounded-[35px] bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

            <div className="grid lg:grid-cols-2 gap-10 items-center px-8 lg:px-14 py-10">

              <div>

                <span className="uppercase tracking-[4px] text-sm font-semibold text-black/70">

                  HOTEL STAR PALACE

                </span>

                <h2 className="mt-3 text-4xl lg:text-5xl font-black text-black leading-tight">

                  Ready For Your
                  <br />
                  Luxury Stay?

                </h2>

                <p className="mt-5 text-black/80 text-lg leading-8">

                  Book your room today and experience premium hospitality,
                  delicious dining and a peaceful stay just 2 KM from
                  Khatu Shyam Ji Temple.

                </p>

              </div>

              <div className="flex flex-col sm:flex-row gap-5 lg:justify-end">

                <Link
                  href="/rooms"
                  className="rounded-xl bg-black px-8 py-4 text-white text-lg font-semibold hover:bg-neutral-900 transition"
                >
                  Book Your Room
                </Link>

                <a
                  href="tel:+919999999999"
                  className="rounded-xl border-2 border-black px-8 py-4 text-black text-lg font-semibold hover:bg-black hover:text-white transition"
                >
                  Call Now
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CURVED SVG ================= */}

      <div className="overflow-hidden leading-none">

        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="w-full h-24 fill-[#111111]"
        >
          <path d="M0,96 C320,20 1120,180 1440,70 L1440,140 L0,140 Z" />
        </svg>

      </div>

      {/* ================= MAIN FOOTER ================= */}

      <footer className="relative overflow-hidden bg-gradient-to-b from-[#171717] via-[#111111] to-black text-white">

        {/* Gold Line */}

        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

        {/* Glow */}

        <div className="absolute -left-40 top-0 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-36 pb-12">

          <div className="grid gap-16 lg:grid-cols-4">
            {/* ================= LOGO ================= */}

            <div>

              <Link href="/" className="flex items-center gap-3">

                <Image
                  src="/StarPalaceLogo.png"
                  alt="Hotel Star Palace"
                  width={180}
                  height={122}
                  className="h-16 sm:h-20 w-auto object-contain shrink-0"
                />

                <div className="min-w-0">

                  <h2 className="text-xl sm:text-2xl font-black tracking-wide leading-tight">
                    HOTEL STAR PALACE
                  </h2>

                  <p className="uppercase tracking-[3px] text-[10px] sm:text-xs text-yellow-400 mt-1">
                    Luxury • Comfort • Hospitality
                  </p>

                </div>

              </Link>

              <p className="mt-8 leading-8 text-gray-400">

                Experience luxury hospitality, elegant rooms,
                multi-cuisine restaurant and exceptional service
                just 2 KM from the famous Khatu Shyam Ji Temple.

              </p>

              {/* Social */}

              <div className="flex gap-4 mt-10">

                <a
                  href="#"
                  className="group h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-yellow-500 hover:border-yellow-500 hover:-translate-y-2"
                >
                  <FaFacebookF className="group-hover:text-black transition text-lg" />
                </a>

                <a
                  href="#"
                  className="group h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:-translate-y-2"
                >
                  <FaInstagram className="text-lg" />
                </a>

                <a
                  href="#"
                  className="group h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:-translate-y-2"
                >
                  <FaYoutube className="text-lg" />
                </a>

                <a
                  href="#"
                  className="group h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-green-500 hover:-translate-y-2"
                >
                  <FaWhatsapp className="text-lg" />
                </a>

              </div>

            </div>

            {/* ================= QUICK LINKS ================= */}

            <div>

              <h3 className="text-2xl font-bold text-white">
                Quick Links
              </h3>

              <div className="mt-8 h-1 w-16 rounded-full bg-yellow-500" />

              <ul className="mt-8 space-y-5">

                {[
                  ["Home", "/"],
                  ["Rooms", "/rooms"],
                  ["Restaurant", "/restaurant"],
                  ["Gallery", "/gallery"],
                  ["About Us", "/about"],
                  ["Contact", "/contact"],
                ].map(([title, url]) => (

                  <li key={title}>

                    <Link
                      href={url}
                      className="group flex items-center gap-3 text-gray-400 transition hover:text-yellow-400"
                    >

                      <ChevronRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />

                      {title}

                    </Link>

                  </li>

                ))}

              </ul>

            </div>

            {/* ================= CONTACT ================= */}

            <div>

              <h3 className="text-2xl font-bold text-white">
                Contact Us
              </h3>

              <div className="mt-8 h-1 w-16 rounded-full bg-yellow-500" />

              <div className="mt-8 space-y-7">

                <div className="flex gap-4">

                  <div className="h-12 w-12 rounded-xl bg-yellow-500 flex items-center justify-center">

                    <MapPin size={20} className="text-black" />

                  </div>

                  <div>

                    <p className="font-semibold">
                      Hotel Address
                    </p>

                    <p className="text-gray-400 mt-2 leading-7">

                      Hotel Star Palace,
                      Manda Road,
                      Khatoo,
                      Rajasthan - 332602

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="h-12 w-12 rounded-xl bg-yellow-500 flex items-center justify-center">

                    <Phone size={20} className="text-black" />

                  </div>

                  <div>

                    <p className="font-semibold">
                      Phone Number
                    </p>

                    <a
                      href="tel:+919999999999"
                      className="text-gray-400 hover:text-yellow-400 mt-2 block"
                    >
                      +91 XXXXX XXXXX
                    </a>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="h-12 w-12 rounded-xl bg-yellow-500 flex items-center justify-center">

                    <Mail size={20} className="text-black" />

                  </div>

                  <div>

                    <p className="font-semibold">
                      Email Address
                    </p>

                    <a
                      href="mailto:info@hotelstarpalace.com"
                      className="text-gray-400 hover:text-yellow-400 mt-2 block"
                    >
                      info@hotelstarpalace.com
                    </a>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= HOTEL HOURS ================= */}

            <div>

              <h3 className="text-2xl font-bold text-white">
                Hotel Hours
              </h3>

              <div className="mt-8 h-1 w-16 rounded-full bg-yellow-500" />

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">

                <div className="flex items-center gap-4">

                  <div className="h-12 w-12 rounded-xl bg-yellow-500 flex items-center justify-center">

                    <Clock3 className="text-black" />

                  </div>

                  <div>

                    <h4 className="font-bold text-lg">
                      Open 24×7
                    </h4>

                    <p className="text-gray-400 mt-1">
                      Reception & Room Service
                    </p>

                  </div>

                </div>

                <div className="mt-8 border-t border-white/10 pt-6">

                  <p className="text-gray-400 leading-8">

                    Check-in:
                    <span className="text-white font-semibold">
                      {" "}12:00 PM
                    </span>

                    <br />

                    Check-out:
                    <span className="text-white font-semibold">
                      {" "}11:00 AM
                    </span>

                  </p>

                </div>

              </div>

            </div>
          </div>

          {/* ================= Divider ================= */}

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* ================= Bottom Footer ================= */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Copyright + Developer Ad */}
            <div className="text-center lg:text-left">

              <p className="text-gray-400">
                © {year} <span className="font-semibold text-white">Hotel Star Palace</span>. All Rights Reserved.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Designed with ❤️ for Luxury Hospitality.
              </p>

              {/* Developer Advertisement */}
              <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">

                <p className="text-sm text-gray-300 text-center lg:text-left">
                  This website is proudly designed & developed by
                  <span className="font-bold text-yellow-400 mx-1">
                    Ranjeet Gurjar
                  </span>
                  — Full Stack Developer.
                </p>

                <a
                  href="/contact"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-white bg-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
                >
                  🚀 Want a Website Like This? Hire Me
                </a>

              </div>

            </div>


            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">

              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Privacy Policy
              </Link>

              <span className="text-gray-700">•</span>

              <Link
                href="/terms-and-conditions"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Terms & Conditions
              </Link>

              <span className="text-gray-700">•</span>

              <Link
                href="/refund-policy"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                Refund Policy
              </Link>

            </div>


            {/* Back To Top */}
            <a
              href="#top"
              className="group h-14 w-14 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center text-black shadow-xl hover:scale-110 transition"
            >
              <ArrowUp
                size={22}
                className="transition group-hover:-translate-y-1"
              />
            </a>

          </div>

        </div>

      </footer>

    </>
  );
}