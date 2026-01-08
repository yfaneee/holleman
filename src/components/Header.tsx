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
    if (path === '/sectoare-economice-deservite' || path.startsWith('/sectoare-economice-deservite/')) return 'sectoare-economice-deservite';
    if (path === '/despre-noi') return 'despre-noi';
    if (path === '/project-cargo' || path === '/heavy-lift' || path === '/itl' || path === '/portops') return 'cum-va-sprijinim';
    if (path === '/proiecte' || path.startsWith('/proiecte/')) return 'proiecte';
    if (path === '/flota-transport' || path === '/echipamente-manutanta') return 'echipamente-resurse';
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

  const navigateToCariere = () => {
    navigate('/cariere');
  };

  const navigateToContact = () => {
    navigate('/contact');
  };

  const navigateToSectoareEconomiceDeservite = () => {
    navigate('/sectoare-economice-deservite');
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

            <div className={`nav-item nav-item-multiline ${activeNav === 'sectoare-economice-deservite' ? 'active' : ''}`} onClick={navigateToSectoareEconomiceDeservite}>
              <span>SECTOARE ECONOMICE<br />DESERVITE</span>
            </div>

            <div 
              className={`nav-item dropdown ${activeNav === 'cum-va-sprijinim' ? 'active' : ''}`}
              onMouseEnter={() => handleDropdownHover('cum-va-sprijinim')}
              onMouseLeave={handleDropdownLeave}
            >
              <span>CUM VA SPRIJINIM</span>
              <span className="dropdown-arrow">▼</span>
              {activeDropdown === 'cum-va-sprijinim' && (
                <div className="dropdown-menu" role="menu">
                  <a href="/project-cargo" role="menuitem" aria-label="Transport Marfuri Agabaritice si Grele">Transport Marfuri Agabaritice si Grele</a>
                  <a href="/heavy-lift" role="menuitem" aria-label="Relocari Industriale -Manipulare, Montaje">Relocari Industriale - Manipulare, Montaje</a>
                  <a href="/portops" role="menuitem" aria-label="Operatiuni Porturare">Operatiuni Porturare</a>
                  <a href="#" role="menuitem" aria-label="Permise si Insotire Agabaritice">Permise si Insotire Agabaritice</a>
                  <a href="/itl" role="menuitem" aria-label="Transport Marfuri generale">Transport Marfuri generale</a>
                </div>
              )}
            </div>

            <div 
              className={`nav-item dropdown ${activeNav === 'proiecte' ? 'active' : ''}`}
              onMouseEnter={() => handleDropdownHover('proiecte')}
              onMouseLeave={handleDropdownLeave}
            >
              <span>PROIECTE</span>
              <span className="dropdown-arrow">▼</span>
              {activeDropdown === 'proiecte' && (
                <div className="dropdown-menu" role="menu">
                  <a href="#" role="menuitem" aria-label="Logistica Parcuri Eoline">Logistica Parcuri Eoline</a>
                  <a href="/proiecte" role="menuitem" aria-label="Proiecte Transport Complex">Proiecte Transport Complex</a>
                </div>
              )}
            </div>

            <div 
              className={`nav-item dropdown ${activeNav === 'echipamente-resurse' ? 'active' : ''}`}
              onMouseEnter={() => handleDropdownHover('echipamente-resurse')}
              onMouseLeave={handleDropdownLeave}
            >
              <span>ECHIPAMENTE & RESURSE</span>
              <span className="dropdown-arrow">▼</span>
              {activeDropdown === 'echipamente-resurse' && (
                <div className="dropdown-menu" role="menu">
                  <a href="#" role="menuitem" aria-label="Flota Transport">Flota Transport</a>
                  <a href="#" role="menuitem" aria-label="Echipamente Manutanta">Echipamente Manutanta</a>
                </div>
              )}
            </div>

            <div className={`nav-item ${activeNav === 'despre-noi' ? 'active' : ''}`} onClick={navigateToDespreNoi}>
              <span>DESPRE NOI</span>
            </div>
            
            <div className={`nav-item ${activeNav === 'comunicare' ? 'active' : ''}`} onClick={() => navigate('/comunicare')}>
              <span>COMUNICARE</span>
            </div>
            
            <div 
              className={`nav-item dropdown ${activeNav === 'contact' ? 'active' : ''}`}
              onMouseEnter={() => handleDropdownHover('contact')}
              onMouseLeave={handleDropdownLeave}
            >
              <span>CONTACT</span>
              <span className="dropdown-arrow">▼</span>
              {activeDropdown === 'contact' && (
                <div className="dropdown-menu" role="menu">
                  <a href="/contact" role="menuitem" aria-label="Contacteaza-ne">Contacteaza-ne</a>
                  <a href="/cariere" role="menuitem" aria-label="Cariere">Cariere</a>
                </div>
              )}
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
