import React from "react";

// Mock data for the services. We will fetch this from the API later.
const services = [
  {
    title: "Mural Painting",
    description:
      "Transform your home or business with a unique, hand-painted mural, bringing your vision to life.",
    link: "/services/mural-painting",
  },
  {
    title: "Sign Writing",
    description:
      "Elevate your brand with custom, hand-painted signs that capture your unique character and style.",
    link: "/services/sign-writing",
  },
  {
    title: "Pottery Classes",
    description:
      "Unleash your creativity with hands-on pottery classes for groups or one-on-one sessions.",
    link: "/services/pottery-classes",
  },
];

const ServicesHighlight: React.FC = () => {
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
              key={service.title}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-dark-charcoal mb-4">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-6">{service.description}</p>
              <a
                href={service.link}
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
