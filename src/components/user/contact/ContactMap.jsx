import {
  MapPin,
  Landmark,
  Navigation,
  Plane,
  Train,
} from "lucide-react";

export default function ContactMap() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            FIND US
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Visit Hotel Star Palace
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Conveniently located near Khatu Shyam Ji,
            making your journey comfortable and hassle-free.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* MAP */}

         <div className="overflow-hidden rounded-3xl border shadow-xl">
  <iframe
    title="Hotel Star Palace Location"
    src="https://www.google.com/maps?q=Hotel+Star+Palace+Khatu&output=embed"
    className="h-[500px] w-full border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

          {/* INFO */}

          <div className="space-y-8">

            <div className="rounded-3xl border p-8 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  <MapPin size={28} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    Hotel Address
                  </h3>

                  <p className="mt-2 text-gray-600 leading-7">
                    Hotel Star Palace
                    <br />
                    Manda Road,
                    <br />
                    Khatoo,
                    Rajasthan - 332602
                  </p>
                </div>

              </div>

            </div>

            <div className="rounded-3xl border p-8 shadow-sm">

              <h3 className="mb-8 text-2xl font-bold">
                Nearby Landmarks
              </h3>

              <div className="space-y-6">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-yellow-100 p-3">
                    <Landmark
                      className="text-yellow-600"
                      size={22}
                    />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Khatu Shyam Temple
                    </p>

                    <p className="text-gray-500">
                      Approx. 2 KM
                    </p>
                  </div>

                </div>
                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3">
                    <Navigation
                      className="text-blue-600"
                      size={22}
                    />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Jeen Mata Temple
                    </p>

                    <p className="text-gray-500">
                      Approx. 25 KM
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-green-100 p-3">
                    <Train
                      className="text-green-600"
                      size={22}
                    />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Ringas Junction
                    </p>

                    <p className="text-gray-500">
                      Approx. 17 KM
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-purple-100 p-3">
                    <Plane
                      className="text-purple-600"
                      size={22}
                    />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Jaipur Airport
                    </p>

                    <p className="text-gray-500">
                      Approx. 90 KM
                    </p>
                  </div>

                </div>

                

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}