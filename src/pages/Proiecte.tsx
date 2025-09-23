import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllProjects, getAllProjectsSync } from '../data/projectsData';
import { convertBasicMarkdown } from '../utils/textFormatting';
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
  
  // State for Strapi content
  const [portfolioContent, setPortfolioContent] = useState<any>(null);
  const [inspirationContent, setInspirationContent] = useState<any>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [proiecteHeroContent, setProiecteHeroContent] = useState<any>(null);
  
  // State for projects data
  const [allProjects, setAllProjects] = useState<any[]>(getAllProjectsSync());
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Generate suggestions based on search term (memoized for performance)
  const suggestions = React.useMemo(() => {
    if (searchTerm.length < 2) return [];
    
    const suggestionSet = new Set<string>();
    const searchLower = searchTerm.toLowerCase();
    
    allProjects.forEach(project => {
      // Add project titles that match
      if (project.title.toLowerCase().includes(searchLower)) {
        suggestionSet.add(project.title);
      }
      
      // Add project subtitles that match
      if (project.subtitle.toLowerCase().includes(searchLower)) {
        suggestionSet.add(project.subtitle);
      }
      
      // Add keywords from descriptions (optimized)
      project.description.paragraphs.forEach((paragraph: string) => {
        const words = paragraph.toLowerCase().split(/\s+/);
        words.forEach((word: string) => {
          const cleanWord = word.replace(/[^\w]/g, '');
          if (cleanWord.length > 3 && cleanWord.includes(searchLower)) {
            suggestionSet.add(cleanWord);
          }
        });
      });
    });
    
    return Array.from(suggestionSet).slice(0, 8);
  }, [searchTerm, allProjects]);

  // Filter projects based on search term and division (memoized for performance)
  const filteredProjects = React.useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    
    return allProjects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchLower) ||
        project.subtitle.toLowerCase().includes(searchLower) ||
        project.description.paragraphs.some((paragraph: string) => 
          paragraph.toLowerCase().includes(searchLower)
        );
      
      const matchesDivision = selectedDivision === '' || project.division === selectedDivision;
      
      return matchesSearch && matchesDivision;
    });
  }, [searchTerm, selectedDivision, allProjects]);

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

  // Handle suggestion click (memoized for performance)
  const handleSuggestionClick = React.useCallback((suggestion: string, event?: React.MouseEvent) => {
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
  }, []);

  // Handle keyboard navigation (memoized for performance)
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
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
  }, [showSuggestions, suggestions, selectedSuggestionIndex, handleSuggestionClick]);

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
    // Enhanced SEO setup
    document.title = "Proiecte - Portofoliul Holleman | Transport Echipamente Grele";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explorează portofoliul Holleman - proiecte reprezentative din Heavy Lift, Project Cargo, ITL și Agro. Dovada angajamentului nostru pentru excelență, inovație și siguranță.');
    }
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/proiecte');
    
    // Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };
    
    updateOGTag('og:title', 'Proiecte Holleman - Portofoliu Transport Agabaritic');
    updateOGTag('og:description', 'Descoperă proiectele noastre din transporturi agabaritice, Heavy Lift, Project Cargo și ITL. Peste 25 ani experiență în România și Europa.');
    updateOGTag('og:url', 'https://holleman.ro/proiecte');
    updateOGTag('og:type', 'website');
    
    // Structured data for project portfolio
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Portofoliu Proiecte Holleman",
      "description": "Portofoliul complet al proiectelor Holleman în transporturi agabaritice și relocări industriale",
      "url": "https://holleman.ro/proiecte",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": allProjects.length,
        "itemListElement": allProjects.map((project, index) => ({
          "@type": "CreativeWork",
          "position": index + 1,
          "name": project.title,
          "description": project.subtitle,
          "url": `https://holleman.ro/proiecte/${project.id}`,
          "image": `https://holleman.ro${project.gallery.mainImage}`,
          "creator": {
            "@type": "Organization",
            "name": "Holleman Special Transport & Project Cargo"
          },
          "category": project.division
        }))
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Acasă",
            "item": "https://holleman.ro"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Proiecte",
            "item": "https://holleman.ro/proiecte"
          }
        ]
      }
    };
    
    // Add or update structured data
    let structuredDataScript = document.querySelector('#projects-structured-data') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script') as HTMLScriptElement;
      structuredDataScript.id = 'projects-structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);
    
    // Cleanup function to remove structured data when component unmounts
    return () => {
      const script = document.querySelector('#projects-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, [allProjects]);

  // Fetch content and projects from Strapi
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [portfolioRes, inspirationRes, projectsData, proiecteHeroRes] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/proiecte-portfolio-section?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/proiecte-inspiration-section?populate=*'),
          getAllProjects(),
          fetch('https://holleman-cms-production.up.railway.app/api/proiecte-hero')
        ]);

        const portfolioData = await portfolioRes.json();
        const inspirationData = await inspirationRes.json();
        const proiecteHeroData = await proiecteHeroRes.json();

        console.log('Portfolio Data:', portfolioData);
        console.log('Inspiration Data:', inspirationData);
        console.log('Projects from Strapi:', projectsData);
        console.log('Proiecte Hero Data:', proiecteHeroData);

        setPortfolioContent(portfolioData.data);
        setInspirationContent(inspirationData.data);
        setAllProjects(projectsData);
        setProiecteHeroContent(proiecteHeroData.data);
      } catch (error) {
        console.error('Error fetching content:', error);
        setProiecteHeroContent({
          title: 'Proiecte',
          subtitleText: 'Am transportat si lucruri care n-au căpătat nume în DEX. Daca intra pe trailer, il ducem.'
        });
      } finally {
        setContentLoading(false);
        setProjectsLoading(false);
      }
    };

    fetchContent();
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

  // Handle hash navigation for footer links
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const headerHeight = window.innerWidth <= 768 ? 180 : 300;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Handle hash on initial load
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  return (
    <div className="proiecte-page">
      <Header />
      
             {/* Hero Section */}
       <section className="hero-section" style={{backgroundImage: `url('/images/proiectebckg.webp')`}}>
         <div className="hero-overlay">
           <div className="hero-content">
             <h1 className="hero-title">
               {proiecteHeroContent?.title || ''}
             </h1>
             <p className="hero-subtitle">
               {proiecteHeroContent?.subtitleText || ''}
             </p>
           </div>
         </div>
       </section>

      {/* Project Gallery Section */}
      <section className="project-gallery-section" aria-labelledby="projects-heading">
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
          <div className="project-grid" role="grid" aria-label="Proiecte Holleman">
            <h2 id="projects-heading" className="sr-only">Lista proiectelor Holleman</h2>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="project-card" data-division={project.division}>
                  <div className="project-image">
                    <img 
                      src={project.gallery.mainImage} 
                      alt={`${project.title} - ${project.subtitle} | Holleman ${project.division}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={`project-overlay ${project.division}`}>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                    </div>
                  </div>
                  <div className="project-hover-content">
                    <div className="project-details">
                      <h3>{project.title}</h3>
                      <p 
                        dangerouslySetInnerHTML={{
                          __html: convertBasicMarkdown(project.description.paragraphs[0].substring(0, 120)) + '...'
                        }}
                      />
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
          <div className="content-text animate-on-scroll">
            {contentLoading ? (
              <div>Loading...</div>
            ) : portfolioContent ? (
              <>
                <h2 style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}>{portfolioContent.title}</h2>
                <div className="content-paragraphs">
                  {portfolioContent.bulletPoints && portfolioContent.bulletPoints.split('\n').filter((paragraph: string) => paragraph.trim()).map((paragraph: string, index: number) => (
                    <p key={index} style={{
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: `slideInUp 0.8s ease-out ${0.2 + (index * 0.2)}s forwards`
                    }}>
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <div>No portfolio content found.</div>
            )}
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
          <div className="cta-content animate-on-scroll">
            {contentLoading ? (
              <div>Loading...</div>
            ) : inspirationContent ? (
              <>
                <h2 className="cta-title" style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}>
                  {inspirationContent.title}
                </h2>
                <div className="cta-text">
                  {inspirationContent.paragraphs && inspirationContent.paragraphs.split('\n').filter((paragraph: string) => paragraph.trim()).map((paragraph: string, index: number) => (
                    <p key={index} style={{
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: `slideInUp 0.8s ease-out ${0.2 + (index * 0.2)}s forwards`
                    }} dangerouslySetInnerHTML={{
                      __html: paragraph.trim().replace(/Holleman/g, '<strong>Holleman</strong>')
                    }}>
                    </p>
                  ))}
                </div>
                <button className="btn cta-btn" onClick={() => navigate('/contact')} style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out 0.6s forwards'
                }}>
                  <span>Contacteaza-ne pentru o oferta personalizata</span>
                  <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
                </button>
              </>
            ) : (
              <div>No inspiration content found.</div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Proiecte;
