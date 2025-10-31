"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { ExternalLink, Sparkles } from "lucide-react"

interface PortfolioRedirectModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PortfolioRedirectModal({ isOpen, onClose }: PortfolioRedirectModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Redirect after 3 seconds
      const timer = setTimeout(() => {
        window.open("https://portfolio-abhishek-anand.vercel.app/", "_blank")
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border-2 border-accent rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-accent to-accent/80 p-8 text-center relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 right-0 w-32 h-32 border-2 border-accent-foreground/20 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="w-16 h-16 text-accent-foreground mx-auto mb-4" />
                </motion.div>
                <h2 className="text-3xl font-bold text-accent-foreground mb-2">
                  Meet the Artist
                </h2>
                <p className="text-accent-foreground/90 text-sm">
                  Behind the scenes of Lanora Electroplaters
                </p>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-lg text-foreground mb-4">
                    Discover the creative mind behind this project
                  </p>
                  <p className="text-muted-foreground mb-6">
                    You'll be redirected to the portfolio in a moment...
                  </p>

                  {/* Animated Progress */}
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-6">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.open("https://portfolio-abhishek-anand.vercel.app/", "_blank")
                      onClose()
                    }}
                    className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Visit Now
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>

                  <button
                    onClick={onClose}
                    className="block w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
