const facilities = [
  {
    icon: "📶",
    title: "Free WiFi",
    description:
      "Stay connected with high-speed internet access available throughout the hotel."
  },
  {
    icon: "🚗",
    title: "Parking Facility",
    description:
      "Secure and spacious parking area for our guests."
  },
  {
    icon: "🍴",
    title: "Restaurant",
    description:
      "Enjoy delicious cuisine with a comfortable dining experience."
  },
  {
    icon: "❄️",
    title: "Air Conditioned Rooms",
    description:
      "Relax in perfectly designed rooms with modern comfort."
  },
  {
    icon: "🛎️",
    title: "Room Service",
    description:
      "Quick and convenient service available whenever you need it."
  },
  {
    icon: "💼",
    title: "Conference Hall",
    description:
      "A perfect space for meetings, events and business gatherings."
  }
];


export default function Facilities() {
  return (
    <section className="py-16 px-5 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="text-yellow-500 uppercase tracking-[3px] text-sm font-semibold">
            Our Facilities
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
            Everything You Need For A Perfect Stay
          </h2>

          <p className="mt-4 text-gray-600">
            We provide modern facilities and premium services to make
            your stay comfortable and enjoyable.
          </p>

        </div>


        {/* Facilities Cards */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {facilities.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-7 hover:border-yellow-500 hover:shadow-lg transition group"
            >

              <div className="h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center text-3xl group-hover:bg-yellow-500 transition">
                {item.icon}
              </div>


              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {item.title}
              </h3>


              <p className="mt-3 text-gray-600 leading-relaxed">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}