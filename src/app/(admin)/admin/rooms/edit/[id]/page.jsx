"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getRoom,
  updateRoom,
  blockRoom,
  unblockRoom,
} from "@/services/room.service";

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [room, setRoom] = useState({
    title: "",
    price: "",
    description: "",
    roomType: "Deluxe",
    capacity: 2,
    bed: "King Bed",
    size: "450 sq.ft",
    floor: 1,
    images: [],
    status: "available",
    blockedSlots: [],
  });

  // =========================
  // FETCH ROOM
  // =========================
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await getRoom(id);

        setRoom({
          ...res.room,
          roomType: res.room.roomType || "Deluxe",
          capacity: res.room.capacity || 2,
          bed: res.room.bed || "King Bed",
          size: res.room.size || "450 sq.ft",
          floor: res.room.floor || 1,
          images: res.room.images || [],
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoom((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "capacity" ||
        name === "floor"
          ? Number(value)
          : value,
    }));
  };

  // =========================
  // UPDATE ROOM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", room.title);
      formData.append("price", room.price);
      formData.append("description", room.description);

      formData.append("roomType", room.roomType);
      formData.append("capacity", room.capacity);
      formData.append("bed", room.bed);
      formData.append("size", room.size);
      formData.append("floor", room.floor);

      room.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });

      await updateRoom(id, formData);

      alert("Room updated successfully ✅");

      router.push("/admin/rooms");
    } catch (err) {
      console.log(err);
      alert("Error updating room");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // BLOCK / UNBLOCK
  // =========================
 const isBlocked = room.blockedSlots?.some((slot)=>{

  const end = new Date(slot.end);

  return end >= new Date();

}); 

  const handleToggleBlock = async () => {
    try {

      if(!start || !end){
  alert("Please select start and end date");
  return;
}


if (new Date(start) >= new Date(end)){
  alert("End date must be after start date");
  return;
}
      if (isBlocked) {
        await unblockRoom(id);

        setRoom((prev) => ({
          ...prev,
          blockedSlots: [],
        }));

        alert("Room unblocked ✅");
      } else {
        await blockRoom(id, {
          start,
          end,
        });

        setRoom((prev) => ({
          ...prev,
          blockedSlots: [
            ...prev.blockedSlots,
            {
              start,
              end,
            },
          ],
        }));

        setStart("");
        setEnd("");

        alert("Room blocked 🚫");
      }
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="mx-auto max-w-3xl">

        <h1 className="mb-8 text-3xl font-bold">
          Edit Room
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-8 shadow"
        >

          {/* TITLE */}
          <div>
            <label className="mb-2 block font-medium">
              Room Title
            </label>

            <input
              name="title"
              value={room.title}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={room.price}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={room.description}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* ROOM TYPE */}
          <div>
            <label className="mb-2 block font-medium">
              Room Type
            </label>

            <select
              name="roomType"
              value={room.roomType}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            >
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Luxury">Luxury</option>
              <option value="Suite">Suite</option>
              <option value="Presidential">Presidential</option>
            </select>
          </div>
                    {/* CAPACITY */}
          <div>
            <label className="mb-2 block font-medium">
              Guest Capacity
            </label>

            <select
              name="capacity"
              value={room.capacity}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
              <option value={5}>5 Guests</option>
              <option value={6}>6 Guests</option>
            </select>
          </div>

          {/* BED TYPE */}
          <div>
            <label className="mb-2 block font-medium">
              Bed Type
            </label>

            <select
              name="bed"
              value={room.bed}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            >
              <option value="Single Bed">Single Bed</option>
              <option value="Queen Bed">Queen Bed</option>
              <option value="King Bed">King Bed</option>
            </select>
          </div>

          {/* ROOM SIZE */}
          <div>
            <label className="mb-2 block font-medium">
              Room Size
            </label>

            <input
              type="text"
              name="size"
              value={room.size}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              placeholder="450 sq.ft"
            />
          </div>

          {/* FLOOR */}
          <div>
            <label className="mb-2 block font-medium">
              Floor
            </label>

            <input
              type="number"
              min={1}
              name="floor"
              value={room.floor}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="mb-2 block font-medium">
              Room Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setRoom((prev) => ({
                  ...prev,
                  images: Array.from(e.target.files),
                }))
              }
            />

            {room.images?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {room.images.map((img, index) => (
                  <div
                    key={index}
                    className="h-24 w-24 overflow-hidden rounded-lg border"
                  >
                    <img
                      src={
                        img instanceof File
                          ? URL.createObjectURL(img)
                          : img
                      }
                      alt={`Room ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* STATUS */}
          <div>
            <span className="font-semibold">
              Status :
            </span>{" "}
            <span
              className={
                room.status === "available"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {room.status}
            </span>
          </div>

          {/* BLOCK / UNBLOCK */}
          <div className="rounded-xl border p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Block / Unblock Room
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="rounded-xl border p-3"
              />

              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="rounded-xl border p-3"
              />
            </div>

            <button
              type="button"
              onClick={handleToggleBlock}
              className={`mt-5 w-full rounded-xl py-3 text-white ${
                isBlocked
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {isBlocked
                ? "Unblock Room"
                : "Block Room"}
            </button>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update Room"}
          </button>

        </form>

      </div>

    </div>
  );
}