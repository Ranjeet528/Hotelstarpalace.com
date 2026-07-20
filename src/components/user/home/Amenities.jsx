import {
  Wifi,
  Car,
  UtensilsCrossed,
  ShieldCheck,
  Dumbbell,
  Tv,
  AirVent,
  BellRing,
} from "lucide-react";


export default function Amenities() {


  const amenities = [
    {
      title: "Free Wi-Fi",
      desc: "High-speed internet access throughout the hotel.",
      icon: Wifi,
    },
    {
      title: "Free Parking",
      desc: "Safe and spacious parking for all our guests.",
      icon: Car,
    },
    {
      title: "Restaurant",
      desc: "Multi-cuisine restaurant serving delicious meals.",
      icon: UtensilsCrossed,
    },
    {
      title: "24×7 Security",
      desc: "CCTV surveillance and secure environment.",
      icon: ShieldCheck,
    },
    {
      title: "Room Service",
      desc: "Fast and friendly room service available anytime.",
      icon: BellRing,
    },
    {
      title: "Air Conditioned",
      desc: "Modern AC rooms for maximum comfort.",
      icon: AirVent,
    },
    {
      title: "Smart TV",
      desc: "Enjoy entertainment with HD Smart TVs.",
      icon: Tv,
    },
    {
      title: "Fitness Area",
      desc: "Stay active with our modern fitness facilities.",
      icon: Dumbbell,
    },
  ];



  return (
    <section
      className="
      relative overflow-hidden
      bg-gradient-to-b
      from-[#fff7e6]
      via-[#fffdf8]
      to-[#fff2cf]
      py-20 lg:py-28
      "
    >


      <div className="
      mx-auto
      max-w-7xl
      px-5
      lg:px-8
      ">


        {/* TITLE */}

        <div className="
        mx-auto
        max-w-3xl
        text-center
        ">


          <span className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-yellow-200
          bg-white
          px-5
          py-2
          text-sm
          font-semibold
          uppercase
          tracking-[3px]
          text-yellow-800
          shadow-sm
          ">

            <span className="
            h-2
            w-2
            rounded-full
            bg-yellow-500
            " />

            Hotel Amenities

          </span>



          <h2 className="
          mt-6
          text-4xl
          font-black
          text-gray-900
          lg:text-5xl
          ">

            Everything You Need

            <span className="
            block
            bg-gradient-to-r
            from-yellow-600
            via-amber-500
            to-orange-500
            bg-clip-text
            text-transparent
            ">

              For A Perfect Stay

            </span>

          </h2>


          <p className="
          mt-6
          text-lg
          leading-8
          text-gray-600
          ">

            Premium facilities, warm hospitality, and thoughtful details designed to make every stay effortless and memorable.

          </p>


        </div>




        {/* DESKTOP */}

        <div className="
        mt-16
        hidden
        md:grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-4
        ">


          {
            amenities.map((item,index)=>{

              const Icon=item.icon;


              return (

                <div
                key={index}
                className="
                rounded-3xl
                border
                border-yellow-100
                bg-white
                p-8
                shadow-lg
                transition
                duration-300
                hover:-translate-y-2
                "
                >


                  <div className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-yellow-400
                  to-amber-500
                  text-white
                  ">

                    <Icon size={30}/>

                  </div>



                  <h3 className="
                  mt-6
                  text-xl
                  font-bold
                  text-gray-900
                  ">

                    {item.title}

                  </h3>


                  <p className="
                  mt-3
                  leading-7
                  text-gray-600
                  ">

                    {item.desc}

                  </p>


                </div>

              )

            })
          }


        </div>






        {/* MOBILE FINGER SWIPE ONLY */}


        <div className="
        mt-14
        md:hidden
        ">


          <div
          className="
          flex
          gap-5
          overflow-x-auto
          snap-x
          snap-mandatory
          scroll-smooth
          pb-5
          no-scrollbar
          "
          >


            {
              amenities.map((item,index)=>{


                const Icon=item.icon;


                return (

                  <div
                  key={index}
                  className="
                  w-[85%]
                  shrink-0
                  snap-center
                  "
                  >


                    <div className="
                    rounded-[28px]
                    border
                    border-yellow-100
                    bg-white
                    p-7
                    shadow-lg
                    ">


                      <div className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-yellow-400
                      to-orange-500
                      text-white
                      ">

                        <Icon size={26}/>

                      </div>



                      <h3 className="
                      mt-6
                      text-lg
                      font-bold
                      text-gray-900
                      ">

                        {item.title}

                      </h3>



                      <p className="
                      mt-3
                      leading-7
                      text-gray-600
                      ">

                        {item.desc}

                      </p>


                    </div>


                  </div>

                )


              })
            }


          </div>


        </div>



      </div>


    </section>
  );
}