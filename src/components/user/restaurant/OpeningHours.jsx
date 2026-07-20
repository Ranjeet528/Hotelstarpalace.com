import {
  Clock3,
  MapPin,
  Phone,
  Mail,
  Car,
  BellRing,
} from "lucide-react";

import { openingHours } from "./data";

export default function OpeningHours() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-yellow-700">
            Visit Us
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-gray-900">
            Opening
            <span className="text-yellow-500"> Hours</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We welcome you every day with freshly prepared meals,
            exceptional hospitality and premium dining experience.
          </p>

        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-10">

          {/* Left */}

          <div className="rounded-3xl bg-gray-50 p-10 shadow-lg">

            <div className="flex items-center gap-3">

              <Clock3 className="text-yellow-500" size={32} />

              <h3 className="text-3xl font-bold text-gray-900">
                Restaurant Timings
              </h3>

            </div>

            <div className="mt-10 space-y-6">

              {openingHours.map((item) => (

                <div
                  key={item.title}
                  className="flex justify-between items-center border-b pb-5"
                >

                  <span className="font-semibold text-gray-900">
                    {item.title}
                  </span>

                  <span className="text-gray-600">
                    {item.time}
                  </span>

                </div>

              ))}

            </div>

            <div className="mt-10 rounded-2xl bg-yellow-500 p-6 text-center">

              <h4 className="text-2xl font-bold text-black">
                Open 7 Days A Week
              </h4>

              <p className="mt-2 text-black/80">
                Serving fresh food with love and hospitality every day.
              </p>

            </div>

          </div>

          {/* Right */}

          <div className="rounded-3xl bg-gray-900 text-white p-10 shadow-2xl">

            <h3 className="text-3xl font-bold">
              Restaurant Information
            </h3>

            <div className="mt-10 space-y-7">

              <div className="flex gap-4">

                <MapPin className="text-yellow-400 mt-1" />

                <div>

                  <h4 className="font-semibold">
                    Address
                  </h4>

                  <p className="text-gray-300 mt-2">
                    Hotel Star Palace,
                    Your City, Rajasthan, India
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <Phone className="text-yellow-400 mt-1" />

                <div>

                  <h4 className="font-semibold">
                    Phone
                  </h4>

                  <p className="text-gray-300 mt-2">
                    +91 XXXXX XXXXX
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <Mail className="text-yellow-400 mt-1" />

                <div>

                  <h4 className="font-semibold">
                    Email
                  </h4>

                  <p className="text-gray-300 mt-2">
                    info@hotelstarpalace.com
                  </p>

                </div>

              </div>

            </div>

            {/* Facilities */}

            <div className="mt-12 grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-white/10 p-6">

                <Car className="text-yellow-400 mb-3" />

                <h4 className="font-semibold">
                  Free Parking
                </h4>

              </div>

              <div className="rounded-2xl bg-white/10 p-6">

                <BellRing className="text-yellow-400 mb-3" />

                <h4 className="font-semibold">
                  Room Service
                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}