import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HollemanMap from '../components/HollemanMap';
import { useEmailForm } from '../hooks/useEmailForm';
import { ContactFormData, isValidEmail, isValidPhone } from '../services/emailService';
import './Contact.css';
import '../styles/forms.css';

const Contact: React.FC = () => {
  const { isLoading, isSuccess, error, submitContactForm, resetForm } = useEmailForm();
  
  // State for contact locations from Strapi
  const [location1, setLocation1] = useState<any>(null);
  const [location2, setLocation2] = useState<any>(null);
  const [locationsLoading, setLocationsLoading] = useState(true);
  
  // State for coverage section from Strapi
  const [coverageContent, setCoverageContent] = useState<any>(null);
  const [coverageLoading, setCoverageLoading] = useState(true);
  const [contactHeroContent, setContactHeroContent] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    description: '',
    pickupLocation: '',
    destinationLocation: '',
    additionalServices: [],
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      additionalServices: checked
        ? [...(prev.additionalServices || []), value]
        : (prev.additionalServices || []).filter(s => s !== value),
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Numele este obligatoriu';
    if (!formData.phone.trim()) {
      errors.phone = 'Telefonul este obligatoriu';
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = 'Formatul telefonului nu este valid';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email-ul este obligatoriu';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Formatul email-ului nu este valid';
    }
    if (!formData.description.trim()) errors.description = 'Descrierea este obligatorie';
    if (!gdprAccepted) errors.gdpr = 'Trebuie să acceptați prelucrarea datelor personale';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await submitContactForm({ ...formData, files: selectedFiles });
  };

  const handleReset = () => {
    resetForm();
    setFormData({ name: '', phone: '', email: '', description: '', pickupLocation: '', destinationLocation: '', additionalServices: [] });
    setValidationErrors({});
    setSelectedFiles(null);
    setGdprAccepted(false);
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

  // Fetch contact locations from Strapi
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [location1Res, location2Res] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/contact-location?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/contact-location2?populate=*')
        ]);

        const location1Data = await location1Res.json();
        const location2Data = await location2Res.json();

        console.log('Location 1 Data:', location1Data);
        console.log('Location 2 Data:', location2Data);

        setLocation1(location1Data.data);
        setLocation2(location2Data.data);
      } catch (error) {
        console.error('Error fetching contact locations:', error);
      } finally {
        setLocationsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Fetch hero content from Strapi
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const contactHeroRes = await fetch('https://holleman-cms-production.up.railway.app/api/contact-hero');
        const contactHeroData = await contactHeroRes.json();
        setContactHeroContent(contactHeroData.data);
      } catch (error) {
        console.error('Error fetching hero content:', error);
        setContactHeroContent({
          title: 'Contact',
          subtitleText: 'Suntem aici sa te ajutam cu orice intrebare'
        });
      }
    };

    fetchHeroContent();
  }, []);

  // Fetch coverage content from Strapi
  useEffect(() => {
    const fetchCoverageContent = async () => {
      try {
        const coverageRes = await fetch('https://holleman-cms-production.up.railway.app/api/contact-acoperire?populate=*');
        const coverageData = await coverageRes.json();

        console.log('Coverage Data:', coverageData);
        setCoverageContent(coverageData.data);
      } catch (error) {
        console.error('Error fetching coverage content:', error);
      } finally {
        setCoverageLoading(false);
      }
    };

    fetchCoverageContent();
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

  return (
    <div className="contact-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="contact-hero" 
        aria-label="Contact Holleman"
        style={{
          backgroundImage: `url('/images/Group8749.webp')`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            {contactHeroContent?.title || ''}
          </h1>
          <p className="hero-subtitle">
            {contactHeroContent?.subtitleText || ''}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="formular-contact"
        className="contact-form-section"
      >
        <div className="contact-form-container">
          <div className="contact-form-content">
            <div className="form-left animate-on-scroll slide-from-left">
              <div className="form-box">
                <h2 className="form-title">Cerere de contact</h2>

                {isSuccess ? (
                  <div className="success-message">
                    ✅ Mesajul a fost trimis cu succes! Vă vom contacta în curând.
                    <button className="submit-btn" style={{ marginTop: '16px' }} onClick={handleReset}>
                      Trimite o nouă cerere
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    {/* Mandatory fields */}
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Nume / Companie *"
                        className={`form-input ${validationErrors.name ? 'error' : ''}`}
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {validationErrors.name && <span className="error-message">{validationErrors.name}</span>}
                    </div>

                    <div className="form-group">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Telefon *"
                        className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      {validationErrors.phone && <span className="error-message">{validationErrors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        className={`form-input ${validationErrors.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
                    </div>

                    <div className="form-group">
                      <textarea
                        name="description"
                        placeholder="Descriere scurtă a cererii *"
                        className={`form-textarea ${validationErrors.description ? 'error' : ''}`}
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                      {validationErrors.description && <span className="error-message">{validationErrors.description}</span>}
                    </div>

                    {/* Optional fields */}
                    <div className="form-group">
                      <input
                        type="text"
                        name="pickupLocation"
                        placeholder="Punct de încărcare"
                        className="form-input"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        name="destinationLocation"
                        placeholder="Punct de livrare"
                        className="form-input"
                        value={formData.destinationLocation}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Optional checkboxes */}
                    <div className="form-checkboxes">
                      {[
                        'Obținere autorizații speciale',
                        'Escortă tehnică',
                        'Închidere drumuri / poduri',
                        'Manipulare cu macarale',
                        'Depozitare temporară',
                        'Consultanță tehnică',
                      ].map((label) => (
                        <div className="checkbox-group" key={label}>
                          <input
                            type="checkbox"
                            id={label}
                            value={label}
                            checked={(formData.additionalServices || []).includes(label)}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor={label}>{label}</label>
                        </div>
                      ))}
                    </div>

                    {/* GDPR */}
                    <div className="checkbox-group gdpr-consent">
                      <input
                        type="checkbox"
                        id="gdpr"
                        checked={gdprAccepted}
                        onChange={e => {
                          setGdprAccepted(e.target.checked);
                          if (e.target.checked) setValidationErrors(prev => ({ ...prev, gdpr: '' }));
                        }}
                      />
                      <label htmlFor="gdpr">Consimțământ prelucrare date personale (GDPR) *</label>
                    </div>
                    {validationErrors.gdpr && <span className="error-message">{validationErrors.gdpr}</span>}

                    {error && <div className="error-message-box">❌ {error}</div>}

                    <div className="form-buttons">
                      <button
                        type="submit"
                        className={`submit-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Se trimite...' : 'Trimite'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="form-right">
              <h2 className="form-right-title">
                Scrie-ne si iti propunem rapid o solutie - transport intern sau international, cu suport operational complet pentru incarcaturi grele si agabaritice.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Info Section */}
      <section id="date-contact" className="location-section" style={{ backgroundImage: `url('/images/Group8748.webp')` }}>
        <div className="location-container">
          <div className="location-content">
            <div className="map-container">
              <HollemanMap />
            </div>
            
            <div className="contact-info">
              <div className="contact-info-grid">
                {locationsLoading ? (
                  <div>Loading locations...</div>
                ) : (
                  <>
                    {location1 && (
                      <div className="contact-info-item">
                        <div className="contact-info-header">
                          <div className="location-marker">
                            <img src="/images/icons/location-marker.webp" alt="Location" />
                          </div>
                          <h3>{location1.title}</h3>
                        </div>
                        <p className="address">
                          {location1.address}
                        </p>
                        <div className="contact-details">
                          {location1.phone && <p className="phone">{location1.phone}</p>}
                          {location1.mobile && <p className="mobile">{location1.mobile}</p>}
                        </div>
                        <div className="services">
                          {location1.services && location1.services.split('\n').filter((service: string) => service.trim()).map((service: string, index: number) => (
                            <p key={index}>{service.trim()}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {location2 && (
                      <div className="contact-info-item">
                        <div className="contact-info-header">
                          <div className="location-marker">
                            <img src="/images/icons/location-marker.webp" alt="Location" />
                          </div>
                          <h3>{location2.title}</h3>
                        </div>
                        <p className="address">
                          {location2.address}
                        </p>
                        <div className="contact-details">
                          {location2.phone && <p className="phone">{location2.phone}</p>}
                          {location2.mobile && <p className="mobile">{location2.mobile}</p>}
                        </div>
                        <div className="services">
                          {location2.services && location2.services.split('\n').filter((service: string) => service.trim()).map((service: string, index: number) => (
                            <p key={index}>{service.trim()}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Network Section — hidden per client request */}

      {/* Unlimited Coverage Section */}
      <section className="unlimited-coverage-section">
        <div className="unlimited-coverage-container">
          <div className="coverage-content">
            {coverageLoading ? (
              <div>Loading coverage content...</div>
            ) : coverageContent ? (
              <>
                <h2 className="coverage-title" style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}>
                  {coverageContent.title}
                </h2>
                
                <p className="coverage-subtitle" style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out 0.2s forwards'
                }}>
                  {coverageContent.intro}
                </p>
                
                <div className="partnerships-section">
                  <h3 className="partnerships-title" style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    animation: 'slideInUp 0.8s ease-out 0.4s forwards'
                  }}>
                    {coverageContent.subtitle}
                  </h3>
                  
                  <p className="partnerships-intro" style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    animation: 'slideInUp 0.8s ease-out 0.6s forwards'
                  }}>
                    {coverageContent.introSubtitle}
                  </p>
                  
                  
                  <ul style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    animation: 'slideInUp 0.8s ease-out 0.8s forwards',
                    display: 'block',
                    visibility: 'visible',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {coverageContent.bulletPoints && (() => {
                      const text = coverageContent.bulletPoints;
                      let points = [];
                      
                      // If it contains line breaks, use them
                      if (text.includes('\n')) {
                        points = text.split('\n').filter((point: string) => point.trim());
                      } else {
                        // Manual split based on the specific content structure
                        points = [
                          "Germania, Austria, Polonia, Olanda, Italia, Turcia",
                          "Rute comerciale Est–Vest și coridoare multimodale internaționale", 
                          "Acces rapid la porturi maritime și fluviale (Constanța, Rotterdam, Antwerp, etc.)"
                        ];
                      }
                      
                      return points.map((point: string, index: number) => (
                        <li key={index} style={{
                          opacity: 1,
                          transform: 'translateY(0px)',
                          display: 'flex',
                          visibility: 'visible',
                          alignItems: 'flex-start',
                          gap: '15px',
                          marginBottom: '20px',
                          fontSize: 'clamp(15px, 2vw, 17px)',
                          lineHeight: '1.6',
                          color: '#333'
                        }}>
                          <span style={{
                            opacity: 1,
                            visibility: 'visible',
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#D4A017',
                            borderRadius: '50%',
                            flexShrink: 0,
                            marginTop: '6px'
                          }}></span>
                          {point.trim()}
                        </li>
                      ));
                    })()}
                  </ul>
                </div>
              </>
            ) : (
              <div>No coverage content found.</div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
