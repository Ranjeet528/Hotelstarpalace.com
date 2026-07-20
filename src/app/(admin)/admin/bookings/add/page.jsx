"use client";

import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createBooking, checkAvailability } from "@/services/booking.service";
import { getRooms } from "@/services/room.service";

const MAX_CHILD_AGE = 10; // above this, guest is treated as an adult

export default function AddBookingPage() {
  // ===============================
  // STATES
  // ===============================
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    roomId: "",
    adults: 2,
    children: 0,
    childrenAges: [],
    specialRequest: "",
  });

  // ===============================
  // FETCH ROOMS
  // ===============================
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await getRooms();
      const data = res.rooms || res.data?.rooms || res.data || [];
      setRooms(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "adults" || name === "children" ? Number(value) : value,
    }));
  };

  // ===============================
  // ROOM CHANGE
  // ===============================
  const handleRoomChange = (e) => {
    const room = rooms.find((r) => r._id === e.target.value);

    setSelectedRoom(room);

    setForm((prev) => ({
      ...prev,
      roomId: room?._id || "",
    }));
  };

  // ===============================
  // KEEP childrenAges IN SYNC WITH children COUNT
  // ===============================
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      childrenAges:
        prev.childrenAges.length === prev.children
          ? prev.childrenAges
          : Array(prev.children).fill(""),
    }));
  }, [form.children]);

  // ===============================
  // CHILD AGE
  // ===============================
  const handleChildAge = (index, value) => {
    const ages = [...form.childrenAges];
    ages[index] = value === "" ? "" : Number(value);

    setForm((prev) => ({
      ...prev,
      childrenAges: ages,
    }));
  };

  // ===============================
  // CHECK-IN FIXED 12 PM
  // ===============================
  const getCheckinTime = (date) => {
    if (!date) return null;

    const d = new Date(date);
    d.setHours(12, 0, 0, 0);

    return d;
  };

  // ===============================
  // CHECKOUT FIXED 11 AM
  // ===============================
  const getCheckoutTime = (date) => {
    if (!date) return null;

    const d = new Date(date);
    d.setHours(11, 0, 0, 0);

    return d;
  };

  // ===============================
  // LOCAL ISO (no UTC shift)
  // ===============================
  const toLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
  };

  // ===============================
  // TOTAL NIGHTS
  // ===============================
  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;

    const checkin = getCheckinTime(checkInDate);
    const checkout = getCheckoutTime(checkOutDate);
    const diff = (checkout - checkin) / (1000 * 60 * 60 * 24);

    return diff > 0 ? Math.ceil(diff) : 1;
  }, [checkInDate, checkOutDate]);

  // ===============================
  // TOTAL PRICE
  // ===============================
  const total = (selectedRoom?.price || 0) * nights;

  // ===============================
  // SUBMIT BOOKING
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customerName.trim()) {
      return alert("Customer name is required");
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      return alert("Enter valid phone number");
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return alert("Enter valid email");
    }

    if (!form.roomId) {
      return alert("Select room");
    }

    if (!checkInDate) {
      return alert("Select check-in");
    }

    if (!checkOutDate) {
      return alert("Select check-out");
    }

    // Validate child ages
    if (form.children > 0) {
      const emptyAge = form.childrenAges.some((age) => age === "" || age === null);

      if (emptyAge) {
        return alert("Please select all children's ages.");
      }

      const invalid = form.childrenAges.some((age) => Number(age) > MAX_CHILD_AGE);

      if (invalid) {
        return alert(`Children age cannot exceed ${MAX_CHILD_AGE} years.`);
      }
    }

    try {
      setLoading(true);

      const checkin = getCheckinTime(checkInDate);
      const checkout = getCheckoutTime(checkOutDate);
      const checkInISO = toLocalISOString(checkin);
      const checkOutISO = toLocalISOString(checkout);

      // ===============================
      // CHECK ROOM AVAILABILITY (re-validated at submit time,
      // so it always reflects the latest room/date selection)
      // ===============================
      const availability = await checkAvailability({
        roomId: form.roomId,
        checkIn: checkInISO,
        checkOut: checkOutISO,
      });

      // Debug helper: if this keeps failing, check the console to see
      // the actual shape of the response from checkAvailability().
      console.log("Availability response:", availability);

      const isAvailable =
        availability?.data?.available ??
        availability?.data?.data?.available ??
        availability?.available ??
        false;

      if (!isAvailable) {
        setLoading(false);
        return alert("Selected room is not available.");
      }

      // ===============================
      // CREATE BOOKING
      // ===============================
      await createBooking({
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        roomId: form.roomId,
        adults: form.adults,
        children: form.children,
        childrenAges: form.childrenAges,
        price: selectedRoom.price,
        specialRequest: form.specialRequest,
        checkIn: checkInISO,
        checkOut: checkOutISO,
      });

      alert("Booking Created Successfully ✅");

      setForm({
        customerName: "",
        phone: "",
        email: "",
        roomId: "",
        adults: 2,
        children: 0,
        childrenAges: [],
        specialRequest: "",
      });

      setSelectedRoom(null);
      setCheckInDate(null);
      setCheckOutDate(null);

      loadRooms();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // RETURN
  // ===============================
  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="mb-8 text-3xl font-bold">Create Booking</h1>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* ==========================
              LEFT
          ========================== */}
          <div className="space-y-6 lg:col-span-2">
            {/* CUSTOMER */}
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-bold">Customer Details</h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
                    placeholder="Enter customer name"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block font-medium">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </div>

            {/* ROOM */}
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-bold">Room Details</h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block font-medium">Select Room</label>
                  <select
                    value={form.roomId}
                    onChange={handleRoomChange}
                    className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
                  >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title} — ₹{room.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Adults</label>
                  <select
                    name="adults"
                    value={form.adults}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Children</label>
                  <select
                    name="children"
                    value={form.children}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* CHILDREN AGE */}
            {form.children > 0 && (
              <div className="rounded-3xl bg-white p-6 shadow">
                <h2 className="mb-6 text-xl font-bold">Children Ages</h2>

                <div className="grid gap-5 md:grid-cols-2">
                  {Array.from({ length: form.children }).map((_, index) => (
                    <div key={index}>
                      <label className="mb-2 block">Child {index + 1}</label>
                      <select
                        value={form.childrenAges[index] ?? ""}
                        onChange={(e) => handleChildAge(index, e.target.value)}
                        className="w-full rounded-xl border p-3"
                      >
                        <option value="">Select Age</option>
                        {/* Ages go a bit beyond MAX_CHILD_AGE so the
                            "treated as adult" validation can actually fire */}
                        {Array.from({ length: MAX_CHILD_AGE + 5 }).map((_, age) => (
                          <option key={age} value={age}>
                            {age} Years
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  Children above {MAX_CHILD_AGE} years are treated as adults.
                </p>
              </div>
            )}

            {/* DATE & TIME */}
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-bold">Stay Details</h2>

              <div className="grid gap-5 md:grid-cols-2">
                {/* CHECK IN */}
                <div>
                  <label className="mb-2 block font-medium">
                    Check-In (12:00 PM Fixed)
                  </label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => {
                      setCheckInDate(date);

                      if (checkOutDate && date && checkOutDate <= date) {
                        setCheckOutDate(null);
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className="w-full rounded-xl border p-3"
                    placeholderText="Select Check-In"
                  />
                </div>

                {/* CHECK OUT */}
                <div>
                  <label className="mb-2 block font-medium">
                    Check-Out (11:00 AM Fixed)
                  </label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={setCheckOutDate}
                    dateFormat="dd/MM/yyyy"
                    minDate={
                      checkInDate
                        ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                        : new Date()
                    }
                    className="w-full rounded-xl border p-3"
                    placeholderText="Select Check-Out"
                  />
                </div>
              </div>
            </div>

            {/* SPECIAL REQUEST */}
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-5 text-xl font-bold">Special Request</h2>

              <textarea
                rows={5}
                name="specialRequest"
                value={form.specialRequest}
                onChange={handleChange}
                placeholder="Extra pillow, birthday decoration, late arrival..."
                className="w-full rounded-xl border p-4 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* ==========================
              RIGHT SIDE
          ========================== */}
          <div>
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-6 text-2xl font-bold">Booking Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Room</span>
                  <span>{selectedRoom?.title || "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span>Price / Night</span>
                  <span>₹{selectedRoom?.price || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Adults</span>
                  <span>{form.adults}</span>
                </div>

                <div className="flex justify-between">
                  <span>Children</span>
                  <span>{form.children}</span>
                </div>

                <div className="flex justify-between">
                  <span>Nights</span>
                  <span>{nights}</span>
                </div>

                {checkInDate && (
                  <div className="flex justify-between">
                    <span>Check-In</span>
                    <span>
                      {checkInDate.toLocaleDateString("en-IN")} • 12:00 PM
                    </span>
                  </div>
                )}

                {checkOutDate && (
                  <div className="flex justify-between">
                    <span>Check-Out</span>
                    <span>
                      {checkOutDate.toLocaleDateString("en-IN")} • 11:00 AM
                    </span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white hover:bg-gray-900 disabled:opacity-60"
              >
                {loading ? "Creating Booking..." : "Create Booking"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}