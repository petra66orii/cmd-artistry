import React, { useState, useEffect } from "react";
import { fetchGalleryItems, GalleryItem } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import Lightbox from "../components/Lightbox";

const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all"); // State for the filter

  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGalleryItems(filter); // Pass the filter to the API call
        setItems(data);
      } catch (err) {
        setError("Could not load artwork. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, [filter]); // Re-run the effect when the filter changes

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

  return (
    <div className="bg-gradient-to-b from-off-white via-pastel-pink/25 to-off-white min-h-screen">
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

        {/* --- FILTER BUTTONS --- */}
        <div className="flex justify-center gap-4 mb-12">
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
          <div className="text-center text-gray-500">
            <p>
              No artwork has been added for this category yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer" // <-- Add cursor-pointer
                onClick={() =>
                  setSelectedImage({ url: item.image, title: item.title })
                } // <-- 3. Set the selected image on click
              >
                <div className="overflow-hidden h-72">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-dark-charcoal">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedImage && (
        <Lightbox
          imageUrl={selectedImage.url}
          altText={selectedImage.title}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default GalleryPage;
