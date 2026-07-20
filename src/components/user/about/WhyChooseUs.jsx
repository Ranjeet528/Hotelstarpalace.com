const features = [
  {
    icon: "🏨",
    title: "Luxury Rooms",
    description:
      "Beautifully designed rooms with modern facilities, elegant interiors and complete comfort."
  },
  {
    icon: "🛎️",
    title: "24/7 Room Service",
    description:
      "Our dedicated team is available anytime to make your stay comfortable and memorable."
  },
  {
    icon: "🍽️",
    title: "Premium Dining",
    description:
      "Enjoy delicious food prepared with quality ingredients and exceptional taste."
  },
  {
    icon: "🔒",
    title: "Safe & Secure Stay",
    description:
      "Your safety and privacy are our top priorities during your entire stay."
  },
  {
    icon: "📍",
    title: "Prime Location",
    description:
      "Convenient location with easy access to nearby attractions and facilities."
  },
  {
    icon: "⭐",
    title: "Best Hospitality",
    description:
      "Experience warm hospitality and personalized services from our team."
  }
];


export default function WhyChooseUs() {
  return (
    <section className="py-16 px-5 md:px-10 bg-gray-50">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="text-yellow-500 uppercase tracking-[3px] text-sm font-semibold">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
            We Provide More Than Just A Stay
          </h2>

          <p className="mt-4 text-gray-600">
            Experience luxury, comfort and exceptional services designed
            to make your stay unforgettable.
          </p>

        </div>


        {/* Cards */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition group"
            >

              <div className="text-4xl group-hover:scale-110 transition">
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