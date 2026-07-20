"use client";

export default function HotelChart({ stats }) {
  const data = [
    { category: "Total", value: stats.totalRooms },
    { category: "Available", value: stats.availableRooms },
    { category: "Booked", value: stats.bookedRooms },
    { category: "Revenue (K)", value: stats.revenue / 1000 },
  ];

  return (
    <div>
      
    </div>
  );
}