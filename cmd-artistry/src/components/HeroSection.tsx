import React from "react";

const HeroSection: React.FC = () => {
  // We'll use a placeholder image for now. Replace with an actual image URL.
  const backgroundImageUrl =
    "https://placehold.co/1920x1080/a9a9a9/fefefe?text=Carmel's+Artwork";

  return (
    <div
      className="relative bg-cover bg-center h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-off-white"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-dark-charcoal opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Transforming Spaces with Handcrafted Art.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Custom murals and unique pottery, designed for your vision.
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
