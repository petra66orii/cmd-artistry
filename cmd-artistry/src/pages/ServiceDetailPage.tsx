import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchServiceBySlug, Service } from "../services/api";

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Get the slug from the URL
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return; // Don't fetch if slug is not available

    const getService = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchServiceBySlug(slug);
        setService(data);
      } catch (err) {
        setError("Could not find the requested service.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getService();
  }, [slug]); // Rerun the effect if the slug changes

  if (loading) {
    return <div className="text-center p-8">Loading service details...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!service) {
    return null; // Or a "Not Found" message
  }

  return (
    <div className="bg-gradient-to-b from-off-white via-pastel-beige/20 to-pastel-pink/20 min-h-screen">
      <div className="container mx-auto max-w-4xl p-8">
        {/* Optional: Display the service image as a header */}
        {service.image && (
          <div className="mb-8">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        <span className="inline-block bg-pastel-pink/40 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
          Bespoke Service
        </span>
        <h1 className="text-4xl md:text-5xl font-cursive text-dark-charcoal mb-6">
          {service.title}
        </h1>

        {/* Render the detailed description */}
        <div
          className="prose lg:prose-xl text-gray-700 bg-off-white/90 backdrop-blur-sm border border-pastel-pink/40 rounded-2xl p-8 shadow-md"
          dangerouslySetInnerHTML={{ __html: service.detailed_description }}
        >
          {/* This will render HTML if you decide to use a rich text editor in Django admin later */}
        </div>

        <div className="mt-12 border-t border-pastel-pink/40 pt-8 text-center">
          <h3 className="text-2xl font-bold text-dark-charcoal">
            Interested in this Service?
          </h3>
          <p className="text-lg my-4 text-gray-600">
            All services are quotation-based to best suit your unique vision.
            Get in touch to discuss your project!
          </p>
          <a
            href="/contact"
            className="bg-pastel-pink text-dark-charcoal font-bold py-3 px-8 rounded text-lg hover:bg-pastel-beige transition-colors duration-300"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
