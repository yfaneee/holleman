import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProjectByIdSync, getRelatedProjectsSync } from '../data/projectsData';
import { processParagraphFormatting } from '../utils/textFormatting';
import './ProjectPage.css';

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentRelatedProject, setCurrentRelatedProject] = useState(0);
  const galleryRef = React.useRef<HTMLDivElement>(null);
  const galleryContainerRef = React.useRef<HTMLDivElement>(null);
  const [galleryStyle, setGalleryStyle] = useState<React.CSSProperties>({});
  const contentRef = React.useRef<HTMLDivElement>(null);
  const socialRef = React.useRef<HTMLDivElement>(null);

  // Get project data
  const project = projectId ? getProjectByIdSync(projectId) : null;
  const relatedProjects = project ? getRelatedProjectsSync(project.id) : [];

  // If project not found, redirect to projects page
  useEffect(() => {
    if (projectId && !project) {
      navigate('/proiecte');
    }
  }, [projectId, project, navigate]);

  // SEO setup
  useEffect(() => {
    if (project) {
      document.title = project.seo.title;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', project.seo.description);
      }
      
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', project.seo.canonicalUrl);
    }
  }, [project]);

  // Gallery navigation
  const nextImage = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.gallery.images.length);
    }
  }, [project]);

  const prevImage = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.gallery.images.length) % project.gallery.images.length);
    }
  }, [project]);

  // Related projects navigation
  const nextRelatedProject = useCallback(() => {
    if (relatedProjects.length > 3) {
      setCurrentRelatedProject((prev) => (prev + 1) % relatedProjects.length);
    }
  }, [relatedProjects.length]);

  const prevRelatedProject = useCallback(() => {
    if (relatedProjects.length > 3) {
      setCurrentRelatedProject((prev) => (prev - 1 + relatedProjects.length) % relatedProjects.length);
    }
  }, [relatedProjects.length]);

  // Auto-advance related projects slideshow
  useEffect(() => {
    if (relatedProjects.length > 1) {
      const interval = setInterval(() => {
        setCurrentRelatedProject((prev) => (prev + 1) % relatedProjects.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [relatedProjects.length]);

  // Sticky gallery: follow on scroll, stop at section end (desktop only)
  useEffect(() => {
    const update = () => {
      const container = galleryContainerRef.current;
      const gallery = galleryRef.current;
      if (!container || !gallery) return;

      if (window.innerWidth <= 900) {
        // Disable on mobile
        setGalleryStyle({ position: 'relative', top: 0, left: 0, right: 0, width: '100%' });
        return;
      }

      const headerEl = document.querySelector('.header') as HTMLElement | null;
      const headerH = headerEl ? headerEl.offsetHeight : 120;
      const topGap = 24; // spacing below header when fixed
      const bottomGap = 40; // spacing above the end of the section
      const socialGap = 24; // keep distance from social icons

      const containerRect = container.getBoundingClientRect();
      const containerTop = window.scrollY + containerRect.top;
      const containerHeight = container.offsetHeight;
      const content = contentRef.current;
      const contentRect = content ? content.getBoundingClientRect() : containerRect;
      const contentTop = window.scrollY + (content ? contentRect.top : containerRect.top);
      const contentHeight = content ? content.offsetHeight : containerHeight;
      const social = socialRef.current;
      const socialRect = social ? social.getBoundingClientRect() : null;
      const socialTopY = socialRect ? window.scrollY + socialRect.top : Number.POSITIVE_INFINITY;
      const galleryHeight = gallery.offsetHeight;
      const startStick = containerTop - headerH - topGap;
      // Maximum allowed bottom Y for gallery (document coords)
      const containerBottomY = containerTop + containerHeight - bottomGap;
      const socialLimitY = socialTopY - socialGap;
      const maxBottomY = Math.min(containerBottomY, socialLimitY);
      const endStick = maxBottomY - galleryHeight; // y at which gallery top should stop
      const y = window.scrollY;

      if (y <= startStick) {
        setGalleryStyle({ position: 'relative', top: 0, left: 0, right: 0, width: '100%' });
      } else if (y > startStick && (y + headerH + topGap) < endStick) {
        // While fixed, ensure the gallery bottom does not pass the limit
        setGalleryStyle({ position: 'fixed', top: headerH + topGap, left: containerRect.left, width: containerRect.width });
      } else {
        const absoluteTop = Math.max(0, endStick - containerTop);
        setGalleryStyle({ position: 'absolute', top: absoluteTop, left: 0, right: 0, width: '100%' });
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Handle related project navigation
  const handleRelatedProjectClick = (projectId: string) => {
    navigate(`/proiecte/${projectId}`);
  };

  const handleCereOfertaClick = () => {
    // TODO: Navigate to contact page or open contact form
    navigate('/contact');
  };

  if (!project) {
    return null; // Will redirect to /proiecte
  }

  const getDivisionColor = (division: string) => {
    const colors = {
      'heavy-lift': '#D4A017',
      'project-cargo': '#136B38',
      'itl': '#135091',
      'agro': '#A36627'
    };
    return colors[division as keyof typeof colors] || '#136B38';
  };

  return (
    <div className="project-page project-page-white-header">
      <Header />
      
      {/* Project Content Section */}
      <section className="project-content-section">
        <div className="project-content-container">
          
          {/* Gallery Section */}
          <div className="project-gallery-container" ref={galleryContainerRef}>
            <div className="project-gallery" ref={galleryRef} style={galleryStyle}>
              <div className="gallery-main">
                <img 
                  src={project.gallery.images[currentImageIndex]} 
                  alt={project.title}
                  className="gallery-main-image"
                />
                {project.gallery.images.length > 1 && (
                  <>
                    <button 
                      className="gallery-nav gallery-nav-prev" 
                      onClick={prevImage}
                      aria-label="Imaginea anterioară"
                    >
                      ‹
                    </button>
                    <button 
                      className="gallery-nav gallery-nav-next" 
                      onClick={nextImage}
                      aria-label="Următoarea imagine"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              
              {project.gallery.images.length > 1 && (
                <div className="gallery-thumbnails">
                  {project.gallery.images.map((image, index) => (
                    <button
                      key={index}
                      className={`gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image} alt={`${project.title} - imagine ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Project Info Section */}
          <div className="project-info" ref={contentRef}>
            <div className="project-header">
              <h1 className="project-title">{project.title}</h1>
              <p className="project-subtitle">{project.subtitle}</p>
            </div>

            <div className="project-description">
              {project.description.paragraphs.map((paragraph, index) => (
                <p 
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: processParagraphFormatting(paragraph)
                  }}
                />
              ))}
            </div>

            {/* Separator Line */}
            <div className="project-separator"></div>

            {/* Social Links */}
            <div className="project-social">
              <a href="https://www.tiktok.com/@holleman.project.cargo" className="social-link" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.294-1.986-1.294-3.338H12.73v14.97c0 1.14-.926 2.066-2.066 2.066s-2.066-.926-2.066-2.066.926-2.066 2.066-2.066c.222 0 .436.035.636.101V9.68a5.783 5.783 0 0 0-.636-.035c-3.176 0-5.757 2.581-5.757 5.757s2.581 5.757 5.757 5.757 5.757-2.581 5.757-5.757V7.709a9.84 9.84 0 0 0 3.33 1.393V5.562z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/hollemanromania" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/hollemanro" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/holleman-special-transport-&-project-cargo-srl" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section 
        className="related-projects-section" 
        style={{
          backgroundColor: getDivisionColor(project.division),
          backgroundImage: `url('/images/projectslideshow.webp')`
        }}
      >
        <div className="related-projects-container">
          <h2 className="related-projects-title">Descopera alte proiecte Holleman</h2>
          
          <div className="related-projects-slideshow">
            {relatedProjects.length > 0 && (
              <>
                <div className="related-project-cards">
                  {relatedProjects.length <= 3 ? 
                    // Show all projects if 3 or fewer
                    relatedProjects.map((relatedProject, index) => (
                      <div
                        key={relatedProject.id}
                        className="related-project-card visible"
                        onClick={() => handleRelatedProjectClick(relatedProject.id)}
                      >
                        <div className="related-project-image">
                          <img src={relatedProject.gallery.mainImage} alt={relatedProject.title} />
                        </div>
                        <div className="related-project-info">
                          <h3>{relatedProject.title}</h3>
                          <span className="related-project-division">{relatedProject.division.toUpperCase()}</span>
                        </div>
                      </div>
                    )) :
                    // Show 3 projects with sliding window
                    Array.from({ length: 3 }, (_, index) => {
                      const projectIndex = (currentRelatedProject + index) % relatedProjects.length;
                      const relatedProject = relatedProjects[projectIndex];
                      return (
                        <div
                          key={`${relatedProject.id}-${currentRelatedProject}-${index}`}
                          className="related-project-card visible"
                          onClick={() => handleRelatedProjectClick(relatedProject.id)}
                        >
                          <div className="related-project-image">
                            <img src={relatedProject.gallery.mainImage} alt={relatedProject.title} />
                          </div>
                          <div className="related-project-info">
                            <h3>{relatedProject.title}</h3>
                            <span className="related-project-division">{relatedProject.division.toUpperCase()}</span>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>

                {relatedProjects.length > 3 && (
                  <div className="related-projects-nav">
                    <button 
                      className="nav-button nav-prev" 
                      onClick={prevRelatedProject}
                      aria-label="Proiectul anterior"
                    >
                      ‹
                    </button>
                    <button 
                      className="nav-button nav-next" 
                      onClick={nextRelatedProject}
                      aria-label="Următorul proiect"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Cere o oferta Button */}
          <div className="cere-oferta-section">
            <button 
              className="btn cere-oferta-btn" 
              onClick={handleCereOfertaClick}
            >
              Cere o oferta
              <img src="/images/gobttn.webp" alt="" className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectPage;
