"use client"

import { motion } from "framer-motion"
import { RedLineAccent } from "../../components/abstract-shapes"

export default function Services() {
  const services = [
    {
      title: "Nickel Plating",
      description: "High-quality nickel coating for corrosion resistance and aesthetic appeal.",
      features: ["Bright nickel finish", "Matte nickel option", "Uniform thickness", "Excellent adhesion"],
      applications: "Automotive parts, hardware, decorative items",
    },
    {
      title: "Chrome Plating",
      description: "Premium chrome finish for superior hardness and brilliant shine.",
      features: ["Hard chrome coating", "Decorative chrome", "High wear resistance", "Mirror-like finish"],
      applications: "Bumpers, trim, tools, industrial components",
    },
    {
      title: "Zinc Plating",
      description: "Cost-effective zinc coating for excellent corrosion protection.",
      features: ["Yellow zinc", "White zinc", "Blue zinc", "Trivalent zinc"],
      applications: "Fasteners, automotive parts, industrial hardware",
    },
    {
      title: "Copper Plating",
      description: "Copper coating for improved conductivity and corrosion resistance.",
      features: ["Pure copper", "Excellent conductivity", "Good adhesion", "Uniform deposition"],
      applications: "Electronics, PCBs, decorative applications",
    },
    {
      title: "Multi-layer Plating",
      description: "Combination of different metals for enhanced performance.",
      features: ["Nickel-chrome", "Copper-nickel", "Custom combinations", "Optimized thickness"],
      applications: "High-performance components, specialized applications",
    },
    {
      title: "Specialized Coatings",
      description: "Custom plating solutions for unique requirements.",
      features: ["Tin plating", "Gold plating", "Silver plating", "Custom alloys"],
      applications: "Electronics, jewelry, specialized industrial use",
    },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-96 flex items-center justify-center bg-card pt-20 pb-20">
        <div className="absolute top-20 right-10 w-72 h-72 border-2 border-accent opacity-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive electroplating solutions for every industry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Plating <span className="text-accent">Solutions</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-accent rounded-lg mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Applications:</span> {service.applications}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Quality <span className="text-accent">Standards</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Testing & Inspection",
                items: [
                  "Thickness measurement (X-ray fluorescence)",
                  "Adhesion testing",
                  "Salt spray testing",
                  "Hardness testing",
                  "Visual inspection",
                ],
              },
              {
                title: "Compliance",
                items: [
                  "ISO 9001:2015 certified",
                  "ASTM standards compliance",
                  "RoHS compliant",
                  "REACH compliant",
                  "Environmental regulations",
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-lg border border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
