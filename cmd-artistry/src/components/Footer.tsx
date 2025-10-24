import React from "react";
import NewsletterSignup from "./NewsletterSignup";
import { Link } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-charcoal text-off-white pt-16 pb-8 px-4 overflow-hidden">
      <AnimatedBackground className="absolute inset-0 w-full h-full object-cover z-0 opacity-50" />
      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About & Social */}
          <div>
            <a
              href="/"
              aria-label="CMD Artistry Home"
              className="flex items-center gap-3 mb-4"
            >
              <img
                src="/cmd-new-logo.png"
                alt="CMD Artistry Bird Logo"
                className="h-16 w-auto"
              />
              <span className="text-lg font-cursive text-off-white hover:text-pastel-pink transition-colors duration-300">
                CMD Artistry
              </span>
            </a>
            <p className="text-gray-100 my-4">
              Handcrafted murals and pottery, designed for your vision.
            </p>
            <div className="flex space-x-4">
              {/* Replace # with actual links */}
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pastel-pink transition-colors"
              >
                {/* Instagram Icon SVG */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  ...{" "}
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-pastel-pink transition-colors"
              >
                {/* Facebook Icon SVG */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  ...{" "}
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links & Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Explore</h4>
            <ul>
              <li className="mb-2">
                <Link to="/gallery" className="hover:text-pastel-pink">
                  Gallery
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="hover:text-pastel-pink">
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="hover:text-pastel-pink">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-pastel-pink">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">Contact Info</h4>
              <p className="text-gray-100">carmel.artist@email.com</p>
              <p className="text-gray-100">+353 12 345 6789</p>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Join The Newsletter</h4>
            <NewsletterSignup />
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} CMD Artistry. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
