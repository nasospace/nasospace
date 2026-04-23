import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { FlowerShape, Sparkle } from "@/components/shared/RetroElements";
import { staggerContainer, fadeUp, popIn } from "@/lib/motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { trackNaso } from "@/lib/analytics";

export function BigCTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  return (
    <section className="relative overflow-hidden bg-primary py-section-lg text-primary-foreground">
      <div className="absolute inset-0 naso-dotgrid opacity-10" />
      <div className="absolute inset-0 naso-noise opacity-30" />

      <MotionDiv variants={popIn} className="absolute right-[10%] top-[15%] opacity-20 rotate-[15deg] hidden sm:block">
        <Sparkle className="h-14 w-14 text-primary-foreground" />
      </MotionDiv>
      <MotionDiv variants={popIn} className="absolute left-[8%] bottom-[20%] opacity-10 hidden sm:block">
        <FlowerShape size={70} className="text-primary-foreground naso-flower-spin" />
      </MotionDiv>

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center bg-card text-foreground rounded-3xl p-8 sm:p-12 border-4 border-foreground shadow-retro-lg"
        >
          <motion.div variants={fadeUp} className="mb-10 flex flex-col items-center gap-6">
            <div className="text-center">
              <StickerBadge variant="filled" className="bg-naso-lilac text-foreground mb-6" rotate={-2}>
                Priority Access
              </StickerBadge>
              <h2 className="font-groovy text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.9] tracking-tighter text-foreground">
                Access the <span className="text-primary">inner circle.</span>
              </h2>
              <p className="mt-6 text-lg font-medium text-muted-foreground">
                Our experiences disappear in minutes. Join the drop list to get there first.
              </p>
            </div>
          </motion.div>
          <motion.form
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={async (e) => {
              e.preventDefault();
              if (status === "submitting" || status === "success") return;
              setStatus("submitting");
              
              const { error } = await supabase.from("drop_list").insert({
                email,
                source: "homepage_big_cta"
              });

              if (error && error.code !== "23505") { // Ignore unique constraint for UX
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
              placeholder="Enter your email"
              aria-label="Email address for early access"
              required
              disabled={status === "submitting" || status === "success"}
              className="flex-1 h-14 rounded-full border-4 border-foreground bg-white px-6 font-groovy text-sm font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-secondary/50 transition-all shadow-retro-sm disabled:opacity-50"
            />
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
                transition={{ type: "spring", bounce: 0.6 }}
                className="flex h-14 items-center justify-center rounded-full border-4 border-foreground px-6 bg-[#B9EC84] font-groovy text-sm font-black uppercase tracking-widest text-foreground whitespace-nowrap"
                style={{ boxShadow: "5px 5px 0px black" }}
              >
                YOU'RE ON THE LIST!
              </motion.div>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full border-4 border-foreground bg-primary px-8 font-groovy text-sm font-black uppercase tracking-widest text-primary-foreground shadow-retro transition-all hover:-translate-y-1 hover:shadow-retro-lg active:translate-y-0 active:shadow-none whitespace-nowrap disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-retro"
              >
                {status === "submitting" ? "Joining..." : "Get Access"}
                {status !== "submitting" && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
              </button>
            )}
          </motion.form>
          <motion.p variants={fadeUp} className="mt-4 text-[10px] font-groovy font-bold uppercase tracking-widest text-muted-foreground/60">
            No spam. Just good vibes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
