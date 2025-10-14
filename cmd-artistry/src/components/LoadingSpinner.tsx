import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="w-12 h-12 rounded-full animate-spin
      border-4 border-solid border-pastel-pink border-t-transparent"
      role="status"
      aria-label="loading"
    ></div>
  );
};

export default LoadingSpinner;
