import React, { useState, useEffect } from "react";
import { fetchTestimonials, Testimonial } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError("Could not load testimonials at this time.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTestimonials();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-pastel-pink/40 via-off-white to-pastel-lime/40 py-20 px-4">
        <div className="container mx-auto flex justify-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-pastel-pink/40 via-off-white to-pastel-lime/40 py-20 px-4">
      <div className="container mx-auto text-center">
        <span className="inline-block bg-pastel-lime/40 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
          Client Stories
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-dark-charcoal mb-12">
          What My Clients Say
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-8">
                  <div className="bg-white/80 backdrop-blur-sm border border-pastel-pink/40 rounded-3xl p-10 shadow-md">
                    <p className="text-xl italic text-dark-charcoal mb-4">
                      “{testimonial.quote}”
                    </p>
                    <p className="font-bold text-dark-charcoal">
                      {testimonial.author_name}
                    </p>
                    <p className="text-gray-600">
                      {testimonial.company_or_title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 p-3 rounded-full bg-off-white text-dark-charcoal hover:bg-pastel-lime/40 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
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

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 p-3 rounded-full bg-off-white text-dark-charcoal hover:bg-pastel-lime/40 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
