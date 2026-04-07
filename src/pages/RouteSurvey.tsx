import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import './RouteSurvey.css';
import ScrollArrow from '../components/ScrollArrow';

const detailPoints = [
  {
    num: '1.',
    title: 'Verificarea infrastructurii rutiere',
    text: 'drumuri, intersectii, sensuri giratorii, pante, acostamente, poduri, treceri la nivel',
  },
  {
    num: '2.',
    title: 'Masuratori si verificari in teren',
    text: 'inaltimi libere, latimi utile, raze de virare, zone de acces si puncte critice',
  },
  {
    num: '3.',
    title: 'Identificarea restrictiilor de gabarit',
    text: 'limitari de inaltime, latime, lungime si manevrabilitate',
  },
  {
    num: '4.',
    title: 'Verificarea obstacolelor si a zonelor cu risc',
    text: 'cabluri, semnalistica, mobilier urban, arbori, parapete, lucrari temporare',
  },
  {
    num: '5.',
    title: 'Configurarea ansamblului de transport',
    text: 'configurarea si desenarea componentelor pe trailer, cu dimensiuni totale si sarcini pe axe',
  },
  {
    num: '6.',
    title: 'Simulare si masuri de remediere',
    text: 'swept path analysis, validarea trecerii si solutii pentru curbe stranse sau obstacole',
  },
];

const cumLucramSteps = [
  'Colectare date de proiect — dimensiuni marfa, greutate, centru de greutate, configuratie trailer, ferestre de transport',
  'Analiza preliminara de traseu — screening de fezabilitate si identificarea punctelor sensibile',
  'Masuratori si verificari in teren — clearance, raze, acces, obstacole, zone cu risc',
  'Simulare tehnica si validare — swept path, verificare axele incarcate, configurare ansamblu',
  'Raport si recomandari — traseu propus, puncte critice, masuri necesare, conditii de executie',
];

const livrabile = [
  'raport tehnic de traseu',
  'planse si schite ale ansamblului de transport',
  'dimensiuni totale si incarcari pe axe',
  'registru de obstacole si puncte critice',
  'galerie foto din teren, pe locatii relevante',
  'swept path simulations pentru punctele sensibile',
  'recomandari privind largiri locale, eliminarea temporara a obstacolelor sau alte masuri necesare',
];

const echipamenteBullets = [
  'telemetre laser Bosch Professional',
  'echipamente SupaRule pentru verificarea inaltimilor si a obstacolelor aeriene',
  'telemetre laser din gama Nikon Forestry Pro',
  'HeavyGoods pentru simulari swept path, configurarea ansamblului si verificarea sarcinilor pe axe',
  'DJI Matrice 400 pentru documentare aeriana si evaluarea vizuala a punctelor critice de pe traseu',
];

const slideshowImages = [
  { src: '/images/DJI_Matrice_400.webp', alt: 'DJI Matrice 400' },
  { src: '/images/DJIM400_4_1200x1200.webp', alt: 'DJI M400' },
  { src: '/images/M400_L2.webp', alt: 'DJI M400 L2' },
];

const tipuriProiecte = [
  'componente pentru energie eoliana',
  'transformatoare si echipamente energetice',
  'utilaje industriale si componente supradimensionate',
  'relocari industriale cu trasee sensibile',
  'transporturi care necesita verificare prealabila de acces la amplasament',
];

