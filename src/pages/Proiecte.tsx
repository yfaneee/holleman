import React, { useEffect, useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Proiecte.css';

const Proiecte: React.FC = () => {
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
            {/* Sample Project Cards */}
            <div className="project-card" data-division="heavy-lift">
              <div className="project-image">
                <img src="/images/source/flota.webp" alt="Lorem ipsum dolor sit amet, consectetur" />
              </div>
              <div className="project-overlay heavy-lift">
                <div className="project-info">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                  <p>Transport specializat pentru echipamente industriale grele, cu soluții personalizate și siguranță maximă.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>

            <div className="project-card" data-division="project-cargo">
              <div className="project-image">
                <img src="/images/projectcargo.webp" alt="Transport agabaritic in industria petroliera" />
              </div>
              <div className="project-overlay project-cargo">
                <div className="project-info">
                  <h3>Transport saabriric in industria petrolifera</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Transport saabriric in industria petrolifera</h3>
                  <p>Soluții de transport pentru proiecte complexe în industria petrochimică, cu echipamente specializate.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>

            <div className="project-card" data-division="itl">
              <div className="project-image">
                <img src="/images/itl.webp" alt="Transport impresionant de 200 de tone" />
              </div>
              <div className="project-overlay itl">
                <div className="project-info">
                  <h3>Transport impresionant de 200 de tone</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Transport impresionant de 200 de tone</h3>
                  <p>Operațiune de transport internațional pentru echipamente industriale de dimensiuni excepționale.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>

            <div className="project-card" data-division="heavy-lift">
              <div className="project-image">
                <img src="/images/heavylift.webp" alt="Lorem ipsum dolor sit amet, consectetur" />
              </div>
              <div className="project-overlay heavy-lift">
                <div className="project-info">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                  <p>Relocare complexă de echipamente industriale cu macarale specializate și logistică avansată.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>

            <div className="project-card" data-division="project-cargo">
              <div className="project-image">
                <img src="/images/slide2.webp" alt="Lorem ipsum dolor sit amet, consectetur" />
              </div>
              <div className="project-overlay project-cargo">
                <div className="project-info">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                  <p>Gestionarea proiectelor de transport agabaritic cu planificare detaliată și execuție impecabilă.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>

            <div className="project-card" data-division="itl">
              <div className="project-image">
                <img src="/images/slide3.webp" alt="Lorem ipsum dolor sit amet, consectetur" />
              </div>
              <div className="project-overlay itl">
                <div className="project-info">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                  <p>Transport internațional de echipamente cu trasee optimizate și documentație completă.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>

            <div className="project-card" data-division="agro">
              <div className="project-image">
                <img src="/images/agro.webp" alt="Lorem ipsum dolor sit amet, consectetur" />
              </div>
              <div className="project-overlay agro">
                <div className="project-info">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                  <p>Servicii specializate pentru sectorul agricol cu echipamente adaptate și soluții eficiente.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>

            <div className="project-card" data-division="heavy-lift">
              <div className="project-image">
                <img src="/images/slide4.webp" alt="Lorem ipsum dolor sit amet, consectetur" />
              </div>
              <div className="project-overlay heavy-lift">
                <div className="project-info">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                  <p>Operațiuni de ridicare și transport pentru echipamente de mari dimensiuni și greutăți.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>

            <div className="project-card" data-division="project-cargo">
              <div className="project-image">
                <img src="/images/slide5.webp" alt="Lorem ipsum dolor sit amet, consectetur" />
              </div>
              <div className="project-overlay project-cargo">
                <div className="project-info">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                </div>
              </div>
              <div className="project-hover-content">
                <div className="project-details">
                  <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                  <p>Coordonarea completă a proiectelor cu echipe multidisciplinare și tehnologie avansată.</p>
                  <button className="project-button">
                    <img src="/images/gobttn.webp" alt="Vezi proiectul" />
                  </button>
                </div>
              </div>
            </div>
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
      <section className="inspiration-section" style={{backgroundImage: `url('/images/Group8733.webp')`}}>
        <div className="inspiration-container">
          <div className="inspiration-content">
            <h2>Inspirația pentru proiectul tău</h2>
            <div className="inspiration-text">
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
          </div>
          <div className="button-container">
            <button className="btn" onClick={() => window.location.href = '/contact'}>
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
