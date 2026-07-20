"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  BedDouble,
  User,
} from "lucide-react";

import { fetchBookings } from "@/services/booking.service";
import { getRooms } from "@/services/room.service";

export default function BookingCalendar() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper: extract an array from a response no matter how it's wrapped
  // (handles: plain array, {data: [...]}, {data: {data: [...]}})
const extractArray = (res) => {
  if (Array.isArray(res)) return res;

  if (Array.isArray(res?.data)) return res.data;

  if (Array.isArray(res?.rooms)) return res.rooms;

  if (Array.isArray(res?.bookings)) return res.bookings;

  if (Array.isArray(res?.data?.data)) return res.data.data;

  if (Array.isArray(res?.data?.rooms)) return res.data.rooms;

  if (Array.isArray(res?.data?.bookings)) return res.data.bookings;

  return [];
};

  // Helper: get the room id off a booking whether roomId is populated
  // (an object with _id) or just a plain id string
  const getBookingRoomId = (booking) => {
    if (!booking?.roomId) return null;
    return typeof booking.roomId === "string"
      ? booking.roomId
      : booking.roomId._id;
  };

  // =========================
  // LOAD BOOKINGS + ROOMS
  // =========================
  const loadData = async () => {
    try {
      setLoading(true);

      const [bookingsRes, roomsRes] = await Promise.all([
        fetchBookings("all"),
        getRooms(),
      ]);

      const bookingsData = extractArray(bookingsRes);
      const roomsData = extractArray(roomsRes);

      // DEBUG: check your browser console — confirm both arrays are
      // non-empty and that a booking object has a `roomId` and `status`
      // field, and a room object has an `_id` field.
      console.log("rooms loaded:", roomsData);
      console.log("bookings loaded:", bookingsData);
      if (bookingsData[0]) {
        console.log("sample booking:", bookingsData[0]);
      }

      setBookings(bookingsData);
      setRooms(roomsData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =========================
  // MONTH INFO
  // =========================
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // =========================
  // CALENDAR CELLS
  // =========================
  const calendarDays = useMemo(() => {
    const cells = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      cells.push(null);
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day));
    }

    return cells;
  }, [firstDay, daysInMonth, month, year]);

  // =========================
  // PREVIOUS / NEXT MONTH
  // =========================
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // =========================
  // ROOM STATUS FOR SELECTED DATE
  // =========================
const roomStatus = useMemo(() => {
  const selected = new Date(selectedDate);
  selected.setHours(12, 0, 0, 0);

  return rooms.map((room) => {
    // Block check
    const isBlocked = room.blockedSlots?.some((slot) => {
      const start = new Date(slot.start);
      const end = new Date(slot.end);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      return selected >= start && selected <= end;
    });

    // Booking check
    const booking = bookings.find((b) => {
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);

      checkIn.setHours(0, 0, 0, 0);
      checkOut.setHours(23, 59, 59, 999);

      return (
        getBookingRoomId(b) === room._id &&
        ["booked", "checked_in"].includes(b.status) &&
        selected >= checkIn &&
        selected <= checkOut
      );
    });

    return {
      room,
      booking,
      isBlocked,
    };
  });
}, [rooms, bookings, selectedDate]);

const available = roomStatus.filter(
  (r) => !r.booking && !r.isBlocked
).length;

const booked = roomStatus.filter(
  (r) => r.booking
).length;

