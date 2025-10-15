import React from "react";
import profileImageUrl from "../assets/images/about-me-portrait.jpg";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-off-white via-pastel-pink/30 to-pastel-beige/20 text-dark-charcoal">
      <div className="container mx-auto max-w-4xl p-8 md:p-12">
        <div className="text-center mb-12">
          <span className="inline-block bg-pastel-beige/50 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
            Meet Carmel
          </span>
          <h1 className="text-4xl md:text-5xl font-cursive mb-2">About Me</h1>
          <p className="text-lg text-gray-700">Artist & Maker</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
          <div className="w-full md:w-1/3">
            <img
              src={profileImageUrl}
              alt="Carmel, the artist"
              className="rounded-[2rem] shadow-lg border-4 border-pastel-pink/60 w-full h-auto object-cover"
            />
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg mb-4">
              Hello, and welcome. I’m Carmel, a mural artist and potter with a
              lifelong passion for transforming spaces and creating with my
              hands. For me, art is about connection—connecting with a vision,
              with the clay, and with the people who will enjoy the final piece
              for years to come.
            </p>
            <p className="text-lg">
              My journey is grounded in a formal education in both art and
              community. I hold an Honours degree in Ceramic Art and Design from
              ATU Sligo and a degree in Youth and Community Development from NUI
              Galway. This blend of creative skill and a passion for people is
              the foundation of everything I do.
            </p>
          </div>
        </div>

        <div className="bg-off-white/85 backdrop-blur-sm border border-pastel-pink/40 rounded-3xl p-10 shadow-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-dark-charcoal">
            My Journey
          </h2>
          <p className="text-lg mb-4">
            While my formal ceramics training has shaped my hands-on craft, my
            painting experience spans over two decades, allowing me to work on
            projects of every scale.
          </p>
          <p className="text-lg mb-8">
            This path has taken me across the globe. As part of my degree, I had
            the incredible opportunity to study at the National Academy of Art
            in Sofia, Bulgaria, immersing myself in different traditions. My
            passion for sharing art has led me to work in amazing creative
            environments, from Driving Creek Railway and Potteries in New
            Zealand to the vibrant Long Lake Camp for the Arts in New York. I've
            also had the privilege of connecting art with community, working
            with young people at Youth Work Ireland and the Villa Elba Youth
            Center in Finland.
          </p>
          <p className="text-lg text-center font-semibold text-dark-charcoal">
            Whether I’m on a scaffold bringing a mural to life or at the wheel
            shaping clay, my goal is always the same: to create something
            unique, meaningful, and handcrafted with care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
