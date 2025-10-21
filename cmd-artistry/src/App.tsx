import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import AboutPage from "./pages/AboutMe";
import ServicesPage from "./pages/Services";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/Contact";
import GalleryPage from "./pages/GalleryPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import BackToTopButton from "./components/BackToTopButton";
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <Router>
      <div className="relative">
        <motion.div
          className="fixed inset-0 bg-off-white bg-watercolor z-0"
          style={{ y }}
        />
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
          <Navbar />
          <Breadcrumbs />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <BackToTopButton />
        </div>
      </div>
    </Router>
  );
};

export default App;
