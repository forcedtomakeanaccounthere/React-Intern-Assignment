"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Zap, Shield, Cog } from "lucide-react"
import { RedLineAccent } from "../components/abstract-shapes"
import { HoverCard } from "../components/hover-card"
import { StaggerContainer } from "../components/stagger-container"

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-background pt-20 pb-20">
        {/* Background shapes with animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 right-10 w-72 h-72 border-2 border-accent opacity-10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-20 left-10 w-96 h-96 border-2 border-accent opacity-5 rounded-lg"
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

              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Excellence in
                <span className="text-accent"> Electroplating</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
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
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 border-2 border-accent text-accent px-8 py-3 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Explore Services
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Image placeholder with red frame */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-96 lg:h-full min-h-96"
            >
              <div className="relative w-full h-full">
                <motion.img
                  src="/industrial-electroplating-facility.jpg"
                  alt="Electroplating facility"
                  className="w-full h-full object-cover rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute inset-0 border-4 border-accent rounded-lg"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent opacity-10 rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-card transition-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Core <span className="text-accent">Services</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Nickel Plating",
                description: "Corrosion-resistant nickel coating for enhanced durability and aesthetic appeal.",
              },
              {
                icon: Shield,
                title: "Chrome Plating",
                description: "Premium chrome finish for superior hardness and brilliant shine.",
              },
              {
                icon: Cog,
                title: "Zinc Plating",
                description: "Cost-effective zinc coating for excellent corrosion protection.",
              },
            ].map((service, index) => (
              <HoverCard key={index} className="bg-background p-8 rounded-lg border border-border group">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </HoverCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Transform Your Components?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact our team today for a consultation and discover how Lanora can meet your electroplating needs.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg"
              >
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
