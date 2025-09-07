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
export const getArticleById = (id: string): NewsArticle | undefined => {
  return newsData.find(article => article.id === id);
};

// Helper function to get related articles
export const getRelatedArticles = (articleId: string): NewsArticle[] => {
  const article = getArticleById(articleId);
  if (!article || !article.relatedArticles) return [];
  
  return article.relatedArticles
    .map(id => getArticleById(id))
    .filter((article): article is NewsArticle => article !== undefined)
    .slice(0, 3); // Limit to 3 related articles
};


// Helper function to get latest articles
export const getLatestArticles = (limit: number = 6): NewsArticle[] => {
  return newsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
