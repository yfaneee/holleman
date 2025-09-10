// Search data structure for site-wide search functionality
export interface SearchableItem {
  id: string;
  title: string;
  description?: string;
  keywords: string[];
  route: string;
  sectionId?: string;
  category: 'service' | 'page' | 'project' | 'section';
}

export const searchableContent: SearchableItem[] = [
  // Main Services
  {
    id: 'project-cargo',
    title: 'Project Cargo',
    description: 'Management de proiect, inginerie de transport, transport multimodal, logistica site',
    keywords: ['project cargo', 'management proiect', 'inginerie transport', 'multimodal', 'logistica site', 'echipamente industriale'],
    route: '/project-cargo',
    category: 'service'
  },
  {
    id: 'itl',
    title: 'ITL - Transport Internațional',
    description: 'Servicii complete de transport și logistică internă și internațională',
    keywords: ['itl', 'transport international', 'logistica', 'FTL', 'LTL', 'transport rutier', 'transport naval'],
    route: '/itl',
    category: 'service'
  },
  {
    id: 'heavy-lift',
    title: 'Heavy Lift',
    description: 'Relocări industriale cu echipamente specializate și oameni experimentați în domeniu',
    keywords: ['heavy lift', 'relocari industriale', 'echipamente specializate', 'relocari', 'mutari industriale'],
    route: '/heavy-lift',
    category: 'service'
  },
  {
    id: 'agro',
    title: 'Agro',
    description: 'Servicii specializate pentru sectorul agricol',
    keywords: ['agro', 'agricol', 'agricultura', 'servicii agricole'],
    route: '/agro',
    category: 'service'
  },

  // Project Cargo Sections
  {
    id: 'project-cargo-services',
    title: 'Servicii Project Cargo',
    description: 'Management de proiect, inginerie de transport, autorizații, transport multimodal',
    keywords: ['servicii project cargo', 'management proiect', 'inginerie transport', 'autorizatii', 'asigurari', 'multimodal', 'logistica site', 'gestiune riscuri'],
    route: '/project-cargo',
    sectionId: 'services-section',
    category: 'section'
  },
  {
    id: 'domenii-expertiza',
    title: 'Domenii de expertiză',
    description: 'Energie, petrochimie, infrastructură, industrie, construcții',
    keywords: ['domenii expertiza', 'energie', 'turbine eoliene', 'petrochimie', 'infrastructura', 'industrie', 'constructii', 'generatoare', 'transformatoare'],
    route: '/project-cargo',
    sectionId: 'expertise-section',
    category: 'section'
  },

  // Despre Noi Sections
  {
    id: 'cine-suntem',
    title: 'Cine suntem - Valorile care ne definesc',
    description: 'Valorile și principiile companiei Holleman',
    keywords: ['cine suntem', 'valori', 'principii', 'despre noi', 'companie'],
    route: '/despre-noi',
    sectionId: 'cine-suntem',
    category: 'section'
  },
  {
    id: 'istoric',
    title: 'Istoric și evoluție',
    description: 'Istoria și dezvoltarea companiei Holleman de-a lungul anilor',
    keywords: ['istoric', 'evolutie', 'istorie', 'dezvoltare', 'experienta'],
    route: '/despre-noi',
    sectionId: 'istoric',
    category: 'section'
  },
  {
    id: 'misiune-viziune',
    title: 'Misiunea și viziunea noastră',
    description: 'Misiunea, viziunea și obiectivele companiei',
    keywords: ['misiune', 'viziune', 'obiective', 'strategie', 'directie'],
    route: '/despre-noi',
    sectionId: 'misiune-viziune',
    category: 'section'
  },
  {
    id: 'certificari-conformitate',
    title: 'Certificări și conformitate',
    description: 'Certificările și standardele de calitate respectate',
    keywords: ['certificari', 'conformitate', 'calitate', 'standarde', 'acreditari', 'ISO'],
    route: '/despre-noi',
    sectionId: 'certificari',
    category: 'section'
  },
  {
    id: 'conducerea',
    title: 'Conducerea grupului',
    description: 'Echipa de management și conducere',
    keywords: ['conducerea', 'management', 'echipa', 'lideri', 'directori'],
    route: '/despre-noi',
    sectionId: 'conducerea',
    category: 'section'
  },
  {
    id: 'responsabilitate-sociala',
    title: 'Responsabilitate Socială Corporativă',
    description: 'Implicarea în comunitate și responsabilitatea socială',
    keywords: ['responsabilitate sociala', 'CSR', 'comunitate', 'mediu', 'sustenabilitate'],
    route: '/despre-noi',
    sectionId: 'responsabilitate',
    category: 'section'
  },

  // Main Pages
  {
    id: 'proiecte',
    title: 'Proiecte',
    description: 'Portofoliul de proiecte realizate de Holleman',
    keywords: ['proiecte', 'portofoliu', 'realizari', 'case studies', 'exemple'],
    route: '/proiecte',
    category: 'page'
  },
  {
    id: 'blog',
    title: 'Blog & Știri',
    description: 'Articole și știri din industria transporturilor',
    keywords: ['blog', 'stiri', 'articole', 'noutati', 'industrie', 'transport'],
    route: '/blog',
    category: 'page'
  },
  {
    id: 'cariere',
    title: 'Cariere',
    description: 'Oportunități de carieră și locuri de muncă disponibile',
    keywords: ['cariere', 'joburi', 'locuri munca', 'angajari', 'oportunitati'],
    route: '/cariere',
    category: 'page'
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Informații de contact și formular pentru solicitări',
    keywords: ['contact', 'telefon', 'email', 'adresa', 'formular', 'solicitare', 'oferta'],
    route: '/contact',
    category: 'page'
  },

  // Specific expertise areas
  {
    id: 'energie-eoliana',
    title: 'Energie eoliană',
    description: 'Transport turbine eoliene și componente pentru energia verde',
    keywords: ['energie eoliana', 'turbine eoliene', 'generatoare', 'energie verde', 'regenerabila', 'vestas', 'nordex'],
    route: '/project-cargo',
    sectionId: 'expertise-section',
    category: 'section'
  },
  {
    id: 'petrochimie',
    title: 'Petrochimie',
    description: 'Transport echipamente petrochimice - coloane, rezervoare, schimbătoare',
    keywords: ['petrochimie', 'coloane', 'rezervoare', 'schimbatoare caldura', 'industrie petroliera'],
    route: '/project-cargo',
    sectionId: 'expertise-section',
    category: 'section'
  },
  {
    id: 'infrastructura',
    title: 'Infrastructură',
    description: 'Transport pentru proiecte de infrastructură și construcții majore',
    keywords: ['infrastructura', 'constructii', 'poduri', 'drumuri', 'proiecte majore'],
    route: '/project-cargo',
    sectionId: 'expertise-section',
    category: 'section'
  }
];

