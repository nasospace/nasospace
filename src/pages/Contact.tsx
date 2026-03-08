import { SEOHead } from "@/components/shared/SEOHead";
import { ContactHero, ContactInfo } from "@/features/contact";

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact"
        description="Get in touch with NASO — email, Instagram, TikTok, or send a quick message. Based in Cairo, we reply within 24–48 hours."
        canonical="https://naso.co/contact"
      />
      <ContactHero />
      <ContactInfo />
    </>
  );
}
