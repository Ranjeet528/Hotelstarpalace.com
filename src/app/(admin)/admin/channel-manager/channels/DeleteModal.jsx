"use client";

import {
  Trash2,
  X,
} from "lucide-react";

export default function DeleteModal({

  open,

  setOpen,

  loading,

  onConfirm,

  title = "Delete Channel",

  message = "Are you sure you want to delete this channel?",

}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b px-6 py-5">

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            <X size={22}/>
          </button>

        </div>

        <div className="space-y-6 p-6">

          <div className="flex justify-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

              <Trash2
                size={36}
                className="text-red-600"
              />

            </div>

          </div>

          <p className="text-center text-gray-600">

            {message}

          </p>

          <div className="flex justify-end gap-3">

            <button

              onClick={() => setOpen(false)}

              className="rounded-xl border px-6 py-3"

            >

              Cancel

            </button>

            <button

              onClick={onConfirm}

              disabled={loading}

              className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"

            >

              {loading
                ? "Deleting..."
                : "Delete"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}