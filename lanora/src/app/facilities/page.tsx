"use client"

import { motion } from "framer-motion"
import { Zap, Droplets, Gauge, Shield } from "lucide-react"
import { RedLineAccent } from "../../components/abstract-shapes"
import { PortfolioRedirectModal } from "../../components/portfolio-redirect-modal"
import { useState } from "react"

export default function Facilities() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-h-26 flex items-center justify-center bg-card pt-20 pb-20 overflow-hidden">
        <div className="absolute top-27 right-80 w-22 h-22 border-2 border-accent opacity-20 rounded-full" />
        <div className="absolute top-15 right-80 w-42 h-42 border-2 border-accent opacity-20 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our <span className="text-accent">Facilities</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art infrastructure for superior electroplating
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Advanced <span className="text-accent">Infrastructure</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative h-96 cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src="/industrial-plating-equipment.jpg"
                alt="Plating equipment"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 border-4 border-accent rounded-lg"
              />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent opacity-20 rounded-lg" />
            </motion.div>

            {/* Right - Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-3xl font-bold text-foreground mb-6">Cutting-Edge Equipment</h3>
              <div className="space-y-4">
                {[
                  "Automated plating lines with precision control",
                  "Advanced filtration and water treatment systems",
                  "Temperature and pH monitoring systems",
                  "High-capacity power supply units",
                  "Waste management and recycling facilities",
                  "Quality testing laboratory",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Power Capacity", value: "500+ KW" },
              { icon: Droplets, title: "Tank Capacity", value: "50,000+ Liters" },
              { icon: Gauge, title: "Plating Speed", value: "Up to 100 µm/hr" },
              { icon: Shield, title: "Quality Control", value: "ISO Certified" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card p-8 rounded-lg border border-border text-center hover:border-accent transition-colors"
              >
                <item.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-2xl font-bold text-accent">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plating Process */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our <span className="text-accent">Process</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Preparation", description: "Surface cleaning and degreasing" },
              { step: "2", title: "Activation", description: "Chemical activation for better adhesion" },
              { step: "3", title: "Plating", description: "Electrochemical deposition process" },
              { step: "4", title: "Finishing", description: "Quality inspection and packaging" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
              >
                <div className="bg-background p-8 rounded-lg border border-border hover:border-accent transition-colors">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-6.5 h-1 bg-accent transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Automation & <span className="text-accent">Precision</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our automated systems ensure consistent quality and reduce human error. Real-time monitoring and
                feedback control guarantee optimal plating parameters.
              </p>
              <ul className="space-y-3">
                {[
                  "PLC-controlled plating lines",
                  "Real-time parameter monitoring",
                  "Automated thickness measurement",
                  "Data logging and traceability",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative h-96 cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent opacity-20 rounded-lg z-0" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent opacity-10 rounded-lg z-0" />
              <img
                src="/automated-plating-system.jpg"
                alt="Automated system"
                className="relative w-full h-full object-cover rounded-lg z-10 group-hover:scale-105 transition-transform duration-300 border-4 border-accent rounded-lg z-20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Redirect Modal */}
      <PortfolioRedirectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
