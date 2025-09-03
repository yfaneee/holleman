import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Contact.css';

const Contact: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Service data
  const services = [
    {
      id: 'project-cargo',
      title: 'Project Cargo',
      icon: '/images/icons/iconprojectcargo.webp'
    },
    {
      id: 'itl',
      title: 'ITL',
      icon: '/images/icons/iconinternational.webp'
    },
    {
      id: 'heavy-lift',
      title: 'Heavy Lift',
      icon: '/images/icons/heavy.webp'
    },
    {
      id: 'agro',
      title: 'Agro',
      icon: '/images/icons/agro.webp'
    }
  ];

  // Handle service selection with smooth scroll
  const handleServiceSelection = (serviceId: string) => {
    setSelectedService(serviceId);
    
    // Smooth scroll to form section
    setTimeout(() => {
      const formSection = document.querySelector('.contact-form-section');
      if (formSection) {
        const headerHeight = window.innerWidth <= 768 ? 100 : 120;
        const elementPosition = formSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Handle return to general form with smooth transition
  const handleReturnToGeneral = () => {
    // Add a slight fade effect before changing
    const formContent = document.querySelector('.contact-form-content') as HTMLElement;
    if (formContent) {
      formContent.style.opacity = '0.7';
      formContent.style.transform = 'translateY(-10px)';
    }
    
    setTimeout(() => {
      setSelectedService(null);
      
      // Reset the transition after state change
      setTimeout(() => {
        if (formContent) {
          formContent.style.opacity = '1';
          formContent.style.transform = 'translateY(0)';
        }
      }, 50);
    }, 200);
  };

  // SEO: Set document title and meta description for contact page
  useEffect(() => {
    document.title = "Contact - Contactează Holleman | Transport Agabaritic România";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contactează echipa Holleman pentru transporturi agabaritice, Project Cargo și soluții logistice. Suntem aici să te ajutăm cu orice întrebare.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/contact');
  }, []);

  // Handle scroll to section based on URL path
  useEffect(() => {
    const handleScrollToSection = () => {
      const path = window.location.pathname;
      let targetId = '';
      
      if (path === '/contact/formular') {
        targetId = 'formular-contact';
      } else if (path === '/contact/date') {
        targetId = 'date-contact';
      } else if (path === '/contact/cerere') {
        targetId = 'cerere-oferta';
      }
      
      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
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
    };

    handleScrollToSection();
  }, []);

  return (
    <div className="contact-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="contact-hero"
        style={{
          backgroundImage: `url('/images/Group8749.webp')`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Contact</h1>
          <p className="hero-subtitle">
            Suntem aici să te ajutăm cu orice întrebare
          </p>
        </div>
      </section>

      {/* Service Selection Section */}
      <section id="cerere-oferta" className="service-selection-section">
        <div className="service-selection-container">
          <h2 className="service-selection-title">
            Cerere ofertă – trimite solicitarea direct către divizia potrivită:
          </h2>
          
          <div className="service-cards-grid">
            {services.map((service) => (
              <div 
                key={service.id}
                className="service-item"
                onClick={() => handleServiceSelection(service.id)}
              >
                <div className="service-icon">
                  <img src={service.icon} alt={`${service.title} icon`} />
                </div>
                <h3>{service.title}</h3>
                <p>cerere ofertă</p>
                
                <div className="service-overlay">
                  <div className="service-icon-white">
                    <img src={service.icon} alt={`${service.title} icon`} />
                  </div>
                  <h3>Cere o oferta</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        id="formular-contact"
        className="contact-form-section"
        style={{
          backgroundImage: `url('/images/Group8748.webp')`
        }}
      >
        <div className="contact-form-container">
          {selectedService && (
            <div className="form-section-title">
              <h2>Formular de contact {services.find(s => s.id === selectedService)?.title}</h2>
            </div>
          )}
          <div className={`contact-form-content ${selectedService ? 'service-selected' : ''}`}>
            <div className="form-left">
              <div className="form-box">
                {!selectedService && (
                  <h2 className="form-title">Formular de contact general</h2>
                )}
                
                <form className="contact-form">
                  {selectedService ? (
                    /* Service-specific form with better layout */
                    <div className="form-columns">
                      <div className="form-column-left">
                        {/* Basic Information */}
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Nume și prenume / Companie *"
                            className="form-input"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Persoană de contact *"
                            className="form-input"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="tel"
                            placeholder="Telefon *"
                            className="form-input"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder="Email *"
                            className="form-input"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="url"
                            placeholder="Website companie"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <textarea
                            placeholder="Descrierea încărcăturii/proiect *"
                            className="form-textarea"
                            rows={4}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-column-right">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Dimensiuni (L x l x h)"
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="number"
                            placeholder="Greutate (kg)"
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Punct de plecare (Localitate și țară) *"
                            className="form-input"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Punct de destinație (Localitate și țară) *"
                            className="form-input"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="date"
                            placeholder="Termen estimativ pentru livrare"
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="file"
                            className="form-file-input"
                            multiple
                          />
                          <label className="form-file-label">
                            <span>Documente atașate</span>
                            <img src="/images/folder-up.webp" alt="Upload" />
                          </label>
                        </div>
                      </div>
                      
                      {/* Full width sections */}
                      <div className="form-full-width">
                        {/* Checkboxes for additional services */}
                        <div className="form-checkboxes">
                          <div className="checkbox-group">
                            <input type="checkbox" id="autorizatii" />
                            <label htmlFor="autorizatii">Obținere autorizații speciale</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="escorta" />
                            <label htmlFor="escorta">Escortă tehnică</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="inchidere" />
                            <label htmlFor="inchidere">Închidere drumuri / poduri</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="macarale" />
                            <label htmlFor="macarale">Manipulare cu macarale</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="depozitare" />
                            <label htmlFor="depozitare">Depozitare temporară</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="consultanta" />
                            <label htmlFor="consultanta">Consultanță tehnică</label>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <textarea
                            placeholder="Alte mențiuni / cerințe speciale"
                            className="form-textarea"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* General contact form */
                    <>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Nume și prenume / Companie *"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Persoană de contact *"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="tel"
                          placeholder="Telefon *"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="email"
                          placeholder="Email *"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="url"
                          placeholder="Website companie"
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Subiect"
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <textarea
                          placeholder="Mesaj..."
                          className="form-textarea"
                          rows={5}
                        />
                      </div>
                    </>
                  )}

                  {/* GDPR Consent */}
                  <div className="checkbox-group gdpr-consent">
                    <input type="checkbox" id="gdpr" required />
                    <label htmlFor="gdpr">
                      Consimțământ prelucrare date personale (GDPR) *
                    </label>
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                      Trimite
                    </button>
                    <button type="button" className="cv-btn">
                      <span className="cv-icon">
                        <img src="/images/folder-up.webp" alt="Upload" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="form-right">
              <h2 className="form-right-title">Suntem aici pentru tine</h2>
              <p className="form-right-text">
                Ai o întrebare, o solicitare sau vrei să discutăm despre un proiect 
                logistic complex? Indiferent de natura solicitării tale, echipa 
                Holleman îți stă la dispoziție cu promptitudine și profesionalism.
              </p>
              
              {selectedService && (
                <div className="return-to-general">
                  <p className="return-text">
                    Preferi să folosești formularul general de contact?
                  </p>
                  <button 
                    className="btn return-btn"
                    onClick={handleReturnToGeneral}
                  >
                    Revino la formularul general
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Info Section */}
      <section id="date-contact" className="location-section">
        <div className="location-container">
          <div className="location-content">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1850.318501834485!2d26.102393031937627!3d44.339111155963934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ae019bb55c84a3%3A0x2bc4b1774827add9!2sHolleman%20Special%20Transport%20%26%20Project%20Cargo%20-%20transport%20agabaritic!5e0!3m2!1sro!2snl!4v1755968145616!5m2!1sro!2snl"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hartă locație Holleman Special Transport & Project Cargo, București"
              ></iframe>
            </div>
            
            <div className="contact-info">
              <div className="contact-info-grid">
                <div className="contact-info-item">
                  <div className="contact-info-header">
                    <div className="location-marker">
                      <img src="/images/icons/location-marker.webp" alt="Location" />
                    </div>
                    <h3>Sediul Central București - Ilfov</h3>
                  </div>
                  <p className="address">
                    📍 Șoseaua de Centură nr. 29, Jilava, jud. Ilfov
                  </p>
                  <div className="contact-details">
                    <p className="phone">📞 +40 21 321 38 22 / 321 61 82</p>
                    <p className="mobile">📱 +40 744 317 713 / +40 745 017 529</p>
                  </div>
                  <div className="services">
                    <p>🔹 Coordonare proiecte sud-est România și relații cu autoritățile</p>
                    <p>🔹 Dispecerat regional și consultanță logistică</p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="contact-info-header">
                    <div className="location-marker">
                      <img src="/images/icons/location-marker.webp" alt="Location" />
                    </div>
                    <h3>Sucursala Constanța</h3>
                  </div>
                  <p className="address">
                    📍 Constanța
                  </p>
                  <div className="contact-details">
                    <p className="phone">
                      📞 +40 XXX XXX XXX
                    </p>
                  </div>
                  <div className="services">
                    <p>🔹 Proiecte multimodale (naval – rutier)</p>
                    <p>🔹 Încărcare/descărcare containere, soluții portuare</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Network Section */}
      <section 
        className="international-network-section"
        style={{
          backgroundImage: `url('/images/Group8750.webp')`
        }}
      >
        <div className="international-network-container">
          <div className="network-content">
            <h2 className="network-title">
              Rețea internațională <span className="highlight">Holleman</span>
            </h2>
            
            <div className="network-intro">
              <p>Suntem activi în Europa Centrală și de Est printr-o rețea consolidată de filiale și parteneri strategici:</p>
            </div>
            
            <div className="network-offices">
              <h3 className="offices-title">Sucursale proprii și birouri reprezentative:</h3>
              
              <div className="offices-grid">
                <div className="office-item">
                  <div className="flag-icon">
                    <img src="/images/icons/BGflag.webp" alt="Bulgaria flag" />
                  </div>
                  <span>Bulgaria – Sofia</span>
                </div>
                
                <div className="office-item">
                  <div className="flag-icon">
                    <img src="/images/icons/SRflag.webp" alt="Serbia flag" />
                  </div>
                  <span>Serbia – Belgrad</span>
                </div>
                
                <div className="office-item">
                  <div className="flag-icon">
                    <img src="/images/icons/MDflag.webp" alt="Moldova flag" />
                  </div>
                  <span>Republica Moldova – Chișinău</span>
                </div>
                
                <div className="office-item">
                  <div className="flag-icon">
                    <img src="/images/icons/HUflag.webp" alt="Hungary flag" />
                  </div>
                  <span>Ungaria – Szeged</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlimited Coverage Section */}
      <section className="unlimited-coverage-section">
        <div className="unlimited-coverage-container">
          <div className="coverage-content">
            <h2 className="coverage-title">Acoperire fără limite</h2>
            <p className="coverage-subtitle">
              Indiferent unde se află proiectul tău – în România, în Europa sau în afara granițelor UE 
              – Holleman îți oferă o rețea pregătită să răspundă rapid, eficient și profesionist.
            </p>
            
            <div className="partnerships-section">
              <h3 className="partnerships-title">Parteneriate internaționale:</h3>
              <p className="partnerships-intro">Colaborăm cu operatori logistici și transportatori specializați în:</p>
              
              <ul className="partnerships-list">
                <li>
                  <span className="bullet-point"></span>
                  Germania, Austria, Polonia, Olanda, Italia, Turcia
                </li>
                <li>
                  <span className="bullet-point"></span>
                  Rute comerciale Est–Vest și coridoare multimodale internaționale
                </li>
                <li>
                  <span className="bullet-point"></span>
                  Acces rapid la porturi maritime și fluviale (Constanța, Rotterdam, Antwerp, etc.)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
