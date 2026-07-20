"use client";

import { useEffect, useState } from "react";
import { BedDouble } from "lucide-react";

import {
  getOccupancyReport,
} from "@/services/dashboard.service";

export default function OccupancyCard() {

  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState({
      totalRooms: 0,
      occupiedRooms: 0,
      availableRooms: 0,
      occupancyRate: 0,
    });

  useEffect(() => {

    const loadData = async () => {

      try {

        const res =
          await getOccupancyReport();

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
        <div className="flex h-60 items-center justify-center text-gray-400">
          Loading...
        </div>
      </div>
    );

  }

  const radius = 65;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (data.occupancyRate / 100) *
      circumference;

  return (

    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-2">

        <BedDouble
          size={20}
          className="text-orange-600"
        />

        <h2 className="text-lg font-bold">
          Live Occupancy
        </h2>

      </div>

      <div className="flex justify-center">

        <div className="relative h-44 w-44">

          <svg
            className="h-44 w-44 -rotate-90"
          >

            <circle
              cx="88"
              cy="88"
              r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="12"
            />

            <circle
              cx="88"
              cy="88"
              r={radius}
              fill="none"
              stroke="#f97316"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={
                circumference
              }
              strokeDashoffset={
                offset
              }
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h2 className="text-4xl font-bold">
              {data.occupancyRate}%
            </h2>

            <p className="text-sm text-gray-500">
              Occupied
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">

        <div>

          <h3 className="text-2xl font-bold">
            {data.totalRooms}
          </h3>

          <p className="text-sm text-gray-500">
            Total
          </p>

        </div>

        <div>

          <h3 className="text-2xl font-bold text-orange-600">
            {data.occupiedRooms}
          </h3>

          <p className="text-sm text-gray-500">
            Occupied
          </p>

        </div>

        <div>

          <h3 className="text-2xl font-bold text-green-600">
            {data.availableRooms}
          </h3>

          <p className="text-sm text-gray-500">
            Available
          </p>

        </div>

      </div>

    </div>

  );

}