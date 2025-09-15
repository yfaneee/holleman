import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoUpButton from '../components/GoUpButton';
import './DespreNoi.css';

const DespreNoi: React.FC = () => {
  const navigate = useNavigate();
  const cineSuntemRef = useRef<HTMLDivElement>(null);
  const istoricRef = useRef<HTMLDivElement>(null);
  const misiuneRef = useRef<HTMLDivElement>(null);
  const certificariRef = useRef<HTMLDivElement>(null);
  const conducereaRef = useRef<HTMLDivElement>(null);
  const responsabilitateRef = useRef<HTMLDivElement>(null);
  
  // Strapi content state
  const [heroContent, setHeroContent] = useState<any>(null);
  const [cineSuntemContent, setCineSuntemContent] = useState<any>(null);
  const [istoricContent, setIstoricContent] = useState<any>(null);
  const [misiuneContent, setMisiuneContent] = useState<any>(null);
  const [certificariContent, setCertificariContent] = useState<any>(null);
  const [conducereaContent, setConducereaContent] = useState<any>(null);
  const [ceNeDefinesteContent, setCeNeDefinesteContent] = useState<any>(null);
  const [responsabilitateContent, setResponsabilitateContent] = useState<any>(null);
  
  const navigationBoxes = [
    {
      id: 'cine-suntem',
      title: 'Cine suntem - Valorile care ne definesc',
      icon: '/images/icons/icondpn1.webp'
    },
    {
      id: 'istoric',
      title: 'Istoric și evoluție',
      icon: '/images/icons/icondpn3.webp'
    },
    {
      id: 'misiune-viziune',
      title: 'Misiunea și viziunea noastră',
      icon: '/images/icons/icondpn2.webp'
    },
    {
      id: 'certificari',
      title: 'Certificări și conformitate',
      icon: '/images/icons/icondpn6.webp'
    },
    {
      id: 'conducerea',
      title: 'Conducerea grupului',
      icon: '/images/icons/icondpn4.webp'
    },
    {
      id: 'responsabilitate',
      title: 'Responsabilitate Socială Corporativă',
      icon: '/images/icons/icondpn5.webp'
    }
  ];

  const handleBoxClick = (boxId: string) => {
    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const headerHeight = window.innerWidth <= 768 ? 100 : 120; 
        const elementPosition = ref.current.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    switch (boxId) {
      case 'cine-suntem':
        scrollToSection(cineSuntemRef);
        break;
      case 'istoric':
        scrollToSection(istoricRef);
        break;
      case 'misiune-viziune':
        scrollToSection(misiuneRef);
        break;
      case 'certificari':
        scrollToSection(certificariRef);
        break;
      case 'conducerea':
        scrollToSection(conducereaRef);
        break;
      case 'responsabilitate':
        scrollToSection(responsabilitateRef);
        break;
      // TODO: Add navigation for other sections
      default:
        console.log(`Navigate to: ${boxId}`);
    }
  };

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

  // Fetch content from Strapi
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch all 8 sections in parallel
        const [heroResponse, cineSuntemResponse, istoricResponse, misiuneResponse, certificariResponse, conducereaResponse, ceNeDefinesteResponse, responsabilitateResponse] = await Promise.all([
          fetch('http://localhost:3001/api/despre-noi-page'),
          fetch('http://localhost:3001/api/cine-suntem-despre-noi'),
          fetch('http://localhost:3001/api/istoric-evolutie'),
          fetch('http://localhost:3001/api/misiune-despre-noi'),
          fetch('http://localhost:3001/api/despre-noi-certificari'),
          fetch('http://localhost:3001/api/despre-noi-conducerea?populate=*'),
          fetch('http://localhost:3001/api/despre-noi-ce-ne-defineste'),
          fetch('http://localhost:3001/api/despre-noi-responsabilitate')
        ]);

        const [heroData, cineSuntemData, istoricData, misiuneData, certificariData, conducereaData, ceNeDefinesteData, responsabilitateData] = await Promise.all([
          heroResponse.json(),
          cineSuntemResponse.json(),
          istoricResponse.json(),
          misiuneResponse.json(),
          certificariResponse.json(),
          conducereaResponse.json(),
          ceNeDefinesteResponse.json(),
          responsabilitateResponse.json()
        ]);

        setHeroContent(heroData.data);
        setCineSuntemContent(cineSuntemData.data);
        setIstoricContent(istoricData.data);
        setMisiuneContent(misiuneData.data);
        setCertificariContent(certificariData.data);
        setConducereaContent(conducereaData.data);
        setCeNeDefinesteContent(ceNeDefinesteData.data);
        setResponsabilitateContent(responsabilitateData.data);
      } catch (error) {
        console.error('Error fetching Despre Noi content:', error);
        // Set fallback content
        setHeroContent({
          heroTitle: 'Despre noi',
          heroSubtitle: 'Descopera povestea, valorile si oamenii din spatele succesului Holleman'
        });
        setCineSuntemContent({
          title: 'Cine suntem - Valorile care ne definesc',
          description: 'Grupul Holleman este un lider regional...',
          footerText: 'Am învățat că fiecare șurub, fiecare centimetru și fiecare tonă contează. Și le respectăm pe toate.'
        });
        setIstoricContent({
          title: 'Istoric și evoluție',
          paragraph1: 'Povestea Holleman începe...',
          paragraph2: 'Astăzi, Grupul Holleman...'
        });
      }
    };

    fetchContent();
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
    <div className="despre-noi-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="despre-noi-hero"
        style={{
          backgroundImage: `url('/images/Group8734.webp')`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{heroContent?.heroTitle || 'Loading...'}</h1>
          <p className="hero-subtitle">
            {heroContent?.heroSubtitle || 'Loading...'}
          </p>
        </div>
      </section>

      {/* Navigation Boxes Section */}
      <section className="despre-noi-navigation">
        <div className="navigation-container">
          <h2 className="navigation-title">Explorează mai multe despre noi</h2>
          <div className="navigation-grid">
            {navigationBoxes.map((box) => (
              <div
                key={box.id}
                className="navigation-box"
                onClick={() => handleBoxClick(box.id)}
              >
                <div className="box-icon">
                  <img src={box.icon} alt={box.title} />
                </div>
                <div className="box-content">
                  <h3 className="box-title">{box.title}</h3>
                </div>
                <div className="box-overlay">
                  <p className="overlay-text">CITESTE MAI MULT</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cine Suntem Section */}
      <section className="cine-suntem-section" id="cine-suntem" ref={cineSuntemRef}>
        <div className="cine-suntem-container">
          <h2 className="cine-suntem-title">{cineSuntemContent?.Title || 'Loading...'}</h2>
          
          <div className="cine-suntem-content">
            <div className="cine-suntem-description" dangerouslySetInnerHTML={{ __html: cineSuntemContent?.Description || 'Loading...' }} />
            
            <div className="cine-suntem-values">
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>{cineSuntemContent?.Value1Title || 'Loading...'}</strong> - <span dangerouslySetInnerHTML={{ __html: cineSuntemContent?.Value1Description || 'Loading...' }} />
                </div>
              </div>
              
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>{cineSuntemContent?.Value2Title || 'Loading...'}</strong> - <span dangerouslySetInnerHTML={{ __html: cineSuntemContent?.Value2Description || 'Loading...' }} />
                </div>
              </div>
              
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>{cineSuntemContent?.Value3Title || 'Loading...'}</strong> - <span dangerouslySetInnerHTML={{ __html: cineSuntemContent?.Value3Description || 'Loading...' }} />
                </div>
              </div>
              
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>{cineSuntemContent?.Value4Title || 'Loading...'}</strong> - <span dangerouslySetInnerHTML={{ __html: cineSuntemContent?.Value4Description || 'Loading...' }} />
                </div>
              </div>
              
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>{cineSuntemContent?.Value5Title || 'Loading...'}</strong> - <span dangerouslySetInnerHTML={{ __html: cineSuntemContent?.Value5Description || 'Loading...' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cine-suntem-footer">
          <p className="cine-suntem-footer-text">
            {cineSuntemContent?.FooterText || cineSuntemContent?.footerText || 'Loading...'}
          </p>
        </div>
      </section>

      {/* Istoric și evoluție Section */}
      <section 
        id="istoric"
        className="istoric-section" 
        ref={istoricRef}
        style={{
          backgroundImage: `url('/images/Group8741.webp')`
        }}
      >
        <div className="istoric-overlay"></div>
        <div className="istoric-container">
          <div className="istoric-content">
            <h2 className="istoric-title animate-on-scroll fade-up">{istoricContent?.Title || 'Loading...'}</h2>
            <div className="istoric-text">
              <div className="istoric-paragraph animate-on-scroll fade-up delay-200">
                <div className="istoric-bullet"></div>
                <p dangerouslySetInnerHTML={{ __html: istoricContent?.Paragraph1 || 'Loading...' }} />
              </div>
              
              <div className="istoric-paragraph animate-on-scroll fade-up delay-300">
                <div className="istoric-bullet"></div>
                <p dangerouslySetInnerHTML={{ __html: istoricContent?.Paragraph2 || 'Loading...' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misiunea și viziunea noastră Section */}
      <section id="misiune-viziune" className="misiune-section" ref={misiuneRef}>
        <div className="misiune-container">
          <div className="misiune-content">
            <h2 className="misiune-title">{misiuneContent?.title || 'Loading...'}</h2>
            
            <div className="misiune-text">
              <p className="misiune-paragraph" dangerouslySetInnerHTML={{ __html: misiuneContent?.paragraph1 || 'Loading...' }} />
              
              <p className="misiune-paragraph" dangerouslySetInnerHTML={{ __html: misiuneContent?.paragraph2 || 'Loading...' }} />
            </div>
          </div>
        </div>
        
        <div className="misiune-accent">
          <div className="green-triangle"></div>
        </div>
      </section>

      {/* Misiune Footer */}
      <section className="misiune-footer">
        <p className="misiune-footer-text">
          {misiuneContent?.footerText || 'Loading...'}
        </p>
      </section>

      {/* Certificări și conformitate Section */}
      <section 
        id="certificari"
        className="certificari-section" 
        ref={certificariRef}
        style={{
          backgroundImage: `url('/images/Group8742.webp')`
        }}
      >
        <div className="certificari-overlay"></div>
        <div className="certificari-container">
          <div className="certificari-content">
            <h2 className="certificari-title animate-on-scroll fade-up">{certificariContent?.title || 'Loading...'}</h2>
            
            <div className="certificari-text">
              <p className="certificari-intro animate-on-scroll fade-up delay-200" dangerouslySetInnerHTML={{ __html: certificariContent?.intro || 'Loading...' }} />
              
              <ul className="certificari-list animate-on-scroll stagger-children delay-300">
                <li>{certificariContent?.Certification1 || 'Loading...'}</li>
                <li>{certificariContent?.Certification2 || 'Loading...'}</li>
                <li>{certificariContent?.Certification3 || 'Loading...'}</li>
                <li>{certificariContent?.Certification4 || 'Loading...'}</li>
              </ul>
            </div>
          </div>
        </div>
        
      </section>

      {/* Conducerea Grupului Holleman Section */}
      <section className="conducerea-section" id="conducerea" ref={conducereaRef}>
      <div className="conducerea-accent">
              <div className="green-triangle-top"></div>
            </div>
        <div className="conducerea-container">
          <div className="conducerea-header">
            <h2 className="conducerea-title">{conducereaContent?.title || 'Loading...'}</h2>
          </div>
          
          <div className="conducerea-content">
            <div className="management-info">
              <h3 className="management-subtitle">{conducereaContent?.subtitle || 'Loading...'}</h3>
              <p className="management-description" dangerouslySetInnerHTML={{ __html: conducereaContent?.description1 || 'Loading...' }} />
              <p className="management-description" dangerouslySetInnerHTML={{ __html: conducereaContent?.description2 || 'Loading...' }} />
            </div>
            
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">
                  {conducereaContent?.Member1Avatar ? (
                    <img 
                      src={`http://localhost:3001${conducereaContent.Member1Avatar.url}`} 
                      alt={conducereaContent.Member1Name || 'Team Member'} 
                    />
                  ) : (
                    <div className="avatar-placeholder"></div>
                  )}
                </div>
                <h4 className="member-name">{conducereaContent?.Member1Name || 'Loading...'}</h4>
                <p className="member-position">{conducereaContent?.Member1Position || 'Loading...'}</p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">
                  {conducereaContent?.Member2Avatar ? (
                    <img 
                      src={`http://localhost:3001${conducereaContent.Member2Avatar.url}`} 
                      alt={conducereaContent.Member2Name || 'Team Member'} 
                    />
                  ) : (
                    <div className="avatar-placeholder"></div>
                  )}
                </div>
                <h4 className="member-name">{conducereaContent?.Member2Name || 'Loading...'}</h4>
                <p className="member-position">{conducereaContent?.Member2Position || 'Loading...'}</p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">
                  {conducereaContent?.Member3Avatar ? (
                    <img 
                      src={`http://localhost:3001${conducereaContent.Member3Avatar.url}`} 
                      alt={conducereaContent.Member3Name || 'Team Member'} 
                    />
                  ) : (
                    <div className="avatar-placeholder"></div>
                  )}
                </div>
                <h4 className="member-name">{conducereaContent?.Member3Name || 'Loading...'}</h4>
                <p className="member-position">{conducereaContent?.Member3Position || 'Loading...'}</p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">
                  {conducereaContent?.Member4Avatar ? (
                    <img 
                      src={`http://localhost:3001${conducereaContent.Member4Avatar.url}`} 
                      alt={conducereaContent.Member4Name || 'Team Member'} 
                    />
                  ) : (
                    <div className="avatar-placeholder"></div>
                  )}
                </div>
                <h4 className="member-name">{conducereaContent?.Member4Name || 'Loading...'}</h4>
                <p className="member-position">{conducereaContent?.Member4Position || 'Loading...'}</p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">
                  {conducereaContent?.Member5Avatar ? (
                    <img 
                      src={`http://localhost:3001${conducereaContent.Member5Avatar.url}`} 
                      alt={conducereaContent.Member5Name || 'Team Member'} 
                    />
                  ) : (
                    <div className="avatar-placeholder"></div>
                  )}
                </div>
                <h4 className="member-name">{conducereaContent?.Member5Name || 'Loading...'}</h4>
                <p className="member-position">{conducereaContent?.Member5Position || 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce ne definește ca echipă de leadership Section */}
      <section 
        className="leadership-section" 
        style={{
          backgroundImage: `url('/images/Group8743.webp')`
        }}
      >
        <div className="leadership-overlay"></div>
        <div className="leadership-container">
          <div className="leadership-content">
            <h2 className="leadership-title animate-on-scroll fade-up">{ceNeDefinesteContent?.Title || 'Loading...'}</h2>
            
            <div className="leadership-points animate-on-scroll stagger-children delay-200">
              <div className="leadership-point">
                <div className="point-bullet"></div>
                <p>
                  <strong>{ceNeDefinesteContent?.Leadership1Title || 'Loading...'}:</strong> <span dangerouslySetInnerHTML={{ __html: ceNeDefinesteContent?.Leadership1Description || 'Loading...' }} />
                </p>
              </div>
              
              <div className="leadership-point">
                <div className="point-bullet"></div>
                <p>
                  <strong>{ceNeDefinesteContent?.Leadership2Title || 'Loading...'}:</strong> <span dangerouslySetInnerHTML={{ __html: ceNeDefinesteContent?.Leadership2Description || 'Loading...' }} />
                </p>
              </div>
              
              <div className="leadership-point">
                <div className="point-bullet"></div>
                <p>
                  <strong>{ceNeDefinesteContent?.Leadership3Title || 'Loading...'}:</strong> <span dangerouslySetInnerHTML={{ __html: ceNeDefinesteContent?.Leadership3Description || 'Loading...' }} />
                </p>
              </div>
              
              <div className="leadership-point">
                <div className="point-bullet"></div>
                <p>
                  <strong>{ceNeDefinesteContent?.Leadership4Title || 'Loading...'}:</strong> <span dangerouslySetInnerHTML={{ __html: ceNeDefinesteContent?.Leadership4Description || 'Loading...' }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsabilitate Socială Corporativă Section */}
      <section className="responsabilitate-section" id="responsabilitate" ref={responsabilitateRef}>
        <div className="responsabilitate-container">
          <h2 className="responsabilitate-title">{responsabilitateContent?.Title || 'Loading...'}</h2>
          
          <div className="responsabilitate-content">
            <p className="responsabilitate-intro" dangerouslySetInnerHTML={{ __html: responsabilitateContent?.Intro || 'Loading...' }} />
            
            <p className="responsabilitate-subtitle">{responsabilitateContent?.Subtitle || 'Loading...'}</p>
            
            <div className="csr-initiatives">
              <div className="csr-initiative">
                <h3 className="initiative-title">{responsabilitateContent?.Initiative1Title || 'Loading...'}</h3>
                <p className="initiative-description" dangerouslySetInnerHTML={{ __html: responsabilitateContent?.Initiative1Description || 'Loading...' }} />
              </div>
              
              <div className="csr-initiative">
                <h3 className="initiative-title">{responsabilitateContent?.Initiative2Title || 'Loading...'}</h3>
                <p className="initiative-description" dangerouslySetInnerHTML={{ __html: responsabilitateContent?.Initiative2Description || 'Loading...' }} />
              </div>
              
              <div className="csr-initiative">
                <h3 className="initiative-title">{responsabilitateContent?.Initiative3Title || 'Loading...'}</h3>
                <p className="initiative-description" dangerouslySetInnerHTML={{ __html: responsabilitateContent?.Initiative3Description || 'Loading...' }} />
              </div>
              
              <div className="csr-initiative">
                <h3 className="initiative-title">{responsabilitateContent?.Initiative4Title || 'Loading...'}</h3>
                <p className="initiative-description" dangerouslySetInnerHTML={{ __html: responsabilitateContent?.Initiative4Description || 'Loading...' }} />
              </div>
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
      
      {/* Go Up Button Component */}
      <GoUpButton />
    </div>
  );
};

export default DespreNoi;
