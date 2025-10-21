import AnimatedBackground from "./AnimatedBackground";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      ref={heroRef}
      className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-off-white overflow-hidden"
    >
      <motion.div className="absolute inset-0 w-full h-full z-0" style={{ y }}>
        <AnimatedBackground className="absolute inset-0 w-full h-full object-cover" />
      </motion.div>

      <div className="relative z-10 p-6 md:p-10 max-w-3xl">
        <span className="inline-block bg-off-white/80 text-dark-charcoal font-semibold tracking-[0.35em] uppercase text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
          CMD Artistry Studio
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-cursive font-bold leading-tight mb-4"
        >
          Transforming Spaces with Handcrafted Art.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl mb-8"
        >
          Custom murals and unique pottery, designed for your vision.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <a
            href="/gallery"
            className="bg-dark-charcoal text-pastel-pink font-bold py-3 px-8 rounded-full text-lg hover:bg-dark-charcoal/80 transition-colors"
          >
            View My Work
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
