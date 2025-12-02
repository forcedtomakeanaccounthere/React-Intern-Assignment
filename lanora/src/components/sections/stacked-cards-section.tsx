"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Zap, Shield, Cog, Cpu } from "lucide-react"

// Large horizontal stacking cards like TagMango that stay visible while scrolling
export default function StackedCardsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const cards = [
    {
      title: "Nickel Plating",
      subtitle: "Corrosion-Resistant Excellence",
      description:
        "Our nickel plating services deliver superior corrosion resistance with an impeccable aesthetic finish. Perfect for automotive parts, hardware, and decorative applications requiring both durability and visual appeal.",
      features: [
        "Bright nickel finish option",
        "Matte and satin variants",
        "Uniform thickness control",
        "Excellent adhesion properties",
      ],
      color: "bg-sky-50 dark:bg-sky-950/40",
      accentColor: "text-sky-600 dark:text-sky-400",
      borderColor: "border-sky-200 dark:border-sky-800",
      icon: Zap,
      image: "https://advancedplatingtech.com/wp-content/uploads/2017/12/Untitled-design-1.png?height=400&width=500",
    },
    {
      title: "Chrome Plating",
      subtitle: "Premium Hardness & Brilliance",
      description:
        "Achieve the ultimate in hardness, wear resistance, and mirror-like brilliance. Our chrome plating is the industry standard for components demanding peak performance and stunning aesthetics.",
      features: [
        "Hard chrome applications",
        "Decorative chrome finish",
        "High wear resistance",
        "Superior surface hardness",
      ],
      color: "bg-emerald-50 dark:bg-emerald-950/40",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      icon: Shield,
      image: "https://content.instructables.com/F98/1JVI/HNICKGPR/F981JVIHNICKGPR.jpg?auto=webp?height=400&width=500",
    },
    {
      title: "Zinc Plating",
      subtitle: "Cost-Effective Protection",
      description:
        "The smart choice for excellent corrosion protection at competitive pricing. Our zinc plating solutions are ideal for fasteners, brackets, and components exposed to harsh environments.",
      features: [
        "Yellow and blue passivation",
        "Trivalent chromate options",
        "High volume capability",
        "Environmental compliance",
      ],
      color: "bg-amber-50 dark:bg-amber-950/40",
      accentColor: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-800",
      icon: Cog,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Ablf6_6fGlS76K9zME7be1H-kk9pZKLkpg&s?height=400&width=500",
    },
    {
      title: "Copper Plating",
      subtitle: "Conductivity & Versatility",
      description:
        "Essential for electronics and as an undercoat for multi-layer plating. Our copper plating provides excellent conductivity, adhesion base, and corrosion resistance for demanding applications.",
      features: ["Acid copper processes", "Alkaline copper options", "PCB compatible", "Multi-layer base coating"],
      color: "bg-orange-50 dark:bg-orange-950/40",
      accentColor: "text-orange-600 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-800",
      icon: Cpu,
      image: "https://www.consonnisrl.it/wp-content/uploads/2012/03/ramatura1.jpg?height=400&width=500",
    },
  ]

  // Create transforms for each card using useTransform
  const card0X = useTransform(scrollYProgress, [0, 0.15], [-100, 0])
  const card0Opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.9], [0, 1, 1, 0.3])
  const card0Scale = useTransform(scrollYProgress, [0, 0.15, 0.8], [0.8, 1, 0.92])
  const card0Rotate = useTransform(scrollYProgress, [0, 0.15], [-8, -2])
  const card0Blur = useTransform(scrollYProgress, [0, 0.08], [8, 0])

  const card1X = useTransform(scrollYProgress, [0.15, 0.35], [100, 0])
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.8, 0.9], [0, 1, 1, 0.4])
  const card1Scale = useTransform(scrollYProgress, [0.15, 0.35, 0.8], [0.8, 1, 0.94])
  const card1Rotate = useTransform(scrollYProgress, [0.15, 0.35], [8, 2])
  const card1Blur = useTransform(scrollYProgress, [0.15, 0.23], [8, 0])

  const card2X = useTransform(scrollYProgress, [0.35, 0.55], [-100, 0])
  const card2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.8, 0.9], [0, 1, 1, 0.5])
  const card2Scale = useTransform(scrollYProgress, [0.35, 0.55, 0.8], [0.8, 1, 0.96])
  const card2Rotate = useTransform(scrollYProgress, [0.35, 0.55], [-8, -1])
  const card2Blur = useTransform(scrollYProgress, [0.35, 0.43], [8, 0])

  const card3X = useTransform(scrollYProgress, [0.55, 0.75], [100, 0])
  const card3Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.95], [0, 1, 1])
  const card3Scale = useTransform(scrollYProgress, [0.55, 0.75], [0.8, 1])
  const card3Rotate = useTransform(scrollYProgress, [0.55, 0.75], [8, 1])
  const card3Blur = useTransform(scrollYProgress, [0.55, 0.63], [8, 0])

  const cardTransforms = [
    { x: card0X, opacity: card0Opacity, scale: card0Scale, rotate: card0Rotate, blur: card0Blur },
    { x: card1X, opacity: card1Opacity, scale: card1Scale, rotate: card1Rotate, blur: card1Blur },
    { x: card2X, opacity: card2Opacity, scale: card2Scale, rotate: card2Rotate, blur: card2Blur },
    { x: card3X, opacity: card3Opacity, scale: card3Scale, rotate: card3Rotate, blur: card3Blur },
  ]

  return (
    <section ref={containerRef} className="relative bg-background" style={{ height: "500vh" }}>
      {/* Section header */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center py-8 md:py-12 z-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-10 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 md:mb-4">
            Our Plating <span className="text-accent">Solutions</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive electroplating services tailored to your industry needs
          </p>
        </motion.div>

        {/* Stacking cards container */}
        <div className="relative w-full max-w-6xl mx-auto px-4 flex-1 flex items-center max-h-[70vh]">
          {cards.map((card, index) => {
            const transforms = cardTransforms[index]
            const Icon = card.icon

            return (
              <motion.div
                key={index}
                style={{
                  x: transforms.x,
                  opacity: transforms.opacity,
                  scale: transforms.scale,
                  rotate: transforms.rotate,
                  filter: useTransform(transforms.blur, (value) => `blur(${value}px)`),
                }}
                className="absolute inset-x-4 top-0"
              >
                <div
                  className={`${card.color} ${card.borderColor} border-2 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-2xl`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center">
                    {/* Content side */}
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className={`inline-flex items-center gap-2 ${card.accentColor} mb-2 md:mb-4`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        <span className="text-xs md:text-sm font-semibold uppercase tracking-wider">
                          {card.subtitle}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-5">
                        {card.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                        {card.description}
                      </p>
                      <ul className="space-y-1.5 md:space-y-2 hidden sm:block">
                        {card.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 md:gap-3 text-foreground">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent flex-shrink-0" />
                            <span className="text-xs md:text-sm lg:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 md:mt-6 px-5 md:px-7 py-2.5 md:py-3 bg-accent text-accent-foreground rounded-lg md:rounded-xl font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow"
                      >
                        Learn More
                      </motion.button>
                    </div>

                    {/* Image side */}
                    <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""} hidden md:block`}>
                      <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={card.image || "/placeholder.svg"}
                          alt={card.title}
                          className="w-full h-48 md:h-56 lg:h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      {/* Decorative element */}
                      <div
                        className={`absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-20 h-20 md:w-28 md:h-28 ${card.borderColor} border-2 rounded-xl md:rounded-2xl -z-10`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
