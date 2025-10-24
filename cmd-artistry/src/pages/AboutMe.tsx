import React from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import profileImageUrl from "../assets/images/about-me-portrait.jpg";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-off-white min-h-screen">
      {/* --- 1. Wavy Hero Section --- */}
      <div className="relative overflow-hidden shadow-lg">
        <AnimatedBackground className="absolute inset-0 w-full h-full object-cover z-0 opacity-70" />
        <div className="relative z-10 container mx-auto max-w-4xl py-20 md:py-28 text-center">
          <span className="inline-block bg-white/80 backdrop-blur-sm text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
            Meet Carmel
          </span>
          <h1 className="text-4xl md:text-5xl font-cursive text-dark-charcoal mb-2">
            About Me
          </h1>
          <p className="text-lg text-dark-charcoal/80 font-semibold">
            Artist & Maker
          </p>
        </div>
      </div>

      {/* --- 2. Main Content Card --- */}
      <div className="container mx-auto max-w-5xl p-4 md:p-8 -mt-16 relative z-20">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl">
          {/* --- Intro Section (Two-Column) --- */}
          <div className="md:flex md:gap-12 mb-12">
            {/* Image Column */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <img
                src={profileImageUrl}
                alt="Carmel, the artist"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            {/* Text Column */}
            <div className="w-full md:w-2/3">
              <p className="text-lg text-gray-700 mb-4">
                Hello, and welcome. I’m Carmel, a mural artist and potter with a
                lifelong passion for transforming spaces and creating with my
                hands. For me, art is about connection—connecting with a vision,
                with the clay, and with the people who will enjoy the final
                piece for years to come.
              </p>
              <p className="text-lg text-gray-700">
                My journey is grounded in a formal education in both art and
                community. I hold an Honours degree in Ceramic Art and Design
                from ATU Sligo and a degree in Youth and Community Development
                from NUI Galway. This blend of creative skill and a passion for
                people is the foundation of everything I do.
              </p>
            </div>
          </div>

          {/* --- "My Journey" Section (Full-Width) --- */}
          <div className="border-t border-pastel-pink/40 pt-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-dark-charcoal">
              My Journey
            </h2>
            <div className="prose lg:prose-lg max-w-none text-gray-700">
              <p>
                While my formal ceramics training has shaped my hands-on craft,
                my painting experience spans over two decades, allowing me to
                work on projects of every scale.
              </p>
              <p>
                This path has taken me across the globe. As part of my degree, I
                had the incredible opportunity to study at the National Academy
                of Art in Sofia, Bulgaria, immersing myself in different
                traditions. My passion for sharing art has led me to work in
                amazing creative environments, from Driving Creek Railway and
                Potteries in New Zealand to the vibrant Long Lake Camp for the
                Arts in New York. I've also had the privilege of connecting art
                with community, working with young people at Youth Work Ireland
                and the Villa Elba Youth Center in Finland.
              </p>
              <p className="text-center font-semibold text-dark-charcoal">
                Whether I’m on a scaffold bringing a mural to life or at the
                wheel shaping clay, my goal is always the same: to create
                something unique, meaningful, and handcrafted with care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
