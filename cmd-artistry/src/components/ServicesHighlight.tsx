import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchServices, Service } from "../services/api"; // Placeholders below
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- Framer Motion Variants for the new slider ---
const slideVariants: Variants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  visible: {
    x: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 40, damping: 20 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

const ServicesHighlight: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const getServices = async () => {
      try {
        // Fetch only the first 3 services for the highlight section
        const allServices = await fetchServices();
        setServices(allServices.slice(0, 3));
      } catch (err) {
        setError("Could not load services.");
        console.error(err);
      }
    };
    getServices();
  }, []);

  // --- NEW HANDLERS for the mobile slider ---
  const handleNext = () => {
    if (services.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const handlePrev = () => {
    if (services.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  if (error) {
    return null;
  }

  // Don't render anything if services haven't loaded
  if (services.length === 0) {
    return (
      <div className="container mx-auto text-center">
        {/* You could put a simple loader here while fetching */}
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-pastel-pink/60 via-off-white to-pastel-lime/60 py-20 px-4"
    >
      <div className="container mx-auto text-center">
        <span className="inline-block bg-pastel-pink/30 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
          Signature Services
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-dark-charcoal mb-2">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-12">Artistry in Paint & Clay</p>

        {/* --- 1. DESKTOP GRID (Hidden on mobile) --- */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-pastel-pink/50 border border-gray-200 p-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col text-left"
            >
              <h3 className="text-2xl font-bold text-dark-charcoal mb-4">
                {service.title}
              </h3>
              {/* Using the 'summary' field from your API */}
              <p className="text-gray-700 mb-6">{service.summary}</p>
              <a
                // Using the 'slug' for the dynamic link
                href={`/services/${service.slug}`}
                className="mt-auto inline-flex items-center gap-2 text-dark-charcoal font-bold transition-colors duration-300 hover:text-pastel-beige"
              >
                Learn More
                <span aria-hidden className="text-lg">
                  &rarr;
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* --- 2. NEW MOBILE SLIDER (Hidden on desktop) --- */}
        <div className="md:hidden relative max-w-lg mx-auto">
          {/* --- Navigation Buttons (like Testimonials) --- */}
          <button
            onClick={handlePrev}
            aria-label="Previous service"
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full bg-off-white text-dark-charcoal hover:bg-pastel-lime/40 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pastel-pink z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next service"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full bg-off-white text-dark-charcoal hover:bg-pastel-lime/40 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pastel-pink z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* --- AnimatePresence Slider --- */}
          <div className="overflow-hidden relative min-h-[420px] flex items-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full"
              >
                <div className="bg-pastel-pink/50 border border-gray-200 p-8 rounded-xl shadow-md flex flex-col text-left">
                  <h3 className="text-2xl font-bold text-dark-charcoal mb-4">
                    {services[currentIndex].title}
                  </h3>
                  <p className="text-gray-700 mb-6 flex-grow">
                    {services[currentIndex].summary}
                  </p>
                  <a
                    href={`/services/${services[currentIndex].slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-dark-charcoal font-bold transition-colors duration-300 hover:text-pastel-beige"
                  >
                    Learn More
                    <span aria-hidden className="text-lg">
                      &rarr;
                    </span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesHighlight;
