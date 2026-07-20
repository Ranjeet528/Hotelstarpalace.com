import RoomCard from "./RoomCard";

export default function RoomsGrid({ rooms }) {
  return (
    <section id="rooms" className="py-20">

      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-12 text-center">

          <p className="font-semibold uppercase tracking-[3px] text-yellow-500">
            Our Rooms
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Choose Your Perfect Stay
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover our collection of luxury rooms designed for comfort,
            elegance and unforgettable experiences.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No rooms available.
            </p>
          )}

        </div>

      </div>

    </section>
  );
}