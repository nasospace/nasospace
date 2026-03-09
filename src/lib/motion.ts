/**
 * NASO Motion Presets — Retro-Groovy Animation System v2
 * Single source of truth for all animation variants and transitions.
 * Elevated with smoother easing, better section reveals, and richer card interactions.
 */
import type { Variants, Transition } from "framer-motion";

/* ═══ Shared Easing ═══ */
export const nasoEase = [0.16, 1, 0.3, 1] as const;
export const nasoEaseOut = [0.22, 1, 0.36, 1] as const;
export const nasoEaseSmooth = [0.25, 0.46, 0.45, 0.94] as const;

/* ═══ Transitions ═══ */
export const easeOut: Transition = { duration: 0.6, ease: nasoEaseOut };
export const easeInOut: Transition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };
export const spring: Transition = { type: "spring", stiffness: 260, damping: 26 };
export const springBouncy: Transition = { type: "spring", stiffness: 400, damping: 15 };
export const springGentle: Transition = { type: "spring", stiffness: 120, damping: 20 };

/* ═══ Fade Variants ═══ */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeOut },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: nasoEaseOut } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

/* ═══ Delayed fadeUp factory ═══ */
export const fadeUpDelay = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: nasoEaseOut, delay } },
});

/* ═══ Scale Variants ═══ */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: nasoEaseOut } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { opacity: 1, scale: 1, transition: springBouncy },
};

/* ═══ Rotate Variants ═══ */
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -12, scale: 0.8 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 18 } },
};

/* ═══ Sticker / Badge Drop ═══ */
export const stickerPop = (delay = 0, rotate = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.2, rotate: rotate - 20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring", stiffness: 400, damping: 16, delay },
  },
});

export const stickerDrop = (delay = 0, rotate = 0): Variants => ({
  hidden: { opacity: 0, scale: 0, rotate: rotate - 30, y: -60 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate,
    y: 0,
    transition: { type: "spring", stiffness: 340, damping: 12, delay },
  },
});

/* ═══ Wipe / Reveal ═══ */
export const wipeIn = (delay = 0): Variants => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: nasoEase, delay } },
});

export const wipeRight = (delay = 0): Variants => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: nasoEase, delay } },
});

/* ═══ Slide Variants ═══ */
export const slideInLeft: Variants = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: nasoEaseOut } },
};

export const slideInRight: Variants = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: nasoEaseOut } },
  exit: { x: "100%", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

/* ═══ Character Reveal ═══ */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const charRevealDelay = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 80, rotateX: 40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: nasoEaseOut, delay },
  },
});

/* ═══ Stagger Containers ═══ */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

export const staggerHero: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ═══ Card / Poster Entrance ═══ */
export const posterEnter = (delay = 0, startRotate = -6): Variants => ({
  hidden: { opacity: 0, y: 50, rotate: startRotate },
  visible: {
    opacity: 1,
    y: 0,
    rotate: startRotate + 3,
    transition: { type: "spring", stiffness: 150, damping: 20, delay },
  },
});

export const posterEnterHero = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 80, rotate: -12, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: -4,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16, delay },
  },
});

/* ═══ Section Reveal — premium scroll entrance ═══ */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: nasoEaseOut },
  },
};

/* ═══ Card hover presets (use with whileHover) ═══ */
export const cardHover = {
  lift: { y: -6, transition: spring },
  tilt: { y: -4, rotate: 1, transition: spring },
  tiltAlt: { y: -4, rotate: -1, transition: spring },
  scale: { scale: 1.03, transition: spring },
  liftScale: { y: -4, scale: 1.02, transition: spring },
};
