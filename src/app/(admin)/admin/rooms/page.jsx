"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getRooms,
  deleteRoom,
  updateRoomStatus,
  updateFeaturedStatus,
} from "@/services/room.service";
// =========================
// CHECK IF ROOM IS BLOCKED TODAY
// =========================
const isRoomBlockedForAdmin = (room) => {

  if (!room?.blockedSlots?.length) return false;


  const today = new Date();
  today.setHours(0,0,0,0);


  return room.blockedSlots.some((slot)=>{

    const end = new Date(slot.end);

    end.setHours(23,59,59,999);


    // अगर block आज या future में खत्म होगा
    return end >= today;

  });

};

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  // =========================
  // LOAD ROOMS
  // =========================
  const loadRooms = async () => {
    try {
      const res = await getRooms();

      const roomsData =
        res?.rooms || res?.data?.rooms || [];

        console.log("ROOM DATA:", roomsData);

   const updatedRooms = roomsData.map((room)=>({
  ...room,
  isCurrentlyBlocked: isRoomBlockedForAdmin(room)
}));
setRooms(updatedRooms);
    } catch (err) {
      console.log(err);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE ROOM
  // =========================
  const handleDelete = async (id) => {
    if (!confirm("Delete room?")) return;

    try {
      await deleteRoom(id);

      setRooms((prev) =>
        prev.filter((room) => room._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // STATUS TOGGLE
  // =========================
  const toggleStatus = async (id) => {
    try {
      const res = await updateRoomStatus(id);

      const updatedRoom =
        res?.room || res?.data?.room;

     setRooms((prev) =>
  prev.map((room) =>
    room._id === id
      ? {
          ...updatedRoom,
          isCurrentlyBlocked: isRoomBlockedForAdmin(updatedRoom)  
        }
      : room
  )
);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FEATURED TOGGLE
  // =========================
  const toggleFeatured = async (id) => {
    try {
      const res = await updateFeaturedStatus(id);

      const updatedRoom =
        res?.room || res?.data?.room;

     setRooms((prev) =>
  prev.map((room) =>
    room._id === id
      ? {
          ...updatedRoom,
          isCurrentlyBlocked: isRoomBlockedForAdmin(updatedRoom)
        }
      : room
  )
);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <p className="p-10 text-center text-gray-500">
        Loading rooms...
      </p>
    );
  }
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Manage Rooms
        </h1>

        <Link
          href="/admin/rooms/add"
          className="rounded-xl bg-black px-5 py-2 text-white transition hover:bg-gray-800"
        >
          + Add Room
        </Link>

      </div>

      {/* Table Header */}
      <div className="hidden rounded-xl bg-gray-100 p-4 font-semibold md:flex">
        <div className="w-2/5">Room</div>
        <div className="w-1/5">Price</div>
        <div className="w-1/5">Status</div>
        <div className="w-1/5 text-right">Actions</div>
      </div>

      {/* Room List */}
      <div className="space-y-4">

        {rooms.map((room) => (

          <div
            key={room._id}
            className="rounded-xl border bg-white p-4 shadow-sm md:flex md:items-center md:justify-between"
          >

            {/* Left */}
            <div className="flex items-center gap-4 md:w-2/5">

              <img
                src={
                  room.images?.length > 0
                    ? room.images[0]
                    : room.image ||
                    "https://placehold.co/100x100?text=Room"
                }
                alt={room.title}
                className="h-20 w-20 rounded-xl object-cover"
              />

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-lg font-semibold">
                    {room.title}
                  </h2>

                  {room.isFeatured && (
                    <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
                      ⭐ Featured
                    </span>
                  )}

                </div>

                <p className="text-sm text-gray-500">
                  ₹{room.price} / Night
                </p>

                <p className="text-xs text-gray-400">
                  {room.roomType} • {room.capacity} Guests
                </p>

           {room.isCurrentlyBlocked && (
  <p className="mt-1 text-sm font-bold text-red-600">
    🔴 Blocked
  </p>
)}

              </div>

            </div>

            {/* Price */}
            <div className="mt-4 font-semibold md:mt-0 md:w-1/5">
              ₹{room.price}
            </div>

            {/* Status + Featured */}
            <div className="mt-4 flex flex-col gap-2 md:mt-0 md:w-1/5">

              <button
                onClick={() => toggleStatus(room._id)}
                className={`rounded-lg px-4 py-2 text-white transition ${room.status === "available"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-700 hover:bg-gray-800"
                  }`}
              >
                {room.status === "available"
                  ? "Available"
                  : "Unavailable"}
              </button>

              <button
                onClick={() => toggleFeatured(room._id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${room.isFeatured
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {room.isFeatured
                  ? "★ Featured"
                  : "☆ Make Featured"}
              </button>

            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3 md:mt-0 md:w-1/5 md:justify-end">

              <Link
                href={`/admin/rooms/edit/${room._id}`}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(room._id)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}