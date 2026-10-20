import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ScrollArrow from '../components/ScrollArrow';
import './TransportMilitar.css';

// Photos go in /public/images/defence/ using the file names below.
// Until a file exists, its slot shows a neutral placeholder.
const IMG = '/images/defence';

const heroImage = `${IMG}/hero.webp`;

const experientaPhotos = [
  { src: `${IMG}/experienta-1.webp`, alt: 'Vehicul blindat transportat pe semiremorca Holleman' },
  { src: `${IMG}/experienta-2.webp`, alt: 'Camioane Holleman cu vehicule militare in zona montana' },
  { src: `${IMG}/experienta-3.webp`, alt: 'Coloana de transport militar Holleman pe autostrada' },
];

const ceTransportamPhotos = [
  { src: `${IMG}/transport-1.webp`, alt: 'Vehicule blindate pe trailere, pregatite pentru transport' },
  { src: `${IMG}/transport-2.webp`, alt: 'Convoi Holleman cu vehicule blindate' },
];

const serviciiPhoto = { src: `${IMG}/servicii-1.webp`, alt: 'Transport agabaritic cu trailer modular si escorta' };

const echipamentePhoto = { src: `${IMG}/configuratii-trailere.webp`, alt: 'Configuratii de trailere modulare si multi-axle Holleman' };

const proiectePhotos = [
  { src: `${IMG}/proiecte-1.webp`, alt: 'Transformator de mare tonaj transportat de Holleman' },
  { src: `${IMG}/proiecte-2.webp`, alt: 'Recipient industrial agabaritic pe trailer modular' },
  { src: `${IMG}/proiecte-3.webp`, alt: 'Transport greu Holleman in zona portuara' },
  { src: `${IMG}/proiecte-4.webp`, alt: 'Vehicul blindat pe trailer multi-axle Holleman' },
  { src: `${IMG}/proiecte-5.webp`, alt: 'Vehicule militare blindate pe semiremorca' },
  { src: `${IMG}/proiecte-6.webp`, alt: 'Transport vehicule militare tactice' },
];

const ctaPhotos = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `${IMG}/cta-${n}.webp`,
  alt: 'Transport special Holleman',
}));

const ceTransportam = [
  {
    title: 'Vehicule blindate și tancuri',
    text: 'Transport specializat pentru vehicule militare grele și blindate, utilizând configurații multi-axle și echipamente adaptate masei și geometriei încărcăturii.',
  },
  {
    title: 'Echipamente militare agabaritice',
    text: 'Soluții pentru încărcături cu dimensiuni, greutate sau configurație care depășesc condițiile normale de transport rutier.',
  },
  {
    title: 'Muniție și explozivi',
    text: 'Avem dotarea tehnică specializată, personal autorizat și certificate care ne permit acest tip de transport, la standardele cerute. Experiența în domeniu ne recomandă.',
  },
  {
    title: 'Containere și echipamente de suport',
    text: 'Transport pentru containere, module și echipamente logistice necesare operațiunilor militare.',
  },
  {
    title: 'Marfă generală și transport standard',
    text: 'Pentru încărcăturile care nu necesită echipamente speciale, putem organiza transport cu camioane standard, inclusiv semiremorci cu prelată, în funcție de cerințele proiectului.',
  },
];

const serviciiIntegrate = [
  {
    title: 'Route Survey',
    text: 'Verificarea traseului, punctelor critice de acces și condițiilor de circulație pentru transporturile speciale.',
    link: '/route-survey',
  },
  {
    title: 'Permise și escortă',
    text: 'Suport pentru obținerea autorizațiilor necesare și coordonarea escortelor acolo unde este cazul, a celor proprii și a celor asigurate de autorități (armată, poliție).',
    link: '/permise-si-insotire-agabaritice',
  },
  {
    title: 'Project Management',
    text: 'Managerii de proiect mobilizează permanent persoane instruite la punctele de încărcare și descărcare pentru coordonarea etapelor operaționale.',
  },
  {
    title: 'Macarale și stivuitoare',
    text: 'La nevoie, operațiunile pot include echipamente de ridicare și manipulare pentru încărcare și descărcare.',
    link: '/relocari-industriale',
  },
  {
    title: 'Port operations, deep sea and river shipping',
    text: 'Pentru proiectele care implică fluxuri maritime și transporturi pe barje, Holleman poate asigura coordonarea operațiunilor portuare și organizează transport combinat, maritim, fluvial și terestru.',
    link: '/portops',
  },
  {
    title: 'Storage Management',
    text: 'Suport pentru organizarea temporară a mărfurilor și etapizarea transporturilor atunci când programul proiectului o impune. Asistență la pregătirea documentației și execuției operațiunilor de încărcare și descărcare în / din zona de depozitare temporară.',
  },
];

