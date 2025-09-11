import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRelatedProjects } from '../data/projectsData';
import './Fleet.css';

const Fleet: React.FC = () => {
  const navigate = useNavigate();
  const [currentRelatedProject, setCurrentRelatedProject] = useState(0);
  
  // Get Heavy Lift related projects (using a dummy project ID to get Heavy Lift projects)
  const relatedProjects = getRelatedProjects('heavy-lift-project-1', 'heavy-lift');

  // Related projects navigation
  const nextRelatedProject = useCallback(() => {
    if (relatedProjects.length > 3) {
      setCurrentRelatedProject((prev) => (prev + 1) % relatedProjects.length);
    }
  }, [relatedProjects.length]);

  const prevRelatedProject = useCallback(() => {
    if (relatedProjects.length > 3) {
      setCurrentRelatedProject((prev) => (prev - 1 + relatedProjects.length) % relatedProjects.length);
    }
  }, [relatedProjects.length]);

  // Handle related project click
  const handleRelatedProjectClick = useCallback((projectId: string) => {
    navigate(`/proiecte/${projectId}`);
  }, [navigate]);

  // Auto-advance related projects slideshow
  useEffect(() => {
    if (relatedProjects.length > 1) {
      const interval = setInterval(() => {
        setCurrentRelatedProject((prev) => (prev + 1) % relatedProjects.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [relatedProjects.length]);

  // Fleet data with truck information
  const fleetData = [
    {
      id: 1,
      description: "Platformă extensibilă (telemega). Trailer versatil, poate transporta încărcături de până la 2300 cm lungime sau utilaje autopropulsate de până la 365 cm înălțime (nu neapărat cea mai economică soluție)."
    },
    {
      id: 2,
      description: "Semitrailer de 90 cm cu alveole, extensibil pe lungime. Potrivit pentru tractoare, încărcătoare mici și alte echipamente similare."
    },
    {
      id: 3,
      description: "Semitrailer cu înălțime de 80 cm și alveole. Foarte căutat deoarece permite transportul mărfurilor agabaritice, dar și protecția celor sensibile (de exemplu utilaje cu componente electronice)."
    },
    {
      id: 4,
      description: "Tren rutier. Util atunci când este nevoie de transportul a două mărfuri cu lungime totală peste 1350 cm. Legal și flexibil (poate fi folosit doar capul tractor dacă este necesar)."
    },
    {
      id: 5,
      description: "Semitrailer cu alveole de 80 cm. Potrivit pentru utilaje mai înalte, respectând limita de 445 cm înălțime; folosirea alveolelor oferă marjă suplimentară."
    },
    {
      id: 6,
      description: "Semitrailer cu alveole de 90 cm. Potrivit pentru utilaje mai grele, utilizând cap tractor cu trei axe."
    },
    {
      id: 7,
      description: "Lowbed cu două axe, pat drept extensibil. Recomandat pentru mărfuri lungi și înalte, dar nu foarte grele."
    },
    {
      id: 8,
      description: "Lowbed cu două axe, cu \"inimă\" centrală și grătare laterale. Ideal pentru utilaje autopropulsate sau pe roți, în special agricole."
    },
    {
      id: 9,
      description: "Lowbed cu trei axe. Potrivit pentru mărfuri înalte și mai grele decât cele de la punctul anterior."
    },
    {
      id: 11,
      description: "Lowbed cu pat drept extensibil pe lungime, pentru mărfuri grele, lungi și înalte."
    },
    {
      id: 12,
      description: "Semitrailer cu 5 axe. Potrivit pentru mărfuri generale cu greutate medie."
    },
    {
      id: 13,
      description: "Similar punctului 12, dar pentru greutăți mai mari."
    },
    {
      id: 14,
      description: "Semitrailere pentru mărfuri foarte grele și, eventual, lungi. Există și variante cu două axe suplimentare pentru capacitate extinsă."
    },
    {
      id: 15,
      description: "Axe modulare. Pot fi configurate în funcție de necesități, pentru transportul mărfurilor extrem de grele. Suspensia hidraulică permite reglaje speciale pentru stabilitate pe drumuri dificile."
    },
    {
      id: 16,
      description: "Axe modulare cu grindă/pat. Pentru mărfuri grele și înalte – versiune supradimensionată a modelului de la punctul 11."
    },
    {
      id: 17,
      description: "Trailer cu 10 axe. Potrivit pentru mărfuri grele și lungi."
    },
    {
      id: 18,
      description: "Similar punctului 11, dar destinat utilajelor mai grele, fără lungimi excepționale."
    },
    {
      id: 19,
      description: "Lowbed cu 8 axe. Pentru mărfuri foarte grele (18+)."
    },
    {
      id: 20,
      description: "Trailer pentru mărfuri extrem de lungi (pale de eoliene, grinzi de pod etc.)."
    },
    {
      id: 21,
      description: "Trailer pentru mărfuri extrem de lungi (pale de eoliene, grinzi de pod etc.)."
    },
    {
      id: 22,
      description: "Axe modulare în configurație specială pentru mărfuri deosebit de grele. Al doilea cap tractor (cu protap) sprijină prin împingere, în timp ce primul trage ansamblul."
    },
    {
      id: 23,
      description: "Mese rotative. Utilizate pentru mărfuri foarte lungi pe trasee sinuoase. Montate pe axe modulare, asigură și capacitate mare de încărcare."
    },
    {
      id: 24,
      description: "Girder bridge. Folosit pentru transformatoare de capacitate foarte mare (de exemplu, pentru alimentarea unui oraș). Avantaj: distribuie greutatea pe o lungime mare, protejând infrastructura rutieră."
    }
  ];

  // SEO: Set document title and meta description for fleet page
  useEffect(() => {
    document.title = "Flota Holleman Heavy Lift | Echipamente Transport Agabaritic";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Descoperă flota completă Holleman Heavy Lift - platforme extensibile, lowbed-uri, axe modulare și echipamente specializate pentru transport agabaritic și project cargo.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/fleet');
  }, []);

  return (
    <div className="fleet-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="fleet-hero"
        style={{
          backgroundImage: `url('/images/Group8730.webp')`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Flota Noastră</h1>
          <p className="hero-subtitle">
            Echipamente specializate pentru orice provocare în transportul agabaritic
          </p>
        </div>
      </section>

      {/* Fleet Content Section */}
      <section className="fleet-content">
        <div className="fleet-container">
          <div className="fleet-intro">
            <h2 className="fleet-intro-title">
              Echipamente pentru Transport Specializat
            </h2>
            <p className="fleet-intro-description">
              Flota noastră cuprinde o gamă variată de echipamente specializate, 
              de la platforme extensibile până la axe modulare pentru transportul 
              celor mai complexe și grele încărcături. Fiecare vehicul este 
              conceput pentru a răspunde provocărilor specifice ale industriei 
              de transport agabaritic.
            </p>
          </div>

          {/* Fleet Main Content - Side by Side */}
          <div className="fleet-main-content">
            {/* Fleet Images - Left Side */}
            <div className="fleet-images-section">
              <div className="fleet-image-container">
                <img 
                  src="/images/flotaechip.webp" 
                  alt="Flota Holleman Heavy Lift - Echipamente Transport Agabaritic"
                  className="fleet-main-image"
                />
              </div>
              <div className="fleet-image-container">
                <img 
                  src="/images/flotaechipm.webp" 
                  alt="Flota Holleman Heavy Lift - Echipamente Transport Agabaritic Mobile"
                  className="fleet-main-image"
                />
              </div>
            </div>

            {/* Fleet Details - Right Side */}
            <div className="fleet-details">
              <div className="fleet-items">
                {fleetData.map((item) => (
                  <div key={item.id} className="fleet-item">
                    <div className="fleet-item-number">
                      {item.id}
                    </div>
                    <div className="fleet-item-content">
                      <p className="fleet-item-description">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Related Projects Section */}
      <section 
        className="related-projects-section" 
        style={{
          backgroundColor: '#136B38',
          backgroundImage: `url('/images/projectslideshow.webp')`
        }}
      >
        <div className="related-projects-container">
          <h2 className="related-projects-title">Descopera proiecte Heavy Lift</h2>
          
          <div className="related-projects-slideshow">
            {relatedProjects.length > 0 && (
              <>
                <div className="related-project-cards">
                  {relatedProjects.length <= 3 ? 
                    // Show all projects if 3 or fewer
                    relatedProjects.map((relatedProject, index) => (
                      <div
                        key={relatedProject.id}
                        className="related-project-card visible"
                        onClick={() => handleRelatedProjectClick(relatedProject.id)}
                      >
                        <div className="related-project-image">
                          <img src={relatedProject.gallery.mainImage} alt={relatedProject.title} />
                        </div>
                        <div className="related-project-info">
                          <h3>{relatedProject.title}</h3>
                          <span className="related-project-division">{relatedProject.division.toUpperCase()}</span>
                        </div>
                      </div>
                    )) :
                    // Show 3 projects with sliding window
                    Array.from({ length: 3 }, (_, index) => {
                      const projectIndex = (currentRelatedProject + index) % relatedProjects.length;
                      const relatedProject = relatedProjects[projectIndex];
                      return (
                        <div
                          key={`${relatedProject.id}-${currentRelatedProject}-${index}`}
                          className="related-project-card visible"
                          onClick={() => handleRelatedProjectClick(relatedProject.id)}
                        >
                          <div className="related-project-image">
                            <img src={relatedProject.gallery.mainImage} alt={relatedProject.title} />
                          </div>
                          <div className="related-project-info">
                            <h3>{relatedProject.title}</h3>
                            <span className="related-project-division">{relatedProject.division.toUpperCase()}</span>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>

                {relatedProjects.length > 3 && (
                  <div className="related-projects-nav">
                    <button 
                      className="nav-button nav-prev" 
                      onClick={prevRelatedProject}
                      aria-label="Proiectul anterior"
                    >
                      ‹
                    </button>
                    <button 
                      className="nav-button nav-next" 
                      onClick={nextRelatedProject}
                      aria-label="Următorul proiect"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;
