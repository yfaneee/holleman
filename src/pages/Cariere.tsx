import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Cariere.css';

const Cariere: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPrefix, setSelectedPrefix] = useState('+40');

  const phoneCountries = [
    { code: '+40', country: 'RO', name: 'Romania' },
    { code: '+49', country: 'DE', name: 'Germany' },
    { code: '+33', country: 'FR', name: 'France' },
    { code: '+39', country: 'IT', name: 'Italy' },
    { code: '+34', country: 'ES', name: 'Spain' },
    { code: '+31', country: 'NL', name: 'Netherlands' },
    { code: '+32', country: 'BE', name: 'Belgium' },
    { code: '+43', country: 'AT', name: 'Austria' },
    { code: '+41', country: 'CH', name: 'Switzerland' },
    { code: '+48', country: 'PL', name: 'Poland' },
    { code: '+36', country: 'HU', name: 'Hungary' },
    { code: '+420', country: 'CZ', name: 'Czech Republic' },
    { code: '+421', country: 'SK', name: 'Slovakia' },
    { code: '+359', country: 'BG', name: 'Bulgaria' },
    { code: '+381', country: 'RS', name: 'Serbia' },
    { code: '+44', country: 'GB', name: 'United Kingdom' },
    { code: '+1', country: 'US', name: 'United States' }
  ];

  // SEO: Set document title and meta description for careers page
  useEffect(() => {
    document.title = "Cariere - Alătură-te echipei Holleman | Transport Agabaritic România";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Descoperă oportunitățile de carieră la Holleman. Căutăm profesioniști pasionați să se alăture echipei noastre în transporturi agabaritice și Project Cargo.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/cariere');
  }, []);

  // Handle hash navigation for anchor links
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerHeight = window.innerWidth <= 768 ? 100 : 120;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="cariere-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="cariere-hero"
        style={{
          backgroundImage: `url('/images/Group8746.webp')`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Cariere</h1>
          <p className="hero-subtitle">
            Alătură-te echipei care face ca imposibilul să devină posibil
          </p>
        </div>
      </section>

      {/* First Section - Why Choose Holleman */}
      <section className="why-holleman-section">
        <div className="why-holleman-container">
          <h2 className="section-title">De ce să alegi Holleman?</h2>
          
          <div className="why-holleman-content">
            <p className="intro-text">
              La Holleman, nu transportăm doar sarcini grele — ci și idei, 
              ambiții și cariere de succes. Suntem lideri în domeniul 
              transportului agabaritic și al soluțiilor logistice complexe, iar 
              forța noastră stă în oamenii care aleg să construiască alături de 
              noi.
            </p>
            
            <p className="intro-text">
              Fiecare membru al echipei noastre contribuie la proiecte de 
              anvergură națională și internațională, cu impact real în 
              infrastructură, energie, agricultură și industrie.
            </p>

            <p className="intro-text">
            Alege Holleman dacă îți dorești un mediu în care profesionalismul, siguranța și inovația sunt mai mult decât simple valori — sunt realități zilnice.
            </p>
            
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        className="benefits-employees-section"
        style={{
          backgroundImage: `url('/images/Group8747.webp')`
        }}
      >
        <div className="benefits-employees-overlay"></div>
        <div className="benefits-employees-container">
          <div className="benefits-employees-content">
            <h2 className="benefits-employees-title">Beneficii pentru angajați</h2>
            
            <div className="benefits-list">
              <div className="benefit-point">
                <span className="benefit-highlight">Pachet salarial competitiv</span>
                <span className="benefit-text">și bonusuri de performanță</span>
              </div>
              
              <div className="benefit-point">
                <span className="benefit-highlight">Acces la traininguri și certificări</span>
                <span className="benefit-text">relevante domeniului</span>
              </div>
              
              <div className="benefit-point">
                <span className="benefit-highlight">Asigurare medicală privată</span>
                <span className="benefit-text">și alte beneficii extra-salariale</span>
              </div>
              
              <div className="benefit-point">
                <span className="benefit-highlight">Oportunități de promovare internă</span>
                <span className="benefit-text">și mobilitate internațională</span>
              </div>
              
              <div className="benefit-point">
                <span className="benefit-highlight">Mediu de lucru sigur,</span>
                <span className="benefit-text">profesionist și orientat spre rezultate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Positions Section */}
      <section className="positions-section" id="posturi-disponibile">
        <div className="positions-container">
          <div className="positions-header">
            <h2 className="positions-title">Posturi disponibile</h2>
          </div>
          
          <div className="positions-grid">
            <div className="position-item">
              <div className="position-icon">
                <img src="/images/icons/Info.webp" alt="Driver icon" />
              </div>
              <h3>Șofer transport agabaritic internațional</h3>
              <div className="position-overlay">
                <div className="position-icon-white">
                  <img src="/images/icons/Info.webp" alt="Driver icon" />
                </div>
                <h3>Șofer transport agabaritic internațional</h3>
                <p>Cerinte: permis C+E, experiență în transporturi speciale, cunoștințe ADR – constituie un avantaj</p>
              </div>
            </div>
            
            <div className="position-item">
              <div className="position-icon">
                <img src="/images/icons/Info.webp" alt="Coordinator icon" />
              </div>
              <h3>Coordonator logistică / dispecer</h3>
              <div className="position-overlay">
                <div className="position-icon-white">
                  <img src="/images/icons/Info.webp" alt="Coordinator icon" />
                </div>
                <h3>Coordonator logistică / dispecer</h3>
                <p>Responsabilități: planificarea rutelor, relația cu șoferii și partenerii externi, optimizarea costurilor</p>
              </div>
            </div>
            
            <div className="position-item">
              <div className="position-icon">
                <img src="/images/icons/Info.webp" alt="Engineer icon" />
              </div>
              <h3>Inginer proiect transporturi speciale</h3>
              <div className="position-overlay">
                <div className="position-icon-white">
                  <img src="/images/icons/Info.webp" alt="Engineer icon" />
                </div>
                <h3>Inginer proiect transporturi speciale</h3>
                <p>Profil ideal: studii tehnice, experiență în evaluarea traseelor și obținerea autorizațiilor speciale</p>
              </div>
            </div>
          </div>
          
          <div className="positions-footer">
            <p className="positions-note">
              Lista completă este <span className="green-highlight">actualizată permanent</span>.<br/>
              Revino regulat pentru a descoperi cele mai noi oportunități!
            </p>
          </div>
        </div>
      </section>

      {/* Career Quote Footer */}
      <section className="career-quote-footer">
        <p className="career-quote-text">
          Pentru noi, 'prea mare' nu e o problemă. E un compliment.
        </p>
      </section>

      {/* Application Form Section */}
      <section 
        className="application-section"
        id="sectiune-dedicata-recrutarii"
        style={{
          backgroundImage: `url('/images/Group8748.webp')`
        }}
      >
        <div className="application-overlay"></div>
        <div className="application-container">
          <div className="application-form-wrapper">
            <div className="application-form-box">
              <h3 className="form-title">Formular aplicare</h3>
              
              <form className="application-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nume și prenume"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group phone-group">
                  <div className="phone-input-wrapper">
                    <select 
                      className="phone-prefix-select"
                      value={selectedPrefix}
                      onChange={(e) => setSelectedPrefix(e.target.value)}
                    >
                      {phoneCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} {country.country}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      placeholder="Telefon"
                      className="form-input phone-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Poziția"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    placeholder="Mesaj..."
                    className="form-textarea"
                    rows={4}
                  ></textarea>
                </div>
                
                <div className="form-buttons">
                  <button type="submit" className="submit-btn">
                    Trimite
                  </button>
                  <button type="button" className="cv-btn">
                    <span>CV</span>
                    <span className="cv-icon">
                      <img src="/images/folder-up.webp" alt="Upload CV" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="application-content">
            <h2 className="application-title">Aplică online</h2>
            <p className="application-subtitle">
              Ești pregătit pentru următoarea<br/>
              etapă din cariera ta?
            </p>
            <p className="application-description">
              Completează formularul și hai să<br/>
              ne cunoaștem!
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta-section" onClick={() => navigate('/contact')}>
        <div className="contact-cta-container">
          <div className="contact-cta-content">
            <h2 className="contact-cta-title">Dacă ai întrebări, ne poți contacta oricând</h2>
            <div className="contact-play-button">
              <img src="/images/gobttn.webp" alt="Contact button" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cariere;
