import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEmailForm } from '../hooks/useEmailForm';
import { ContactFormData, isValidEmail, isValidPhone } from '../services/emailService';
import './Contact.css';
import '../styles/forms.css';

const Contact: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { isLoading, isSuccess, error, submitContactForm, resetForm } = useEmailForm();
  
  // State for contact locations from Strapi
  const [location1, setLocation1] = useState<any>(null);
  const [location2, setLocation2] = useState<any>(null);
  const [locationsLoading, setLocationsLoading] = useState(true);
  
  // State for network section from Strapi
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [networkOffices, setNetworkOffices] = useState<any[]>([]);
  const [networkLoading, setNetworkLoading] = useState(true);
  
  // State for coverage section from Strapi
  const [coverageContent, setCoverageContent] = useState<any>(null);
  const [coverageLoading, setCoverageLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    website: '',
    subject: '',
    message: '',
    cargoDescription: '',
    dimensions: '',
    weight: '',
    pickupLocation: '',
    destinationLocation: '',
    deliveryDate: '',
    specialRequirements: '',
    additionalServices: []
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

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
      resetForm();
      setFormData({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        website: '',
        subject: '',
        message: '',
        cargoDescription: '',
        dimensions: '',
        weight: '',
        pickupLocation: '',
        destinationLocation: '',
        deliveryDate: '',
        specialRequirements: '',
        additionalServices: []
      });
      setValidationErrors({});
      
      // Reset the transition after state change
      setTimeout(() => {
        if (formContent) {
          formContent.style.opacity = '1';
          formContent.style.transform = 'translateY(0)';
        }
      }, 50);
    }, 200);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...(prev.additionalServices || []), id]
        : (prev.additionalServices || []).filter(service => service !== id)
    }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Numele este obligatoriu';
    }
    
    if (!formData.contactPerson.trim()) {
      errors.contactPerson = 'Persoana de contact este obligatorie';
    }
    
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
    
    // Service-specific validation
    if (selectedService) {
      if (!formData.cargoDescription?.trim()) {
        errors.cargoDescription = 'Descrierea încărcăturii este obligatorie';
      }
      
      if (!formData.pickupLocation?.trim()) {
        errors.pickupLocation = 'Punctul de plecare este obligatoriu';
      }
      
      if (!formData.destinationLocation?.trim()) {
        errors.destinationLocation = 'Punctul de destinație este obligatoriu';
      }
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
    
    const submitData: ContactFormData = {
      ...formData,
      serviceType: selectedService ? services.find(s => s.id === selectedService)?.title : undefined,
      files: selectedFiles
    };
    
    await submitContactForm(submitData);
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

  // Fetch network content from Strapi
  useEffect(() => {
    const fetchNetworkContent = async () => {
      try {
        const [networkInfoRes, networkOfficesRes] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/contact-network-info?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/contact-network-offices?populate=*')
        ]);

        const networkInfoData = await networkInfoRes.json();
        const networkOfficesData = await networkOfficesRes.json();

        console.log('Network Info Data:', networkInfoData);
        console.log('Network Offices Data:', networkOfficesData);

        setNetworkInfo(networkInfoData.data);
        setNetworkOffices(networkOfficesData.data || []);
      } catch (error) {
        console.error('Error fetching network content:', error);
      } finally {
        setNetworkLoading(false);
      }
    };

    fetchNetworkContent();
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
      <section className="contact-hero" aria-label="Contact Holleman">
        <video 
          className="contact-hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplaybook"
          onLoadStart={() => {
            console.log('Contact video loading started');
            setIsVideoLoaded(false);
            setVideoError(false);
          }}
          onCanPlay={() => {
            console.log('Contact video can start playing');
            setIsVideoLoaded(true);
          }}
          onLoadedData={() => {
            console.log('Contact video loaded');
            setIsVideoLoaded(true);
          }}
          onError={() => {
            console.error('Contact video failed to load');
            setVideoError(true);
            setIsVideoLoaded(true);
          }}
        >
          <source src="/videos/contact.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Contact</h1>
          <p className="hero-subtitle">
            Suntem aici sa te ajutam cu orice intrebare
          </p>
        </div>
      </section>

      {/* Service Selection Section */}
      <section id="cerere-oferta" className="service-selection-section">
        <div className="service-selection-container">
          <h2 className="service-selection-title animate-on-scroll fade-up">
            Cerere ofertă – trimite solicitarea direct către divizia potrivită:
          </h2>
          
          <div className="service-cards-grid animate-on-scroll stagger-children delay-200">
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
            <div className="form-left animate-on-scroll slide-from-left">
              <div className="form-box">
                {!selectedService && (
                  <h2 className="form-title animate-on-scroll fade-up delay-200">Formular de contact general</h2>
                )}
                
                <form className="contact-form animate-on-scroll fade-up delay-300" onSubmit={handleSubmit}>
                  {selectedService ? (
                    /* Service-specific form with better layout */
                    <div className="form-columns">
                      <div className="form-column-left">
                        {/* Basic Information */}
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="Nume și prenume / Companie *"
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
                            type="text"
                            name="contactPerson"
                            placeholder="Persoană de contact *"
                            className={`form-input ${validationErrors.contactPerson ? 'error' : ''}`}
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            required
                          />
                          {validationErrors.contactPerson && (
                            <span className="error-message">{validationErrors.contactPerson}</span>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Telefon *"
                            className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                          {validationErrors.phone && (
                            <span className="error-message">{validationErrors.phone}</span>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            className={`form-input ${validationErrors.email ? 'error' : ''}`}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          {validationErrors.email && (
                            <span className="error-message">{validationErrors.email}</span>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="url"
                            name="website"
                            placeholder="Website companie"
                            className="form-input"
                            value={formData.website}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group">
                          <textarea
                            name="cargoDescription"
                            placeholder="Descrierea încărcăturii/proiect *"
                            className={`form-textarea ${validationErrors.cargoDescription ? 'error' : ''}`}
                            rows={4}
                            value={formData.cargoDescription}
                            onChange={handleInputChange}
                            required
                          />
                          {validationErrors.cargoDescription && (
                            <span className="error-message">{validationErrors.cargoDescription}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="form-column-right">
                        <div className="form-group">
                          <input
                            type="text"
                            name="dimensions"
                            placeholder="Dimensiuni (L x l x h)"
                            className="form-input"
                            value={formData.dimensions}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            name="weight"
                            placeholder="Greutate (kg)"
                            className="form-input"
                            value={formData.weight}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            name="pickupLocation"
                            placeholder="Punct de plecare (Localitate și țară) *"
                            className={`form-input ${validationErrors.pickupLocation ? 'error' : ''}`}
                            value={formData.pickupLocation}
                            onChange={handleInputChange}
                            required
                          />
                          {validationErrors.pickupLocation && (
                            <span className="error-message">{validationErrors.pickupLocation}</span>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            name="destinationLocation"
                            placeholder="Punct de destinație (Localitate și țară) *"
                            className={`form-input ${validationErrors.destinationLocation ? 'error' : ''}`}
                            value={formData.destinationLocation}
                            onChange={handleInputChange}
                            required
                          />
                          {validationErrors.destinationLocation && (
                            <span className="error-message">{validationErrors.destinationLocation}</span>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="date"
                            name="deliveryDate"
                            placeholder="Termen estimativ pentru livrare"
                            className="form-input"
                            value={formData.deliveryDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="file"
                            className="form-file-input"
                            multiple
                            onChange={handleFileChange}
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
                            <input type="checkbox" id="autorizatii" onChange={handleCheckboxChange} />
                            <label htmlFor="autorizatii">Obținere autorizații speciale</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="escorta" onChange={handleCheckboxChange} />
                            <label htmlFor="escorta">Escortă tehnică</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="inchidere" onChange={handleCheckboxChange} />
                            <label htmlFor="inchidere">Închidere drumuri / poduri</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="macarale" onChange={handleCheckboxChange} />
                            <label htmlFor="macarale">Manipulare cu macarale</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="depozitare" onChange={handleCheckboxChange} />
                            <label htmlFor="depozitare">Depozitare temporară</label>
                          </div>
                          
                          <div className="checkbox-group">
                            <input type="checkbox" id="consultanta" onChange={handleCheckboxChange} />
                            <label htmlFor="consultanta">Consultanță tehnică</label>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <textarea
                            name="specialRequirements"
                            placeholder="Alte mențiuni / cerințe speciale"
                            className="form-textarea"
                            rows={3}
                            value={formData.specialRequirements}
                            onChange={handleInputChange}
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
                          name="name"
                          placeholder="Nume și prenume / Companie *"
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
                          type="text"
                          name="contactPerson"
                          placeholder="Persoană de contact *"
                          className={`form-input ${validationErrors.contactPerson ? 'error' : ''}`}
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          required
                        />
                        {validationErrors.contactPerson && (
                          <span className="error-message">{validationErrors.contactPerson}</span>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Telefon *"
                          className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                        {validationErrors.phone && (
                          <span className="error-message">{validationErrors.phone}</span>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email *"
                          className={`form-input ${validationErrors.email ? 'error' : ''}`}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        {validationErrors.email && (
                          <span className="error-message">{validationErrors.email}</span>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="url"
                          name="website"
                          placeholder="Website companie"
                          className="form-input"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subiect"
                          className="form-input"
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <textarea
                          name="message"
                          placeholder="Mesaj..."
                          className="form-textarea"
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
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

                  {/* Success/Error Messages */}
                  {isSuccess && (
                    <div className="success-message">
                      ✅ Mesajul a fost trimis cu succes! Vă vom contacta în curând.
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
                    <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="file-upload"
                        name="fileUpload"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <button 
                        type="button" 
                        className="cv-btn"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <span className="cv-icon">
                          <img src="/images/folder-up.webp" alt="Upload" />
                        </span>
                      </button>
                      {selectedFiles && selectedFiles.length > 0 && (
                        <div className="selected-files">
                          <p>{selectedFiles.length} fișier(e) selectat(e):</p>
                          {Array.from(selectedFiles).map((file, index) => (
                            <span key={index} className="file-name">{file.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
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

      {/* International Network Section */}
      <section 
        className="international-network-section"
        style={{
          backgroundImage: `url('/images/Group8750.webp')`
        }}
      >
        <div className="international-network-container">
          <div className="network-content">
            {networkLoading ? (
              <div>Loading network content...</div>
            ) : networkInfo ? (
              <>
                <h2 className="network-title" style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}>
                  {networkInfo.title} <span className="highlight">
                    {networkInfo.highlightedTitle || "Holleman"}
                  </span>
                </h2>
                
                <div className="network-intro" style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out 0.2s forwards'
                }}>
                  <p>{networkInfo.intro}</p>
                </div>
                
                <div className="network-offices">
                  <h3 className="offices-title" style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    animation: 'slideInUp 0.8s ease-out 0.4s forwards'
                  }}>
                    {networkInfo.subtitle || "Sucursale proprii și birouri reprezentative:"}
                  </h3>
                  
                  <div className="offices-grid">
                    {networkOffices.map((office, index) => (
                      <div key={index} className="office-item" style={{
                        opacity: 0,
                        transform: 'translateY(30px)',
                        animation: `slideInUp 0.8s ease-out ${0.6 + (index * 0.1)}s forwards`
                      }}>
                        <div className="flag-icon">
                          {office.image && office.image.length > 0 && (
                            <img 
                              src={office.image[0].url.startsWith('http') 
                                ? office.image[0].url 
                                : `https://holleman-cms-production.up.railway.app${office.image[0].url}`
                              } 
                              alt={`${office.country} flag`} 
                            />
                          )}
                        </div>
                        <span>{office.country} – {office.city}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>No network content found.</div>
            )}
          </div>
        </div>
      </section>

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
