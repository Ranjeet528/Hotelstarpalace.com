import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Users,
  Wifi,
  ArrowRight,
} from "lucide-react";

export default function RoomCard({ room }) {
  const badge =
    room.status === "unavailable"
      ? {
          text: "Unavailable",
          className: "bg-gray-800 text-white",
        }
      : room.isCurrentlyBlocked
      ? {
          text: "Booked",
          className: "bg-red-500 text-white",
        }
      : {
          text: "Available",
          className: "bg-green-500 text-white",
        };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-64 overflow-hidden">

       <Image
  src={room.images?.[0]}
  alt={room.title}
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover transition duration-500 group-hover:scale-110"
/>

        {/* Price */}
        <span className="absolute left-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-sm font-semibold text-black shadow">
          ₹{room.price}/Night
        </span>

        {/* Status */}
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow ${badge.className}`}
        >
          {badge.text}
        </span>

      </div>

      {/* Content */}
      <div className="p-6">

        <h3 className="text-2xl font-bold text-gray-900">
          {room.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-gray-600">
          {room.description}
        </p>

        {/* Features */}
        <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <BedDouble
              size={18}
              className="text-yellow-500"
            />
            <span>{room.bed || "King Bed"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users
              size={18}
              className="text-yellow-500"
            />
            <span>{room.capacity || 2} Guests</span>
          </div>

          <div className="flex items-center gap-2">
            <Wifi
              size={18}
              className="text-yellow-500"
            />
            <span>Free WiFi</span>
          </div>

        </div>

        {/* Button */}
        <Link
          href={`/rooms/${room._id}`}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-yellow-600 transition-all duration-300 hover:gap-3 hover:text-yellow-500"
        >
          View Details
          <ArrowRight size={18} />
        </Link>

      </div>

    </div>
  );
}