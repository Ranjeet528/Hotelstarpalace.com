"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "./data";

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-yellow-700">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-gray-900">
            Frequently Asked
            <span className="text-yellow-500"> Questions</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Find answers to the most common questions about our restaurant.
          </p>

        </div>

        {/* FAQ */}

        <div className="mt-14 space-y-5">

          {faqs.map((faq, index) => {

            const open = active === index;

            return (

              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >

                <button
                  onClick={() =>
                    setActive(open ? -1 : index)
                  }
                  className="flex w-full items-center justify-between px-7 py-6 text-left"
                >

                  <h3 className="text-lg font-semibold text-gray-900">

                    {faq.question}

                  </h3>

                  <ChevronDown
                    className={`transition duration-300 ${
                      open ? "rotate-180 text-yellow-500" : ""
                    }`}
                  />

                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    open
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">

                    <p className="px-7 pb-6 text-gray-600 leading-7">

                      {faq.answer}

                    </p>

                  </div>
                </div>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}