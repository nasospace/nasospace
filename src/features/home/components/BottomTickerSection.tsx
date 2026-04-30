import { MarqueeTicker } from "@/components/shared/RetroElements";

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
    <div className="border-t-4 border-foreground bg-foreground py-5 overflow-hidden">
      <MarqueeTicker speed={30}>
        {TICKER_WORDS.map((word) => (
          <span
            key={word}
            className="mx-6 font-groovy text-lg md:text-xl font-black uppercase tracking-[0.2em] text-white/10 hover:text-primary/40 transition-colors duration-300 cursor-default"
          >
            {word}
            <span className="mx-6 text-primary/20">✦</span>
          </span>
        ))}
      </MarqueeTicker>
    </div>
  );
}
