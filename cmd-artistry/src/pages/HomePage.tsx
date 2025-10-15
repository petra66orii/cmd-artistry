import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesHighlight from "../components/ServicesHighlight";
import Testimonials from "../components/Testimonials";

const HomePage: React.FC = () => {
  return (
    <main className="bg-off-white">
      <HeroSection />
      <div className="space-y-20">
        <ServicesHighlight />
        <Testimonials />
      </div>
    </main>
  );
};

export default HomePage;
