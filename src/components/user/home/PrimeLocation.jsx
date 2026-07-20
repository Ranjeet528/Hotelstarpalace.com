import {
  Landmark,
  Train,
  Plane,
  MapPin,
  Car,
  ShieldCheck,
} from "lucide-react";

export default function PrimeLocation() {
  const locations = [
    {
      icon: Landmark,
      distance: "2 KM",
      title: "Khatu Shyam Ji Temple",
      subtitle: "Just 5 Minutes Drive",
    },
    {
      icon: Train,
      distance: "17.2 KM",
      title: "Ringas Junction",
      subtitle: "Approx. 25 Minutes",
    },
    {
      icon: Plane,
      distance: "90 KM",
      title: "Jaipur Airport",
      subtitle: "Approx. 2 Hours Drive",
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="relative overflow-hidden rounded-[32px] bg-white border border-yellow-200 shadow-2xl">

          {/* Background Glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl" />

          {/* Golden Top Line */}
          <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600" />

          <div className="relative p-8 lg:p-10">

            {/* Heading */}

            <div className="text-center">

              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-5 py-2">

                <MapPin size={18} className="text-yellow-600" />

                <span className="text-sm font-semibold uppercase tracking-[3px] text-yellow-700">
                  Prime Location
                </span>

              </div>

              <h2 className="mt-5 text-3xl lg:text-4xl font-black text-gray-900">
                Perfectly Located For
                <span className="text-yellow-500"> Your Journey</span>
              </h2>

            </div>

            {/* Location Cards */}

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3">

              {locations.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className={`text-center px-6 py-4 ${
                      index !== 2
                        ? "md:border-r border-yellow-100"
                        : ""
                    }`}
                  >

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 shadow-md">

                      <Icon size={30} />

                    </div>

                    <h3 className="mt-5 text-4xl font-black text-gray-900">

                      {item.distance}

                    </h3>

                    <h4 className="mt-2 text-lg font-bold text-gray-800">

                      {item.title}

                    </h4>

                    <p className="mt-1 text-sm text-gray-500">

                      {item.subtitle}

                    </p>

                  </div>
                );
              })}

            </div>

            {/* Bottom Strip */}

            <div className="mt-8 border-t border-yellow-100 pt-6">

              <div className="flex flex-wrap justify-center gap-6 lg:gap-10">

                <div className="flex items-center gap-2 text-gray-700">

                  <Car
                    size={20}
                    className="text-yellow-500"
                  />

                  <span className="font-medium">
                    Free Parking
                  </span>

                </div>

                <div className="flex items-center gap-2 text-gray-700">

                  <ShieldCheck
                    size={20}
                    className="text-yellow-500"
                  />

                  <span className="font-medium">
                    Safe Family Stay
                  </span>

                </div>

                <div className="flex items-center gap-2 text-gray-700">

                  <MapPin
                    size={20}
                    className="text-yellow-500"
                  />

                  <span className="font-medium">
                    Closest to Khatu Shyam Ji
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}