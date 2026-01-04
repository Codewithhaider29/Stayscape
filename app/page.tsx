import Hero from "@/components/hero"
import HostIntro from "@/components/host-intro"
import Gallery from "@/components/gallery"
import AmenitiesGrid from "@/components/amenities-grid"
import ReviewsSection from "@/components/reviews-section"
import FAQSection from "@/components/faq-section"
import PricingSection from "@/components/pricing-section"
import LocationSection from "@/components/LocationSection"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Hero />
      <HostIntro />
      <Gallery />
      <AmenitiesGrid />
      <ReviewsSection />
      <FAQSection />
      <PricingSection />
      <LocationSection />
      <Footer />
    </>
  )
}
