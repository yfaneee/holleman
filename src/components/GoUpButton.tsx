import React, { useState, useEffect } from 'react';
import './GoUpButton.css';

const GoUpButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 300px
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button 
      className="go-up-button"
      onClick={scrollToTop}
      aria-label="Go to top"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6z"/>
      </svg>
    </button>
  );
};

export default GoUpButton;
