import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Fleet.css';

interface FleetCard {
  id: string;
  image: string;
  axe: string;
  tip: string;
}

const fleetCards: FleetCard[] = [
  { id: 'a1',  image: '/images/flota/a1.jpg',  axe: '3 Axe',   tip: 'Semiremorci' },
  { id: 'a2',  image: '/images/flota/a2.jpg',  axe: '4 Axe',   tip: 'Semiremorci' },
  { id: 'a3',  image: '/images/flota/a3.jpg',  axe: '3 Axe',   tip: 'Semiremorci' },
  { id: 'a4',  image: '/images/flota/a4.jpg',  axe: '3 Axe',   tip: 'Semiremorci' },
  { id: 'a5',  image: '/images/flota/a5.jpg',  axe: '3 Axe',   tip: 'Semiremorci' },
  { id: 'a6',  image: '/images/flota/a6.jpg',  axe: '4 Axe',   tip: 'Semiremorci' },
  { id: 'a7',  image: '/images/flota/a7.jpg',  axe: '4 Axe',   tip: 'Semiremorci' },
  { id: 'a8',  image: '/images/flota/a8.jpg',  axe: '2 Axe',   tip: 'LowBed/Vessel Bridge' },
  { id: 'a9',  image: '/images/flota/a9.jpg',  axe: '3 Axe',   tip: 'LowBed/Vessel Bridge' },
  { id: 'a10', image: '/images/flota/a10.jpg', axe: '4 Axe',   tip: 'LowBed/Vessel Bridge' },
  { id: 'a11', image: '/images/flota/a11.jpg', axe: '6 Axe',   tip: 'LowBed/Vessel Bridge' },
  { id: 'a12', image: '/images/flota/a12.jpg', axe: '6 Axe',   tip: 'LowBed/Vessel Bridge' },
  { id: 'a13', image: '/images/flota/a13.jpg', axe: '8 Axe',   tip: 'LowBed/Vessel Bridge' },
  { id: 'a14', image: '/images/flota/a14.jpg', axe: '10+ Axe', tip: 'LowBed/Vessel Bridge' },
  { id: 'a15', image: '/images/flota/a15.jpg', axe: '4 Axe',   tip: 'Semiremorci' },
  { id: 'a18', image: '/images/flota/a18.jpg', axe: '10+ Axe', tip: 'Semiremorci' },
  { id: 'a19', image: '/images/flota/a19.jpg', axe: '10+ Axe', tip: 'Semiremorci' },
  { id: 'a20', image: '/images/flota/a20.jpg', axe: '5 Axe',   tip: 'Semiremorci' },
  { id: 'a21', image: '/images/flota/a21.jpg', axe: '6 Axe',   tip: 'Semiremorci' },
  { id: 'a22', image: '/images/flota/a22.jpg', axe: '7 Axe',   tip: 'Semiremorci' },
  { id: 'a23', image: '/images/flota/a23.jpg', axe: '8 Axe',   tip: 'Semiremorci' },
  { id: 'a24', image: '/images/flota/a24.jpg', axe: '5 Axe',   tip: 'Semiremorci' },
  { id: 'a25', image: '/images/flota/a25.jpg', axe: '6 Axe',   tip: 'Semiremorci' },
  { id: 'a26', image: '/images/flota/a26.jpg', axe: '7 Axe',   tip: 'Semiremorci' },
  { id: 'a27', image: '/images/flota/a27.jpg', axe: '8 Axe',   tip: 'Semiremorci' },
  { id: 'a28', image: '/images/flota/a28.jpg', axe: '10+ Axe', tip: 'Semiremorci' },
  { id: 'a29', image: '/images/flota/a29.jpg', axe: '8 Axe',   tip: 'Eoliene' },
  { id: 'a30', image: '/images/flota/a30.jpg', axe: '10+ Axe', tip: 'Eoliene' },
];

const Fleet: React.FC = () => {
  const [selectedAxe, setSelectedAxe] = useState<string[]>([]);
  const [selectedTip, setSelectedTip] = useState<string[]>([]);

  const toggleAxe = (label: string) => {
    setSelectedAxe(prev =>
      prev.includes(label) ? prev.filter(a => a !== label) : [...prev, label]
    );
  };

  const toggleTip = (label: string) => {
    setSelectedTip(prev =>
      prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
    );
  };

  const filteredCards = fleetCards.filter(card => {
    const axeMatch = selectedAxe.length === 0 || selectedAxe.includes(card.axe);
    const tipMatch = selectedTip.length === 0 || selectedTip.includes(card.tip);
    return axeMatch && tipMatch;
  });

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
                <h3 className="fleet-filter-title">Filtrează după Nr. Axe Trailer</h3>
                <ul className="fleet-filter-list">
                  {['2 Axe','3 Axe', '4 Axe', '5 Axe', '6 Axe', '7 Axe', '8 Axe', '9 Axe', '10 Axe', '10+ Axe'].map((label) => (
                    <li key={label} className="fleet-filter-item">
                      <label className="fleet-filter-label">
                        <input
                          type="checkbox"
                          className="fleet-filter-checkbox"
                          checked={selectedAxe.includes(label)}
                          onChange={() => toggleAxe(label)}
                        />
                        <span>{label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fleet-filter-box">
                <h3 className="fleet-filter-title">Tip echipament</h3>
                <ul className="fleet-filter-list">
                  {['Semiremorci', 'LowBed/Vessel Bridge', 'Eoliene', '10+ Axe Modulare'].map((label) => (
                    <li key={label} className="fleet-filter-item">
                      <label className="fleet-filter-label">
                        <input
                          type="checkbox"
                          className="fleet-filter-checkbox"
                          checked={selectedTip.includes(label)}
                          onChange={() => toggleTip(label)}
                        />
                        <span>{label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {(selectedAxe.length > 0 || selectedTip.length > 0) && (
                <button
                  className="fleet-filter-clear"
                  onClick={() => { setSelectedAxe([]); setSelectedTip([]); }}
                >
                  Resetează filtrele
                </button>
              )}
            </aside>

            {/* Cards */}
            <div className="fleet-grid">
              {filteredCards.length === 0 ? (
                <p className="fleet-no-results">Niciun echipament nu corespunde filtrelor selectate.</p>
              ) : (
                filteredCards.map((card) => (
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
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;
