"use client";

import { useEffect, useState } from "react";

import RatingSummary from "./RatingSummary";
import ReviewList from "./ReviewList";
import ReviewModal from "./ReviewModal";

import { MessageSquarePlus } from "lucide-react";


export default function RoomReviews({

  roomId,

}) {


  const [reviews, setReviews] = useState([]);


  const [summary, setSummary] = useState({

    averageRating:0,

    totalReviews:0,

    breakdown:{},

  });



  const [loading, setLoading] = useState(true);


  const [openModal, setOpenModal] = useState(false);





  const fetchReviews = async()=>{

    try{


      setLoading(true);



      const res = await fetch(

        `${process.env.NEXT_PUBLIC_API_URL}/reviews/room/${roomId}`,

        {
          cache:"no-store",
        }

      );



      const data = await res.json();



      if(data.success){


        setReviews(
          data.data || []
        );



        setSummary({

          averageRating:
            data.averageRating || 0,


          totalReviews:
            data.totalReviews || data.total || 0,


          breakdown:
            data.breakdown || {},


        });


      }


    }
    catch(error){


      console.log(
        "Review Fetch Error:",
        error
      );


    }
    finally{


      setLoading(false);


    }


  };





  useEffect(()=>{

    fetchReviews();

  },[roomId]);







  return (

    <section className="mt-16">



      {/* Header */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">


        <div>


          <h2 className="text-3xl font-black text-gray-900">

            Guest Reviews

          </h2>


          <p className="mt-2 text-gray-500">

            See what our guests say about this room

          </p>


        </div>





        <button

          onClick={()=>setOpenModal(true)}

          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"

        >

          <MessageSquarePlus size={20}/>

          Write a Review

        </button>



      </div>







      {/* Rating Summary */}


      {!loading && (

        <RatingSummary

          averageRating={
            summary.averageRating
          }


          totalReviews={
            summary.totalReviews
          }


          breakdown={
            summary.breakdown
          }


        />

      )}







      {/* Reviews List */}


      <div className="mt-10">


        {
          loading

          ?

          (

            <div className="rounded-3xl border bg-white p-10 text-center text-gray-500">

              Loading reviews...

            </div>

          )


          :


          (

            <ReviewList

              reviews={reviews}

            />

          )

        }


      </div>







      {/* Review Modal */}


      <ReviewModal


        open={openModal}


        onClose={()=>setOpenModal(false)}


        roomId={roomId}


        onSuccess={()=>{


          fetchReviews();


        }}


      />



    </section>

  );

}