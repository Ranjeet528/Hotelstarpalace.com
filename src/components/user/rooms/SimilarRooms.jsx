import Link from "next/link";
import RoomCard from "@/components/user/rooms/RoomCard";
import { ArrowRight } from "lucide-react";

export default function SimilarRooms({
  rooms = [],
  currentRoomId,
}) {
  const similarRooms = rooms
    .filter(
      (room) =>
        room._id !== currentRoomId &&
        room.status === "available"
    )
    .slice(0, 3)
    .map((room) => ({
      ...room,
      images:
        room.images && room.images.length > 0
          ? room.images
          : ["/images/placeholder-room.jpg"],
    }));

  if (similarRooms.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="font-semibold uppercase tracking-[3px] text-yellow-500">
              You May Also Like
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900">
              Similar Rooms
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Discover more luxury rooms designed for comfort,
              luxury and unforgettable experiences.
            </p>
          </div>

          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 font-semibold text-yellow-600 transition hover:gap-3"
          >
            View All Rooms
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {similarRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
            />
          ))}
        </div>

      </div>
    </section>
  );
}