import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { searchContent, getAutocompleteSuggestions, SearchableItem } from '../data/searchData';
import ScrollArrow from '../components/ScrollArrow';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const homeMapIcon = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44" width="32" height="44">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 28 16 28S32 26.5 32 16C32 7.163 24.837 0 16 0z" fill="#136B38"/>
    <circle cx="16" cy="16" r="7" fill="white"/>
    <circle cx="16" cy="16" r="4" fill="#136B38"/>
  </svg>`,
  iconSize: [32, 44],
  iconAnchor: [16, 44],
  popupAnchor: [0, -46],
});

const slides = [
  { src: '/images/slide1.webp', title: 'Holleman', alt: '1' },
  { src: '/images/slide2.webp', title: 'Holleman', alt: '2' },
  { src: '/images/slide3.webp', title: 'Holleman', alt: '3' },
  { src: '/images/slide4.webp', title: 'Holleman', alt: '4' },
  { src: '/images/slide5.webp', title: 'Holleman', alt: '5' },
  { src: '/images/slide6.webp', title: 'Holleman', alt: '6' },
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [, setIsVideoLoaded] = useState(false);
  const [, setVideoError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  // Strapi content state
  const [homeHeroContent, setHomeHeroContent] = useState<any>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [, setSearchResults] = useState<SearchableItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);




  const section2Style = {
    backgroundImage: `url('/images/section2.webp')`
  };

  const contactStyle = {
    backgroundImage: `url('/images/contact-bg.webp')`
  };


  // Clear interval function
  const clearSlideInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start interval function
  const startSlideInterval = useCallback(() => {
    clearSlideInterval();
    if (isPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000); // Change slide every 4 seconds
    }
  }, [isPlaying, isPaused, clearSlideInterval]);

  // Manual advance function
  const handleAdvance = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    // Restart the interval after manual advance
    if (isPlaying) {
      startSlideInterval();
    }
  }, [isPlaying, startSlideInterval]);

  // Pause slideshow on hover
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    clearSlideInterval();
  }, [clearSlideInterval]);

  // Resume slideshow when not hovering
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    if (isPlaying) {
      startSlideInterval();
    }
  }, [isPlaying, startSlideInterval]);

  const navigateToProjectCargo = useCallback(() => {
    navigate('/transport-marfuri-agabaritice');
  }, [navigate]);

  const navigateToITL = useCallback(() => {
    navigate('/transport-marfuri-generale');
  }, [navigate]);

  const navigateToHeavyLift = useCallback(() => {
    navigate('/relocari-industriale');
  }, [navigate]);

  // Search functionality
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length >= 2) {
      const autocompleteSuggestions = getAutocompleteSuggestions(value);
      setSuggestions(autocompleteSuggestions);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  const performSearch = useCallback((query: string) => {
    const results = searchContent(query);
    setSearchResults(results);
    setShowSuggestions(false);
    
    if (results.length > 0) {
      const firstResult = results[0];
      // Navigate to the page/section
      if (firstResult.sectionId) {
        navigate(`${firstResult.route}#${firstResult.sectionId}`);
        // Scroll to section after navigation
        setTimeout(() => {
          const element = document.getElementById(firstResult.sectionId!);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        navigate(firstResult.route);
      }
    }
  }, [navigate]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      performSearch(searchQuery.trim());
    }
  }, [searchQuery, performSearch]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion);
  }, [performSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  }, [showSuggestions, suggestions, selectedSuggestionIndex, handleSuggestionClick]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch Home Hero content from Strapi
  useEffect(() => {
    const fetchHomeHeroContent = async () => {
      try {
        const response = await fetch('https://holleman-cms-production.up.railway.app/api/home-hero');
        const data = await response.json();
        setHomeHeroContent(data.data);
      } catch (error) {
        console.error('Error fetching Home Hero content:', error);
        // Fallback to default content if Strapi is not available
        setHomeHeroContent({
          title: 'HOLLEMAN',
          subtitleText: 'Dincolo de asteptari, cu fiecare proiect'
        });
      } finally {
      }
    };

    fetchHomeHeroContent();
  }, []);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Auto-play effect
  useEffect(() => {
    startSlideInterval();
    return () => clearSlideInterval();
  }, [startSlideInterval, clearSlideInterval]);

  // Preload next images for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach((slide, index) => {
        if (index !== currentSlide) {
          const img = new Image();
          img.src = slide.src;
        }
      });
    };
    preloadImages();
  }, [currentSlide]);

  const nextSlideIndex = (currentSlide + 1) % slides.length;

  return (
    <div className="home">
      {/* Note: Structured data is already included in index.html */}
      <SEO
        title="Holleman Special Transport & Project Cargo - Transport Agabaritic România"
        description="Experți în transporturi agabaritice, Project Cargo și relocări industriale cu peste 25 ani experiență. Soluții complete de transport special în România și Europa."
        canonicalUrl="https://holleman.ro"
        ogImage="https://holleman.ro/images/Group8723.webp"
        keywords="transport agabaritic, project cargo, relocări industriale, transport special, logistică România, holleman, transport echipamente grele, inginerie transport, heavy lift"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="hero" aria-label="Pagina principală Holleman">
        <video 
          className="hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplaybook"
          onLoadStart={() => {
            console.log('Video loading started');
            setIsVideoLoaded(false);
            setVideoError(false);
          }}
          onCanPlay={() => {
            console.log('Video can start playing');
            setIsVideoLoaded(true);
          }}
          onLoadedData={() => {
            console.log('Video loaded');
            setIsVideoLoaded(true);
          }}
          onError={() => {
            console.error('Video failed to load');
            setVideoError(true);
            setIsVideoLoaded(true);
          }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            {homeHeroContent?.title || ''}
          </h1>
          <p className="hero-subtitle">
            {homeHeroContent?.subtitleText || ''}
          </p>
        </div>
        <ScrollArrow />
      </section>

      {/* Partner Companies Bar */}
      <section className="partner-bar" aria-label="Companiile partenere Holleman">
        <div className="partner-bar-container">
          <a href="https://holleman.bg/" target="_blank" rel="noopener noreferrer" className="partner-link">
            Holleman Bulgaria
          </a>
          <a href="https://holleman.rs/" target="_blank" rel="noopener noreferrer" className="partner-link">
            Holleman Serbia
          </a>
          <a href="https://holleman.org.ua/en/" target="_blank" rel="noopener noreferrer" className="partner-link">
            Holleman Ukraina
          </a>
          <a href="https://www.degroentransport.nl/en/" target="_blank" rel="noopener noreferrer" className="partner-link">
           De Groen Transport 
          </a>
          <a href="https://www.schwandner-logistik.de/" target="_blank" rel="noopener noreferrer" className="partner-link">
            P. Schwandner
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" aria-labelledby="services-heading">
        <div className="services-container">
          <h2 id="services-heading" className="services-title animate-on-scroll fade-up">Serviciile noastre</h2>

          {/* Search Bar */}
          <div className="search-container">
            <form className="search-bar" role="search" onSubmit={handleSearchSubmit}>
              <img src="/images/search.webp" alt="" className="search-icon" role="presentation" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Caută servicii, pagini, secțiuni..."
                className="search-input"
                aria-label="Căutare servicii și conținut Holleman"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              
              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div ref={suggestionsRef} className="search-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      className={`search-suggestion ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      role="option"
                      aria-selected={index === selectedSuggestionIndex}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Service Cards */}
          <div className="service-cards animate-on-scroll fade-up">
            <article className="service-card" onClick={navigateToProjectCargo} 
                     role="button" tabIndex={0} 
                     aria-label="Servicii Project Cargo - Click pentru detalii"
                     onKeyDown={(e) => e.key === 'Enter' && navigateToProjectCargo()}>
              <div className="card-image">
                <img src="/images/projectcargo.webp" 
                     alt="Echipamente industriale pentru Project Cargo" 
                     loading="lazy" />
              </div>
              <div className="card-content">
                <h3>Management de proiect, inginerie de transport, transport multimodal, logistica site</h3>
                <p>Ce înseamnă Project Cargo și de ce Holleman este partenerul ideal pentru transporturi complexe</p>
              </div>
              <div className="hover-overlay" aria-hidden="true"></div>
              <div className="hover-text" aria-hidden="true">Transport Marfuri Agabaritice si Grele</div>
              <div className="hover-triangle" aria-hidden="true"></div>
              <div className="accent-triangle top-right" aria-hidden="true"></div>
            </article>

            <article className="service-card" onClick={navigateToHeavyLift}
                     role="button" tabIndex={0} 
                     aria-label="Servicii Heavy Lift - Relocări industriale - Click pentru detalii"
                     onKeyDown={(e) => e.key === 'Enter' && navigateToHeavyLift()}>
              <div className="card-image">
                <img src="/images/heavylift.webp" 
                     alt="Echipamente specializate pentru relocări industriale Heavy Lift" 
                     loading="lazy" />
              </div>
              <div className="card-content">
                <h3>Relocări industriale cu echipamente specializate și oameni experimentați în domeniu</h3>
                <p>Soluții inteligente pentru diverse și neașteptate relocări la sediul clienților</p>
              </div>
              <div className="hover-overlay" aria-hidden="true"></div>
              <div className="hover-text" aria-hidden="true">Relocari Industriale - Manipulare, Montaje</div>
              <div className="hover-triangle" aria-hidden="true"></div>
              <div className="accent-triangle top-right third" aria-hidden="true"></div>
            </article>

            <article className="service-card" onClick={navigateToITL}
                     role="button" tabIndex={0} 
                     aria-label="Servicii ITL - Transport internațional - Click pentru detalii"
                     onKeyDown={(e) => e.key === 'Enter' && navigateToITL()}>
              <div className="card-image">
                <img src="/images/itl.webp" 
                     alt="Servicii de transport și logistică internațională" 
                     loading="lazy" />
              </div>
              <div className="card-content">
                <h3>Servicii complete de transport și logistică internă și internațională</h3>
                <p>Transport rutier internațional (FTL, LTL), transport naval și soluții logistice integrate</p>
              </div>
              <div className="hover-overlay" aria-hidden="true"></div>
              <div className="hover-text" aria-hidden="true">Transport Marfuri generale</div>
              <div className="hover-triangle" aria-hidden="true"></div>
              <div className="accent-triangle top-right second" aria-hidden="true"></div>
            </article>
          </div>
        </div>
      </section>

      {/* Section 2 - Background with Text Overlay */}
      <section className="section2" style={section2Style} aria-labelledby="discover-heading">
        <div className="section2-overlay">
          <div className="section2-content">
            <h2 id="discover-heading" className="section2-title animate-on-scroll fade-up">Serviciile noastre</h2>
            <p className="section2-description animate-on-scroll fade-up delay-200">
            De la transporturi agabaritice și project cargo, la logistică internațională și relocări industriale, oferim soluții complete pentru proiecte complexe.
            </p>
            <button className="btn animate-on-scroll fade-up delay-400" onClick={() => navigate('/contact')} aria-label="Solicită o ofertă personalizată de la Holleman">
              Cere o oferta
              <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
            </button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors" aria-labelledby="partners-heading">
        <div className="sponsors-container">
          <h3 id="partners-heading" className="sponsors-title animate-on-scroll fade-up">Susținem excelența prin colaborări cu</h3>
          <div className="sponsors-carousel" role="list">
            <div className="sponsors-track">
              {/* First set of logos */}
              <div className="sponsor-logo" role="listitem">
                <img src="/images/Vestas.webp" alt="Vestas - partener Holleman pentru energie eoliană" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/Nordex.webp" alt="Nordex - partener pentru turbine eoliene" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/Liebherr.webp" alt="Liebherr - partener pentru echipamente de construcții" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/Caterpillar.webp" alt="Caterpillar - partener pentru utilaje industriale" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/agro.webp" alt="Agro Concept - partener pentru sector agricol" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/CNHlogo.webp" alt="CNH - partener pentru utilaje agricole și industriale" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/egs-logo.webp" alt="EGS - partener pentru soluții energetice" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/EnerconLogo.webp" alt="Enercon - partener pentru energie eoliană" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/COSCOlogo.webp" alt="COSCO - partener pentru transport maritim" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/opengraphlogo.webp" alt="OpenGraph - partener tehnologic" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/siemens-logo.webp" alt="Siemens - partener pentru tehnologie industrială" 
                     className="sponsor-image" loading="lazy" />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="sponsor-logo" role="listitem">
                <img src="/images/Vestas.webp" alt="Vestas - partener Holleman pentru energie eoliană" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/Nordex.webp" alt="Nordex - partener pentru turbine eoliene" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/Liebherr.webp" alt="Liebherr - partener pentru echipamente de construcții" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/Caterpillar.webp" alt="Caterpillar - partener pentru utilaje industriale" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/agro.webp" alt="Agro Concept - partener pentru sector agricol" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/CNHlogo.webp" alt="CNH - partener pentru utilaje agricole și industriale" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/egs-logo.webp" alt="EGS - partener pentru soluții energetice" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/EnerconLogo.webp" alt="Enercon - partener pentru energie eoliană" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/COSCOlogo.webp" alt="COSCO - partener pentru transport maritim" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/opengraphlogo.webp" alt="OpenGraph - partener tehnologic" 
                     className="sponsor-image" loading="lazy" />
              </div>
              <div className="sponsor-logo" role="listitem">
                <img src="/images/siemens-logo.webp" alt="Siemens - partener pentru tehnologie industrială" 
                     className="sponsor-image" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slideshow Section */}
      <section className="slideshow" aria-labelledby="gallery-heading">
        <div className="slideshow-container">
          <h2 id="gallery-heading" className="sr-only">Galerie foto Holleman - Proiecte realizate</h2>
          <div className="slideshow-brand" aria-hidden="true">HOLLEMAN</div>
          <div 
            className="stacked-slideshow"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="yellow-block" aria-hidden="true" />
            <img
              className="stack-image front"
              src={slides[currentSlide].src}
              alt={`Imagine ${currentSlide + 1} din ${slides.length} - Proiect Holleman ${slides[currentSlide].title}`}
              loading="eager"
            />
            <img
              className="stack-image back"
              src={slides[nextSlideIndex].src}
              alt={`Următorul proiect Holleman - imagine ${slides[nextSlideIndex].alt}`}
              onClick={handleAdvance}
              role="button"
              tabIndex={0}
              aria-label={`Treceți la următoarea imagine (${nextSlideIndex + 1} din ${slides.length})`}
              onKeyDown={(e) => e.key === 'Enter' && handleAdvance()}
              loading="eager"
            />
          </div>
          <div className="slideshow-caption" aria-hidden="true">
            <div>Trust &</div>
            <div>Security</div>
          </div>
          
          {/* Progress indicator */}
          <div className="slideshow-progress" aria-hidden="true">
            <div 
              className="progress-bar" 
              key={currentSlide} // Reset animation on slide change
              style={{
                animation: isPaused ? 'none' : 'progress 4s linear forwards',
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" style={contactStyle} aria-labelledby="contact-heading">
        <div className="contact-content">
          {/* Left: Company Info */}
          <div className="contact-info-panel">
            <h2 id="contact-heading">HOLLEMAN SPECIAL TRANSPORT & PROJECT CARGO SRL</h2>
            <h3>Transporturi Agabaritice</h3>

            <div className="contact-locations-grid">
              {/* București – Jilava */}
              <div className="contact-location-block">
                <h4 className="location-block-title">București – Jilava</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Adresă:</span>
                    <span className="value">Șoseaua de Centură nr. 29, Jilava, jud. Ilfov</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Telefon:</span>
                    <span className="value-group">
                      <a href="tel:+40213213822" className="value">+40 21 321 38 22</a> / <a href="tel:+40213216182" className="value">321 61 82</a>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Mobil:</span>
                    <span className="value-group">
                      <a href="tel:+40744317713" className="value">+40 744 317 713</a> / <a href="tel:+40745017529" className="value">+40 745 017 529</a>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Fax:</span>
                    <span className="value">+40 21 320 24 29</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <a href="mailto:info@holleman.ro" className="value">info@holleman.ro</a>
                  </div>
                  <div className="info-item">
                    <span className="label">Reg. Com:</span>
                    <span className="value">J40/23700/2007</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Cod fiscal:</span>
                    <span className="value">RO 22941739</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Bancă:</span>
                    <span className="value">Raiffeisen Bank</span>
                  </div>
                </div>
              </div>

              {/* Constanța – Port Agigea Sud */}
              <div className="contact-location-block">
                <h4 className="location-block-title">Constanța – Port Agigea Sud</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Adresă:</span>
                    <span className="value">Port Agigea Sud CT, cladirea TLS, parter, Birou 1, Constanța</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Telefon:</span>
                    <a href="tel:+40744678100" className="value">+40 744 678 100</a>
                  </div>
                  <div className="info-item">
                    <span className="label">Telefon:</span>
                    <a href="tel:+40754016285" className="value">+40 754 016 285</a>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <a href="mailto:maritima@holleman.ro" className="value">maritima@holleman.ro</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="home-map-panel">
            <MapContainer
              center={[44.06, 27.35]}
              zoom={7}
              scrollWheelZoom={false}
              className="home-contact-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              <Marker position={[44.3391, 26.1024]} icon={homeMapIcon}>
                <Popup className="holleman-popup">
                  <div className="popup-content">
                    <h3 className="popup-title">București – Jilava</h3>
                    <p className="popup-address">Șoseaua de Centură nr. 29, Jilava, jud. Ilfov</p>
                    <p className="popup-phone">+40 21 321 38 22 / 321 61 82</p>
                    <a className="popup-email" href="mailto:info@holleman.ro">info@holleman.ro</a>
                  </div>
                </Popup>
              </Marker>
              <Marker position={[43.7850, 28.6030]} icon={homeMapIcon}>
                <Popup className="holleman-popup">
                  <div className="popup-content">
                    <h3 className="popup-title">Constanța – Port Agigea Sud</h3>
                    <p className="popup-address">Port Agigea Sud CT, cladirea TLS, parter, Birou 1, Constanța</p>
                    <p className="popup-phone">+40 744 678 100 / +40 754 016 285</p>
                    <a className="popup-email" href="mailto:maritima@holleman.ro">maritima@holleman.ro</a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
