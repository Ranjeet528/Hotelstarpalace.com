import {
  BedDouble,
  Wifi,
  UtensilsCrossed,
  Car,
  ShieldCheck,
  Headset,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Luxury Rooms",
      desc: "Elegant rooms with premium interiors, comfortable beds and modern amenities.",
      icon: BedDouble,
    },
    {
      title: "Free High-Speed Wi-Fi",
      desc: "Stay connected with complimentary high-speed internet throughout the hotel.",
      icon: Wifi,
    },
    {
      title: "Multi-Cuisine Restaurant",
      desc: "Enjoy delicious North Indian, Chinese, South Indian and Fast Food under one roof.",
      icon: UtensilsCrossed,
    },
    {
      title: "Free Parking",
      desc: "Spacious and secure parking facility available for all guests.",
      icon: Car,
    },
    {
      title: "Safe & Secure Stay",
      desc: "24×7 security, CCTV surveillance and a peaceful environment for your family.",
      icon: ShieldCheck,
    },
    {
      title: "24×7 Support",
      desc: "Friendly staff and room service available whenever you need assistance.",
      icon: Headset,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block px-5 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm uppercase tracking-[3px]">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-gray-900">
            Experience
            <span className="text-yellow-500"> Luxury Hospitality</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hotel Star Palace offers premium accommodation, delicious food,
            exceptional hospitality and modern amenities to make every stay
            comfortable and memorable.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl bg-white border border-gray-200 p-8 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-100 text-yellow-600 transition-all duration-500 group-hover:bg-yellow-500 group-hover:text-white">

                  <Icon size={34} />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-gray-900">

                  {item.title}

                </h3>

                <p className="mt-4 text-gray-600 leading-7">

                  {item.desc}

                </p>

                <div className="mt-8 h-1 w-12 rounded-full bg-yellow-500 transition-all duration-500 group-hover:w-24" />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}