/**
 * ArchiveMarquee — Atmospheric scrolling text strip for the Experiences archive.
 * Creates visual rhythm between sections with an editorial, cinematic feel.
 */
import { motion } from "framer-motion";
import { Sparkle } from "@/components/shared/RetroElements";

interface ArchiveMarqueeProps {
  words?: string[];
  className?: string;
}

const DEFAULT_WORDS = [
  "SEALED",
  "UNLOCKED",
  "WAITING",
  "YOURS",
  "100 CHAPTERS",
  "ONE STORY",
  "REMEMBER THIS",
  "LIVE NOW",
];

export function ArchiveMarquee({ words = DEFAULT_WORDS, className }: ArchiveMarqueeProps) {
  return (
    <div className={`w-full overflow-hidden bg-foreground py-4 sm:py-5 ${className ?? ""}`}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        className="flex whitespace-nowrap items-center"
      >
        {/* Render 4x for seamless loop */}
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center mx-4 sm:mx-6 md:mx-8"
          >
            <span className="font-groovy text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-background/80">
              {word}
            </span>
            <Sparkle className="ml-4 sm:ml-6 md:ml-8 h-2.5 w-2.5 text-secondary/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * ArchiveMarqueeAlt — Reversed direction marquee for visual variety.
 */
export function ArchiveMarqueeAlt({ className }: { className?: string }) {
  const words = [
    "CRAFT YOUR STORY",
    "COLLECT MOMENTS",
    "UNLOCK MEMORIES",
    "CAIRO AWAITS",
    "BE CURIOUS",
    "FEEL EVERYTHING",
  ];

  return (
    <div className={`w-full overflow-hidden border-y border-foreground/10 py-3 sm:py-4 bg-muted/30 ${className ?? ""}`}>
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        className="flex whitespace-nowrap items-center"
      >
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center mx-4 sm:mx-6 md:mx-8"
          >
            <span className="font-body text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground/60">
              {word}
            </span>
            <span className="ml-4 sm:ml-6 md:ml-8 text-[10px] text-muted-foreground/30">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
