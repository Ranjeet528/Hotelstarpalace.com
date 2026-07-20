 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  CalendarDays,
  Users,
  Baby,
  Hotel,
  Search,
} from "lucide-react";

export default function BookingBar() {
  const router = useRouter();
 const {
  isAuthenticated,
  loading: authLoading,
} = useAuth();

  const today = new Date().toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [roomType, setRoomType] = useState("all");

  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert("Please select Check-In and Check-Out dates.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-Out date must be after Check-In.");
      return;
    }

    setLoading(true);

    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      roomType,
    });

    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <section className="relative z-30 -mt-16 px-4">
      <div className="mx-auto max-w-7xl">

        <div className="rounded-3xl border border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur-xl lg:p-8">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6">

            {/* Check In */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Check In
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4 transition hover:border-yellow-500">

                <CalendarDays
                  size={22}
                  className="text-yellow-500"
                />

                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);

                    if (
                      checkOut &&
                      new Date(checkOut) <= new Date(e.target.value)
                    ) {
                      setCheckOut("");
                    }
                  }}
                  className="w-full bg-transparent outline-none"
                />

              </div>

            </div>

            {/* Check Out */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Check Out
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4 transition hover:border-yellow-500">

                <CalendarDays
                  size={22}
                  className="text-yellow-500"
                />

                <input
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />

              </div>

            </div>

            {/* Adults */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Adults
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4 transition hover:border-yellow-500">

                <Users
                  size={22}
                  className="text-yellow-500"
                />

                <select
                  value={adults}
                  onChange={(e) =>
                    setAdults(Number(e.target.value))
                  }
                  className="w-full bg-transparent outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item} Adult{item > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>

              </div>

            </div>
                        {/* Children */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Children
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4 transition hover:border-yellow-500">

                <Baby
                  size={22}
                  className="text-yellow-500"
                />

                <select
                  value={children}
                  onChange={(e) =>
                    setChildren(Number(e.target.value))
                  }
                  className="w-full bg-transparent outline-none"
                >
                  {[0, 1, 2, 3, 4].map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item} {item === 1 ? "Child" : "Children"}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* Room Type */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Room Type
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4 transition hover:border-yellow-500">

                <Hotel
                  size={22}
                  className="text-yellow-500"
                />

                <select
                  value={roomType}
                  onChange={(e) =>
                    setRoomType(e.target.value)
                  }
                  className="w-full bg-transparent outline-none"
                >
                  <option value="all">All Rooms</option>
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Super Deluxe">Super Deluxe</option>
                  <option value="Suite">Suite</option>
                  <option value="Executive">Executive</option>
                  <option value="Presidential">Presidential</option>
                </select>

              </div>

            </div>

            {/* Search Button */}

         <div className="flex items-end">

  <button
    onClick={handleSearch}
    disabled={loading}
   className="flex h-[58px] w-full items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 px-6 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:from-yellow-400 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
  >
    <Search size={20} />

    {loading ? "Checking..." : "Check Availability"}
  </button>

</div>

          </div>

          {/* Bottom Info */}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 border-t pt-5 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              ✅
              <span>Best Price Guarantee</span>
            </div>

            <div className="flex items-center gap-2">
              🔒
              <span>Secure Booking</span>
            </div>

            <div className="flex items-center gap-2">
              📞
              <span>24×7 Customer Support</span>
            </div>

          </div>

          {/* Track Booking */}
{/* Track Booking */}
{!authLoading && !isAuthenticated && (
  <div className="mt-6 border-t border-gray-200 pt-6 text-center">
    <p className="text-sm text-gray-600">
      Already have a booking?
    </p>

    <button
      onClick={() => router.push("/track-booking")}
      className="mt-3 inline-flex items-center gap-2 rounded-xl border border-yellow-500 px-6 py-3 font-semibold text-yellow-600 transition hover:bg-yellow-500 hover:text-white"
    >
      <Search size={18} />
      Track Booking
    </button>
  </div>
)}

        </div>

      </div>

    </section>
  );
} 