import Image from "next/image";
import { CheckCircle2, ChefHat, Leaf, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}

          <div className="relative">

            <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl">

              <Image
                src="/restaurant/about.jpg"
                alt="Hotel Star Palace Restaurant"
                fill
                quality={100}
                className="object-cover hover:scale-110 transition duration-700"
              />

            </div>

            {/* Experience Card */}

            <div className="absolute -bottom-8 -right-6 bg-white rounded-2xl shadow-2xl px-8 py-6 border border-gray-100">

              <h2 className="text-4xl font-black text-yellow-500">
                10+
              </h2>

              <p className="text-gray-600 font-medium mt-2">
                Years of Culinary Excellence
              </p>

            </div>

          </div>

          {/* RIGHT CONTENT */}

          <div>

            <span className="inline-block bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold tracking-wide uppercase text-sm">
              About Our Restaurant
            </span>

            <h2 className="mt-6 text-4xl lg:text-5xl font-black leading-tight text-gray-900">

              Experience Luxury Dining
              <br />

              <span className="text-yellow-500">
                Like Never Before
              </span>

            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">

              At Hotel Star Palace Restaurant, we combine authentic flavors,
              fresh ingredients and exceptional hospitality to create a
              memorable dining experience for every guest.

              Whether you're enjoying breakfast with family, a business lunch,
              or a romantic dinner, every meal is prepared with care by our
              experienced chefs.

            </p>

            {/* FEATURES */}

            <div className="mt-10 grid sm:grid-cols-2 gap-6">

              <div className="flex gap-4">

                <ChefHat className="text-yellow-500 mt-1" size={28} />

                <div>

                  <h3 className="font-bold text-lg">
                    Expert Chefs
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Delicious recipes prepared by experienced chefs.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <Leaf className="text-green-600 mt-1" size={28} />

                <div>

                  <h3 className="font-bold text-lg">
                    Fresh Ingredients
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Fresh vegetables, premium spices and quality ingredients.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <ShieldCheck className="text-blue-600 mt-1" size={28} />

                <div>

                  <h3 className="font-bold text-lg">
                    Hygienic Kitchen
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Clean and safe kitchen maintaining the highest standards.
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <CheckCircle2 className="text-yellow-500 mt-1" size={28} />

                <div>

                  <h3 className="font-bold text-lg">
                    Family Friendly
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Comfortable seating for couples, families and groups.
                  </p>

                </div>

              </div>

            </div>

            {/* HIGHLIGHTS */}

            <div className="mt-12 grid grid-cols-2 gap-5">

              <div className="bg-gray-50 rounded-2xl p-6 text-center shadow-sm">

                <h3 className="text-3xl font-black text-yellow-500">
                  100+
                </h3>

                <p className="mt-2 text-gray-600">
                  Delicious Dishes
                </p>

              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center shadow-sm">

                <h3 className="text-3xl font-black text-yellow-500">
                  1000+
                </h3>

                <p className="mt-2 text-gray-600">
                  Happy Guests
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}