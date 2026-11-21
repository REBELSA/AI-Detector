import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main id="main-content">
        {/* 1. Hero with abstract neural analysis visual */}
        <Hero />

        {/* 2. Primary Image Upload & Detection Engine */}
        <UploadSection />

        {/* 3. Three-step verification workflow */}
        <HowItWorks />

        {/* 4. Minimal Features grid */}
        <Features />

        {/* 5. Technology & TensorFlow/Keras roadmap */}
        <About />
      </main>

      {/* Footer with links and disclaimer */}
      <Footer />
    </div>
  );
}
