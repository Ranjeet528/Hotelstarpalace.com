"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard } from "lucide-react";

import { getRecentPayments } from "@/services/dashboard.service";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

export default function RecentPayments() {

  const [loading, setLoading] =
    useState(true);

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const res =
          await getRecentPayments();

        setPayments(
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

          <CreditCard
            size={20}
            className="text-purple-600"
          />

          <h2 className="text-lg font-bold">
            Recent Payments
          </h2>

        </div>

        <Link
          href="/admin/payments"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          View All
        </Link>

      </div>

      {loading ? (

        <div className="flex h-52 items-center justify-center text-gray-400">
          Loading...
        </div>

      ) : payments.length === 0 ? (

        <div className="flex h-52 items-center justify-center text-gray-400">
          No Payments Found
        </div>

      ) : (

        <div className="space-y-3">

          {payments.map((item) => (

            <div
              key={item._id}
              className="flex items-center justify-between rounded-2xl border p-3 hover:bg-gray-50"
            >

              <div>

                <h3 className="font-semibold">
                  {item.customerName}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.roomId?.title}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(item.createdAt)}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  {formatCurrency(
                    item.totalAmount
                  )}
                </p>

                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                  Paid
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}