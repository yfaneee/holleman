import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ITL.css';

const ITL: React.FC = () => {
  const navigate = useNavigate();
  
  const heroStyle = {
    backgroundImage: `url('/images/ITLbackground.webp')`
  };

  // SEO: Set document title and meta description for ITL page
  useEffect(() => {
    document.title = "ITL - Transport Internațional și Logistică | Holleman";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ITL Holleman - servicii complete de transport internațional și logistică. Transport rutier, naval, aerian. Servicii vamale, asistență documentară. Rețea europeană și globală.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/itl');
  }, []);

  return (
    <div className="itl-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section" style={heroStyle}>
        <div className="hero-content">
          <h1 className="hero-title">ITL</h1>
          <p className="hero-subtitle">Ne plimbăm mai mult decât GPS-ul tău.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">Servicii</h2>
          </div>
          
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconinternational.webp" alt="Transport rutier international" />
              </div>
              <h3>Transport rutier internațional</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconinternational.webp" alt="Transport rutier international" />
                </div>
                <h3>Transport rutier internațional</h3>
                <p>Transport complet (FTL) și în regim de grupaj (LTL) cu camioane cu prelată, frigorifice, dubă, platformă, megatrailer etc.</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconnaval.webp" alt="Transport naval" />
              </div>
              <h3>Transport naval</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconnaval.webp" alt="Transport naval" />
                </div>
                <h3>Transport naval</h3>
                <p>Import/export containere FCL/LCL <br />
                Soluții multimodale prin porturi europene majore (Constanța, Rotterdam, Hamburg etc.) </p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconaerian.webp" alt="Transport aerian" />
              </div>
              <h3>Transport aerian</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconaerian.webp" alt="Transport aerian" />
                </div>
                <h3>Transport aerian</h3>
                <p>Livrări urgente door-to-door <br />
                Servicii Express & Economy pentru toate continentele</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconlogistice.webp" alt="Servicii logistice" />
              </div>
              <h3>Servicii logistice</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconlogistice.webp" alt="Servicii logistice" />
                </div>
                <h3>Servicii logistice</h3>
                <p>Depozitare temporară sau pe termen lung, în centre logistice autorizate <br />
                Distributie eficientă în rețele naționale și internaționale</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconvamuire.webp" alt="Vămuire și asistență documentară" />
              </div>
              <h3>Vămuire și asistență documentară</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconvamuire.webp" alt="Vămuire și asistență documentară" />
                </div>
                <h3>Vămuire și asistență documentară</h3>
                <p>Formalități vamale de import/export <br />
                Asistență completă pentru documentația de transport</p>
              </div>
            </div>
          </div>
          
          <div className="services-footer">
            <button className="btn" onClick={() => window.location.href = '/contact'}>CONTACT</button>
          </div>
        </div>
      </section>

      {/* Transport și logistică fără granițe Section */}
      <section className="transport-logistics-section" style={{backgroundImage: `url('/images/Group8728.webp')`}}>
        <div className="transport-logistics-container">
          <div className="transport-logistics-content">
            <h2 className="transport-logistics-title">
              Transport și logistică <span className="highlight">fără granițe</span>
            </h2>
            
            <ul className="transport-logistics-list">
              <li>Divizia ITL din cadrul Holleman oferă servicii complete de transport și logistică, atât la nivel intern, cât și internațional.</li>
              <li>Gestionăm volume diverse de marfă – de la transporturi complete cu camioane standard sau specializate, până la grupaje, containere sau livrări aeriene rapide.</li>
              <li>Asigurăm un flux logistic optim pentru fiecare tip de client, indiferent de destinație sau industrie</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Rețea și acoperire Section */}
      <section className="network-coverage-section">
        <div className="network-coverage-container">
          <div className="network-coverage-content">
            <div className="network-content-left">
              <h2 className="network-coverage-title">Rețea și acoperire</h2>
              <div className="network-description">
                <p>
                  Prin parteneriate solide și o rețea extinsă de colaboratori internaționali, asigurăm acoperire la nivel european și global. Holleman ITL gestionează fluxuri logistice între Europa, Asia, Orientul Mijlociu și America de Nord, oferind:
                </p>
              </div>
              <ul className="network-features-list">
                <li>Puncte de plecare/descărcare în peste 30 de țări</li>
                <li>Timp de tranzit predictibil și costuri optimizate</li>
                <li>Trasabilitate completă pentru fiecare transport</li>
              </ul>
            </div>
            <div className="network-content-right">
              <div className="network-map-container">
                <img src="/images/hartaITL.webp" alt="Harta rețelei ITL Holleman" className="network-map" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" style={{backgroundImage: `url('/images/Group8729.webp')`}}>
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Alege <span className="highlight">Holleman ITL</span> pentru o logistică fără sincope, soluții inteligente și un partener de încredere în mișcarea mărfurilor tale.
            </h2>
            <button className="btn cta-btn" onClick={() => window.location.href = '/contact'}>
              Contacteaza-ne pentru o oferta personalizata
              <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Navigation Section */}
      <section className="services-nav-section">
        <div className="services-nav-container">
          <h2 className="services-nav-title">Afla despre mai multe servicii</h2>
          
          <div className="services-nav-grid">
            <div className="service-nav-item" onClick={() => {/* TODO: Navigate to Heavy Lift page */}}>
              <div className="service-nav-icon">
                <img src="/images/icons/heavy.webp" alt="Heavy Lift icon" />
              </div>
              <h3>Heavy Lift</h3>
            </div>
            
            <div className="service-nav-item" onClick={() => navigate('/project-cargo')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconprojectcargo.webp" alt="Project Cargo icon" />
              </div>
              <h3>Project Cargo</h3>
            </div>
            
            <div className="service-nav-item" onClick={() => {/* TODO: Navigate to Agro page */}}>
              <div className="service-nav-icon">
                <img src="/images/icons/agro.webp" alt="Agro icon" />
              </div>
              <h3>Agro</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ITL;
