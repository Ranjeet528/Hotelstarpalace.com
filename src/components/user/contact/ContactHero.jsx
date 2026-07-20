"use client";

import Link from "next/link";
import { ChevronRight, PhoneCall, Mail } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="relative h-[420px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/contact/contact-hero.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-2xl text-white">
            {/* Badge */}
            <span className="inline-flex items-center rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-semibold tracking-wide text-yellow-300 backdrop-blur">
              CONTACT STAR PALACE
            </span>

            {/* Title */}
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              We'd Love
              <span className="block text-yellow-400">
                To Hear From You
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Whether you're planning your next stay, have a booking
              enquiry, or simply want to know more about Hotel Star
              Palace, our team is always here to assist you.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+917414875774"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-semibold text-black transition hover:bg-yellow-400"
              >
                <PhoneCall size={20} />
                Call Now
              </a>

              <a
                href="mailto:Ranjeetgurjar528@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-black"
              >
                <Mail size={20} />
                Email Us
              </a>
            </div>

            {/* Breadcrumb */}
            <div className="mt-10 flex items-center text-sm text-gray-300">
              <Link
                href="/"
                className="transition hover:text-yellow-400"
              >
                Home
              </Link>

              <ChevronRight size={16} className="mx-2" />

              <span className="text-yellow-400">
                Contact Us
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}