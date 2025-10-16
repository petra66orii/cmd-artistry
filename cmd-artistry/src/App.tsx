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

function App() {
  return (
    <Router>
      <div className="relative flex min-h-screen flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-watercolor"
        />
        <Navbar />
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <BackToTopButton />
      </div>
    </Router>
  );
}

export default App;
