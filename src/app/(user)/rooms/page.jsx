import RoomsHero from "@/components/user/rooms/RoomsHero";
import RoomsGrid from "@/components/user/rooms/RoomsGrid";
import WhyStay from "@/components/user/rooms/WhyStay";

export const metadata = {
  title: "Luxury Rooms | Hotel Star Palace",
  description:
    "Explore our luxury rooms and suites with premium facilities.",
};

// =========================
// API URL
// =========================
const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is missing. Please add it to your environment variables."
  );
}

// =========================
// Get All Rooms
// =========================
async function getRooms() {
  const res = await fetch(`${API}/rooms`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return res.json();
}

// =========================
// Search Rooms
// =========================
async function searchRooms(searchParams) {
  const query = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const res = await fetch(
    `${API}/rooms/search?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to search rooms");
  }

  return res.json();
}

// =========================
// Page
// =========================
export default async function RoomsPage({ searchParams }) {
  const params = await searchParams;

  let data;

  const hasSearch =
    params?.checkIn &&
    params?.checkOut;

  if (hasSearch) {
    data = await searchRooms(params);
  } else {
    data = await getRooms();
  }

  return (
    <main>
      <RoomsHero />

      <RoomsGrid rooms={data?.rooms || []} />

      <WhyStay />
    </main>
  );
}