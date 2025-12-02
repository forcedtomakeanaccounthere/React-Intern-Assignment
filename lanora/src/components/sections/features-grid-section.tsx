"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"
import { Settings, Award, Truck, DollarSign, Leaf, HeadphonesIcon } from "lucide-react"

export default function FeaturesGridSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const features = [
    {
      icon: Settings,
      headline: "Advanced Automation",
      detail:
        "Our state-of-the-art PLC-controlled plating lines deliver unmatched precision in temperature regulation, pH balance, and coating thickness. Every parameter is monitored in real-time, ensuring consistent quality across thousands of components.",
      stats: { value: "99.8%", label: "Process Accuracy" },
      image: "https://cdn.sanity.io/images/vpe6kkg1/production/5a4e3e760c2d764c09170cd43c7bb26ac43a5445-5120x2880.jpg?height=300&width=400",
    },
    {
      icon: Award,
      headline: "Quality Assurance",
      detail:
        "Rigorous testing at every stage guarantees excellence. Our X-ray fluorescence thickness measurement, salt spray testing, and visual inspection protocols meet the strictest automotive and aerospace standards.",
      stats: { value: "ISO 9001", label: "Certified" },
      image: "https://www.mgindustries.net.in/assets/img/3.6.jpg?height=300&width=400",
    },
    {
      icon: Truck,
      headline: "Fast Turnaround",
      detail:
        "Time is money. Our optimized workflow and 24/7 operations ensure your components are processed and delivered on schedule. Emergency services available for critical production needs.",
      stats: { value: "48hr", label: "Express Service" },
      image: "https://www.pathreflab.com/wp-content/uploads/2023/08/Turnaround-Times-in-Pathology-Labs.jpg?height=300&width=400",
    },
    {
      icon: DollarSign,
      headline: "Cost Effective",
      detail:
        "Premium quality doesn't mean premium prices. Our efficient processes, bulk handling capabilities, and minimal waste generation allow us to offer competitive pricing without compromising on excellence.",
      stats: { value: "30%", label: "Cost Savings" },
      image: "https://spekond.com/wp-content/uploads/2025/01/global-security-industry-moving-towards-cost-effective-safety-solutions-920x533-1.jpg?height=300&width=400",
    },
    {
      icon: Leaf,
      headline: "Environmental Care",
      detail:
        "Sustainability is core to our operations. Advanced wastewater treatment, chemical recycling, and energy-efficient equipment minimize our environmental footprint while maintaining top-tier plating performance.",
      stats: { value: "Zero", label: "Discharge Facility" },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJxZL0H5xQjInpPiwG-7UwVjQVMq84XpgNNqmFjuohMrEdopnfZixAdt50tjeKR9ZbVyM&usqp=CAU?height=300&width=400",
    },
    {
      icon: HeadphonesIcon,
      headline: "Expert Support",
      detail:
        "From initial consultation to post-delivery support, our experienced team is with you every step. Technical guidance, process optimization, and custom solutions tailored to your specific requirements.",
      stats: { value: "25+", label: "Years Experience" },
      image: "https://omq.ai/static/9fe3b5391bac157f5c630810f5fa83d9/f53d2/headpicture_first_level_en.png?height=300&width=400",
    },
  ]

  // Update active index based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(Math.floor(latest * features.length), features.length - 1)
    if (newIndex !== activeIndex && newIndex >= 0) {
      setActiveIndex(newIndex)
    }
  })

  // Handle click to jump to specific feature
  const handleFeatureClick = (index: number) => {
    setActiveIndex(index)
    // Calculate scroll position for this index
    const scrollPercentage = index / features.length
    const scrollPosition = scrollPercentage * (features.length * 120) * window.innerHeight
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
  }

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="relative bg-card" style={{ height: `${features.length * 120}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden py-2 sm:py-4 md:py-0">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 flex flex-col">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-1 sm:mb-2 md:mb-3 lg:mb-4">
              Why Choose <span className="text-accent">Lanora</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Excellence in every aspect of electroplating services
            </p>
          </motion.div>

          <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 flex-1 min-h-0 overflow-hidden pb-2 sm:pb-4 md:pb-6">
            {/* Left: Sticky navigation headlines - Icon only on mobile, full on desktop */}
            <div className="col-span-3 sm:col-span-3 md:col-span-4 lg:col-span-4 flex flex-col">
              <div className="space-y-1 sm:space-y-1.5 md:space-y-2 flex-1">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  const isActive = activeIndex === index

                  return (
                    <motion.div
                      key={index}
                      onClick={() => handleFeatureClick(index)}
                      animate={{
                        scale: isActive ? 1 : 0.95,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                      title={feature.headline}
                      className={`p-1 sm:p-1.5 md:p-2 lg:p-3 rounded-md md:rounded-lg cursor-pointer transition-all ${
                        isActive
                          ? "bg-accent text-accent-foreground shadow-lg"
                          : "bg-background/50 text-foreground hover:bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-md flex items-center justify-center shrink-0 ${
                            isActive ? "bg-accent-foreground/20" : "bg-accent/10"
                          }`}
                        >
                          <Icon
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 ${isActive ? "" : "text-accent"}`}
                          />
                        </div>
                        <span className="font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base truncate hidden md:block">
                          {feature.headline}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Progress indicator */}
              <div className="mt-2 sm:mt-2.5 md:mt-3 lg:mt-4 px-1 sm:px-2 md:px-3">
                <div className="h-0.5 sm:h-1 md:h-1 bg-border rounded-full overflow-hidden">
                  <motion.div className="h-full bg-accent rounded-full" style={{ width: progressWidth }} />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1 md:mt-1.5 text-center">
                  {activeIndex + 1} of {features.length}
                </p>
              </div>
            </div>

            {/* Right: Dynamic content that updates */}
            <div className="col-span-9 sm:col-span-9 md:col-span-8 lg:col-span-8 min-h-0 overflow-hidden">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-background rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 border border-border h-full shadow-xl flex flex-col overflow-auto"
              >
                {/* Header */}
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-md md:rounded-lg lg:rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    {(() => {
                      const Icon = features[activeIndex].icon
                      return <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-accent" />
                    })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-foreground line-clamp-1">
                      {features[activeIndex].headline}
                    </h3>
                    <div className="flex items-baseline gap-1 sm:gap-1.5 md:gap-2 mt-0.5 sm:mt-0.5 md:mt-1">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-accent">
                        {features[activeIndex].stats.value}
                      </span>
                      <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-muted-foreground">
                        {features[activeIndex].stats.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-muted-foreground leading-relaxed mb-1.5 sm:mb-2 md:mb-3 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                  {features[activeIndex].detail}
                </p>

                {/* Image */}
                <div className="relative rounded-md md:rounded-lg overflow-hidden flex-1 min-h-20 sm:min-h-24 md:min-h-32 lg:min-h-40">
                  <motion.img
                    key={features[activeIndex].image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={features[activeIndex].image}
                    alt={features[activeIndex].headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1.5 sm:mt-2 md:mt-3 self-start px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 border-2 border-accent text-accent rounded-md md:rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors text-[9px] sm:text-[10px] md:text-xs lg:text-sm"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
