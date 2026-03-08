import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type MotionDivProps = HTMLMotionProps<"div">;

/**
 * MotionDiv — pre-configured animated div with sensible defaults.
 * Uses fadeUp by default, override with `variants` or individual props.
 */
export function MotionDiv({ variants = fadeUp, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      variants={variants}
      {...props}
    />
  );
}