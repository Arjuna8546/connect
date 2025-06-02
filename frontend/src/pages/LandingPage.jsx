"use client";

import { AboutSection } from "../components/user/homepage/AboutSection";
import { Footer } from "../components/user/othercomponent/Footer";
import { HeroSection } from "../components/user/homepage/HeroSection";
import { MobileAppSection } from "../components/user/homepage/MobileAppSection";
import { Navigation } from "../components/user/othercomponent/Navigation";
import { NetworkSection } from "../components/user/homepage/NetworkSection";


export const LandingPage = () => {

  return (
    <div className="flex flex-col bg-black min-h-[screen]">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <MobileAppSection />
        <NetworkSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