// Search function
export const searchContent = (query: string): SearchableItem[] => {
  if (!query || query.length < 2) return [];

  const searchLower = query.toLowerCase().trim();
  const results: { item: SearchableItem; score: number }[] = [];

  searchableContent.forEach(item => {
    let score = 0;

    // Exact title match gets highest score
    if (item.title.toLowerCase() === searchLower) {
      score += 100;
    }
    // Title contains search term
    else if (item.title.toLowerCase().includes(searchLower)) {
      score += 50;
    }

    // Check keywords
    item.keywords.forEach(keyword => {
      if (keyword.toLowerCase() === searchLower) {
        score += 80;
      } else if (keyword.toLowerCase().includes(searchLower)) {
        score += 30;
      }
    });

    // Check description
    if (item.description?.toLowerCase().includes(searchLower)) {
      score += 20;
    }

    // Add item to results if it has any score
    if (score > 0) {
      results.push({ item, score });
    }
  });

  // Sort by score (highest first) and return items
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Limit to top 10 results
    .map(result => result.item);
};

// Get autocomplete suggestions
export const getAutocompleteSuggestions = (query: string): string[] => {
  if (!query || query.length < 2) return [];

  const searchLower = query.toLowerCase().trim();
  const suggestions = new Set<string>();

  searchableContent.forEach(item => {
    // Add title if it matches
    if (item.title.toLowerCase().includes(searchLower)) {
      suggestions.add(item.title);
    }

    // Add matching keywords
    item.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(searchLower)) {
        suggestions.add(keyword);
      }
    });
  });

  return Array.from(suggestions).slice(0, 8);
};
