import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  // Always include Home as the first breadcrumb
  const breadcrumbItems = [
    { label: 'Acasă', path: '/' },
    ...items
  ];

  // Create structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://holleman.ro${item.path}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: '20px 0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px'
        }}>
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} style={{ display: 'flex', alignItems: 'center' }}>
              {index < breadcrumbItems.length - 1 ? (
                <>
                  <Link 
                    to={item.path} 
                    style={{ 
                      color: '#136B38', 
                      textDecoration: 'none',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {item.label}
                  </Link>
                  <span style={{ margin: '0 8px', color: '#666' }}>›</span>
                </>
              ) : (
                <span style={{ color: '#666', fontWeight: 500 }}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;


