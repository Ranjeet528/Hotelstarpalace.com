"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";

export default function ReviewForm({
  roomId,
  onSuccess,
}) {

  const [customerName, setCustomerName] = useState("");

  const [email, setEmail] = useState("");

  const [title, setTitle] = useState("");

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);



  const submitReview = async (e) => {

    e.preventDefault();



    if (!customerName.trim()) {

      alert("Please enter your name");

      return;

    }


    if (!rating) {

      alert("Please select rating");

      return;

    }


    if (!review.trim()) {

      alert("Please write your review");

      return;

    }



    try {

      setLoading(true);



      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },


          body:JSON.stringify({

            roomId,

            customerName,

            email,

            title,

            rating,

            review,

          }),

        }
      );



      const data = await res.json();



      if(!res.ok){

        throw new Error(
          data.message ||
          "Review submit failed"
        );

      }



      setCustomerName("");

      setEmail("");

      setTitle("");

      setRating(0);

      setReview("");



      if(onSuccess){

        onSuccess(data);

      }



      alert(
        "Review submitted successfully. Waiting for approval."
      );


    }
    catch(error){

      console.log(
        "Review Submit Error:",
        error
      );


      alert(
        error.message
      );

    }
    finally{

      setLoading(false);

    }

  };

  return (

    <form

      onSubmit={submitReview}

      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"

    >


      <h3 className="mb-6 text-xl font-bold text-gray-800">

        Write a Review

      </h3>

      {/* Name */}

      <input

        value={customerName}

        onChange={(e)=>
          setCustomerName(e.target.value)
        }

        placeholder="Your Name"

        className="mb-4 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"

      />
      {/* Email */}

      <input

        value={email}

        onChange={(e)=>
          setEmail(e.target.value)
        }

        placeholder="Email (Optional)"

        type="email"

        className="mb-4 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"

      />
      {/* Title */}

      <input

        value={title}

        onChange={(e)=>
          setTitle(e.target.value)
        }

        placeholder="Review Title (Optional)"

        className="mb-5 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"

      />

      {/* Rating */}

      <div className="mb-6">

        <p className="mb-3 text-sm font-semibold text-gray-600">

          Your Rating

        </p>


        <div className="flex gap-2">

          {[1,2,3,4,5].map((item)=>(

            <button

              key={item}

              type="button"

              onClick={()=>
                setRating(item)
              }

              className="transition hover:scale-110"

            >

              <Star

                size={34}

                className={
                  item <= rating
                  ?
                  "fill-yellow-400 text-yellow-400"
                  :
                  "text-gray-300"
                }

              />

            </button>

          ))}

        </div>

      </div>

      {/* Review */}

      <textarea

        value={review}

        onChange={(e)=>
          setReview(e.target.value)
        }

        placeholder="Share your experience..."

        rows={5}

        className="w-full rounded-2xl border border-gray-200 p-4 text-sm outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"

      />

      {/* Submit */}

      <button

        disabled={loading}

        className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"

      >

        <Send size={20}/>


        {
          loading
          ?
          "Submitting..."
          :
          "Submit Review"
        }


      </button>



    </form>

  );

}