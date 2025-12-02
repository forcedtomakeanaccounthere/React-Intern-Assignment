"use client"

import { motion } from "framer-motion"

export default function ProductHighlightsSection() {
  const highlights = [
    {
      stat: "300+",
      label: "Satisfied Clients",
    },
    {
      stat: "25+",
      label: "Years Experience",
    },
    {
      stat: "1000+",
      label: "Projects Completed",
    },
    {
      stat: "99%",
      label: "Quality Rate",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Proven Excellence & <span className="text-accent">Reliability</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trusted by leading automotive and manufacturing companies across the region for consistent quality and
            timely delivery.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-accent/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10">
                <motion.div className="text-3xl md:text-5xl font-bold text-accent mb-2">{item.stat}</motion.div>
                <p className="text-sm md:text-base text-muted-foreground">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
