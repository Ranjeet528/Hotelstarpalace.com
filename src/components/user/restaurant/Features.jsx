import {
  ChefHat,
  Leaf,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import { features } from "./data";

const icons = {
  ChefHat,
  Leaf,
  Star,
  UtensilsCrossed,
};

export default function Features() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-block bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-gray-900">
            More Than Just
            <span className="text-yellow-500"> A Restaurant</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Hotel Star Palace Restaurant, every meal is prepared with
            passion, served with care and enjoyed in a luxurious atmosphere.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {

            const Icon = icons[feature.icon];

            return (

              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-3 border border-transparent hover:border-yellow-400"
              >

                <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-500 transition">

                  <Icon
                    size={32}
                    className="text-yellow-600 group-hover:text-white transition"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-gray-900">

                  {feature.title}

                </h3>

                <p className="mt-4 text-gray-600 leading-7">

                  {feature.description}

                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}