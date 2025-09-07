import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getArticleById, getRelatedArticles } from '../data/newsData';
import './ArticlePage.css';

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    if (articleId) {
      const articleData = getArticleById(articleId);
      if (articleData) {
        setArticle(articleData);
        setRelatedArticles(getRelatedArticles(articleId));
        
        // Update SEO
        document.title = `${articleData.title} | Blog Holleman`;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', articleData.excerpt);
        }
        
        // Update canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', `https://holleman.ro/blog/${articleId}`);
      } else {
        // Article not found, redirect to blog
        navigate('/blog');
      }
    }
  }, [articleId, navigate]);

  if (!article) {
    return (
      <div className="article-page">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner">Se încarcă...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="article-page">
      <Header />
      
      {/* Article Hero Section */}
      <section 
        className="article-hero"
        style={{
          backgroundImage: `url('${article.heroImage}')`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="article-meta">
            <span className="article-date">{article.date}</span>
          </div>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-subtitle">{article.subtitle}</p>
          <div className="article-author">
            <span>Autor: {article.author}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="article-content-section">
        <div className="article-container">
          <div className="article-content">
            
            {/* Introduction */}
            <div className="article-introduction">
              <p className="introduction-text">{article.content.introduction}</p>
            </div>

            {/* Article Sections */}
            {article.content.sections.map((section: any, index: number) => (
              <section key={index} className="content-section">
                <h2 className="section-title">{section.title}</h2>
                <div className="section-content">
                  {section.image && (
                    <div className="section-image">
                      <img src={section.image} alt={section.title} />
                    </div>
                  )}
                  <p className="section-text">{section.content}</p>
                </div>
              </section>
            ))}

            {/* Conclusion */}
            <div className="article-conclusion">
              <h2 className="conclusion-title">Concluzie</h2>
              <p className="conclusion-text">{article.content.conclusion}</p>
            </div>

            {/* Tags */}
            <div className="article-tags">
              <h3>Etichete:</h3>
              <div className="tags-list">
                {article.tags.map((tag: string, index: number) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Article Sidebar */}
          <aside className="article-sidebar">
            <div className="sidebar-content">
              
              {/* Back to Blog */}
              <div className="back-to-blog">
                <button onClick={() => navigate('/blog')} className="back-btn">
                  ← Înapoi la Blog
                </button>
              </div>

              {/* Article Info */}
              <div className="article-info-card">
                <h3>Informații articol</h3>
                <div className="info-item">
                  <strong>Data publicării:</strong> {article.date}
                </div>
                <div className="info-item">
                  <strong>Autor:</strong> {article.author}
                </div>
              </div>

              {/* Share Article */}
              <div className="share-article">
                <h3>Distribuie articolul</h3>
                <div className="share-buttons">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="mailto:?" className="social-link" aria-label="Email">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="related-articles-section">
          <div className="related-container">
            <h2 className="related-title">Articole similare</h2>
            <div className="related-grid">
              {relatedArticles.map((relatedArticle) => (
                <div 
                  key={relatedArticle.id} 
                  className="related-card"
                  onClick={() => navigate(`/blog/${relatedArticle.id}`)}
                >
                  <div className="related-image">
                    <img src={relatedArticle.image} alt={relatedArticle.title} />
                  </div>
                  <div className="related-content">
                    <div className="related-date">{relatedArticle.date}</div>
                    <h3 className="related-article-title">{relatedArticle.title}</h3>
                    <p className="related-excerpt">{relatedArticle.excerpt.substring(0, 120)}...</p>
                    <button className="read-more-btn">Citește mai mult →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ArticlePage;
