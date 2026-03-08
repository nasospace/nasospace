import { MarqueeTicker } from "@/components/shared/RetroElements";
import { bottomTickerWords } from "@/features/home/data";

export function BottomTickerSection() {
  return (
    <div className="border-t-[2.5px] border-foreground bg-background py-3.5">
      <MarqueeTicker speed={35}>
        {bottomTickerWords.map((word) => (
          <span
            key={word}
            className="mx-8 font-groovy text-sm font-bold uppercase tracking-[0.15em] text-foreground/20"
          >
            {word}
            <span className="mx-8 text-foreground/10">✦</span>
          </span>
        ))}
      </MarqueeTicker>
    </div>
  );
}
