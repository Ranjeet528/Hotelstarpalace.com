import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "./data";

export default function FoodCategories() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block px-5 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold uppercase tracking-wider text-sm">
            Our Menu
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-gray-900">
            Explore Our
            <span className="text-yellow-500"> Multi-Cuisine</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Whether you crave authentic Indian spices, sizzling Chinese,
            crispy fast food or delicious desserts, our restaurant offers
            something special for everyone.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {categories.map((item, index) => (

            <div
              key={index}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition duration-500"
            >

              {/* Image */}

              <div className="relative h-72 overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={100}
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Title on Image */}

                <div className="absolute bottom-6 left-6">

                  <h3 className="text-3xl font-bold text-white">

                    {item.title}

                  </h3>

                </div>

              </div>

              {/* Content */}

              <div className="p-8">

                <p className="text-gray-600 leading-7">

                  {item.description}

                </p>

                <button
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-yellow-600 hover:text-yellow-500 transition"
                >

                  Explore Cuisine

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}