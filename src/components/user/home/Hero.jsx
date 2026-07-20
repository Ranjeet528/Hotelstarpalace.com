import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[650px] overflow-hidden">

      {/* Desktop Background */}
      <Image
        src="/hotel-hero.png"
        alt="Hotel Star Palace"
        fill
        priority
        quality={100}
        className="hidden md:block object-cover object-center"
      />

      {/* Mobile Background */}
      <Image
        src="/hotel_img_mobile.png"
        alt="Hotel Star Palace"
        fill
        priority
        quality={100}
        className="block md:hidden object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:from-black/75 md:via-black/45" />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10">

          <div className="max-w-xl lg:max-w-2xl">

            <p className="uppercase tracking-[3px] sm:tracking-[4px] text-yellow-400 text-xs sm:text-sm font-semibold">
              Welcome to Hotel Star Palace
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl">
              Luxury Stay
              <br />
              With Comfort &
              <span className="text-yellow-400"> Elegance</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-200 leading-7">
              Experience premium hospitality with luxurious rooms,
              delicious dining, modern amenities and unforgettable
              comfort at Hotel Star Palace.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <Link href="/rooms">
                <button className="w-full sm:w-auto rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 transition duration-300 shadow-xl">
                  Explore Rooms
                </button>
              </Link>

              <Link href="/contact">
                <button className="w-full sm:w-auto rounded-xl border-2 border-white hover:bg-white hover:text-black text-white font-semibold px-8 py-4 transition duration-300">
                  Contact Us
                </button>
              </Link>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

    </section>
  );
}