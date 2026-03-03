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
    if (path === '/industrii-deservite' || path.startsWith('/industrii-deservite/')) return 'industrii-deservite';
    if (path === '/despre-noi') return 'despre-noi';
    if (path === '/transport-marfuri-agabaritice' || path === '/relocari-industriale' || path === '/transport-marfuri-generale' || path === '/portops' || path === '/permise-si-insotire-agabaritice') return 'cum-va-sprijinim';
    if (path === '/proiecte' || path.startsWith('/proiecte/')) return 'proiecte';
    if (path === '/fleet' || path === '/flota-transport' || path === '/echipamente-manutanta') return 'echipamente-resurse';
    if (path === '/comunicare' || path.startsWith('/comunicare/')) return 'comunicare';
    if (path === '/contact' || path === '/cariere') return 'contact';
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

  const navigateToContact = () => {
    navigate('/contact');
  };

  const navigateToIndustriiDeservite = () => {
    navigate('/industrii-deservite');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Main Row: Logo and Navigation */}
        <div className="header-main-row">
          {/* Logo Section */}
          <div className="logo" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
            <img src="/images/Rectangle.webp" alt="HOLLEMAN Logo" className="logo-image" />
          </div>

          {/* Navigation Menu */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <div className={`nav-item ${activeNav === 'acasa' ? 'active' : ''}`} onClick={navigateToHome}>
              <span>ACASA</span>
            </div>

            <div className={`nav-item ${activeNav === 'industrii-deservite' ? 'active' : ''}`} onClick={navigateToIndustriiDeservite}>
              <span>INDUSTRII DESERVITE</span>
            </div>

            <div 
              className={`nav-item dropdown ${activeNav === 'cum-va-sprijinim' ? 'active' : ''}`}
              onMouseEnter={() => handleDropdownHover('cum-va-sprijinim')}
              onMouseLeave={handleDropdownLeave}
            >
              <span>SERVICII</span>
              <span className="dropdown-arrow">▼</span>
              {activeDropdown === 'cum-va-sprijinim' && (
                <div className="dropdown-menu" role="menu">
                  <a href="/transport-marfuri-agabaritice" role="menuitem" aria-label="Transport Marfuri Agabaritice si Grele">Transport Marfuri Agabaritice si Grele</a>
                  <a href="/relocari-industriale" role="menuitem" aria-label="Relocari Industriale -Manipulare, Montaje">Relocari Industriale - Manipulare, Montaje</a>
                  <a href="/portops" role="menuitem" aria-label="Operatiuni Porturare">Operatiuni Porturare</a>
                  <a href="/permise-si-insotire-agabaritice" role="menuitem" aria-label="Permise si Insotire Agabaritice">Permise si Insotire Agabaritice</a>
                  <a href="/transport-marfuri-generale" role="menuitem" aria-label="Transport Marfuri generale">Transport Marfuri generale</a>
                </div>
              )}
            </div>

            <div className={`nav-item ${activeNav === 'proiecte' ? 'active' : ''}`} onClick={() => navigate('/proiecte')}>
              <span>PROIECTE</span>
            </div>

            <div className={`nav-item ${activeNav === 'echipamente-resurse' ? 'active' : ''}`} onClick={() => navigate('/fleet')}>
              <span>FLOTA & UTILAJE</span>
            </div>

            <div className={`nav-item ${activeNav === 'despre-noi' ? 'active' : ''}`} onClick={navigateToDespreNoi}>
              <span>DESPRE NOI</span>
            </div>
            
            <div className={`nav-item ${activeNav === 'contact' ? 'active' : ''}`} onClick={navigateToContact}>
              <span>CONTACT</span>
            </div>
    
          </nav>
        </div>
        
        {/* Second Row: Language Selector */}
        <div className="header-second-row">
          <LanguageDropdown />
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
