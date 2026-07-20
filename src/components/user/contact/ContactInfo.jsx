import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Hotel Address",
    value: "Hotel Star Palace",
    description:
      "Manda Road, Khatoo, Rajasthan - 332602",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Phone,
    title: "Phone Number",
    value: "+91 XXXXX XXXXX",
    description:
      "Available 24 Hours for Booking",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mail,
    title: "Email Address",
    value: "info@hotelstarpalace.com",
    description:
      "We'll reply within 24 hours",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Clock,
    title: "Reception",
    value: "Open 24 × 7",
    description:
      "Always ready to assist you",
    color: "from-purple-500 to-pink-500",
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            GET IN TOUCH
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Contact Information
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Have questions about your stay?
            Our hospitality team is always happy
            to help you.
          </p>

        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {contactInfo.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-8
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >

                {/* Icon */}
                <div
                  className={`
                    flex h-16 w-16 items-center justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    ${item.color}
                    text-white
                    shadow-lg
                  `}
                >
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                {/* Main Value */}
                <p className="mt-4 break-words text-lg font-semibold text-orange-600">
                  {item.value}
                </p>

                {/* Description */}
                <p className="mt-3 leading-7 text-gray-500">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}