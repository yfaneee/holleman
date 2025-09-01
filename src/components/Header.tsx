import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownHover = (item: string) => {
    setActiveDropdown(item);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToDespreNoi = () => {
    navigate('/despre-noi');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo and Navigation Group */}
        <div className="logo-nav-group">
          {/* Logo Section */}
          <div className="logo" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
            <img src="/images/Rectangle.webp" alt="HOLLEMAN Logo" className="logo-image" />
          </div>

          {/* Navigation Menu */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <div className="nav-item" onClick={navigateToHome}>
              <span>ACASA</span>
            </div>
            <div className="nav-item" onClick={navigateToDespreNoi}>
              <span>DESPRE NOI</span>
            </div>
            
            <div 
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownHover('servicii')}
              onMouseLeave={handleDropdownLeave}
            >
              <span>SERVICII</span>
              <span className="dropdown-arrow">▼</span>
              {activeDropdown === 'servicii' && (
                <div className="dropdown-menu" role="menu">
                  <a href="/project-cargo" role="menuitem" aria-label="Servicii Project Cargo - transport agabaritic">Project Cargo</a>
                  <a href="/heavy-lift" role="menuitem" aria-label="Servicii Heavy Lift - relocări industriale">Heavy Lift</a>
                  <a href="/itl" role="menuitem" aria-label="Inter Trans Logistics - transport internațional">ITL</a>
                  <a href="/agro" role="menuitem" aria-label="Holleman Agro - servicii agricole">Holleman Agro</a>
                </div>
              )}
            </div>
            
            <div className="nav-item">
              <span>CARIERE</span>
            </div>
            
            <div 
              className="nav-item dropdown"
              onMouseEnter={() => handleDropdownHover('proiecte')}
              onMouseLeave={handleDropdownLeave}
            >
              <span>PROIECTE</span>
              <span className="dropdown-arrow">▼</span>
              {activeDropdown === 'proiecte' && (
                <div className="dropdown-menu">
                  <a href="/proiecte">Portofoliu</a>
                  <a href="/galerie">Galerie</a>
                </div>
              )}
            </div>
            
            <div className="nav-item">
              <span>CONTACT</span>
            </div>
            <div className="nav-item">
              <span>BLOG</span>
            </div>
          </nav>
        </div>
        
        {/* Language Selector */}
        <div className="nav-item language-selector">
          <img src="/images/RO.webp" alt="Romania" className="flag-image" />
          <span className="dropdown-arrow">▼</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
