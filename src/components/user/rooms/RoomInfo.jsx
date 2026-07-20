import {
  Star,
  MapPin,
  BedDouble,
  Users,
  Maximize,
  Coffee,
  Wifi,
  Tv,
  Snowflake,
} from "lucide-react";

export default function RoomInfo({ room }) {
  const badge =
    room?.status === "unavailable"
      ? {
          text: "Unavailable",
          className: "bg-gray-800 text-white",
        }
      : room?.isCurrentlyBlocked
      ? {
          text: "Booked",
          className: "bg-red-500 text-white",
        }
      : {
          text: "Available",
          className: "bg-green-500 text-white",
        };

  return (
    <section className="mt-10">

      {/* Top */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500">

            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                fill="currentColor"
              />
            ))}

            <span className="ml-2 text-sm font-medium text-gray-600">
              4.9 (248 Reviews)
            </span>

          </div>

          {/* Location */}
          <div className="mt-3 flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span>Hotel Star Palace, Jaipur, Rajasthan</span>
          </div>

        </div>

        {/* Price */}
        <div className="rounded-xl bg-yellow-500 px-6 py-4 text-center shadow-lg">

          <p className="text-sm text-black">
            Starting From
          </p>

          <h2 className="mt-1 text-3xl font-bold text-black">
            ₹{room?.price}
          </h2>

          <p className="text-sm text-black">
            Per Night
          </p>

        </div>

      </div>

      {/* Room Name */}
      <div className="mt-10">

        <div className="flex flex-wrap items-center gap-4">

          <h1 className="text-4xl font-bold">
            {room?.title}
          </h1>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${badge.className}`}
          >
            {badge.text}
          </span>

        </div>

        <p className="mt-6 leading-8 text-gray-600">
          {room?.description}
        </p>

      </div>

      {/* Features */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <div className="flex items-center gap-3 rounded-xl border p-5 transition hover:shadow-md">

          <BedDouble className="text-yellow-500" />

          <div>
            <p className="font-semibold">
              {room?.bed || "King Bed"}
            </p>

            <span className="text-sm text-gray-500">
              Premium Bedding
            </span>
          </div>

        </div>

        <div className="flex items-center gap-3 rounded-xl border p-5 transition hover:shadow-md">

          <Users className="text-yellow-500" />

          <div>

            <p className="font-semibold">
              {room?.capacity || 2} Guests
            </p>

            <span className="text-sm text-gray-500">
              Maximum Capacity
            </span>

          </div>

        </div>

        <div className="flex items-center gap-3 rounded-xl border p-5 transition hover:shadow-md">

          <Maximize className="text-yellow-500" />

          <div>

            <p className="font-semibold">
              {room?.size || "450 sq.ft"}
            </p>

            <span className="text-sm text-gray-500">
              Room Size
            </span>

          </div>

        </div>

      </div>

      {/* Highlights */}
      <div className="mt-12">

        <h3 className="mb-6 text-2xl font-bold">
          Room Highlights
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-4 transition hover:bg-yellow-50">
            <Wifi className="text-yellow-500" />
            Free WiFi
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-4 transition hover:bg-yellow-50">
            <Tv className="text-yellow-500" />
            Smart TV
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-4 transition hover:bg-yellow-50">
            <Snowflake className="text-yellow-500" />
            Air Conditioning
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-4 transition hover:bg-yellow-50">
            <Coffee className="text-yellow-500" />
            Complimentary Breakfast
          </div>

        </div>

      </div>

    </section>
  );
}