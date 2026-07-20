"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { getBookingSources } from "@/services/dashboard.service";

const COLORS = [
  "#f97316",
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#8b5cf6",
  "#ec4899",
];

export default function BookingSourceChart() {

  const [loading, setLoading] =
    useState(true);

  const [sources, setSources] =
    useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const res =
          await getBookingSources();

        const data =
          (res.data || []).map(
            item => ({
              name:
                item._id ||
                "Unknown",
              value:
                item.count,
            })
          );

        setSources(data);

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
        <div className="flex h-72 items-center justify-center text-gray-400">
          Loading...
        </div>
      </div>
    );

  }

  return (

    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-bold">
        Booking Sources
      </h2>

      {sources.length === 0 ? (

        <div className="flex h-72 items-center justify-center text-gray-400">
          No Data
        </div>

      ) : (

        <ResponsiveContainer
          width="100%"
          height={280}
        >

          <PieChart>

            <Pie
              data={sources}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
            >

              {sources.map(
                (
                  item,
                  index
                ) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      )}

    </div>

  );

}