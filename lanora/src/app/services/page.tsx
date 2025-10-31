"use client"

import { motion } from "framer-motion"
import { RedLineAccent } from "../../components/abstract-shapes"
import { PortfolioRedirectModal } from "../../components/portfolio-redirect-modal"
import { useState } from "react"

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const services = [
    {
      icon: "https://advancedplatingtech.com/wp-content/uploads/2017/12/Untitled-design-1.png",
      title: "Nickel Plating",
      description: "High-quality nickel coating for corrosion resistance and aesthetic appeal.",
      features: ["Bright nickel finish", "Matte nickel option", "Uniform thickness", "Excellent adhesion"],
      applications: "Automotive parts, hardware, decorative items",
    },
    {
      icon: "https://content.instructables.com/F98/1JVI/HNICKGPR/F981JVIHNICKGPR.jpg?auto=webp",
      title: "Chrome Plating",
      description: "Premium chrome finish for superior hardness and brilliant shine.",
      features: ["Hard chrome coating", "Decorative chrome", "High wear resistance", "Mirror-like finish"],
      applications: "Bumpers, trim, tools, industrial components",
    },
    {
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Ablf6_6fGlS76K9zME7be1H-kk9pZKLkpg&s",
      title: "Zinc Plating",
      description: "Cost-effective zinc coating for excellent corrosion protection.",
      features: ["Yellow zinc", "White zinc", "Blue zinc", "Trivalent zinc"],
      applications: "Fasteners, automotive parts, industrial hardware",
    },
    {
      icon: "https://www.bharathelectrochem.com/assets/new-images/products/copper-plating.png",
      title: "Copper Plating",
      description: "Copper coating for improved conductivity and corrosion resistance.",
      features: ["Pure copper", "Excellent conductivity", "Good adhesion", "Uniform deposition"],
      applications: "Electronics, PCBs, decorative applications",
    },
    {
      icon: "https://5.imimg.com/data5/SELLER/Default/2024/7/433551090/DB/IL/CZ/2963026/gold-plating-process.jpg",
      title: "Multi-layer Plating",
      description: "Combination of different metals for enhanced performance.",
      features: ["Nickel-chrome", "Copper-nickel", "Custom combinations", "Optimized thickness"],
      applications: "High-performance components, specialized applications",
    },
    {
      icon: "https://www.consonnisrl.it/wp-content/uploads/2012/03/ramatura1.jpg",
      title: "Specialized Coatings",
      description: "Custom plating solutions for unique requirements.",
      features: ["Tin plating", "Gold plating", "Silver plating", "Custom alloys"],
      applications: "Electronics, jewelry, specialized industrial use",
    },
  ]

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
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all hover:shadow-lg group cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="relative w-20 h-20 mb-6">
                  {/* Tilted red box background */}
                  <div className="absolute inset-0 bg-accent rounded-lg rotate-12 group-hover:rotate-20 group-hover:scale-115 transition-transform duration-300" />
                  {/* Icon on top */}
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="relative w-19 h-19 object-cover rounded-lg z-10 group-hover:scale-110 transition-transform duration-300 border-accent border-2" 
                  />
                </div>
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
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
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
                icon: "https://content.instructables.com/F98/1JVI/HNICKGPR/F981JVIHNICKGPR.jpg?auto=webp",
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
                icon: "https://content.instructables.com/F98/1JVI/HNICKGPR/F981JVIHNICKGPR.jpg?auto=webp",
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
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-background p-8 rounded-lg border border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Redirect Modal */}
      <PortfolioRedirectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
