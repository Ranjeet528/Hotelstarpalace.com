import ContactHero from "@/components/user/contact/ContactHero";
import ContactInfo from "@/components/user/contact/ContactInfo";
import ContactForm from "@/components/user/contact/ContactForm";
import ContactMap from "@/components/user/contact/ContactMap";
import ContactFAQ from "@/components/user/contact/ContactFAQ";


export const metadata = {
  title: "Contact Us | Hotel Star Palace",
  description:
    "Get in touch with Hotel Star Palace for room bookings, inquiries, support, and directions.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <ContactInfo />

      <ContactForm />

      <ContactMap />

      <ContactFAQ />
    </>
  );
}