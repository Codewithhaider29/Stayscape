"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/loading"; // <-- your loader component
import Hero from "@/components/hero";
import HostIntro from "@/components/host-intro";
import Gallery from "@/components/gallery";
import AmenitiesGrid from "@/components/amenities-grid";
import ReviewsSection from "@/components/reviews-section";
import FAQSection from "@/components/faq-section";
import PricingSection from "@/components/pricing-section";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay or wait for real data fetching
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; // <-- show your full-screen loader
  }

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
  );
}
