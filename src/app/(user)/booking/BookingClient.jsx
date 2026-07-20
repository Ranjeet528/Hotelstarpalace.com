"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { getRoom } from "@/services/room.service";
import { getSettings } from "@/services/settings.service";
import { createOrder, verifyPayment } from "@/services/payment.service";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useAuth } from "@/context/AuthContext";

// ==========================
// TIME HELPERS
// Settings can store time either as "02:00 PM" (12-hour) or
// "14:00" (24-hour). This normalizes either into "HH:mm:00"
// for building ISO-ish datetime strings for the payload.
// ==========================
const to24HourTime = (timeStr, fallbackHour, fallbackMinute = "00") => {
    const fallback = `${String(fallbackHour).padStart(2, "0")}:${fallbackMinute}:00`;

    if (!timeStr) return fallback;

    const match = String(timeStr)
        .trim()
        .match(/^(\d{1,2}):(\d{2})\s*([AP]M)?$/i);

    if (!match) return fallback;

    let [, hh, mm, ampm] = match;
    hh = Number(hh);

    if (ampm) {
        ampm = ampm.toUpperCase();
        if (ampm === "PM" && hh !== 12) hh += 12;
        if (ampm === "AM" && hh === 12) hh = 0;
    }

    return `${String(hh).padStart(2, "0")}:${mm}:00`;
};

// ==========================
// DISPLAY TIME (always 12-hour with AM/PM)
// Settings may be saved as "14:00" (24-hour, from an <input type="time">)
// or "02:00 PM" (12-hour). This always renders it as "02:00 PM" for
// display, regardless of which format was stored.
// ==========================
const formatTimeDisplay = (timeStr) => {
    if (!timeStr) return "";

    const str = String(timeStr).trim();

    // Already 12-hour with AM/PM — just normalize casing/padding.
    const ampmMatch = str.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);

    if (ampmMatch) {
        let [, hh, mm, ampm] = ampmMatch;
        return `${String(Number(hh)).padStart(2, "0")}:${mm} ${ampm.toUpperCase()}`;
    }

    // 24-hour "14:00" or "14:00:00"
    const h24Match = str.match(/^(\d{1,2}):(\d{2})/);

    if (h24Match) {
        let [, hh, mm] = h24Match;
        hh = Number(hh);

        const ampm = hh >= 12 ? "PM" : "AM";
        let hh12 = hh % 12;
        if (hh12 === 0) hh12 = 12;

        return `${String(hh12).padStart(2, "0")}:${mm} ${ampm}`;
    }

    return str;
};

