import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllProjects, getAllProjectsSync } from '../data/projectsData';
import './ProjectCargo.css';

const ProjectCargo: React.FC = () => {
  const navigate = useNavigate();
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [whyChooseContent, setWhyChooseContent] = useState<any>(null);
  
  // State for projects data
  const [allProjects, setAllProjects] = useState<any[]>(getAllProjectsSync());
  const [projectsLoading, setProjectsLoading] = useState(true);

  const heroStyle = {
    backgroundImage: `url('/images/projectcargobg.webp')`
  };

  const whyChooseStyle = {
    backgroundImage: `url('/images/Frame-19.webp')`
  };

  // Get Project Cargo projects from the data
  const caseStudies = allProjects
    .filter(project => project.division === 'project-cargo')
    .map(project => ({
      id: project.id,
      title: project.title,
      description: project.subtitle,
      videoThumbnail: project.gallery.mainImage,
      videoUrl: "#", // Keep as placeholder for video functionality
      caseStudyUrl: `/proiecte/${project.id}`
    }));

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // Navigate to project page when play button is clicked
    if (caseStudies.length > 0) {
      navigate(caseStudies[currentCaseStudy].caseStudyUrl);
    }
  };

  const handleCardClick = () => {
    // Navigate to project page
    if (caseStudies.length > 0) {
      navigate(caseStudies[currentCaseStudy].caseStudyUrl);
    }
  };

  const nextCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  // Reset current index if it's out of bounds
  useEffect(() => {
    if (caseStudies.length > 0 && currentCaseStudy >= caseStudies.length) {
      setCurrentCaseStudy(0);
    }
  }, [caseStudies.length, currentCaseStudy]);

  // Fetch projects and Why Choose content from Strapi
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [whyChooseRes, projectsData] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/project-cargo-why-choose'),
          getAllProjects()
        ]);

        const whyChooseData = await whyChooseRes.json();
        
        console.log('Projects from Strapi:', projectsData);
        
        setWhyChooseContent(whyChooseData.data);
        setAllProjects(projectsData);
      } catch (error) {
        console.error('Error fetching content:', error);
        // Set fallback content
        setWhyChooseContent({
          Title: 'De ce să alegi Holleman pentru Project Cargo',
          Reason1: 'Peste 25 de ani de experiență în logistica proiectelor speciale',
          Reason2: 'Flotă proprie diversificată, adaptată pentru sarcini extreme',
          Reason3: 'Acoperire internațională, cu expertiză în coridoare logistice din Europa Centrală și de Est',
          Reason4: 'Inginerie internă – soluții dezvoltate in-house, pentru provocări atipice',
          Reason5: 'Respect pentru termene și bugete – livrăm la timp, în siguranță, fără compromisuri',
          Reason6: 'Certificări internaționale și respectarea celor mai înalte standarde de siguranță și calitate'
        });
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const currentCase = caseStudies.length > 0 ? caseStudies[currentCaseStudy] : null;

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (!isPaused && caseStudies.length > 1) {
      const interval = setInterval(() => {
        setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [caseStudies.length, isPaused]);

  // Pause auto-advance when user interacts
  const handleManualNavigation = (index: number) => {
    setCurrentCaseStudy(index);
    setIsPaused(true);
    
    // Resume auto-advance after 10 seconds of no interaction
    setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  // SEO: Set document title and meta description for Project Cargo page
  useEffect(() => {
    document.title = "Project Cargo - Transport Agabaritic și Relocări Industriale | Holleman";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Servicii profesionale Project Cargo: transport agabaritic, relocări industriale, managementul proiectelor complexe. Echipamente grele, turbine eoliene, transformatoare. Experți cu peste 25 ani experiență.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/project-cargo');
  }, []);

  return (
    <div className="project-cargo-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section" style={heroStyle}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Project Cargo</h1>
          <p className="hero-subtitle">Nu mutam doar obiecte, ci si limite</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="services-section">
        {/* Spinning Wind Turbine Background */}
        <div className="wind-turbine-background">
          <div className="turbine-container">
            {/* Static turbine tower */}
            <svg className="turbine-tower" width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Tower parts */}
              <path d="M47.5303 55.4297V88.7496C47.5303 89.8496 48.4303 90.7496 49.5303 90.7496C50.6303 90.7496 51.5303 89.8496 51.5303 88.7496V55.4297C51.5303 54.3297 50.6303 53.4297 49.5303 53.4297C48.4203 53.4297 47.5303 54.3197 47.5303 55.4297Z" fill="#136B38"/>
              <path d="M53.7197 55.4297V85.5497C53.7197 86.6497 54.6197 87.5497 55.7197 87.5497C56.8197 87.5497 57.7197 86.6497 57.7197 85.5497V55.4297C57.7197 54.3297 56.8197 53.4297 55.7197 53.4297C54.6097 53.4297 53.7197 54.3197 53.7197 55.4297Z" fill="#136B38"/>
              <path d="M21.0596 86.8097C21.9596 86.8197 22.4796 86.9796 22.9596 87.2196C23.3196 87.3996 23.6696 87.6497 24.0696 87.9897C24.6796 88.4797 25.3896 89.1697 26.4396 89.7797C27.4896 90.3897 28.8696 90.8297 30.5196 90.8197C31.9796 90.8297 33.2396 90.4897 34.2296 89.9797C34.9796 89.5997 35.5696 89.1497 36.0696 88.7397C36.8196 88.1197 37.3596 87.6298 37.8996 87.3298C38.4396 87.0298 38.9696 86.8297 39.9896 86.8197C40.8996 86.8297 41.4096 86.9897 41.8996 87.2297C42.2596 87.4097 42.6096 87.6597 43.0096 87.9997C43.6196 88.4897 44.3296 89.1797 45.3796 89.7897C46.4296 90.3997 47.8096 90.8398 49.4596 90.8298C50.9196 90.8398 52.1796 90.4997 53.1696 89.9897C53.9196 89.6097 54.5096 89.1597 55.0096 88.7497C55.7596 88.1297 56.2996 87.6398 56.8396 87.3398C57.3796 87.0398 57.9096 86.8398 58.9296 86.8298C59.8396 86.8398 60.3496 86.9997 60.8396 87.2397C61.1996 87.4197 61.5496 87.6697 61.9496 88.0097C62.5596 88.4997 63.2696 89.1897 64.3196 89.7997C65.3696 90.4097 66.7496 90.8498 68.3996 90.8398C69.8596 90.8498 71.1196 90.5097 72.1196 89.9997C72.8696 89.6197 73.4596 89.1697 73.9596 88.7597C74.7096 88.1397 75.2496 87.6497 75.7896 87.3497C76.3296 87.0497 76.8596 86.8498 77.8796 86.8398C78.9796 86.8398 79.8796 85.9398 79.8796 84.8398C79.8796 83.7398 78.9796 82.8398 77.8796 82.8398C76.4196 82.8298 75.1596 83.1697 74.1596 83.6797C73.4096 84.0597 72.8196 84.5097 72.3196 84.9197C71.5696 85.5397 71.0296 86.0298 70.4896 86.3298C69.9496 86.6298 69.4196 86.8298 68.3996 86.8398C67.4896 86.8298 66.9796 86.6697 66.4896 86.4297C66.1296 86.2497 65.7796 85.9997 65.3796 85.6597C64.7696 85.1697 64.0596 84.4797 63.0096 83.8697C61.9596 83.2597 60.5796 82.8198 58.9296 82.8298C57.4696 82.8198 56.2096 83.1597 55.2196 83.6697C54.4696 84.0497 53.8796 84.4997 53.3796 84.9097C52.6296 85.5297 52.0896 86.0197 51.5496 86.3197C51.0096 86.6197 50.4796 86.8198 49.4596 86.8298C48.5496 86.8198 48.0396 86.6597 47.5496 86.4197C47.1896 86.2397 46.8396 85.9897 46.4396 85.6497C45.8296 85.1597 45.1196 84.4697 44.0696 83.8597C43.0196 83.2497 41.6396 82.8097 39.9896 82.8197C38.5296 82.8097 37.2696 83.1497 36.2796 83.6597C35.5296 84.0397 34.9396 84.4897 34.4396 84.8997C33.6896 85.5197 33.1496 86.0097 32.6096 86.3097C32.0696 86.6097 31.5396 86.8097 30.5196 86.8197C29.6196 86.8097 29.0996 86.6497 28.6196 86.4097C28.2596 86.2297 27.9096 85.9797 27.5096 85.6397C26.8996 85.1497 26.1896 84.4597 25.1396 83.8497C24.0896 83.2397 22.7096 82.7997 21.0596 82.8097C19.9596 82.8097 19.0596 83.7097 19.0596 84.8097C19.0596 85.9097 19.9596 86.8097 21.0596 86.8097Z" fill="#136B38"/>
            </svg>
            
            {/* Spinning turbine blades - just the blades, no center hub */}
            <svg className="turbine-blades spinning-blades" width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Three blades only */}
              <path d="M49.9702 44.2099H51.9702V13.1899C51.9702 12.3599 51.4602 11.6199 50.6902 11.3199C49.9202 11.0199 49.0402 11.2299 48.4902 11.8399C48.4402 11.8999 46.1802 14.3898 43.9002 18.1098C42.7602 19.9698 41.6102 22.1399 40.7302 24.4999C39.8502 26.8599 39.2402 29.3999 39.2402 32.0199C39.2402 34.6299 39.8802 37.3299 41.4802 39.7699C43.0802 42.2099 45.5902 44.3399 49.1202 46.0099C49.7402 46.2999 50.4602 46.2599 51.0502 45.8899C51.6302 45.5199 51.9802 44.8899 51.9802 44.1999H49.9702L50.8302 42.3899C47.8102 40.9499 45.9502 39.2899 44.8202 37.5699C43.6902 35.8399 43.2402 33.9999 43.2402 32.0199C43.2402 30.0399 43.7202 27.9399 44.4802 25.8999C45.6202 22.8399 47.3802 19.9598 48.8502 17.8698C49.5902 16.8298 50.2502 15.9799 50.7202 15.3999C50.9602 15.1099 51.1502 14.8899 51.2702 14.7399L51.4102 14.5799L51.4402 14.5399L51.4502 14.5299L49.9702 13.1899H47.9702V44.2099H49.9702L50.8302 42.3999L49.9702 44.2099Z" fill="#136B38"/>
              <path d="M46.0199 50.84L45.0099 49.1099L18.1999 64.71C17.4899 65.13 17.0999 65.9399 17.2299 66.7599C17.3599 67.5799 17.9799 68.2299 18.7899 68.3999C18.8799 68.4199 22.6799 69.2199 27.5499 69.2299C29.6199 69.2299 31.8798 69.0799 34.1498 68.6499C37.5498 67.9999 40.9998 66.71 43.6898 64.16C45.0298 62.89 46.1499 61.2999 46.9199 59.3899C47.6899 57.4899 48.0999 55.2799 48.0999 52.7799C48.0999 52.0999 48.0699 51.4 48.0099 50.67C47.9499 49.98 47.5498 49.38 46.9398 49.06C46.3298 48.74 45.6099 48.7599 45.0099 49.1099L46.0199 50.84L44.0298 51.0099C44.0798 51.6299 44.1099 52.2199 44.1099 52.7799C44.1099 55.5399 43.5198 57.58 42.5898 59.17C41.8898 60.36 40.9998 61.3199 39.9298 62.0999C38.3298 63.2799 36.3099 64.08 34.1399 64.56C31.9699 65.05 29.6698 65.2199 27.5598 65.2199C25.3498 65.2199 23.3398 65.03 21.8998 64.84C21.1798 64.75 20.5999 64.65 20.2099 64.58C20.0099 64.55 19.8599 64.5199 19.7599 64.4999L19.6498 64.4799L19.6198 64.4699L19.2099 66.43L20.2198 68.16L47.0298 52.56L46.0199 50.84L44.0298 51.0099L46.0199 50.84Z" fill="#136B38"/>
              <path d="M53.9502 50.8599L52.9502 52.59L79.7902 68.1399C80.5102 68.5499 81.4002 68.4899 82.0502 67.9699C82.6902 67.4499 82.9502 66.59 82.7002 65.8C82.6702 65.71 81.1402 60.9099 77.9902 55.9799C76.4102 53.5199 74.4202 51.01 71.9102 49.05C69.4202 47.1 66.3402 45.7 62.8002 45.71C59.6802 45.71 56.3102 46.8 52.8102 49.21C52.2402 49.6 51.9202 50.25 51.9502 50.94C51.9802 51.63 52.3502 52.25 52.9502 52.59L53.9502 50.8599L55.0802 52.5099C58.0802 50.4499 60.6102 49.72 62.8002 49.71C65.2702 49.71 67.4402 50.65 69.4502 52.21C72.4502 54.53 74.8802 58.26 76.4902 61.41C77.3002 62.98 77.9002 64.4 78.3002 65.42C78.5002 65.93 78.6502 66.3399 78.7502 66.6199C78.8002 66.7599 78.8402 66.86 78.8602 66.93L78.8902 67.0099L78.9002 67.03L80.8002 66.42L81.8002 64.69L54.9602 49.1399L53.9502 50.8599L55.0802 52.5099L53.9502 50.8599Z" fill="#136B38"/>
            </svg>
            
            {/* White center hub on top to cover blade edges */}
            <svg className="turbine-hub" width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M49.9705 54.7202C53.1406 54.7202 55.7105 52.1503 55.7105 48.9802C55.7105 45.8101 53.1406 43.2402 49.9705 43.2402C46.8003 43.2402 44.2305 45.8101 44.2305 48.9802C44.2305 52.1503 46.8003 54.7202 49.9705 54.7202Z" fill="white"/>
              <path d="M55.7202 48.9802H53.7202C53.7202 50.0202 53.3002 50.9402 52.6202 51.6302C51.9402 52.3102 51.0102 52.7302 49.9702 52.7302C48.9302 52.7302 48.0102 52.3102 47.3202 51.6302C46.6402 50.9502 46.2202 50.0202 46.2202 48.9802C46.2202 47.9402 46.6402 47.0203 47.3202 46.3303C48.0002 45.6503 48.9302 45.2302 49.9702 45.2302C51.0102 45.2302 51.9302 45.6503 52.6202 46.3303C53.3002 47.0103 53.7202 47.9402 53.7202 48.9802H55.7202H57.7202C57.7202 44.7002 54.2502 41.2402 49.9802 41.2402C45.7002 41.2402 42.2402 44.7102 42.2402 48.9802C42.2402 53.2602 45.7102 56.7202 49.9802 56.7202C54.2602 56.7202 57.7202 53.2502 57.7202 48.9802H55.7202Z" fill="#136B38"/>
            </svg>
          </div>
        </div>
        
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">Solutii inteligente pentru transporturi complexe - descopera Project Cargo</h2>
          </div>
          
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/Info.webp" alt="Management icon" />
              </div>
              <h3>Management de proiect</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/Info.webp" alt="Management icon" />
                </div>
                <h3>Management de proiect</h3>
                <p>Management de proiect complet, de la planificare până la execuție</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/train.webp" alt="Transport engineering icon" />
              </div>
              <h3>Inginerie de transport</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/train.webp" alt="Transport engineering icon" />
                </div>
                <h3>Inginerie de transport</h3>
                <p>Inginerie de transport si solutii tehnice adaptate fiecarui traseu si tip de echipament</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/Chield_check.webp" alt="Authorizations icon" />
              </div>
              <h3>Autorizatii & asigurari</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/Chield_check.webp" alt="Authorizations icon" />
                </div>
                <h3>Autorizatii & asigurari</h3>
                <p>•	Obținerea autorizațiilor speciale și escortă <br/>
                  • Asigurări specifice pentru bunuri agabaritice și transporturi speciale</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/Anchor.webp" alt="Multimodal transport icon" />
              </div>
              <h3>Transport multimodal</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/Anchor.webp" alt="Multimodal transport icon" />
                </div>
                <h3>Transport multimodal</h3>
                <p>Transport multimodal (rutier, fluvial, maritim, feroviar), în funcție de cerințele proiectului</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/world_light.webp" alt="Site logistics icon" />
              </div>
              <h3>Logistica site</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/world_light.webp" alt="Site logistics icon" />
                </div>
                <h3>Logistica site</h3>
                <p>Logistică pe șantier – descărcare, manipulare, poziționare la punct fix</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/Map_fill.webp" alt="Risk management icon" />
              </div>
              <h3>Gestiune riscuri</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/Map_fill.webp" alt="Risk management icon" />
                </div>
                <h3>Gestiune riscuri</h3>
                <p>Gestiunea riscurilor și măsuri de siguranță adaptate fiecărei etape</p>
              </div>
            </div>
          </div>
          
          <div className="services-footer">
            <button className="btn" onClick={() => navigate('/contact')}>
              <span>CONTACT</span>
            </button>
          </div>
        </div>
      </section>

      {/* Expertise Domains Section */}
      <section id="expertise-section" className="expertise-section">
        <div className="expertise-container">
          <h2 className="expertise-title">Domenii de expertiză</h2>
          
          <div className="expertise-grid">
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group.webp" alt="Energie icon" />
              </div>
              <h3>Energie</h3>
              <p>turbine eoliene, generatoare, transformatoare, cazane (proiecte eoliene, hidro, termo)</p>
            </div>
            
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group-1.webp" alt="Petrochimie icon" />
              </div>
              <h3>Petrochimie</h3>
              <p>coloane, rezervoare, schimbătoare de căldură</p>
            </div>
            
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group-2.webp" alt="Minerit icon" />
              </div>
              <h3>Minerit</h3>
              <p>concasoare, stații de sortare, echipamente voluminoase</p>
            </div>
            
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group-3.webp" alt="Industrial icon" />
              </div>
              <h3>Industrial</h3>
              <p>linii de producție, prese industriale, roboți de mare capacitate</p>
            </div>
            
            <div className="expertise-item">
              <div className="expertise-icon">
                <img src="/images/icons/Group-4.webp" alt="Infrastructura icon" />
              </div>
              <h3>Infrastructura</h3>
              <p>poduri, grinzi, structuri metalice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Holleman Section */}
      <section className="why-choose-section" style={whyChooseStyle}>
        <div className="why-choose-container">
          <div className="why-choose-content">
            <h2 className="why-choose-title">
              {whyChooseContent?.Title ? (
                <span dangerouslySetInnerHTML={{ 
                  __html: whyChooseContent.Title.replace('Project Cargo', '<span class="highlight">Project Cargo</span>') 
                }} />
              ) : (
                <>
                  De ce să alegi Holleman<br />
                  pentru <span className="highlight">Project Cargo</span>
                </>
              )}
            </h2>
            
            <ul className="why-choose-list">
              <li>{whyChooseContent?.Reason1 || 'Loading...'}</li>
              <li>{whyChooseContent?.Reason2 || 'Loading...'}</li>
              <li>{whyChooseContent?.Reason3 || 'Loading...'}</li>
              <li>{whyChooseContent?.Reason4 || 'Loading...'}</li>
              <li>{whyChooseContent?.Reason5 || 'Loading...'}</li>
              <li>{whyChooseContent?.Reason6 || 'Loading...'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="case-studies-section">
        {/* Left-facing Wind Turbine Background */}
        <div className="wind-turbine-background-left">
          <div className="turbine-container-left">
            {/* Static turbine tower */}
            <svg className="turbine-tower-left" width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Tower parts */}
              <path d="M47.5303 55.4297V88.7496C47.5303 89.8496 48.4303 90.7496 49.5303 90.7496C50.6303 90.7496 51.5303 89.8496 51.5303 88.7496V55.4297C51.5303 54.3297 50.6303 53.4297 49.5303 53.4297C48.4203 53.4297 47.5303 54.3197 47.5303 55.4297Z" fill="#136B38"/>
              <path d="M53.7197 55.4297V85.5497C53.7197 86.6497 54.6197 87.5497 55.7197 87.5497C56.8197 87.5497 57.7197 86.6497 57.7197 85.5497V55.4297C57.7197 54.3297 56.8197 53.4297 55.7197 53.4297C54.6097 53.4297 53.7197 54.3197 53.7197 55.4297Z" fill="#136B38"/>
              <path d="M21.0596 86.8097C21.9596 86.8197 22.4796 86.9796 22.9596 87.2196C23.3196 87.3996 23.6696 87.6497 24.0696 87.9897C24.6796 88.4797 25.3896 89.1697 26.4396 89.7797C27.4896 90.3897 28.8696 90.8297 30.5196 90.8197C31.9796 90.8297 33.2396 90.4897 34.2296 89.9797C34.9796 89.5997 35.5696 89.1497 36.0696 88.7397C36.8196 88.1197 37.3596 87.6298 37.8996 87.3298C38.4396 87.0298 38.9696 86.8297 39.9896 86.8197C40.8996 86.8297 41.4096 86.9897 41.8996 87.2297C42.2596 87.4097 42.6096 87.6597 43.0096 87.9997C43.6196 88.4897 44.3296 89.1797 45.3796 89.7897C46.4296 90.3997 47.8096 90.8398 49.4596 90.8298C50.9196 90.8398 52.1796 90.4997 53.1696 89.9897C53.9196 89.6097 54.5096 89.1597 55.0096 88.7497C55.7596 88.1297 56.2996 87.6398 56.8396 87.3398C57.3796 87.0398 57.9096 86.8398 58.9296 86.8298C59.8396 86.8398 60.3496 86.9997 60.8396 87.2397C61.1996 87.4197 61.5496 87.6697 61.9496 88.0097C62.5596 88.4997 63.2696 89.1897 64.3196 89.7997C65.3696 90.4097 66.7496 90.8498 68.3996 90.8398C69.8596 90.8498 71.1196 90.5097 72.1196 89.9997C72.8696 89.6197 73.4596 89.1697 73.9596 88.7597C74.7096 88.1397 75.2496 87.6497 75.7896 87.3497C76.3296 87.0497 76.8596 86.8498 77.8796 86.8398C78.9796 86.8398 79.8796 85.9398 79.8796 84.8398C79.8796 83.7398 78.9796 82.8398 77.8796 82.8398C76.4196 82.8298 75.1596 83.1697 74.1596 83.6797C73.4096 84.0597 72.8196 84.5097 72.3196 84.9197C71.5696 85.5397 71.0296 86.0298 70.4896 86.3298C69.9496 86.6298 69.4196 86.8298 68.3996 86.8398C67.4896 86.8298 66.9796 86.6697 66.4896 86.4297C66.1296 86.2497 65.7796 85.9997 65.3796 85.6597C64.7696 85.1697 64.0596 84.4797 63.0096 83.8697C61.9596 83.2597 60.5796 82.8198 58.9296 82.8298C57.4696 82.8198 56.2096 83.1597 55.2196 83.6697C54.4696 84.0497 53.8796 84.4997 53.3796 84.9097C52.6296 85.5297 52.0896 86.0197 51.5496 86.3197C51.0096 86.6197 50.4796 86.8198 49.4596 86.8298C48.5496 86.8198 48.0396 86.6597 47.5496 86.4197C47.1896 86.2397 46.8396 85.9897 46.4396 85.6497C45.8296 85.1597 45.1196 84.4697 44.0696 83.8597C43.0196 83.2497 41.6396 82.8097 39.9896 82.8197C38.5296 82.8097 37.2696 83.1497 36.2796 83.6597C35.5296 84.0397 34.9396 84.4897 34.4396 84.8997C33.6896 85.5197 33.1496 86.0097 32.6096 86.3097C32.0696 86.6097 31.5396 86.8097 30.5196 86.8197C29.6196 86.8097 29.0996 86.6497 28.6196 86.4097C28.2596 86.2297 27.9096 85.9797 27.5096 85.6397C26.8996 85.1497 26.1896 84.4597 25.1396 83.8497C24.0896 83.2397 22.7096 82.7997 21.0596 82.8097C19.9596 82.8097 19.0596 83.7097 19.0596 84.8097C19.0596 85.9097 19.9596 86.8097 21.0596 86.8097Z" fill="#136B38"/>
            </svg>
            
            {/* Spinning turbine blades - mirrored for left-facing */}
            <svg className="turbine-blades-left spinning-blades-left" width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Three blades mirrored */}
              <path d="M49.9702 44.2099H51.9702V13.1899C51.9702 12.3599 51.4602 11.6199 50.6902 11.3199C49.9202 11.0199 49.0402 11.2299 48.4902 11.8399C48.4402 11.8999 46.1802 14.3898 43.9002 18.1098C42.7602 19.9698 41.6102 22.1399 40.7302 24.4999C39.8502 26.8599 39.2402 29.3999 39.2402 32.0199C39.2402 34.6299 39.8802 37.3299 41.4802 39.7699C43.0802 42.2099 45.5902 44.3399 49.1202 46.0099C49.7402 46.2999 50.4602 46.2599 51.0502 45.8899C51.6302 45.5199 51.9802 44.8899 51.9802 44.1999H49.9702L50.8302 42.3899C47.8102 40.9499 45.9502 39.2899 44.8202 37.5699C43.6902 35.8399 43.2402 33.9999 43.2402 32.0199C43.2402 30.0399 43.7202 27.9399 44.4802 25.8999C45.6202 22.8399 47.3802 19.9598 48.8502 17.8698C49.5902 16.8298 50.2502 15.9799 50.7202 15.3999C50.9602 15.1099 51.1502 14.8899 51.2702 14.7399L51.4102 14.5799L51.4402 14.5399L51.4502 14.5299L49.9702 13.1899H47.9702V44.2099H49.9702L50.8302 42.3999L49.9702 44.2099Z" fill="#136B38"/>
              <path d="M46.0199 50.84L45.0099 49.1099L18.1999 64.71C17.4899 65.13 17.0999 65.9399 17.2299 66.7599C17.3599 67.5799 17.9799 68.2299 18.7899 68.3999C18.8799 68.4199 22.6799 69.2199 27.5499 69.2299C29.6199 69.2299 31.8798 69.0799 34.1498 68.6499C37.5498 67.9999 40.9998 66.71 43.6898 64.16C45.0298 62.89 46.1499 61.2999 46.9199 59.3899C47.6899 57.4899 48.0999 55.2799 48.0999 52.7799C48.0999 52.0999 48.0699 51.4 48.0099 50.67C47.9499 49.98 47.5498 49.38 46.9398 49.06C46.3298 48.74 45.6099 48.7599 45.0099 49.1099L46.0199 50.84L44.0298 51.0099C44.0798 51.6299 44.1099 52.2199 44.1099 52.7799C44.1099 55.5399 43.5198 57.58 42.5898 59.17C41.8898 60.36 40.9998 61.3199 39.9298 62.0999C38.3298 63.2799 36.3099 64.08 34.1399 64.56C31.9699 65.05 29.6698 65.2199 27.5598 65.2199C25.3498 65.2199 23.3398 65.03 21.8998 64.84C21.1798 64.75 20.5999 64.65 20.2099 64.58C20.0099 64.55 19.8599 64.5199 19.7599 64.4999L19.6498 64.4799L19.6198 64.4699L19.2099 66.43L20.2198 68.16L47.0298 52.56L46.0199 50.84L44.0298 51.0099L46.0199 50.84Z" fill="#136B38"/>
              <path d="M53.9502 50.8599L52.9502 52.59L79.7902 68.1399C80.5102 68.5499 81.4002 68.4899 82.0502 67.9699C82.6902 67.4499 82.9502 66.59 82.7002 65.8C82.6702 65.71 81.1402 60.9099 77.9902 55.9799C76.4102 53.5199 74.4202 51.01 71.9102 49.05C69.4202 47.1 66.3402 45.7 62.8002 45.71C59.6802 45.71 56.3102 46.8 52.8102 49.21C52.2402 49.6 51.9202 50.25 51.9502 50.94C51.9802 51.63 52.3502 52.25 52.9502 52.59L53.9502 50.8599L55.0802 52.5099C58.0802 50.4499 60.6102 49.72 62.8002 49.71C65.2702 49.71 67.4402 50.65 69.4502 52.21C72.4502 54.53 74.8802 58.26 76.4902 61.41C77.3002 62.98 77.9002 64.4 78.3002 65.42C78.5002 65.93 78.6502 66.3399 78.7502 66.6199C78.8002 66.7599 78.8402 66.86 78.8602 66.93L78.8902 67.0099L78.9002 67.03L80.8002 66.42L81.8002 64.69L54.9602 49.1399L53.9502 50.8599L55.0802 52.5099L53.9502 50.8599Z" fill="#136B38"/>
            </svg>
            
            {/* White center hub on top to cover blade edges */}
            <svg className="turbine-hub-left" width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M49.9705 54.7202C53.1406 54.7202 55.7105 52.1503 55.7105 48.9802C55.7105 45.8101 53.1406 43.2402 49.9705 43.2402C46.8003 43.2402 44.2305 45.8101 44.2305 48.9802C44.2305 52.1503 46.8003 54.7202 49.9705 54.7202Z" fill="white"/>
              <path d="M55.7202 48.9802H53.7202C53.7202 50.0202 53.3002 50.9402 52.6202 51.6302C51.9402 52.3102 51.0102 52.7302 49.9702 52.7302C48.9302 52.7302 48.0102 52.3102 47.3202 51.6302C46.6402 50.9502 46.2202 50.0202 46.2202 48.9802C46.2202 47.9402 46.6402 47.0203 47.3202 46.3303C48.0002 45.6503 48.9302 45.2302 49.9702 45.2302C51.0102 45.2302 51.9302 45.6503 52.6202 46.3303C53.3002 47.0103 53.7202 47.9402 53.7202 48.9802H55.7202H57.7202C57.7202 44.7002 54.2502 41.2402 49.9802 41.2402C45.7002 41.2402 42.2402 44.7102 42.2402 48.9802C42.2402 53.2602 45.7102 56.7202 49.9802 56.7202C54.2602 56.7202 57.7202 53.2502 57.7202 48.9802H55.7202Z" fill="#136B38"/>
            </svg>
          </div>
        </div>
        
        <div className="case-studies-container">
          <h2 className="case-studies-title">Studii de caz și galerii media</h2>
          
          {currentCase ? (
            <div className="case-study-card" onClick={handleCardClick}>
              <div className="case-study-video">
                <img 
                  src={currentCase.videoThumbnail} 
                  alt={currentCase.title}
                  className="video-thumbnail"
                />
                <div className="video-play-button" onClick={handleVideoClick}>
                  <svg viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              <div className="case-study-content">
                <h3>{currentCase.title}</h3>
                <p>{currentCase.description}</p>
              </div>
            </div>
          ) : (
            <div className="case-study-card" onClick={() => navigate('/proiecte')}>
              <div className="case-study-video">
                <img 
                  src="/images/slide1.webp" 
                  alt="Holleman Project Cargo"
                  className="video-thumbnail"
                />
                <div className="video-play-button" onClick={() => navigate('/proiecte')}>
                  <svg viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              <div className="case-study-content">
                <h3>Proiecte Project Cargo</h3>
                <p>Explorează portofoliul nostru complet de proiecte Project Cargo pentru a descoperi soluțiile noastre specializate.</p>
              </div>
            </div>
          )}
          
          {caseStudies.length > 1 && (
            <div className="case-studies-nav">
              <div className="nav-dots">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    className={`nav-dot ${index === currentCaseStudy ? 'active' : ''}`}
                    onClick={() => handleManualNavigation(index)}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="case-studies-footer">
          <button className="btn" onClick={() => navigate('/contact')}>
            <span>CONTACT</span>
          </button>
          </div>
        </div>
      </section>

      {/* Services Navigation Section */}
      <section className="services-nav-section">
        <div className="services-nav-container">
          <h2 className="services-nav-title">Afla despre mai multe servicii</h2>
          <div className="services-nav-grid">
            <div className="service-nav-item" onClick={() => navigate('/heavy-lift')}>
              <div className="service-nav-icon">
                <img src="/images/icons/heavy.webp" alt="Heavy Lift icon" />
              </div>
              <h3>Heavy Lift</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/itl')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconinternational.webp" alt="ITL icon" />
              </div>
              <h3>ITL</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/agro')}>
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

      <Footer />
    </div>
  );
};

export default ProjectCargo;
