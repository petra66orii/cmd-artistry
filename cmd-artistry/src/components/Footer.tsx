import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-charcoal text-off-white py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold">CMD Artistry</h3>
          <p className="text-pastel-beige">
            Transforming Spaces with Handcrafted Art
          </p>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          {/* Add social media links here once they are confirmed */}
          <a href="#" className="hover:text-pastel-pink">
            Instagram
          </a>
          <a href="#" className="hover:text-pastel-pink">
            Facebook
          </a>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} CMD Artistry. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
