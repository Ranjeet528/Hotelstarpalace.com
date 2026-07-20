"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";

export default function BookingInvoice({ booking }) {
  if (!booking) return null;

  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);
  const invoiceDate = new Date();

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // Read the actual time booked in from/out at, instead of hardcoding it —
  // this way it always matches whatever check-in/check-out time was in
  // effect (from settings) at the time the booking was made.
  const formatTime = (date) =>
    date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  // use stored values from database
  const nights =
    booking.nights ||
    Math.max(
      1,
      Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    );

  const pricePerNight = Number(booking.price || booking.roomPrice || 0);

  const roomAmount = pricePerNight * nights;

  // ==========================
  // GST
  // ==========================
  const gstPercentage = Number(booking.gstPercentage ?? 0);

  const gstAmount = Number(
    booking.gstAmount ?? (roomAmount * gstPercentage) / 100
  );

  const total = Number(
    booking.totalAmount ?? roomAmount + gstAmount
  );

  const invoiceNo = `INV-${booking.bookingId}`;

  // Dynamic Status
  const paymentStatus = booking.paymentStatus || "pending";

  const paymentMethod = booking.paymentMethod || "razorpay";

  const paymentId = booking.paymentId || "-";

  const orderId = booking.orderId || "-";

  // Dynamic QR
  const qrValue = `https://hotelstarpalace.com/booking/${booking.bookingId}`;

  const numberToWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const inWords = (n) => {
      if (n < 20) return a[n];

      if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];

      if (n < 1000)
        return a[Math.floor(n / 100)] + " Hundred " + inWords(n % 100);

      if (n < 100000)
        return inWords(Math.floor(n / 1000)) + " Thousand " + inWords(n % 1000);

      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) + " Lakh " + inWords(n % 100000)
        );

      return (
        inWords(Math.floor(n / 10000000)) + " Crore " + inWords(n % 10000000)
      );
    };

    return inWords(num).replace(/\s+/g, " ").trim();
  };

  // Round to whole rupees for the words line — the recursive converter
  // above doesn't handle decimals (GST math can produce paise).
  const amountInWords = numberToWords(Math.round(total));

  const paymentIcon =
    paymentStatus === "paid"
      ? "/icons/payment-success.png"
      : "/icons/payment-pending.png";

  const razorpayLogo = "/razorpay-logo.png";

  return (
    <div
      id="invoice"
      className="relative mx-auto w-full max-w-[210mm] overflow-hidden rounded-xl bg-white p-5 text-[10px] shadow-xl print:max-w-full print:rounded-none print:p-4 print:shadow-none"
    >
      {/* WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="rotate-[-35deg] text-[120px] font-black text-green-100 opacity-20">
          {paymentStatus === "paid" ? "PAID" : "PENDING"}
        </h1>
      </div>

      {/* ================= HEADER ================= */}
      <div className="relative z-10 border-b-2 border-yellow-500 pb-4">
        <div className="flex items-start justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* BIGGER LOGO */}
          <div className="relative h-32 w-32 flex-shrink-0">
  <Image
    src="/StarPalaceLogo.png"
    alt="Hotel Star Palace Logo"
    fill
    priority
    className="object-contain"
  />
</div>

            <div>
              <h1 className="text-3xl font-black tracking-wide text-yellow-600">
               HOTEL STAR PALACE
              </h1>
              <p className="text-gray-600">Manda Road, Khatu Shyam Ji, Rajasthan</p>
              <p className="text-gray-600">+91 9876543210</p>
              <p className="text-gray-600">info@hotelstarpalace.com</p>
              <p className="text-gray-600">GSTIN : 08ABCDE1234F1Z5</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <h2 className="text-4xl font-black text-gray-900">TAX INVOICE</h2>
            <p className="mt-1">
              <span className="font-semibold">Invoice No :</span> {invoiceNo}
            </p>
            <p>
              <span className="font-semibold">Booking ID :</span>{" "}
              {booking.bookingId}
            </p>
            <p>
              <span className="font-semibold">Invoice Date :</span>{" "}
              {formatDate(invoiceDate)}
            </p>
            <p>
              <span className="font-semibold">Payment :</span>{" "}
              <span
                className={`font-bold ${
                  paymentStatus === "paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {paymentStatus.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="mt-4 flex items-center justify-between">
          {/* PAYMENT SUCCESS */}
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <div>
              <p className="font-bold text-green-700">Payment Verified</p>
              <p className="text-xs text-gray-500">Secure Online Payment</p>
            </div>
          </div>

          {/* BARCODE */}
          <Barcode
            value={booking.bookingId}
            height={42}
            width={1.3}
            fontSize={12}
            displayValue={false}
            margin={0}
          />

          {/* RAZORPAY */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white px-3 py-2 rounded font-bold text-xs">
              RAZORPAY
            </div>
          </div>
        </div>
      </div>

      {/* ================= GUEST / ROOM / STAY ================= */}
      <div className="relative z-10 mt-4 grid grid-cols-3 gap-3">
        {/* GUEST */}
        <div className="rounded-lg border border-gray-200 p-3">
          <h3 className="mb-2 border-b pb-1 text-sm font-bold text-yellow-700">
            Guest Details
          </h3>
          <div className="space-y-1 text-[11px]">
            <p>
              <span className="font-semibold">Name :</span>{" "}
              {booking.customerName}
            </p>
            <p>
              <span className="font-semibold">Phone :</span> {booking.phone}
            </p>
            <p>
              <span className="font-semibold">Email :</span>{" "}
              {booking.email || "-"}
            </p>
            <p>
              <span className="font-semibold">Adults :</span> {booking.adults}
            </p>
            <p>
              <span className="font-semibold">Children :</span>{" "}
              {booking.children || 0}
            </p>
          </div>
        </div>

        {/* ROOM */}
        <div className="rounded-lg border border-gray-200 p-3">
          <h3 className="mb-2 border-b pb-1 text-sm font-bold text-yellow-700">
            Room Details
          </h3>
          <div className="space-y-1 text-[11px]">
            <p>
              <span className="font-semibold">Room :</span>{" "}
              {booking.roomId?.title || "Deluxe Room"}
            </p>
            <p>
              <span className="font-semibold">Type :</span>{" "}
              {booking.roomId?.roomType || "AC"}
            </p>
            <p>
              <span className="font-semibold">Capacity :</span>{" "}
              {booking.roomId?.capacity || 2} Guests
            </p>
            <p>
              <span className="font-semibold">Rate :</span> ₹
              {pricePerNight.toLocaleString("en-IN")}/Night
            </p>
          </div>
        </div>

        {/* STAY */}
        <div className="rounded-lg border border-gray-200 p-3">
          <h3 className="mb-2 border-b pb-1 text-sm font-bold text-yellow-700">
            Stay Details
          </h3>
          <div className="space-y-1 text-[11px]">
            <p>
              <span className="font-semibold">Check-In :</span>{" "}
              {formatDate(checkIn)}
            </p>
            <p>
              <span className="font-semibold">Time :</span> {booking.checkInTime || formatTime(checkIn)}
            </p>
            <p>
              <span className="font-semibold">Check-Out :</span>{" "}
              {formatDate(checkOut)}
            </p>
            <p>
              <span className="font-semibold">Time :</span> {booking.checkOutTime || formatTime(checkOut)}
            </p>
            <p className="font-bold text-yellow-700">
              {nights} Night{nights > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* ================= PAYMENT SUMMARY ================= */}
      <div className="relative z-10 mt-4 overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-[11px]">
          <thead className="bg-yellow-100">
            <tr>
              <th className="border-b px-3 py-2 text-left">Description</th>
              <th className="border-b px-3 py-2 text-center">Qty</th>
              <th className="border-b px-3 py-2 text-right">Rate</th>
              <th className="border-b px-3 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b px-3 py-2">
                {booking.roomId?.title || "Room Booking"}
              </td>
              <td className="border-b px-3 py-2 text-center">{nights}</td>
              <td className="border-b px-3 py-2 text-right">
                ₹{pricePerNight.toLocaleString("en-IN")}
              </td>
              <td className="border-b px-3 py-2 text-right">
                ₹{roomAmount.toLocaleString("en-IN")}
              </td>
            </tr>
            <tr>
              <td className="border-b px-3 py-2">
                GST ({gstPercentage}%)
              </td>
              <td className="border-b text-center">—</td>
              <td className="border-b text-right">—</td>
              <td className="border-b px-3 py-2 text-right">
                ₹{gstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </td>
            </tr>
            <tr className="bg-yellow-50">
              <td colSpan={3} className="px-3 py-3 text-right font-bold">
                Grand Total
              </td>
              <td className="px-3 py-3 text-right text-lg font-black text-yellow-700">
                ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= PAYMENT DETAILS ================= */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 p-3">
          <h3 className="mb-2 border-b pb-1 font-bold text-yellow-700">
            Payment Details
          </h3>
          <div className="space-y-1 text-[11px]">
            <p>
              <span className="font-semibold">Status :</span>
              <span
                className={`ml-2 font-bold ${
                  paymentStatus === "paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {paymentStatus.toUpperCase()}
              </span>
            </p>
            <p>
              <span className="font-semibold">Method :</span> {paymentMethod}
            </p>
            <p>
              <span className="font-semibold">Gateway :</span> Razorpay
            </p>
            <p>
              <span className="font-semibold">Payment ID :</span> {paymentId}
            </p>
            <p>
              <span className="font-semibold">Order ID :</span> {orderId}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-3">
          <h3 className="mb-2 border-b pb-1 font-bold text-yellow-700">
            Amount In Words
          </h3>
          <p className="text-[11px] leading-6">
            <strong>Rupees {amountInWords} Only</strong>
          </p>
          <div className="mt-3 rounded bg-green-50 p-2 text-center">
            <p className="font-bold text-green-700">
              ✓ Payment Successfully Received
            </p>
          </div>
        </div>
      </div>

      {/* ================= QR + FOOTER ================= */}
      <div className="relative z-10 mt-4 break-inside-avoid rounded-lg border border-gray-200 bg-gray-50 p-3">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex-1">
            <h3 className="text-sm font-bold text-yellow-700">
              Thank You For Staying With Us ❤️
            </h3>
            <p className="mt-2 text-[11px] leading-5 text-gray-600">
              This invoice is computer generated and does not require physical
              signature.
            </p>
            <p className="mt-2 text-[11px]">
              Please carry a valid Government Photo ID during check-in.
            </p>
            <p className="mt-2 text-[11px]">
              Hotel Star Palace wishes you a pleasant stay.
            </p>
          </div>

          {/* QR */}
          <div className="text-center">
            <div className="rounded-lg border bg-white p-2">
              <QRCode value={qrValue} size={95} />
            </div>
            <p className="mt-1 text-[10px] text-gray-500">
              Scan to View Booking
            </p>
          </div>
        </div>

        {/* SIGNATURE */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">Guest Signature</p>
            <div className="mt-6 w-40 border-b"></div>
          </div>

          <div className="text-center">
            <div className="h-[55px] flex items-center justify-center">
              <p className="italic text-2xl font-script text-gray-700">Hotel Star Palace</p>
            </div>
            <p className="font-bold text-yellow-700">HOTEL STAR PALACE</p>
            <p className="text-xs text-gray-500">Authorized Signatory</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-3 border-t pt-2 text-center text-[10px] text-gray-500">
        © {new Date().getFullYear()} Hotel Star Palace
        <br />
        Manda Road, Khatu Shyam Ji, Rajasthan
        <br />
        www.hotelstarpalace.com
      </div>
    </div>
  );
}