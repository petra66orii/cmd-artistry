import React, { useState } from "react";

// Mock data for testimonials. We will fetch this from the API later.
const testimonials = [
  {
    quote:
      "The mural is absolutely stunning! Carmel was a true professional and perfectly captured the vision we had for our space.",
    author: "Jane Doe",
    title: "Homeowner, Galway",
  },
  {
    quote:
      "Our hand-painted sign is a work of art. The craftsmanship and attention to detail are second to none.",
    author: "John Smith",
    title: "Owner, The Corner Cafe",
  },
  {
    quote:
      "We had the best time in our pottery class! Carmel is a wonderful teacher, making the session so fun and easy to follow.",
    author: "Emily White",
    title: "Workshop Attendee",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
                <div
                  key={testimonial.author}
                  className="w-full flex-shrink-0 px-8"
                >
                  <p className="text-xl italic text-dark-charcoal mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-bold text-dark-charcoal">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-600">{testimonial.title}</p>
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
