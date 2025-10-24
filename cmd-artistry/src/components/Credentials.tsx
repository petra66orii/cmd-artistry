import React from "react";
import { motion } from "framer-motion";

import atuLogo from "../assets/images/logos/atu-sligo-logo.png";
import nuigLogo from "../assets/images/logos/nuig-logo.png";
import nhaSofiaLogo from "../assets/images/logos/nha-bg-logo.png";
import villaElbaLogo from "../assets/images/logos/villa-elba-finland-logo.png";
import youthWorkLogo from "../assets/images/logos/youth-work-ireland-logo.png";
import longLakeLogo from "../assets/images/logos/long-lake-camps-ny-logo.png";
import drivingCreekLogo from "../assets/images/logos/driving-creek-railway-nz-logo.png";

const credentials = [
  { name: "ATU Sligo", logo: atuLogo },
  { name: "University of Galway", logo: nuigLogo },
  { name: "National Academy of Art, Sofia", logo: nhaSofiaLogo },
  { name: "Villa Elba Youth Center, Finland", logo: villaElbaLogo },
  { name: "Youth Work Ireland", logo: youthWorkLogo },
  { name: "Long Lake Camp for the Arts, NY", logo: longLakeLogo },
  { name: "Driving Creek, New Zealand", logo: drivingCreekLogo },
];

const Credentials: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-pastel-pink/60 via-off-white to-pastel-lime/60 py-20 px-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-dark-charcoal mb-4">
          Experience & Certifications
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Proud to have studied and collaborated with esteemed arts, youth, and
          community organizations at home and abroad.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-12 items-center">
          {credentials.map((cred) => (
            <div
              key={cred.name}
              className="flex flex-col items-center justify-center gap-4 group"
            >
              <div className="h-20 flex items-center">
                <img
                  src={cred.logo}
                  alt={cred.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-xs font-semibold text-gray-500 group-hover:text-dark-charcoal transition-colors">
                {cred.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Credentials;