const RouteSurvey: React.FC = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rs-page">
      <SEO
        title="Route Survey | Holleman"
        description="Analiza tehnica de traseu pentru transporturi agabaritice si grele. Verificari teren, simulari gabarit, documentare puncte critice. Executie interna."
        canonicalUrl="https://holleman.ro/route-survey"
        ogImage="https://holleman.ro/images/routeBckg.png"
        keywords="route survey, analiza traseu, transport agabaritic, simulare gabarit, verificare traseu, holleman"
      />
      <Header />

      {/* ── HERO ── */}
      <section
        className="rs-hero"
        style={{ backgroundImage: `url('/images/routeBckg.png')` }}
      >
        <div className="rs-hero-overlay">
          <div className="rs-hero-content">
            <h1 className="rs-hero-title">Route Survey</h1>
            <p className="rs-hero-subtitle">
              Analiza tehnica de traseu pentru transporturi agabaritice si grele
            </p>
          </div>
        </div>
        <ScrollArrow />
      </section>

      {/* ── SECTION 1 – text left / image right ── */}
      <section className="rs-intro-section">
        <div className="rs-intro-container">
          <div className="rs-intro-box">
            <div className="rs-intro-left">
              <p className="rs-intro-text">
                Realizam intern verificarea traseului, masuratorile din teren, simularile de
                gabarit si documentarea punctelor critice, pentru a valida fezabilitatea
                transportului inainte de executie.
              </p>
              <button className="btn rs-contact-btn" onClick={() => navigate('/contact')}>
                <span>SOLICITA ANALIZA DE TRASEU</span>
              </button>
            </div>

            <div className="rs-intro-right">
              <img
                src="/images/routeSurv.png"
                alt="Route Survey – masuratori si verificari teren"
                className="rs-intro-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GREEN BANNER ── */}
      <div className="rs-green-banner">
        <ul className="rs-banner-list">
          <li>Executie interna</li>
          <li>Masuratori pe teren</li>
          <li>Simulare traiectorie</li>
          <li>Dosar tehnic de traseu</li>
        </ul>
      </div>

      {/* ── SECTION 2 – bg image, text left / bullets right ── */}
      <section
        className="rs-details-section"
        style={{ backgroundImage: `url('/images/Group8729.webp')` }}
      >
        <div className="rs-details-overlay">
          <div className="rs-details-container">
            {/* Left: description block */}
            <div className="rs-details-left">
              <p className="rs-details-label">Ce oferim:</p>
              <p className="rs-details-text">
                Route Survey-ul este evaluarea tehnica a traseului propus inaintea transportului.
                Scopul este verificarea fezabilitatii, identificarea restrictiilor de gabarit, a
                punctelor cu risc si a masurilor necesare pentru trecerea in siguranta a
                ansamblului rutier si a marfii. Aceasta abordare este in linie cu practica de
                specialitate, unde survey-ul documenteaza traseul, restrictiile si masurile de
                control pentru executarea transportului.
              </p>
            </div>

            {/* Right: numbered bullet points */}
            <div className="rs-details-right">
              <ul className="rs-details-list">
                {detailPoints.map((item, i) => (
                  <li key={i} className="rs-details-item">
                    <span className="rs-details-num">{item.num}</span>
                    <div className="rs-details-content">
                      <span className="rs-details-title">{item.title}</span>
                      <span className="rs-details-sub"> — {item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 – Cum lucram + Livrabile (white bg) ── */}
      <section className="rs-process-section">
        <div className="rs-process-container">
          {/* Cum lucram */}
          <div className="rs-process-block">
            <h2 className="rs-process-title">Cum lucram:</h2>
            <ul className="rs-process-list">
              {cumLucramSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>

          {/* Rezultate livrabile */}
          <div className="rs-process-block">
            <h2 className="rs-process-title">Rezultate livrabile:</h2>
            <ul className="rs-livrabile-list">
              {livrabile.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 – Echipamente si software ── */}
      <section className="rs-equip-section">
        <div className="rs-equip-container">
          {/* Left */}
          <div className="rs-equip-left">
            <h2 className="rs-equip-title">Echipamente si software</h2>
            <p className="rs-equip-text">
              Pentru masuratori si verificari utilizam echipamente dedicate pentru distante,
              inaltimi si obstacole aeriene, precum si software de simulare pentru validarea
              trecerii ansamblurilor agabaritice in punctele critice.
            </p>
            <ul className="rs-equip-bullets">
              {echipamenteBullets.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Right – slideshow */}
          <div className="rs-equip-right">
            <div className="rs-slideshow">
              {slideshowImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className={`rs-slide-img ${i === slideIndex ? 'rs-slide-active' : ''}`}
                />
              ))}
              <div className="rs-slide-dots">
                {slideshowImages.map((_, i) => (
                  <button
                    key={i}
                    className={`rs-slide-dot ${i === slideIndex ? 'active' : ''}`}
                    onClick={() => setSlideIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 – Tipuri de proiecte (bg image) ── */}
      <section
        className="rs-projects-section"
        style={{ backgroundImage: `url('/images/Group8756.png')` }}
      >
        <div className="rs-projects-overlay">
          <div className="rs-projects-container">
            <h2 className="rs-projects-title">Tipuri de proiecte</h2>
            <ul className="rs-projects-list">
              {tipuriProiecte.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RouteSurvey;
