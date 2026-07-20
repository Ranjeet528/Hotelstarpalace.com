import {
  Wifi,
  Tv,
  Snowflake,
  Coffee,
  Bath,
  Car,
  ShieldCheck,
  Utensils,
  Dumbbell,
  Waves,
  WashingMachine,
  BellRing,
} from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
  },
  {
    icon: Tv,
    title: "Smart TV",
  },
  {
    icon: Snowflake,
    title: "Air Conditioning",
  },
  {
    icon: Coffee,
    title: "Tea & Coffee Maker",
  },
  {
    icon: Bath,
    title: "Luxury Bathroom",
  },
  {
    icon: Car,
    title: "Free Parking",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
  },
  {
    icon: Utensils,
    title: "Restaurant Service",
  },

  {
    icon: BellRing,
    title: "Room Service",
  },
];

export default function RoomAmenities() {
  return (
    <section className="mt-16">

      <div className="mb-8">

        <p className="font-semibold uppercase tracking-[3px] text-yellow-500">
          Amenities
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Room Amenities
        </h2>

        <p className="mt-3 text-gray-600">
          Everything you need for a luxurious and comfortable stay.
        </p>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {amenities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border bg-white p-5 transition hover:border-yellow-500 hover:shadow-lg"
            >
              <div className="rounded-full bg-yellow-100 p-3">
                <Icon className="text-yellow-600" size={24} />
              </div>

              <span className="font-medium">
                {item.title}
              </span>
            </div>
          );
        })}

      </div>

    </section>
  );
}