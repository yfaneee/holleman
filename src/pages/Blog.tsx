import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLatestArticles, getAllArticles, clearArticlesCache } from '../data/newsData';
import './Blog.css';

const Blog: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // State for blog sections from Strapi
  const [articleSection, setArticleSection] = useState<any>(null);
  const [stayConnectedSection, setStayConnectedSection] = useState<any>(null);
  const [sectionsLoading, setSectionsLoading] = useState(true);
  const [blogHeroContent, setBlogHeroContent] = useState<any>(null);

  // State for articles
  const [articles, setArticles] = useState<any[]>(getLatestArticles());
  const [articlesLoading, setArticlesLoading] = useState(true);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(articles.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(articles.length / 4)) % Math.ceil(articles.length / 4));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Get current articles group (4 articles per slide: 1 featured + 3 small)
  const getCurrentArticles = () => {
    const startIndex = currentSlide * 4;
    const currentArticles = articles.slice(startIndex, startIndex + 4);
    // Ensure we always have 4 articles to display
    while (currentArticles.length < 4 && articles.length > 0) {
      currentArticles.push(articles[currentArticles.length % articles.length]);
    }
    return currentArticles;
  };

  // SEO: Set document title and meta description for blog page
  useEffect(() => {
    document.title = "Blog - Noutăți & Articole Holleman | Transport Agabaritic România";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Citește cele mai noi articole și noutăți din industria transporturilor agabaritice. Blog Holleman cu informații utile despre Project Cargo și transport special.');
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://holleman.ro/blog');
  }, []);

  // Fetch blog sections and articles from Strapi
  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        // Clear cache to force fresh data
        clearArticlesCache();
        
        const [articleSectionRes, stayConnectedRes, articlesData, blogHeroRes] = await Promise.all([
          fetch('https://holleman-cms-production.up.railway.app/api/blog-article-section?populate=*'),
          fetch('https://holleman-cms-production.up.railway.app/api/blog-stay-connected?populate=*'),
          getAllArticles(),
          fetch('https://holleman-cms-production.up.railway.app/api/blog-hero')
        ]);

        const articleSectionData = await articleSectionRes.json();
        const stayConnectedData = await stayConnectedRes.json();
        const blogHeroData = await blogHeroRes.json();

        console.log('Article Section Data:', articleSectionData);
        console.log('Stay Connected Data:', stayConnectedData);
        console.log('Articles from Strapi:', articlesData);
        console.log('Blog Hero Data:', blogHeroData);

        setArticleSection(articleSectionData.data);
        setStayConnectedSection(stayConnectedData.data);
        setArticles(articlesData.slice(0, 6)); // Get latest 6 articles
        setBlogHeroContent(blogHeroData.data);
      } catch (error) {
        console.error('Error fetching blog content:', error);
        setBlogHeroContent({
          title: 'Noutăți & Blog',
          subtitleText: 'Descopera cele mai noi tendinte si informatii din lumea transporturilor agabaritice'
        });
      } finally {
        setSectionsLoading(false);
        setArticlesLoading(false);
      }
    };

    fetchBlogContent();
  }, []);

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
    <div className="blog-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="blog-hero"
        style={{
          backgroundImage: `url('/images/Group8751.webp')`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            {blogHeroContent?.title || ''}
          </h1>
          <p className="hero-subtitle">
            {blogHeroContent?.subtitleText || ''}
          </p>
        </div>
      </section>

      {/* Articles Slideshow Section */}
      <section id="articles-section" className="articles-section">
        <div className="articles-container">
          <div className="articles-header">
            {sectionsLoading ? (
              <div>Loading articles section...</div>
            ) : articleSection ? (
              <>
                <h2 className="articles-title" style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}>
                  {articleSection.title}
                </h2>
                <div className="articles-description" style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  animation: 'slideInUp 0.8s ease-out 0.2s forwards'
                }}>
                  <p>{articleSection.description}</p>
                </div>
              </>
            ) : (
              <div>No article section content found.</div>
            )}
          </div>

          <div className="articles-slideshow">
            <div className="articles-grid">
              {getCurrentArticles().map((article, index) => (
                <div 
                  key={article.id} 
                  className={`article-card ${index === 0 ? 'featured' : 'small'}`}
                  onClick={() => navigate(`/blog/${article.id}`)}
                >
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className="article-content">
                    <div className="article-date">{article.date}</div>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-subtitle">{article.subtitle}</p>
                    <button 
                      className="article-read-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/blog/${article.id}`);
                      }}
                    >
                      Citește mai mult →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="slideshow-controls">
              <button className="slide-btn prev-btn" onClick={prevSlide}>
                <span>‹</span>
              </button>
              <button className="slide-btn next-btn" onClick={nextSlide}>
                <span>›</span>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="slide-indicators">
              {Array.from({ length: Math.ceil(articles.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <section 
        id="stay-connected-section"
        className="stay-connected-section"
        style={{
          backgroundImage: `url('/images/Group8750.webp')`
        }}
      >
        <div className="stay-connected-overlay"></div>
        <div className="stay-connected-content">
          {sectionsLoading ? (
            <div>Loading stay connected section...</div>
          ) : stayConnectedSection ? (
            <>
              <h2 className="stay-connected-title" style={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'slideInUp 0.8s ease-out forwards'
              }}>
                {stayConnectedSection.title} <span className="highlight">{stayConnectedSection.highlightedTitle}</span>
              </h2>
              <div style={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: 'slideInUp 0.8s ease-out 0.2s forwards'
              }}>
                {stayConnectedSection.description && stayConnectedSection.description.split('\n').filter((paragraph: string) => paragraph.trim()).map((paragraph: string, index: number) => (
                  <p key={index} className={index === 0 ? "stay-connected-description" : "stay-connected-follow"}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </>
            ) : (
              <div>No stay connected content found.</div>
            )}
          <div className="social-media-buttons" style={{
            opacity: 0,
            transform: 'translateY(30px)',
            animation: 'slideInUp 0.8s ease-out 0.4s forwards'
          }}>
            {stayConnectedSection?.facebookUrl && (
              <a href={stayConnectedSection.facebookUrl} className="social-btn facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
            {stayConnectedSection?.linkedinUrl && (
              <a href={stayConnectedSection.linkedinUrl} className="social-btn linkedin" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {stayConnectedSection?.tiktokUrl && (
              <a href={stayConnectedSection.tiktokUrl} className="social-btn tiktok" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.294-1.986-1.294-3.338H12.73v14.97c0 1.14-.926 2.066-2.066 2.066s-2.066-.926-2.066-2.066.926-2.066 2.066-2.066c.222 0 .436.035.636.101V9.68a5.783 5.783 0 0 0-.636-.035c-3.176 0-5.757 2.581-5.757 5.757s2.581 5.757 5.757 5.757 5.757-2.581 5.757-5.757V7.709a9.84 9.84 0 0 0 3.33 1.393V5.562z"/>
                </svg>
              </a>
            )}
            {stayConnectedSection?.instagramUrl && (
              <a href={stayConnectedSection.instagramUrl} className="social-btn instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Discover Projects Section */}
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
    </div>
  );
};

export default Blog;
