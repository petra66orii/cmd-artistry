import React from "react";
import NewsletterSignup from "./NewsletterSignup";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-charcoal text-off-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Info & Socials */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold">CMD Artistry</h3>
          <p className="text-pastel-beige my-2">
            Transforming Spaces with Handcrafted Art
          </p>
          <div className="flex justify-center md:justify-start space-x-6 mt-4">
            <a href="#" className="hover:text-pastel-pink">
              Instagram
            </a>
            <a href="#" className="hover:text-pastel-pink">
              Facebook
            </a>
          </div>
        </div>

        {/* Right Side: Newsletter Signup */}
        <div>
          <NewsletterSignup /> {/* <-- Add the component here */}
        </div>
      </div>
      <div className="border-t border-gray-700 pt-6 mt-8 text-center">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} CMD Artistry. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
