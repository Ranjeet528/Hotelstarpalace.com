import Header from "@/components/user/layout/Header";
import Footer from "@/components/user/layout/Footer";

export const metadata = {
  title: "Hotel Star Palace - Best Hotel Booking Platform",
  description:
    "Book luxury hotel rooms at affordable prices. Easy, fast and secure hotel booking system.",
  keywords:
    "hotel booking, star palace, luxury rooms, hotel in india, book rooms online",
};

export default function UserLayout({ children }) {
  return (
    <>
      <Header />

      <main id="top" className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}