import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Informații de contact și navigare site">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Column - Company Info */}
          <section className="footer-column company-info" aria-labelledby="company-info-heading">
            <h3 id="company-info-heading">BIROU BUCURESTI</h3>
            <address itemScope itemType="https://schema.org/PostalAddress">
              <p itemProp="streetAddress">Soseaua de Centura, Bucuresti nr. 29, Comuna Jilava</p>
              <p>
                <span translate="yes">Cod postal</span> <span itemProp="postalCode">077120</span>, 
                <span itemProp="addressRegion">Judetul Ilfov</span>
              </p>
              <p className="phone">
                <a href="tel:+40744678100" itemProp="telephone" aria-label="Telefon birou Bucuresti">+40 744 678 100</a>
              </p>
              <a href="mailto:info@holleman.ro" className="email" itemProp="email" aria-label="Email contact principal">info@holleman.ro</a>
            </address>
            
            <h3 className="constanta-heading">BIROU CONSTANTA</h3>
            <address itemScope itemType="https://schema.org/PostalAddress">
              <p itemProp="streetAddress">Port Agigea Sud CT, cladirea TLS, parter, Biroul 1, Constanta</p>
              <p>
                <span translate="yes">Cod postal</span> <span itemProp="postalCode">907015</span>, 
                <span itemProp="addressRegion">Judetul Constanta</span>
              </p>
            </address>
          </section>

          {/* Cariere Column */}
          <section className="footer-column" aria-labelledby="careers-contact-heading">
            <h3 id="careers-contact-heading">Cariere</h3>
            <nav aria-label="Navigare secțiune cariere">
              <ul>
                <li><a href="/cariere#sectiune-dedicata-recrutarii" translate="yes">Sectiune dedicata recrutarii</a></li>
                <li><a href="/cariere#posturi-disponibile" translate="yes">Posturi disponibile</a></li>
              </ul>
            </nav>
            
            <h3 translate="yes">Contact</h3>
            <nav aria-label="Navigare opțiuni contact">
              <ul>
                <li><a href="/contact/cerere" translate="yes">Cerere oferta</a></li>
                <li><a href="/contact/formular" translate="yes">Formular de contact</a></li>
                <li><a href="/contact/date" translate="yes">Date de contact</a></li>
              </ul>
            </nav>
          </section>

          {/* About Us Column */}
          <section className="footer-column" aria-labelledby="about-blog-heading">
            <h3 id="about-blog-heading" translate="yes">Despre Noi</h3>
            <nav aria-label="Navigare secțiune despre noi">
              <ul>
                <li><a href="/despre-noi#prezentare-grup-holleman" translate="yes">Prezentare Grup <span translate="no">Holleman</span></a></li>
                <li><a href="/despre-noi#conducerea-grupului" translate="yes">Conducerea Grupului</a></li>
                <li><a href="/despre-noi#responsabilitate-sociala-corporativa" translate="yes">Responsabilitate Sociala Corporativa</a></li>
              </ul>
            </nav>
            
            <h3 translate="yes">Blog</h3>
            <nav aria-label="Navigare secțiune blog">
              <ul>
                <li><a href="/blog#articles-section" translate="yes">Articole</a></li>
                <li><a href="/blog#stay-connected-section" translate="yes">Social Media</a></li>
              </ul>
            </nav>
          </section>

          {/* Servicii Column */}
          <section className="footer-column" aria-labelledby="services-projects-heading">
            <h3 id="services-projects-heading" translate="yes">Servicii</h3>
            <nav aria-label="Navigare servicii oferite">
              <ul>
                <li><a href="/project-cargo" translate="yes">Transport & <span translate="no">Project Cargo & Special Transport</span></a></li>
                <li><a href="/portops" translate="no">Port Operations</a></li>
                <li><a href="/heavy-lift"><span translate="no">Heavy Lift & Industrial Relocations</span></a></li>
                <li><a href="/itl" translate="no">ITL Standard Transport</a></li>
              </ul>
            </nav>
            
            <h3 translate="yes">Proiecte</h3>
            <nav aria-label="Navigare secțiune proiecte">
              <ul>
                <li><a href="/proiecte#projects-heading" translate="yes">Portofoliu</a></li>
                <li><a href="/proiecte#gallery-heading" translate="yes">Galerie</a></li>
              </ul>
            </nav>
          </section>

          {/* Social Media Column */}
          <section className="footer-column social-column" aria-labelledby="social-media-heading">
            <h3 id="social-media-heading" className="sr-only" translate="yes">Rețele sociale</h3>
            <nav aria-label="Linkuri către rețelele sociale Holleman" className="social-icons">
              <a href="https://www.tiktok.com/@holleman.project.cargo" className="social-icon tiktok" 
                 aria-label="Urmărește Holleman pe TikTok" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.294-1.986-1.294-3.338H12.73v14.97c0 1.14-.926 2.066-2.066 2.066s-2.066-.926-2.066-2.066.926-2.066 2.066-2.066c.222 0 .436.035.636.101V9.68a5.783 5.783 0 0 0-.636-.035c-3.176 0-5.757 2.581-5.757 5.757s2.581 5.757 5.757 5.757 5.757-2.581 5.757-5.757V7.709a9.84 9.84 0 0 0 3.33 1.393V5.562z"/>
                </svg>
                <span className="sr-only">TikTok</span>
              </a>
              <a href="https://www.facebook.com/hollemanromania" className="social-icon facebook" 
                 aria-label="Urmărește Holleman pe Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.instagram.com/hollemanro" className="social-icon instagram" 
                 aria-label="Urmărește Holleman pe Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.linkedin.com/company/holleman-special-transport-&-project-cargo-srl" className="social-icon linkedin" 
                 aria-label="Urmărește Holleman pe LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </nav>
            
            <div className="footer-logo">
              <img src="/images/Rectangle.webp" alt="Logo Holleman - Transport Special și Project Cargo" className="footer-logo-image" />
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
