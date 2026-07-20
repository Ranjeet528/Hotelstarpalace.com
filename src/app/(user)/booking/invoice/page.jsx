"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

import BookingInvoice from "@/components/user/booking/BookingInvoice";
import { getBooking } from "@/services/booking.service";

export default function InvoicePage() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const res = await getBooking(id);

        setBooking(
          res.data ||
            res.booking
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBooking();
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="py-40 text-center text-xl">
        Loading Invoice...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="py-40 text-center text-xl">
        Invoice not found.
      </div>
    );
  }

  return (
    <>
      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #invoice,
          #invoice * {
            visibility: visible;
          }

          #invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            padding: 20px;
          }

          .no-print {
            display: none !important;
          }

          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>

      <section className="min-h-screen bg-gray-100 py-12">
        <div className="mx-auto max-w-6xl px-5">

          {/* Top Bar */}
          <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">

            <Link
              href={`/booking/success?id=${booking._id}`}
              className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-medium shadow hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Back
            </Link>

            <button
              onClick={handlePrint}
              className="no-print flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              <Printer size={20} />
              Print Invoice
            </button>

          </div>

          {/* Invoice */}
     <BookingInvoice booking={booking} />

        </div>
      </section>
    </>
  );
}