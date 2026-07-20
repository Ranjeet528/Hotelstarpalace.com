"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";

import { getTopCustomers } from "@/services/dashboard.service";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function TopCustomers() {

  const [loading, setLoading] =
    useState(true);

  const [customers, setCustomers] =
    useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const res =
          await getTopCustomers();

        setCustomers(
          res.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);

  return (

    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Crown
            size={20}
            className="text-yellow-500"
          />

          <h2 className="text-lg font-bold">
            Top Customers
          </h2>

        </div>

        <Link
          href="/admin/users"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          View All
        </Link>

      </div>

      {loading ? (

        <div className="flex h-56 items-center justify-center text-gray-400">
          Loading...
        </div>

      ) : customers.length === 0 ? (

        <div className="flex h-56 items-center justify-center text-gray-400">
          No Customers Found
        </div>

      ) : (

        <div className="space-y-3">

          {customers.map((customer, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border p-3 hover:bg-gray-50"
            >

              <div className="flex items-center gap-3">

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                    index === 0
                      ? "bg-yellow-100 text-yellow-700"
                      : index === 1
                      ? "bg-gray-200 text-gray-700"
                      : index === 2
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {customer.customerName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {customer.phone}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  {formatCurrency(
                    customer.totalSpent
                  )}
                </p>

                <p className="text-xs text-gray-500">
                  {customer.totalBookings} Bookings
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}