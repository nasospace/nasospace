import { SEOHead } from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import { StickerBadge } from "@/components/shared/RetroElements";

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <SEOHead title="Terms of Service | NASO SPACE" description="The guidelines for the NASO community and movement." />
      
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <StickerBadge variant="filled" className="bg-secondary text-foreground mb-6" rotate={2}>
            Community Code
          </StickerBadge>
          <h1 className="font-groovy text-5xl md:text-7xl font-black text-foreground leading-none tracking-tighter mb-8">
            Terms of <br />
            <span className="text-primary italic">Service.</span>
          </h1>
          <p className="text-xl text-foreground/60 font-medium">
            The rules of engagement for the 100 Chapters.
          </p>
        </motion.div>

        <div className="prose prose-lg prose-naso max-w-none font-groovy text-foreground/80 leading-relaxed space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">01. Bookings & Chapters</h2>
            <p>
              NASO Chapters are unrepeatable experiences. Due to their limited and exclusive nature, all bookings are final. We do not offer refunds, but you are welcome to transfer your spot to another community member if you notify us 48 hours in advance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">02. Artifacts & Kits</h2>
            <p>
              Physical artifacts (DIY Kits and merch) are shipped with care. If your item arrives damaged or incomplete, contact nasoevents22@gmail.com within 48 hours for a replacement. All sales are otherwise final.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">03. Community Respect</h2>
            <p>
              NASO is a safe space for creativity. Any behavior during a Chapter that is deemed disrespectful, harmful, or exclusionary will result in immediate removal from the experience and a permanent ban from the movement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">04. Liability</h2>
            <p>
              By participating in a NASO Chapter, you acknowledge that you are responsible for your own safety and actions. NASO SPACE and its partners are not liable for any personal injury or loss of property during workshops or outings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
