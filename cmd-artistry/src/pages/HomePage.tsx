import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesHighlight from "../components/ServicesHighlight";
import Testimonials from "../components/Testimonials";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServicesHighlight />
      <Testimonials />
    </>
  );
};

export default HomePage;
