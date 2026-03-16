import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Fleet.css';

interface FleetCard {
  id: number;
  image: string;
  description: string;
}

const fleetCards: FleetCard[] = [
  {
    id: 1,
    image: '/images/flota/1.webp',
    description: 'Platformă extensibilă (telemega). Trailer versatil, poate transporta încărcături de până la 2300 cm lungime sau utilaje autopropulsate de până la 365 cm înălțime (nu neapărat cea mai economică soluție).',
  },
  {
    id: 2,
    image: '/images/flota/2.webp',
    description: 'Semitrailer de 90 cm cu alveole, extensibil pe lungime. Potrivit pentru tractoare, încărcătoare mici și alte echipamente similare.',
  },
];

const Fleet: React.FC = () => {

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
          backgroundImage: `url('/images/Group8802.webp')`
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
            Holleman pune la dispoziție o flotă specializată și echipamente dedicate transporturilor grele și agabaritice, configurate pentru cerințe logistice variate, de la transporturi speciale rutiere până la proiecte complexe de tip project cargo. Flota este susținută de investiții continue în echipamente și de capabilități proprii de service și mentenanță, un avantaj important pentru disponibilitate operațională, siguranță și continuitatea proiectelor.
În această secțiune sunt prezentate echipamentele disponibile și specificațiile tehnice relevante, pentru a oferi o imagine clară asupra resurselor tehnice utilizate de Holleman în proiecte speciale, în România și la nivel european.
Fiecare vehicul este conceput pentru a răspunde provocărilor specifice ale industriei de transport agabaritic.
            </p>
          </div>

          <div className="fleet-body">
            {/* Filter Sidebar */}
            <aside className="fleet-sidebar">
              <div className="fleet-filter-box">
                <h3 className="fleet-filter-title">Filtrează după axe</h3>
                <ul className="fleet-filter-list">
                  {['3 Axe', '4 Axe', '5 Axe', '6 Axe', '7 Axe', '8 Axe', '9 Axe', '10 Axe', '10+ Axe'].map((label) => (
                    <li key={label} className="fleet-filter-item">
                      <label className="fleet-filter-label">
                        <input type="checkbox" className="fleet-filter-checkbox" />
                        <span>{label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fleet-filter-box">
                <h3 className="fleet-filter-title">Tip echipament</h3>
                <ul className="fleet-filter-list">
                  {['LowBed', 'Eoliene'].map((label) => (
                    <li key={label} className="fleet-filter-item">
                      <label className="fleet-filter-label">
                        <input type="checkbox" className="fleet-filter-checkbox" />
                        <span>{label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Cards */}
            <div className="fleet-grid">
              {fleetCards.map((card) => (
                <div key={card.id} className="fleet-card">
                  <div className="fleet-card-top">
                    <div className="fleet-card-image-wrap">
                      <img
                        src={card.image}
                        alt={`Echipament transport ${card.id}`}
                        className="fleet-card-image"
                      />
                    </div>
                    <div className="fleet-card-actions">
                      <button className="fleet-btn">Detalii Tehnice</button>
                      <button className="fleet-btn">Detalii Foto</button>
                    </div>
                  </div>
                  <div className="fleet-card-footer">
                    <p className="fleet-card-description">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;
