import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Agro.css';

const Agro: React.FC = () => {
  const navigate = useNavigate();
  
  // State for Strapi content
  const [agroContentSection, setAgroContentSection] = useState<any>(null);
  const [agroCtaSection, setAgroCtaSection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [agroHeroContent, setAgroHeroContent] = useState<any>(null);
  const [heroLoading, setHeroLoading] = useState(true);

  // Fetch content from Strapi
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [agroContentRes, agroCtaRes, agroHeroRes] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/agro-content-section?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/agro-contact-section?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/agro-hero')
        ]);

        const agroContentData = await agroContentRes.json();
        const agroCtaData = await agroCtaRes.json();
        const agroHeroData = await agroHeroRes.json();

        console.log('Agro Content Data:', agroContentData);
        console.log('Agro CTA Data:', agroCtaData);
        console.log('Agro Hero Data:', agroHeroData);

        setAgroContentSection(agroContentData.data);
        setAgroCtaSection(agroCtaData.data);
        setAgroHeroContent(agroHeroData.data);
      } catch (error) {
        console.error('Error fetching content:', error);
        setAgroHeroContent({
          title: 'AGRO',
          subtitleText: 'Unde e nevoie de forta, aducem si finete'
        });
      } finally {
        setLoading(false);
        setHeroLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="agro-page">
      <Header />
      
      {/* Hero Section */}
      <section className="agro-hero" style={{backgroundImage: `url('/images/source/backgroundagro.webp')`}}>
        <div className="agro-hero-overlay">
          <div className="agro-hero-content">
            <h1 className="agro-title">
              {heroLoading ? 'AGRO' : (agroHeroContent?.title || 'AGRO')}
            </h1>
            <p className="agro-subtitle">
              {heroLoading ? 'Unde e nevoie de forta, aducem si finete' : (agroHeroContent?.subtitleText || 'Unde e nevoie de forta, aducem si finete')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="agro-services-section">
        <div className="agro-services-container">
          <div className="agro-services-header">
            <h2 className="agro-services-title">Servicii complete pentru agricultura modernă - descopera Holleman Agro</h2>
          </div>
          
          <div className="agro-services-grid">
            <div className="agro-service-item">
              <div className="agro-service-icon">
                <img src="/images/icons/agro.webp" alt="Agricultural production icon" />
              </div>
              <h3>Producție cereale</h3>
              <div className="agro-service-overlay">
                <div className="agro-service-icon-white">
                  <img src="/images/icons/agro.webp" alt="Agricultural production icon" />
                </div>
                <p>Dezvoltăm și implementăm soluții complete pentru producția de cereale, de la pregătirea solului și semănat, până la recoltă și post-recoltă. Utilizăm tehnologii moderne și varietăți performante pentru a maximiza randamentul și calitatea producției.</p>
              </div>
            </div>
            
            <div className="agro-service-item">
              <div className="agro-service-icon">
                <img src="/images/icons/iconlogistice.webp" alt="Grain logistics icon" />
              </div>
              <h3>Recepție și depozitare cereale</h3>
              <div className="agro-service-overlay">
                <div className="agro-service-icon-white">
                  <img src="/images/icons/iconlogistice.webp" alt="Grain logistics icon" />
                </div>
                <p>Oferim servicii de recepție rapidă și corectă a cerealelor, cu infrastructură dedicată: silozuri moderne, echipamente de preluare automatizate, sistem de uscare și curățare. Capacitățile noastre de stocare sunt dotate cu monitorizare digitală a condițiilor de păstrare.</p>
              </div>
            </div>
            
            <div className="agro-service-item">
              <div className="agro-service-icon">
                <img src="/images/icons/Info.webp" alt="Processing icon" />
              </div>
              <h3>Transport cereale</h3>
              <div className="agro-service-overlay">
                <div className="agro-service-icon-white">
                  <img src="/images/icons/Info.webp" alt="Processing icon" />
                </div>
                <p>Asigurăm transportul cerealelor în condiții optime, cu mijloace proprii sau partenere, respectând toate standardele de siguranță și igienă. Operăm atât pe plan intern, cât și internațional, cu capacitate adaptată oricărei cantități.</p>
              </div>
            </div>
            
            <div className="agro-service-item">
              <div className="agro-service-icon">
                <img src="/images/icons/iconlogistice.webp" alt="Fodder factory icon" />
              </div>
              <h3>Fabrică de furaje</h3>
              <div className="agro-service-overlay">
                <div className="agro-service-icon-white">
                  <img src="/images/icons/iconlogistice.webp" alt="Fodder factory icon" />
                </div>
                <p>Procesăm și producem furaje de înaltă calitate pentru animale, folosind tehnologii avansate de amestecare și granulare. Furajele noastre sunt formulate pe bază de cereale proprii și suplimente nutritive, asigurând o alimentație optimă pentru creșterea animalelor.</p>
              </div>
            </div>
            
            <div className="agro-service-item">
              <div className="agro-service-icon">
                <img src="/images/icons/agro.webp" alt="Seed processing icon" />
              </div>
              <h3>Stație de selectare și tărtărare semințe</h3>
              <div className="agro-service-overlay">
                <div className="agro-service-icon-white">
                  <img src="/images/icons/agro.webp" alt="Seed processing icon" />
                </div>
                <p>Oferim servicii profesionale de prelucrare a semințelor: curățare, sortare, tratare și ambalare. Utilizăm echipamente moderne pentru a asigura calitatea și germinabilitatea semințelor, respectând standardele internaționale de calitate.</p>
              </div>
            </div>
            
            <div className="agro-service-item">
              <div className="agro-service-icon">
                <img src="/images/icons/iconlogistice.webp" alt="Grain acquisition icon" />
              </div>
              <h3>Achiziții cereale</h3>
              <div className="agro-service-overlay">
                <div className="agro-service-icon-white">
                  <img src="/images/icons/iconlogistice.webp" alt="Grain acquisition icon" />
                </div>
                <p>Realizăm achiziții directe de cereale de la producători, oferind prețuri competitive și condiții de plată avantajoase. Colaborăm cu fermieri și cooperative din toată țara, asigurând un lanț de aprovizionare stabil și de încredere.</p>
              </div>
            </div>
            
            <div className="agro-service-item">
              <div className="agro-service-icon">
                <img src="/images/icons/Info.webp" alt="Agricultural consulting icon" />
              </div>
              <h3>Consultanță agricolă</h3>
              <div className="agro-service-overlay">
                <div className="agro-service-icon-white">
                  <img src="/images/icons/Info.webp" alt="Agricultural consulting icon" />
                </div>
                <p>Oferim consultanță specializată în domeniul agricol, de la planificarea culturilor și managementul fermei, până la optimizarea proceselor de producție. Echipa noastră de experți oferă soluții personalizate pentru a maximiza eficiența și profitabilitatea activității agricole.</p>
              </div>
            </div>
          </div>
          
          <div className="agro-services-footer">
            <button className="btn" onClick={() => navigate('/contact')}>
              <span>CONTACT</span>
            </button>
          </div>
        </div>
      </section>

      {/* Agro Content Section */}
      <section className="agro-content-section">
        <div className="agro-content-container">
          {loading ? (
            <div>Loading...</div>
          ) : agroContentSection && (
            <>
              <div className="agro-content-header">
                <h2 className="agro-content-title">
                  {agroContentSection.title} <span className="agro-highlight">{agroContentSection.highlightedText}</span>
                </h2>
              </div>
              
              <div className="agro-content-text">
                {agroContentSection.bulletPoints && agroContentSection.bulletPoints.split('\n').filter((point: string) => point.trim()).map((point: string, index: number) => (
                  <div key={index} className="agro-content-point">
                    <div className="agro-bullet"></div>
                    <p>{point.trim()}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="agro-cta-section" style={{backgroundImage: `url('/images/Group8745.webp')`}}>
        <div className="agro-cta-container">
          <div className="agro-cta-content">
            {loading ? (
              <div>Loading...</div>
            ) : agroCtaSection && (
              <>
                <h2 className="agro-cta-title">
                  <span className="agro-highlight">{agroCtaSection.highlightedText}</span> {agroCtaSection.title}
                </h2>
                <button className="btn cta-btn" onClick={() => navigate('/contact')}>
                  <span>Contacteaza-ne pentru o oferta personalizata</span>
                  <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
                </button>
              </>
            )}
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