const deCeHolleman = [
  {
    title: 'Flotă proprie specializată',
    text: 'Capacitate dată de dimensiunea flotei proprii pentru transport greu și agabaritic, inclusiv configurații modulare și multi-axle.',
  },
  {
    title: 'Echipă cu experiență',
    text: 'Personal familiarizat cu organizarea proiectelor de transport militar și cu cerințele operaționale ale proiectelor cu volum ridicat.',
  },
  {
    title: 'Servicii integrate',
    text: 'Transport, route survey, permise, escortă, modificări de traseu, manipulare, port operations și project management.',
  },
  {
    title: 'Acoperire regională',
    text: 'Experiență pe multiple coridoare europene și capacitatea de a mobiliza resurse în mai multe piețe.',
  },
];

// Every photo on the page, in page order, so the lightbox can step through them.
const allPhotos = [
  ...experientaPhotos,
  ...ceTransportamPhotos,
  serviciiPhoto,
  echipamentePhoto,
  ...proiectePhotos,
  ...ctaPhotos,
];

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  contain?: boolean;
  onOpen: (src: string) => void;
}

// Clickable photo that opens the lightbox; shows a placeholder box if the file is missing.
const Photo: React.FC<PhotoProps> = ({ src, alt, className = '', contain = false, onOpen }) => {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return <div className={`tm-photo tm-photo--placeholder ${className}`} aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      className={`tm-photo tm-photo-btn ${className}`}
      onClick={() => onOpen(src)}
      aria-label={`Mărește imaginea: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={contain ? 'tm-photo-img--contain' : ''}
        onError={() => setMissing(true)}
      />
      <span className="tm-photo-zoom" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
        </svg>
      </span>
    </button>
  );
};

const TransportMilitar: React.FC = () => {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const openPhoto = useCallback((src: string) => {
    setLightboxIndex(allPhotos.findIndex((p) => p.src === src));
  }, []);
  const closePhoto = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) => (i === null ? i : (i - 1 + allPhotos.length) % allPhotos.length));
  const nextPhoto = () =>
    setLightboxIndex((i) => (i === null ? i : (i + 1) % allPhotos.length));

  const isOpen = lightboxIndex !== null;

  // keyboard navigation + lock page scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // swipe left / right on touch screens
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx > 0) prevPhoto();
    else nextPhoto();
  };

  return (
    <div className="tm-page">
      <SEO
        title="Logistică de apărare și transport militar | Holleman"
        description="Transport vehicule militare, blindate, echipamente grele, muniție și containere pentru proiecte de apărare și programe NATO. Flotă proprie, route survey, permise, escortă și project management."
        canonicalUrl="https://holleman.ro/logistica-aparare-transport-militar"
        ogImage={`https://holleman.ro${heroImage}`}
        keywords="transport militar, logistica de aparare, defence logistics, transport vehicule blindate, transport tancuri, transport munitie, NATO, mobilitate militara, holleman"
      />
      <Header />

      {/* ── 1. HERO ── */}
      <section className="tm-hero" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="tm-hero-overlay">
          <div className="tm-hero-content">
            <h1 className="tm-hero-title">Logistică de apărare și transport militar</h1>
            <p className="tm-hero-subtitle">Defence Logistics &amp; Military Transport</p>
          </div>
        </div>
        <ScrollArrow />
      </section>

      {/* ── LEAD ── */}
      <section className="tm-lead-section">
        <div className="tm-container tm-lead-box">
          <p className="tm-lead-text">
            Holleman oferă soluții integrate pentru transportul vehiculelor militare, echipamentelor
            grele, containerelor și altor tipuri de marfă asociate proiectelor de apărare, de la
            transporturi standard până la operațiuni agabaritice de mare complexitate. Ceea ce ne
            caracterizează în mod deosebit este capacitatea noastră de a oferi un număr mare de
            vehicule specializate de transport, pentru proiecte mari, la nivel intern și
            internațional.
          </p>
          <p className="tm-lead-text">
            Experiența noastră include operațiuni de transport special desfășurate pe multiple
            coridoare europene și proiecte asociate programelor NATO, susținute de echipe
            specializate, flotă proprie pentru transport greu și coordonare operațională la origine
            și destinație.
          </p>
          <button className="btn tm-btn" onClick={() => navigate('/contact')}>
            <span>Discutați cu echipa noastră despre următorul proiect</span>
          </button>
        </div>
      </section>

      {/* ── 2. EXPERIENȚĂ ── */}
      <section className="tm-section tm-section--light">
        <div className="tm-container tm-split">
          <div className="tm-split-text">
            <p className="tm-eyebrow">Experiență în logistica de apărare</p>
            <h2 className="tm-title">Experiență construită în operațiuni reale</h2>
            <p className="tm-text">
              Holleman a transportat vehicule și alte echipamente militare în mod regulat, din anii
              '90, pentru diverse forțe armate. De la intensificarea mobilității militare în Europa,
              Holleman a fost implicat în numeroase operațiuni de transport pentru sectorul de
              apărare. Am susținut proiecte cu livrări către baze militare din România și din alte
              piețe europene, inclusiv Germania, Polonia, Grecia, Franța, Italia și Ungaria.
            </p>
            <p className="tm-text">
              Experiența acumulată acoperă atât transportul echipamentelor militare grele și al
              vehiculelor blindate, cât și containere, echipamente auxiliare și marfă care poate fi
              transportată cu vehicule standard. Această diversitate ne permite să adaptăm soluția
              de transport la caracteristicile reale ale fiecărei operațiuni.
            </p>
          </div>
          <div className="tm-collage tm-collage--three">
            {experientaPhotos.map((p) => (
              <Photo key={p.src} {...p} onOpen={openPhoto} />
            ))}
          </div>
        </div>
        <blockquote className="tm-container tm-quote">
          De la un singur transport special la programe cu sute de deplasări, fiecare operațiune
          este tratată ca parte a unui plan logistic controlat.
        </blockquote>
      </section>

      {/* ── 3. CE TRANSPORTĂM ── */}
      <section className="tm-section">
        <div className="tm-container">
          <p className="tm-eyebrow">Ce transportăm</p>
          <h2 className="tm-title">Capacitate pentru diferite tipuri de echipamente militare</h2>
          <div className="tm-cards tm-cards--five">
            {ceTransportam.map((item, i) => (
              <article key={item.title} className="tm-card">
                <span className="tm-card-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="tm-card-title">{item.title}</h3>
                <p className="tm-card-text">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="tm-strip tm-strip--two">
            {ceTransportamPhotos.map((p) => (
              <Photo key={p.src} {...p} onOpen={openPhoto} />
            ))}
          </div>
          <p className="tm-closing">
            Tipul de echipament se schimbă de la proiect la proiect. Capacitatea de coordonare
            trebuie să rămână aceeași.
          </p>
        </div>
      </section>

      {/* ── 4. SERVICII INTEGRATE ── */}
      <section className="tm-section tm-section--dark">
        <div className="tm-container">
          <p className="tm-eyebrow">Servicii integrate pentru transport militar</p>
          <h2 className="tm-title">Mai mult decât transport rutier</h2>
          <p className="tm-text tm-text--intro">
            Transporturile militare complexe necesită pregătire, coordonare și suport operațional
            înainte, în timpul și după deplasare. Holleman poate integra într-un singur proiect
            serviciile necesare pentru ca transportul să fie pregătit și executat controlat.
          </p>
          <div className="tm-cards tm-cards--three">
            {serviciiIntegrate.map((item) => (
              <article
                key={item.title}
                className={`tm-card tm-card--dark ${item.link ? 'tm-card--link' : ''}`}
                onClick={item.link ? () => navigate(item.link!) : undefined}
              >
                <h3 className="tm-card-title">{item.title}</h3>
                <p className="tm-card-text">{item.text}</p>
                {item.link && <span className="tm-card-more">Află mai multe →</span>}
              </article>
            ))}
          </div>
          <Photo {...serviciiPhoto} className="tm-panorama" onOpen={openPhoto} />
          <p className="tm-closing">
            Un singur flux operațional, de la pregătirea traseului până la predarea încărcăturii la
            destinație, coordonat, în timp util.
          </p>
        </div>
      </section>

      {/* ── 5. ECHIPAMENTE ȘI FLEXIBILITATE ── */}
      <section className="tm-section">
        <div className="tm-container tm-split">
          <div className="tm-split-text">
            <p className="tm-eyebrow">Echipamente și flexibilitate operațională</p>
            <h2 className="tm-title">
              De la camioane standard la configurații modulare pentru transport greu
            </h2>
            <p className="tm-text">
              Capacitatea Holleman nu se limitează la un singur tip de transport. În funcție de
              greutatea, dimensiunile și caracteristicile încărcăturii, operațiunile pot utiliza
              configurații diferite de transport.
            </p>
            <p className="tm-text">
              Flota proprie specializată permite executarea transporturilor grele și agabaritice cu
              trailere modulare și configurații multi-axle adaptate încărcăturii.
            </p>
            <p className="tm-text">
              Pentru containere, echipamente auxiliare sau alte categorii de marfă care nu necesită
              transport special, Holleman poate organiza și capacitate standard, inclusiv camioane
              cu semiremorcă prelată.
            </p>
            <p className="tm-text">
              Această flexibilitate permite gestionarea în cadrul aceluiași proiect a unor fluxuri
              foarte diferite, de la vehicule militare grele până la echipamente și marfă generală.
            </p>
            <div className="tm-proof">
              <span className="tm-proof-number">250+</span>
              <span className="tm-proof-label">
                linii de axe modulare disponibile pentru proiectele de transport greu ale grupului
              </span>
            </div>
          </div>
          <div className="tm-diagram">
            <Photo {...echipamentePhoto} className="tm-photo--flat" contain onOpen={openPhoto} />
          </div>
        </div>
      </section>

      {/* ── 6. COORDONARE LA ORIGINE ȘI DESTINAȚIE ── */}
      <section className="tm-section tm-section--light">
        <div className="tm-container tm-narrow">
          <p className="tm-eyebrow">Coordonare la origine și destinație</p>
          <h2 className="tm-title">Echipe în teren, acolo unde proiectul are nevoie de ele</h2>
          <p className="tm-text">
            Pentru proiectele cu volum ridicat sau cu cerințe operaționale complexe, Holleman poate
            mobiliza personal dedicat atât la locul de încărcare, cât și la destinație.
          </p>
          <p className="tm-text">
            Managerii de proiect coordonează transporturile, secvența operațiunilor și interfața cu
            celelalte echipe implicate. În funcție de proiect, aceștia pot fi susținuți de
            macarale, stivuitoare, echipe de escortă și alte resurse necesare manipulării și
            coordonării mărfii.
          </p>
          <p className="tm-text">
            Acest model a fost utilizat inclusiv în programe cu volume mari de transport, unde un
            număr ridicat de unități a trebuit coordonat într-un interval de timp restrâns.
          </p>
        </div>
      </section>

      <div className="tm-green-banner">
        <p>
          Capacitatea de transport contează. Capacitatea de a coordona întregul flux face
          diferența.
        </p>
      </div>

      {/* ── 7. CONFIDENȚIALITATE ── */}
      <section className="tm-section tm-section--dark tm-confidential">
        <div className="tm-container tm-narrow">
          <p className="tm-eyebrow">Confidențialitate și control operațional</p>
          <h2 className="tm-title">Discreție adaptată cerințelor proiectelor de apărare</h2>
          <p className="tm-text">
            În proiectele din domeniul apărării, confidențialitatea este parte integrantă a modului
            de lucru. Holleman gestionează aceste operațiuni în baza acordurilor de
            confidențialitate aplicabile și a procedurilor interne dedicate protejării
            informațiilor operaționale și comerciale.
          </p>
        </div>
      </section>

      {/* ── 8. PROIECTE ȘI CAPACITATE DEMONSTRATĂ ── */}
      <section className="tm-section">
        <div className="tm-container">
          <p className="tm-eyebrow">Proiecte și capacitate demonstrată</p>
          <h2 className="tm-title">Defence Mobility Support at Scale</h2>
          <div className="tm-columns">
            <p className="tm-text">
              Holleman a susținut operațiuni de transport pentru sectorul de apărare cu volume
              ridicate, desfășurate în România și pe multiple coridoare europene. Experiența include
              vehicule militare agabaritice, echipamente grele, containere și încărcături de
              dimensiuni mai reduse, transportate atât pe configurații multi-axle, cât și cu
              vehicule standard.
            </p>
            <p className="tm-text">
              Portofoliul include proiecte cu sute de transporturi coordonate în cadrul aceluiași
              program, operațiuni între baze militare, fluxuri conectate la porturi și transporturi
              internaționale cu termene de execuție restrânse. Aceste proiecte demonstrează
              capacitatea Holleman de a organiza volume mari, de a adapta resursele la tipul
              încărcăturii și de a menține controlul operațional pe întreaga durată a proiectului.
            </p>
          </div>
          <div className="tm-gallery">
            {proiectePhotos.map((p) => (
              <Photo key={p.src} {...p} onOpen={openPhoto} />
            ))}
          </div>
          <p className="tm-closing">
            Experiență demonstrată în proiecte de mobilitate militară cu volum ridicat, desfășurate
            pe multiple coridoare europene.
          </p>
        </div>
      </section>

      {/* ── 10. DE CE HOLLEMAN ── */}
      <section className="tm-section tm-section--light">
        <div className="tm-container">
          <p className="tm-eyebrow">De ce Holleman</p>
          <h2 className="tm-title">Un partener pentru execuția operațională</h2>
          <div className="tm-cards tm-cards--four">
            {deCeHolleman.map((item) => (
              <article key={item.title} className="tm-card tm-card--accent">
                <h3 className="tm-card-title">{item.title}</h3>
                <p className="tm-card-text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CTA FINAL ── */}
      <section className="tm-cta-section">
        <div className="tm-strip tm-strip--six">
          {ctaPhotos.map((p) => (
            <Photo key={p.src} {...p} onOpen={openPhoto} />
          ))}
        </div>
        <div className="tm-container tm-narrow tm-cta-content">
          <h2 className="tm-title">Discutați cu noi despre următorul proiect de transport militar</h2>
          <p className="tm-text">
            Indiferent dacă proiectul implică un singur vehicul greu, un transport agabaritic
            complex sau un program cu volume ridicate și multiple destinații, echipa Holleman poate
            analiza cerințele și construi soluția operațională potrivită.
          </p>
          <p className="tm-text">Contactați echipa Holleman pentru o evaluare a proiectului.</p>
          <button className="btn tm-btn" onClick={() => navigate('/contact')}>
            <span>Solicită o discuție</span>
          </button>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="tm-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie foto"
          onClick={closePhoto}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button className="tm-lightbox-close" onClick={closePhoto} aria-label="Închide">
            &#x2715;
          </button>
          <button
            className="tm-lightbox-nav tm-lightbox-nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            aria-label="Imaginea anterioară"
          >
            &#8249;
          </button>
          <figure className="tm-lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img
              key={allPhotos[lightboxIndex].src}
              src={allPhotos[lightboxIndex].src}
              alt={allPhotos[lightboxIndex].alt}
              className="tm-lightbox-img"
            />
            <figcaption className="tm-lightbox-counter">
              {lightboxIndex + 1} / {allPhotos.length}
            </figcaption>
          </figure>
          <button
            className="tm-lightbox-nav tm-lightbox-nav--next"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            aria-label="Imaginea următoare"
          >
            &#8250;
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TransportMilitar;
