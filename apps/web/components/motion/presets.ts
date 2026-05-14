import type { Variants } from "framer-motion"

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

/** Gentle continuous float — use with `animate` prop, not `variants`. */
export const float = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
}

/** Slower, wider float for larger elements. */
export const floatSlow = {
  y: [0, -12, 0],
  transition: {
    duration: 5.5,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
}

/** Subtle breathing / pulse scale effect. */
export const pulse = {
  scale: [1, 1.04, 1],
  transition: {
    duration: 2.8,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
}

/** Gentle horizontal sway. */
export const sway = {
  x: [0, 6, 0, -6, 0],
  transition: {
    duration: 6,
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
}

/** Shimmer — slides a highlight across. Good for badges/pills. */
export const shimmer: Variants = {
  hidden: { backgroundPosition: "200% 0" },
  show: {
    backgroundPosition: "-200% 0",
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    },
  },
}
