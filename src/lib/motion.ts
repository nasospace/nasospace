/**
 * NASO Motion Presets — Retro-Groovy Animation System
 * Rich, varied, creative motion for a poster-world homepage.
 */
import type { Variants, Transition } from "framer-motion";

/* === Transitions === */
export const easeOut: Transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };
export const easeInOut: Transition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };
export const spring: Transition = { type: "spring", stiffness: 300, damping: 30 };
export const springBouncy: Transition = { type: "spring", stiffness: 400, damping: 15 };

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

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { opacity: 1, scale: 1, transition: springBouncy },
};

/* === Rotate variants === */
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -12, scale: 0.8 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 18 } },
};

export const stickerPop = (delay = 0, rotate = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.2, rotate: rotate - 20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring", stiffness: 400, damping: 16, delay },
  },
});

/* === Wipe / reveal === */
export const wipeIn = (delay = 0): Variants => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
});

/* === Slide variants === */
export const slideInLeft: Variants = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const slideInRight: Variants = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: "100%", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

/* === Stagger containers === */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

/* === Card / poster entrance === */
export const posterEnter = (delay = 0, startRotate = -6): Variants => ({
  hidden: { opacity: 0, y: 50, rotate: startRotate },
  visible: {
    opacity: 1,
    y: 0,
    rotate: startRotate + 3,
    transition: { type: "spring", stiffness: 180, damping: 20, delay },
  },
});

/* === Character-by-character text reveal === */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
