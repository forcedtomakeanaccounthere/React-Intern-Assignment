"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ParallaxImageSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Transform for text elements as you scroll
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.45], [0, 1, 1, 0])
  const textY1 = useTransform(scrollYProgress, [0, 0.15, 0.45], [100, 0, -100])

  const textOpacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.7, 0.8], [0, 1, 1, 0])
  const textY2 = useTransform(scrollYProgress, [0.35, 0.5, 0.8], [100, 0, -100])

  const textOpacity3 = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1])
  const textY3 = useTransform(scrollYProgress, [0.7, 0.85], [100, 0])

  // Stats counter animation
  const statsScale = useTransform(scrollYProgress, [0.35, 0.5], [0.8, 1])

  return (
    <>
      {/* Fixed Background Image - stays in place as you scroll */}
      <div className="fixed inset-0 w-full h-screen -z-10 pointer-events-none">
        <img
          src="/par.webp?height=1080&width=1920"
          alt="Industrial facility"
          className="w-full h-full object-cover"
        />
        {/* <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
            poster="/Space.mp4?height=1080&width=1920"
          ></video> */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Scroll container - this creates the scroll distance for the parallax effect */}
      <section ref={containerRef} className="relative" style={{ height: "350vh" }}>
        {/* First text block - appears and fades as you scroll */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
          <motion.div style={{ y: textY1, opacity: textOpacity1 }} className="text-center px-4 max-w-5xl mx-auto">
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl">
              Precision
              <span className="block text-accent mt-2">Engineering</span>
            </motion.h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
              Where cutting-edge technology meets master craftsmanship
            </p>
          </motion.div>
        </div>

        {/* Second text block - stats that appear mid-scroll */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
          <motion.div style={{ y: textY2, opacity: textOpacity2, scale: statsScale }} className="w-full px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
              {[
                { value: "500+", label: "KW Power Capacity" },
                { value: "50K+", label: "Liters Tank Capacity" },
                { value: "100μm", label: "Per Hour Speed" },
                { value: "ISO", label: "9001:2015 Certified" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center bg-black/40 backdrop-blur-md rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-xs sm:text-sm md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Third text block - stays visible at bottom */}
        <div className="sticky top-0 h-screen flex items-end pb-16 md:pb-24 justify-center pointer-events-none">
          <motion.div style={{ y: textY3, opacity: textOpacity3 }} className="text-center px-4">
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium drop-shadow-lg">
              State-of-the-Art Infrastructure
            </p>
            <p className="text-white/70 mt-2 text-sm md:text-base">Trusted by 300+ Industry Leaders</p>
          </motion.div>
        </div>
      </section>

      {/* Transition overlay - covers the fixed image as next section starts */}
      <div className="relative z-10 bg-background">
        <div className="h-24 md:h-32 bg-gradient-to-b from-transparent to-background" />
      </div>
      
      {/* Solid background to prevent image bleeding */}
      <div className="relative z-10 bg-background h-4" />
    </>
  )
}
