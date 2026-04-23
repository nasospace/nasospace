import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickerBadge } from "@/components/shared/RetroElements";
import { fadeUp } from "@/lib/motion";
import { ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Share2 } from "lucide-react";
import { trackNaso } from "@/lib/analytics";

type Question = {
  id: number;
  text: string;
  options: { label: string; value: "chill" | "chaos" }[];
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Saturday 11 PM: What are you doing?",
    options: [
      { label: "Deep talks over coffee", value: "chill" },
      { label: "Screaming lyrics somewhere loud", value: "chaos" },
    ],
  },
  {
    id: 2,
    text: "Pick your aesthetic:",
    options: [
      { label: "Messy paint & natural light", value: "chill" },
      { label: "Neon lights & bass drops", value: "chaos" },
    ],
  },
];

const RESULTS = {
  chill: {
    title: "The Creative Introvert",
    description: "You thrive on deep connections and getting your hands dirty (with clay or paint, obviously).",
    recommendation: "Pottery & Chill",
  },
  chaos: {
    title: "The Main Character",
    description: "You're not looking for a night out; you're looking for a plot twist.",
    recommendation: "Cairo Jazz Night",
  },
  mixed: {
    title: "The Balanced Wildcard",
    description: "You can do both. Start with art, end with a party.",
    recommendation: "Street Art & Sunset Session",
  },
};

export function VibeQuizSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<("chill" | "chaos")[]>([]);
  const [copied, setCopied] = useState(false);

  const handleAnswer = (val: "chill" | "chaos") => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    if (newAnswers.length === 1) trackNaso("vibe_quiz_started");
    setCurrentStep((prev) => prev + 1);
    if (newAnswers.length === QUESTIONS.length) {
      const chillCount = newAnswers.filter((a) => a === "chill").length;
      const result = chillCount === 2 ? RESULTS.chill : chillCount === 0 ? RESULTS.chaos : RESULTS.mixed;
      trackNaso("vibe_quiz_completed", { result: result.title });
    }
  };

  const reset = () => {
    setAnswers([]);
    setCurrentStep(0);
    trackNaso("vibe_quiz_retake");
  };

  const getResult = () => {
    const chillCount = answers.filter((a) => a === "chill").length;
    if (chillCount === 2) return RESULTS.chill;
    if (chillCount === 0) return RESULTS.chaos;
    return RESULTS.mixed;
  };

  const handleShare = () => {
    const result = getResult();
    const text = `I just took the NASO vibe check and got "${result.title}". Sending this to the group chat so we can finally make plans. 🔗 https://naso.space`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    trackNaso("vibe_quiz_shared", { result: result.title });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-foreground py-section-lg text-background">
      <div className="absolute inset-0 naso-wavy-bg opacity-10" />

      <div className="container relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <StickerBadge variant="filled" className="bg-primary text-primary-foreground border-foreground shadow-retro-sm" rotate={-2}>
            Vibe Check
          </StickerBadge>
          <h2 className="mt-6 font-groovy text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-white tracking-tighter">
            What's your weekend personality?
          </h2>
        </motion.div>

        <div className="relative min-h-[350px] w-full rounded-3xl border-4 border-foreground bg-card p-6 sm:p-10 shadow-retro-lg text-foreground">
          <AnimatePresence mode="wait">
            {currentStep < QUESTIONS.length ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex h-full flex-col justify-center"
              >
                <span className="font-groovy text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  Question {currentStep + 1} of {QUESTIONS.length}
                </span>
                <h3 className="font-groovy text-2xl sm:text-3xl font-black mb-8 leading-tight">
                  {QUESTIONS[currentStep].text}
                </h3>
                <div className="flex flex-col gap-4">
                  {QUESTIONS[currentStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.value)}
                      className="group flex w-full items-center justify-between rounded-2xl border-[3px] border-foreground bg-white p-5 text-left transition-all duration-300 naso-ease hover:-translate-y-1 hover:shadow-retro active:translate-y-0 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                    >
                      <span className="font-groovy text-lg font-bold text-foreground">
                        {opt.label}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary opacity-0 transition-opacity group-hover:opacity-100 border-2 border-foreground">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex h-full flex-col items-center justify-center text-center"
              >
                <Sparkles className="h-12 w-12 text-primary mb-4 animate-pulse" />
                <h3 className="font-groovy text-3xl sm:text-4xl font-black mb-4">
                  {getResult().title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base max-w-sm mb-6">
                  {getResult().description}
                </p>
                <div className="rounded-2xl bg-secondary/20 border-2 border-foreground p-4 mb-8 w-full max-w-sm">
                  <p className="font-groovy text-xs font-bold uppercase tracking-widest text-primary mb-2">We recommend</p>
                  <p className="font-groovy text-lg font-black">{getResult().recommendation}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Link
                    to={ROUTES.EXPERIENCES}
                    className="flex-1 inline-flex h-12 items-center justify-center rounded-full border-[3px] border-foreground bg-primary px-6 font-groovy text-sm font-black uppercase tracking-widest text-primary-foreground shadow-retro-sm transition-all duration-300 hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    Book it
                  </Link>
                  <button
                    onClick={handleShare}
                    className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-full border-[3px] border-foreground bg-white px-6 font-groovy text-sm font-black uppercase tracking-widest text-foreground shadow-retro-sm transition-all duration-300 hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    {copied ? "Copied! 💅" : "Send to Group Chat"}
                    {!copied && <Share2 className="h-4 w-4" />}
                  </button>
                </div>
                <button onClick={reset} className="mt-6 text-xs text-muted-foreground hover:text-foreground font-bold underline underline-offset-4">
                  Retake quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
