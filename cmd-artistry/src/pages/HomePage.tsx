import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesHighlight from "../components/ServicesHighlight";
import Testimonials from "../components/Testimonials";
import Credentials from "../components/Credentials";

const HomePage: React.FC = () => {
  return (
    <main className="bg-off-white/90 backdrop-blur-sm">
      <HeroSection />
      <div className="space-y-20">
        <ServicesHighlight />
        <Credentials />
        <Testimonials />
      </div>
    </main>
  );
};

export default HomePage;
