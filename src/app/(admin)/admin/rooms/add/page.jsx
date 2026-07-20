"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/services/room.service";

export default function AddRoomPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
  });

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

  const handleImages = (e) => {
    setRoom((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

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
        formData.append("images", image);
      });

      await createRoom(formData);

      alert("Room added successfully ✅");

      router.push("/admin/rooms");
    } catch (err) {
      console.log(err);
      alert("Error while creating room ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">

      <h1 className="mb-8 text-3xl font-bold">
        Add New Room
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >

        {/* Room Title */}
        <div>
          <label className="mb-2 block font-medium">
            Room Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="VIP Deluxe Room"
            value={room.title}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block font-medium">
            Price Per Night
          </label>

          <input
            type="number"
            name="price"
            placeholder="2500"
            value={room.price}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Enter room description..."
            value={room.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="mb-2 block font-medium">
            Room Type
          </label>

          <select
            name="roomType"
            value={room.roomType}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Luxury">Luxury</option>
            <option value="Suite">Suite</option>
            <option value="Presidential">
              Presidential
            </option>
          </select>
        </div>

        {/* Capacity */}
        <div>
          <label className="mb-2 block font-medium">
            Guest Capacity
          </label>

          <select
            name="capacity"
            value={room.capacity}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
            <option value={5}>5 Guests</option>
            <option value={6}>6 Guests</option>
          </select>
        </div>

        {/* Bed */}
        <div>
          <label className="mb-2 block font-medium">
            Bed Type
          </label>

          <select
            name="bed"
            value={room.bed}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="Single Bed">
              Single Bed
            </option>
            <option value="Queen Bed">
              Queen Bed
            </option>
            <option value="King Bed">
              King Bed
            </option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="mb-2 block font-medium">
            Room Size
          </label>

          <input
            type="text"
            name="size"
            placeholder="450 sq.ft"
            value={room.size}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Floor */}
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
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Images */}
        <div>
          <label className="mb-2 block font-medium">
            Room Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="w-full rounded-lg border p-3"
          />

          {room.images.length > 0 && (
            <p className="mt-2 text-sm text-green-600">
              {room.images.length} image(s) selected
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black py-3 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating Room..." : "Add Room"}
        </button>

      </form>

    </div>
  );
}