import { SEOHead } from "@/components/shared/SEOHead";
import { motion } from "framer-motion";
import { StickerBadge } from "@/components/shared/RetroElements";

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <SEOHead title="Privacy Policy | NASO SPACE" description="How we handle your data in the NASO movement." />
      
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <StickerBadge variant="filled" className="bg-primary text-white mb-6" rotate={-2}>
            Legal Archive
          </StickerBadge>
          <h1 className="font-groovy text-5xl md:text-7xl font-black text-foreground leading-none tracking-tighter mb-8">
            Privacy <br />
            <span className="text-secondary italic">Policy.</span>
          </h1>
          <p className="text-xl text-foreground/60 font-medium">
            How we protect your identity within the movement.
          </p>
        </motion.div>

        <div className="prose prose-lg prose-naso max-w-none font-groovy text-foreground/80 leading-relaxed space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">01. Data Collection</h2>
            <p>
              We collect minimal data to keep the movement moving. This includes your email address when you join the "Drop List" and your basic contact information when booking a Chapter or purchasing an Artifact.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">02. Usage</h2>
            <p>
              Your data is used exclusively to notify you of newly unlocked Chapters, handle your orders, and provide the best creative experience possible. We don't sell, rent, or trade your personal information. Ever.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">03. The Vault</h2>
            <p>
              Your information is stored in our digital vault with industry-standard encryption. Only authorized NASO partners have access to ensure your experience is seamless.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">04. Your Rights</h2>
            <p>
              You can leave the movement at any time. Every email we send includes an unsubscribe link, and you can request your data be wiped from the archive by emailing nasoevents22@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
