"use client";


export default function RatingBreakdown({

  breakdown = {},

  totalReviews = 0,

}) {


  const ratings = [

    {
      star:5,
      value: Number(breakdown[5] || breakdown["5"] || 0),
    },

    {
      star:4,
      value: Number(breakdown[4] || breakdown["4"] || 0),
    },

    {
      star:3,
      value: Number(breakdown[3] || breakdown["3"] || 0),
    },

    {
      star:2,
      value: Number(breakdown[2] || breakdown["2"] || 0),
    },

    {
      star:1,
      value: Number(breakdown[1] || breakdown["1"] || 0),
    },

  ];





  return (

    <div

      className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"

    >



      <h3 className="mb-6 text-lg font-bold text-gray-800">

        Rating Breakdown

      </h3>






      {
        totalReviews === 0

        ?

        (

          <div className="rounded-2xl bg-gray-50 p-6 text-center text-sm text-gray-500">

            No ratings available yet

          </div>

        )


        :


        (

          <div className="space-y-5">


            {
              ratings.map((item)=>(


                <div

                  key={item.star}

                  className="flex items-center gap-3"

                >



                  {/* Star Label */}

                  <div className="flex w-16 items-center gap-1">


                    <span className="text-sm font-semibold text-gray-700">

                      {item.star}

                    </span>



                    <span className="text-yellow-500">

                      ★

                    </span>


                  </div>







                  {/* Progress */}

                  <div

                    className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200"

                  >


                    <div

                      className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-700"

                      style={{

                        width:`${
                          Math.round(
                            (item.value / totalReviews) * 100
                          )
                        }%`

                      }}

                    />


                  </div>







                  {/* Count */}

                  <span className="w-12 text-right text-sm font-medium text-gray-500">


                    {item.value}


                  </span>




                </div>


              ))
            }


          </div>

        )

      }




    </div>

  );

}