import AboutHero from "@/components/user/about/AboutHero";
import AboutIntro from "@/components/user/about/AboutIntro";
import WhyChooseUs from "@/components/user/about/WhyChooseUs";
import Facilities from "@/components/user/about/Facilities";
import Stats from "@/components/user/about/Stats";
import VisionMission from "@/components/user/about/VisionMission";


export default function About() {
  return (
    <main>
      <AboutHero />
      <AboutIntro />
      <WhyChooseUs />
      <Facilities />
      <Stats />
      <VisionMission />
     
    </main>
  );
}