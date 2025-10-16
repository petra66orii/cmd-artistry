import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-6xl md:text-9xl font-bold text-pastel-beige">404</h1>
      <h2 className="text-2xl md:text-4xl font-bold text-dark-charcoal mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-4 max-w-md">
        Oops! Looks like you cracked this pot.
      </p>
      <Link
        to="/"
        className="mt-8 bg-dark-charcoal text-white font-bold py-3 px-8 rounded-lg hover:bg-pastel-beige hover:text-dark-charcoal transition-colors duration-300"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
