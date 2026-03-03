import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import './IndustriiDeservite.css';

const transportColumns = [
  {
    icon: '/images/svg/rutier.svg',
    title: 'RUTIER',
    items: ['Camion Frigo', 'Camion Partial', 'Camion Complet'],
  },
  {
    icon: '/images/svg/agabaritic.svg',
    title: 'AGABARITIC',
    items: ['Trailer', 'Low-Bed', 'Platforma'],
  },
  {
    icon: '/images/svg/naval.svg',
    title: 'NAVAL',
    items: ['Bulk', 'Container Full', 'Container Partial'],
  },
  {
    icon: '/images/svg/feroviar.svg',
    title: 'FEROVIAR',
    items: ['Depozitare', 'Multimodal', 'Terminal Propriu'],
  },
  {
    icon: '/images/svg/aerian.svg',
    title: 'AERIAN',
    items: ['Colete', 'Marfa Frigo', 'Marfa Generala'],
  },
];

const serviciiCheie = [
  'Transporturi interne și internaționale pentru mărfuri grele și agabaritice, pe rute terestre sau combinate.',
  'Manipularea echipamentelor agabaritice cu macarale de mare capacitate, disponibilă în porturile de la Marea Neagră, pe Dunăre, Main și Rin, precum și în alte porturi europene.',
  'Servicii de amarare și dezamarare în Portul Constanța și în porturile dunărene, cu suport de handling în porturi relevante pentru proiect.',
  'Mutări industriale specializate, pentru relocări, poziționări și manipulări de echipamente grele, cu automacarale și portal hidraulic mobil, unde este necesar.',
];

const undeLivram = [
  {
    image: '/images/sectoare/energie.webp',
    title: 'Energie',
    text: 'Transport și manipulare pentru echipamente și subansamble critice, cu livrări aliniate etapelor de montaj.',
  },
  {
    image: '/images/sectoare/eolian.webp',
    title: 'Eolian',
    text: 'Transporturi de componente și încărcături supradimensionate, cu suport de manipulare și asigurare a mărfii.',
  },
  {
    image: '/images/sectoare/PetrolsiGaze.webp',
    title: 'Petrol și gaze',
    text: 'Operațiuni pentru echipamente grele, unde planificarea traseului, manipularea și siguranța execuției sunt decisive.',
  },
  {
    image: '/images/sectoare/constructiisiinfrastructura.webp',
    title: 'Construcții și infrastructură',
    text: 'Utilaje și echipamente de șantier, plus transporturi speciale pentru elemente mari, în ferestre de deplasare planificate.',
  },
  {
    image: '/images/sectoare/Industriesimanufactura.webp',
    title: 'Industrie și manufactură',
    text: 'Relocări și mutări industriale, plus transport și poziționare de echipamente tehnologice, atunci când proiectul implică schimbări de amplasament sau reconfigurări.',
  },
  {
    image: '/images/sectoare/Structurimetalice.webp',
    title: 'Structuri metalice',
    text: 'Transporturi specializate pentru elemente de mari dimensiuni, cu manipulare controlată la încărcare și descărcare.',
  },
  {
    image: '/images/sectoare/agricultura.webp',
    title: 'Agricultură',
    text: 'Transporturi pentru utilaje agricole, inclusiv echipamente supradimensionate, cu focus pe predictibilitate și siguranță.',
  },
  {
    image: '/images/sectoare/maritimsiambarcatiuni.webp',
    title: 'Maritim și ambarcațiuni',
    text: 'Transporturi pentru bărci și șalupe de mari dimensiuni, cu planificare de rută și manipulare controlată, după caz.',
  },
];

const IndustriiDeservite: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="industrii-page">
      <SEO
        title="Industrii Deservite | Holleman"
        description="Holleman acoperă transporturi rutiere, agabaritice, navale, feroviare și aeriene. Soluții logistice specializate pentru fiecare sector economic."
        canonicalUrl="https://holleman.ro/industrii-deservite"
        ogImage="https://holleman.ro/images/Group8800.webp"
        keywords="industrii deservite, transport rutier, transport agabaritic, transport naval, transport feroviar, transport aerian, logistica Romania"
      />
      <Header />

      {/* Hero Section */}
      <section
        className="industrii-hero"
        style={{ backgroundImage: `url('/images/Group8800.webp')` }}
      >
        <div className="industrii-hero-overlay">
          <div className="industrii-hero-content">
            <h1 className="industrii-hero-title">INDUSTRII DESERVITE</h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="industrii-content-section">
        <div className="industrii-content-container">
          <h2 className="industrii-section-title">Sectoare economice deservite</h2>
          <p className="industrii-section-text">
            Holleman lucrează în proiecte unde dimensiunea, greutatea și calendarul de livrare
            cer logistică specializată. Acoperim lanțul operațional de la transport, la
            manipulare, amarare și poziționare, inclusiv prin mutări industriale, atunci când
            proiectul o impune.
          </p>

          {/* Transport Type Grid */}
          <div className="industrii-transport-grid">
            {transportColumns.map((col) => (
              <div key={col.title} className="industrii-transport-col">
                <div className="industrii-transport-icon">
                  <img src={col.icon} alt={col.title} />
                </div>
                <h3 className="industrii-transport-title">{col.title}</h3>
                <ul className="industrii-transport-list">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicii cheie Section */}
      <section
        className="industrii-servicii-section"
        style={{ backgroundImage: `url('/images/Group8728.webp')` }}
      >
        <div className="industrii-servicii-overlay">
          <div className="industrii-servicii-container">
            <h2 className="industrii-servicii-title">Servicii cheie, integrate în proiect</h2>
            <ul className="industrii-servicii-list">
              {serviciiCheie.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Unde livram valoare Section */}
      <section className="industrii-unde-section">
        <div className="industrii-unde-container">
          <h2 className="industrii-unde-title">Unde livram valoare</h2>
          <div className="industrii-unde-grid">
            {undeLivram.map((card) => (
              <div
                key={card.title}
                className="industrii-unde-card"
                style={{ backgroundImage: `url('${card.image}')` }}
              >
                <div className="industrii-unde-overlay">
                  <h3 className="industrii-unde-card-title">{card.title}</h3>
                  <p className="industrii-unde-card-text">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Projects CTA */}
      <section
        className="industrii-cta-section"
        onClick={() => navigate('/proiecte')}
      >
        <div className="industrii-cta-container">
          <div className="industrii-cta-content">
            <h2 className="industrii-cta-title">Descopera proiectele noastre</h2>
            <div className="industrii-cta-button">
              <img src="/images/gobttn.webp" alt="Play button" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustriiDeservite;
