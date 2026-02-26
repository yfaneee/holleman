import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import './Permise.css';

const accordionItems = [
  {
    title: 'Servicii de însoțire pentru transporturi agabaritice',
    content: [
      'Punem la dispoziție vehicule de însoțire autorizate de autoritățile competente din România, împreună cu personal specializat în gestionarea transporturilor agabaritice',
      'Organizăm, la cerere, colaborarea cu Poliția Rutieră pentru transporturile care impun escortă oficială',
      'Asigurăm vehicule de escortă autorizate BF3 pentru transporturile desfășurate pe teritoriul Germaniei',
    ],
  },
  {
    title: 'Documentație și autorizații pentru transporturi speciale',
    content: [
      'Gestionăm integral procesul de obținere a Autorizațiilor Speciale de Transport',
      'Obținem aprobările necesare pentru accesul în zone urbane',
      'Asigurăm obținerea avizelor suplimentare cerute pentru transporturi excepționale',
      'Coordonăm și monitorizăm derularea proiectelor de transport agabaritic, pe tot parcursul acestora',
      'Transmitem documentele și autorizațiile prin echipele noastre de escortă sau prin servicii de curierat',
    ],
  },
  {
    title: 'Analiză și pregătire traseu',
    content: [
      'Realizăm studii de traseu pentru stabilirea variantei optime de transport, în funcție de dimensiuni, greutate și restricții de circulație',
      'Oferim suport operațional pentru pregătirea traseului, inclusiv eliberarea acestuia, demontarea și remontarea elementelor de infrastructură, precum și ridicarea sau deconectarea rețelelor aeriene, unde este necesar (Telekom, RDS, Electrica, CFR, rețele de tramvai, troleibuz etc.)',
    ],
  },
  {
    title: 'Estimări de cost și planificare logistică',
    content: [
      'Elaborăm estimări de cost pentru autorizații speciale, servicii de însoțire și escortă de poliție',
      'Pregătim estimări logistice complete pentru transporturi agabaritice pe teritoriul României și la nivel european',
    ],
  },
];

