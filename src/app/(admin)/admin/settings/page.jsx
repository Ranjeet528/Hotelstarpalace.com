"use client";

import { useEffect, useState } from "react";

import {
  Save,
  Settings,
  Hotel,
  Clock,
  Baby,
  Receipt,
  Bell,
} from "lucide-react";

import {
  getSettings,
  updateSettings,
} from "@/services/settings.service";

export default function SettingsPage() {

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({

    bookingEnabled: true,

    checkInTime: "12:00",

    checkOutTime: "11:00",

    freeCancellationHours: 24,

    gstPercentage: 12,

    maxChildren: 2,

    childAgeLimit: 5,

    hotelNotice: "",

  });

  // ==========================
  // FETCH SETTINGS
  // ==========================

  const fetchSettings = async () => {

    try {

      const res = await getSettings();

      if (res.success) {

        setForm({

          bookingEnabled:
            res.settings.bookingEnabled,

          checkInTime:
            res.settings.checkInTime,

          checkOutTime:
            res.settings.checkOutTime,

          freeCancellationHours:
            res.settings.freeCancellationHours,

          gstPercentage:
            res.settings.gstPercentage,

          maxChildren:
            res.settings.maxChildren,

          childAgeLimit:
            res.settings.childAgeLimit,

          hotelNotice:
            res.settings.hotelNotice || "",

        });

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchSettings();

  }, []);

  // ==========================
  // INPUT CHANGE
  // ==========================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));

  };

  // ==========================
  // SAVE SETTINGS
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const res = await updateSettings(form);

      alert(res.message);

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <div className="p-10">

        Loading Settings...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-orange-500 p-4 text-white">

          <Settings size={28} />

        </div>

        <div>

          <h1 className="text-3xl font-bold">

            Hotel Settings

          </h1>

          <p className="mt-1 text-gray-500">

            Manage booking rules and hotel policies.

          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >      {/* ========================= */}
      {/* BOOKING SETTINGS */}
      {/* ========================= */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center gap-3">

          <div className="rounded-xl bg-orange-100 p-3 text-orange-600">

            <Hotel size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Booking Settings

            </h2>

            <p className="text-gray-500">

              Configure booking availability and timings.

            </p>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Booking Enable */}

          <div className="rounded-2xl border p-6">

            <label className="flex items-center justify-between">

              <div>

                <p className="font-semibold">

                  Booking Enabled

                </p>

                <p className="mt-1 text-sm text-gray-500">

                  Allow customers to book rooms.

                </p>

              </div>

              <input

                type="checkbox"

                name="bookingEnabled"

                checked={form.bookingEnabled}

                onChange={handleChange}

                className="h-6 w-6 accent-orange-500"

              />

            </label>

          </div>

          {/* Check In */}

          <div className="rounded-2xl border p-6">

            <label className="mb-3 flex items-center gap-2 font-semibold">

              <Clock size={18} />

              Check-In Time

            </label>

            <input

              type="time"

              name="checkInTime"

              value={form.checkInTime}

              onChange={handleChange}

              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"

            />

          </div>

          {/* Check Out */}

          <div className="rounded-2xl border p-6">

            <label className="mb-3 flex items-center gap-2 font-semibold">

              <Clock size={18} />

              Check-Out Time

            </label>

            <input

              type="time"

              name="checkOutTime"

              value={form.checkOutTime}

              onChange={handleChange}

              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"

            />

          </div>

          {/* Free Cancellation */}

          <div className="rounded-2xl border p-6">

            <label className="mb-3 font-semibold">

              Free Cancellation (Hours)

            </label>

            <input

              type="number"

              name="freeCancellationHours"

              value={form.freeCancellationHours}

              onChange={handleChange}

              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"

            />

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* CHILDREN POLICY */}
      {/* ========================= */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">

            <Baby size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Children Policy

            </h2>

            <p className="text-gray-500">

              Configure child booking rules.

            </p>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Max Children */}

          <div>

            <label className="mb-3 block font-semibold">

              Maximum Children

            </label>

            <input

              type="number"

              name="maxChildren"

              value={form.maxChildren}

              onChange={handleChange}

              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"

            />

          </div>

          {/* Age Limit */}

          <div>

            <label className="mb-3 block font-semibold">

              Child Age Limit

            </label>

            <input

              type="number"

              name="childAgeLimit"

              value={form.childAgeLimit}

              onChange={handleChange}

              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"

            />

          </div>

        </div>

      </div>
            {/* ========================= */}
      {/* GST & TAX */}
      {/* ========================= */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center gap-3">

          <div className="rounded-xl bg-green-100 p-3 text-green-600">

            <Receipt size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Pricing Settings

            </h2>

            <p className="text-gray-500">

              Configure GST percentage.

            </p>

          </div>

        </div>

        <div className="max-w-sm">

          <label className="mb-3 block font-semibold">

            GST Percentage

          </label>

          <input
            type="number"
            min="0"
            max="100"
            name="gstPercentage"
            value={form.gstPercentage}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              p-3
              outline-none
              focus:border-orange-500
            "
          />

        </div>

      </div>

      {/* ========================= */}
      {/* HOTEL NOTICE */}
      {/* ========================= */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center gap-3">

          <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">

            <Bell size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Hotel Notice

            </h2>

            <p className="text-gray-500">

              This notice will appear on the booking page.

            </p>

          </div>

        </div>

        <textarea
          rows={6}
          name="hotelNotice"
          value={form.hotelNotice}
          onChange={handleChange}
          placeholder="Example:
• Valid ID proof is mandatory.
• Outside food is not allowed.
• Pets are not allowed."
          className="
            w-full
            rounded-2xl
            border
            p-4
            outline-none
            focus:border-orange-500
          "
        />

      </div>

      {/* ========================= */}
      {/* SAVE BUTTON */}
      {/* ========================= */}

      <div className="flex justify-end">

        <button
          type="submit"
          disabled={saving}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-orange-500
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-orange-600
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >

          <Save size={20} />

          {saving
            ? "Saving..."
            : "Save Settings"}

        </button>

      </div>

    </form>

  </div>

);

}