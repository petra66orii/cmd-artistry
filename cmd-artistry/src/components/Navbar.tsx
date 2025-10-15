import React, { useState } from "react";

const Navbar: React.FC = () => {
  // State to track if the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark-charcoal/95 backdrop-blur text-off-white p-4 border-b border-pastel-pink/40 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-cursive">
          <a href="/">CMD Artistry</a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="/" className="hover:text-pastel-pink">
              Home
            </a>
          </li>
          <li>
            <a href="/gallery" className="hover:text-pastel-pink">
              Gallery
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-pastel-pink">
              Services
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-pastel-pink">
              About
            </a>
          </li>
        </ul>

        {/* Desktop Contact Button */}
        <a
          href="/contact"
          className="hidden md:block bg-pastel-pink text-dark-charcoal font-bold py-2 px-4 rounded-full hover:bg-pastel-beige transition-colors duration-300 shadow-sm"
        >
          Contact
        </a>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              // X Icon
              <svg
                className="w-6 h-6"
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
            ) : (
              // Hamburger Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel with Transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 items-center py-4">
          <li>
            <a href="/" className="hover:text-pastel-pink">
              Home
            </a>
          </li>
          <li>
            <a href="/gallery" className="hover:text-pastel-pink">
              Gallery
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-pastel-pink">
              Services
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-pastel-pink">
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="bg-pastel-pink text-dark-charcoal font-bold py-2 px-4 rounded-full hover:bg-pastel-beige w-full text-center transition-colors duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
