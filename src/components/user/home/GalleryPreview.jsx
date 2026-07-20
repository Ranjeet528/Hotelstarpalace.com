"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";

export default function GalleryPreview() {

  const images = [
    "/hotel-hero.png",
    "/hotel-hero.png",
    "/hotel-hero.png",
    "/hotel-hero.png",
    "/hotel-hero.png",
  
  ];


  return (

    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-5 lg:px-8">


        {/* Header */}

        <div className="text-center mb-16">


          <div className="
            inline-flex items-center gap-2
            px-6 py-2
            rounded-full
            bg-yellow-50
            text-yellow-600
            text-sm
            font-semibold
            tracking-[3px]
            uppercase
          ">
            <Camera size={18}/>
            Gallery
          </div>



          <h2 className="
            mt-6
            text-4xl md:text-6xl
            font-serif
            font-bold
            text-gray-900
          ">

            Experience The

            <span className="text-yellow-500">
              {" "}Luxury
            </span>

          </h2>



          <p className="
            mt-5
            max-w-2xl
            mx-auto
            text-gray-600
            text-lg
          ">
            Discover the beautiful moments,
            elegant rooms and royal hospitality
            of Hotel Star Palace.
          </p>


        </div>




        {/* Luxury Gallery */}


        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-6
          auto-rows-[260px]
        ">


          {/* Big Image */}

          <GalleryCard
            image={images[0]}
            className="md:col-span-2 md:row-span-2"
          />



          {/* Right Top */}

          <GalleryCard
            image={images[1]}
          />


          <GalleryCard
            image={images[2]}
          />



          {/* Bottom */}

          <GalleryCard
            image={images[3]}
          />


          <GalleryCard
            image={images[4]}
          />


        </div>





        {/* Button */}

       


      </div>


    </section>

  );
}





function GalleryCard({image,className=""}){


return (

<div
className={`
relative
overflow-hidden
rounded-[32px]
group
shadow-xl
${className}
`}
>


<Image

src={image}

alt="Hotel Gallery"

fill

quality={100}

sizes="100vw"

className="
object-cover
transition-all
duration-700
group-hover:scale-110
"

/>



{/* Overlay */}

<div
className="
absolute inset-0
bg-gradient-to-t
from-black/70
via-black/10
to-transparent
opacity-0
group-hover:opacity-100
transition
"
/>



{/* Hover Icon */}

<div
className="
absolute
inset-0
flex
items-center
justify-center
opacity-0
group-hover:opacity-100
transition
"
>

<div
className="
h-14
w-14
rounded-full
bg-white/90
flex
items-center
justify-center
text-yellow-600
"
>

<Camera size={25}/>

</div>


</div>


</div>

)

}