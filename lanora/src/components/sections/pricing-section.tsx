"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function PricingSection() {
  const plans = [
    {
      name: "Standard",
      price: "Contact",
      description: "Perfect for small to medium projects",
      features: ["Nickel & Zinc Plating", "Standard turnaround time", "Quality testing", "Dedicated account manager"],
    },
    {
      name: "Professional",
      price: "Contact",
      description: "Ideal for growing manufacturers",
      features: [
        "All Standard features",
        "Chrome plating included",
        "Priority turnaround",
        "Advanced testing",
        "Volume discounts",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Contact",
      description: "For high-volume requirements",
      features: [
        "All Professional features",
        "Custom plating solutions",
        "Dedicated production line",
        "24/7 support",
        "Custom agreements",
      ],
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Simple, Transparent <span className="text-accent">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your electroplating needs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ translateY: -5 }}
              className={`relative group rounded-2xl transition-all ${
                plan.featured
                  ? "md:scale-105 bg-accent/10 border-2 border-accent"
                  : "bg-card border border-border hover:border-accent/50"
              }`}
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10 p-8">
                {plan.featured && <div className="text-xs font-semibold text-accent mb-2 uppercase">Most Popular</div>}

                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
                    plan.featured
                      ? "bg-accent text-accent-foreground hover:opacity-90"
                      : "border border-accent text-accent hover:bg-accent/10"
                  }`}
                >
                  Contact Sales
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
