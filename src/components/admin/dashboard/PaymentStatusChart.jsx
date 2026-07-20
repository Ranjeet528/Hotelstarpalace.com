"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";

import {
  getPaymentStatusSummary,
} from "@/services/dashboard.service";

const formatCurrency = value =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function PaymentStatusChart() {

  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const res =
          await getPaymentStatusSummary();

        const chart =
          (res.data || []).map(item => ({
            status:
              item._id || "Unknown",
            bookings:
              item.count,
            amount:
              item.amount,
          }));

        setData(chart);

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
        Payment Status
      </h2>

      {data.length === 0 ? (

        <div className="flex h-72 items-center justify-center text-gray-400">
          No Data
        </div>

      ) : (

        <ResponsiveContainer
          width="100%"
          height={280}
        >

          <BarChart
            data={data}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="status"
            />

            <YAxis />

            <Tooltip
              formatter={(value, key) => {

                if (
                  key === "amount"
                ) {
                  return formatCurrency(
                    value
                  );
                }

                return value;

              }}
            />

            <Bar
              dataKey="bookings"
              fill="#f97316"
              radius={[
                8,
                8,
                0,
                0,
              ]}
            />

          </BarChart>

        </ResponsiveContainer>

      )}

    </div>

  );

}