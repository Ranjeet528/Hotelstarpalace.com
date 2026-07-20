import Image from "next/image";
import { Star } from "lucide-react";
import { signatureDishes } from "./data";

export default function SignatureDishes() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-yellow-700">
            Chef's Recommendation
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-gray-900">
            Signature
            <span className="text-yellow-500"> Dishes</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Carefully crafted dishes prepared by our expert chefs using premium
            ingredients and authentic recipes.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

          {signatureDishes.map((dish, index) => (

            <div
              key={index}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >

              {/* Image */}

              <div className="relative h-72 overflow-hidden">

                <Image
                  src={dish.image}
                  alt={dish.title}
                  fill
                  quality={100}
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badge */}

                <div className="absolute left-5 top-5 rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-lg">

                  Chef Special

                </div>

              </div>

              {/* Content */}

              <div className="p-7">

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-bold text-gray-900">

                    {dish.title}

                  </h3>

                  <div className="flex">

                    {[...Array(5)].map((_, i) => (

                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                        className="text-yellow-500"
                      />

                    ))}

                  </div>

                </div>

                <p className="mt-4 leading-7 text-gray-600">

                  Prepared with authentic recipes, premium ingredients and
                  served fresh by our experienced chefs.

                </p>

                <button className="mt-8 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-yellow-500 hover:text-black">

                  Order at Restaurant

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}