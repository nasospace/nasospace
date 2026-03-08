import type { FAQCategory } from "./types";

export const faqCategories: FAQCategory[] = [
  {
    id: "booking",
    label: "Booking & Inquiries",
    emoji: "📬",
    items: [
      {
        question: "How do I book an experience or workshop?",
        answer:
          "Browse our Experiences or Workshops pages, pick the one you love, and hit 'Inquire.' You'll fill out a short form and our team will confirm availability and next steps within 24–48 hours.",
      },
      {
        question: "Can I book for a group?",
        answer:
          "Absolutely! Just mention your group size in the inquiry form. Most experiences accommodate groups of 2–20, and we can customize larger gatherings as private events.",
      },
      {
        question: "How will I hear back after submitting an inquiry?",
        answer:
          "We'll reach out via email (or WhatsApp if you prefer) within 1–2 business days with all the details, pricing, and next steps.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Payment",
    emoji: "💰",
    items: [
      {
        question: "How much do NASO experiences cost?",
        answer:
          "Pricing varies by experience type, group size, and customization level. We share clear pricing in our inquiry response — no hidden fees, no surprises.",
      },
      {
        question: "Do you require a deposit?",
        answer:
          "For most bookings we ask for a small deposit to secure your spot. Full details are shared when we confirm your reservation.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We currently accept bank transfer, Instapay, and cash on the day. Online card payments are coming soon.",
      },
    ],
  },
  {
    id: "experiences",
    label: "Experiences & Workshops",
    emoji: "🌿",
    items: [
      {
        question: "What kind of experiences does NASO offer?",
        answer:
          "Everything from outdoor adventures and cultural excursions to food tours, art walks, and wellness retreats — all designed and curated in Cairo.",
      },
      {
        question: "Are workshops beginner-friendly?",
        answer:
          "Yes! Our workshops are designed for all skill levels. Whether it's your first time with clay or your hundredth painting, you'll feel welcome.",
      },
      {
        question: "Can I gift an experience to someone?",
        answer:
          "We love that idea. Reach out via our contact page and we'll help you set up a gift booking with a personalized touch.",
      },
    ],
  },
  {
    id: "events",
    label: "Private & Corporate Events",
    emoji: "🎉",
    items: [
      {
        question: "Can NASO plan a private event for me?",
        answer:
          "Yes — birthdays, proposals, friend gatherings, you name it. Submit a Custom Event inquiry and tell us your vision. We'll handle the rest.",
      },
      {
        question: "Do you do corporate team-building?",
        answer:
          "We do! NASO corporate experiences are designed to feel nothing like a boring offsite. Think creative workshops, outdoor challenges, and curated group activities.",
      },
      {
        question: "How far in advance should I book a private event?",
        answer:
          "We recommend at least 2–3 weeks for standard events and 4–6 weeks for larger or highly customized ones.",
      },
    ],
  },
  {
    id: "shop",
    label: "Shop & Products",
    emoji: "🛍️",
    items: [
      {
        question: "What kind of products does NASO sell?",
        answer:
          "Original NASO-designed merch, creative kits, prints, and curated goods — things that carry the NASO spirit home with you.",
      },
      {
        question: "Do you ship outside Cairo?",
        answer:
          "Currently we ship across Egypt. International shipping is on the roadmap — stay tuned.",
      },
    ],
  },
  {
    id: "general",
    label: "General",
    emoji: "💬",
    items: [
      {
        question: "Where is NASO based?",
        answer:
          "We're proudly based in Cairo, Egypt. Our experiences span the city and beyond — from Downtown to the desert.",
      },
      {
        question: "Can I collaborate with NASO?",
        answer:
          "We're always open to creative collaborations — artists, brands, venues, makers. Drop us a line through our contact page.",
      },
      {
        question: "Is NASO on social media?",
        answer:
          "Yes! Follow us on Instagram and TikTok for behind-the-scenes content, upcoming events, and daily creative inspiration.",
      },
    ],
  },
];
