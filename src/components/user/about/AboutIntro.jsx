export default function AboutIntro() {
  return (
    <section className="py-16 px-5 md:px-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/images/about-intro.jpg"
            alt="Hotel Star Palace luxury interior"
            className="w-full h-full object-cover"
          />
        </div>


        {/* Content */}
        <div>

          <p className="text-yellow-500 uppercase tracking-[3px] text-sm font-semibold">
            About Hotel
          </p>


          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
            Experience Luxury & Comfort Like Never Before
          </h2>


          <p className="mt-5 text-gray-600 leading-relaxed">
            Hotel Star Palace is a premium hospitality destination designed
            to provide exceptional comfort, elegance, and memorable stays.
            We combine modern facilities with warm hospitality to make every
            guest feel special.
          </p>


          <p className="mt-4 text-gray-600 leading-relaxed">
            From beautifully designed rooms to personalized services, our
            commitment is to deliver a relaxing and luxurious experience
            for business travelers, families, and holiday guests.
          </p>


          <div className="mt-8 grid grid-cols-2 gap-5">

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-2xl font-bold">
                5+
              </h3>
              <p className="text-gray-500">
                Years Experience
              </p>
            </div>


            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-2xl font-bold">
                5000+
              </h3>
              <p className="text-gray-500">
                Happy Guests
              </p>
            </div>

          </div>


        </div>

      </div>

    </section>
  );
}