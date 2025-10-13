import React from "react";
import Navbar from "./components/Navbar.tsx";
import HeroSection from "./components/home/HeroSection";

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* The rest of your page content will go here */}
      <main className="p-8">
        <h1 className="text-3xl font-bold">More content to come...</h1>
      </main>
    </div>
  );
}

export default App;
