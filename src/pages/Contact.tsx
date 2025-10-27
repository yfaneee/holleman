import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEmailForm } from '../hooks/useEmailForm';
import { ContactFormData, isValidEmail, isValidPhone } from '../services/emailService';
import { useLanguage } from '../context/LanguageContext';
import { translationService } from '../services/translationService';
import './Contact.css';
import '../styles/forms.css';

const Contact: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { isLoading, isSuccess, error, submitContactForm, resetForm } = useEmailForm();
  const { currentLanguage } = useLanguage();
  
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
  const [contactHeroContent, setContactHeroContent] = useState<any>(null);
  
  // State for expandable office cards
  const [expandedOffice, setExpandedOffice] = useState<number | null>(null);
  
  // Function to toggle office expansion
  const toggleOfficeExpansion = (index: number) => {
    setExpandedOffice(expandedOffice === index ? null : index);
  };
  
  // Get office details from Strapi data
  const getOfficeDetails = (office: any) => {
    // Only return details if they exist in Strapi
    if (office.detailedInfo) {
      return {
        address: office.detailedInfo.address,
        phone: office.detailedInfo.phone,
        email: office.detailedInfo.email,
        website: office.detailedInfo.website
      };
    }
    return null;
  };
  
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

  // Static validation messages in multiple languages
  const validationMessages = {
    ro: {
      nameRequired: 'Numele este obligatoriu',
      contactPersonRequired: 'Persoana de contact este obligatorie',
      phoneRequired: 'Telefonul este obligatoriu',
      phoneInvalid: 'Formatul telefonului nu este valid',
      emailRequired: 'Email-ul este obligatoriu',
      emailInvalid: 'Formatul email-ului nu este valid',
      cargoDescriptionRequired: 'Descrierea încărcăturii este obligatorie',
      pickupLocationRequired: 'Punctul de plecare este obligatoriu',
      destinationLocationRequired: 'Punctul de destinație este obligatoriu'
    },
    en: {
      nameRequired: 'Name is required',
      contactPersonRequired: 'Contact person is required',
      phoneRequired: 'Phone is required',
      phoneInvalid: 'Phone format is invalid',
      emailRequired: 'Email is required',
      emailInvalid: 'Email format is invalid',
      cargoDescriptionRequired: 'Cargo description is required',
      pickupLocationRequired: 'Pickup location is required',
      destinationLocationRequired: 'Destination location is required'
    },
    de: {
      nameRequired: 'Name ist erforderlich',
      contactPersonRequired: 'Ansprechpartner ist erforderlich',
      phoneRequired: 'Telefon ist erforderlich',
      phoneInvalid: 'Telefonformat ist ungültig',
      emailRequired: 'E-Mail ist erforderlich',
      emailInvalid: 'E-Mail-Format ist ungültig',
      cargoDescriptionRequired: 'Ladungsbeschreibung ist erforderlich',
      pickupLocationRequired: 'Abholort ist erforderlich',
      destinationLocationRequired: 'Zielort ist erforderlich'
    },
    fr: {
      nameRequired: 'Le nom est requis',
      contactPersonRequired: 'La personne de contact est requise',
      phoneRequired: 'Le téléphone est requis',
      phoneInvalid: 'Le format du téléphone est invalide',
      emailRequired: 'L\'email est requis',
      emailInvalid: 'Le format de l\'email est invalide',
      cargoDescriptionRequired: 'La description du fret est requise',
      pickupLocationRequired: 'Le lieu de collecte est requis',
      destinationLocationRequired: 'Le lieu de destination est requis'
    },
    es: {
      nameRequired: 'El nombre es requerido',
      contactPersonRequired: 'La persona de contacto es requerida',
      phoneRequired: 'El teléfono es requerido',
      phoneInvalid: 'El formato del teléfono es inválido',
      emailRequired: 'El email es requerido',
      emailInvalid: 'El formato del email es inválido',
      cargoDescriptionRequired: 'La descripción de la carga es requerida',
      pickupLocationRequired: 'El lugar de recogida es requerido',
      destinationLocationRequired: 'El lugar de destino es requerido'
    },
    it: {
      nameRequired: 'Il nome è richiesto',
      contactPersonRequired: 'La persona di contatto è richiesta',
      phoneRequired: 'Il telefono è richiesto',
      phoneInvalid: 'Il formato del telefono non è valido',
      emailRequired: 'L\'email è richiesta',
      emailInvalid: 'Il formato dell\'email non è valido',
      cargoDescriptionRequired: 'La descrizione del carico è richiesta',
      pickupLocationRequired: 'Il luogo di ritiro è richiesto',
      destinationLocationRequired: 'Il luogo di destinazione è richiesto'
    },
    hu: {
      nameRequired: 'A név kötelező',
      contactPersonRequired: 'A kapcsolattartó kötelező',
      phoneRequired: 'A telefon kötelező',
      phoneInvalid: 'A telefon formátuma érvénytelen',
      emailRequired: 'Az email kötelező',
      emailInvalid: 'Az email formátuma érvénytelen',
      cargoDescriptionRequired: 'A rakomány leírása kötelező',
      pickupLocationRequired: 'A felvételi hely kötelező',
      destinationLocationRequired: 'A célhely kötelező'
    },
    bg: {
      nameRequired: 'Името е задължително',
      contactPersonRequired: 'Лицето за контакт е задължително',
      phoneRequired: 'Телефонът е задължителен',
      phoneInvalid: 'Форматът на телефона е невалиден',
      emailRequired: 'Имейлът е задължителен',
      emailInvalid: 'Форматът на имейла е невалиден',
      cargoDescriptionRequired: 'Описанието на товара е задължително',
      pickupLocationRequired: 'Мястото за вземане е задължително',
      destinationLocationRequired: 'Местоназначението е задължително'
    },
    sr: {
      nameRequired: 'Име је обавезно',
      contactPersonRequired: 'Контакт особа је обавезна',
      phoneRequired: 'Телефон је обавезан',
      phoneInvalid: 'Формат телефона није валидан',
      emailRequired: 'Емаил је обавезан',
      emailInvalid: 'Формат емаила није валидан',
      cargoDescriptionRequired: 'Опис терета је обавезан',
      pickupLocationRequired: 'Место преузимања је обавезно',
      destinationLocationRequired: 'Одредиште је обавезно'
    }
  };

  // Static translations for form placeholders
  const placeholderTranslations = {
    ro: {
      nameCompany: 'Nume și prenume / Companie *',
      contactPerson: 'Persoană de contact *',
      phone: 'Telefon *',
      email: 'Email *',
      website: 'Website companie',
      subject: 'Subiect',
      message: 'Mesaj...',
      cargoDescription: 'Descrierea încărcăturii/proiect *',
      dimensions: 'Dimensiuni (L x l x h)',
      weight: 'Greutate (kg)',
      pickupLocation: 'Punct de plecare (Localitate și țară) *',
      destinationLocation: 'Punct de destinație (Localitate și țară) *',
      deliveryDate: 'Termen estimativ pentru livrare',
      specialRequirements: 'Alte mențiuni / cerințe speciale',
      attachedDocuments: 'Documente atașate',
      gdprConsent: 'Consimțământ prelucrare date personale (GDPR) *'
    },
    en: {
      nameCompany: 'Name and surname / Company *',
      contactPerson: 'Contact person *',
      phone: 'Phone *',
      email: 'Email *',
      website: 'Company website',
      subject: 'Subject',
      message: 'Message...',
      cargoDescription: 'Cargo/project description *',
      dimensions: 'Dimensions (L x W x H)',
      weight: 'Weight (kg)',
      pickupLocation: 'Pickup location (City and country) *',
      destinationLocation: 'Destination location (City and country) *',
      deliveryDate: 'Estimated delivery date',
      specialRequirements: 'Other mentions / special requirements',
      attachedDocuments: 'Attached documents',
      gdprConsent: 'Personal data processing consent (GDPR) *'
    },
    de: {
      nameCompany: 'Name und Vorname / Unternehmen *',
      contactPerson: 'Ansprechpartner *',
      phone: 'Telefon *',
      email: 'E-Mail *',
      website: 'Firmen-Website',
      subject: 'Betreff',
      message: 'Nachricht...',
      cargoDescription: 'Fracht-/Projektbeschreibung *',
      dimensions: 'Abmessungen (L x B x H)',
      weight: 'Gewicht (kg)',
      pickupLocation: 'Abholort (Stadt und Land) *',
      destinationLocation: 'Zielort (Stadt und Land) *',
      deliveryDate: 'Voraussichtliches Lieferdatum',
      specialRequirements: 'Sonstige Hinweise / besondere Anforderungen',
      attachedDocuments: 'Angehängte Dokumente',
      gdprConsent: 'Einverständnis zur Verarbeitung personenbezogener Daten (DSGVO) *'
    },
    fr: {
      nameCompany: 'Nom et prénom / Entreprise *',
      contactPerson: 'Personne de contact *',
      phone: 'Téléphone *',
      email: 'Email *',
      website: 'Site web de l\'entreprise',
      subject: 'Sujet',
      message: 'Message...',
      cargoDescription: 'Description du fret/projet *',
      dimensions: 'Dimensions (L x l x h)',
      weight: 'Poids (kg)',
      pickupLocation: 'Lieu de collecte (Ville et pays) *',
      destinationLocation: 'Lieu de destination (Ville et pays) *',
      deliveryDate: 'Date de livraison estimée',
      specialRequirements: 'Autres mentions / exigences spéciales',
      attachedDocuments: 'Documents joints',
      gdprConsent: 'Consentement au traitement des données personnelles (RGPD) *'
    },
    es: {
      nameCompany: 'Nombre y apellido / Empresa *',
      contactPerson: 'Persona de contacto *',
      phone: 'Teléfono *',
      email: 'Email *',
      website: 'Sitio web de la empresa',
      subject: 'Asunto',
      message: 'Mensaje...',
      cargoDescription: 'Descripción de la carga/proyecto *',
      dimensions: 'Dimensiones (L x A x H)',
      weight: 'Peso (kg)',
      pickupLocation: 'Lugar de recogida (Ciudad y país) *',
      destinationLocation: 'Lugar de destino (Ciudad y país) *',
      deliveryDate: 'Fecha estimada de entrega',
      specialRequirements: 'Otras menciones / requisitos especiales',
      attachedDocuments: 'Documentos adjuntos',
      gdprConsent: 'Consentimiento para el procesamiento de datos personales (RGPD) *'
    },
    it: {
      nameCompany: 'Nome e cognome / Azienda *',
      contactPerson: 'Persona di contatto *',
      phone: 'Telefono *',
      email: 'Email *',
      website: 'Sito web aziendale',
      subject: 'Oggetto',
      message: 'Messaggio...',
      cargoDescription: 'Descrizione del carico/progetto *',
      dimensions: 'Dimensioni (L x l x h)',
      weight: 'Peso (kg)',
      pickupLocation: 'Luogo di ritiro (Città e paese) *',
      destinationLocation: 'Luogo di destinazione (Città e paese) *',
      deliveryDate: 'Data di consegna stimata',
      specialRequirements: 'Altre menzioni / requisiti speciali',
      attachedDocuments: 'Documenti allegati',
      gdprConsent: 'Consenso al trattamento dei dati personali (GDPR) *'
    },
    hu: {
      nameCompany: 'Név és vezetéknév / Vállalat *',
      contactPerson: 'Kapcsolattartó *',
      phone: 'Telefon *',
      email: 'Email *',
      website: 'Vállalati weboldal',
      subject: 'Tárgy',
      message: 'Üzenet...',
      cargoDescription: 'Rakomány/projekt leírása *',
      dimensions: 'Méretek (H x Sz x M)',
      weight: 'Súly (kg)',
      pickupLocation: 'Felvételi hely (Város és ország) *',
      destinationLocation: 'Célhely (Város és ország) *',
      deliveryDate: 'Becsült szállítási dátum',
      specialRequirements: 'Egyéb megjegyzések / különleges követelmények',
      attachedDocuments: 'Csatolt dokumentumok',
      gdprConsent: 'Személyes adatok kezelésének hozzájárulása (GDPR) *'
    },
    bg: {
      nameCompany: 'Име и фамилия / Компания *',
      contactPerson: 'Лице за контакт *',
      phone: 'Телефон *',
      email: 'Имейл *',
      website: 'Уебсайт на компанията',
      subject: 'Тема',
      message: 'Съобщение...',
      cargoDescription: 'Описание на товара/проекта *',
      dimensions: 'Размери (Д x Ш x В)',
      weight: 'Тегло (кг)',
      pickupLocation: 'Място за вземане (Град и страна) *',
      destinationLocation: 'Местоназначение (Град и страна) *',
      deliveryDate: 'Очаквана дата на доставка',
      specialRequirements: 'Други бележки / специални изисквания',
      attachedDocuments: 'Прикачени документи',
      gdprConsent: 'Съгласие за обработка на лични данни (GDPR) *'
    },
    sr: {
      nameCompany: 'Име и презиме / Компанија *',
      contactPerson: 'Контакт особа *',
      phone: 'Телефон *',
      email: 'Емаил *',
      website: 'Веб сајт компаније',
      subject: 'Предмет',
      message: 'Порука...',
      cargoDescription: 'Опис терета/пројекта *',
      dimensions: 'Димензије (Д x Ш x В)',
      weight: 'Тежина (кг)',
      pickupLocation: 'Место преузимања (Град и земља) *',
      destinationLocation: 'Одредиште (Град и земља) *',
      deliveryDate: 'Процењени датум испоруке',
      specialRequirements: 'Остале напомене / посебни захтеви',
      attachedDocuments: 'Приложени документи',
      gdprConsent: 'Сагласност за обраду личних података (GDPR) *'
    }
  };

  // Helper function to get translated placeholder
  const getPlaceholder = (key: string): string => {
    const langCode = currentLanguage.code as keyof typeof placeholderTranslations;
    const placeholders = placeholderTranslations[langCode] || placeholderTranslations.ro;
    return placeholders[key as keyof typeof placeholders] || placeholderTranslations.ro[key as keyof typeof placeholderTranslations.ro] || '';
  };

  // Helper function to get translated validation message
  const getValidationMessage = (key: string): string => {
    const langCode = currentLanguage.code as keyof typeof validationMessages;
    const messages = validationMessages[langCode] || validationMessages.ro;
    return messages[key as keyof typeof messages] || validationMessages.ro[key as keyof typeof validationMessages.ro] || '';
  };

  // Service data
  const services = [
    {
      id: 'project-cargo',
      title: 'HOLLEMAN SPECIAL TRANSPORT & PROJECT CARGO',
      icon: '/images/icons/iconprojectcargo.webp'
    },
    {
      id: 'itl',
      title: 'INTER TRANS LOGISTICS',
      icon: '/images/icons/iconinternational.webp'
    },
    {
      id: 'heavy-lift',
      title: 'HOLLEMAN HEAVY LIFT',
      icon: '/images/icons/heavy.webp'
    },
    {
      id: 'agro',
      title: 'HOLLEMAN AGRO',
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
      errors.name = getValidationMessage('nameRequired');
    }
    
    if (!formData.contactPerson.trim()) {
      errors.contactPerson = getValidationMessage('contactPersonRequired');
    }
    
    if (!formData.phone.trim()) {
      errors.phone = getValidationMessage('phoneRequired');
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = getValidationMessage('phoneInvalid');
    }
    
    if (!formData.email.trim()) {
      errors.email = getValidationMessage('emailRequired');
    } else if (!isValidEmail(formData.email)) {
      errors.email = getValidationMessage('emailInvalid');
    }
    
    // Service-specific validation
    if (selectedService) {
      if (!formData.cargoDescription?.trim()) {
        errors.cargoDescription = getValidationMessage('cargoDescriptionRequired');
      }
      
      if (!formData.pickupLocation?.trim()) {
        errors.pickupLocation = getValidationMessage('pickupLocationRequired');
      }
      
      if (!formData.destinationLocation?.trim()) {
        errors.destinationLocation = getValidationMessage('destinationLocationRequired');
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
        const [networkInfoRes, networkOfficesRes, contactHeroRes] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/contact-network-info?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/contact-network-offices?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/contact-hero')
        ]);

        const networkInfoData = await networkInfoRes.json();
        const networkOfficesData = await networkOfficesRes.json();
        const contactHeroData = await contactHeroRes.json();

        console.log('Network Info Data:', networkInfoData);
        console.log('Network Offices Data:', networkOfficesData);
        console.log('Contact Hero Data:', contactHeroData);

        setNetworkInfo(networkInfoData.data);
        setNetworkOffices(networkOfficesData.data || []);
        setContactHeroContent(contactHeroData.data);
      } catch (error) {
        console.error('Error fetching network content:', error);
        setContactHeroContent({
          title: 'Contact',
          subtitleText: 'Suntem aici sa te ajutam cu orice intrebare'
        });
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
      <section 
        className="contact-hero" 
        aria-label="Contact Holleman"
        style={{
          backgroundImage: `url('/images/Group8749.webp')`
        }}
      >
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
          <h1 className="hero-title">
            {contactHeroContent?.title || ''}
          </h1>
          <p className="hero-subtitle">
            {contactHeroContent?.subtitleText || ''}
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
                            placeholder={getPlaceholder('nameCompany')}
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
                            placeholder={getPlaceholder('contactPerson')}
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
                            placeholder={getPlaceholder('phone')}
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
                            placeholder={getPlaceholder('email')}
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
                            placeholder={getPlaceholder('website')}
                            className="form-input"
                            value={formData.website}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group">
                          <textarea
                            name="cargoDescription"
                            placeholder={getPlaceholder('cargoDescription')}
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
                            placeholder={getPlaceholder('dimensions')}
                            className="form-input"
                            value={formData.dimensions}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            name="weight"
                            placeholder={getPlaceholder('weight')}
                            className="form-input"
                            value={formData.weight}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="text"
                            name="pickupLocation"
                            placeholder={getPlaceholder('pickupLocation')}
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
                            placeholder={getPlaceholder('destinationLocation')}
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
                            placeholder={getPlaceholder('deliveryDate')}
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
                            <span>{getPlaceholder('attachedDocuments')}</span>
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
                            placeholder={getPlaceholder('specialRequirements')}
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
                          placeholder={getPlaceholder('nameCompany')}
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
                          placeholder={getPlaceholder('contactPerson')}
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
                          placeholder={getPlaceholder('phone')}
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
                          placeholder={getPlaceholder('email')}
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
                          placeholder={getPlaceholder('website')}
                          className="form-input"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder={getPlaceholder('subject')}
                          className="form-input"
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <textarea
                          name="message"
                          placeholder={getPlaceholder('message')}
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
                      {getPlaceholder('gdprConsent')}
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
                    {networkOffices.map((office, index) => {
                      const isExpanded = expandedOffice === index;
                      const officeDetails = getOfficeDetails(office);
                      const hasDetails = officeDetails !== null;
                      
                      return (
                        <div key={index} className={`office-item-wrapper ${isExpanded ? 'office-wrapper-expanded' : ''}`}>
                          <div className={`office-item ${hasDetails ? 'office-item-clickable' : ''} ${isExpanded ? 'office-item-expanded' : ''}`} 
                               onClick={() => hasDetails && toggleOfficeExpansion(index)}
                               style={{
                                 opacity: 0,
                                 transform: 'translateY(30px)',
                                 animation: `slideInUp 0.8s ease-out ${0.6 + (index * 0.1)}s forwards`
                               }}>
                            <div className="office-main-content">
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
                              {hasDetails && (
                                <div className="office-expand-indicator">
                                  <svg 
                                    width="20" 
                                    height="20" 
                                    viewBox="0 0 16 16" 
                                    fill="currentColor"
                                    className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
                                  >
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {hasDetails && (
                            <div className={`office-details ${isExpanded ? 'office-details-expanded' : ''}`}>
                              <div className="office-details-content">
                                <div className="detail-item">
                                  <div className="detail-icon">📍</div>
                                  <div className="detail-text">
                                    <strong>Adresă:</strong><br/>
                                    {officeDetails.address}
                                  </div>
                                </div>
                                
                                <div className="detail-item">
                                  <div className="detail-icon">📞</div>
                                  <div className="detail-text">
                                    <strong>Telefon:</strong><br/>
                                    <a href={`tel:${officeDetails.phone}`}>{officeDetails.phone}</a>
                                  </div>
                                </div>
                                
                                <div className="detail-item">
                                  <div className="detail-icon">✉️</div>
                                  <div className="detail-text">
                                    <strong>Email:</strong><br/>
                                    <a href={`mailto:${officeDetails.email}`}>{officeDetails.email}</a>
                                  </div>
                                </div>
                                
                                <div className="detail-item">
                                  <div className="detail-icon">🌐</div>
                                  <div className="detail-text">
                                    <strong>Website:</strong><br/>
                                    <a href={officeDetails.website} target="_blank" rel="noopener noreferrer">
                                      {officeDetails.website}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
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
