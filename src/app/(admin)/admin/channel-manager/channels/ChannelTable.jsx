"use client";

import { useState } from "react";

import {
  Trash2,
  Pencil,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  deleteChannel,
  syncChannel,
} from "./channelApi";

import DeleteModal from "./DeleteModal";
import ChannelModal from "./ChannelModal";

export default function ChannelTable({

  channels = [],

  loading,

  search,

  reload,

}) {

  const [editOpen, setEditOpen] = useState(false);

  const [editData, setEditData] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const filtered = channels.filter((item) => {

    return (

      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.slug
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  });

  const handleSync = async (id) => {

    try {

      await syncChannel(id);

      alert("Sync Started");

      reload();

    } catch (err) {

      console.log(err);

      alert("Sync Failed");

    }

  };

  const handleDelete = async () => {

    try {

      setDeleteLoading(true);

      await deleteChannel(deleteId);

      reload();

      setDeleteOpen(false);

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    } finally {

      setDeleteLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="py-20 text-center text-gray-500">

        Loading Channels...

      </div>

    );

  }

  if (!filtered.length) {

    return (

      <div className="py-20 text-center text-gray-500">

        No Channels Found

      </div>

    );

  }

  return (

    <>

      <div className="mt-6 overflow-x-auto rounded-2xl border">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-5 py-4 text-left">

                Channel

              </th>

              <th className="px-5 py-4 text-left">

                Type

              </th>

              <th className="px-5 py-4 text-left">

                Status

              </th>

              <th className="px-5 py-4 text-left">

                Last Sync

              </th>

              <th className="px-5 py-4 text-center">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>
                      {filtered.map((item) => (

            <tr
              key={item._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-5 py-4">

                <div className="font-semibold">
                  {item.name}
                </div>

                <div className="text-sm text-gray-500">
                  {item.slug}
                </div>

              </td>

              <td className="px-5 py-4">

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                  {item.type}

                </span>

              </td>

              <td className="px-5 py-4">

                {item.status === "active" ? (

                  <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                    <CheckCircle2 size={15} />

                    Active

                  </span>

                ) : (

                  <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">

                    <XCircle size={15} />

                    Inactive

                  </span>

                )}

              </td>

              <td className="px-5 py-4">

                {item.lastSync
                  ? new Date(item.lastSync).toLocaleString()
                  : "-"}

              </td>

              <td className="px-5 py-4">

                <div className="flex items-center justify-center gap-3">

                  <button

                    onClick={() => {

                      setEditData(item);

                      setEditOpen(true);

                    }}

                    className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"

                  >

                    <Pencil size={18} />

                  </button>

                  <button

                    onClick={() =>
                      handleSync(item._id)
                    }

                    className="rounded-lg bg-green-100 p-2 text-green-600 transition hover:bg-green-200"

                  >

                    <RefreshCw size={18} />

                  </button>

                  <button

                    onClick={() => {

                      setDeleteId(item._id);

                      setDeleteOpen(true);

                    }}

                    className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"

                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </td>

            </tr>

          ))}

          </tbody>

        </table>

      </div>

      <ChannelModal

        open={editOpen}

        setOpen={setEditOpen}

        reload={reload}

        editData={editData}

      />

      <DeleteModal

        open={deleteOpen}

        setOpen={setDeleteOpen}

        loading={deleteLoading}

        onConfirm={handleDelete}

      />

    </>

  );

}