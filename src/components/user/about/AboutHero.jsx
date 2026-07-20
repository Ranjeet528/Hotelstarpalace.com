import Image from "next/image";
import Link from "next/link";

const AboutHero = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/about-hotel.jpg"
        alt="Hotel Star Palace"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>


      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">

        <div className="max-w-3xl">

          <p className="text-yellow-400 uppercase tracking-[4px] text-sm mb-4">
            About Our Hotel
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Welcome To{" "}
            <span className="text-yellow-400">
              Hotel Star Palace
            </span>
          </h1>


          <p className="mt-6 text-gray-200 text-lg md:text-xl leading-relaxed">
            Experience luxury, comfort and exceptional hospitality.
            We create unforgettable stays with premium rooms,
            modern facilities and personalized services.
          </p>


          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/rooms"
              className="bg-yellow-500 text-black px-7 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
            >
              Explore Rooms
            </Link>


            <Link
              href="/contact"
              className="border border-yellow-500 text-yellow-400 px-7 py-3 rounded-full font-semibold hover:bg-yellow-500 hover:text-black transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutHero;