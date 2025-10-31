"use client"

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info - Full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/lanora.png" alt="Lanora Logo" className="w-7 h-8" />
              <span className="font-bold text-lg text-foreground">Lanora</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional electroplating services for automotive and manufacturing industries.
            </p>
          </div>

          {/* Quick Links - Side by side on mobile, separate on desktop */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/facilities", label: "Facilities" },
                { href: "/services", label: "Services" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {["Nickel Plating", "Chrome Plating", "Zinc Plating", "Copper Plating"].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <a
                  href="mailto:abhishekanandvii@gmail.com"
                  className="text-muted-foreground hover:text-accent transition-colors text-sm"
                >
                  abhishekanandvii@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <a
                  href="tel:+917386811239"
                  className="text-muted-foreground hover:text-accent transition-colors text-sm"
                >
                  +91 7386811239
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-sm">IIIT-Sri City, Chittoor, Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Lanora Electroplaters - Abhishek Anand.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