const blocked = roomStatus.filter(
  (r) => r.isBlocked
).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Booking Calendar</h1>

            <p className="mt-2 text-gray-500">
              View room availability by date
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={previousMonth}
              className="rounded-xl border p-3 hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="min-w-[220px] rounded-xl bg-orange-50 px-6 py-3 text-center font-bold text-orange-600">
              {monthName} {year}
            </div>

            <button
              onClick={nextMonth}
              className="rounded-xl border p-3 hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <CalendarDays className="text-orange-600" size={24} />

          <h2 className="text-xl font-bold">{monthName} Calendar</h2>
        </div>

        {/* WEEK DAYS */}
        <div className="grid grid-cols-7 gap-3 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="rounded-xl bg-gray-100 py-3 text-center font-semibold text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        {/* CALENDAR GRID */}
        <div className="grid grid-cols-7 gap-3">
          {calendarDays.map((date, index) => {
            if (!date) {
              return (
                <div key={index} className="h-20 rounded-2xl bg-gray-50" />
              );
            }

            const isToday =
              date.toDateString() === new Date().toDateString();

            const isSelected =
              date.toDateString() === selectedDate.toDateString();

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`h-20 rounded-2xl border transition-all
                ${
                  isSelected
                    ? "border-orange-500 bg-orange-500 text-white shadow-lg"
                    : isToday
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <span className="text-lg font-bold">{date.getDate()}</span>

                  {isToday && !isSelected && (
                    <span className="mt-1 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                      Today
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED DATE */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-orange-600" size={22} />

          <h2 className="text-xl font-bold">
            {selectedDate.toLocaleDateString("en-IN", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>

        <p className="mt-2 text-gray-500">
          Room availability for the selected date.
        </p>

        {/* ==========================
              SUMMARY
        ========================== */}
        {loading ? (
          <div className="mt-6 rounded-2xl bg-gray-50 p-10 text-center text-gray-500">
            Loading rooms...
          </div>
        ) : (
          <>
            <div className="mt-6 mb-6 grid gap-5 md:grid-cols-4">
              <div className="rounded-2xl border bg-white p-5">
                <p className="text-gray-500">Total Rooms</p>

                <h2 className="mt-2 text-3xl font-bold">{rooms.length}</h2>
              </div>

              <div className="rounded-2xl border bg-green-50 p-5">
                <p className="text-green-700">Available</p>

                <h2 className="mt-2 text-3xl font-bold text-green-700"> 
                  {available}
                </h2>
              </div>

              <div className="rounded-2xl border bg-red-50 p-5">
                <p className="text-red-700">Booked</p>

                <h2 className="mt-2 text-3xl font-bold text-red-700">
                  {booked}
                </h2>
              </div>

              <div className="rounded-2xl border bg-yellow-50 p-5">
                <p className="text-yellow-700">Blocked</p>

                <h2 className="mt-2 text-3xl font-bold text-yellow-700">
                  {blocked}
                </h2>
              </div>
            </div>

            {/* ==========================
                  ROOM LIST
            ========================== */}
            <div className="grid gap-5 lg:grid-cols-2">
             {roomStatus.map(({ room, booking, isBlocked }) => {
               const isBooked = !!booking;

                return (
                  <div
                    key={room._id}
                    className="rounded-3xl border bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{room.title}</h2>

                        <p className="mt-1 text-gray-500">
                          {room.roomType}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          isBlocked
                            ? "bg-yellow-100 text-yellow-700"
                            : isBooked
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {isBlocked
                          ? "Blocked"
                          : isBooked
                          ? "Booked"
                          : "Available"}
                      </span>
                    </div>
                    

                    {isBlocked ? (

  <div className="mt-6 rounded-2xl bg-yellow-50 p-5">
    <p className="font-semibold text-yellow-700">
      🚫 This room is blocked on the selected date.
    </p>
  </div>

) : booking ? (
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <User size={18} className="text-orange-600" />
                          <div>
                            <p className="font-semibold">
                              {booking.customerName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.phone}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-gray-50 p-4 space-y-2">
                          <p>
                            <span className="font-semibold">
                              Booking ID :
                            </span>{" "}
                            {booking.bookingId}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Check-In :
                            </span>{" "}
                            {new Date(booking.checkIn).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Check-Out :
                            </span>{" "}
                            {new Date(booking.checkOut).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Adults :
                            </span>{" "}
                            {booking.adults}
                          </p>

                          <p>
                            <span className="font-semibold">
                              Children :
                            </span>{" "}
                            {booking.children}
                          </p>
                        </div>

                        <a
                          href={`/admin/bookings/${booking._id}`}
                          className="inline-flex rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
                        >
                          View Booking
                        </a>
                      </div>
                    ) : (
                      <div className="mt-6 rounded-2xl bg-green-50 p-5">
                        <div className="flex items-center gap-3">
                          <BedDouble
                            size={22}
                            className="text-green-600"
                          />

                          <div>
                            <p className="font-semibold text-green-700">
                              Room Available
                            </p>

                            <p className="text-sm text-green-600">
                              This room is available on the selected date.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}