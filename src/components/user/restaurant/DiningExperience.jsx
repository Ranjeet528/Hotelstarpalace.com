import Image from "next/image";
import {
  CheckCircle2,
  Users,
  Sparkles,
  ChefHat,
} from "lucide-react";

const amenities = [
  "Luxury Family Dining",
  "Air Conditioned Restaurant",
  "Private Dining Space",
  "Fresh & Hygienic Food",
  "Multi Cuisine Menu",
  "Friendly Staff",
  "Birthday & Anniversary Parties",
  "Room Service Available",
];

export default function DiningExperience() {
  return (
    <section className="overflow-hidden bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT IMAGES */}

          <div className="relative">

            {/* Main Image */}

            <div className="relative h-72 overflow-hidden rounded-2xl shadow-xl sm:h-96 lg:h-[620px] lg:rounded-3xl lg:shadow-2xl">

              <Image
                src="/restaurant/dining.jpg"
                alt="Luxury Dining"
                fill
                quality={100}
                className="object-cover transition duration-700 hover:scale-110"
              />

              {/* Floating card sits inside the image on mobile so it never overflows the section */}
              <div className="absolute left-4 top-4 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-6 sm:top-6 sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-5 sm:shadow-xl">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:h-14 sm:w-14">
                  <ChefHat className="text-yellow-600" size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-xl">
                    Expert Chefs
                  </h3>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    Premium Quality Food
                  </p>
                </div>

              </div>

            </div>

            {/* Small Floating Image — desktop only, kept off-canvas safely by parent overflow-hidden on section */}
            <div className="absolute -bottom-10 -right-6 hidden h-52 w-72 overflow-hidden rounded-3xl border-8 border-white shadow-2xl md:block">
              <Image
                src="/restaurant/about.jpg"
                alt="Restaurant"
                fill
                quality={100}
                className="object-cover"
              />
            </div>

          </div>

          {/* RIGHT CONTENT */}

          <div className="mt-6 md:mt-0">

            <span className="inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-700 sm:px-5 sm:py-2 sm:text-sm">
              Dining Experience
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight text-gray-900 sm:mt-6 sm:text-4xl lg:text-5xl">
              Enjoy Every Meal
              <br />
              <span className="text-yellow-500">In Luxury Style</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-8">
              Our elegant restaurant offers a warm and welcoming atmosphere
              where every meal becomes a memorable experience. Whether
              you&apos;re enjoying breakfast with your family, celebrating a
              birthday, having a romantic dinner or a business lunch, Hotel
              Star Palace Restaurant provides exceptional food and
              world-class hospitality.
            </p>

            {/* Amenities */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
              {amenities.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-yellow-500"
                  />
                  <span className="text-sm font-medium text-gray-700 sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Cards */}

            <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5">
              <div className="rounded-2xl bg-gray-50 p-5 text-center shadow sm:rounded-3xl sm:p-7">
                <Users className="mx-auto text-yellow-500" size={30} />
                <h3 className="mt-3 text-2xl font-black text-gray-900 sm:mt-4 sm:text-4xl">
                  5000+
                </h3>
                <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
                  Happy Guests
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5 text-center shadow sm:rounded-3xl sm:p-7">
                <Sparkles className="mx-auto text-yellow-500" size={30} />
                <h3 className="mt-3 text-2xl font-black text-gray-900 sm:mt-4 sm:text-4xl">
                  Since 2015
                </h3>
                <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
                  Serving Excellence
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}