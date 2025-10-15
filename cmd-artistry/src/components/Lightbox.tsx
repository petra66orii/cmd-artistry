import React, { useEffect } from "react";

interface LightboxProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageUrl, altText, onClose }) => {
  // Effect to handle the 'Escape' key press to close the lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-dark-charcoal/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose} // Close when clicking the backdrop
      role="dialog"
      aria-modal="true"
    >
      {/* Image Container */}
      <div
        className="relative max-w-4xl max-h-[90vh] bg-white p-2 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
      >
        <img
          src={imageUrl}
          alt={altText}
          className="max-w-full max-h-[85vh] object-contain"
        />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close image view"
        className="absolute top-4 right-4 text-white hover:text-pastel-pink transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Lightbox;
