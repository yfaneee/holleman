import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Agro.css';

const Agro: React.FC = () => {
  const navigate = useNavigate();
  
  // State for Strapi content
  const [loading, setLoading] = useState(true);
  const [portOpsHeroContent, setPortOpsHeroContent] = useState<any>(null);
  const [portOpsSection1, setPortOpsSection1] = useState<any>(null);
  const [portOpsSection2, setPortOpsSection2] = useState<any>(null);
  const [portOpsSection3, setPortOpsSection3] = useState<any>(null);

  // Fetch content from Strapi
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [heroRes, section1Res, section2Res, section3Res] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/port-ops-hero'),
          fetch('https://holleman-cms-production.up.railway.app/api/port-ops-section1'),
          fetch('https://holleman-cms-production.up.railway.app/api/port-ops-section2'),
          fetch('https://holleman-cms-production.up.railway.app/api/port-ops-section3')
        ]);

        const heroData = await heroRes.json();
        const section1Data = await section1Res.json();
        const section2Data = await section2Res.json();
        const section3Data = await section3Res.json();

        console.log('PortOps Hero Data:', heroData);
        console.log('PortOps Section1 Data:', section1Data);
        console.log('PortOps Section2 Data:', section2Data);
        console.log('PortOps Section3 Data:', section3Data);

        setPortOpsHeroContent(heroData.data);
        setPortOpsSection1(section1Data.data);
        setPortOpsSection2(section2Data.data);
        setPortOpsSection3(section3Data.data);
      } catch (error) {
        console.error('Error fetching content:', error);
        setPortOpsHeroContent({
          title: 'OPERATIUNI PORTUARE',
          subtitleText: 'Solutii complete pentru operatiuni portuare'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Service cards data for Port Operations
  const serviceCards = [
    {
      icon: '/images/icons/heavy.webp',
      title: 'Operare si manipulare Heavy Lift'
    },
    {
      icon: '/images/icons/iconlogistice.webp',
      title: 'Incarcare/descărcare nave si barje'
    },
    {
      icon: '/images/icons/iconprojectcargo.webp',
      title: 'Servicii de lashing, securing & lifting plan'
    },
    {
      icon: '/images/icons/Info.webp',
      title: 'Supervizare tehnica pe intregul flux logistic'
    },
    {
      icon: '/images/icons/iconinternational.webp',
      title: 'Coordonare formalitati si documentatie portuara'
    },
    {
      icon: '/images/icons/iconprojectcargo.webp',
      title: 'Solutii complete pentru Project Cargo si transporturi speciale'
    }
  ];

  return (
    <div className="agro-page portops-page">
      <Header />
      
      {/* Hero Section */}
      <section className="agro-hero portops-hero" style={{backgroundImage: `url('/images/portoperationsbg.webp')`}}>
        <div className="agro-hero-overlay">
          <div className="agro-hero-content">
            <h1 className="agro-title">
              {portOpsHeroContent?.title || ''}
            </h1>
            <p className="agro-subtitle">
              {portOpsHeroContent?.subtitleText || ''}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="agro-services-section portops-services-section">
        <div className="agro-services-container">
          <div className="agro-services-header">
            <h2 className="agro-services-title">Servicii specializate</h2>
          </div>
          
          <div className="agro-services-grid portops-services-grid">
            {serviceCards.map((card, index) => (
              <div key={index} className="agro-service-item portops-service-item">
                <div className="agro-service-icon">
                  <img src={card.icon} alt={`${card.title} icon`} />
                </div>
                <h3>{card.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="agro-services-footer">
            <button className="btn" onClick={() => navigate('/contact')}>
              <span>CONTACT</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 1 - White background with title and text */}
      <section className="portops-section portops-section-1">
        <div className="portops-section-container">
          {loading ? (
            <div className="loading-placeholder">Loading...</div>
          ) : portOpsSection1 && (
            <>
              <h2 className="portops-section-title">{portOpsSection1.title || 'Titlu sectiune 1'}</h2>
              <div className="portops-section-text">
                <p>{portOpsSection1.text || 'Text pentru sectiunea 1...'}</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section 2 - Background image with title and text */}
      <section className="portops-section portops-section-2" style={{backgroundImage: `url('/images/portopsplit.webp')`}}>
        <div className="portops-section-overlay">
          <div className="portops-section-container">
            {loading ? (
              <div className="loading-placeholder">Loading...</div>
            ) : portOpsSection2 && (
              <>
                <h2 className="portops-section-title">{portOpsSection2.title || 'Titlu sectiune 2'}</h2>
                <div className="portops-section-text">
                  <p>{portOpsSection2.text || 'Text pentru sectiunea 2...'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 3 - Title, text, bullet points list, and final text */}
      <section className="portops-section portops-section-3">
        <div className="portops-section-container">
          {loading ? (
            <div className="loading-placeholder">Loading...</div>
          ) : portOpsSection3 && (
            <>
              <h2 className="portops-section-title">{portOpsSection3.title || 'Titlu sectiune 3'}</h2>
              <div className="portops-section-text">
                <p>{portOpsSection3.introText || 'Text introductiv pentru sectiunea 3...'}</p>
              </div>
              
              {portOpsSection3.bulletPoints && (
                <div className="portops-bullet-list">
                  {portOpsSection3.bulletPoints.split('\n').filter((point: string) => point.trim()).map((point: string, index: number) => (
                    <div key={index} className="portops-bullet-item">
                      <div className="portops-bullet"></div>
                      <p>{point.trim()}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="portops-section-text portops-final-text">
                <p>{portOpsSection3.finalText || 'Text final pentru sectiunea 3...'}</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Services Navigation Section */}
      <section className="services-nav-section">
        <div className="services-nav-container">
          <h2 className="services-nav-title">Afla despre mai multe servicii</h2>
          <div className="services-nav-grid">
            <div className="service-nav-item" onClick={() => navigate('/relocari-industriale')}>
              <div className="service-nav-icon">
                <img src="/images/icons/heavy.webp" alt="Heavy Lift icon" />
              </div>
              <h3>Heavy Lift</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/transport-marfuri-agabaritice')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconprojectcargo.webp" alt="Project Cargo icon" />
              </div>
              <h3>Project Cargo</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/itl')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconinternational.webp" alt="ITL icon" />
              </div>
              <h3>ITL</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agro;
