"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        button, a, input, textarea, [role="button"] {
          cursor: none !important;
        }
      `}</style>

      {/* Large outer circle - follows cursor exactly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full border-2 border-foreground/20 dark:border-white/30"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "tween",
          duration: 0,
        }}
        style={{
          width: 40,
          height: 40,
          zIndex: 99999,
        }}
      />

      {/* Small inner circle - 40% size, wobbles/lags behind */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full bg-foreground/80 dark:bg-white/80"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
        style={{
          width: 16,
          height: 16,
          zIndex: 99999,
        }}
      />
    </>
  )
}
