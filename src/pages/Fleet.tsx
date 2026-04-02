import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Fleet.css';
import ScrollArrow from '../components/ScrollArrow';

interface FleetCard {
  id: string;
  image: string;
  axe: string;
  tip: string;
  pdf?: string;
  photos?: string[];
}

const fleetCards: FleetCard[] = [
  { id: 'a1',  image: '/images/flota/a1.jpg',  axe: '3 Axe',   tip: 'Semiremorci',          pdf: '/flota/a1.pdf'  },
  { id: 'a2',  image: '/images/flota/a2.jpg',  axe: '4 Axe',   tip: 'Semiremorci',          pdf: '/flota/a2.pdf',  photos: ['/images/picflota/A2L3.jpg','/images/picflota/IMG_4278.JPG'] },
  { id: 'a3',  image: '/images/flota/a3.jpg',  axe: '3 Axe',   tip: 'Semiremorci',          photos: ['/images/picflota/DSC_0573.jpg']           },
  { id: 'a4',  image: '/images/flota/a4.jpg',  axe: '3 Axe',   tip: 'Semiremorci',          pdf: '/flota/a4.pdf'  },
  { id: 'a5',  image: '/images/flota/a5.jpg',  axe: '3 Axe',   tip: 'Semiremorci',          pdf: '/flota/a5.pdf'  },
  { id: 'a6',  image: '/images/flota/a6.jpg',  axe: '4 Axe',   tip: 'Semiremorci',          pdf: '/flota/a6.pdf'  },
  { id: 'a7',  image: '/images/flota/a7.jpg',  axe: '4 Axe',   tip: 'Semiremorci',          pdf: '/flota/a7.pdf'  },
  { id: 'a8',  image: '/images/flota/a8.jpg',  axe: '2 Axe',   tip: 'LowBed/Vessel Bridge', pdf: '/flota/a8.pdf',  photos: ['/images/picflota/A2L1.jpg','/images/picflota/A2L5.jpg','/images/picflota/a8.jpg']  },
  { id: 'a9',  image: '/images/flota/a9.jpg',  axe: '3 Axe',   tip: 'LowBed/Vessel Bridge', pdf: '/flota/a9.pdf',  photos: ['/images/picflota/a9.jpg','/images/picflota/a91.jpg']  },
  { id: 'a10', image: '/images/flota/a10.jpg', axe: '4 Axe',   tip: 'LowBed/Vessel Bridge', pdf: '/flota/a10.pdf' },
  { id: 'a11', image: '/images/flota/a11.jpg', axe: '6 Axe',   tip: 'LowBed/Vessel Bridge', pdf: '/flota/a11.pdf' },
  { id: 'a12', image: '/images/flota/a12.jpg', axe: '6 Axe',   tip: 'LowBed/Vessel Bridge', pdf: '/flota/a12.pdf' },
  { id: 'a13', image: '/images/flota/a13.jpg', axe: '8 Axe',   tip: 'LowBed/Vessel Bridge', pdf: '/flota/a13.pdf',  photos: ['/images/picflota/a13.jpg','/images/picflota/a131.jpg','/images/picflota/a132.jpg','/images/picflota/a133.jpg','/images/picflota/a134.jpg','/images/picflota/a135.jpg',] },
  { id: 'a14', image: '/images/flota/a14.jpg', axe: '10+ Axe', tip: 'LowBed/Vessel Bridge', pdf: '/flota/a14.pdf' },
  { id: 'a15', image: '/images/flota/a15.jpg', axe: '4 Axe',   tip: 'Semiremorci', photos: ['/images/picflota/a15.jpg','/images/picflota/a151.jpg','/images/picflota/a152.jpg','/images/picflota/a153.jpg','/images/picflota/a154.jpg','/images/picflota/a155.jpg','/images/picflota/a156.jpg','/images/picflota/a157.jpg','/images/picflota/a158.jpg','/images/picflota/a159.jpg']           },
  { id: 'a18', image: '/images/flota/a18.jpg', axe: '10+ Axe', tip: 'Semiremorci / 10+ Axe Modulare', pdf: '/flota/a16.pdf', photos: ['/images/picflota/a16.jpg','/images/picflota/a161.jpg','/images/picflota/a162.jpg','/images/picflota/a163.jpg'] },
  { id: 'a19', image: '/images/flota/a19.jpg', axe: '10+ Axe', tip: 'Semiremorci / 10+ Axe Modulare', pdf: '/flota/a17.pdf', photos: ['/images/picflota/a17.jpg'] },
  { id: 'a20', image: '/images/flota/a20.jpg', axe: '5 Axe',   tip: 'Semiremorci',          pdf: '/flota/a18.pdf' },
  { id: 'a21', image: '/images/flota/a21.jpg', axe: '6 Axe',   tip: 'Semiremorci',          pdf: '/flota/a19.pdf' },
  { id: 'a22', image: '/images/flota/a22.jpg', axe: '7 Axe',   tip: 'Semiremorci',          pdf: '/flota/a20.pdf' },
  { id: 'a23', image: '/images/flota/a23.jpg', axe: '8 Axe',   tip: 'Semiremorci',          pdf: '/flota/a21.pdf', photos: ['/images/picflota/a21.jpg'] },
  { id: 'a24', image: '/images/flota/a24.jpg', axe: '5 Axe',   tip: 'Semiremorci',          pdf: '/flota/a22.pdf' },
  { id: 'a25', image: '/images/flota/a25.jpg', axe: '6 Axe',   tip: 'Semiremorci',          pdf: '/flota/a23.pdf' },
  { id: 'a26', image: '/images/flota/a26.jpg', axe: '7 Axe',   tip: 'Semiremorci',          pdf: '/flota/a24.pdf' },
  { id: 'a27', image: '/images/flota/a27.jpg', axe: '8 Axe',   tip: 'Semiremorci',          pdf: '/flota/a25.pdf' },
  { id: 'a28', image: '/images/flota/a28.jpg', axe: '10+ Axe', tip: 'Semiremorci',          pdf: '/flota/a26.pdf', photos: ['/images/picflota/a26.JPG'] },
  { id: 'a29', image: '/images/flota/a29.jpg', axe: '8 Axe',   tip: 'Eoliene',               pdf: '/flota/a27.pdf', photos: ['/images/picflota/a27.jpg','/images/picflota/a271.jpg','/images/picflota/a272.jpg'] },
  { id: 'a30', image: '/images/flota/a30.jpg', axe: '10+ Axe', tip: 'Eoliene',               photos: ['/images/picflota/a28.jpg','/images/picflota/a281.jpg'] },
  { id: 'a31', image: '/images/flota/a31.jpg', axe: '10+ Axe', tip: '10+ Axe Modulare', pdf: '/flota/a31.pdf', photos: ['/images/picflota/a31.jpg'] },
];

