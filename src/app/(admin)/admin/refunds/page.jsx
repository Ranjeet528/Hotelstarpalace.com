"use client";

import { useEffect, useState } from "react";

import axios from "@/lib/axios";

import Link from "next/link";

import { RefreshCcw, Loader2, Eye } from "lucide-react";

export default function RefundRequestsPage() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // =====================================
  // GET REFUND REQUESTS
  // =====================================

  const getRefunds = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/payments/refund-requests?page=${page}&limit=10`
      );

      // Backend shape: { success, data: refunds, pagination: { totalPages } }
      setRefunds(data.data || []);
      setPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message || "Unable to load refund requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRefunds();
  }, [page]);

  // =====================================
  // APPROVE REFUND
  // =====================================

  const approveRefund = async (payment) => {
    const input = window.prompt(
      `Enter refund amount for ${payment.customerName} (max ₹${payment.amount}):`,
      payment.refundAmount || payment.amount
    );

    if (input === null) return; // cancelled

    const amount = Number(input);

    if (!amount || amount <= 0 || amount > payment.amount) {
      alert(`Please enter a valid amount between ₹1 and ₹${payment.amount}.`);
      return;
    }

    try {
      setProcessing(true);
      await axios.put(`/payments/${payment._id}/approve-refund`, { amount });
      alert("Refund approved.");
      getRefunds();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to approve refund.");
    } finally {
      setProcessing(false);
    }
  };

  // =====================================
  // REJECT REFUND
  // =====================================

  const rejectRefund = async (paymentId) => {
    const reason = window.prompt(
      "Refund rejection reason",
      "Refund rejected by admin"
    );

    if (reason === null) return;

    try {
      setProcessing(true);
      await axios.put(`/payments/${paymentId}/reject-refund`, { reason });
      alert("Refund rejected.");
      getRefunds();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to reject refund.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 size={45} className="animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Refund Requests
          </h1>
          <p className="mt-1 text-gray-500">
            Review and manage customer refund requests.
          </p>
        </div>

        <button
          onClick={getRefunds}
          disabled={processing}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-black disabled:opacity-60"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {/* Desktop — table */}
      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 text-left">Customer</th>
                <th className="px-5 py-4 text-left">Amount</th>
                <th className="px-5 py-4 text-left">Reason</th>
                <th className="px-5 py-4 text-left">Requested</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {refunds.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-gray-500">
                    No refund requests found.
                  </td>
                </tr>
              )}

              {refunds.map((payment) => (
                <tr key={payment._id} className="border-t hover:bg-slate-50">
                  <td className="px-5 py-5">
                    <p className="font-semibold">{payment.customerName}</p>
                    <p className="text-sm text-gray-500">{payment.phone}</p>
                  </td>

                  <td className="px-5 py-5 font-semibold text-green-600">
                    ₹{payment.refundAmount}
                  </td>

                  <td className="px-5 py-5">{payment.refundReason}</td>

                  <td className="px-5 py-5 text-sm text-gray-500">
                    {payment.refundRequestedAt
                      ? new Date(payment.refundRequestedAt).toLocaleString()
                      : "-"}
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Link
                        href={`/admin/payments/${payment._id}`}
                        className="rounded-lg border p-2 hover:bg-slate-100"
                      >
                        <Eye size={18} />
                      </Link>

                      <button
                        disabled={processing}
                        onClick={() => approveRefund(payment)}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                      >
                        Approve
                      </button>

                      <button
                        disabled={processing}
                        onClick={() => rejectRefund(payment._id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile — cards, same info/actions as the table above */}
      <div className="space-y-4 lg:hidden">
        {refunds.length === 0 && (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            No refund requests found.
          </div>
        )}

        {refunds.map((payment) => (
          <div
            key={payment._id}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-800">
                  {payment.customerName}
                </h3>
                <p className="mt-0.5 text-sm text-gray-500">
                  {payment.phone}
                </p>
              </div>

              <span className="whitespace-nowrap text-lg font-bold text-green-600">
                ₹{payment.refundAmount}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div>
                <p className="text-gray-500">Reason</p>
                <p className="mt-0.5 font-medium text-slate-700">
                  {payment.refundReason || "-"}
                </p>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Requested</span>
                <span className="text-right font-medium">
                  {payment.refundRequestedAt
                    ? new Date(payment.refundRequestedAt).toLocaleString()
                    : "-"}
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/admin/payments/${payment._id}`}
                className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <Eye size={16} />
                View
              </Link>

              <button
                disabled={processing}
                onClick={() => approveRefund(payment)}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
              >
                Approve
              </button>

              <button
                disabled={processing}
                onClick={() => rejectRefund(payment._id)}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}