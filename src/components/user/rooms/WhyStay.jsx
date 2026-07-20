import {
  ShieldCheck,
  Clock3,
  BadgeDollarSign,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with 24/7 security and modern facilities.",
  },
  {
    icon: Clock3,
    title: "Instant Booking",
    description:
      "Book your room in just a few clicks with instant confirmation.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description:
      "Enjoy premium luxury rooms at the best available prices.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Our team is always available to assist you anytime.",
  },
];

export default function WhyStay() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="font-semibold uppercase tracking-[4px] text-yellow-500">
            Why Stay With Us
          </p>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            More Than Just A Hotel Stay
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Experience luxury, comfort and exceptional hospitality with
            services designed to make every stay memorable.
          </p>

        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 transition group-hover:bg-yellow-500">
                  <Icon
                    size={30}
                    className="text-yellow-600 group-hover:text-black"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
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