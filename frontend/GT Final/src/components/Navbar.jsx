import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">

        {/* Brand */}
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="logo-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D3A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="12" cy="12" r="3" stroke="#B8A678" strokeWidth="2.5" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="#B8A678" strokeWidth="2" />
            </svg>
          </div>
          <span className="brand-name">PixelProof</span>
        </a>

        {/* Desktop Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('how-it-works')} className="nav-link">How It Works</button>
          <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('analyze-section')} className="btn btn-outline btn-sm nav-cta">
            Try Detection
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-links">
              <button onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mobile-nav-link">Home</button>
              <button onClick={() => scrollToSection('how-it-works')} className="mobile-nav-link">How It Works</button>
              <button onClick={() => scrollToSection('features')} className="mobile-nav-link">Features</button>
              <button onClick={() => scrollToSection('about')} className="mobile-nav-link">About</button>
            </div>
            <button onClick={() => scrollToSection('analyze-section')} className="btn btn-primary full-width">
              Try Detection
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
