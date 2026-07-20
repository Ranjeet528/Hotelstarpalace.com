"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Phone, Hash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function TrackBookingPage() {
  const router = useRouter();

  const [bookingId, setBookingId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!bookingId.trim() || !phone.trim()) {
      return toast.error("Please enter Booking ID and Phone Number");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(`${API}/bookings/track`, {
        bookingId: bookingId.trim().toUpperCase(),
        phone: phone.trim(),
      });

      if (!data.success) {
        return toast.error(data.message);
      }

      router.push(
        `/track-booking/${data.booking.bookingId}?phone=${encodeURIComponent(
          phone.trim()
        )}`
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Booking not found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-lg px-4">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Track Your Booking
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your Booking ID and Phone Number to view your booking.
          </p>

          <form onSubmit={handleTrack} className="mt-8 space-y-5">
            {/* Booking ID */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Booking ID
              </label>

              <div className="flex items-center rounded-xl border px-4">
                <Hash size={20} className="text-yellow-500" />

                <input
                  type="text"
                  placeholder="SP-2026-D0EC77"
                  value={bookingId}
                  onChange={(e) =>
                    setBookingId(e.target.value.toUpperCase())
                  }
                  className="h-12 w-full border-0 bg-transparent px-3 outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Phone Number
              </label>

              <div className="flex items-center rounded-xl border px-4">
                <Phone size={20} className="text-yellow-500" />

                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 w-full border-0 bg-transparent px-3 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              <Search size={18} />
              {loading ? "Searching..." : "Track Booking"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}