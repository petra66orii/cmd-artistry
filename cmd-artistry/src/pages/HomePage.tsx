import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../components/HeroSection";
import ServicesHighlight from "../components/ServicesHighlight";
import Testimonials from "../components/Testimonials";
import Credentials from "../components/Credentials";

const HomePage: React.FC = () => {
  return (
    <main className="bg-off-white/90 backdrop-blur-sm">
      <Helmet>
        <title>CM Artistry | Handcrafted Murals & Pottery, Ireland</title>
        <meta
          name="description"
          content="Bespoke murals, sign writing, and handcrafted pottery by artist Carmel. Transforming spaces with unique art. Based in Ireland."
        />
      </Helmet>
      <HeroSection />
      <ServicesHighlight />
      <Credentials />
      <Testimonials />
    </main>
  );
};

export default HomePage;
