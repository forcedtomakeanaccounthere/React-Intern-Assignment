"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Abhishek Anand",
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
        "Excellent service, competitive pricing, and reliable delivery. Lanora understands our requirements perfectly and delivers accordingly.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-4">
            What Our Clients <span className="text-accent">Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group bg-background rounded-2xl p-8 border border-border hover:border-accent/50 transition-all backdrop-blur-sm"
            >
              {/* Glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>

                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-accent">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
