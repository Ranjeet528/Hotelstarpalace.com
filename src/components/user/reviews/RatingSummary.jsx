"use client";

import Stars from "./Stars";
import RatingBreakdown from "./RatingBreakdown";


export default function RatingSummary({

  averageRating = 0,

  totalReviews = 0,

  breakdown = {},

}) {


  const rating = Number(averageRating) || 0;




  const getReviewText = () => {


    if(totalReviews === 0)

      return "No Reviews Yet";


    if(rating >= 4.8)

      return "Excellent";


    if(rating >= 4.5)

      return "Amazing";


    if(rating >= 4)

      return "Very Good";


    if(rating >= 3)

      return "Good";


    return "Average";


  };





  return (

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">





      {/* Main Rating */}

      <div

        className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-8 text-center shadow-sm transition hover:shadow-lg"

      >



        <h2 className="text-6xl font-black text-gray-900">

          {rating.toFixed(1)}

        </h2>





        <div className="mt-3">


          <Stars

            rating={rating}

            size={28}

          />


        </div>






        <h3 className="mt-4 text-xl font-bold text-yellow-600">

          {getReviewText()}

        </h3>





        <p className="mt-2 text-sm text-gray-500">

          {
            totalReviews > 0
            ?
            `Based on ${totalReviews} guest reviews`
            :
            "Be the first to review this room"
          }

        </p>




      </div>







      {/* Rating Breakdown */}

      <div className="lg:col-span-2">


        <RatingBreakdown


          breakdown={breakdown}


          totalReviews={totalReviews}


        />


      </div>





    </div>

  );

}