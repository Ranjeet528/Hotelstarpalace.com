"use client";

import { useState } from "react";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { sendContactMessage } from "@/services/contact.service";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await sendContactMessage(form);

      alert(res.message);

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

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

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              CONTACT FORM
            </span>

            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Send Us A Message
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Fill out the form below and our team
              will contact you as soon as possible.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              <div className="grid gap-6 md:grid-cols-2">

                <Input
                  icon={<User size={18} />}
                  placeholder="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

                <Input
                  icon={<Mail size={18} />}
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <Input
                  icon={<Phone size={18} />}
                  placeholder="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

                <Input
                  icon={<MessageSquare size={18} />}
                  placeholder="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                />

              </div>

              <div>

                <textarea
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    bg-white
                    p-5
                    outline-none
                    transition
                    focus:border-orange-500
                  "
                />

              </div>
              <button
                type="submit"
                disabled={loading}
                className="
    flex
    items-center
    justify-center
    gap-2
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
                <Send size={18} />

                {loading ? "Sending Message..." : "Send Message"}
              </button>

            </form>

                   <a
  href="https://wa.me/917414875774"
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-4
    flex
    items-center
    justify-center
    rounded-2xl
    border
    border-green-500
    px-8
    py-4
    font-semibold
    text-green-600
    transition
    hover:bg-green-500
    hover:text-white
  "
>
  💬 Chat on WhatsApp
</a>


          </div>



 

          {/* RIGHT */}

          <div
            className="
              rounded-3xl
              bg-gradient-to-br
              from-orange-500
              via-orange-600
              to-amber-500
              p-10
              text-white
            "
          >

            <h3 className="text-3xl font-bold">
              Why Contact Us?
            </h3>

            <p className="mt-5 leading-8 text-orange-100">
              Our hospitality team is available
              every day to assist with bookings,
              room information, cancellations,
              special requests and any other
              questions you may have.
            </p>

            <div className="mt-10 space-y-6">

              {[
                "Instant Booking Support",
                "Quick Response",
                "24×7 Reception",
                "Luxury Hospitality",
                "Best Price Guarantee",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <CheckCircle
                    size={22}
                    className="text-yellow-300"
                  />

                  <span className="text-lg">
                    {item}
                  </span>

                </div>

              ))}

            </div>

            <div className="mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur">

              <h4 className="text-xl font-semibold">
                Need Immediate Help?
              </h4>

              <p className="mt-3 text-orange-100">
                Call our reception anytime.
                We are available 24 hours.
              </p>

              <a
                href="tel:+917414875774"
                className="
                  mt-6
                  inline-block
                  rounded-xl
                  bg-white
                  px-6
                  py-3
                  font-semibold
                  text-orange-600
                "
              >
                Call Reception
              </a>
              <a
                href="mailto:Ranjeetgurjar528@gmail.com"
                className="mt-4 block text-orange-100 hover:text-white"
              >
                ✉️ Ranjeetgurjar528@gmail.com
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function Input({
  icon,
  ...props
}) {
  return (
    <div className="relative">

      <span
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      >
        {icon}
      </span>

      <input
        {...props}
        required
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-gray-300
          bg-white
          pl-12
          pr-4
          outline-none
          transition
          focus:border-orange-500
        "
      />

    </div>
  );
}