const Permise: React.FC = () => {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="permise-page">
      <SEO
        title="Permise și Însoțire Transport Agabaritic | Holleman"
        description="Servicii complete de însoțire transport agabaritic și obținere permise speciale. Departament intern specializat AST, escortă autorizată, analiză traseu. Holleman România."
        canonicalUrl="https://holleman.ro/permise-si-insotire-agabaritice"
        ogImage="https://holleman.ro/images/portoperationsbg.webp"
        keywords="permise transport agabaritic, însoțire transport special, AST autorizații, escortă transport, permise speciale România"
      />
      <Header />

      {/* Hero Section */}
      <section
        className="permise-hero"
        style={{ backgroundImage: `url('/images/Group8758.webp')` }}
      >
        <div className="permise-hero-overlay">
          <div className="permise-hero-content">
            <h1 className="permise-hero-title">
              INSOTIRE TRANSPORT AGABARITIC SI PERMISE SPECIALE
            </h1>
          </div>
        </div>
      </section>

      {/* Section 1 – Departament intern specializat */}
      <section className="permise-intro-section">
        <div className="permise-intro-container">
          <h2 className="permise-intro-title">Departament intern specializat</h2>
          <p className="permise-intro-text">
            Excelența în logistică presupune control total asupra detaliilor executiei
            transporturilor agabaritice si/sau grele. Serviciul nostru de însoțire transport
            agabaritic si greu este coordonat de un departament intern specializat în obținerea
            de AST / permise speciale in Romania si in strainatate. Această structură ne permite
            să oferim soluții la cheie incepand cu analiza traseului și obținerea autorizațiilor
            legale de la autorități (CNAIR, DRDP, drumuri locale (județene, comunale), Poliția
            Rutieră), până la execuția misiunii de însoțire cu echipaje proprii oferind
            siguranță, legalitate și promptitudine în fiecare proiect.
          </p>
        </div>
      </section>

      {/* Section 2 – Accordion services on bg image */}
      <section
        className="permise-services-section"
        style={{ backgroundImage: `url('/images/Group8729.webp')` }}
      >
        <div className="permise-services-overlay">
          <div className="permise-services-container">
            <h2 className="permise-services-title">Serviciile noastre</h2>

            <div className="permise-accordion">
              {accordionItems.map((item, index) => (
                <div
                  key={index}
                  className={`permise-accordion-item ${openAccordion === index ? 'open' : ''}`}
                >
                  <button
                    className="permise-accordion-header"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={openAccordion === index}
                  >
                    <span className="permise-accordion-title">{item.title}</span>
                    <span className="permise-accordion-icon">
                      {openAccordion === index ? '−' : '+'}
                    </span>
                  </button>
                  <div className="permise-accordion-body">
                    <ul className="permise-accordion-list">
                      {item.content.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="permise-services-footer">
              <button className="btn" onClick={() => navigate('/contact')}>
                <span>CONTACT</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 – De ce este important */}
      <section className="permise-why-section">
        <div className="permise-why-container">
          <h2 className="permise-why-title">
            De ce este important serviciul de permise si insotiri legale ale transporturilor
            speciale?
          </h2>
          <div className="permise-why-content">
            <p>
              AST-urile / permisele sunt solicitate de administratorii drumurilor conform unor
              reguli naționale privind depășirile standard de dimensiuni și greutăți. Toți
              transportatorii specializați trebuie să se conformeze și să optimizeze execuția
              transporturilor, pentru a executa în timp util, fără obstacole de ordin
              administrativ sau birocratic. În plus, este necesară și escorta poliției rutiere,
              în anumite cazuri. Un departament intern specializat știe exact ce documente sunt
              necesare pentru fiecare autoritate (CNAIR, DRDP, consilii județene, primării,
              poliția rutieră) și folosește platformele digitale de depunere sau alte metode
              uzuale, accelerând procesul de aprobare.
            </p>
            <p>
              Echipa noastră de personal atestat pentru însoțiri de transporturi agabaritice si
              grele reprezintă know-how-ul dobândit de-a lungul anilor în zona noastră de
              operare. Aceștia nu sunt doar însoțitori, ci și specialiști instruiți să
              gestioneze dinamica complexă a unui convoi, utilizând autospeciale omologate și
              dotate cu echipamente de semnalizare. Fiecare vehicul de escortă este configurat
              conform celor mai recente reglementări rutiere europene, incluzând panouri cu
              mesaje variabile, sisteme de iluminare de înaltă intensitate și comunicații.
            </p>
            <p>
              Dincolo de dotările tehnice, ne asumăm responsabilitatea totală pentru gestionarea
              traficului. Analizăm în avans punctele critice de pe traseu — intersecții complexe,
              pasaje înguste sau zone cu flux auto ridicat, intervenind prompt pentru a dirija
              circulația și a preveni orice incident.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 – Route Survey */}
      <section className="permise-route-section">
        <div className="permise-route-container">
          <h2 className="permise-route-title">
            ROUTE SURVEY – Expertiză internă pentru trasee sigure și eficiente
          </h2>
          <div className="permise-route-content">
            <p>
              În cadrul companiei noastre, acest tip de studiu este realizat integral în regim
              intern, ceea ce ne permite să oferim un nivel ridicat de acuratețe, promptitudine
              și control asupra întregului proces.
            </p>
            <p className="permise-route-question">De ce este important route survey-ul?</p>
            <p>
              Un route survey bine realizat reduce riscurile, previne întârzierile și asigură
              desfășurarea în siguranță a transporturilor sau lucrărilor. Prin identificarea din
              timp a tuturor obstacolelor și limitărilor, putem propune soluții eficiente și
              trasee optimizate, adaptate fiecărui proiect.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 – Route Survey includes (bg image) */}
      <section
        className="permise-includes-section"
        style={{ backgroundImage: `url('/images/Group8747.webp')` }}
      >
        <div className="permise-includes-overlay">
          <div className="permise-includes-container">
            <h2 className="permise-includes-title">Route Survey-ul include:</h2>
            <ul className="permise-includes-list">
              <li>verificarea infrastructurii rutiere</li>
              <li>identificarea restricțiilor de gabarit</li>
              <li>verificarea zonelor cu risc sau acces limitat</li>
              <li>documentarea completă a traseului propus</li>
              <li>
                configurarea si desenarea componentelor pe trailere in vederea
                transportului. Desenele contin dimensiuni totale ale ansamblului
                (marfă, greutăți pe axe).
              </li>
              <li>simulări reale în softul Heavygoods.</li>
              <li>
                soluții de lărgire a curbelor sau a îndepărtării obstacolelor
                (acolo unde este cazul)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Navigation Section */}
      <section className="services-nav-section">
        <div className="services-nav-container">
          <h2 className="services-nav-title">Afla despre mai multe servicii</h2>
          <div className="services-nav-grid">
            <div
              className="service-nav-item"
              onClick={() => navigate('/transport-marfuri-agabaritice')}
            >
              <div className="service-nav-icon">
                <img src="/images/icons/iconprojectcargo.webp" alt="Project Cargo icon" />
              </div>
              <h3>Transport marfuri agabaritice</h3>
            </div>
            <div
              className="service-nav-item"
              onClick={() => navigate('/relocari-industriale')}
            >
              <div className="service-nav-icon">
                <img src="/images/icons/heavy.webp" alt="Heavy Lift icon" />
              </div>
              <h3>Relocari industriale</h3>
            </div>
            <div className="service-nav-item" onClick={() => navigate('/portops')}>
              <div className="service-nav-icon">
                <img src="/images/icons/Anchor.webp" alt="Port Operations icon" />
              </div>
              <h3>Operatiuni portuare</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Projects CTA */}
      <section
        className="discover-projects-section"
        onClick={() => navigate('/proiecte')}
      >
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
    </div>
  );
};

export default Permise;
