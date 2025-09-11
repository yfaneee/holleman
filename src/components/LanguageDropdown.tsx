import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import './LanguageDropdown.css';

const LanguageDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage, supportedLanguages, isTranslating } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language: Language) => {
    changeLanguage(language.code);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="language-dropdown" ref={dropdownRef}>
      <div className="language-selector" onClick={toggleDropdown}>
        <img 
          src={currentLanguage.flag} 
          alt={currentLanguage.name} 
          className="flag-image"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            (e.target as HTMLImageElement).src = '/images/RO.webp';
          }}
        />
        {isTranslating ? (
          <span className="loading-spinner">⏳</span>
        ) : (
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        )}
      </div>
      
      {isOpen && (
        <div className="language-dropdown-menu">
          {supportedLanguages.map((language) => (
            <div
              key={language.code}
              className={`language-option ${currentLanguage.code === language.code ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(language)}
            >
              <img 
                src={language.flag} 
                alt={language.name} 
                className="flag-image-small"
                onError={(e) => {
                  // Fallback to Romanian flag if image fails to load
                  (e.target as HTMLImageElement).src = '/images/RO.webp';
                }}
              />
              <span className="language-name">{language.nativeName}</span>
              {currentLanguage.code === language.code && (
                <span className="checkmark">✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
