import Image from "next/image";

export default function RoomGallery({ room }) {
  const images = room?.images || [];

  return (
    <section className="mx-auto max-w-7xl px-5 py-8">

      {/* Heading */}
      <div className="mb-8">

        <p className="text-sm font-semibold uppercase tracking-[3px] text-yellow-500">
          Luxury Room
        </p>

        <h1 className="mt-3 text-4xl font-bold text-gray-900">
          {room?.title}
        </h1>

        <p className="mt-3 max-w-3xl text-gray-600">
          {room?.description}
        </p>

      </div>

      {/* Gallery */}
      {images.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-4">

          {/* Main Image */}
          <div className="relative h-[500px] overflow-hidden rounded-2xl lg:col-span-2 lg:row-span-2">
            <Image
              src={images[0]}
              alt={room.title}
              fill
              priority
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* Remaining Images */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative h-60 overflow-hidden rounded-2xl"
            >
              <Image
                src={image}
                alt={`${room.title} ${index + 2}`}
                fill
                sizes="(max-width:768px) 100vw, 25vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}

        </div>
      ) : (
        <div className="flex h-96 items-center justify-center rounded-2xl bg-gray-100">
          <p className="text-gray-500">
            No images available
          </p>
        </div>
      )}

    </section>
  );
}