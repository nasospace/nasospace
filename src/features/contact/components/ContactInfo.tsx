import { Link } from "react-router-dom";
import { Mail, MapPin, Clock, Instagram, ArrowRight } from "lucide-react";
import { Section } from "@/components/shared";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/config/routes";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@naso.co",
    href: "mailto:hello@naso.co",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@naso",
    href: siteConfig.social.instagram,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cairo, Egypt",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Usually within 24–48 hours",
  },
];

export function ContactInfo() {
  return (
    <Section>
      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
        {/* Contact methods */}
        <div>
          <MotionDiv>
            <h2 className="font-display text-2xl font-bold">Get in touch</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Reach out however feels right. We're real people and we actually reply.
            </p>
          </MotionDiv>

          <div className="mt-8 space-y-6">
            {contactMethods.map((m) => (
              <MotionDiv key={m.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
                  <m.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {m.label}
                  </p>
                  {m.href ? (
                    <a
                      href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="font-display text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {m.value}
                    </a>
                  ) : (
                    <p className="font-display text-sm font-medium">{m.value}</p>
                  )}
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* Inquiry CTA card */}
        <MotionDiv>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="font-groovy text-xl font-bold">
              Have something specific in mind?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If you're looking to book an experience, plan an event, or ask about a product — our inquiry form is the fastest way to get a detailed response.
            </p>
            <Button asChild className="mt-6 w-full" size="lg">
              <Link to={ROUTES.INQUIRIES}>
                Go to inquiries
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Quick note:</strong> We respond to
                every message within 1–2 business days. If it's urgent, DM us on
                Instagram — we're always around.
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </Section>
  );
}
