import React, { useState } from "react";

/**
 * A reusable navigation link component with a center-expanding underline effect
 * on hover. Tailored for the dark-background navbar.
 *
 * @param {object} props
 * @param {string} props.href - The URL the link should point to.
 * @param {React.ReactNode} props.children - The text or content of the link.
 */
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="relative inline-block py-1 px-1 text-lg transition-colors duration-300 hover:text-pastel-pink group"
  >
    {children}

    <span
      className="absolute bottom-0 left-1/2 block h-[2px] w-0 -translate-x-1/2 bg-pastel-pink transition-all duration-300 group-hover:w-full"
      aria-hidden="true"
    ></span>
  </a>
);

const Navbar: React.FC = () => {
  // State to track if the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark-charcoal/95 backdrop-blur text-off-white p-2 border-b border-pastel-pink/40 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          aria-label="CMD Artistry Home"
          className="flex items-center gap-3"
        >
          <img
            src="/cmd-new-logo.png"
            alt="CMD Artistry Logo"
            className="h-16 w-auto hover:text-pastel-pink transition-colors duration-300"
          />
          <span className="text-lg font-cursive text-off-white hover:text-pastel-pink transition-colors duration-300">
            CMD Artistry
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/gallery">Gallery</NavLink>
          </li>
          <li>
            <NavLink href="/services">Services</NavLink>
          </li>
          <li>
            <NavLink href="/about">About</NavLink>
          </li>
        </ul>

        {/* Desktop Contact Button */}
        <a
          href="/contact"
          className="hidden md:block bg-pastel-pink text-dark-charcoal font-bold text-lg py-2 px-4 rounded-full hover:bg-pastel-beige transition-colors duration-300 shadow-sm"
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
