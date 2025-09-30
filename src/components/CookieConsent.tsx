import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    // Reload to enable Google Maps and other services
    window.location.reload();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        <div className="cookie-content">
          <div className="cookie-icon">🍪</div>
          <div className="cookie-text">
            <h3>Folosim cookies</h3>
            <p>
              Utilizăm cookie-uri pentru a îmbunătăți experiența ta pe site-ul nostru. 
              Acestea ne ajută să afișăm hărți interactive și să analizăm traficul. 
              Prin acceptare, ești de acord cu <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Politica de confidențialitate</a>.
            </p>
          </div>
        </div>
        <div className="cookie-buttons">
          <button className="cookie-btn cookie-reject" onClick={handleReject}>
            Refuz
          </button>
          <button className="cookie-btn cookie-accept" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