const Fleet: React.FC = () => {
  const [selectedAxe, setSelectedAxe] = useState<string[]>([]);
  const [selectedTip, setSelectedTip] = useState<string[]>([]);
  const [photoModal, setPhotoModal] = useState<{ photos: string[]; index: number } | null>(null);

  const openPhotoModal = (photos: string[]) => setPhotoModal({ photos, index: 0 });
  const closePhotoModal = () => setPhotoModal(null);
  const prevPhoto = () => setPhotoModal(m => m ? { ...m, index: (m.index - 1 + m.photos.length) % m.photos.length } : m);
  const nextPhoto = () => setPhotoModal(m => m ? { ...m, index: (m.index + 1) % m.photos.length } : m);

  useEffect(() => {
    if (!photoModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePhotoModal();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [photoModal]);

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
    const cardTips = card.tip.split(' / ');
    const tipMatch = selectedTip.length === 0 || selectedTip.some(t => cardTips.includes(t));
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
        <ScrollArrow />
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
                      <span className="fleet-card-number">{fleetCards.indexOf(card) + 1}</span>
                      <div className="fleet-card-image-wrap">
                        <img
                          src={card.image}
                          alt={`Echipament transport ${card.id}`}
                          className="fleet-card-image"
                        />
                      </div>
                      <div className="fleet-card-actions">
                        {card.pdf && (
                          <a
                            className="fleet-btn"
                            href={card.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Detalii Tehnice
                          </a>
                        )}
                        {card.photos && card.photos.length > 0 ? (
                          <button className="fleet-btn" onClick={() => openPhotoModal(card.photos!)}>
                            Detalii Foto
                          </button>
                        ) : (
                          <button className="fleet-btn fleet-btn--disabled" disabled>
                            Detalii Foto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>

      {photoModal && (
        <div className="photo-modal-overlay" onClick={closePhotoModal}>
          <div className="photo-modal" onClick={e => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={closePhotoModal} aria-label="Închide">&#x2715;</button>
            <img
              src={photoModal.photos[photoModal.index]}
              alt={`Foto ${photoModal.index + 1}`}
              className="photo-modal-img"
            />
            {photoModal.photos.length > 1 && (
              <>
                <button className="photo-modal-nav photo-modal-nav--prev" onClick={prevPhoto} aria-label="Anterior">&#8249;</button>
                <button className="photo-modal-nav photo-modal-nav--next" onClick={nextPhoto} aria-label="Următor">&#8250;</button>
                <div className="photo-modal-counter">{photoModal.index + 1} / {photoModal.photos.length}</div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Fleet;
