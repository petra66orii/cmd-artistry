// src/pages/Services.tsx

import React, { useState, useEffect } from "react";
import { fetchServices, Service } from "../services/api";

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div className="text-center p-8">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-off-white via-pastel-beige/25 to-off-white min-h-screen">
      <div className="container mx-auto p-8">
        <span className="block text-center bg-pastel-lime/40 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full w-max mx-auto">
          Services Menu
        </span>
        <h1 className="text-4xl md:text-5xl font-cursive text-center mb-6 text-dark-charcoal">
          Our Services
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore bespoke murals, ceramics, and creative collaborations designed
          to bring color and texture to your world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-pastel-lime/40 border border-gray-200/70 p-8 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-dark-charcoal mb-4">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-6 flex-grow">{service.summary}</p>
              <a
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
      </div>
    </div>
  );
};

export default ServicesPage;
