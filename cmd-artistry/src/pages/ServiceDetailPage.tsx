import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchServiceBySlug, Service } from "../services/api";
import AnimatedBackground from "../components/AnimatedBackground";
import LoadingSpinner from "../components/LoadingSpinner";

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      // Don't fetch if slug is not available
      setLoading(false);
      setError("Service not found.");
      return;
    }

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
    return (
      <div className="flex justify-center items-center min-h-screen bg-off-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!service) {
    return <div className="text-center p-8">Service not found.</div>;
  }

  return (
    <div className="bg-off-white min-h-screen">
      {/* --- 1. Wavy Hero Section --- */}
      <div className="relative overflow-hidden shadow-lg">
        <AnimatedBackground className="absolute inset-0 w-full h-full object-cover z-0 opacity-70" />
        <div className="relative z-10 container mx-auto max-w-4xl py-20 md:py-28 text-center">
          <span className="inline-block bg-white/80 backdrop-blur-sm text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
            Bespoke Service
          </span>
          <h1 className="text-4xl md:text-5xl font-cursive text-dark-charcoal mb-6">
            {service.title}
          </h1>
        </div>
      </div>

      {/* --- 2. Two-Column Content Section --- */}
      <div className="container mx-auto max-w-6xl p-4 md:p-8 -mt-16 relative z-20">
        <div className="md:flex md:gap-8">
          {/* --- Left Column: Description --- */}
          <div className="md:w-2/3 bg-white p-6 md:p-10 rounded-lg shadow-xl mb-8 md:mb-0">
            <div
              className="prose lg:prose-xl text-gray-700"
              dangerouslySetInnerHTML={{ __html: service.detailed_description }}
            ></div>
          </div>
          <div className="md:w-1/3">
            <div className="sticky top-28">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              ) : (
                <p className="text-gray-500">
                  No image available for this service.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. CTA Section --- */}
      <div className="container mx-auto max-w-4xl p-8 mt-12">
        <div className="border-t border-pastel-pink/40 py-8 text-center">
          <h3 className="text-2xl font-bold text-dark-charcoal">
            Interested in this Service?
          </h3>
          <p className="text-lg my-4 text-gray-600">
            All services are quotation-based to best suit your unique vision.
            Get in touch to discuss your project!
          </p>
          <a
            href="/contact"
            className="inline-block bg-pastel-pink text-dark-charcoal font-bold py-3 px-8 rounded-2xl text-lg hover:bg-pastel-beige transition-colors duration-300 shadow-sm"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
