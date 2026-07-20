"use client";

import { Search, X } from "lucide-react";

export default function PaymentFilters({
  filters,
  setFilters,
}) {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      refundStatus: "",
      from: "",
      to: "",
    });
  };

  return (
    <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6">

      <div className="grid gap-4 lg:grid-cols-5">

        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search payment, customer..."
            className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 outline-none focus:border-orange-500"
          />
        </div>

        {/* Payment Status */}

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-orange-500"
        >
          <option value="">
            All Payments
          </option>

          <option value="success">
            Success
          </option>

          <option value="failed">
            Failed
          </option>

          <option value="refunded">
            Refunded
          </option>
        </select>

        {/* Refund Status */}

        <select
          name="refundStatus"
          value={filters.refundStatus}
          onChange={handleChange}
          className="h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-orange-500"
        >
          <option value="">
            All Refunds
          </option>

          <option value="requested">
            Requested
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="processing">
            Processing
          </option>

          <option value="refunded">
            Refunded
          </option>

          <option value="rejected">
            Rejected
          </option>
        </select>

        {/* Clear */}

        <button
          onClick={clearFilters}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-red-500 text-white transition hover:bg-red-600"
        >
          <X size={18} />
          Clear
        </button>
      </div>

      {/* Date Filters */}

      <div className="mt-5 grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium">
            From Date
          </label>

          <input
            type="date"
            name="from"
            value={filters.from}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-orange-500"
          />
        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            To Date
          </label>

          <input
            type="date"
            name="to"
            value={filters.to}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-orange-500"
          />
        </div>

      </div>

    </div>
  );
}