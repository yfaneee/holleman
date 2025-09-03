import React, { useRef, useEffect } from 'react';
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
            Descopera povestea, valorile si oamenii din spatele succesului Holleman
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
      <section className="cine-suntem-section" id="prezentare-grup-holleman" ref={cineSuntemRef}>
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

      {/* Istoric și evoluție Section */}
      <section 
        className="istoric-section" 
        ref={istoricRef}
        style={{
          backgroundImage: `url('/images/Group8741.webp')`
        }}
      >
        <div className="istoric-overlay"></div>
        <div className="istoric-container">
          <div className="istoric-content">
            <h2 className="istoric-title">Istoric și evoluție</h2>
            <div className="istoric-text">
              <div className="istoric-paragraph">
                <div className="istoric-bullet"></div>
                <p>
                  Povestea <strong>Holleman</strong> începe în anii 2000, cu o viziune clară: 
                  dezvoltarea unei companii românești capabile să livreze soluții logistice 
                  personalizate, acolo unde alții spun că nu se poate. De la 
                  primele transporturi naționale până la proiecte internaționale 
                  de anvergură, am investit constant în flotă, echipamente și 
                  oameni.
                </p>
              </div>
              
              <div className="istoric-paragraph">
                <div className="istoric-bullet"></div>
                <p>
                  Astăzi, Grupul Holleman are sucursale și parteneri în România, 
                  Bulgaria, Serbia, Ungaria, Ucraina și Republica Moldova, 
                  asigurând o acoperire extinsă și capacitate operațională la 
                  nivel regional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misiunea și viziunea noastră Section */}
      <section className="misiune-section" ref={misiuneRef}>
        <div className="misiune-container">
          <div className="misiune-content">
            <h2 className="misiune-title">Misiunea și viziunea noastră</h2>
            
            <div className="misiune-text">
              <p className="misiune-paragraph">
                Misiunea noastră este să oferim soluții logistice inteligente, eficiente și 
                sigure, adaptate celor mai complexe nevoi de transport. Ne ghidăm 
                după principiile profesionalismului, transparenței și excelenței în 
                execuție.
              </p>
              
              <p className="misiune-paragraph">
                Ne dorim să rămânem prima opțiune pentru transporturi speciale și 
                proiecte industriale complexe în Europa de Est, consolidându-ne 
                poziția prin inovație, responsabilitate și parteneriate durabile.
              </p>
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
          Greul e ușor când ai echipa potrivită.
        </p>
      </section>

      {/* Certificări și conformitate Section */}
      <section 
        className="certificari-section" 
        ref={certificariRef}
        style={{
          backgroundImage: `url('/images/Group8742.webp')`
        }}
      >
        <div className="certificari-overlay"></div>
        <div className="certificari-container">
          <div className="certificari-content">
            <h2 className="certificari-title">Certificări și conformitate</h2>
            
            <div className="certificari-text">
              <p className="certificari-intro">
                Activitatea Holleman este certificată la cele mai înalte standarde 
                internaționale, asigurând calitate și conformitate în toate operațiunile:
              </p>
              
              <ul className="certificari-list">
                <li>ISO 9001 – Sistem de management al calității</li>
                <li>ISO 14001 – Management de mediu</li>
                <li>ISO 45001 – Sănătate și securitate ocupațională</li>
                <li>Autorizări specifice pentru transporturi agabaritice, echipamente speciale și securitate în logistică</li>
              </ul>
            </div>
          </div>
        </div>
        
      </section>

      {/* Conducerea Grupului Holleman Section */}
      <section className="conducerea-section" id="conducerea-grupului" ref={conducereaRef}>
      <div className="conducerea-accent">
              <div className="green-triangle-top"></div>
            </div>
        <div className="conducerea-container">
          <div className="conducerea-header">
            <h2 className="conducerea-title">Conducerea Grupului Holleman</h2>
          </div>
          
          <div className="conducerea-content">
            <div className="management-info">
              <h3 className="management-subtitle">Echipa de Management</h3>
              <p className="management-description">
                La Holleman, succesul fiecărui proiect începe cu o echipă de conducere puternică. 
                Profesioniști cu experiență vastă în transporturi speciale, logistică, management 
                operațional și dezvoltare strategică, membrii echipei de management ghidează 
                activitatea Grupului cu responsabilitate, viziune și angajament.
              </p>
              <p className="management-description">
                Prin decizii ferme, leadership adaptabil și orientare spre performanță, echipa de 
                conducere asigură stabilitatea, dezvoltarea continuă și consolidarea poziției Holleman 
                ca lider în Europa de Est.
              </p>
            </div>
            
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">
                  <div className="avatar-placeholder"></div>
                </div>
                <h4 className="member-name">Lorem Ipsum</h4>
                <p className="member-position">- Position -</p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">
                  <div className="avatar-placeholder"></div>
                </div>
                <h4 className="member-name">Lorem Ipsum</h4>
                <p className="member-position">- Position -</p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">
                  <div className="avatar-placeholder"></div>
                </div>
                <h4 className="member-name">Lorem Ipsum</h4>
                <p className="member-position">- Position -</p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">
                  <div className="avatar-placeholder"></div>
                </div>
                <h4 className="member-name">Lorem Ipsum</h4>
                <p className="member-position">- Position -</p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">
                  <div className="avatar-placeholder"></div>
                </div>
                <h4 className="member-name">Lorem Ipsum</h4>
                <p className="member-position">- Position -</p>
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
            <h2 className="leadership-title">Ce ne definește ca echipă de leadership</h2>
            
            <div className="leadership-points">
              <div className="leadership-point">
                <div className="point-bullet"></div>
                <p>
                  <strong>Experiență multisectorială:</strong> Fiecare membru aduce 
                  expertiză din industrii cheie precum transporturi, 
                  infrastructură, energie sau consultanță strategică.
                </p>
              </div>
              
              <div className="leadership-point">
                <div className="point-bullet"></div>
                <p>
                  <strong>Viziune comună:</strong> Creșterea sustenabilă și extinderea 
                  internațională sunt obiective asumate la nivel de grup.
                </p>
              </div>
              
              <div className="leadership-point">
                <div className="point-bullet"></div>
                <p>
                  <strong>Decizie orientată spre client:</strong> În centrul fiecărei inițiative se 
                  află nevoile clienților noștri și livrarea de soluții fiabile.
                </p>
              </div>
              
              <div className="leadership-point">
                <div className="point-bullet"></div>
                <p>
                  <strong>Cultură organizațională solidă:</strong> Promovăm colaborarea, 
                  comunicarea deschisă și responsabilitatea la toate 
                  nivelurile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsabilitate Socială Corporativă Section */}
      <section className="responsabilitate-section" id="responsabilitate-sociala-corporativa" ref={responsabilitateRef}>
        <div className="responsabilitate-container">
          <h2 className="responsabilitate-title">Responsabilitate Socială Corporativă</h2>
          
          <div className="responsabilitate-content">
            <p className="responsabilitate-intro">
              La Holleman, responsabilitatea nu se oprește la livrarea proiectelor. Ne 
              assumăm un rol activ în dezvoltarea comunităților din care facem parte și 
              contribuim la un viitor sustenabil, prin acțiuni concrete în domenii 
              esențiale: educație, protecția mediului, siguranță rutieră și sprijin pentru 
              cauze sociale
            </p>
            
            <p className="responsabilitate-subtitle">Inițiativele noastre CSR includ:</p>
            
            <div className="csr-initiatives">
              <div className="csr-initiative">
                <h3 className="initiative-title">Sprijin pentru educație și formare profesională</h3>
                <p className="initiative-description">
                  Susținem tinerii prin parteneriate cu licee tehnice, programe de internship 
                  și dotarea unităților de învățământ din zonele în care activăm.
                </p>
              </div>
              
              <div className="csr-initiative">
                <h3 className="initiative-title">Investiții în siguranță și infrastructură locală</h3>
                <p className="initiative-description">
                  Participăm activ la campaniile de conștientizare privind siguranța rutieră și 
                  contribuim la îmbunătățirea infrastructurii din comunitățile locale.
                </p>
              </div>
              
              <div className="csr-initiative">
                <h3 className="initiative-title">Acțiuni pentru protejarea mediului</h3>
                <p className="initiative-description">
                  Ne implicăm în proiecte de reîmpădurire, colectare selectivă și optimizare 
                  a consumului de resurse în operațiunile noastre zilnice.
                </p>
              </div>
              
              <div className="csr-initiative">
                <h3 className="initiative-title">Susținerea cauzelor umanitare și a ONG-urilor</h3>
                <p className="initiative-description">
                  Oferim suport logistic și financiar în situații de criză sau pentru 
                  organizații care luptă pentru integrarea socială, sănătate și protecția 
                  persoanelor vulnerabile.
                </p>
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
