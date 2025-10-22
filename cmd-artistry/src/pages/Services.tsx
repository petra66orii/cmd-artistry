import React, { useState, useEffect } from "react";
import { fetchServices, Service } from "../services/api.ts";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner.tsx";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const getServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError("Could not load services. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-off-white via-pastel-pink/10 to-pastel-lime/10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8 text-red-500 bg-gradient-to-br from-off-white via-pastel-pink/10 to-pastel-lime/10">
        {error}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8 text-gray-500 bg-gradient-to-br from-off-white via-pastel-pink/10 to-pastel-lime/10">
        No services have been added yet.
      </div>
    );
  }

  const currentService = services[currentIndex];

  const slideVariants: Variants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    visible: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 40, damping: 20 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div className="relative bg-gradient-to-br from-off-white via-pastel-pink/10 to-pastel-lime/10 min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 px-4">
      {/* --- Page Header --- */}
      <div className="text-center mb-8 md:mb-12 relative z-10">
        <span className="block bg-pastel-lime/40 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full w-max mx-auto">
          Services Menu
        </span>
        <h1 className="text-4xl md:text-5xl font-cursive text-dark-charcoal">
          Our Services
        </h1>
      </div>

      {/* --- Slider Container --- */}
      <div className="relative h-[70vh] md:h-[550px] w-full max-w-5xl flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute w-full h-full"
          >
            {/* --- RESPONSIVE LAYOUT --- */}
            <div className="h-full flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-center px-4">
              {/* --- Text Container Wrapper --- */}
              <div className="w-full h-1/2 md:h-full flex items-center justify-center order-2 md:order-1 md:pr-12">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-full w-full max-w-[300px] sm:max-w-xs md:max-w-md lg:max-w-lg aspect-square p-6 flex flex-col items-center justify-center text-center shadow-lg gap-2 sm:gap-4"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold font-cursive text-dark-charcoal">
                    {currentService.title}
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base max-w-xs">
                    {currentService.summary}
                  </p>
                  <a
                    href={`/services/${currentService.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-dark-charcoal text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:bg-pastel-beige hover:text-dark-charcoal transition-colors duration-300 group"
                  >
                    Learn More
                    <span
                      aria-hidden
                      className="text-lg transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </a>
                </motion.div>
              </div>

              {/* --- Image Container --- */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full h-1/2 md:h-full relative order-1 md:order-2 md:pl-12 flex items-center justify-center p-4"
              >
                {currentService.image ? (
                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-pastel-beige rounded-2xl flex items-center justify-center text-dark-charcoal/50 shadow-xl p-4">
                    No Image Available
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* --- Navigation Buttons --- */}
        <div className="absolute top-1/2 left-2 md:-left-4 transform -translate-y-1/2 z-20">
          <button
            onClick={handlePrev}
            className="text-dark-charcoal transition-opacity duration-300 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-pink rounded-md"
            aria-label="Previous service"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <div className="absolute top-1/2 right-2 md:-right-4 transform -translate-y-1/2 z-20">
          <button
            onClick={handleNext}
            className="text-dark-charcoal transition-opacity duration-300 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-pink rounded-md"
            aria-label="Next service"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
