import React from "react";
import NewsletterSignup from "./NewsletterSignup";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-dark-charcoal to-[#040e11] text-off-white py-16 px-4 border-t border-pastel-pink/30">
      <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">CMD Artistry</h3>
          <p className="text-pastel-beige">
            Transforming spaces with handcrafted murals and ceramics tailored to
            your story.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="hover:text-pastel-pink transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-pastel-pink transition-colors duration-300"
            >
              Facebook
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-pastel-pink transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/gallery"
                className="hover:text-pastel-pink transition-colors duration-300"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="hover:text-pastel-pink transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-pastel-pink transition-colors duration-300"
              >
                About Me
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-pastel-pink transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="md:text-left">
          <NewsletterSignup />
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 mt-12 text-center text-sm text-gray-400">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} CMD Artistry. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
