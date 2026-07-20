import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Users,
  Maximize,
  ArrowRight,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getFeaturedRooms() {
  try {
   const res = await fetch(`${API}/rooms/featured`, {
  cache: "no-store",
});

    if (!res.ok) {
      throw new Error("Failed to fetch featured rooms");
    }

    const data = await res.json();

    return data.rooms || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function FeaturedRooms() {
  const rooms = await getFeaturedRooms();

  if (rooms.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <span className="inline-block rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold uppercase tracking-[3px] text-yellow-700">
              Our Rooms
            </span>

            <h2 className="mt-5 text-4xl font-black text-gray-900 lg:text-5xl">
              Featured
              <span className="text-yellow-500">
                {" "}
                Luxury Rooms
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Choose from our carefully designed rooms offering comfort,
              elegance and premium hospitality for an unforgettable stay.
            </p>

          </div>

          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 font-semibold text-yellow-600 transition hover:text-yellow-500"
          >
            View All Rooms
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {rooms.map((room) => (

            <div
              key={room._id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}
              <div className="relative h-72 overflow-hidden">

                <Image
                  src={
                    room.images?.[0] ||
                    room.image ||
                    "https://placehold.co/600x400?text=Room"
                  }
                  alt={room.title}
                  fill
                  priority={false}
                  sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute right-5 top-5 rounded-full bg-yellow-500 px-4 py-2 font-bold text-black shadow-lg">
                  ₹{room.price} / Night
                </div>

              </div>

              {/* Content */}
              <div className="p-7">

                <div className="flex items-center gap-1 text-yellow-500">

                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={17}
                      fill="currentColor"
                    />
                  ))}

                </div>

                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                  {room.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                  {room.description}
                </p>

                <div className="mt-6 flex justify-between text-gray-600">

                  <div className="flex items-center gap-2">

                    <Maximize size={18} />

                    <span>{room.size}</span>

                  </div>

                  <div className="flex items-center gap-2">

                    <Users size={18} />

                    <span>{room.capacity} Guests</span>

                  </div>

                </div>

                <Link href={`/rooms/${room._id}`}>

                  <button className="mt-8 w-full rounded-xl bg-gray-900 py-4 font-semibold text-white transition hover:bg-yellow-500 hover:text-black">

                    View Details

                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}