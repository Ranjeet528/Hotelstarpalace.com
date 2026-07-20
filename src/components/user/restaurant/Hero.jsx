import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">

      <Image
        src="/restaurant/hero.jpg"
        alt="Hotel Star Palace Restaurant"
        fill
        priority
        quality={100}
        className="object-cover object-center"
      />

      {/* single, considered overlay instead of two stacked gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* one soft glow, not a pair of generic blur blobs */}
      <div className="pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-amber-500/10 blur-[160px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-20 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0">

        <div className="max-w-2xl">

          {/* eyebrow — a rule instead of a pill, feels less templated */}
          <div className="flex items-center gap-3 text-amber-400">
            <UtensilsCrossed size={16} strokeWidth={2.25} />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">
              Fine Dining · Est. In-House
            </span>
          </div>

          <h1 className="mt-5 text-[2.75rem] font-black leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Taste the
            <br />
            <span className="text-amber-400">finest flavors</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-300 sm:text-lg">
            Authentic Indian, Chinese, South Indian and fast-food favourites,
            plated with care at{" "}
            <span className="font-semibold text-white">
              Hotel Star Palace Restaurant
            </span>
            .
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-7 py-3.5 font-semibold text-black transition hover:bg-amber-400"
            >
              Reserve Your Table
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/rooms"
              className="flex items-center justify-center rounded-lg border border-white/25 px-7 py-3.5 font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
            >
              Book Your Stay
            </Link>
          </div>

          {/* stats — tighter, consistent rhythm, no orphaned divider on mobile */}
          <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6 sm:gap-10">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold text-white sm:text-3xl">4.9</span>
                <Star size={15} className="text-amber-400" fill="currentColor" />
              </div>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">Guest Rating</p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div>
              <span className="text-2xl font-bold text-white sm:text-3xl">100+</span>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">Dishes on the Menu</p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div>
              <span className="text-2xl font-bold text-white sm:text-3xl">24×7</span>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">Room Service</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}