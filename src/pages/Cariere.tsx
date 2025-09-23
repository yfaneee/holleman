import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEmailForm } from '../hooks/useEmailForm';
import { CareerFormData, isValidEmail, isValidPhone } from '../services/emailService';
import './Cariere.css';
import '../styles/forms.css';

const Cariere: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPrefix, setSelectedPrefix] = useState('+40');
  const { isLoading, isSuccess, error, submitCareerForm, resetForm } = useEmailForm();
  
  // State for Strapi content
  const [whyHollemanContent, setWhyHollemanContent] = useState<any>(null);
  const [benefitsContent, setBenefitsContent] = useState<any>(null);
  const [availablePositions, setAvailablePositions] = useState<any[]>([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [carriereHeroContent, setCarriereHeroContent] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState<CareerFormData>({
    name: '',
    email: '',
    phone: '',
    phonePrefix: '+40',
    position: '',
    message: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedCvFile, setSelectedCvFile] = useState<File | null>(null);

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

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle phone prefix change
  const handlePhonePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrefix = e.target.value;
    setSelectedPrefix(newPrefix);
    setFormData(prev => ({
      ...prev,
      phonePrefix: newPrefix
    }));
  };

  // Handle CV file selection
  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedCvFile(file);
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Numele este obligatoriu';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email-ul este obligatoriu';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Formatul email-ului nu este valid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Telefonul este obligatoriu';
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = 'Formatul telefonului nu este valid';
    }
    
    if (!formData.position.trim()) {
      errors.position = 'Poziția este obligatorie';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const submitData: CareerFormData = {
      ...formData,
      cvFile: selectedCvFile
    };
    
    await submitCareerForm(submitData);
  };

  // Fetch content from Strapi
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [whyHollemanRes, benefitsRes, carriereHeroRes, positionsRes] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/cariere-de-ce-holleman?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/cariere-beneficii?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/cariere-hero'),
          fetch('https://holleman-cms-production.up.railway.app/api/cariere-positions?populate=*')
        ]);

        const whyHollemanData = await whyHollemanRes.json();
        const benefitsData = await benefitsRes.json();
        const carriereHeroData = await carriereHeroRes.json();
        const positionsData = await positionsRes.json();

        console.log('Why Holleman Data:', whyHollemanData);
        console.log('Benefits Data:', benefitsData);
        console.log('Carriere Hero Data:', carriereHeroData);
        console.log('Positions Data:', positionsData);

        setWhyHollemanContent(whyHollemanData.data);
        setBenefitsContent(benefitsData.data);
        setCarriereHeroContent(carriereHeroData.data);
        setAvailablePositions(positionsData.data || []);
      } catch (error) {
        console.error('Error fetching content:', error);
        // Fallback for hero content
        setCarriereHeroContent({
          title: 'Cariere',
          subtitleText: 'Alatura-te echipei care face ca imposibilul sa devina posibil'
        });
      } finally {
        setContentLoading(false);
      }
    };

    fetchContent();
  }, []);

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
          <h1 className="hero-title">
            {carriereHeroContent?.title || ''}
          </h1>
          <p className="hero-subtitle">
            {carriereHeroContent?.subtitleText || ''}
          </p>
        </div>
      </section>

      {/* First Section - Why Choose Holleman */}
      <section className="why-holleman-section">
        <div className="why-holleman-container">
          {contentLoading ? (
            <div>Loading...</div>
          ) : whyHollemanContent ? (
            <>
              <h2 className="section-title" style={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'slideInUp 0.8s ease-out forwards'
              }}>{whyHollemanContent.title}</h2>
              
              <div className="why-holleman-content">
                {whyHollemanContent.Description && whyHollemanContent.Description.split('\n').filter((paragraph: string) => paragraph.trim()).map((paragraph: string, index: number) => (
                  <p key={index} className="intro-text" style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    animation: `slideInUp 0.8s ease-out ${0.2 + (index * 0.2)}s forwards`
                  }}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
              
            </>
          ) : (
            <div>No Why Holleman content found. Check console for data.</div>
          )}
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
            {contentLoading ? (
              <div>Loading...</div>
            ) : benefitsContent ? (
              <>
                <h2 className="benefits-employees-title" style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out 0.8s forwards'
                }}>{benefitsContent.title}</h2>
                
                <div className="benefits-list" style={{opacity: 1}}>
                  {/* Render benefits from Strapi data */}
                  {benefitsContent.highlightedTitle1 && benefitsContent.title1 && (
                    <div className="benefit-point" style={{
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: 'slideInUp 0.6s ease-out 1.0s forwards'
                    }}>
                      <span className="benefit-highlight">{benefitsContent.highlightedTitle1}</span>
                      <span className="benefit-text">{benefitsContent.title1}</span>
                    </div>
                  )}
                  
                  {benefitsContent.highlightedTitle2 && benefitsContent.title2 && (
                    <div className="benefit-point" style={{
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: 'slideInUp 0.6s ease-out 1.1s forwards'
                    }}>
                      <span className="benefit-highlight">{benefitsContent.highlightedTitle2}</span>
                      <span className="benefit-text">{benefitsContent.title2}</span>
                    </div>
                  )}
                  
                  {benefitsContent.highlightedTitle3 && benefitsContent.title3 && (
                    <div className="benefit-point" style={{
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: 'slideInUp 0.6s ease-out 1.2s forwards'
                    }}>
                      <span className="benefit-highlight">{benefitsContent.highlightedTitle3}</span>
                      <span className="benefit-text">{benefitsContent.title3}</span>
                    </div>
                  )}
                  
                  {benefitsContent.highlightedTitle4 && benefitsContent.title4 && (
                    <div className="benefit-point" style={{
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: 'slideInUp 0.6s ease-out 1.3s forwards'
                    }}>
                      <span className="benefit-highlight">{benefitsContent.highlightedTitle4}</span>
                      <span className="benefit-text">{benefitsContent.title4}</span>
                    </div>
                  )}
                  
                  {benefitsContent.highlightedTitle5 && benefitsContent.title5 && (
                    <div className="benefit-point" style={{
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: 'slideInUp 0.6s ease-out 1.4s forwards'
                    }}>
                      <span className="benefit-highlight">{benefitsContent.highlightedTitle5}</span>
                      <span className="benefit-text">{benefitsContent.title5}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div>No Benefits content found. Check console for data.</div>
            )}
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
            {availablePositions.length > 0 ? (
              availablePositions.map((position, index) => (
                <div key={position.id || index} className="position-item">
                  <div className="position-icon">
                    <img src="/images/icons/Info.webp" alt="Position icon" />
                  </div>
                  <h3>{position.title}</h3>
                  <div className="position-overlay">
                    <div className="position-icon-white">
                      <img src="/images/icons/Info.webp" alt="Position icon" />
                    </div>
                    <h3>{position.title}</h3>
                    <p>{position.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-positions">
                <p>Nu există poziții disponibile în acest moment.</p>
              </div>
            )}
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
          {contentLoading ? (
            "Loading..."
          ) : whyHollemanContent?.careerQuoteText ? (
            whyHollemanContent.careerQuoteText
          ) : (
            "Pentru noi, 'prea mare' nu e o problemă. E un compliment."
          )}
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
          <div className="application-form-wrapper animate-on-scroll slide-from-left">
            <div className="application-form-box">
              <h3 className="form-title animate-on-scroll fade-up delay-200">Formular aplicare</h3>
              
              <form className="application-form animate-on-scroll fade-up delay-300" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nume și prenume"
                    className={`form-input ${validationErrors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {validationErrors.name && (
                    <span className="error-message">{validationErrors.name}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`form-input ${validationErrors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {validationErrors.email && (
                    <span className="error-message">{validationErrors.email}</span>
                  )}
                </div>
                
                <div className="form-group phone-group">
                  <div className="phone-input-wrapper">
                    <select 
                      className="phone-prefix-select"
                      value={selectedPrefix}
                      onChange={handlePhonePrefixChange}
                    >
                      {phoneCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} {country.country}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon"
                      className={`form-input phone-input ${validationErrors.phone ? 'error' : ''}`}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {validationErrors.phone && (
                    <span className="error-message">{validationErrors.phone}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="position"
                    placeholder="Poziția"
                    className={`form-input ${validationErrors.position ? 'error' : ''}`}
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                  {validationErrors.position && (
                    <span className="error-message">{validationErrors.position}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Mesaj..."
                    className="form-textarea"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                {/* Success/Error Messages */}
                {isSuccess && (
                  <div className="success-message">
                    ✅ Aplicația a fost trimisă cu succes! Vă vom contacta în curând.
                  </div>
                )}
                
                {error && (
                  <div className="error-message-box">
                    ❌ {error}
                  </div>
                )}

                <div className="form-buttons">
                  <button 
                    type="submit" 
                    className={`submit-btn ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Se trimite...' : 'Trimite'}
                  </button>
                  <button 
                    type="button" 
                    className="cv-btn"
                    onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                  >
                    <span>CV</span>
                    <span className="cv-icon">
                      <img src="/images/folder-up.webp" alt="Upload CV" />
                    </span>
                  </button>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={handleCvFileChange}
                  />
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
