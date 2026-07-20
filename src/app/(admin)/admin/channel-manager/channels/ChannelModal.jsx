"use client";

import { useEffect, useState } from "react";

import {
  X,
  Loader2,
} from "lucide-react";

import {
  createChannel,
  updateChannel,
} from "./channelApi";

export default function ChannelModal({

  open,

  setOpen,

  reload,

  editData,

}) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({

    name: "",

    slug: "",

    type: "ota",

    status: "active",

    apiKey: "",

    apiSecret: "",

    hotelId: "",

  });

  useEffect(() => {

    if (editData) {

      setForm({

        name: editData.name || "",

        slug: editData.slug || "",

        type: editData.type || "ota",

        status:
          editData.status || "active",

        apiKey:
          editData.apiKey || "",

        apiSecret:
          editData.apiSecret || "",

        hotelId:
          editData.hotelId || "",

      });

    } else {

      setForm({

        name: "",

        slug: "",

        type: "ota",

        status: "active",

        apiKey: "",

        apiSecret: "",

        hotelId: "",

      });

    }

  }, [editData, open]);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name.trim()) {

      return alert(
        "Channel Name Required"
      );

    }

    if (!form.slug.trim()) {

      return alert(
        "Slug Required"
      );

    }

    try {

      setLoading(true);

      if (editData) {

        await updateChannel(

          editData._id,

          form

        );

      } else {

        await createChannel(form);

      }

      reload();

      setOpen(false);

    } catch (err) {

      console.log(err);

      alert(

        err?.response?.data?.message ||

        "Something went wrong"

      );

    } finally {

      setLoading(false);

    }

  };

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>

            <h2 className="text-xl font-bold">

              {editData

                ? "Edit Channel"

                : "Add Channel"}

            </h2>

            <p className="mt-1 text-sm text-gray-500">

              Configure OTA connection

            </p>

          </div>

          <button

            onClick={() =>
              setOpen(false)
            }

            className="rounded-lg p-2 hover:bg-gray-100"

          >

            <X size={20} />

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Channel Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Channel Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Booking.com"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="booking-com"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Type
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
              >
                <option value="ota">
                  OTA
                </option>

                <option value="pms">
                  PMS
                </option>

                <option value="gds">
                  GDS
                </option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>
                    {/* API KEY */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              API Key
            </label>

            <input
              type="text"
              name="apiKey"
              value={form.apiKey}
              onChange={handleChange}
              placeholder="Enter API Key"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* API SECRET */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              API Secret
            </label>

            <input
              type="text"
              name="apiSecret"
              value={form.apiSecret}
              onChange={handleChange}
              placeholder="Enter API Secret"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* HOTEL ID */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Hotel ID
            </label>

            <input
              type="text"
              name="hotelId"
              value={form.hotelId}
              onChange={handleChange}
              placeholder="Hotel ID"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl border px-5 py-3 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {loading && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {editData
                ? "Update Channel"
                : "Create Channel"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}