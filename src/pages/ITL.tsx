import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ITL.css';

const ITL: React.FC = () => {
  const navigate = useNavigate();
  const truckRef = useRef<HTMLDivElement>(null);
  
  // State for Strapi content
  const [transportLogisticsContent, setTransportLogisticsContent] = useState<any>(null);
  const [networkCoverageContent, setNetworkCoverageContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const heroStyle = {
    backgroundImage: `url('/images/ITLbackground.webp')`
  };

  // Fetch content from Strapi
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [transportLogisticsRes, networkCoverageRes] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/itl-transport-logistics-section?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/itl-retea?populate=*')
        ]);

        const transportLogisticsData = await transportLogisticsRes.json();
        const networkCoverageData = await networkCoverageRes.json();

        console.log('Transport Logistics Data:', transportLogisticsData);
        console.log('Network Coverage Data:', networkCoverageData);

        setTransportLogisticsContent(transportLogisticsData.data);
        setNetworkCoverageContent(networkCoverageData.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // SEO: Set document title and meta description for ITL page
  useEffect(() => {
    document.title = "ITL - Transport Internațional și Logistică | Holleman";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ITL Holleman - servicii complete de transport internațional și logistică. Transport rutier, naval, aerian. Servicii vamale, asistență documentară. Rețea europeană și globală.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/itl');
  }, []);

  // Truck animation on scroll
  useEffect(() => {
    const truckElement = truckRef.current;
    if (!truckElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Truck section is visible, starting animation!');
            // Add animation class when truck section comes into view
            const movingTruck = truckElement.querySelector('.moving-truck');
            const truckText = truckElement.querySelector('.truck-text');
            
            if (movingTruck) {
              movingTruck.classList.add('animate-truck');
              
              // Show text when truck reaches middle (3 seconds)
              if (truckText) {
                setTimeout(() => {
                  truckText.classList.add('show-text');
                }, 4000); // Show text when truck is in the middle
              }
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px 0px 0px' // Trigger as soon as any part is visible
      }
    );

    observer.observe(truckElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="itl-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section" style={heroStyle}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">ITL</h1>
          <p className="hero-subtitle">Ne plimbam mai mult decat GPS-ul tau</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">Servicii</h2>
          </div>
          
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconinternational.webp" alt="Transport rutier international" />
              </div>
              <h3>Transport rutier internațional</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconinternational.webp" alt="Transport rutier international" />
                </div>
                <h3>Transport rutier internațional</h3>
                <p>Transport complet (FTL) și în regim de grupaj (LTL) cu camioane cu prelată, frigorifice, dubă, platformă, megatrailer etc.</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconnaval.webp" alt="Transport naval" />
              </div>
              <h3>Transport naval</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconnaval.webp" alt="Transport naval" />
                </div>
                <h3>Transport naval</h3>
                <p>Import/export containere FCL/LCL <br />
                Soluții multimodale prin porturi europene majore (Constanța, Rotterdam, Hamburg etc.) </p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconaerian.webp" alt="Transport aerian" />
              </div>
              <h3>Transport aerian</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconaerian.webp" alt="Transport aerian" />
                </div>
                <h3>Transport aerian</h3>
                <p>Livrări urgente door-to-door <br />
                Servicii Express & Economy pentru toate continentele</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconlogistice.webp" alt="Servicii logistice" />
              </div>
              <h3>Servicii logistice</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconlogistice.webp" alt="Servicii logistice" />
                </div>
                <h3>Servicii logistice</h3>
                <p>Depozitare temporară sau pe termen lung, în centre logistice autorizate <br />
                Distributie eficientă în rețele naționale și internaționale</p>
              </div>
            </div>
            
            <div className="service-item">
              <div className="service-icon">
                <img src="/images/icons/iconvamuire.webp" alt="Vămuire și asistență documentară" />
              </div>
              <h3>Vămuire și asistență documentară</h3>
              <div className="service-overlay">
                <div className="service-icon-white">
                  <img src="/images/icons/iconvamuire.webp" alt="Vămuire și asistență documentară" />
                </div>
                <h3>Vămuire și asistență documentară</h3>
                <p>Formalități vamale de import/export <br />
                Asistență completă pentru documentația de transport</p>
              </div>
            </div>
          </div>
          
          <div className="services-footer">
            <button className="btn" onClick={() => navigate('/contact')}>CONTACT</button>
          </div>
        </div>
      </section>

      {/* Transport și logistică fără granițe Section */}
      <section className="transport-logistics-section" style={{backgroundImage: `url('/images/Group8728.webp')`}}>
        <div className="transport-logistics-container">
          <div className="transport-logistics-content">
            {loading ? (
              <div>Loading...</div>
            ) : transportLogisticsContent && (
              <>
                <h2 className="transport-logistics-title">
                  {transportLogisticsContent.title} <span className="highlight">{transportLogisticsContent.highlightedText}</span>
                </h2>
                
                <ul className="transport-logistics-list">
                  {transportLogisticsContent.bulletPoints && transportLogisticsContent.bulletPoints.split('\n').filter((point: string) => point.trim()).map((point: string, index: number) => (
                    <li key={index}>{point.trim()}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Rețea și acoperire Section */}
      <section className="network-coverage-section">
        <div className="network-coverage-container">
          <div className="network-coverage-content">
            <div className="network-content-left">
              {loading ? (
                <div>Loading...</div>
              ) : networkCoverageContent && (
                <>
                  <h2 className="network-coverage-title">{networkCoverageContent.title}</h2>
                  <div className="network-description">
                    <p>{networkCoverageContent.description}</p>
                  </div>
                  <ul className="network-features-list">
                    {networkCoverageContent.featuresList && networkCoverageContent.featuresList.split('\n').filter((feature: string) => feature.trim()).map((feature: string, index: number) => (
                      <li key={index}>{feature.trim()}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="network-content-right">
              <div className="network-map-container">
                {loading ? (
                  <div>Loading...</div>
                ) : networkCoverageContent?.mapImage && (
                  <img 
                    src={`https://holleman-cms-production.up.railway.app${networkCoverageContent.mapImage.url}`} 
                    alt={networkCoverageContent.mapImage.alternativeText || "Harta rețelei ITL Holleman"} 
                    className="network-map" 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" style={{backgroundImage: `url('/images/Group8729.webp')`}}>
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Alege <span className="highlight">Holleman ITL</span> pentru o logistică fără sincope, soluții inteligente și un partener de încredere în mișcarea mărfurilor tale.
            </h2>
            <button className="btn cta-btn" onClick={() => navigate('/contact')}>
              Contacteaza-ne pentru o oferta personalizata
              <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
            </button>
          </div>
        </div>
      </section>

      {/* Moving Truck Animation Section */}
      <section className="truck-animation-section" ref={truckRef}>
        <div className="truck-animation-container">
          <div className="moving-truck">
            <img 
              src="/images/svg/truck.svg" 
              alt="Holleman Truck" 
              className="truck-svg"
            />
          </div>
          <div className="truck-text">
            <p className="truck-message">
              <span className="word">Știm</span>
              <span className="word">să</span>
              <span className="word">negociem</span>
              <span className="word">cu</span>
              <span className="word">drumurile.</span>
              <span className="word">Și</span>
              <span className="word">câștigăm</span>
              <span className="word">de</span>
              <span className="word">fiecare</span>
              <span className="word">dată.</span>
            </p>
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
            <div className="service-nav-item" onClick={() => navigate('/project-cargo')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconprojectcargo.webp" alt="Project Cargo icon" />
              </div>
              <h3>Project Cargo</h3>
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

      <Footer />
    </div>
  );
};

export default ITL;
