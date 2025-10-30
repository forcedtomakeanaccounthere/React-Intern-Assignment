"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top instantly when pathname changes
    // Using setTimeout to ensure it happens after navigation
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      // Also ensure document is scrolled to top
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Immediate scroll
    scrollToTop()

    // Backup scroll after a brief delay to ensure it happens
    const timeoutId = setTimeout(scrollToTop, 10)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
