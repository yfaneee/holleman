import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoUpButton from '../components/GoUpButton';
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

            <div className="service-item clickable" onClick={() => scrollToSection('logistics-integration')}>
              <div className="service-icon">
                <img src="/images/icons/heavy.webp" alt="Integrare cu transport agabaritic – activitate door-to-door" />
              </div>
              <h3>Integrare cu transport agabaritic – activitate door-to-door</h3>
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
          </div>

          <div className="services-footer">
            <button className="btn">CONTACT</button>
          </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      
      {/* Hydraulic Cranes Section */}
      <section id="hydraulic-cranes" className="content-section">
        <div className="content-container">
          <div className="content-grid">
            <div className="content-image">
              <img src="/images/source/heavyliftex1.webp" alt="Acționări speciale cu portale hidraulice mobile" />
            </div>
            <div className="content-text">
              <h2>Acționări speciale cu portale hidraulice mobile</h2>
              <p>
              Suntem echipați cu portale hidraulice mobile de mare capacitate, ideale pentru ridicarea și manipularea echipamentelor în spații limitate sau în condiții speciale. Aceste sisteme oferă o alternativă eficientă și sigură la macaralele clasice, fiind extrem de utile în hale sau spații închise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Solutions Section */}
      <section id="intelligent-solutions" className="content-section alternate">
        <div className="content-container">
          <div className="content-grid reverse">
            <div className="content-text">
              <h2>Soluții inteligente pentru relocări complexe</h2>
              <p>
              Fie că este vorba despre o linie de producție, un utilaj individual sau o întreagă instalație industrială, dezvoltăm soluții inteligente pentru relocări neprevăzute sau atipice. Intervenim cu planuri personalizate, gândite pentru realitatea din teren – indiferent de provocări.
              </p>
            </div>
            <div className="content-image">
              <img src="/images/source/heavyliftex3.webp" alt="Soluții inteligente pentru relocări" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Relocations Section */}
      <section id="global-relocations" className="content-section">
        <div className="content-container">
          <div className="content-grid">
            <div className="content-image">
              <img src="/images/source/heavyliftex2.webp" alt="Relocări în orice scară" />
            </div>
            <div className="content-text">
              <h2>Relocări în orice scară</h2>
              <p>
              Indiferent de distanță sau dimensiune, gestionăm relocări:
              <ul>
                <li>În cadrul aceleiași hale</li>
                <li>Între secții sau clădiri ale aceleiași firme</li>
                <li>La nivel local, național sau internațional</li>
                <li>În interiorul sau în afara Europei</li>
              </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Assembly Section */}
      <section id="industrial-assembly" className="content-section alternate">
        <div className="content-container">
          <div className="content-grid reverse">
            <div className="content-text">
              <h2>Montaj industrial cu echipe specializate</h2>
              <p>
              Punem la dispoziție echipe tehnice specializate în montaj industrial, formate din:
              <ul>
                <li>Electricieni industriali</li>
                <li>Mecanici</li>
                <li>Specialiști în sisteme hidraulice</li>
                <li>Experți în automatizări și punere în funcțiune</li>
              </ul>
              Ne ocupăm de instalarea și alinierea echipamentelor conform cerințelor tehnologice ale clientului.
              </p>
            </div>
            <div className="content-image">
              <img src="/images/source/heavyliftex4.webp" alt="Montaj industrial specializat" />
            </div>
          </div>
        </div>
      </section>

      {/* Logistics Integration Section */}
      <section id="logistics-integration" className="content-section">
        <div className="content-container">
          <div className="content-grid">
            <div className="content-image">
              <img src="/images/source/heavyliftex5.webp" alt="Transport integrat door-to-door" />
            </div>
            <div className="content-text">
              <h2>Integrare cu transportul agabaritic – soluții door-to-door</h2>
              <p>
              Unul dintre cele mai importante avantaje Holleman este integrarea perfectă între relocare și transport. Beneficiezi de un serviciu complet, de tip door-to-door, cu un singur partener responsabil de întregul proces: demontare, manipulare, transport și remontare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Equipment Section */}
      <section id="specialized-equipment" className="content-section alternate">
        <div className="content-container">
          <div className="content-grid reverse">
            <div className="content-text">
              <h2>Flotă de echipamente</h2>
              <div className="equipment-list">
              <h3>Pentru a oferi cele mai bune soluții, investim constant în echipamente de ultimă generație:</h3>
              <ul>
                <li>Sisteme de ridicare hidraulică (portale 100 – 600 tf)</li>
                <li>Cărucioare modulare cu role de transport și manipulare</li>
                <li>Sistem tip “skidding” pentru alunecare controlată</li>
                <li>Macarale mobile de interior</li>
                <li>Platforme autopropulsate pentru spații înguste</li>
                <li>Unelte și accesorii specializate pentru ancorare, ridicare și poziționare</li>
              </ul>
              </div>
              <div className="action-button">
                <button className="btn" onClick={() => navigate('/')}>
                  Descopera flota
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
            <div className="content-image">
              <img src="/images/source/flota.webp" alt="Flotă de echipamente" />
            </div>
          </div>
        </div>
      </section>

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

      {/* Go Up Button Component */}
      <GoUpButton />

      <Footer />
    </div>
  );
};

export default HeavyLift;
