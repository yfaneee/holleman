import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getArticleByIdSync, getRelatedArticlesSync, getAllArticles, clearArticlesCache } from '../data/newsData';
import './ArticlePage.css';

const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  // Helper function to format content with bullet points and line breaks
  const formatContent = (content: string) => {
    if (!content) return '';
    
    // Split content into lines for better processing
    const lines = content.split('\n');
    const processedLines: string[] = [];
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('- ')) {
        // Main bullet point
        if (!inList) {
          processedLines.push('<ul>');
          inList = true;
        }
        processedLines.push(`<li>${line.substring(2)}`);
        
        // Check if next lines are sub-bullets (start with spaces and -)
        let j = i + 1;
        const subItems: string[] = [];
        while (j < lines.length && lines[j].match(/^\s+- /)) {
          subItems.push(lines[j].trim().substring(2));
          j++;
        }
        
        if (subItems.length > 0) {
          processedLines.push('<ul>');
          subItems.forEach(subItem => {
            processedLines.push(`<li>${subItem}</li>`);
          });
          processedLines.push('</ul>');
          i = j - 1; // Skip the processed sub-items
        }
        
        processedLines.push('</li>');
      } else if (line === '') {
        // Empty line - close list if we're in one
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        processedLines.push('<br>');
      } else if (!line.match(/^\s+- /)) {
        // Regular text line (not a sub-bullet)
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (line) {
          processedLines.push(line);
        }
      }
    }
    
    // Close any open list
    if (inList) {
      processedLines.push('</ul>');
    }
    
    return processedLines
      .join('')
      // Clean up multiple consecutive <br> tags
      .replace(/(<br\s*\/?>){3,}/g, '<br><br>')
      // Clean up empty paragraphs
      .replace(/<br>\s*<br>/g, '</p><p>')
      // Wrap non-list content in paragraphs
      .replace(/^([^<].*?)(?=<ul>|$)/gm, '<p>$1</p>')
      .replace(/(<\/ul>)([^<].*?)(?=<ul>|$)/gm, '$1<p>$2</p>');
  };

  useEffect(() => {
    const fetchArticleData = async () => {
      if (articleId) {
        // First load from cache/static data for immediate display
        const cachedArticle = getArticleByIdSync(articleId);
        if (cachedArticle) {
          setArticle(cachedArticle);
          setRelatedArticles(getRelatedArticlesSync(articleId));
        }

        try {
          // Clear cache and fetch fresh data from Strapi
          clearArticlesCache();
          await getAllArticles(); // This will update the cache
          const articleData = getArticleByIdSync(articleId); // Get from updated cache
          
          if (articleData) {
            setArticle(articleData);
            setRelatedArticles(getRelatedArticlesSync(articleId));
            
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
        } catch (error) {
          console.error('Error fetching article:', error);
          // If there was an error and no cached article, redirect to blog
          if (!cachedArticle) {
            navigate('/blog');
          }
        }
      }
    };

    fetchArticleData();
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
              <div 
                className="introduction-text" 
                dangerouslySetInnerHTML={{ __html: formatContent(article.content.introduction) }}
              />
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
                  <div 
                    className="section-text" 
                    dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
                  />
                </div>
              </section>
            ))}

            {/* Conclusion */}
            <div className="article-conclusion">
              <h2 className="conclusion-title">Concluzie</h2>
              <div 
                className="conclusion-text" 
                dangerouslySetInnerHTML={{ __html: formatContent(article.content.conclusion) }}
              />
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
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://holleman.ro/blog/${articleId}`)}&quote=${encodeURIComponent(article.title)}`}
                    className="social-link" 
                    aria-label="Distribuie pe Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      const shareUrl = `https://holleman.ro/blog/${articleId}`;
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(article.title)}`,
                        'facebook-share',
                        'width=580,height=296'
                      );
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://holleman.ro/blog/${articleId}`)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.excerpt || article.title)}`}
                    className="social-link" 
                    aria-label="Distribuie pe LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      const shareUrl = `https://holleman.ro/blog/${articleId}`;
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.excerpt || article.title)}`,
                        'linkedin-share',
                        'width=520,height=570'
                      );
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <button 
                    className="social-link" 
                    aria-label="Copiază link"
                    onClick={() => {
                      const currentUrl = window.location.href;
                      
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(currentUrl).then(() => {
                          alert('Link-ul a fost copiat în clipboard!');
                        }).catch(() => {
                          prompt('Copiază acest link:', currentUrl);
                        });
                      } else {
                        prompt('Copiază acest link:', currentUrl);
                      }
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                  </button>
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
