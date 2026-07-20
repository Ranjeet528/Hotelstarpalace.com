"use client";

import ReviewCard from "./ReviewCard";
import EmptyReview from "./EmptyReview";


export default function ReviewList({

  reviews = [],

}) {


  if (!Array.isArray(reviews) || reviews.length === 0) {

    return (

      <EmptyReview />

    );

  }





  return (

    <div className="space-y-5">


      {
        reviews.map((review) => (

          <ReviewCard

            key={review._id}

            review={review}

          />

        ))
      }


    </div>

  );

}