import { SEOHead } from "@/components/shared/SEOHead";
import { ContactHero, ContactInfo } from "@/features/contact";
import { usePageContent, getSection } from "@/hooks/usePageContent";

interface ContactHeroContent { headline: string; subline: string }

export default function ContactPage() {
  const { data: sections } = usePageContent("contact");
  const hero = getSection<ContactHeroContent>(sections, "hero");

  return (
    <>
      <SEOHead
        title="Contact NASO — Get in Touch"
        description="Get in touch with NASO — email, Instagram, TikTok, or send a quick message. Based in Cairo, we reply within 24–48 hours."
        canonical="/contact"
      />
      <ContactHero headline={hero?.headline} subline={hero?.subline} />
      <ContactInfo />
    </>
  );
}
