export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  image: string;
  heroImage: string;
  excerpt: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      image?: string;
    }[];
    conclusion: string;
  };
  tags: string[];
  relatedArticles?: string[];
}

export const newsData: NewsArticle[] = [
  {
    id: "test-1",
    title: "Test 1",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "15 Decembrie 2024",
    author: "Echipa Holleman",
    image: "/images/slide1.webp",
    heroImage: "/images/projectslideshow.webp",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content: {
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      sections: [
        {
          title: "Section 1",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "/images/Nordex.webp"
        },
        {
          title: "Section 2",
          content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          image: "/images/Liebherr.webp"
        }
      ],
      conclusion: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
    },
    tags: ["Test", "Lorem", "Ipsum"],
    relatedArticles: ["test-2", "test-3"]
  },
  {
    id: "test-2",
    title: "Test 2",
    subtitle: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    date: "12 Decembrie 2024",
    author: "Maria Popescu",
    image: "/images/slide2.webp",
    heroImage: "/images/Group8728.webp",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    content: {
      introduction: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      sections: [
        {
          title: "Section A",
          content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
        },
        {
          title: "Section B",
          content: "Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        }
      ],
      conclusion: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    tags: ["Test", "Dolor", "Sit"],
    relatedArticles: ["test-1", "test-4"]
  },
  {
    id: "test-3",
    title: "Test 3",
    subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
    date: "10 Decembrie 2024",
    author: "Dr. Elena Vasilescu",
    image: "/images/slide3.webp",
    heroImage: "/images/section2.webp",
    excerpt: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    content: {
      introduction: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      sections: [
        {
          title: "Section X",
          content: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          image: "/images/Group8741.webp"
        },
        {
          title: "Section Y",
          content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        }
      ],
      conclusion: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt."
    },
    tags: ["Test", "Neque", "Porro"],
    relatedArticles: ["test-2", "test-4"]
  },
  {
    id: "test-4",
    title: "Test 4",
    subtitle: "At vero eos et accusamus et iusto odio dignissimos ducimus.",
    date: "8 Decembrie 2024",
    author: "Ing. Radu Georgescu",
    image: "/images/slide4.webp",
    heroImage: "/images/Group8742.webp",
    excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    content: {
      introduction: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.",
      sections: [
        {
          title: "Section Alpha",
          content: "Quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
          image: "/images/Group8743.webp"
        },
        {
          title: "Section Beta",
          content: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
        }
      ],
      conclusion: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    tags: ["Test", "Vero", "Accusamus"],
    relatedArticles: ["test-1", "test-3"]
  }
];

// Helper function to get article by ID
export const getArticleById = async (id: string): Promise<NewsArticle | undefined> => {
  const articles = await getAllArticles();
  return articles.find(article => article.id === id);
};

// Synchronous version that checks cache first
export const getArticleByIdSync = (id: string): NewsArticle | undefined => {
  const articles = strapiArticlesCache || newsData;
  return articles.find(article => article.id === id);
};

// Helper function to get related articles
export const getRelatedArticles = async (articleId: string): Promise<NewsArticle[]> => {
  const article = await getArticleById(articleId);
  if (!article || !article.relatedArticles) return [];
  
  const articles = await getAllArticles();
  return article.relatedArticles
    .map(id => articles.find(a => a.id === id))
    .filter((article): article is NewsArticle => article !== undefined)
    .slice(0, 3); // Limit to 3 related articles
};

// Synchronous version that checks cache first
export const getRelatedArticlesSync = (articleId: string): NewsArticle[] => {
  const articles = strapiArticlesCache || newsData;
  const article = articles.find(a => a.id === articleId);
  if (!article || !article.relatedArticles) return [];
  
  return article.relatedArticles
    .map(id => articles.find(a => a.id === id))
    .filter((article): article is NewsArticle => article !== undefined)
    .slice(0, 3); // Limit to 3 related articles
};


// Cache for Strapi articles
let strapiArticlesCache: NewsArticle[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Force clear cache function
export const clearArticlesCache = () => {
  strapiArticlesCache = null;
  cacheTimestamp = 0;
  console.log('Articles cache cleared!');
};

// Helper function to transform Strapi article data to our NewsArticle interface
const transformStrapiArticle = (strapiArticle: any): NewsArticle => {
  console.log('Transforming Strapi article:', strapiArticle);
  
  // Get hero image URL
          const heroImageUrl = strapiArticle.heroImage 
            ? `https://holleman-cms-production.up.railway.app${strapiArticle.heroImage.url}` 
            : '/images/projectslideshow.webp';

  // Use hero image as card image too (or you can add a separate image field)
          const cardImageUrl = strapiArticle.heroImage 
            ? `https://holleman-cms-production.up.railway.app${strapiArticle.heroImage.url}` 
            : '/images/slide1.webp';

  // Use the Content field as introduction (much simpler!)
  const introduction = strapiArticle.Content || 'Introduction coming soon...';
  
  // Only use ContentSection components from Strapi (with images)
  const sections = strapiArticle.ContentSection ? strapiArticle.ContentSection.map((section: any) => ({
    title: section.Title || section.title || 'Section',
    content: section.content || '',
            image: section.Media && section.Media.length > 0 
              ? `https://holleman-cms-production.up.railway.app${section.Media[0].url}` 
              : undefined
  })) : [];
  
  // Use the dedicated conclusion field
  const conclusion = strapiArticle.Concluzie || strapiArticle.conclusion || 'Conclusion coming soon...';

  // Parse tags
  const tags = strapiArticle.tags 
    ? strapiArticle.tags.split(',').map((tag: string) => tag.trim())
    : [];

  // Format date
  const formattedDate = strapiArticle.date 
    ? new Date(strapiArticle.date).toLocaleDateString('ro-RO', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString('ro-RO', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

  return {
    id: strapiArticle.slug || strapiArticle.documentId,
    title: strapiArticle.Title || 'Untitled Article',
    subtitle: strapiArticle.Subtitle || '',
    date: formattedDate,
    author: strapiArticle.Author || 'Echipa Holleman',
    image: cardImageUrl,
    heroImage: heroImageUrl,
    excerpt: strapiArticle.excerpt || '',
    content: {
      introduction,
      sections,
      conclusion
    },
    tags,
    relatedArticles: [] // We'll populate this separately if needed
  };
};

// Function to fetch articles from Strapi
const fetchStrapiArticles = async (): Promise<NewsArticle[]> => {
  try {
            const response = await fetch('https://holleman-cms-production.up.railway.app/api/articles?populate[0]=ContentSection&populate[1]=ContentSection.Media&populate[2]=heroImage&populate[3]=Seo');
    
    if (!response.ok) {
      console.warn('Failed to fetch articles from Strapi, using static data');
      return newsData;
    }

    const data = await response.json();
    console.log('Strapi Articles Data:', data);

    if (data.data && Array.isArray(data.data)) {
      const transformedArticles = data.data.map(transformStrapiArticle);
      
      // Add related articles logic (simple: get other articles)
      transformedArticles.forEach((article: NewsArticle) => {
        const relatedArticles = transformedArticles
          .filter((a: NewsArticle) => a.id !== article.id)
          .slice(0, 3)
          .map((a: NewsArticle) => a.id);
        
        article.relatedArticles = relatedArticles;
      });

      return transformedArticles;
    }
    
    console.warn('Invalid Strapi response format, using static data');
    return newsData;
  } catch (error) {
    console.error('Error fetching articles from Strapi:', error);
    return newsData;
  }
};

// Async function to get all articles
export const getAllArticles = async (): Promise<NewsArticle[]> => {
  const now = Date.now();
  
  // Check if we have cached data and it's still valid
  if (strapiArticlesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return strapiArticlesCache;
  }

  // Fetch fresh data from Strapi
  const articles = await fetchStrapiArticles();
  
  // Update cache
  strapiArticlesCache = articles;
  cacheTimestamp = now;
  
  return articles;
};

// Synchronous version that returns cached data or static data
export const getAllArticlesSync = (): NewsArticle[] => {
  return strapiArticlesCache || newsData;
};

// Helper function to get latest articles
export const getLatestArticles = (limit: number = 6): NewsArticle[] => {
  const articles = getAllArticlesSync();
  return articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
