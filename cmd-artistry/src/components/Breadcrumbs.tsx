import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  // Don't render breadcrumbs on the homepage
  if (location.pathname === "/") {
    return null;
  }

  // Split the path into segments, filtering out any empty strings
  const pathnames = location.pathname.split("/").filter((x) => x);

  let currentLink = "";

  // Function to capitalize and format the path segment for display
  const formatCrumb = (str: string) => {
    return str
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

  return (
    <nav aria-label="breadcrumb" className="bg-gray-100 py-3 px-4 md:px-8">
      <ol className="flex items-center text-sm text-gray-600 container mx-auto">
        <li>
          <Link to="/" className="hover:text-pastel-pink hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          currentLink += `/${name}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={currentLink} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span
                  className="text-dark-charcoal font-bold"
                  aria-current="page"
                >
                  {formatCrumb(name)}
                </span>
              ) : (
                <Link
                  to={currentLink}
                  className="hover:text-pastel-beige hover:underline"
                >
                  {formatCrumb(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
