import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FlowerShape, StickerBadge } from "@/components/shared/RetroElements";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { trackNaso } from "@/lib/analytics";


export function BigCTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  return (
    <section className="relative overflow-hidden bg-naso-cream py-32 border-y-4 border-foreground">
      {/* Background textures */}
      <div className="absolute inset-0 naso-dotgrid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 naso-noise opacity-30 mix-blend-overlay pointer-events-none" />

      {/* Decorative Blobs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mx-auto max-w-3xl"
        >
          {/* The Card */}
          <motion.div
            variants={fadeUp}
            className="relative bg-white rounded-[2.5rem] border-4 border-foreground shadow-[12px_12px_0_hsl(var(--foreground))] p-10 sm:p-16 text-center overflow-hidden"
          >
            {/* Giant watermark */}
            <div className="absolute -right-10 -top-10 font-groovy text-[200px] font-black text-foreground/[0.02] leading-none select-none pointer-events-none rotate-12">
              ✉
            </div>

            {/* Binding dots */}
            <div className="absolute -left-3 top-16 w-6 h-6 bg-primary rounded-full border-4 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))]" />
            <div className="absolute -left-3 top-32 w-6 h-6 bg-secondary rounded-full border-4 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))]" />
            <div className="absolute -left-3 top-48 w-6 h-6 bg-accent rounded-full border-4 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))]" />

            <StickerBadge variant="filled" className="bg-foreground text-white mb-10 inline-flex" rotate={-3}>
              Priority Access
            </StickerBadge>

            <h2 className="font-groovy text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.85] tracking-tighter text-foreground mb-6">
              Join the <br />
              <span className="text-primary inline-block transform -rotate-1">inner circle.</span>
            </h2>

            <p className="text-lg md:text-xl text-foreground/70 font-medium max-w-md mx-auto mb-12 leading-relaxed">
              Our chapters sell out in minutes. Get on the drop list to hear about new unlocks before anyone else.
            </p>

            {/* Email Form */}
            <motion.form
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                if (status === "submitting" || status === "success") return;
                setStatus("submitting");

                const { error } = await supabase.from("drop_list").insert({
                  email,
                  source: "homepage_big_cta"
                });

                if (error && error.code !== "23505") {
                  console.error("Drop List Error:", error);
                  setStatus("idle");
                  return;
                }

                setStatus("success");
                trackNaso("drop_list_signup", { source: "homepage_big_cta" });
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address for early access"
                required
                disabled={status === "submitting" || status === "success"}
                className="flex-1 h-16 rounded-full border-4 border-foreground bg-naso-cream px-8 font-groovy text-base font-bold text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all shadow-[4px_4px_0_hsl(var(--foreground))] disabled:opacity-50"
              />
              {status === "success" ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="flex h-16 items-center justify-center rounded-full border-4 border-foreground px-8 bg-secondary font-groovy text-base font-black uppercase tracking-widest text-foreground whitespace-nowrap shadow-[4px_4px_0_hsl(var(--foreground))]"
                >
                  🎉 YOU'RE IN!
                </motion.div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group flex h-16 items-center justify-center gap-3 rounded-full border-4 border-foreground bg-primary px-10 font-groovy text-base font-black uppercase tracking-widest text-white shadow-[6px_6px_0_hsl(var(--foreground))] transition-all hover:-translate-y-1 hover:shadow-[10px_10px_0_hsl(var(--foreground))] active:translate-y-0 active:shadow-[2px_2px_0_hsl(var(--foreground))] whitespace-nowrap disabled:opacity-70"
                >
                  {status === "submitting" ? "Joining..." : "Get Access"}
                  {status !== "submitting" && <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />}
                </button>
              )}
            </motion.form>

            <p className="mt-6 text-xs font-groovy font-bold uppercase tracking-[0.2em] text-foreground/30">
              No spam. Just early access to drops.
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative */}
      <FlowerShape size={90} className="absolute bottom-10 left-10 text-naso-lilac/30 naso-flower-spin pointer-events-none hidden lg:block" />
    </section>
  );
}
