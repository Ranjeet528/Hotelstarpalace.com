"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import {
  Search,
  RefreshCw,
  Mail,
} from "lucide-react";

import {
  getAllContacts,
  deleteContact,
  markAsRead,
} from "@/services/contact.service";

export default function ContactPage() {

  const [loading, setLoading] = useState(true);

  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState("");

  // ==========================
  // FETCH CONTACTS
  // ==========================

  const fetchContacts = async () => {

    try {

      const res = await getAllContacts();

      setContacts(res.contacts || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchContacts();

  }, []);

  // ==========================
  // DELETE
  // ==========================

  const handleDelete = async (id) => {

    if (!confirm("Delete this message?")) return;

    try {

      await deleteContact(id);

      fetchContacts();

    } catch (err) {

      console.log(err);

    }

  };

  // ==========================
  // MARK AS READ
  // ==========================

  const handleRead = async (id) => {

    try {

      await markAsRead(id);

      fetchContacts();

    } catch (err) {

      console.log(err);

    }

  };

  // ==========================
  // SEARCH
  // ==========================

  const filteredContacts = useMemo(() => {

    return contacts.filter((item) => {

      const value = search.toLowerCase();

      return (

        item.name.toLowerCase().includes(value) ||

        item.email.toLowerCase().includes(value) ||

        item.subject.toLowerCase().includes(value)

      );

    });

  }, [contacts, search]);

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Contact Messages

          </h1>

          <p className="mt-2 text-gray-500">

            Manage all customer enquiries.

          </p>

        </div>

        <button

          onClick={fetchContacts}

          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-orange-500
            px-5
            py-3
            font-semibold
            text-white
            hover:bg-orange-600
          "
        >

          <RefreshCw size={18} />

          Refresh

        </button>

      </div>

      {/* SEARCH */}

      <div className="relative max-w-md">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input

          type="text"

          placeholder="Search message..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
            h-12
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            pl-11
            pr-4
            outline-none
            focus:border-orange-500
          "
        />

      </div>
            {/* ==========================
          STATS
      ========================== */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Total Messages
          </p>

          <h2 className="mt-3 text-4xl font-bold text-orange-600">
            {contacts.length}
          </h2>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow">

          <p className="text-gray-500">
            New Messages
          </p>

          <h2 className="mt-3 text-4xl font-bold text-red-500">
            {
              contacts.filter(
                (item) => item.status === "new"
              ).length
            }
          </h2>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Read Messages
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {
              contacts.filter(
                (item) => item.status === "read"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* ==========================
          TABLE
      ========================== */}

      <div className="overflow-hidden rounded-3xl bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold">

            All Messages

          </h2>

        </div>

        {loading ? (

          <div className="py-20 text-center">

            Loading...

          </div>

        ) : filteredContacts.length === 0 ? (

          <div className="py-20 text-center text-gray-500">

            <Mail
              size={45}
              className="mx-auto mb-4 text-gray-300"
            />

            No Messages Found

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-center">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Date
                  </th>

                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredContacts.map((item) => (

                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">

                      <div className="font-semibold">

                        {item.name}

                      </div>

                      <div className="text-sm text-gray-500">

                        {item.email}

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      {item.subject}

                    </td>

                    <td className="text-center">

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold

                          ${
                            item.status === "new"

                              ? "bg-red-100 text-red-700"

                              : item.status === "read"

                              ? "bg-green-100 text-green-700"

                              : "bg-blue-100 text-blue-700"

                          }
                        `}
                      >

                        {item.status}

                      </span>

                    </td>

                    <td className="text-center">

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString("en-IN")}

                    </td>

                    <td className="text-center">

                      <div className="flex items-center justify-center gap-2">
                                                <Link
                          href={`/admin/contact/${item._id}`}
                          className="
                            rounded-lg
                            bg-blue-500
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-blue-600
                          "
                        >
                          View
                        </Link>

                        {item.status === "new" && (
                          <button
                            onClick={() => handleRead(item._id)}
                            className="
                              rounded-lg
                              bg-green-500
                              px-3
                              py-2
                              text-sm
                              font-medium
                              text-white
                              transition
                              hover:bg-green-600
                            "
                          >
                            Read
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="
                            rounded-lg
                            bg-red-500
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-red-600
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}
                      