"use client"

import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"
import { RedLineAccent } from "../../components/abstract-shapes"
import { PortfolioRedirectModal } from "../../components/portfolio-redirect-modal"
import { useEffect, useRef, useState } from "react"

// Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * (end - startValue) + startValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Clients() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const testimonials = [
    {
      name: "Abhishek Anand",
      company: "AutoTech Industries",
      role: "Production Manager",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      content:
        "Lanora's electroplating services have significantly improved our component quality. Their attention to detail and timely delivery is exceptional.",
      rating: 4,
    },
    {
      name: "Priya Sharma",
      company: "Precision Manufacturing",
      role: "Quality Head",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      content:
        "We've been working with Lanora for 5 years. Their consistency and professional approach make them our preferred plating partner.",
      rating: 4,
    },
    {
      name: "Amit Patel",
      company: "Industrial Solutions Ltd",
      role: "Procurement Director",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      content:
        "Excellent service, competitive pricing, and reliable delivery. Lanora understands our requirements perfectly.",
      rating: 5,
    },
    {
      name: "Abhishek Singh",
      company: "Automotive Components Co.",
      role: "Technical Lead",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      content:
        "The technical expertise of Lanora's team is outstanding. They provide valuable suggestions for process optimization.",
      rating: 3,
    },
  ]

  const clients = [
    { name: "Maruti Suzuki", location: "Mumbai", image: "https://icon2.cleanpng.com/lnd/20250106/ix/36bf2d9992b11a36fcc6b806bfb266.webp" },
    { name: "Hyundai Motors", location: "Chennai", image: "https://img.favpng.com/8/9/15/hyundai-motor-company-car-logo-hyundai-genesis-png-favpng-KTqGPLSSUHMNJ4p76btJ8CKSq.jpg" },
    { name: "Bajaj Auto", location: "Pune", image: "https://1000logos.net/wp-content/uploads/2020/06/Bajaj-Logo.png" },
    { name: "Hero MotoCorp", location: "Delhi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV9_nCbknOksSHEL4dMgGupeYL0hbJ56iJ9w&s" },
    { name: "TVS Motor", location: "Chennai", image: "https://www.freepnglogos.com/uploads/tvs-logo-png/tvs-motors-logo-png-0.png" },
    { name: "Bosch India", location: "Bangalore", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM_jU4txYgjuTj_a-znQ-lBYsFB6lNzwWrAw&s" },
    { name: "Mahindra & Mahindra", location: "Mumbai", image: "https://toppng.com/uploads/preview/mahindra-logo-vector-free-11574210410bvsayvnvbr.png" },
    { name: "Tata Motors", location: "Mumbai", image: "https://e7.pngegg.com/pngimages/1018/823/png-clipart-tata-motors-logo-car-tamo-racemo-philippines-car-blue-text-thumbnail.png" },
  ]

  return (
    <div className="overflow-hidden">
      {/* Portfolio Redirect Modal */}
      <PortfolioRedirectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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

      {/* Client Logos - Infinite Scroll */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trusted by Businesses Like <span className="text-accent">Yours</span>
            </h2>
            <p className="text-muted-foreground">Join the growing list of successful companies we've helped</p>
            <RedLineAccent />
          </motion.div>

          {/* Infinite scrolling strip */}
          <div className="relative">
            <div className="flex gap-8 animate-scroll">
              {/* Duplicate the clients array for seamless loop */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="shrink-0 bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors min-w-[280px] cursor-pointer group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={client.image} alt={client.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                onClick={() => setIsModalOpen(true)}
                className="bg-background p-8 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-accent shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <div className="flex-1">
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-accent font-medium">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Animated Counters */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: 300, label: "Satisfied Clients", suffix: "+" },
              { number: 25, label: "Years Experience", suffix: "+" },
              { number: 1000, label: "Projects Completed", suffix: "+" },
              { number: 99.6, label: "Quality Rate", suffix: "%" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold text-accent mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2000} />
                </p>
                <p className="text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
