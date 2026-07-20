"use client";

import { useEffect, useState } from "react";

import {
  CalendarPlus,
  LogIn,
  LogOut,
  Ban,
} from "lucide-react";

import {
  getTodayActivities,
} from "@/services/dashboard.service";

export default function TodayActivities() {

  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState({
      newBookings: 0,
      checkIns: 0,
      checkOuts: 0,
      cancellations: 0,
    });

  useEffect(() => {

    const loadData = async () => {

      try {

        const res =
          await getTodayActivities();

        setData(
          res.data || {}
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);

  if (loading) {

    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex h-40 items-center justify-center text-gray-400">
          Loading...
        </div>
      </div>
    );

  }

  return (

    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-bold">
        Today's Activities
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <ActivityCard
          icon={
            <CalendarPlus size={18} />
          }
          color="bg-blue-100 text-blue-600"
          title="Bookings"
          value={data.newBookings}
        />

        <ActivityCard
          icon={<LogIn size={18} />}
          color="bg-green-100 text-green-600"
          title="Check-ins"
          value={data.checkIns}
        />

        <ActivityCard
          icon={<LogOut size={18} />}
          color="bg-orange-100 text-orange-600"
          title="Check-outs"
          value={data.checkOuts}
        />

        <ActivityCard
          icon={<Ban size={18} />}
          color="bg-red-100 text-red-600"
          title="Cancelled"
          value={data.cancellations}
        />

      </div>

    </div>

  );

}

function ActivityCard({
  icon,
  color,
  title,
  value,
}) {

  return (

    <div className="rounded-2xl border p-4">

      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-bold">
        {value}
      </h3>

    </div>

  );

}