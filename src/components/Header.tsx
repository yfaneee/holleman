import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import LanguageDropdown from './LanguageDropdown';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active nav item based on current path
  const getActiveNav = () => {
    const path = location.pathname;
    if (path === '/') return 'acasa';
    if (path === '/despre-noi') return 'despre-noi';
    if (path === '/cariere') return 'cariere';
    if (path === '/project-cargo' || path === '/heavy-lift' || path === '/itl' || path === '/portops') return 'servicii';
    if (path === '/proiecte' || path.startsWith('/proiecte/')) return 'proiecte';
    if (path === '/blog' || path.startsWith('/blog/')) return 'blog';
    if (path === '/contact') return 'contact';
    return '';
  };

  const activeNav = getActiveNav();

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

  const navigateToCariere = () => {
    navigate('/cariere');
  };

  const navigateToContact = () => {
    navigate('/contact');
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
            <div className={`nav-item ${activeNav === 'acasa' ? 'active' : ''}`} onClick={navigateToHome}>
              <span>ACASA</span>
            </div>
            <div className={`nav-item ${activeNav === 'despre-noi' ? 'active' : ''}`} onClick={navigateToDespreNoi}>
              <span>DESPRE NOI</span>
            </div>

            <div className={`nav-item ${activeNav === 'cariere' ? 'active' : ''}`} onClick={navigateToCariere}>
              <span>CARIERE</span>
            </div>

            <div 
              className={`nav-item dropdown ${activeNav === 'servicii' ? 'active' : ''}`}
              onMouseEnter={() => handleDropdownHover('servicii')}
              onMouseLeave={handleDropdownLeave}
            >
              <span>SERVICII</span>
              <span className="dropdown-arrow">▼</span>
              {activeDropdown === 'servicii' && (
                <div className="dropdown-menu" role="menu">
                  <a href="/project-cargo" role="menuitem" aria-label="Servicii Project Cargo - transport agabaritic">Project Cargo & Special Transport</a>
                  <a href="/heavy-lift" role="menuitem" aria-label="Servicii Heavy Lift - relocări industriale">Heavy Lift & Industrial Relocations</a>
                  <a href="/itl" role="menuitem" aria-label="Inter Trans Logistics - transport internațional">ITL Standard Transport</a>
                  <a href="/portops" role="menuitem" aria-label="Holleman Port Operations - operatiuni portuare">Port Operations</a>
                </div>
              )}
            </div>
            
            <div className={`nav-item ${activeNav === 'proiecte' ? 'active' : ''}`} onClick={() => navigate('/proiecte')}>
              <span>PROIECTE</span>
            </div>
            
            <div className={`nav-item ${activeNav === 'blog' ? 'active' : ''}`} onClick={() => navigate('/blog')}>
              <span>BLOG</span>
            </div>
            
            <div className={`nav-item ${activeNav === 'contact' ? 'active' : ''}`} onClick={navigateToContact}>
              <span>CONTACT</span>
            </div>
    
          </nav>
        </div>
        
        {/* Language Selector */}
        <LanguageDropdown />

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
