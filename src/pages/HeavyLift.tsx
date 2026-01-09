import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoUpButton from '../components/GoUpButton';
import SEO from '../components/SEO';
import './HeavyLift.css';

const HeavyLift: React.FC = () => {
  const navigate = useNavigate();
  const [serviceCardsContent, setServiceCardsContent] = useState<any>(null);
  const [contentSectionsData, setContentSectionsData] = useState<any>(null);
  const [heavyLiftHeroContent, setHeavyLiftHeroContent] = useState<any>(null);
  
  // Refs for hook animations
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);

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
    canonical.setAttribute('href', 'https://holleman.ro/relocari-industriale');
  }, []);

  // Fetch Heavy Lift content from Strapi
  useEffect(() => {
    const fetchHeavyLiftContent = async () => {
      try {
        const [serviceCardsResponse, contentSectionsResponse, heavyLiftHeroResponse] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/heavy-lift-service-card'),
          fetch('https://holleman-cms-production.up.railway.app/api/heavy-lift-content-section?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/heavy-lift-hero')
        ]);

        const [serviceCardsData, contentSectionsResult, heavyLiftHeroData] = await Promise.all([
          serviceCardsResponse.json(),
          contentSectionsResponse.json(),
          heavyLiftHeroResponse.json()
        ]);

        setServiceCardsContent(serviceCardsData.data);
        setContentSectionsData(contentSectionsResult.data);
        setHeavyLiftHeroContent(heavyLiftHeroData.data);
      } catch (error) {
        console.error('Error fetching Heavy Lift content:', error);
        // Set fallback content if needed
        setHeavyLiftHeroContent({
          title: 'Heavy Lift',
          subtitleText: 'Nu mutam doar obiecte, ci si limite'
        });
      } finally {
      }
    };
    fetchHeavyLiftContent();
  }, []);

  // Hook animation on scroll
  useEffect(() => {
    const sections = [
      { ref: section1Ref, side: 'right' }, // Image on left, hook comes from right
      { ref: section2Ref, side: 'left' },  // Image on right, hook comes from left
      { ref: section3Ref, side: 'right' }, // Image on left, hook comes from right
      { ref: section4Ref, side: 'left' },  // Image on right, hook comes from left
      { ref: section5Ref, side: 'right' }  // Image on left, hook comes from right
    ];

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ ref, side }, index) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log(`Section ${index + 1} is visible, starting hook animation from ${side}!`);
              
              const section = entry.target as HTMLElement;
              const hookContainer = section.querySelector('.hook-container') as HTMLElement;
              const imageElement = section.querySelector('.content-image img') as HTMLElement;
              
              console.log('Hook container found:', !!hookContainer);
              console.log('Image element found:', !!imageElement);
              
              if (hookContainer && imageElement) {
                console.log(`Starting hook animation from ${side}!`);
                
                // 1. Start hook animation
                hookContainer.classList.add('animate-hook', `hook-from-${side}`);
                
                // 2. Hook delivers image when it reaches position (after 3 seconds)
                setTimeout(() => {
                  console.log('Hook delivering image!');
                  const imageContainer = section.querySelector('.content-image') as HTMLElement;
                  imageElement.classList.add('image-delivered');
                  if (imageContainer) {
                    imageContainer.classList.add('image-container-delivered');
                  }
                }, 3000); // Hook reaches position and delivers image
                
                // 3. Hook retracts after delivering (0.5s later)
                setTimeout(() => {
                  console.log('Hook retracting!');
                  hookContainer.classList.add('hook-retract');
                }, 3500); // Start retraction after delivery
              } else {
                console.log('Missing elements - hookContainer:', !!hookContainer, 'imageElement:', !!imageElement);
              }
            }
          });
        },
        {
          threshold: 0.1, // Trigger when 10% of the section is visible
          rootMargin: '0px 0px 50px 0px' // Start animation earlier
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    // Cleanup
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="heavy-lift-page">
      <SEO
        title="Heavy Lift - Relocări Industriale și Echipamente Ultra-Grele | Holleman"
        description="Servicii specializate de Heavy Lift: relocări industriale, transport echipamente ultra-grele, macarale hidraulice mobile, soluții turnkey. Expertiză în mutări de fabrici și instalații complexe."
        canonicalUrl="https://holleman.ro/relocari-industriale"
        ogImage="https://holleman.ro/images/Group8730.webp"
        keywords="heavy lift, relocari industriale, echipamente ultra-grele, macarale hidraulice, transport utilaje, mutari fabrici, heavy transport"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section" style={{backgroundImage: `url('/images/Group8730.webp')`}}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              {heavyLiftHeroContent?.title || ''}
            </h1>
            <p className="hero-subtitle">
              {heavyLiftHeroContent?.subtitleText || ''}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-section">
        <div className="services-container">
          <h2 className="services-title">{serviceCardsContent?.SectionTitle || 'Loading...'}</h2>
          
          <div className="services-grid">
            <div className="service-item clickable" onClick={() => scrollToSection('hydraulic-cranes')}>
              <div className="service-icon">
                <img src="/images/icons/iconaerian.webp" alt="Acționări speciale cu portale hidraulice mobile de mare tonaj" />
              </div>
              <h3>{serviceCardsContent?.Service1Title || 'Loading...'}</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('intelligent-solutions')}>
              <div className="service-icon">
                <img src="/images/icons/iconlogistice.webp" alt="Soluții inteligente pentru diverse și neașteptate relocări la sediul firmei" />
              </div>
              <h3>{serviceCardsContent?.Service2Title || 'Loading...'}</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('global-relocations')}>
              <div className="service-icon">
                <img src="/images/icons/iconinternational.webp" alt="Relocări în cadrul acelorași hale, firme, localități, țări, continent" />
              </div>
              <h3>{serviceCardsContent?.Service3Title || 'Loading...'}</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('industrial-assembly')}>
              <div className="service-icon">
                <img src="/images/icons/iconnaval.webp" alt="Montaj industrial cu echipaje noastre, folosind și specialiști în echipamente hidraulice și de automatizare" />
              </div>
              <h3>{serviceCardsContent?.Service4Title || 'Loading...'}</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>

            <div className="service-item clickable" onClick={() => scrollToSection('logistics-integration')}>
              <div className="service-icon">
                <img src="/images/icons/heavy.webp" alt="Integrare cu transport agabaritic – activitate door-to-door" />
              </div>
              <h3>{serviceCardsContent?.Service5Title || 'Loading...'}</h3>
              <div className="service-overlay">
                <p>Citeste mai mult</p>
              </div>
            </div>
          </div>

          <div className="services-footer">
            <button className="btn" onClick={() => navigate('/contact')}>CONTACT</button>
          </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      
      {/* Hydraulic Cranes Section */}
      <section id="hydraulic-cranes" className="content-section" ref={section1Ref}>
        <div className="hook-container">
          <img src="/images/hook.webp" alt="Hook" className="hook-image" />
        </div>
        <div className="content-container">
          <div className="content-grid">
            <div className="content-image">
              <img 
                src={contentSectionsData?.Section1Image 
                  ? (contentSectionsData.Section1Image.url.startsWith('http') 
                    ? contentSectionsData.Section1Image.url 
                    : `https://holleman-cms-production.up.railway.app${contentSectionsData.Section1Image.url}`)
                  : '/images/source/heavyliftex1.webp'
                } 
                alt={contentSectionsData?.Section1Title || 'Acționări speciale cu portale hidraulice mobile'} 
              />
            </div>
            <div className="content-text">
              <h2>{contentSectionsData?.Section1Title || 'Loading...'}</h2>
              <p dangerouslySetInnerHTML={{ __html: contentSectionsData?.Section1Content || 'Loading...' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Solutions Section */}
      <section id="intelligent-solutions" className="content-section alternate" ref={section2Ref}>
        <div className="hook-container">
          <img src="/images/hook.webp" alt="Hook" className="hook-image" />
        </div>
        <div className="content-container">
          <div className="content-grid reverse">
            <div className="content-text">
              <h2>{contentSectionsData?.Section2Title || 'Loading...'}</h2>
              <p dangerouslySetInnerHTML={{ __html: contentSectionsData?.Section2Content || 'Loading...' }} />
            </div>
            <div className="content-image">
              <img 
                src={contentSectionsData?.Section2Image 
                  ? (contentSectionsData.Section2Image.url.startsWith('http') 
                    ? contentSectionsData.Section2Image.url 
                    : `https://holleman-cms-production.up.railway.app${contentSectionsData.Section2Image.url}`)
                  : '/images/source/heavyliftex3.webp'
                } 
                alt={contentSectionsData?.Section2Title || 'Soluții inteligente pentru relocări'} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Relocations Section */}
      <section id="global-relocations" className="content-section" ref={section3Ref}>
        <div className="hook-container">
          <img src="/images/hook.webp" alt="Hook" className="hook-image" />
        </div>
        <div className="content-container">
          <div className="content-grid">
            <div className="content-image">
              <img 
                src={contentSectionsData?.Section3Image 
                  ? (contentSectionsData.Section3Image.url.startsWith('http') 
                    ? contentSectionsData.Section3Image.url 
                    : `https://holleman-cms-production.up.railway.app${contentSectionsData.Section3Image.url}`)
                  : '/images/source/heavyliftex2.webp'
                } 
                alt={contentSectionsData?.Section3Title || 'Relocări în orice scară'} 
              />
            </div>
            <div className="content-text">
              <h2>{contentSectionsData?.Section3Title || 'Loading...'}</h2>
              {contentSectionsData?.Section3Content ? (
                <div>
                  <p>
                    {contentSectionsData.Section3Content.split('\n')[0]}
                  </p>
                  <ul>
                    {contentSectionsData.Section3Content
                      .split('\n')
                      .slice(1)
                      .filter((line: string) => line.trim().startsWith('-'))
                      .map((item: string, index: number) => (
                        <li key={index}>{item.replace(/^-\s*/, '').replace(/<br>/g, '')}</li>
                      ))}
                  </ul>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Assembly Section */}
      <section id="industrial-assembly" className="content-section alternate" ref={section4Ref}>
        <div className="hook-container">
          <img src="/images/hook.webp" alt="Hook" className="hook-image" />
        </div>
        <div className="content-container">
          <div className="content-grid reverse">
            <div className="content-text">
              <h2>{contentSectionsData?.Section4Title || 'Loading...'}</h2>
              {contentSectionsData?.Section4Content ? (
                <div>
                  {/* First paragraph */}
                  <p>
                    {contentSectionsData.Section4Content.split('\n')[0]}
                  </p>
                  {/* Bullet points as proper list */}
                  <ul>
                    {contentSectionsData.Section4Content
                      .split('\n')
                      .slice(1)
                      .filter((line: string) => line.trim().startsWith('-'))
                      .map((item: string, index: number) => (
                        <li key={index}>{item.replace(/^-\s*/, '').replace(/<br>/g, '')}</li>
                      ))}
                  </ul>
                  {/* Last paragraph */}
                  {contentSectionsData.Section4Content.split('\n').slice(-1)[0].trim() && 
                   !contentSectionsData.Section4Content.split('\n').slice(-1)[0].startsWith('-') && (
                    <p>
                      {contentSectionsData.Section4Content.split('\n').slice(-1)[0]}
                    </p>
                  )}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="content-image">
              <img 
                src={contentSectionsData?.Section4Image 
                  ? (contentSectionsData.Section4Image.url.startsWith('http') 
                    ? contentSectionsData.Section4Image.url 
                    : `https://holleman-cms-production.up.railway.app${contentSectionsData.Section4Image.url}`)
                  : '/images/source/heavyliftex4.webp'
                } 
                alt={contentSectionsData?.Section4Title || 'Montaj industrial specializat'} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logistics Integration Section */}
      <section id="logistics-integration" className="content-section" ref={section5Ref}>
        <div className="hook-container">
          <img src="/images/hook.webp" alt="Hook" className="hook-image" />
        </div>
        <div className="content-container">
          <div className="content-grid">
            <div className="content-image">
              <img 
                src={contentSectionsData?.Section5Image 
                  ? (contentSectionsData.Section5Image.url.startsWith('http') 
                    ? contentSectionsData.Section5Image.url 
                    : `https://holleman-cms-production.up.railway.app${contentSectionsData.Section5Image.url}`)
                  : '/images/source/heavyliftex5.webp'
                } 
                alt={contentSectionsData?.Section5Title || 'Transport integrat door-to-door'} 
              />
            </div>
            <div className="content-text">
              <h2>{contentSectionsData?.Section5Title || 'Loading...'}</h2>
              <p dangerouslySetInnerHTML={{ __html: contentSectionsData?.Section5Content || 'Loading...' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Navigation Section */}
      <section className="services-nav-section">
        <div className="services-nav-container">
          <h2 className="services-nav-title">Afla despre mai multe servicii</h2>
          <div className="services-nav-grid">
            <div className="service-nav-item" onClick={() => navigate('/transport-marfuri-agabaritice')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconprojectcargo.webp" alt="Project Cargo icon" />
              </div>
              <h3>Transport marfuri agabaritice</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/transport-marfuri-generale')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconinternational.webp" alt="ITL icon" />
              </div>
              <h3>Transport marfuri generale</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/portops')}>
              <div className="service-nav-icon">
                <img src="/images/icons/Anchor.webp" alt="Port Operations icon" />
              </div>
              <h3>Operatiuni portuare</h3>
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
