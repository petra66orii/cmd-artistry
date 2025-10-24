import React, { useState, useEffect } from "react";
import { fetchGalleryItems, GalleryItem } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

// --- CSS for the Marquee Animation ---
const marqueeStyles = `
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
@keyframes marquee-reverse {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}
.animate-marquee {
  display: flex;
  flex-shrink: 0;
  animation: marquee 40s linear infinite;
  will-change: transform; /* Performance hint */
}
.animate-marquee-reverse {
  display: flex;
  flex-shrink: 0;
  animation: marquee-reverse 40s linear infinite;
  will-change: transform; /* Performance hint */
}
/* Pause animation on hover */
.group-hover:hover .animate-marquee,
.group-hover:hover .animate-marquee-reverse {
  animation-play-state: paused;
}
`;

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
}
const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => (
  <div
    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
    onClick={onClose}
  >
    <style>{`
      .lightbox-content {
        animation: zoomIn 0.3s ease-out;
      }
      @keyframes zoomIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `}</style>
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      aria-label="Close lightbox"
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>

    <div
      className="lightbox-content bg-white rounded-lg shadow-2xl overflow-hidden max-w-3xl w-full"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the content
    >
      <div className="overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-h-[70vh] object-contain" // Use object-contain to see the whole image
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-dark-charcoal mb-2">
          {item.title}
        </h2>
        <p className="text-gray-700">{item.description}</p>
      </div>
    </div>
  </div>
);

interface ScrollingGalleryRowProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
  reverse?: boolean;
}
const ScrollingGalleryRow: React.FC<ScrollingGalleryRowProps> = ({
  items,
  onItemClick,
  reverse = false,
}) => {
  const animationClass = reverse
    ? "animate-marquee-reverse"
    : "animate-marquee";

  // Don't render the row if there are no items
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex overflow-hidden my-4 group-hover">
      <div className={animationClass}>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 mx-3 cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-64 w-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className={animationClass} aria-hidden="true">
        {items.map((item) => (
          <div
            key={`${item.id}-clone`}
            className="flex-shrink-0 mx-3 cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-64 w-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGalleryItems(filter);
        setItems(data);
      } catch (err) {
        setError("Could not load artwork. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, [filter]);

  const FilterButton: React.FC<{ category: string; label: string }> = ({
    category,
    label,
  }) => (
    <button
      onClick={() => setFilter(category)}
      className={`px-6 py-2 rounded-full font-bold transition-colors duration-300 ${
        filter === category
          ? "bg-dark-charcoal text-white"
          : "bg-white text-dark-charcoal hover:bg-pastel-beige"
      }`}
    >
      {label}
    </button>
  );

  const halfIndex = Math.ceil(items.length / 2);
  const itemsRow1 = items.slice(0, halfIndex);
  const itemsRow2 = items.slice(halfIndex);

  return (
    <div className="bg-gradient-to-b from-off-white via-pastel-pink/25 to-off-white min-h-screen">
      <style>{marqueeStyles}</style>
      <div className="container mx-auto p-8">
        <span className="block text-center bg-pastel-pink/40 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full w-max mx-auto">
          Curated Gallery
        </span>
        <h1 className="text-4xl font-bold text-center mb-4 text-dark-charcoal">
          Gallery
        </h1>
        <p className="text-center text-gray-600 mb-8">
          A collection of murals and pottery.
        </p>

        <div className="flex justify-center flex-wrap gap-4 mb-12">
          <FilterButton category="all" label="All" />
          <FilterButton category="MURAL" label="Murals" />
          <FilterButton category="POTTERY" label="Pottery" />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <h3 className="text-xl font-semibold text-dark-charcoal">
              Nothing to show... yet!
            </h3>
            <p className="text-gray-600 mt-2">
              No artwork has been added for this category. Check back soon!
            </p>
          </div>
        ) : (
          <div className="group-hover">
            <ScrollingGalleryRow
              items={itemsRow1}
              onItemClick={setSelectedImage}
            />
            <ScrollingGalleryRow
              items={itemsRow2}
              onItemClick={setSelectedImage}
              reverse={true}
            />
          </div>
        )}
      </div>

      {selectedImage && (
        <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default GalleryPage;
