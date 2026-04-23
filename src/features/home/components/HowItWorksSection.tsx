import { motion } from "framer-motion";
import { StickerBadge } from "@/components/shared/RetroElements";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Search, Ticket, Users } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "The Discovery",
      description: "Explore curated chapters of Cairo designed around your energy.",
      color: "bg-primary",
    },
    {
      icon: Ticket,
      title: "The Commitment",
      description: "Commit to the moment. We handle the logistics; you focus on the presence.",
      color: "bg-naso-lilac",
    },
    {
      icon: Users,
      title: "The Memory",
      description: "Step into the space. Leave with something real—and someone new.",
      color: "bg-secondary",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-foreground py-section-lg text-background">
      <div className="absolute inset-0 naso-grid-bg opacity-10" />
      
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="mb-16">
            <StickerBadge variant="filled" className="bg-white text-foreground" rotate={2}>
              How it works
            </StickerBadge>
            <h2 className="mt-6 font-groovy text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-white">
              Effortless from click to Cairo.
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[3px] bg-white/20 z-0" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="relative z-10 flex flex-col items-center">
                  <div className={`flex h-24 w-24 items-center justify-center rounded-full border-4 border-foreground shadow-[6px_6px_0px_#000] ${step.color} mb-6 transition-transform hover:scale-110`}>
                    <Icon className="h-10 w-10 text-foreground" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground font-groovy font-black text-sm mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-groovy text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 max-w-[250px] text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
