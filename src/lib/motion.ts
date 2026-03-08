/**
 * NASO Motion Presets — Framer Motion variants.
 * Consistent, premium animation system for the brand.
 */
import type { Variants, Transition } from "framer-motion";

/* === Transitions === */
export const easeOut: Transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };
export const easeInOut: Transition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };
export const spring: Transition = { type: "spring", stiffness: 300, damping: 30 };

/* === Fade variants === */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeOut },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

/* === Scale variants === */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: easeOut },
};

/* === Stagger container === */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* === Slide variants === */
export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: "100%", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};
