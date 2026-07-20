import Image from "next/image";
import { galleryImages } from "./data";

const captions = [
  "Elegant Ambience",
  "Signature Dishes",
  "Private Dining",
  "Fine Table Settings",
  "Chef's Special",
  "Warm Interiors",
];

// Curated bento pattern, repeats every 6 so it scales to any gallery length
const spanPattern = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-3 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
];

export default function Gallery() {
  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}

        <div className="flex flex-col items-start justify-between gap-6 border-b border-amber-100 pb-10 sm:flex-row sm:items-end">

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              Restaurant Gallery
            </span>

            <h2 className="mt-4 max-w-xl font-serif text-4xl italic leading-[1.1] text-gray-900 sm:text-5xl lg:text-6xl">
              Moments of{" "}
              <span className="text-amber-500">luxury dining</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-6 text-gray-500 sm:text-right">
            Elegant interiors, delicious dishes and memorable dining
            experiences at Hotel Star Palace Restaurant.
          </p>

        </div>

        {/* Mobile — horizontal filmstrip, feels alive instead of a static grid */}

        <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [&::-webkit-scrollbar]:hidden lg:hidden">
          {galleryImages.map((image, index) => {
            const caption = captions[index % captions.length];
            return (
              <div
                key={index}
                className="relative aspect-[3/4] w-[72vw] shrink-0 snap-start overflow-hidden rounded-2xl shadow-lg shadow-amber-950/10 sm:w-[45vw]"
              >
                <Image
                  src={image}
                  alt={`${caption} — Hotel Star Palace Restaurant`}
                  fill
                  quality={100}
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5 pt-16">
                  <span className="text-xs font-semibold text-amber-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 font-serif text-xl italic text-white">
                    {caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop — asymmetric bento, grayscale until hovered for an editorial feel */}

        <div className="mt-16 hidden lg:grid lg:auto-rows-[170px] lg:grid-cols-7 lg:gap-5">
          {galleryImages.map((image, index) => {
            const span = spanPattern[index % spanPattern.length];
            const caption = captions[index % captions.length];

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-transparent shadow-md shadow-amber-950/5 transition duration-500 hover:border-amber-400/50 hover:shadow-xl ${span}`}
              >
                <Image
                  src={image}
                  alt={`${caption} — Hotel Star Palace Restaurant`}
                  fill
                  quality={100}
                  className="object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

                <span className="absolute left-5 top-5 font-serif text-sm italic text-white/70 transition duration-500 group-hover:text-amber-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="absolute bottom-5 left-5 translate-y-2 font-serif text-2xl italic text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {caption}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}