"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import {
  getMonthlyRevenue,
} from "@/services/dashboard.service";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function MonthlyRevenueChart() {
  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {

        const res =
          await getMonthlyRevenue();

        setData(
          res.data || []
        );

      } catch (error) {

        console.log(
          "Monthly Revenue Error:",
          error
        );

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

  if (data.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex h-72 flex-col items-center justify-center text-gray-400">
          <TrendingUp size={35} />
          <p className="mt-3">
            No Revenue Data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Monthly Revenue
          </h2>

          <p className="text-sm text-gray-500">
            Last 12 Months
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-600">
          <IndianRupee size={15} />
          Revenue
        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="monthlyRevenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#f97316"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#f97316"
                stopOpacity={0}
              />
            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#eeeeee"
          />

          <XAxis
            dataKey="label"
            tick={{
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(v) =>
              `₹${v / 1000}k`
            }
            tick={{
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => [
              formatCurrency(value),
              "Revenue",
            ]}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#f97316"
            strokeWidth={3}
            fill="url(#monthlyRevenue)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}