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
    <div className="bg-off-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-dark-charcoal">
          Our Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-dark-charcoal mb-4">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-6 flex-grow">{service.summary}</p>
              <a
                href={`/services/${service.slug}`}
                className="text-pastel-pink font-bold hover:underline mt-auto"
              >
                Learn More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
