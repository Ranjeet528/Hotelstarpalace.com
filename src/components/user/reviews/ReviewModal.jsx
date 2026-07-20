"use client";

import { X } from "lucide-react";
import ReviewForm from "./ReviewForm";


export default function ReviewModal({

  open,

  onClose,

  roomId,

  onSuccess,

}) {


  if (!open) return null;



  return (

    <div

      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"

    >



      {/* Modal */}

      <div

        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"

      >



        {/* Close Button */}

        <button

          onClick={onClose}

          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"

        >

          <X size={22}/>

        </button>





        {/* Review Form */}

        <ReviewForm


          roomId={roomId}



          onSuccess={(data)=>{


            if(onSuccess){

              onSuccess(data);

            }


            onClose();


          }}


        />



      </div>



    </div>

  );

}