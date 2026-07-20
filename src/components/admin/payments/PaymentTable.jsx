"use client";

import Link from "next/link";
import { Eye, Check, X, Loader2 } from "lucide-react";

export default function PaymentTable({
  payments = [],
  loading = false,
  onApprove,
  onReject,
}) {
  const paymentBadge = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "refunded":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const refundBadge = (status) => {
    switch (status) {
      case "requested":
        return "bg-orange-100 text-orange-700";
      case "processing":
        return "bg-indigo-100 text-indigo-700";
      case "refunded":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="rounded-2xl border bg-white p-12 text-center">
        <p className="text-lg font-semibold">No Payments Found</p>
        <p className="mt-2 text-sm text-gray-500">
          No payment records available.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow lg:block">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment Status</th>
              <th className="px-6 py-4">Payment ID</th>
              <th className="px-6 py-4">Failure Reason</th>
              <th className="px-6 py-4">Refund</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t hover:bg-slate-50">
                <td className="px-6 py-5">
                  <p className="font-semibold">{payment.customerName}</p>
                  <p className="text-sm text-gray-500">{payment.phone}</p>
                </td>

                <td className="px-6 py-5 font-semibold">₹{payment.amount}</td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentBadge(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-xs">
                  {payment.paymentId || "-"}
                </td>

                <td className="px-6 py-5 text-sm text-red-600">
                  {payment.failureReason || "-"}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${refundBadge(
                      payment.refundStatus
                    )}`}
                  >
                    {payment.refundStatus || "not_requested"}
                  </span>
                </td>

                <td className="px-6 py-5 text-sm">
                  {new Date(payment.createdAt).toLocaleDateString("en-IN")}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/admin/payments/${payment._id}`}
                      className="rounded-xl bg-slate-900 p-2 text-white"
                    >
                      <Eye size={18} />
                    </Link>

                    {payment.refundStatus === "requested" && (
                      <>
                        <button
                          onClick={() => onApprove(payment)}
                          className="rounded-xl bg-green-600 p-2 text-white"
                        >
                          <Check size={18} />
                        </button>

                        <button
                          onClick={() => onReject(payment)}
                          className="rounded-xl bg-red-600 p-2 text-white"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-4 lg:hidden">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">
                  {payment.customerName}
                </h3>
                <p className="text-sm text-gray-500">{payment.phone}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentBadge(
                  payment.status
                )}`}
              >
                {payment.status}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold">₹{payment.amount}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Payment ID</span>
                <span className="max-w-[180px] truncate text-xs">
                  {payment.paymentId || "-"}
                </span>
              </div>

              {payment.status === "failed" && (
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="font-semibold text-red-600">Failure Reason</p>
                  <p className="text-sm text-red-500">
                    {payment.failureReason || "Payment failed"}
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-500">Refund</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${refundBadge(
                    payment.refundStatus
                  )}`}
                >
                  {payment.refundStatus || "not_requested"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span>{new Date(payment.createdAt).toLocaleDateString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/admin/payments/${payment._id}`}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
              >
                <Eye size={16} />
                View
              </Link>

              {payment.refundStatus === "requested" && (
                <>
                  <button
                    onClick={() => onApprove(payment)}
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm text-white"
                  >
                    <Check size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => onReject(payment)}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm text-white"
                  >
                    <X size={16} />
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}