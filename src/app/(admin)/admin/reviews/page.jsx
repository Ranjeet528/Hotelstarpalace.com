"use client";

import { useEffect, useState } from "react";
import {
  Check,
  X,
  Trash2,
  Star,
  Loader2,
  CalendarDays,
} from "lucide-react";


const API =
  process.env.NEXT_PUBLIC_API_URL;



export default function ReviewsPage() {


  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);


  const [status, setStatus] = useState("pending");


  const [actionLoading, setActionLoading] = useState(null);



  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);





  // ==========================
  // FETCH REVIEWS
  // ==========================

  const fetchReviews = async()=>{

    try{


      setLoading(true);



      const res = await fetch(

        `${API}/reviews/admin?status=${status}&page=${page}&limit=10`,

        {
          cache:"no-store",
        }

      );



      const data = await res.json();




      if(data.success){

        setReviews(
          data.data || []
        );

        console.log(data.data)


        setTotalPages(
          data.totalPages || 1
        );

      }


    }
    catch(error){

      console.log(
        "Review Fetch Error",
        error
      );

    }
    finally{

      setLoading(false);

    }

  };





  useEffect(()=>{

    fetchReviews();

  },[status,page]);







  // ==========================
  // ACTION
  // ==========================

  const updateReview = async(
    id,
    action
  )=>{


    try{


      setActionLoading(id);



      let url = "";

      let method = "PUT";



      if(action==="approve"){

        url =
        `${API}/reviews/approve/${id}`;

      }


      if(action==="reject"){

        url =
        `${API}/reviews/reject/${id}`;

      }


      if(action==="delete"){

        url =
        `${API}/reviews/${id}`;

        method="DELETE";

      }




      const res = await fetch(

        url,

        {
          method,
          credentials:"include",
        }

      );



      const data = await res.json();



      if(data.success){

        fetchReviews();

      }



    }
    catch(error){

      console.log(
        "Review Action Error",
        error
      );

    }
    finally{

      setActionLoading(null);

    }


  };







  return (

    <main className="min-h-screen bg-gray-50 p-5 md:p-8">


      {/* Header */}

      <div className="mb-8">


        <h1 className="text-3xl font-black text-gray-900">

          Customer Reviews

        </h1>


        <p className="mt-2 text-gray-500">

          Manage guest feedback and ratings

        </p>


      </div>







      {/* Filters */}


      <div className="mb-8 flex flex-wrap gap-3">


        {
          [
            "pending",
            "approved",
            "rejected",
            "all",
          ].map((item)=>(


            <button


              key={item}


              onClick={()=>{

                setStatus(item);

                setPage(1);

              }}


              className={`rounded-xl px-5 py-3 text-sm font-bold capitalize transition ${
                
                status===item

                ?

                "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg"

                :

                "bg-white text-gray-600 border"

              }`}


            >

              {item}


            </button>


          ))
        }


      </div>







      {/* Loading */}

      {
        loading && (

          <div className="flex justify-center py-20">

            <Loader2
              className="animate-spin text-yellow-500"
              size={40}
            />

          </div>

        )
      }







      {/* Empty */}

      {
        !loading &&
        reviews.length===0 && (

          <div className="rounded-3xl bg-white p-10 text-center shadow">

            <h3 className="text-xl font-bold text-gray-700">

              No Reviews Found

            </h3>

            <p className="mt-2 text-gray-500">

              There are no reviews in this category.

            </p>


          </div>

        )
      }








      {/* Reviews */}

      <div className="space-y-6">


        {
          reviews.map((review)=>(


            <div

              key={review._id}

              className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-xl"

            >





              <div className="flex flex-col justify-between gap-5 md:flex-row">





                {/* User */}

                <div>


                  <h2 className="text-xl font-bold text-gray-800">

                    {review.customerName}

                  </h2>



                  <p className="text-sm text-gray-500">

                    {review.email}

                  </p>




                  <div className="mt-3 flex gap-1">

                    {
                      [1,2,3,4,5].map((star)=>(

                        <Star

                          key={star}

                          size={18}

                          className={

                            star <= review.rating

                            ?

                            "fill-yellow-400 text-yellow-400"

                            :

                            "text-gray-300"

                          }

                        />

                      ))
                    }


                  </div>



                </div>







                {/* Status */}

                <span className={`h-fit rounded-full px-4 py-2 text-sm font-bold capitalize ${
                  
                  review.status==="approved"

                  ?

                  "bg-green-100 text-green-700"

                  :

                  review.status==="rejected"

                  ?

                  "bg-red-100 text-red-700"

                  :

                  "bg-yellow-100 text-yellow-700"

                }`}>

                  {review.status}

                </span>




              </div>







              {/* Room */}

              {
                review.roomId && (

                  <div className="mt-5 rounded-2xl bg-gray-50 p-4">


                    <p className="font-bold text-gray-800">

                      {review.roomId.title}

                    </p>


                    <p className="text-sm text-gray-500">

                      {review.roomId.roomType}

                    </p>


                  </div>

                )
              }







              {/* Review */}

              <h3 className="mt-5 text-lg font-bold text-gray-800">

                {review.title}

              </h3>



              <p className="mt-2 leading-7 text-gray-600">

                {review.review}

              </p>







              <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">

                <CalendarDays size={16}/>

                {
                  new Date(
                    review.createdAt
                  ).toLocaleDateString()
                }

              </div>







              {/* Actions */}


              <div className="mt-6 flex flex-wrap gap-3">


                {
                  review.status !== "approved" && (

                    <button

                      onClick={()=>updateReview(
                        review._id,
                        "approve"
                      )}

                      className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"

                    >

                      <Check size={18}/>

                      Approve

                    </button>

                  )
                }




                {
                  review.status !== "rejected" && (

                    <button

                      onClick={()=>updateReview(
                        review._id,
                        "reject"
                      )}

                      className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-bold text-white hover:bg-red-600"

                    >

                      <X size={18}/>

                      Reject

                    </button>

                  )
                }





                <button

                  onClick={()=>updateReview(
                    review._id,
                    "delete"
                  )}

                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 font-bold text-white hover:bg-black"

                >

                  <Trash2 size={18}/>

                  Delete

                </button>



              </div>




            </div>


          ))
        }


      </div>







      {/* Pagination */}

      {
        totalPages > 1 && (

          <div className="mt-10 flex justify-center gap-3">


            {
              Array.from(
                {
                  length:totalPages
                }
              ).map((_,index)=>(


                <button

                  key={index}

                  onClick={()=>setPage(index+1)}

                  className={`h-10 w-10 rounded-xl font-bold ${
                    
                    page===index+1

                    ?

                    "bg-yellow-500 text-white"

                    :

                    "bg-white border"

                  }`}

                >

                  {index+1}

                </button>


              ))
            }


          </div>

        )
      }



    </main>

  );

}