"use client";

import { useEffect, useState } from "react";

import axios from "@/lib/axios";

import PaymentStats from "@/components/admin/payments/PaymentStats";
import PaymentFilters from "@/components/admin/payments/PaymentFilters";
import PaymentTable from "@/components/admin/payments/PaymentTable";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [statsLoading, setStatsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    refundStatus: "",
    from: "",
    to: "",
  });

  // =====================================
  // GET PAYMENTS
  // =====================================

  const getPayments = async () => {
    try {
      setLoading(true);

      // Strip empty values instead of sending "" — backend treats
      // an explicit empty string as "match status === ''", which
      // never matches anything and silently hides all rows.
      const params = { page };
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });

      const { data } = await axios.get("/payments", { params });

      // Backend shape: { success, data: payments, pagination: { totalPages } }
      setPayments(data.data || []);
      setPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // GET DASHBOARD STATS
  // =====================================

  const getDashboard = async () => {
    try {
      setStatsLoading(true);
      const { data } = await axios.get("/payments/dashboard");

      // Backend shape: { success, dashboard: {...} }
      setStats(data.dashboard || {});
    } catch (error) {
      console.log(error);
    } finally {
      setStatsLoading(false);
    }
  };

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {
    getPayments();
  }, [page, filters]);

  useEffect(() => {
    getDashboard();
  }, []);

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

    const ok = window.confirm(
      `Refund ₹${amount} to ${payment.customerName}?`
    );
    if (!ok) return;

    try {
      await axios.put(`/payments/${payment._id}/approve-refund`, { amount });
      alert("Refund approved successfully.");
      getPayments();
      getDashboard();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to approve refund.");
    }
  };

  // =====================================
  // REJECT REFUND
  // =====================================

  const rejectRefund = async (payment) => {
    const reason = window.prompt(
      "Refund rejection reason:",
      "Refund rejected by admin"
    );

    if (reason === null) return;

    try {
      await axios.put(`/payments/${payment._id}/reject-refund`, { reason });
      alert("Refund rejected successfully.");
      getPayments();
      getDashboard();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to reject refund.");
    }
  };

  // =====================================
  // REFRESH DATA
  // =====================================

  const refreshData = () => {
    getPayments();
    getDashboard();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Payments</h1>
          <p className="mt-1 text-gray-500">
            Manage payments and refund requests
          </p>
        </div>

        <button
          onClick={refreshData}
          className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-black"
        >
          Refresh
        </button>
      </div>

      {/* Stats */}
      <PaymentStats stats={stats} loading={statsLoading} />

      {/* Filters */}
      <PaymentFilters filters={filters} setFilters={setFilters} />

      {/* Table */}
      <PaymentTable
        payments={payments}
        loading={loading}
        onApprove={approveRefund}
        onReject={rejectRefund}
      />

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}