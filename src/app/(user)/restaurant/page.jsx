import Hero from "@/components/user/restaurant/Hero";
import About from "@/components/user/restaurant/About";
import Features from "@/components/user/restaurant/Features";
import FoodCategories from "@/components/user/restaurant/FoodCategories";
import SignatureDishes from "@/components/user/restaurant/SignatureDishes";
import DiningExperience from "@/components/user/restaurant/DiningExperience";
import Gallery from "@/components/user/restaurant/Gallery";
import OpeningHours from "@/components/user/restaurant/OpeningHours";
import FAQ from "@/components/user/restaurant/FAQ";


export const metadata = {
  title: "Restaurant | Hotel Star Palace",
  description:
    "Enjoy delicious multi-cuisine dining at Hotel Star Palace. Experience authentic flavors, elegant ambience, and exceptional hospitality.",
};

export default function RestaurantPage() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <FoodCategories />
      <SignatureDishes />
      <DiningExperience />
      <Gallery />
      <OpeningHours />
      <FAQ />
     
    </>
  );
}