import React from "react";
import HeroSection from "../components/home/HeroSection";
import ServicesHighlight from "../components/home/ServicesHighlight";
import Testimonials from "../components/home/Testimonials";

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
