import { motion } from "framer-motion";

const TICKER_WORDS = [
  "MAKE",
  "CREATE",
  "CONNECT",
  "EXPLORE",
  "DISCOVER",
  "EXPERIENCE",
  "REMEMBER",
  "BELONG",
  "UNLOCK",
  "REPEAT",
];

export function BottomTickerSection() {
  return (
    <div className="border-t-4 border-foreground bg-foreground py-4 md:py-6 overflow-hidden flex flex-col gap-2">
      {/* Row 1: scrolling left */}
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          ease: "linear", 
          duration: 20, 
          repeat: Infinity 
        }}
        className="flex whitespace-nowrap"
      >
        {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
          <span
            key={`a-${word}-${i}`}
            className="flex items-center mx-6 md:mx-8 font-groovy text-lg md:text-2xl font-black uppercase tracking-[0.2em] text-white/10 hover:text-primary transition-colors duration-300 cursor-default"
          >
            {word}
            <span className="mx-6 md:mx-8 text-primary/30 text-2xl md:text-3xl">✦</span>
          </span>
        ))}
      </motion.div>
      {/* Row 2: scrolling right (counter-direction for depth) */}
      <motion.div 
        animate={{ x: ["-50%", "0%"] }}
        transition={{ 
          ease: "linear", 
          duration: 28, 
          repeat: Infinity 
        }}
        className="flex whitespace-nowrap"
      >
        {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
          <span
            key={`b-${word}-${i}`}
            className="flex items-center mx-6 md:mx-8 font-groovy text-lg md:text-2xl font-black uppercase tracking-[0.2em] text-white/[0.05] hover:text-secondary transition-colors duration-300 cursor-default"
          >
            {word}
            <span className="mx-6 md:mx-8 text-secondary/20 text-2xl md:text-3xl">★</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
