"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { RedLineAccent } from "../../components/abstract-shapes"

export default function About() {
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
              About <span className="text-accent">Lanora</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pioneering electroplating excellence since 1995
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image with red frame */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <img
                src="/company-team-meeting.jpg"
                alt="Lanora team"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 border-4 border-accent rounded-lg" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent opacity-10 rounded-lg" />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our <span className="text-accent">Mission</span>
              </h2>
              <RedLineAccent />

              <p className="text-lg text-muted-foreground mb-6 mt-6">
                At Lanora Electroplaters, we are committed to delivering exceptional electroplating services that exceed
                industry standards. Our mission is to provide reliable, high-quality plating solutions that enhance the
                durability and performance of our clients' products.
              </p>

              <div className="space-y-4">
                {[
                  "ISO 9001:2015 Certified",
                  "30+ Years of Industry Experience",
                  "State-of-the-art Facilities",
                  "Expert Technical Team",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications & Achievements */}
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
              Certifications & <span className="text-accent">Awards</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "ISO 9001:2015", description: "Quality Management System" },
              { title: "ISO 14001:2015", description: "Environmental Management" },
              { title: "OHSAS 18001", description: "Occupational Health & Safety" },
              { title: "Industry Leader", description: "Best Plating Services 2024" },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-lg border border-border text-center hover:border-accent transition-colors"
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent-foreground font-bold">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{cert.title}</h3>
                <p className="text-muted-foreground text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose <span className="text-accent">Lanora</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Assurance",
                description: "Rigorous testing and quality control at every stage of the plating process.",
              },
              {
                title: "Technical Expertise",
                description: "Experienced team with deep knowledge of electroplating chemistry and processes.",
              },
              {
                title: "Timely Delivery",
                description: "Efficient operations ensure your projects are completed on schedule.",
              },
              {
                title: "Cost Effective",
                description: "Competitive pricing without compromising on quality or service.",
              },
              {
                title: "Environmental Care",
                description: "Sustainable practices and proper waste management protocols.",
              },
              {
                title: "Customer Support",
                description: "Dedicated support team available for consultations and technical guidance.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors group"
              >
                <div className="w-10 h-10 bg-accent rounded-lg mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
