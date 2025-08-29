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
  
  // Get all projects data
  const allProjects = getAllProjects();

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
              <input
                type="text"
                placeholder="Caută proiecte..."
                className="search-input"
                aria-label="Căutare proiecte Holleman"
              />
              <div className="division-filter">
                <select className="division-select">
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
            {allProjects.map((project) => (
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
            ))}
          </div>
          {/* Contact Button */}
          <div className="gallery-contact-section">
              <button className="btn">CONTACT</button>
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
            <button className="btn cta-btn" onClick={() => window.location.href = '/contact'}>
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
