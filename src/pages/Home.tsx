import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();



  const section2Style = {
    backgroundImage: `url('/images/section2.webp')`
  };

  const section3Style = {
    backgroundImage: `url('/images/section3.webp')`
  };

  const contactStyle = {
    backgroundImage: `url('/images/contact-bg.webp')`
  };

  // Slideshow images (add as many as you like)
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

  const navigateToProjectCargo = useCallback(() => {
    navigate('/project-cargo');
  }, [navigate]);

  const navigateToITL = useCallback(() => {
    navigate('/itl');
  }, [navigate]);

  const navigateToHeavyLift = useCallback(() => {
    navigate('/heavy-lift');
  }, [navigate]);

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

  // SEO: Set document title and meta description for home page
  useEffect(() => {
    document.title = "Holleman Special Transport & Project Cargo - Transport Agabaritic România";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experți în transporturi agabaritice, Project Cargo și relocări industriale cu peste 25 ani experiență. Soluții complete de transport special în România și Europa.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro');
  }, []);

  return (
    <div className="home">
      {/* Note: Structured data is already included in index.html */}
      
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
          <h1 className="hero-title">HOLLEMAN</h1>
          <p className="hero-subtitle">
            Niciun transport nu e prea ciudat. Promitem.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" aria-labelledby="services-heading">
        <div className="services-container">
          <h2 id="services-heading" className="services-title">Serviciile noastre</h2>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-bar" role="search">
              <img src="/images/search.webp" alt="" className="search-icon" role="presentation" />
              <input
                type="text"
                placeholder="Caută servicii..."
                className="search-input"
                aria-label="Căutare servicii Holleman"
              />
            </div>
          </div>

          {/* Service Cards */}
          <div className="service-cards">
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
              <div className="hover-text" aria-hidden="true">Project Cargo</div>
              <div className="hover-triangle" aria-hidden="true"></div>
              <div className="accent-triangle top-right" aria-hidden="true"></div>
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
              <div className="hover-text" aria-hidden="true">ITL</div>
              <div className="hover-triangle" aria-hidden="true"></div>
              <div className="accent-triangle top-right second" aria-hidden="true"></div>
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
              <div className="hover-text" aria-hidden="true">Heavy Lift</div>
              <div className="hover-triangle" aria-hidden="true"></div>
              <div className="accent-triangle top-right third" aria-hidden="true"></div>
            </article>
          </div>
        </div>
      </section>

      {/* Section 2 - Background with Text Overlay */}
      <section className="section2" style={section2Style} aria-labelledby="discover-heading">
        <div className="section2-overlay">
          <div className="section2-content">
            <h2 id="discover-heading" className="section2-title">Descoperă serviciile noastre</h2>
            <p className="section2-description">
              De la transporturi agabaritice și logistică internațională, la Project Cargo, relocări industriale și servicii agricole, suntem partenerul tău de încredere pentru fiecare provocare
            </p>
            <button className="btn" onClick={() => navigate('/contact')} aria-label="Solicită o ofertă personalizată de la Holleman">
              Cere o oferta
              <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
            </button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors" aria-labelledby="partners-heading">
        <div className="sponsors-container">
          <h3 id="partners-heading" className="sponsors-title">Susținem excelența prin colaborări cu</h3>
          <div className="sponsors-logos" role="list">
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
          </div>
        </div>
      </section>

      {/* Section 3 - Project Cargo Highlight */}
      <section className="section3" style={section3Style} aria-labelledby="project-cargo-heading">
        <div className="section3-overlay">
          <div className="section3-content">
            <h2 id="project-cargo-heading" className="sr-only">Project Cargo - Transporturi Complexe</h2>
            <p className="section3-description">
              Transporturile agabaritice și proiectele logistice complexe necesită expertiză, precizie și coordonare impecabilă.
              Project Cargo presupune transportul unor echipamente de mari dimensiuni, greutăți sau valoare, adesea esențiale pentru construcția și funcționarea unor instalații industriale sau energetice.
            </p>
            <p className="section3-description">
              Holleman este partenerul ideal pentru acest tip de provocări datorită experienței vaste, echipamentelor specializate și unei echipe dedicate care gestionează fiecare etapă a proiectului cu responsabilitate și viziune.
            </p>
            <button className="btn" onClick={navigateToProjectCargo} 
                    aria-label="Află mai multe despre serviciile Project Cargo oferite de Holleman">
              Project Cargo
              <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
            </button>
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
          <div className="company-info">
            <h2 id="contact-heading">HOLLEMAN SPECIAL TRANSPORT & PROJECT CARGO SRL</h2>
            <h3>Transporturi Agabaritice</h3>
            <div className="info-grid" role="list">
              <div className="info-item" role="listitem">
                <span className="label">Email:</span>
                <a href="mailto:info@holleman.ro" className="value" aria-label="Trimite email la info@holleman.ro">info@holleman.ro</a>
              </div>
              <div className="info-item" role="listitem">
                <span className="label">Mobil:</span>
                <span className="value-group">
                  <a href="tel:+40744317713" className="value" aria-label="Sună la numărul de mobil">+40 744 317 713</a> / 
                  <a href="tel:+40745017529" className="value">+40 745 017 529</a>
                </span>
              </div>
              <div className="info-item" role="listitem">
                <span className="label">Telefon:</span>
                <span className="value-group">
                  <a href="tel:+40213213822" className="value" aria-label="Sună la telefon fix"> +40 21 321 38 22</a> / 
                  <a href="tel:+40213216182" className="value"> 321 61 82</a>
                </span>
              </div>
              <div className="info-item" role="listitem">
                <span className="label">Fax:</span>
                <span className="value">+40 21 320 24 29</span>
              </div>
              <div className="info-item" role="listitem">
                <span className="label">Reg. Com:</span>
                <span className="value">J40/23700/2007</span>
              </div>
              <div className="info-item" role="listitem">
                <span className="label">Cod fiscal:</span>
                <span className="value">RO 22941739</span>
              </div>
              <div className="info-item" role="listitem">
                <span className="label">Sediu:</span>
                <span className="value">București</span>
              </div>
              <div className="info-item" role="listitem">
                <span className="label">Bancă:</span>
                <span className="value">Raiffeisen Bank</span>
              </div>
            </div>
          </div>
          <div className="map-container">
            <div className="map-content">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1850.318501834485!2d26.102393031937627!3d44.339111155963934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ae019bb55c84a3%3A0x2bc4b1774827add9!2sHolleman%20Special%20Transport%20%26%20Project%20Cargo%20-%20transport%20agabaritic!5e0!3m2!1sro!2snl!4v1755968145616!5m2!1sro!2snl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hartă locație Holleman Special Transport & Project Cargo, București"
                aria-label="Hartă Google Maps cu locația sediului Holleman din București"
              ></iframe>
            </div>
            <div className="map-overlay" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
