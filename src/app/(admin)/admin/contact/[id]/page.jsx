"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
} from "lucide-react";

import {
  getContact,
  markAsRead,
  deleteContact,
} from "@/services/contact.service";

export default function ContactDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [contact, setContact] = useState(null);

  // ==========================
  // FETCH CONTACT
  // ==========================

  const fetchContact = async () => {

    try {

      const res = await getContact(id);

      setContact(res.contact);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (id) {

      fetchContact();

    }

  }, [id]);

  // ==========================
  // MARK AS READ
  // ==========================

  const handleRead = async () => {

    try {

      await markAsRead(id);

      fetchContact();

    } catch (err) {

      console.log(err);

    }

  };

  // ==========================
  // DELETE MESSAGE
  // ==========================

  const handleDelete = async () => {

    if (!confirm("Delete this message?")) return;

    try {

      await deleteContact(id);

      router.push("/admin/contact");

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }

  if (!contact) {

    return (

      <div className="p-10">

        Message not found.

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            Contact Message

          </h1>

          <p className="mt-2 text-gray-500">

            View complete customer enquiry.

          </p>

        </div>

        <button
          onClick={() => router.push("/admin/contact")}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-gray-900
            px-5
            py-3
            font-semibold
            text-white
            hover:bg-black
          "
        >
          <ArrowLeft size={18} />

          Back
        </button>

      </div>
            {/* ==========================
          SENDER DETAILS
      ========================== */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Avatar */}

          <div
            className="
              flex
              h-28
              w-28
              items-center
              justify-center
              rounded-full
              bg-orange-500
              text-4xl
              font-bold
              text-white
            "
          >
            {contact.name.charAt(0).toUpperCase()}
          </div>

          {/* Info */}

          <div className="grid flex-1 gap-6 md:grid-cols-2">

            <div>

              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <div className="mt-2 flex items-center gap-2">

                <User size={18} />

                <span className="font-semibold">
                  {contact.name}
                </span>

              </div>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Email Address
              </p>

              <div className="mt-2 flex items-center gap-2">

                <Mail size={18} />

                <span>{contact.email}</span>

              </div>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Phone Number
              </p>

              <div className="mt-2 flex items-center gap-2">

                <Phone size={18} />

                <span>{contact.phone}</span>

              </div>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Status
              </p>

              <div className="mt-2">

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-semibold

                    ${
                      contact.status === "new"
                        ? "bg-red-100 text-red-700"
                        : contact.status === "read"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  `}
                >
                  {contact.status}
                </span>

              </div>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Received On
              </p>

              <div className="mt-2 flex items-center gap-2">

                <Calendar size={18} />

                <span>
                  {new Date(contact.createdAt).toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Subject
              </p>

              <div className="mt-2 flex items-center gap-2">

                <MessageSquare size={18} />

                <span className="font-medium">
                  {contact.subject}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ==========================
          MESSAGE
      ========================== */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <h2 className="text-2xl font-bold">
          Customer Message
        </h2>

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            p-6
            leading-8
            text-gray-700
            whitespace-pre-wrap
          "
        >
          {contact.message}
        </div>

      </div>
            {/* ==========================
          ACTIONS
      ========================== */}

      <div className="flex flex-wrap gap-4">

        {contact.status === "new" && (

          <button
            onClick={handleRead}
            className="
              rounded-xl
              bg-green-500
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-green-600
            "
          >
            Mark as Read
          </button>

        )}

        <button
          onClick={handleDelete}
          className="
            rounded-xl
            bg-red-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-600
          "
        >
          Delete Message
        </button>

        <button
          onClick={() => router.push("/admin/contact")}
          className="
            rounded-xl
            border
            border-gray-300
            px-6
            py-3
            font-semibold
            transition
            hover:bg-gray-100
          "
        >
          Back to Messages
        </button>

      </div>

    </div>
  );
}