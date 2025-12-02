import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { Navbar } from "../components/navbar"
// import { Footer } from "../components/footer"
import { ScrollToTop } from "../components/scroll-to-top"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lanora Electroplaters | Professional Services - Abhishek Anand",
  description:
    "High-quality electroplating services for automotive and manufacturing industries. Expert plating solutions with advanced facilities.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <ScrollToTop />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          {/* <Footer /> */}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
