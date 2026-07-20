export default function VisionMission() {
  return (
    <section className="py-16 px-5 md:px-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">


        {/* Vision */}
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-xl transition">

          <div className="h-14 w-14 rounded-full bg-yellow-500 flex items-center justify-center text-2xl">
            👁️
          </div>


          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Our Vision
          </h2>


          <p className="mt-4 text-gray-600 leading-relaxed">
            Our vision is to become a trusted name in hospitality by
            providing exceptional experiences, modern facilities and
            world-class comfort to every guest.
          </p>

        </div>



        {/* Mission */}
        <div className="p-8 rounded-2xl bg-black text-white hover:shadow-xl transition">

          <div className="h-14 w-14 rounded-full bg-yellow-500 flex items-center justify-center text-2xl text-black">
            🎯
          </div>


          <h2 className="mt-6 text-3xl font-bold">
            Our Mission
          </h2>


          <p className="mt-4 text-gray-300 leading-relaxed">
            Our mission is to deliver personalized hospitality,
            comfortable stays and memorable moments by maintaining
            quality, safety and excellent service standards.
          </p>

        </div>


      </div>

    </section>
  );
}