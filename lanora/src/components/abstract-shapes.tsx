"use client"

import { motion } from "framer-motion"

export function RedSquareFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 border-4 border-accent rounded-lg"
    />
  )
}

export function RedAccentShape() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 0.8 }}
      className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent rounded-3xl"
    />
  )
}

export function FloatingShape() {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="absolute w-32 h-32 border-2 border-accent opacity-20 rounded-lg"
    />
  )
}

export function RedLineAccent() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="h-1 bg-accent origin-left"
    />
  )
}
