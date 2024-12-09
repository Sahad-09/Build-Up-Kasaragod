"use client"
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import HeroSection from "@/components/HeroSection"; // Import the HeroSection component
import { WhatWeDoSection } from "@/components/WhatWeDo";
import { ResourceCenter } from "@/components/ResourceCenter";
import { NewsletterSection } from "@/components/NewsletterSection";
import ImpactStatistics from "@/components/ImpactStatistics";
import ImageSection from "@/components/ImageSection ";
import { MembershipCTASection } from "@/components/MembershipCTASection";

const KasaragodLandingPage = () => {
  const scrollRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const heroData = {
    title: "Build Up Kasaragod",
    description: "A Community-Driven Initiative to Transform and Uplift Kasaragod",
    buttonText: "Explore Our Events",
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
      <div className=" mt-[-100px] md:mt-[-50px]">
        <HeroSection
          title={heroData.title}
          description={heroData.description}
          buttonText={heroData.buttonText}
        />
      </div>

      {/* Other Sections */}
      <div className="container mx-auto py-6">
        <ImageSection />
      </div>
      <div className="container mx-auto py-6">
        <WhatWeDoSection />
      </div>
      <div className="container mx-auto py-6">
        <ImpactStatistics />
      </div>

      <div className="container mx-auto py-6">
        <ResourceCenter />
      </div>


      {/* <div className="container mx-auto py-6">
        <UpcomingEventsSection />
      </div> */}

      {/* <div className="container mx-auto py-6">
        <NewsletterSection />
      </div> */}


      <div className="container mx-auto py-6">
        <MembershipCTASection />
      </div>
    </div>
  );
};

export default KasaragodLandingPage;
