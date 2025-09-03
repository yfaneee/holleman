import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllProjects } from '../data/projectsData';
import './Proiecte.css';

const Proiecte: React.FC = () => {
  const navigate = useNavigate();
  
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  
  // Autocomplete state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isClickingSuggestionRef = useRef(false);
  
  // Get all projects data
  const allProjects = getAllProjects();

  // Generate suggestions based on search term
  const getSuggestions = () => {
    if (searchTerm.length < 2) return [];
    
    const suggestions = new Set<string>();
    
    allProjects.forEach(project => {
      // Add project titles that match
      if (project.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(project.title);
      }
      
      // Add project subtitles that match
      if (project.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(project.subtitle);
      }
      
      // Add keywords from descriptions
      project.description.paragraphs.forEach(paragraph => {
        const words = paragraph.toLowerCase().split(/\s+/);
        words.forEach(word => {
          // Clean word of punctuation
          const cleanWord = word.replace(/[^\w]/g, '');
          if (cleanWord.length > 3 && cleanWord.includes(searchTerm.toLowerCase())) {
            suggestions.add(cleanWord);
          }
        });
      });
    });
    
    return Array.from(suggestions).slice(0, 8); // Limit to 8 suggestions
  };

  const suggestions = getSuggestions();

  // Filter projects based on search term and division
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.paragraphs.some(paragraph => 
        paragraph.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesDivision = selectedDivision === '' || project.division === selectedDivision;
    
    return matchesSearch && matchesDivision;
  });

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length >= 2);
    setSelectedSuggestionIndex(-1);
  };

  // Handle division filter change
  const handleDivisionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(event.target.value);
    setShowSuggestions(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string, event?: React.MouseEvent) => {
    isClickingSuggestionRef.current = true;
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Update search term immediately
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    // Reset the clicking flag after a short delay
    setTimeout(() => {
      isClickingSuggestionRef.current = false;
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 50);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (searchTerm.length >= 2) {
      setShowSuggestions(true);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if we're clicking on a suggestion
      if (isClickingSuggestionRef.current) {
        return;
      }
      
      const target = event.target as Node;
      const searchContainer = searchInputRef.current?.closest('.search-input-container');
      
      if (searchContainer && !searchContainer.contains(target)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    // Use mouseup instead of mousedown to let click events fire first
    document.addEventListener('mouseup', handleClickOutside);
    return () => document.removeEventListener('mouseup', handleClickOutside);
  }, []);

  // Slideshow images
  const slides = [
    { src: '/images/slide1.webp', title: 'Holleman', alt: '1' },
    { src: '/images/slide2.webp', title: 'Holleman', alt: '2' },
    { src: '/images/slide3.webp', title: 'Holleman', alt: '3' },
    { src: '/images/slide4.webp', title: 'Holleman', alt: '4' },
    { src: '/images/slide5.webp', title: 'Holleman', alt: '5' },
    { src: '/images/slide6.webp', title: 'Holleman', alt: '6' },
  ];

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
  }, [isPlaying, isPaused, slides.length, clearSlideInterval]);

  // Manual advance function
  const handleAdvance = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    // Restart the interval after manual advance
    if (isPlaying) {
      startSlideInterval();
    }
  }, [slides.length, isPlaying, startSlideInterval]);

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
  }, [currentSlide, slides]);

  const nextSlideIndex = (currentSlide + 1) % slides.length;

  // Handle project navigation
  const handleProjectClick = (projectId: string) => {
    navigate(`/proiecte/${projectId}`);
  };

  useEffect(() => {
    // SEO setup
    document.title = "Proiecte - Portofoliul Holleman | Transport Echipamente Grele";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explorează portofoliul Holleman - proiecte reprezentative din Heavy Lift, Project Cargo, ITL și Agro. Dovada angajamentului nostru pentru excelență, inovație și siguranță.');
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/proiecte');
  }, []);

  return (
    <div className="proiecte-page">
      <Header />
      
             {/* Hero Section */}
       <section className="hero-section" style={{backgroundImage: `url('/images/proiectebckg.webp')`}}>
         <div className="hero-overlay">
           <div className="hero-content">
             <h1 className="hero-title">Proiecte</h1>
             <p className="hero-subtitle">Am transportat si lucruri care n-au căpătat nume în DEX. Daca intra pe trailer, il ducem.</p>
           </div>
         </div>
       </section>

      {/* Project Gallery Section */}
      <section className="project-gallery-section">
        <div className="gallery-container">
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-bar" role="search">
              <img src="/images/search.webp" alt="" className="search-icon" role="presentation" />
              <div className="search-input-container">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Caută proiecte..."
                  className="search-input"
                  aria-label="Căutare proiecte Holleman"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  autoComplete="off"
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion}
                        className={`suggestion-item ${
                          index === selectedSuggestionIndex ? 'selected' : ''
                        }`}
                        onMouseDown={(event) => handleSuggestionClick(suggestion, event)}
                        onMouseEnter={() => setSelectedSuggestionIndex(index)}
                      >
                        <img src="/images/search.webp" alt="" className="suggestion-icon" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="division-filter">
                <select 
                  className="division-select"
                  value={selectedDivision}
                  onChange={handleDivisionChange}
                >
                  <option value="">DIVIZIE</option>
                  <option value="heavy-lift">Heavy Lift</option>
                  <option value="project-cargo">Project Cargo</option>
                  <option value="itl">ITL</option>
                  <option value="agro">Agro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="project-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="project-card" data-division={project.division}>
                  <div className="project-image">
                    <img src={project.gallery.mainImage} alt={project.title} />
                  </div>
                  <div className={`project-overlay ${project.division}`}>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                    </div>
                  </div>
                  <div className="project-hover-content">
                    <div className="project-details">
                      <h3>{project.title}</h3>
                      <p>{project.description.paragraphs[0].substring(0, 120)}...</p>
                      <button 
                        className="project-button"
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-content">
                  <h3>Nu au fost găsite proiecte</h3>
                  <p>Încearcă să modifici termenii de căutare sau să alegi o divizie diferită.</p>
                  <button 
                    className="btn clear-filters-btn"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedDivision('');
                    }}
                  >
                    Șterge filtrele
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Contact Button */}
          <div className="gallery-contact-section">
              <button className="btn" onClick={() => navigate('/contact')}>CONTACT</button>
            </div>
        </div>
      </section>

      {/* First Content Section */}
      <section className="content-section" style={{backgroundImage: `url('/images/Group8728.webp')`}}>
        <div className="content-container">
          <div className="content-text">
            <h2>Explorează portofoliul nostru</h2>
            <div className="content-paragraphs">
              <p>
                Fiecare proiect finalizat este o dovadă a angajamentului nostru pentru excelență, 
                inovație și siguranță.
              </p>
              <p>
                În această secțiune regăsești o galerie centralizată cu proiecte reprezentative, 
                care reflectă complexitatea, amploarea și diversitatea activității Holleman în cele 
                patru divizii principale: <strong>Heavy Lift</strong>, <strong>Project Cargo</strong>, 
                <strong>ITL</strong> și <strong>Agro</strong>.
              </p>
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
            role="img" 
            aria-label={`Imagine ${currentSlide + 1} din ${slides.length} - Proiecte Holleman`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="yellow-block" aria-hidden="true" />
            <img
              className="stack-image front"
              src={slides[currentSlide].src}
              alt={`Proiect Holleman ${slides[currentSlide].title} - imagine ${slides[currentSlide].alt}`}
              loading="eager"
            />
            <img
              className="stack-image back"
              src={slides[nextSlideIndex].src}
              alt={`Următorul proiect Holleman - imagine ${slides[nextSlideIndex].alt}`}
              onClick={handleAdvance}
              role="button"
              tabIndex={0}
              aria-label="Click pentru următoarea imagine din galerie"
              onKeyDown={(e) => e.key === 'Enter' && handleAdvance()}
              loading="eager"
            />
          </div>
          <div className="slideshow-caption" aria-hidden="true">
            <div>Galerie</div>
            <div>Proiecte</div>
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

      {/* Inspiration Section */}
      <section className="cta-section" style={{backgroundImage: `url('/images/Group8733.webp')`}}>
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Inspirația pentru proiectul tău
            </h2>
            <div className="cta-text">
              <p>
                Aceste exemple reale reflectă capacitatea noastră de a 
                adapta soluții în funcție de nevoile fiecărui client, de a 
                gestiona riscurile și de a livra valoare adăugată, indiferent de 
                dimensiunea sau dificultatea proiectului.
              </p>
              <p>
                Indiferent dacă ai în plan un transport special, o relocare 
                industrială sau un proiect agricol integrat, aici găsești surse 
                de inspirație, idei și încrederea că <strong>Holleman</strong> este partenerul 
                potrivit.
              </p>
            </div>
            <button className="btn cta-btn" onClick={() => navigate('/contact')}>
              Contacteaza-ne pentru o oferta personalizata
              <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Proiecte;
