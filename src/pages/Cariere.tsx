import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEmailForm } from '../hooks/useEmailForm';
import { CareerFormData, isValidPhone } from '../services/emailService';
import './Cariere.css';
import '../styles/forms.css';
import ScrollArrow from '../components/ScrollArrow';

const Cariere: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, error, submitCareerForm } = useEmailForm();

  // State for Strapi content
  const [whyHollemanContent, setWhyHollemanContent] = useState<any>(null);
  const [benefitsContent, setBenefitsContent] = useState<any>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [carriereHeroContent, setCarriereHeroContent] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState<CareerFormData>({
    name: '',
    phone: '',
    message: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedCvFile, setSelectedCvFile] = useState<File | null>(null);
  const [cvFileError, setCvFileError] = useState<string | null>(null);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 5 * 1024 * 1024) {
      setCvFileError('Fișierul CV depășește limita de 5 MB. Vă rugăm să alegeți un fișier mai mic.');
      setSelectedCvFile(null);
      e.target.value = '';
      return;
    }
    setCvFileError(null);
    setSelectedCvFile(file);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Numele este obligatoriu';
    if (!formData.phone.trim()) {
      errors.phone = 'Telefonul este obligatoriu';
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = 'Formatul telefonului nu este valid';
    }
    if (!gdprAccepted) errors.gdpr = 'Trebuie să acceptați prelucrarea datelor personale';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await submitCareerForm({ ...formData, cvFile: selectedCvFile });
  };

  // Fetch content from Strapi
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [whyHollemanRes, benefitsRes, carriereHeroRes] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/cariere-de-ce-holleman?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/cariere-beneficii?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/cariere-hero'),
        ]);

        const whyHollemanData = await whyHollemanRes.json();
        const benefitsData = await benefitsRes.json();
        const carriereHeroData = await carriereHeroRes.json();

        setWhyHollemanContent(whyHollemanData.data);
        setBenefitsContent(benefitsData.data);
        setCarriereHeroContent(carriereHeroData.data);
      } catch (error) {
        console.error('Error fetching content:', error);
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
        <ScrollArrow />
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
        style={{ backgroundImage: `url('/images/Group8748.webp')` }}
      >
        <div className="application-overlay"></div>
        <div className="application-container">
          <div className="application-form-wrapper animate-on-scroll slide-from-left">
            <div className="application-form-box">
              <h3 className="form-title">Formular aplicare</h3>

              {isSuccess ? (
                <div className="success-message">
                  ✅ Aplicația a fost trimisă cu succes! Vă vom contacta în curând.
                </div>
              ) : (
                <form className="application-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nume *"
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
                    <textarea
                      name="message"
                      placeholder="Mesaj..."
                      className="form-textarea"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="checkbox-group gdpr-consent">
                    <input
                      type="checkbox"
                      id="gdpr-cariere"
                      checked={gdprAccepted}
                      onChange={e => {
                        setGdprAccepted(e.target.checked);
                        if (e.target.checked) setValidationErrors(prev => ({ ...prev, gdpr: '' }));
                      }}
                    />
                    <label htmlFor="gdpr-cariere">Consimțământ prelucrare date personale (GDPR) *</label>
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
                    <button
                      type="button"
                      className="cv-btn"
                      onClick={() => document.getElementById('cv-upload-cariere')?.click()}
                    >
                      <span>CV</span>
                      <span className="cv-icon">
                        <img src="/images/folder-up.webp" alt="Upload CV" />
                      </span>
                    </button>
                    <input
                      id="cv-upload-cariere"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={handleCvFileChange}
                    />
                  </div>
                  {cvFileError && (
                    <p style={{ fontSize: '12px', color: '#d32f2f', marginTop: '8px' }}>
                      ⚠️ {cvFileError}
                    </p>
                  )}
                  {selectedCvFile && (
                    <p style={{ fontSize: '12px', color: '#555', marginTop: '8px' }}>
                      📄 {selectedCvFile.name}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          <div className="application-content">
            <p className="application-description">
              La Holleman lucrăm cu proiecte care cer rigoare, siguranță și coordonare, de la transporturi speciale la operațiuni de manipulare și project cargo. Dacă vrei să faci parte dintr-o echipă orientată spre execuție și responsabilitate, trimite-ne CV-ul, iar noi te contactăm pentru pașii următori.
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
