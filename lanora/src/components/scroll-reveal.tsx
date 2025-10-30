"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type React from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const variants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  }

  return (
    <motion.div
      ref={ref}
      initial={variants[direction].initial}
      animate={inView ? variants[direction].animate : variants[direction].initial}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
