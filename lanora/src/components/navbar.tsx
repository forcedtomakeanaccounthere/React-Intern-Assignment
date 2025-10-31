"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "./theme-provider"
import { Menu, X, Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/facilities", label: "Facilities" },
  { href: "/services", label: "Services" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-13 h-10 bg-accent-foreground rounded-lg flex items-center justify-center text-white font-bold text-lg"
            >
              <img src="/lanora.png" alt="Lanora Logo" className="w-7 h-8" />
            </motion.div>
            {/* <span className="font-bold text-lg hidden sm:inline text-foreground">Lanora</span> */}
            <img 
              src={theme === "dark" ? "/lanora_text_dark.png" : "/lanora_text.png"} 
              alt="Lanora Logo" 
              className="w-12 h-4 z-10 text-accent-foreground" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href} className="relative group">
                  <span 
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive ? (
                    <div className="absolute -inset-2 bg-accent/10 rounded-3xl border border-accent/30 -z-10" />
                  ) : (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-accent"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right side - Theme toggle and Menu button */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-foreground" />
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation - Slide from Right */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop with blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsOpen(false)}
              />

              {/* Slide-in Menu */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-card border-l border-border z-50 md:hidden shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <img src="/lanora.png" alt="Lanora" className="w-7 h-8" />
                      <img 
                        src={theme === "dark" ? "/lanora_text_dark.png" : "/lanora_text.png"} 
                        alt="Lanora" 
                        className="w-12 h-4" 
                      />
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-6 h-6 text-foreground" />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 overflow-y-auto py-6">
                    {navLinks.map((link, index) => {
                      const isActive = pathname === link.href
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            className={`block px-6 py-3 text-lg font-medium transition-colors ${
                              isActive 
                                ? 'text-accent bg-accent/10 border-l-4 border-accent' 
                                : 'text-foreground hover:text-accent hover:bg-muted'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Footer with theme toggle */}
                  <div className="p-4 border-t border-border">
                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center justify-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
                    >
                      {theme === "light" ? (
                        <>
                          <Moon className="w-5 h-5 text-foreground" />
                          <span className="text-foreground">Dark Mode</span>
                        </>
                      ) : (
                        <>
                          <Sun className="w-5 h-5 text-foreground" />
                          <span className="text-foreground">Light Mode</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
