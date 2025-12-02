"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-20 pb-20 overflow-hidden">
      {/* Background shapes with animation */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-8 right-8 w-60 h-60 border-2 border-accent opacity-20 rounded-full hidden md:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-20 left-8 w-76 h-76 border-2 border-accent opacity-10 rounded-r-3xl hidden md:block"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-semibold text-sm tracking-widest uppercase mb-4"
            >
              Premium Electroplating Solutions
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Excellence in
              <span className="text-accent"> Electroplating</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Lanora Electroplaters delivers high-quality plating services for automotive and manufacturing industries
              with state-of-the-art facilities and expert craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-accent text-accent px-8 py-2.5 font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Image with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 lg:h-full min-h-96"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <motion.img
                src="/industrial-electroplating-facility.jpg?height=600&width=500"
                alt="Electroplating facility"
                className="w-full h-full object-cover"
              />
              {/* Glass effect overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-transparent rounded-2xl border border-accent/20"
              />
              {/* Decorative elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-7 -right-6 w-32 h-32 bg-accent opacity-5 rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
