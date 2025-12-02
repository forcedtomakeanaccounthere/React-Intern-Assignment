"use client"
import HeroSection from "../components/sections/hero-section"
import ParallaxImageSection from "../components/sections/parallax-image-section"
import StackedCardsSection from "../components/sections/stacked-cards-section"
import FeaturesGridSection from "../components/sections/features-grid-section"
import ProductHighlightsSection from "../components/sections/product-highlights-section"
import TestimonialsSection from "../components/sections/testimonials-section"
import PricingSection from "../components/sections/pricing-section"
import FooterVideoSection from "../components/sections/footer-video-section"
import CustomCursor from "../components/custom-cursor"

export default function Home() {
  return (
    <div className="relative isolate">
      <CustomCursor />
      <HeroSection />
      <ParallaxImageSection />
      {/* These sections need bg-background to cover the fixed parallax image */}
      <div className="relative z-10 bg-background">
        <StackedCardsSection />
        <FeaturesGridSection />
        <ProductHighlightsSection />
        <TestimonialsSection />
        <PricingSection />
        <FooterVideoSection />
      </div>
    </div>
  )
}
