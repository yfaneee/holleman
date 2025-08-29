import React, { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './DespreNoi.css';

const DespreNoi: React.FC = () => {
  const cineSuntemRef = useRef<HTMLDivElement>(null);
  
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
    switch (boxId) {
      case 'cine-suntem':
        cineSuntemRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      // TODO: Add navigation for other sections
      default:
        console.log(`Navigate to: ${boxId}`);
    }
  };

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
          <h1 className="hero-title">Despre noi</h1>
          <p className="hero-subtitle">
            Descoperă povestea, valorile și oamenii din spatele succesului Holleman
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
      <section className="cine-suntem-section" ref={cineSuntemRef}>
        <div className="cine-suntem-container">
          <h2 className="cine-suntem-title">Cine suntem - Valorile care ne definesc</h2>
          
          <div className="cine-suntem-content">
            <p className="cine-suntem-description">
              Grupul Holleman este un lider regional în transportul agabaritic, project cargo și soluții logistice integrate în Europa Centrală și de Est. Cu două decenii de expertiză, suntem un partener de încredere pentru industriile strategice precum energia, construcțiile, infrastructura, agricultura și apărarea.
            </p>
            
            <div className="cine-suntem-values">
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>Fiabilitate</strong> - Ne ținem promisiunile și livrăm la timp, indiferent de provocări.
                </div>
              </div>
              
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>Expertiză</strong> - Cunoștințele tehnice și experiența echipei noastre sunt garanția reușitei fiecărui proiect.
                </div>
              </div>
              
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>Adaptabilitate</strong> - Gândim flexibil și oferim soluții personalizate, pentru fiecare tip de transport.
                </div>
              </div>
              
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>Siguranță</strong> - Operăm în cele mai stricte condiții de securitate, respectând toate normele în vigoare.
                </div>
              </div>
              
              <div className="value-item">
                <div className="value-bullet"></div>
                <div className="value-content">
                  <strong>Sustenabilitate</strong> - Ne preocupă impactul activității noastre și investim în soluții logistice responsabile.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cine-suntem-footer">
          <p className="cine-suntem-footer-text">
            Am învățat că fiecare șurub, fiecare centimetru și fiecare tonă contează. Și le respectăm pe toate.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DespreNoi;
