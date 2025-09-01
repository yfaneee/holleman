import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProjectCargo.css';

const ProjectCargo: React.FC = () => {
  const navigate = useNavigate();
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const heroStyle = {
    backgroundImage: `url('/images/projectcargobg.webp')`
  };

  const whyChooseStyle = {
    backgroundImage: `url('/images/Frame-19.webp')`
  };

  // Case studies data (you can replace with real data)
  const caseStudies = [
    {
      id: 1,
      title: "Transport echipament industrial complex",
      description: "Fiecare proiect spune o poveste. Vezi exemple concrete din teren și convingerție de amploarea și complexitatea proiectelor gestionate de Holleman.",
      videoThumbnail: "/images/slide1.webp", // Using existing image as placeholder
      videoUrl: "#", // Replace with actual video URL
      caseStudyUrl: "/case-study/1"
    },
    {
      id: 2,
      title: "Logistică pentru energie regenerabilă",
      description: "Proiecte specializate în transportul componentelor pentru energia verde, cu focus pe siguranță și eficiență.",
      videoThumbnail: "/images/slide2.webp", // Using existing image as placeholder
      videoUrl: "#", // Replace with actual video URL
      caseStudyUrl: "/case-study/2"
    },
    {
      id: 3,
      title: "Infrastructure și construcții majore",
      description: "Soluții complete pentru transportul elementelor de infrastructură în proiecte de anvergură.",
      videoThumbnail: "/images/slide3.webp", // Using existing image as placeholder
      videoUrl: "#", // Replace with actual video URL
      caseStudyUrl: "/case-study/3"
    }
  ];

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsVideoPlaying(!isVideoPlaying);
    // Here you would implement video play logic
    // TODO: Implement video modal or navigation
  };

  const handleCardClick = () => {
    // Navigate to case study page
    // TODO: Implement navigation to case study detail page
    // navigate(`/case-study/${caseStudies[currentCaseStudy].id}`);
  };

  const nextCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const currentCase = caseStudies[currentCaseStudy];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [caseStudies.length, isPaused]);

  // Pause auto-advance when user interacts
  const handleManualNavigation = (index: number) => {
    setCurrentCaseStudy(index);
    setIsPaused(true);
    
    // Resume auto-advance after 10 seconds of no interaction
    setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  // SEO: Set document title and meta description for Project Cargo page
  useEffect(() => {
    document.title = "Project Cargo - Transport Agabaritic și Relocări Industriale | Holleman";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Servicii profesionale Project Cargo: transport agabaritic, relocări industriale, managementul proiectelor complexe. Echipamente grele, turbine eoliene, transformatoare. Experți cu peste 25 ani experiență.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/project-cargo');
  }, []);

  return (
    <div className="project-cargo-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section" style={heroStyle}>
        <div className="hero-content">
          <h1 className="hero-title">Project Cargo</h1>
          <p className="hero-subtitle">Nu mutam doar obiecte, ci si limite.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">Solutii inteligente pentru transporturi complexe - descopera Project Cargo</h2>
          </div>
          
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/Info.webp" alt="Management icon" />
              </div>
              <h3>Management de proiect</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/Info.webp" alt="Management icon" />
                </div>
                <h3>Management de proiect</h3>
                <p>Management de proiect complet, de la planificare până la execuție</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/train.webp" alt="Transport engineering icon" />
              </div>
              <h3>Inginerie de transport</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/train.webp" alt="Transport engineering icon" />
                </div>
                <h3>Inginerie de transport</h3>
                <p>Inginerie de transport si solutii tehnice adaptate fiecarui traseu si tip de echipament</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/Chield_check.webp" alt="Authorizations icon" />
              </div>
              <h3>Autorizatii & asigurari</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/Chield_check.webp" alt="Authorizations icon" />
                </div>
                <h3>Autorizatii & asigurari</h3>
                <p>•	Obținerea autorizațiilor speciale și escortă <br/>
                  • Asigurări specifice pentru bunuri agabaritice și transporturi speciale</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/Anchor.webp" alt="Multimodal transport icon" />
              </div>
              <h3>Transport multimodal</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/Anchor.webp" alt="Multimodal transport icon" />
                </div>
                <h3>Transport multimodal</h3>
                <p>Transport multimodal (rutier, fluvial, maritim, feroviar), în funcție de cerințele proiectului</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/world_light.webp" alt="Site logistics icon" />
              </div>
              <h3>Logistica site</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/world_light.webp" alt="Site logistics icon" />
                </div>
                <h3>Logistica site</h3>
                <p>Logistică pe șantier – descărcare, manipulare, poziționare la punct fix</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/Map_fill.webp" alt="Risk management icon" />
              </div>
              <h3>Gestiune riscuri</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/Map_fill.webp" alt="Risk management icon" />
                </div>
                <h3>Gestiune riscuri</h3>
                <p>Gestiunea riscurilor și măsuri de siguranță adaptate fiecărei etape</p>
              </div>
            </div>
          </div>
          
          <div className="services-footer">
            <button className="btn">CONTACT</button>
          </div>
        </div>
      </section>

      {/* Expertise Domains Section */}
      <section className="expertise-section">
        <div className="expertise-container">
          <h2 className="expertise-title">Domenii de expertiză</h2>
          
          <div className="expertise-grid">
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group.webp" alt="Energie icon" />
              </div>
              <h3>Energie</h3>
              <p>turbine eoliene, generatoare, transformatoare, cazane (proiecte eoliene, hidro, termo)</p>
            </div>
            
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group-1.webp" alt="Petrochimie icon" />
              </div>
              <h3>Petrochimie</h3>
              <p>coloane, rezervoare, schimbătoare de căldură</p>
            </div>
            
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group-2.webp" alt="Minerit icon" />
              </div>
              <h3>Minerit</h3>
              <p>concasoare, stații de sortare, echipamente voluminoase</p>
            </div>
            
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group-3.webp" alt="Industrial icon" />
              </div>
              <h3>Industrial</h3>
              <p>linii de producție, prese industriale, roboți de mare capacitate</p>
            </div>
            
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group-4.webp" alt="Infrastructura icon" />
              </div>
              <h3>Infrastructura</h3>
              <p>poduri, grinzi, structuri metalice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Holleman Section */}
      <section className="why-choose-section" style={whyChooseStyle}>
        <div className="why-choose-container">
          <div className="why-choose-content">
            <h2 className="why-choose-title">
              De ce să alegi Holleman<br />
              pentru <span className="highlight">Project Cargo</span>
            </h2>
            
            <ul className="why-choose-list">
              <li>Peste 25 de ani de experiență în logistica proiectelor speciale</li>
              <li>Flotă proprie diversificată, adaptată pentru sarcini extreme</li>
              <li>Acoperire internațională, cu expertiză în coridoare logistice din Europa Centrală și de Est</li>
              <li>Inginerie internă – soluții dezvoltate in-house, pentru provocări atipice</li>
              <li>Respect pentru termene și bugete – livrăm la timp, în siguranță, fără compromisuri</li>
              <li>Certificări internaționale și respectarea celor mai înalte standarde de siguranță și calitate</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="case-studies-section">
        <div className="case-studies-container">
          <h2 className="case-studies-title">Studii de caz și galerii media</h2>
          
          <div className="case-study-card" onClick={handleCardClick}>
            <div className="case-study-video">
              <img 
                src={currentCase.videoThumbnail} 
                alt={currentCase.title}
                className="video-thumbnail"
              />
              <div className="video-play-button" onClick={handleVideoClick}>
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            
            <div className="case-study-content">
              <h3>{currentCase.title}</h3>
              <p>{currentCase.description}</p>
            </div>
          </div>
          
          <div className="case-studies-nav">
            <div className="nav-dots">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${index === currentCaseStudy ? 'active' : ''}`}
                  onClick={() => handleManualNavigation(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="case-studies-footer">
            <button className="btn">CONTACT</button>
          </div>
        </div>
      </section>

      {/* Services Navigation Section */}
      <section className="services-nav-section">
        <div className="services-nav-container">
          <h2 className="services-nav-title">Afla despre mai multe servicii</h2>
          <div className="services-nav-grid">
            <div className="service-nav-item" onClick={() => navigate('/heavy-lift')}>
              <div className="service-nav-icon">
                <img src="/images/icons/heavy.webp" alt="Heavy Lift icon" />
              </div>
              <h3>Heavy Lift</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/itl')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconinternational.webp" alt="ITL icon" />
              </div>
              <h3>ITL</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/agro')}>
              <div className="service-nav-icon">
                <img src="/images/icons/agro.webp" alt="Agro icon" />
              </div>
              <h3>Agro</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Projects CTA Section */}
      <section className="discover-projects-section" onClick={() => navigate('/proiecte')}>
        <div className="discover-projects-container">
          <div className="discover-projects-content">
            <h2 className="discover-projects-title">Descopera proiectele noastre</h2>
            <div className="discover-play-button">
              <img src="/images/gobttn.webp" alt="Play button" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectCargo;
