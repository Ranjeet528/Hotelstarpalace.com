const stats = [
  {
    number: "10+",
    title: "Luxury Rooms",
    description: "Comfortable rooms with premium facilities"
  },
  {
    number: "5000+",
    title: "Happy Guests",
    description: "Guests who enjoyed our hospitality"
  },
  {
    number: "5+",
    title: "Years Experience",
    description: "Providing quality hospitality services"
  },
  {
    number: "24/7",
    title: "Guest Support",
    description: "Always available for your comfort"
  }
];


export default function Stats() {
  return (
    <section className="py-16 px-5 md:px-10 bg-black">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center">

          <p className="text-yellow-400 uppercase tracking-[3px] text-sm font-semibold">
            Our Achievement
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
            Numbers That Define Our Success
          </h2>

        </div>


        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
            >

              <h3 className="text-4xl md:text-5xl font-bold text-yellow-400">
                {item.number}
              </h3>


              <h4 className="mt-3 text-xl font-semibold text-white">
                {item.title}
              </h4>


              <p className="mt-2 text-sm text-gray-400">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}