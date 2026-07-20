import Hero from "@/components/user/home/Hero";
import BookingBar from "@/components/user/home/BookingBar";
import Features from "@/components/user/home/Features";
import FeaturedRooms from "@/components/user/home/FeaturedRooms";
import RestaurantPreview from "@/components/user/home/RestaurantPreview";
import Amenities from "@/components/user/home/Amenities";
import PrimeLocation from "@/components/user/home/PrimeLocation";
import GalleryPreview from "@/components/user/home/GalleryPreview";
import Testimonials from "@/components/user/home/Testimonials";



export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Booking Bar */}
      <BookingBar />
      <PrimeLocation/>

      {/* Why Choose Us */}
      <Features />

      {/* Featured Rooms */}
      <FeaturedRooms />

      {/* Restaurant Preview */}
      <RestaurantPreview />
      <GalleryPreview/>

      {/* Hotel Amenities */}
      <Amenities />
      <Testimonials/>
      
    </>
  );
}