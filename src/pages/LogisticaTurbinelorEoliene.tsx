import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoUpButton from '../components/GoUpButton';
import SEO from '../components/SEO';
import ScrollArrow from '../components/ScrollArrow';
import './LogisticaTurbinelorEoliene.css';

// ─── Image Gallery Slideshow ──────────────────────────────────────────────────
const GallerySlideshow: React.FC<{ images: { src: string; alt: string }[] }> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  return (
    <div className="lte-gallery">
      <div className="lte-gallery-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => (
          <div key={i} className="lte-gallery-slide">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button className="lte-gallery-btn lte-gallery-btn--prev" onClick={prev} aria-label="Anterior">&#8249;</button>
          <button className="lte-gallery-btn lte-gallery-btn--next" onClick={next} aria-label="Următor">&#8250;</button>
          <div className="lte-gallery-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`lte-gallery-dot${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Video Player with overlay play button ───────────────────────────────────
const VideoPlayer: React.FC<{ src: string; type?: string }> = ({ src, type = 'video/mp4' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handlePause = () => setPlaying(false);

  return (
    <div className="lte-video-wrapper">
      <video
        ref={videoRef}
        className="lte-video"
        onPause={handlePause}
        onEnded={handlePause}
        controls={playing}
        playsInline
      >
        <source src={src} type={type} />
      </video>
      {!playing && (
        <button className="lte-video-play" onClick={handlePlay} aria-label="Redă video">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="39" stroke="white" strokeWidth="2" />
            <polygon points="32,22 62,40 32,58" fill="white" />
          </svg>
        </button>
      )}
    </div>
  );
};

// ─── Gallery images for section 5 ────────────────────────────────────────────
const galleryImages = [
  { src: '/images/1774269375382.jpg',                             alt: 'Transport componente eoliene' },
  { src: '/images/pozalogistica.jpeg', alt: 'Logistică turbine eoliene' },
  { src: '/images/pozatransportpale.jpeg', alt: 'Transport pale eoliene' },
];

// ─── Page ────────────────────────────────────────────────────────────────────
const LogisticaTurbinelorEoliene: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Logistica Turbinelor Eoliene | Holleman Transport';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Soluții de transport internațional pentru pale, secțiuni de turn, nacele, hub-uri și componente conexe pentru energia eoliană. Holleman – logistică specializată turbine eoliene.');
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/logistica-turbinelor-eoliene');
  }, []);

  return (
    <div className="lte-page">
      <SEO
        title="Logistica Turbinelor Eoliene | Holleman Transport"
        description="Soluții de transport internațional pentru pale, secțiuni de turn, nacele, hub-uri și componente conexe pentru energia eoliană."
        canonicalUrl="https://holleman.ro/logistica-turbinelor-eoliene"
        ogImage="https://holleman.ro/images/Group8804.png"
        keywords="logistica turbine eoliene, transport pale eoliene, transport nacele, transport agabaritic energie eoliană, logistică wind energy"
      />
      <Header />

      {/* ── 1. HERO ── */}
      <section className="lte-hero" style={{ backgroundImage: "url('/images/Group8804.png')" }}>
        <div className="lte-hero-overlay">
          <div className="lte-hero-content">
            <h1 className="lte-hero-title">Logistica Turbinelor Eoliene</h1>
            <p className="lte-hero-subtitle">
              Soluții de transport internațional pentru pale, secțiuni de turn, nacele, hub-uri și componente conexe pentru energia eoliană.
            </p>
          </div>
        </div>
        <ScrollArrow />
      </section>

      {/* ── 2. INTRO ── */}
      <section className="lte-intro">
        <div className="lte-container lte-container--narrow">
          <p>
            Logistica turbinelor eoliene necesită mai mult decât o simplă capacitate de transport. Aceasta implică o analiză inteligentă a rutelor, planificare precisă, echipamente specializate și o execuție riguroasă în fiecare etapă a proiectului.
          </p>
          <p>
            La Holleman, susținem transportul internațional al componentelor eoliene de la fabrică sau din port până la amplasamentul proiectului. Echipa noastră coordonează mișcări complexe pentru mărfuri agabaritice și grele, ajutând clienții să mențină proiectele eoliene în graficul de construcție, respectând condițiile de acces la sit și cerințele transfrontaliere.
          </p>
        </div>
      </section>

      {/* ── 3. LOGISTICĂ INTERNAȚIONALĂ (dark bg) ── */}
      <section className="lte-international" style={{ backgroundImage: "url('/images/Group8742.webp')" }}>
        <div className="lte-dark-overlay">
          <div className="lte-container">
            <h2 className="lte-section-title lte-section-title--light">
              Logistică internațională pentru proiecte de energie eoliană
            </h2>
            <p className="lte-section-text lte-section-text--light">
              Proiectele eoliene depind de o secvențialitate fiabilă. O întârziere a unei singure componente poate afecta întregul program de instalare de pe șantier. De aceea, abordarea noastră se concentrează pe pregătirea detaliată, controlul operațional și o coordonare clară, de la prima etapă de planificare până la livrarea finală.
            </p>
            <p className="lte-section-text lte-section-text--light">
              Gestionăm transportul componentelor-cheie, inclusiv pale, secțiuni de turn, nacele, hub-uri și echipamente auxiliare. Fiecare tip de încărcătură necesită o configurație de transport diferită, o strategie de rută specifică și metode de manipulare dedicate. Rolul nostru este de a defini conceptul de transport corect în funcție de componentă, rută și calendarul proiectului.
            </p>
            <div className="lte-image-pair">
              <div className="lte-image-pair-item">
                <img src="/images/photo_2022-02-12_13-59-26.jpg" alt="Transport pale turbine eoliene" loading="lazy" />
              </div>
              <div className="lte-image-pair-item">
                <img src="/images/IMG_7832.JPG" alt="Transport componente eoliene port" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CE OFERIM (white, text left + video right) ── */}
      <section className="lte-services">
        <div className="lte-container">
          <div className="lte-split">
            <div className="lte-split-text">
              <h2 className="lte-section-title">Ce oferim</h2>
              <p className="lte-section-text">
                Sfera noastră de servicii logistice pentru turbine eoliene poate include: evaluarea rutelor, planificarea transportului, coordonarea autorizațiilor, transport rutier specializat, interfața cu porturile, programarea livrărilor la sit și execuția pe ultimul kilometru ("last-mile").
              </p>
              <p className="lte-section-text">
                Acolo unde este necesar, oferim suport pentru operațiunile de încărcare și descărcare, poziționarea mărfii și coordonarea cu factorii implicați în activitățile de construcție, ridicare sau instalare.
              </p>
            </div>
            <div className="lte-split-media">
              <VideoPlayer src="/images/videonume.mp4" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. EXPERTIZĂ (light gray, text + gallery) ── */}
      <section className="lte-expertise">
        <div className="lte-container">
          <h2 className="lte-section-title">Expertiză în mișcări de mărfuri complexe</h2>
          <p className="lte-section-text">
            Componentele eoliene generează provocări diferite în fiecare etapă a transportului.
          </p>
          <ul className="lte-list">
            <li>Palele necesită o analiză atentă a rutei, evaluarea razelor de virare și manipulare controlată pe drumuri înguste sau cu restricții.</li>
            <li>Secțiunile de turn cer configurații de transport stabile, metode de ancorare sigure și o planificare precisă a livrării.</li>
            <li>Nacelele, hub-urile și alte componente grele necesită inginerie de transport, verificări de fezabilitate a rutei și un control strict în timpul încărcării, tranzitului și descărcării.</li>
            <li>Planificarea noastră este adaptată mărfii reale, nu forțată într-un model de transport generic.</li>
          </ul>
          <GallerySlideshow images={galleryImages} />
        </div>
      </section>

      {/* ── 6. DIN PORT SAU FABRICĂ (dark bg) ── */}
      <section className="lte-port" style={{ backgroundImage: "url('/images/Group 8805.png')" }}>
        <div className="lte-dark-overlay">
          <div className="lte-container">
            <div className="lte-split lte-split--centered">
              <div className="lte-split-text">
                <h2 className="lte-section-title lte-section-title--light">
                  Din port sau fabrică, direct la sit
                </h2>
                <p className="lte-section-text lte-section-text--light">
                  Proiectele eoliene implică adesea multiple puncte de transfer, mai multe țări și ferestre de livrare limitate. Susținem execuția transportului pe coridoare internaționale, acordând atenție restricțiilor de traseu, formalităților vamale, escortelor necesare, punctelor de manipulare și condițiilor specifice de acces la șantier.
                </p>
                <p className="lte-section-text lte-section-text--light">
                  Acest lucru ne permite să construim fluxuri de transport practice, controlate și aliniate cu programul general al proiectului.
                </p>
              </div>
              <div className="lte-split-media">
                <img src="/images/routeSurv.png" alt="Route survey turbine eoliene" className="lte-side-image" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. DE CE HOLLEMAN (white, text left + image right) ── */}
      <section className="lte-why">
        <div className="lte-container">
          <div className="lte-split">
            <div className="lte-split-text">
              <h2 className="lte-section-title">De ce Holleman?</h2>
              <p className="lte-section-text">
                Holleman combină capacitatea de transport greu și agabaritic cu o mentalitate orientată spre proiecte complexe ("project cargo").
              </p>
              <p className="lte-section-text">
                Înțelegem că logistica eoliană nu înseamnă doar mutarea componentelor. Este vorba despre coordonarea transportului într-un mod care să susțină întreaga succesiune a proiectului, de la expediere și tranzit până la pregătirea livrării la sit.
              </p>
              <p className="lte-section-text">
                Clienții noștri au nevoie de o comunicare clară, planificare realistă și execuție pe care se pot baza. Acesta este standardul pe care ne propunem să îl aducem în fiecare proiect de logistică eoliană.
              </p>
            </div>
            <div className="lte-split-media">
              <img src="/images/DJI_0329.jpg" alt="Holleman transport aerian supraveghere" className="lte-side-image" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="lte-cta" style={{ backgroundImage: "url('/images/Group8748.webp')" }}>
        <div className="lte-dark-overlay lte-dark-overlay--cta">
          <div className="lte-container lte-container--center">
            <h2 className="lte-cta-title">Planificați un proiect de transport pentru turbine eoliene?</h2>
            <p className="lte-cta-text">
              Echipa noastră va analiza cerințele și vă va ajuta să definiți abordarea logistică potrivită pentru proiectul dumneavoastră.
            </p>
            <button className="btn" onClick={() => navigate('/contact')} aria-label="Solicită o ofertă de transport turbine eoliene">
              Solicită o ofertă
              <img src="/images/gobttn.webp" alt="" className="cta-icon" role="presentation" />
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES NAV ── */}
      <section className="services-nav-section">
        <div className="services-nav-container">
          <h2 className="services-nav-title">Află despre mai multe servicii</h2>
          <div className="services-nav-grid">
            <div className="service-nav-item" onClick={() => navigate('/transport-marfuri-agabaritice')}>
              <div className="service-nav-icon">
                <img src="/images/icons/iconprojectcargo.webp" alt="Project Cargo" />
              </div>
              <h3>Transport Mărfuri Agabaritice și Grele</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/relocari-industriale')}>
              <div className="service-nav-icon">
                <img src="/images/icons/heavy.webp" alt="Heavy Lift" />
              </div>
              <h3>Relocări Industriale – Manipulare, Montaje</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/portops')}>
              <div className="service-nav-icon">
                <img src="/images/icons/Anchor.webp" alt="Port Ops" />
              </div>
              <h3>Operațiuni Portuare</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCOVER PROJECTS ── */}
      <section className="discover-projects-section" onClick={() => navigate('/proiecte')}>
        <div className="discover-projects-container">
          <div className="discover-projects-content">
            <h2 className="discover-projects-title">Descoperă proiectele noastre</h2>
            <div className="discover-play-button">
              <img src="/images/gobttn.webp" alt="Vezi proiecte" />
            </div>
          </div>
        </div>
      </section>

      <GoUpButton />
      <Footer />
    </div>
  );
};

export default LogisticaTurbinelorEoliene;
