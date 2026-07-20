"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in starts at 12:00 PM and check-out is until 11:00 AM.",
  },
  {
    question: "Do you provide free Wi-Fi?",
    answer:
      "Yes, complimentary high-speed Wi-Fi is available throughout the hotel.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, we provide free private parking for all hotel guests.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. Cancellation depends on your booking policy. Please contact us for assistance.",
  },
  {
    question: "Do you offer room service?",
    answer:
      "Yes, room service is available during hotel operating hours.",
  },
  {
    question: "How can I contact the hotel?",
    answer:
      "You can call us, email us, or submit the contact form on this page.",
  },
];

export default function ContactFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4">

        <div className="text-center mb-12">
          <span className="text-orange-600 font-semibold uppercase tracking-widest">
            FAQ
          </span>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Find quick answers to the most common questions about
            Hotel Star Palace.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white shadow-sm border overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="font-semibold text-lg">
                  {item.question}
                </h3>

                <ChevronDown
                  size={22}
                  className={`transition-transform ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-600 leading-7">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}