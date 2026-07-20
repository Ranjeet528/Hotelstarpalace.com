import BookingCard from "@/components/user/rooms/BookingCard";
import RoomAmenities from "@/components/user/rooms/RoomAmenities";
import RoomGallery from "@/components/user/rooms/RoomGallery";
import RoomInfo from "@/components/user/rooms/RoomInfo";
import RoomPolicies from "@/components/user/rooms/RoomPolicies";
import RoomReviews from "@/components/user/reviews/RoomReviews";
import SimilarRooms from "@/components/user/rooms/SimilarRooms";
import { notFound } from "next/navigation";



async function getRoom(id) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`,
    {
      cache: "no-store",
    }
  );


  if (!res.ok) {

    return null;

  }


  const data = await res.json();

  return data.room;

}





async function getRooms() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
    {
      cache: "no-store",
    }
  );


  if (!res.ok) {

    return [];

  }


  const data = await res.json();

  return data.rooms;

}

async function getSettings() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/settings`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {

    return null;

  }

  const data = await res.json();

  return data.settings;

}





// User completed booking check

async function getUserBooking(roomId) {

  try {


    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/bookings/my-bookings`,

      {
        cache:"no-store",
      }

    );


    if(!res.ok){

      return null;

    }
    const data = await res.json();

    const booking = data.bookings?.find(

      (item)=>

        item.roomId === roomId &&

        item.status === "completed"

    );

    return booking || null;

  }

  catch(error){

    console.log(
      "Booking Fetch Error:",
      error
    );

    return null;

  }


}

export default async function RoomPage({ params }) {

  const { id } = await params;

  const room = await getRoom(id);

  if (!room) {

    notFound();

  }

  const rooms = await getRooms();
  const settings = await getSettings();

  const booking = await getUserBooking(
    room._id
  );
  return (

    <main>

      <RoomGallery room={room} />

      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="grid gap-10 lg:grid-cols-3">

         <div className="order-2 lg:order-1 lg:col-span-2">

            <RoomInfo room={room} />

            <RoomAmenities room={room} />

            <RoomPolicies room={room} settings={settings} />

            {/* Reviews */}

            <RoomReviews

              roomId={room._id}

              bookingId={
                booking?._id
              }

              customerName={
                booking?.customerName
              }

            />

          </div>

          <div className="order-1 lg:order-2">

  <BookingCard
    room={room}
    settings={settings}
  />

</div>

        </div>


      </section>

      <SimilarRooms

        rooms={rooms}

        currentRoomId={room._id}

      />
  


    </main>

  );

}