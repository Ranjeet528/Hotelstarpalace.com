import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      city: "Jaipur",
      image: "/testimonials/user1.jpg",
      review:
        "Excellent hospitality, clean rooms and just a few minutes away from Khatu Shyam Ji Temple. Highly recommended.",
    },
    {
      id: 2,
      name: "Priya Verma",
      city: "Delhi",
      image: "/testimonials/user2.jpg",
      review:
        "The food was amazing and the staff was very supportive. Our family had a wonderful stay.",
    },
    {
      id: 3,
      name: "Amit Singh",
      city: "Ahmedabad",
      image: "/testimonials/user3.jpg",
      review:
        "Beautiful rooms, peaceful atmosphere and premium service. Will definitely visit again.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-block rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold uppercase tracking-[3px] text-yellow-700">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-gray-900">
            What Our
            <span className="text-yellow-500"> Guests Say</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Hear from our happy guests who enjoyed a memorable stay
            at Hotel Star Palace.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition duration-500 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-2xl"
            >

              <Quote
                className="text-yellow-500"
                size={36}
              />

              <p className="mt-6 text-gray-600 leading-8">
                "{review.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">

                <Image
                  src={review.image}
                  alt={review.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />

                <div>

                  <h4 className="font-bold text-lg text-gray-900">
                    {review.name}
                  </h4>

                  <p className="text-gray-500">
                    {review.city}
                  </p>

                </div>

              </div>

              <div className="mt-6 flex gap-1 text-yellow-500">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                  />
                ))}

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}