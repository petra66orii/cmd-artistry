import React, { useState, useEffect } from "react";
import { fetchServices, Service } from "../services/api";

const ServicesHighlight: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-off-white via-pastel-beige/30 to-off-white py-20 px-4">
      <div className="container mx-auto text-center">
        <span className="inline-block bg-pastel-pink/30 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
          Signature Services
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-dark-charcoal mb-2">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-12">Artistry in Paint & Clay</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-off-white border border-gray-200 p-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col text-left"
            >
              <h3 className="text-2xl font-bold text-dark-charcoal mb-4">
                {service.title}
              </h3>
              {/* Using the 'summary' field from your API */}
              <p className="text-gray-700 mb-6">{service.summary}</p>
              <a
                // Using the 'slug' for the dynamic link
                href={`/services/${service.slug}`}
                className="mt-auto inline-flex items-center gap-2 text-pastel-pink font-bold transition-colors duration-300 hover:text-pastel-beige"
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
    </section>
  );
};

export default ServicesHighlight;
