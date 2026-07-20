import Image from "next/image";
import Link from "next/link";
import {
  UtensilsCrossed,
  ChefHat,
  Soup,
  ArrowRight,
} from "lucide-react";

export default function RestaurantPreview() {
  const features = [
    "Multi-Cuisine Restaurant",
    "Fresh & Hygienic Food",
    "Expert Chefs",
    "Luxury Dining Experience",
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Image */}

          <div className="relative group">

            <div className="relative h-[320px] sm:h-[450px] lg:h-[580px] overflow-hidden rounded-[32px] shadow-2xl">

              <Image
                src="/restaurant/hero.jpg"
                alt="Hotel Restaurant"
                fill
                quality={100}
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            </div>

            {/* Floating Card */}

            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-6 py-4 shadow-xl">

              <p className="text-3xl font-black text-yellow-500">
                100+
              </p>

              <p className="text-gray-600 font-medium">
                Delicious Dishes
              </p>

            </div>

          </div>

          {/* Right Content */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold uppercase tracking-[3px] text-yellow-700">

              <UtensilsCrossed size={18} />

              Restaurant

            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black leading-tight text-gray-900">

              Fine Dining
              <span className="text-yellow-500">
                {" "}Experience
              </span>

            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">

              Discover a premium dining experience at Hotel Star Palace.
              From authentic Indian flavors to Chinese, Fast Food and
              delicious desserts, every dish is prepared with fresh
              ingredients by our experienced chefs.

            </p>

            {/* Features */}

            <div className="mt-10 grid gap-5">

              {features.map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-yellow-400 hover:shadow-lg"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">

                    {index === 0 && <UtensilsCrossed size={24} />}
                    {index === 1 && <Soup size={24} />}
                    {index === 2 && <ChefHat size={24} />}
                    {index === 3 && <UtensilsCrossed size={24} />}

                  </div>

                  <span className="text-lg font-semibold text-gray-800">
                    {item}
                  </span>

                </div>

              ))}

            </div>

            {/* Button */}

            <div className="mt-10">

              <Link
                href="/restaurant"
                className="inline-flex items-center gap-3 rounded-xl bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400 hover:shadow-xl"
              >
                Explore Restaurant

                <ArrowRight size={20} />

              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}