"use client";

import {
  IndianRupee,
  CreditCard,
  RotateCcw,
  Clock3,
  XCircle,
} from "lucide-react";

export default function PaymentStats({ stats = {}, loading = false }) {
  const cards = [
    {
      title: "Total Revenue",
      value: `₹${(stats.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      tint: "bg-emerald-50 text-emerald-600",
      bar: "bg-emerald-500",
    },
    {
      title: "Total Payments",
      value: (stats.totalPayments || 0).toLocaleString("en-IN"),
      icon: CreditCard,
      tint: "bg-blue-50 text-blue-600",
      bar: "bg-blue-500",
    },
    {
      title: "Failed Payments",
      value: (stats.failedPayments || 0).toLocaleString("en-IN"),
      icon: XCircle,
      tint: "bg-rose-50 text-rose-600",
      bar: "bg-rose-500",
    },
    {
      title: "Refund Requests",
      value: (stats.pendingRefunds || 0).toLocaleString("en-IN"),
      icon: RotateCcw,
      tint: "bg-amber-50 text-amber-600",
      bar: "bg-amber-500",
    },
    {
      title: "Pending Refund",
      value: `₹${(stats.pendingRefundAmount || 0).toLocaleString("en-IN")}`,
      icon: Clock3,
      tint: "bg-violet-50 text-violet-600",
      bar: "bg-violet-500",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            {/* ACCENT BAR */}
            <span
              className={`absolute inset-x-0 top-0 h-1 ${card.bar} opacity-0 transition-opacity group-hover:opacity-100`}
            />

            {/* TOP ROW — icon + label share the row, value doesn't have to compete for space */}
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.tint}`}
              >
                <Icon size={16} strokeWidth={2.2} />
              </div>
              <p className="truncate text-[13px] font-medium text-gray-500">
                {card.title}
              </p>
            </div>

            {/* VALUE — full card width, auto-scales, never wraps */}
            {loading ? (
              <div className="mt-4 h-8 w-24 animate-pulse rounded-md bg-gray-200" />
            ) : (
              <h2 className="mt-3 whitespace-nowrap text-[clamp(1.1rem,1.6vw+0.65rem,1.75rem)] font-bold leading-none tracking-tight text-gray-900 tabular-nums">
                {card.value}
              </h2>
            )}
          </div>
        );
      })}
    </div>
  );
}