"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function FooterVideoSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-black z-20">
      {/* Video background with overlays */}
      <div className="absolute inset-0 -z-10">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-100"
        >
          <source src="/boat_footer.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay from left-to-right with blur */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* CTA Section */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Ready to <span className="text-accent">Transform</span> Your Components?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 md:mb-10 leading-relaxed">
              Contact our team today for a consultation and discover how Lanora can meet your electroplating needs with
              precision and excellence.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm md:text-base"
                >
                  Request a Quote <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm md:text-base"
                >
                  View Services
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Links Section */}
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {/* Company Info */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-sm">L</span>
                  </div>
                  <span className="font-bold text-lg text-white">Lanora</span>
                </div>
                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  Professional electroplating services for automotive and manufacturing industries.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
                <ul className="space-y-2 md:space-y-3">
                  {["Home", "About", "Facilities", "Services"].map((link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase()}`}
                        className="text-sm text-white/60 hover:text-accent transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Services</h4>
                <ul className="space-y-2 md:space-y-3">
                  {["Nickel Plating", "Chrome Plating", "Zinc Plating", "Copper Plating"].map((service) => (
                    <li key={service}>
                      <Link href="/services" className="text-sm text-white/60 hover:text-accent transition-colors">
                        {service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/60">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <span className="truncate">info@lanora.com</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/60">
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    <span>+91 7386811239</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/60">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>IIIT-Sri City, Chittoor, AP, India</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
              <p className="text-xs md:text-sm text-white/40 text-center md:text-left">
                © {currentYear} Lanora Electroplaters - Abhishek Anand. All rights reserved.
              </p>
              <div className="flex gap-4 md:gap-6">
                <Link href="/privacy" className="text-xs md:text-sm text-white/40 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-xs md:text-sm text-white/40 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