export default function BookingClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuth();

    // =========================
    // URL PARAMS
    // =========================
    const roomId = searchParams.get("room");

    const checkIn =
        searchParams.get("checkIn") || "";

    const checkOut =
        searchParams.get("checkOut") || "";

    const adults =
        Number(searchParams.get("adults")) || 2;

    const children =
        Number(searchParams.get("children")) || 0;

    // =========================
    // STATES
    // =========================
    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [room, setRoom] =
        useState(null);

    const [settings, setSettings] =
        useState(null);

    const [form, setForm] = useState({
        customerName: "",
        phone: "",
        email: "",

        adults,
        children,

        childrenAges: Array(children).fill(""),

        specialRequest: "",

       
    });

    // =========================
    // SETTINGS-DERIVED VALUES
    // Fallbacks match the original hardcoded values, so
    // behaviour is unchanged if settings are unavailable.
    // =========================
    const checkInTime = settings?.checkInTime || "12:00 PM";
    const checkOutTime = settings?.checkOutTime || "11:00 AM";
    const childAgeLimit = settings?.childAgeLimit ?? 10;
    const hotelName = settings?.hotelName || "Hotel Star Palace";
    const bookingEnabled = settings?.bookingEnabled ?? true;

    const checkInTimeDisplay = formatTimeDisplay(checkInTime);
    const checkOutTimeDisplay = formatTimeDisplay(checkOutTime);

    // =========================
    // FETCH ROOM + SETTINGS
    // =========================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roomRes, settingsRes] = await Promise.all([
                    getRoom(roomId),
                    getSettings().catch((err) => {
                        console.log("Settings fetch error:", err);
                        return null;
                    }),
                ]);

                setRoom(
                    roomRes?.room ||
                    roomRes?.data?.room ||
                    null
                );

                setSettings(
                    settingsRes?.settings ||
                    settingsRes?.data?.settings ||
                    settingsRes ||
                    null
                );
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (roomId) {
            fetchData();
        }
    }, [roomId]);

    // =========================
    // UPDATE URL VALUES
    // =========================
    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            adults,
            children,
           

            childrenAges:
                prev.childrenAges.length ===
                    children
                    ? prev.childrenAges
                    : Array(children).fill(""),
        }));
    }, [
        adults,
        children,
      
    ]);

    // =========================
    // PREFILL FROM LOGGED-IN USER
    // Only fills fields that are still empty, so it never overwrites
    // something the guest has already typed.
    // =========================
    useEffect(() => {
        if (!user) return;

        setForm((prev) => ({
            ...prev,
            customerName: prev.customerName || user.name || "",
            phone: prev.phone || user.phone || "",
            email: prev.email || user.email || "",
        }));
    }, [user]);

    // =========================
    // INPUT CHANGE
    // =========================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,

            [name]:
                name === "adults" ||
                    name === "children"
                    ? Number(value)
                    : value,
        }));
    };

    // =========================
    // CHILD AGE
    // =========================
    const handleChildAge = (
        index,
        value
    ) => {
        const ages = [
            ...form.childrenAges,
        ];

        ages[index] = Number(value);

        setForm((prev) => ({
            ...prev,
            childrenAges: ages,
        }));
    };

    // =========================
    // TOTAL NIGHTS
    // =========================
    const nights = useMemo(() => {
        if (!checkIn || !checkOut)
            return 1;

        const start = new Date(checkIn);

        const end = new Date(checkOut);

        const diff =
            (end - start) /
            (1000 * 60 * 60 * 24);

        return diff > 0 ? diff : 1;
    }, [checkIn, checkOut]);

    // =========================
    // TOTAL PRICE
    // =========================
    const total =
        (room?.price || 0) * nights;

    // =========================
    // GST
    // =========================
    const gstPercentage =
        settings?.gstPercentage || 0;

    const gstAmount =
        (total * gstPercentage) / 100;

    const grandTotal =
        total + gstAmount;

    const calculatedGuests =
        form.adults +
        form.childrenAges.filter(
            (age) => Number(age) >= childAgeLimit
        ).length;
    // =========================
    // CONFIRM BOOKING
    // =========================
    const handleBooking = async () => {
        if (!bookingEnabled) {
            return alert(
                "Online booking is temporarily unavailable. Please contact us to book."
            );
        }

        if (!form.customerName.trim()) {
            return alert("Please enter your full name.");
        }

        if (!/^[0-9]{10}$/.test(form.phone)) {
            return alert("Please enter a valid 10-digit phone number.");
        }

        if (
            form.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            return alert("Please enter a valid email address.");
        }

        // Children age validation
        if (form.children > 0) {
            const emptyAge = form.childrenAges.some(
                (age) => age === "" || age === null
            );
            const invalidAge = form.childrenAges.some(
                (age) => Number(age) > childAgeLimit
            );

            if (invalidAge) {
                return alert(
                    `Children age cannot be more than ${childAgeLimit} years.`
                );
            }

            if (emptyAge) {
                return alert(
                    "Please select age for all children."
                );
            }
        }

        setSubmitting(true);

        try {
            const payload = {
                customerName: form.customerName,
                phone: form.phone,
                email: form.email,

                roomId,

                adults: form.adults,
                children: form.children,
                childrenAges: form.childrenAges,

                specialRequest:
                    form.specialRequest,

                checkIn: `${checkIn}T${to24HourTime(checkInTime, 12)}`,
                checkOut: `${checkOut}T${to24HourTime(checkOutTime, 11)}`,

                roomPrice: room.price,
                nights,
                gstPercentage,
                gstAmount,
                totalAmount: grandTotal,
            };

            // =========================
            // 1. CREATE RAZORPAY ORDER
            // =========================
            const orderRes = await createOrder(payload);

            if (!orderRes?.success) {
                throw new Error(
                    orderRes?.message ||
                    "Could not start payment"
                );
            }

            // =========================
            // 2. LOAD RAZORPAY CHECKOUT SCRIPT
            // =========================
            const scriptLoaded = await loadRazorpayScript();

            if (!scriptLoaded) {
                alert(
                    "Unable to load payment gateway. Please check your internet connection and try again."
                );
                setSubmitting(false);
                return;
            }

            // =========================
            // 3. OPEN RAZORPAY CHECKOUT
            // =========================
            const options = {
                key: orderRes.key,
                amount: orderRes.order.amount,
                currency: orderRes.order.currency,
                order_id: orderRes.order.id,

                name: hotelName,
                description: `Booking for ${room.title}`,
                image: room.images?.length ? room.images[0] : room.image,

                prefill: {
                    name: form.customerName,
                    contact: form.phone,
                    email: form.email,
                },

                theme: {
                    color: settings?.themeColor || "#eab308",
                },

                // =========================
                // PAYMENT SUCCESS
                // =========================
                handler: async (response) => {
                    try {
                        const verifyRes = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        const booking =
                            verifyRes.booking ||
                            verifyRes.data?.booking ||
                            verifyRes.data;
                            console.log("VERIFY RESPONSE:", verifyRes);
console.log("BOOKING:", booking);

                        router.push(
                            `/booking/success?id=${booking._id}`
                        );
                    } catch (err) {
                        console.log(err);

                        // IMPORTANT: money has already been captured by
                        // Razorpay at this point. If verification fails
                        // here, don't tell the guest the booking failed —
                        // the webhook (server-side backup) will still
                        // confirm it shortly. Point them to support instead
                        // of letting them think they can safely retry/pay again.
                        alert(
                            "Your payment was received, but we couldn't confirm the booking instantly. " +
                            "Please contact us with your payment ID if you don't receive a confirmation shortly."
                        );
                    } finally {
                        setSubmitting(false);
                    }
                },

                // =========================
                // MODAL CLOSED WITHOUT PAYING
                // =========================
                modal: {
                    ondismiss: () => {
                        setSubmitting(false);
                    },
                },
            };

            const razorpayInstance = new window.Razorpay(options);

            // =========================
            // PAYMENT FAILED
            // =========================
            razorpayInstance.on("payment.failed", (response) => {
                alert(
                    "Payment failed: " +
                    (response?.error?.description ||
                        "Please try again.")
                );
                setSubmitting(false);
            });

            razorpayInstance.open();

        } catch (err) {
            console.log(err);

            alert(
                err?.response?.data?.message ||
                "Unable to start payment. Please try again."
            );
            setSubmitting(false);
        }
    };

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="py-32 text-center text-lg">
                Loading...
            </div>
        );
    }

    if (!room) {
        return (
            <div className="py-32 text-center text-lg">
                Room not found.
            </div>
        );
    }

    // =========================
    // RETURN
    // =========================
    return (
        <section className="min-h-screen bg-gray-50 py-14">

            <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-3">

                {/* LEFT */}

                <div className="lg:col-span-2">

                    <div className="rounded-3xl bg-white p-8 shadow-lg">

                        <h1 className="mb-8 text-3xl font-bold">
                            Complete Your Booking
                        </h1>

                        {!bookingEnabled && (
                            <div className="mb-8 rounded-xl bg-red-50 p-4">
                                <p className="text-center font-semibold text-red-600">
                                    Online booking is temporarily unavailable.
                                </p>
                            </div>
                        )}

                        {/* ROOM DETAILS */}

                        <div className="mb-10 flex flex-col gap-5 rounded-2xl border p-5 md:flex-row">

                            <div className="relative h-52 w-full overflow-hidden rounded-2xl md:w-72">

                                <Image
                                    src={
                                        room.images?.length
                                            ? room.images[0]
                                            : room.image
                                    }
                                    alt={room.title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            <div className="flex-1">

                                <h2 className="text-2xl font-bold">
                                    {room.title}
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    {room.roomType}
                                </p>

                                <div className="mt-6 space-y-3">

                                    <p>
                                        <span className="font-semibold">
                                            Check-In :
                                        </span>{" "}
                                        {checkIn} at{" "}
                                        <span className="font-semibold text-green-600">
                                           {checkInTimeDisplay}
                                        </span>
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Check-Out :
                                        </span>{" "}
                                        {checkOut} at{" "}
                                        <span className="font-semibold text-red-600">
                                            {checkOutTimeDisplay}
                                        </span>
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Adults :
                                        </span>{" "}
                                        {form.adults}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Children :
                                        </span>{" "}
                                        {form.children}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Nights :
                                        </span>{" "}
                                        {nights}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* GUEST DETAILS */}

                        <h2 className="mb-6 text-2xl font-bold">
                            Guest Details
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">
                            {/* NAME */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="customerName"
                                    value={form.customerName}
                                    onChange={handleChange}
                                    placeholder="Enter Full Name"
                                    className="w-full rounded-xl border p-4 outline-none focus:border-yellow-500"
                                />
                            </div>

                            {/* PHONE */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                    className="w-full rounded-xl border p-4 outline-none focus:border-yellow-500"
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block font-medium">
                                    Email (Optional)
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email Address"
                                    className="w-full rounded-xl border p-4 outline-none focus:border-yellow-500"
                                />
                            </div>

                            {/* ADULTS */}
                            <div>
                                <label className="mb-2 block font-medium">
                                    Adults
                                </label>

                                <div className="w-full rounded-xl border bg-gray-100 p-4">
                                    {form.adults}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Children
                                </label>

                                <div className="w-full rounded-xl border bg-gray-100 p-4">
                                    {form.children}
                                </div>
                            </div>

                        </div>

                        {/* CHILDREN AGE */}

                        {form.children > 0 && (
                            <div className="mt-8">

                                <h3 className="mb-4 text-xl font-semibold">
                                    Children's Age
                                </h3>

                                <div className="grid gap-5 md:grid-cols-2">

                                    {Array.from({
                                        length: form.children,
                                    }).map((_, index) => (

                                        <div key={index}>

                                            <label className="mb-2 block font-medium">
                                                Child {index + 1} Age
                                            </label>

                                            <select
                                                value={
                                                    form.childrenAges[index] || ""
                                                }
                                                onChange={(e) =>
                                                    handleChildAge(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-xl border p-4 outline-none focus:border-yellow-500"
                                            >
                                                <option value="">
                                                    Select Age
                                                </option>

                                                {Array.from({
                                                    length: childAgeLimit + 1,
                                                }).map((_, age) => (
                                                    <option
                                                        key={age}
                                                        value={age}
                                                    >
                                                        {age} Years
                                                    </option>
                                                ))}

                                            </select>

                                        </div>

                                    ))}

                                </div>

                                <p className="mt-3 text-sm text-gray-500">
                                    Children above {childAgeLimit} years are considered adults.
                                </p>

                            </div>
                        )}

                        {/* SPECIAL REQUEST */}

                        <div className="mt-8">

                            <label className="mb-2 block font-medium">
                                Special Request (Optional)
                            </label>

                            <textarea
                                rows={5}
                                name="specialRequest"
                                value={form.specialRequest}
                                onChange={handleChange}
                                placeholder="Example: Early check-in, Late arrival, Extra pillow, Birthday decoration..."
                                className="w-full rounded-xl border p-4 outline-none focus:border-yellow-500"
                            />

                        </div>

                    </div>

                </div>
                {/* RIGHT SIDE */}

                <div>

                    <div className="sticky top-24 rounded-3xl bg-white p-7 shadow-lg">

                        <h2 className="mb-6 text-2xl font-bold">
                            Booking Summary
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span>Room Price</span>
                                <span>₹{room.price}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Nights</span>
                                <span>{nights}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Adults</span>
                                <span>{form.adults}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Children</span>
                                <span>{form.children}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Total Guests</span>
                                <span>
                                    {form.adults + form.children}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Check-In</span>
                                <span>
                                   {checkIn} {checkInTimeDisplay}
                                </span>
                            </div>
                           

                            <div className="flex justify-between">
                                <span>Check-Out</span>
                                <span>
                                    {checkOut} {checkOutTimeDisplay}
                                </span>
                            </div>

                            <div className="flex justify-between border-t pt-4">
                                <span>Subtotal</span>
                                <span>
                                    ₹{total.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>GST ({gstPercentage}%)</span>
                                <span>
                                    ₹{gstAmount.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="border-t pt-4">

                                <div className="flex justify-between text-xl font-bold">

                                    <span>Total</span>

                                    <span>
                                        ₹{grandTotal.toLocaleString("en-IN")}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <button
                            onClick={handleBooking}
                            disabled={submitting || !bookingEnabled}
                            className="mt-8 w-full rounded-xl bg-yellow-500 py-4 text-lg font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting
                                ? "Processing Payment..."
                                : `Pay ₹${grandTotal.toLocaleString("en-IN")} & Confirm Booking`}
                        </button>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            By proceeding to payment you agree to our
                            hotel policies and cancellation terms.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}