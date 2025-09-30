import React, { useEffect } from 'react';
import './PrivacyPolicy.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = "Politica de Confidențialitate - Holleman Special Transport";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy-page">
      <Header />
      
      <div className="privacy-hero">
        <div className="privacy-hero-content">
          <h1>Politica de Confidențialitate și Cookies</h1>
          <p className="last-updated">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="privacy-content">
        <section className="privacy-section">
          <h2>1. Introducere</h2>
          <p>
            Holleman Special Transport & Project Cargo SRL ("noi", "Holleman") respectă confidențialitatea 
            vizitatorilor site-ului nostru web. Această politică explică modul în care colectăm, folosim și 
            protejăm informațiile dumneavoastră personale în conformitate cu Regulamentul General privind 
            Protecția Datelor (GDPR) și legislația română aplicabilă.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Date de Contact</h2>
          <div className="contact-info">
            <p><strong>Operator de date:</strong> Holleman Special Transport & Project Cargo SRL</p>
            <p><strong>CUI:</strong> RO 22941739</p>
            <p><strong>Registrul Comerțului:</strong> J40/23700/2007</p>
            <p><strong>Adresă:</strong> Șoseaua de Centură, București nr. 29, Comuna Jilava, Județul Ilfov, 077120</p>
            <p><strong>Email:</strong> <a href="mailto:info@holleman.ro">info@holleman.ro</a></p>
            <p><strong>Telefon:</strong> +40 744 317 713</p>
          </div>
        </section>

        <section className="privacy-section">
          <h2>3. Ce Date Personale Colectăm</h2>
          <p>Putem colecta următoarele tipuri de informații:</p>
          <ul>
            <li><strong>Date de contact:</strong> nume, adresă de email, număr de telefon (furnizate prin formularele de contact)</li>
            <li><strong>Date de navigare:</strong> adresa IP, tipul browserului, paginile vizitate, timpul petrecut pe site</li>
            <li><strong>Date tehnice:</strong> informații despre dispozitivul și sistemul de operare utilizat</li>
            <li><strong>Cookies:</strong> vezi secțiunea dedicată mai jos</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>4. Cum Folosim Datele Dumneavoastră</h2>
          <p>Folosim datele personale colectate pentru următoarele scopuri:</p>
          <ul>
            <li>Răspunsuri la solicitările dvs. de oferte și întrebări</li>
            <li>Îmbunătățirea experienței pe site-ul nostru</li>
            <li>Comunicare despre serviciile noastre (doar cu consimțământul dvs.)</li>
            <li>Analiză statistică și îmbunătățire a site-ului web</li>
            <li>Respectarea obligațiilor legale</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>5. Politica de Cookies</h2>
          
          <h3>Ce sunt cookie-urile?</h3>
          <p>
            Cookie-urile sunt fișiere mici de text salvate pe dispozitivul dvs. atunci când vizitați site-uri web. 
            Acestea ajută site-ul să funcționeze eficient și să vă ofere o experiență mai bună.
          </p>

          <h3>Ce tipuri de cookies folosim?</h3>
          
          <div className="cookie-type">
            <h4>🔒 Cookies esențiale (necesare)</h4>
            <p>
              Aceste cookie-uri sunt strict necesare pentru funcționarea site-ului și nu pot fi dezactivate. 
              Acestea includ cookie-ul care salvează preferința dvs. privind consimțământul pentru cookies.
            </p>
            <ul>
              <li><strong>cookieConsent</strong> - Salvează preferința dvs. de acceptare/respingere a cookies</li>
            </ul>
          </div>

          <div className="cookie-type">
            <h4>🗺️ Cookies de la terți</h4>
            <p>
              Folosim servicii de la terți care pot seta propriile cookie-uri. Acestea necesită consimțământul dvs.
            </p>
            <ul>
              <li><strong>Google Maps</strong> - Pentru afișarea hărților interactive cu locația noastră. 
                Google poate colecta date despre utilizarea hărților.</li>
            </ul>
          </div>

          <h3>Cum gestionați cookie-urile?</h3>
          <p>
            Puteți gestiona preferințele de cookies prin bannerul afișat la prima vizită. De asemenea, puteți 
            șterge cookie-urile existente prin setările browserului dvs.:
          </p>
          <ul>
            <li><strong>Chrome:</strong> Setări → Confidențialitate și securitate → Cookie-uri</li>
            <li><strong>Firefox:</strong> Setări → Confidențialitate și securitate → Cookie-uri</li>
            <li><strong>Safari:</strong> Preferințe → Confidențialitate → Cookie-uri</li>
            <li><strong>Edge:</strong> Setări → Cookie-uri și permisiuni site</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>6. Partajarea Datelor</h2>
          <p>
            Nu vindem, nu închiriem și nu partajăm datele dumneavoastră personale cu terțe părți în scopuri de marketing. 
            Datele pot fi partajate doar în următoarele situații:
          </p>
          <ul>
            <li>Cu furnizorii de servicii de încredere care ne ajută să operăm site-ul (ex: Google Maps)</li>
            <li>Când este cerut de lege sau de autorități competente</li>
            <li>Pentru protejarea drepturilor și siguranței companiei noastre</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>7. Drepturile Dumneavoastră (GDPR)</h2>
          <p>În conformitate cu GDPR, aveți următoarele drepturi:</p>
          <ul>
            <li><strong>Dreptul de acces:</strong> Puteți solicita o copie a datelor personale pe care le deținem despre dvs.</li>
            <li><strong>Dreptul la rectificare:</strong> Puteți solicita corectarea datelor inexacte</li>
            <li><strong>Dreptul la ștergere:</strong> Puteți solicita ștergerea datelor ("dreptul de a fi uitat")</li>
            <li><strong>Dreptul la restricționare:</strong> Puteți limita modul în care folosim datele dvs.</li>
            <li><strong>Dreptul la portabilitate:</strong> Puteți primi datele într-un format structurat</li>
            <li><strong>Dreptul de opoziție:</strong> Puteți refuza anumite tipuri de prelucrare a datelor</li>
            <li><strong>Dreptul de a depune o plângere:</strong> La Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</li>
          </ul>
          <p>
            Pentru a exercita aceste drepturi, vă rugăm să ne contactați la <a href="mailto:info@holleman.ro">info@holleman.ro</a>.
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. Securitatea Datelor</h2>
          <p>
            Implementăm măsuri de securitate tehnice și organizatorice pentru a proteja datele dumneavoastră 
            împotriva accesului neautorizat, pierderii sau distrugerii. Acestea includ:
          </p>
          <ul>
            <li>Criptare SSL pentru transferul de date</li>
            <li>Acces restricționat la datele personale</li>
            <li>Monitorizare regulată a sistemelor de securitate</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>9. Păstrarea Datelor</h2>
          <p>
            Păstrăm datele dumneavoastră personale doar cât timp este necesar pentru îndeplinirea scopurilor 
            pentru care au fost colectate sau conform cerințelor legale. Datele de contact din formularele 
            de contact sunt păstrate pentru maximum 3 ani, cu excepția cazului în care solicitați ștergerea mai devreme.
          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Link-uri către Site-uri Externe</h2>
          <p>
            Site-ul nostru poate conține link-uri către site-uri externe (ex: rețele sociale, parteneri). 
            Nu suntem responsabili pentru practicile de confidențialitate ale acestor site-uri și vă încurajăm 
            să citiți politicile lor de confidențialitate.
          </p>
        </section>

        <section className="privacy-section">
          <h2>11. Modificări ale Politicii</h2>
          <p>
            Ne rezervăm dreptul de a actualiza această politică de confidențialitate. Orice modificare va fi 
            publicată pe această pagină cu o nouă dată de actualizare. Vă recomandăm să verificați periodic 
            această pagină pentru a fi la curent cu eventualele modificări.
          </p>
        </section>

        <section className="privacy-section">
          <h2>12. Contact</h2>
          <p>
            Pentru orice întrebări sau preocupări legate de această politică de confidențialitate sau de 
            modul în care gestionăm datele dumneavoastră, vă rugăm să ne contactați:
          </p>
          <div className="contact-box">
            <p><strong>Email:</strong> <a href="mailto:info@holleman.ro">info@holleman.ro</a></p>
            <p><strong>Telefon:</strong> +40 744 317 713 / +40 745 017 529</p>
            <p><strong>Adresă:</strong> Șoseaua de Centură, București nr. 29, Comuna Jilava, Județul Ilfov, 077120</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
