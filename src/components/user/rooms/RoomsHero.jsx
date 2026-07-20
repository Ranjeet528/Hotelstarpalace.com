import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function RoomsHero() {
  return (
    <section className="relative h-[65vh] min-h-[500px] overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/rooms/rooms-hero.jpg"
        alt="Luxury Rooms at Hotel Star Palace"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">

        <div className="mx-auto w-full max-w-7xl px-5">

          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-yellow-400">

            <Link
              href="/"
              className="hover:text-white transition"
            >
              Home
            </Link>

            <ChevronRight size={16} />

            <span className="text-white">
              Rooms
            </span>

          </div>


          {/* Small Heading */}
          <p className="uppercase tracking-[4px] text-yellow-400 font-semibold">
            Luxury Accommodation
          </p>


          {/* Main Heading */}
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Discover Our Luxury Rooms & Suites
          </h1>


          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
            Experience unmatched comfort, elegant interiors and world-class
            hospitality. Find the perfect room for your next stay at Hotel
            Star Palace.
          </p>


          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#rooms"
              className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:bg-yellow-400"
            >
              Explore Rooms
            </a>

            <Link
              href="/contact"
              className="rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}