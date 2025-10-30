"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { RedLineAccent } from "../../components/abstract-shapes"

export default function Clients() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "AutoTech Industries",
      role: "Production Manager",
      content:
        "Lanora's electroplating services have significantly improved our component quality. Their attention to detail and timely delivery is exceptional.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      company: "Precision Manufacturing",
      role: "Quality Head",
      content:
        "We've been working with Lanora for 5 years. Their consistency and professional approach make them our preferred plating partner.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      company: "Industrial Solutions Ltd",
      role: "Procurement Director",
      content:
        "Excellent service, competitive pricing, and reliable delivery. Lanora understands our requirements perfectly.",
      rating: 5,
    },
    {
      name: "Deepak Singh",
      company: "Automotive Components Co.",
      role: "Technical Lead",
      content:
        "The technical expertise of Lanora's team is outstanding. They provide valuable suggestions for process optimization.",
      rating: 5,
    },
  ]

  const clients = [
    "Maruti Suzuki",
    "Hyundai Motors",
    "Bajaj Auto",
    "Hero MotoCorp",
    "TVS Motor",
    "Bosch India",
    "Mahindra & Mahindra",
    "Tata Motors",
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-h-26 flex items-center justify-center bg-card pt-20 pb-20 overflow-hidden">
        <div className="absolute top-27 right-100 w-22 h-22 border-2 border-accent opacity-20 rounded-full" />
        <div className="absolute top-12 right-99 w-48 h-48 border-2 border-accent opacity-20 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our <span className="text-accent">Clients</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by leading automotive and manufacturing companies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
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
              Our <span className="text-accent">Partners</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors flex items-center justify-center min-h-32"
              >
                <p className="text-center font-semibold text-foreground">{client}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              Client <span className="text-accent">Testimonials</span>
            </h2>
            <RedLineAccent />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-lg border border-border hover:border-accent transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-accent font-medium">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Satisfied Clients" },
              { number: "30+", label: "Years Experience" },
              { number: "10,000+", label: "Projects Completed" },
              { number: "99.8%", label: "Quality Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
