"use client";

import {
  BadgeCheck,
  CalendarDays,
  MessageCircle,
} from "lucide-react";

import Stars from "./Stars";


export default function ReviewCard({

  review,

}) {


  if (!review) return null;




  const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day:"2-digit",
        month:"short",
        year:"numeric",
      }
    );

  };





  return (

    <div

      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"

    >




      {/* Header */}

      <div className="flex items-start justify-between gap-4">


        <div className="flex items-center gap-4">


          {/* Avatar */}

          <div

            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-lg font-bold text-white"

          >

            {
              review.customerName
              ?.charAt(0)
              ?.toUpperCase()
              ||
              "G"
            }


          </div>





          <div>


            <h3 className="font-bold text-gray-800">

              {review.customerName || "Guest"}

            </h3>



            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">


              <CalendarDays size={14}/>


              {formatDate(review.createdAt)}


            </div>


          </div>


        </div>





        {
          review.isVerified && (

            <div

              className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600"

            >

              <BadgeCheck size={15}/>

              Verified

            </div>

          )
        }



      </div>






      {/* Rating */}

      <div className="mt-5">


        <Stars

          rating={review.rating}

          size={20}

        />


      </div>







      {/* Title */}

      {
        review.title && (

          <h4 className="mt-5 text-lg font-bold text-gray-800">

            {review.title}

          </h4>

        )
      }







      {/* Review */}

      <p className="mt-3 leading-7 text-gray-600">

        {review.review}

      </p>







      {/* Admin Reply */}

      {
        review.adminReply && (

          <div className="mt-5 rounded-2xl bg-yellow-50 p-4">


            <div className="mb-2 flex items-center gap-2 font-semibold text-gray-800">


              <MessageCircle size={16}/>

              Hotel Response


            </div>



            <p className="text-sm leading-6 text-gray-600">

              {review.adminReply}

            </p>


          </div>

        )
      }







      {/* Helpful */}

      {
        review.helpfulCount > 0 && (

          <div className="mt-5 text-sm text-gray-500">

            👍 {review.helpfulCount} guests found this helpful

          </div>

        )
      }





    </div>

  );

}