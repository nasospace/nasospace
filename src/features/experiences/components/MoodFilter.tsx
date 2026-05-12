/**
 * MoodFilter — Emotional category system for experiences.
 * 
 * Instead of boring labels like "art" or "cooking", we use emotional moods:
 * "Express", "Shape", "Color", "Taste", "Feel", "Make", "Reflect", "Build"
 * 
 * Each mood maps to an existing ExperienceCategory but presents with
 * an emotional, human-first vocabulary.
 */
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerFast, fadeUp } from "@/lib/motion";
import { EXPERIENCE_CATEGORIES, type ExperienceCategory } from "../types";

interface MoodFilterProps {
  active: ExperienceCategory | "all";
  onChange: (category: ExperienceCategory | "all") => void;
}

export interface MoodMeta {
  label: string;
  emoji: string;
  tagline: string;
  color: string;
  textColor: string;
  glowColor: string;
  maps: ExperienceCategory;
}

export const MOOD_META: Record<string, MoodMeta> = {
  express:  { label: "Express",  emoji: "🎨", tagline: "Let it out",       color: "bg-naso-lilac",  textColor: "text-foreground", glowColor: "hsl(var(--naso-lilac))",  maps: "art" },
  shape:    { label: "Shape",    emoji: "🏺", tagline: "Get your hands dirty", color: "bg-naso-coral",  textColor: "text-foreground", glowColor: "hsl(var(--naso-coral))",  maps: "pottery" },
  color:    { label: "Color",    emoji: "🖌️", tagline: "Paint your mood", color: "bg-naso-pink",   textColor: "text-foreground", glowColor: "hsl(var(--naso-pink))",   maps: "painting" },
  taste:    { label: "Taste",    emoji: "🍳", tagline: "Feed your soul",  color: "bg-naso-lemon",  textColor: "text-foreground", glowColor: "hsl(var(--naso-lemon))",  maps: "cooking" },
  feel:     { label: "Feel",     emoji: "🎵", tagline: "Find the rhythm", color: "bg-naso-purple", textColor: "text-primary-foreground", glowColor: "hsl(var(--naso-purple))", maps: "music" },
  make:     { label: "Make",     emoji: "✂️", tagline: "Create something", color: "bg-secondary",   textColor: "text-secondary-foreground", glowColor: "hsl(var(--secondary))", maps: "craft" },
  reflect:  { label: "Reflect",  emoji: "📓", tagline: "Look inward",     color: "bg-naso-cream",  textColor: "text-foreground", glowColor: "hsl(var(--naso-cream))",  maps: "journaling" },
  build:    { label: "Build",    emoji: "🔧", tagline: "Make it real",    color: "bg-primary",     textColor: "text-primary-foreground", glowColor: "hsl(var(--primary))", maps: "diy" },
};

const allOption = {
  label: "All moods",
  emoji: "✦",
  tagline: "Show everything",
  color: "bg-foreground",
  textColor: "text-background",
};

export function MoodFilter({ active, onChange }: MoodFilterProps) {
  const moodKeys = Object.keys(MOOD_META);

  return (
    <div className="mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h3 className="font-groovy text-2xl sm:text-3xl font-black tracking-tight">
          What are you feeling?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a mood. We'll match you with the right experience.
        </p>
      </motion.div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-2.5 sm:gap-3"
      >
        {/* "All" button */}
        <motion.button
          variants={fadeUp}
          onClick={() => onChange("all")}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={cn(
            "group relative flex items-center gap-2 overflow-hidden rounded-full border-2 px-4 sm:px-5 py-2.5 sm:py-3",
            "font-groovy text-xs sm:text-sm font-bold uppercase tracking-widest",
            "transition-all duration-300",
            active === "all"
              ? cn(allOption.color, allOption.textColor, "border-foreground shadow-retro")
              : "bg-card text-foreground border-foreground/20 hover:border-foreground/50 hover:shadow-retro-sm"
          )}
        >
          <span className="text-base sm:text-lg">{allOption.emoji}</span>
          <span>{allOption.label}</span>
        </motion.button>

        {/* Mood buttons */}
        {moodKeys.map((key, i) => {
          const mood = MOOD_META[key];
          const isActive = active === mood.maps;

          return (
            <motion.button
              key={key}
              variants={fadeUp}
              onClick={() => onChange(mood.maps)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "group relative flex items-center gap-2 overflow-hidden rounded-full border-2 px-4 sm:px-5 py-2.5 sm:py-3",
                "font-groovy text-xs sm:text-sm font-bold uppercase tracking-widest",
                "transition-all duration-300",
                isActive
                  ? cn(mood.color, mood.textColor, "border-foreground shadow-retro")
                  : "bg-card text-foreground border-foreground/20 hover:border-foreground/50 hover:shadow-retro-sm"
              )}
            >
              <span className="text-base sm:text-lg">{mood.emoji}</span>
              <span>{mood.label}</span>
              {/* Tagline reveal on hover */}
              <span className={cn(
                "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap",
                "rounded-lg bg-foreground text-background px-3 py-1.5",
                "font-body text-[10px] font-medium normal-case tracking-normal",
                "opacity-0 group-hover:opacity-100 transition-all duration-200",
                "pointer-events-none shadow-lg",
                "-translate-y-1 group-hover:translate-y-0",
              )}>
                {mood.tagline}
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-2 h-2 rotate-45 bg-foreground" />
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
