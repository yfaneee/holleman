import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './HeavyLift.css';

const HeavyLift: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // SEO setup
    document.title = "Heavy Lift - Transport Echipamente Grele | Holleman";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Heavy Lift Holleman - transport echipamente grele și supragrele. Macarale hidraulice, relocări industriale, montaj industrial. Soluții complete pentru echipamente specializate.');
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/heavy-lift');
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="heavy-lift-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section" style={{backgroundImage: `url('/images/Group8730.webp')`}}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Heavy Lift</h1>
            <p className="hero-subtitle">Nu mutam doar obiecte, ci si limite</p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-section">
        <div className="services-container">
          <h2 className="services-title">Relocari industriale cu echipamente specializate si oameni experimentati in domeniu.</h2>
          
          <div className="services-grid">
            <div className="service-item clickable" onClick={() => scrollToSection('hydraulic-cranes')}>
              <div className="service-icon">
                <img src="/images/icons/iconaerian.webp" alt="Acționări speciale cu portale hidraulice mobile de mare tonaj" />
              </div>
              <h3>Acționări speciale cu portale hidraulice mobile de mare tonaj</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('intelligent-solutions')}>
              <div className="service-icon">
                <img src="/images/icons/iconlogistice.webp" alt="Soluții inteligente pentru diverse și neașteptate relocări la sediul firmei" />
              </div>
              <h3>Soluții inteligente pentru diverse și neașteptate relocări la sediul firmei</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('global-relocations')}>
              <div className="service-icon">
                <img src="/images/icons/iconinternational.webp" alt="Relocări în cadrul acelorași hale, firme, localități, țări, continent" />
              </div>
              <h3>Relocări în cadrul acelorași hale, firme, localități, țări, continent</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('industrial-assembly')}>
              <div className="service-icon">
                <img src="/images/icons/iconnaval.webp" alt="Montaj industrial cu echipaje noastre, folosind și specialiști în echipamente hidraulice și de automatizare" />
              </div>
              <h3>Montaj industrial cu echipaje noastre, folosind și specialiști în echipamente hidraulice și de automatizare</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('specialized-equipment')}>
              <div className="service-icon">
                <img src="/images/icons/iconvamuire.webp" alt="Flotă de echipamente: Detalii și specificații" />
              </div>
              <h3>Flotă de echipamente: Detalii și specificații</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('logistics-integration')}>
              <div className="service-icon">
                <img src="/images/icons/heavy.webp" alt="Integrare cu transport agabaritic – activitate door-to-door" />
              </div>
              <h3>Integrare cu transport agabaritic – activitate door-to-door</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>
          </div>

          <div className="services-footer">
            <button className="btn">CONTACT</button>
          </div>
        </div>
      </section>

      {/* Detailed Sections - Placeholders for now */}
      <div id="hydraulic-cranes" style={{height: '200px', background: '#f0f0f0', margin: '20px 0', padding: '20px'}}>
        <h3>Hydraulic Cranes Section - Coming Soon</h3>
      </div>
      
      <div id="intelligent-solutions" style={{height: '200px', background: '#f5f5f5', margin: '20px 0', padding: '20px'}}>
        <h3>Intelligent Solutions Section - Coming Soon</h3>
      </div>
      
      <div id="global-relocations" style={{height: '200px', background: '#f0f0f0', margin: '20px 0', padding: '20px'}}>
        <h3>Global Relocations Section - Coming Soon</h3>
      </div>
      
      <div id="industrial-assembly" style={{height: '200px', background: '#f5f5f5', margin: '20px 0', padding: '20px'}}>
        <h3>Industrial Assembly Section - Coming Soon</h3>
      </div>
      
      <div id="specialized-equipment" style={{height: '200px', background: '#f0f0f0', margin: '20px 0', padding: '20px'}}>
        <h3>Specialized Equipment Section - Coming Soon</h3>
      </div>
      
      <div id="logistics-integration" style={{height: '200px', background: '#f5f5f5', margin: '20px 0', padding: '20px'}}>
        <h3>Logistics Integration Section - Coming Soon</h3>
      </div>

      {/* Services Navigation Section */}
      <section className="services-nav-section">
        <div className="services-nav-container">
          <h2 className="services-nav-title">Afla despre mai multe servicii</h2>
          <div className="services-nav-grid">
            <div className="service-nav-item" onClick={() => navigate('/project-cargo')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconprojectcargo.webp" alt="Project Cargo icon" />
              </div>
              <h3>Project Cargo</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/itl')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconinternational.webp" alt="ITL icon" />
              </div>
              <h3>ITL</h3>
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

export default HeavyLift;
