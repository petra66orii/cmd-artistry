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
    <section className="bg-off-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-charcoal mb-2">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-12">Artistry in Paint & Clay</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-dark-charcoal mb-4">
                {service.title}
              </h3>
              {/* Using the 'summary' field from your API */}
              <p className="text-gray-700 mb-6">{service.summary}</p>
              <a
                // Using the 'slug' for the dynamic link
                href={`/services/${service.slug}`}
                className="text-pastel-pink font-bold hover:underline"
              >
                Learn More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
