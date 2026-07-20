"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import axios from "@/lib/axios";

import {
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function PaymentDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const [payment, setPayment] = useState(null);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  // =====================================
  // GET PAYMENT DETAILS
  // =====================================

  const getPayment = async () => {

    try {

      setLoading(true);

      const { data } = await axios.get(
        `/payments/${id}`
      );

      setPayment(data.payment);

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Unable to load payment."
      );

      router.push("/admin/payments");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (id) {
      getPayment();
    }

  }, [id]);

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <Loader2
          size={45}
          className="animate-spin text-orange-500"
        />

      </div>

    );

  }

  if (!payment) return null;
  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <button
            onClick={() => router.back()}
            className="mb-3 flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100"
          >
            <ArrowLeft size={18} />

            Back
          </button>

          <h1 className="text-3xl font-bold text-slate-800">
            Payment Details
          </h1>

          <p className="mt-1 text-gray-500">
            Payment ID : {payment.paymentId}
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Customer */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-bold">
            Customer Details
          </h2>

          <div className="space-y-4">

            <div>

              <p className="text-sm text-gray-500">
                Customer Name
              </p>

              <p className="font-semibold">
                {payment.customerName}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="font-semibold">
                {payment.phone}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-semibold">
                {payment.email || "-"}
              </p>

            </div>

          </div>

        </div>

        {/* Payment */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-bold">
            Payment Details
          </h2>

          <div className="space-y-4">

            <div>

              <p className="text-sm text-gray-500">
                Amount
              </p>

              <p className="text-2xl font-bold text-green-600">
                ₹{payment.amount}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="font-semibold capitalize">
                {payment.status}
              </p>

            </div>

            {payment.status === "failed" && (
              <div className="rounded-xl bg-red-50 p-4">

                <p className="text-sm text-red-600">
                  Failure Reason
                </p>

                <p className="mt-1 font-semibold text-red-700">
                  {payment.failureReason || "Payment failed"}
                </p>

              </div>
            )}

            <div>

              <p className="text-sm text-gray-500">
                Method
              </p>

              <p className="font-semibold capitalize">
                {payment.method}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Gateway
              </p>

              <p className="font-semibold capitalize">
                {payment.gateway}
              </p>

            </div>

          </div>

        </div>

        {/* Booking */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-bold">
            Booking Details
          </h2>

          <div className="space-y-4">

            <div>

              <p className="text-sm text-gray-500">
                Booking ID
              </p>

              <p className="font-semibold">
                {
                  payment.bookingId
                    ? payment.bookingId.bookingId
                    : "Booking not created"
                }
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Room
              </p>
              <p className="font-semibold">
                {
                  payment.bookingId?.roomId?.title || "-"
                }
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Booking Status
              </p>

              <p className="font-semibold capitalize">
                {
                  payment.bookingId?.status || "No booking"
                }
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Razorpay */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-lg font-bold">
          Razorpay Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <p className="break-all font-medium">
              {payment.orderId}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Payment ID
            </p>

            <p className="break-all font-medium">
              {payment.paymentId}
            </p>

          </div>

          <div className="md:col-span-2">

            <p className="text-sm text-gray-500">
              Signature
            </p>

            <p className="break-all text-sm">
              {payment.signature || "-"}
            </p>

          </div>

        </div>

      </div>

      {payment.status === "failed" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

          <h2 className="mb-4 text-lg font-bold text-red-700">
            Payment Failed Details
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Payment ID:</strong> {payment.paymentId}
            </p>

            <p>
              <strong>Reason:</strong>{" "}
              {payment.failureReason || "Payment failed"}
            </p>

            <p>
              <strong>Amount:</strong> ₹{payment.amount}
            </p>

          </div>

        </div>
      )}
      {/* Refund */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-lg font-bold">
          Refund Details
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>

            <p className="text-sm text-gray-500">
              Refund Status
            </p>

            <p className="mt-1 font-semibold capitalize">
              {payment.refundStatus}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Refund Amount
            </p>

            <p className="mt-1 font-semibold">
              ₹{payment.refundAmount}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Refund Reason
            </p>

            <p className="mt-1">
              {payment.refundReason || "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Refund ID
            </p>

            <p className="mt-1 break-all">
              {payment.refundId || "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Requested At
            </p>

            <p className="mt-1">
              {payment.refundRequestedAt
                ? new Date(
                  payment.refundRequestedAt
                ).toLocaleString()
                : "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Refunded At
            </p>

            <p className="mt-1">
              {payment.refundedAt
                ? new Date(
                  payment.refundedAt
                ).toLocaleString()
                : "-"}
            </p>

          </div>

        </div>

      </div>

      {/* Action Buttons */}

     {payment.status === "success" &&
 payment.refundStatus === "requested" && (

        <div className="flex flex-wrap gap-4">

          <button
            disabled={processing}
            onClick={async () => {

              try {

                setProcessing(true);

                await axios.post(
                  `/payments/${payment._id}/approve-refund`
                );

                alert("Refund approved.");

                getPayment();

              } catch (error) {

                alert(
                  error?.response?.data?.message ||
                  "Failed to approve refund."
                );

              } finally {

                setProcessing(false);

              }

            }}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            Approve Refund
          </button>

          <button
            disabled={processing}
            onClick={async () => {

              const reason = window.prompt(
                "Refund rejection reason",
                "Refund rejected by admin"
              );

              if (reason === null) return;

              try {

                setProcessing(true);

                await axios.post(
                  `/payments/${payment._id}/reject-refund`,
                  {
                    reason,
                  }
                );

                alert("Refund rejected.");

                getPayment();

              } catch (error) {

                alert(
                  error?.response?.data?.message ||
                  "Failed to reject refund."
                );

              } finally {

                setProcessing(false);

              }

            }}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            Reject Refund
          </button>

        </div>

      )}

    </div>

  );

}