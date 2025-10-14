import React, { useState, useEffect } from "react";
import { fetchGalleryItems, GalleryItem } from "../services/api";

const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGalleryItems();
        setItems(data);
      } catch (err) {
        setError("Could not load artwork. Please try again later.");
        console.error(err); // Log the actual error for debugging
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []); // The empty array ensures this effect runs only once

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">Loading artwork...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-off-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-dark-charcoal">
          Gallery
        </h1>
        {items.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No artwork has been added yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:-translate-y-2"
              >
                <div className="overflow-hidden h-64">
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
    </div>
  );
};

export default GalleryPage;
