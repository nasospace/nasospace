import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the cursor
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Fast dot physics
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look for data-cursor attribute or infer from tags
      const cursorData = target.closest("[data-cursor]");
      const isClickable = target.closest("a, button, input, [role='button']");
      
      if (cursorData) {
        setIsHovering(true);
        setHoverText(cursorData.getAttribute("data-cursor") || "EXPLORE");
      } else if (isClickable) {
        setIsHovering(true);
        setHoverText("");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Disable custom cursor on smaller screens - moved to bottom to avoid hook count mismatch
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" && window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return null;
  }

  return (
    <>
      {/* Small dot that follows exactly */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: 12,
          translateY: 12,
        }}
      />
      
      {/* Larger trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary/20 backdrop-blur-sm overflow-hidden mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovering ? (hoverText ? 3.5 : 1.5) : 1,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {isHovering && hoverText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-groovy text-[4px] font-black uppercase text-foreground leading-none tracking-widest mix-blend-normal"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
