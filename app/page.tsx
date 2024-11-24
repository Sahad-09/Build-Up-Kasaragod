"use client"
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection"; // Import the HeroSection component
import { WhatWeDoSection } from "@/components/WhatWeDo";
import { ResourceCenter } from "@/components/ResourceCenter";
import { NewsletterSection } from "@/components/NewsletterSection";
import { UpcomingEventsSection } from "@/components/UpcomingEventsSection";
import ImpactStatistics from "@/components/ImpactStatistics";
import ImageSection from "@/components/ImageSection ";

const KasaragodLandingPage = () => {
  const scrollRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const heroData = {
    title: "Empowering Kasaragod",
    description: "A Community-Driven Initiative to Transform and Uplift Kasaragod",
    buttonText: "Explore Our Initiatives",
  };

  // Only initialize scroll-based animations after component mount
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null or a loading state while mounting
  if (!isMounted) {
    return null;
  }

  return (
    <div ref={scrollRef} className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        title={heroData.title}
        description={heroData.description}
        buttonText={heroData.buttonText}
      />

      {/* Image Section with backgroundY transform */}
      <motion.div style={{ y: backgroundY }} className="container mx-auto py-6">
        <ImageSection />
      </motion.div>

      {/* What We Do Section with textY transform */}
      <motion.div style={{ y: textY }} className="container mx-auto py-6">
        <WhatWeDoSection />
      </motion.div>

      {/* Impact Statistics Section */}
      <div className="container mx-auto py-6">
        <ImpactStatistics />
      </div>

      {/* Resource Center Section */}
      <div className="container mx-auto py-6">
        <ResourceCenter />
      </div>

      {/* Upcoming Events Section */}
      <div className="container mx-auto py-6">
        <UpcomingEventsSection />
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto py-6">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default KasaragodLandingPage;
