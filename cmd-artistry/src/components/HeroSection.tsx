import React from "react";
import HeroImage from "../assets/images/hero-section.jpg";

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-off-white"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-dark-charcoal/90 via-dark-charcoal/70 to-dark-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal/80 via-pastel-pink/20 to-transparent" />

      <div className="relative z-10 p-6 md:p-10 max-w-3xl">
        <span className="inline-block bg-off-white/80 text-dark-charcoal font-semibold tracking-[0.35em] uppercase text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
          CMD Artistry Studio
        </span>
        <h1 className="text-4xl md:text-6xl font-cursive leading-tight mb-4">
          Transforming Spaces with Handcrafted Art.
        </h1>
        <p className="text-lg md:text-xl mb-8 text-off-white/90">
          Custom murals and unique pottery painted in layers of color tailored
          to your vision.
        </p>
        <a
          href="/gallery"
          className="bg-pastel-pink text-dark-charcoal font-bold py-3 px-8 rounded text-lg hover:bg-pastel-beige transition-colors duration-300"
        >
          View My Work
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
