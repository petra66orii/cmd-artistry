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
      <section className="bg-pastel-beige py-16 px-4">
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
    <section className="bg-pastel-beige py-16 px-4">
      <div className="container mx-auto text-center">
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
                  <p className="text-xl italic text-dark-charcoal mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-bold text-dark-charcoal">
                    {testimonial.author_name}
                  </p>
                  <p className="text-gray-600">
                    {testimonial.company_or_title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white transition"
          >
            &larr;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white transition"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
