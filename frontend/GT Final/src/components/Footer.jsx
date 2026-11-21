import React, { useState } from 'react';

export default function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        
        {/* Main Footer Row */}
        <div className="footer-main-row">
          <div className="footer-brand-col">
            <div className="footer-logo-group">
              <div className="logo-icon-box small">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="3" stroke="#B8A678" strokeWidth="2.5" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="#B8A678" strokeWidth="2" />
                </svg>
              </div>
              <span className="footer-brand-title">PixelProof</span>
            </div>
            <p className="footer-tagline">AI Image Authenticity Detection</p>
          </div>

          <nav className="footer-nav-col" aria-label="Footer Navigation">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-link">
              Home
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="footer-link">
              How It Works
            </button>
            <button onClick={() => scrollTo('features')} className="footer-link">
              Features
            </button>
            <button onClick={() => scrollTo('about')} className="footer-link">
              About
            </button>
            <button onClick={() => setShowPrivacyModal(true)} className="footer-link">
              Privacy
            </button>
          </nav>
        </div>

        {/* Global Disclaimer */}
        <div className="footer-disclaimer-box">
          <p>
            <strong>Notice:</strong> AI detection is probabilistic. Results should be treated as an indication rather than definitive proof of an image’s origin.
          </p>
        </div>

        {/* Copyright */}
        <div className="footer-bottom-row">
          <p className="copyright-text">© 2026 PixelProof. All rights reserved.</p>
          <span className="footer-subtext">Engineered for clean, minimal image verification.</span>
        </div>

      </div>

      {/* Simple Privacy Notice Modal */}
      {showPrivacyModal && (
        <div className="privacy-modal-overlay" onClick={() => setShowPrivacyModal(false)}>
          <div className="privacy-modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Privacy Policy & Image Handling</h3>
            <div className="modal-content">
              <p>
                PixelProof is designed with privacy principles in mind. In this client-side preview, your uploaded images are rendered strictly in your browser memory and are not uploaded to any remote server.
              </p>
              <p>
                When connected to the production inference backend (<code>POST /api/predict</code>), uploaded image streams will only be retained in volatile memory during feature extraction and neural inference, and discarded immediately after classification results are returned.
              </p>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="btn btn-primary btn-sm"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
