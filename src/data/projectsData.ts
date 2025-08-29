export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  division: 'heavy-lift' | 'project-cargo' | 'itl' | 'agro';
  gallery: {
    images: string[];
    mainImage: string;
  };
  description: {
    paragraphs: string[];
  };
  relatedProjects: {
    id: string;
    title: string;
    image: string;
    division: string;
  }[];
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
  };
}

export const projectsData: ProjectData[] = [
  {
    id: 'transport-agabaritic-industria-petroliera',
    title: 'Transport agabaritic in industria petroliera',
    subtitle: 'Doua camere de cocsare',
    division: 'project-cargo',
    gallery: {
      mainImage: '/images/projectcargo.webp',
      images: [
        '/images/projectcargo.webp',
        '/images/slide1.webp',
        '/images/slide2.webp',
        '/images/slide3.webp',
        '/images/slide4.webp'
      ]
    },
    description: {
      paragraphs: [
        'Industria transporturilor agabaritice este plina de provocari. Unele sunt mai speciale deoarece ne determina sa gasim solutii inventive.',
        'Recent, am primit cea mai mare provocare din cei 25 de ani de activitate in domeniu: Holleman a trebuit sa transporte doua camere de cocsare, specifice industriei petroliere dar de dimensiuni impresionante. Cele doua camere au fost produse de compania Walter Tosto. Ele au fost preluate din incinta fostului FECNE, de langa platforma cunoscuta in trecut drept IMGB.',
        'Camerele de cocsare au avut destinatie finala rafinaria de la Brazi. Transporturile au fost considerate de importanta nationala, asadar incarcaturile au fost asistate de echipaje ale Politiei Romane, vehicule insotitoare de transport agabaritic dar si echipe de specialisti ale retelelor de electricitate si comunicatii. Acestia din urma au executat lucrari specifice, unde a fost necesar.',
        'Dimensiunile camerelor de cocsare:<br/>• 47 de metri în lungime<br/>• 8.2 metri înălțime<br/>• 7 metri lățime<br/>• Fiecare cameră a avut o greutate de 185 de tone',
        'Greutatea incarcaturii totale a fost de 364 de tone (insemnand incarcatura cu trailer si remorchere). Dimensiunile impresionante ale transportului si importanta sa, a insemnat o planificare atenta, inceputa inainte de inceperea operatiunii.',
        'Directorul general Holleman Romania, George Nita a mentionat ca „pregatirile pentru acest transport au durat mai bine de trei luni si au avut nevoie de un proiect tehnic de traseu, proiect realizat de catre un specialist in domeniu (Ion Cociorva) si avizat de Ministerul Transporturilor (CNAIR) si de IGPR.”',
        'In ceea ce priveste complexitatea transportului, cea mai complicata sectiune a fost trecerea de autostrada A2, la deplasarea pe Soseaua de Centura. Transportul a avut nevoie de un proiect de management al traficului, care a fost aprobat de catre seful Biroului Politia Autostrada Soarelui, seful IGPR si de directorul DRDP Bucuresti.',
        'Holleman a gasit si organizat un traseu posibil, care uneste zona industriala a Bucurestiului cu Rafinaria Petrobrazi, via Urziceni. Convoiul si-a indeplinit sarcina iar clientul a fost multumit de rezultatele finale.',
        'Echipa Holleman a fost compusa din 3 soferi heavy, 4 soferi insotire, 6 oameni de service, 2 specialisti in echipamente heavy, 1 sofer de rezerva, 1 stivuitorist, 4 oameni pentru lucrarile de balizare si 2 manageri.',
        'Pentru savarsirea transportului, au fost utilizate trei remorchere Mercedes-Benz Actros Titan si trailer format din 2 trailere cu configuratia 14 x 8 (224 de roti cu o sarcina de 1.2 tona/roata). Impresionant!'
      ]
    },
    relatedProjects: [
      {
        id: 'transport-200-tone',
        title: 'Transport impresionant de 200 de tone',
        image: '/images/itl.webp',
        division: 'ITL'
      },
      {
        id: 'heavy-lift-echipament-industrial',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        image: '/images/heavylift.webp',
        division: 'Heavy Lift'
      },
      {
        id: 'project-cargo-energie',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        image: '/images/slide2.webp',
        division: 'Project Cargo'
      }
    ],
    seo: {
      title: 'Transport Agabaritic Industria Petroliferă - Camere de Cocsare | Holleman',
      description: 'Studiu de caz: transport agabaritic pentru industria petroliferă - două camere de cocsare. Soluții specializate pentru echipamente petrochimice cu Holleman.',
      canonicalUrl: 'https://holleman.ro/proiecte/transport-agabaritic-industria-petroliera'
    }
  },
  {
    id: 'transport-200-tone',
    title: 'Transport impresionant de 200 de tone',
    subtitle: 'operațiune de transport internațional',
    division: 'itl',
    gallery: {
      mainImage: '/images/itl.webp',
      images: [
        '/images/itl.webp',
        '/images/slide4.webp',
        '/images/slide5.webp',
        '/images/slide6.webp',
        '/images/slide1.webp'
      ]
    },
    description: {
      paragraphs: [
        'Operațiunea de transport internațional pentru echipamente industriale de dimensiuni excepționale reprezintă una dintre cele mai complexe misiuni pe care le-am gestionat.',
        'Transportul a 200 de tone de echipamente specializate a necesitat coordonarea între multiple țări, obținerea autorizațiilor speciale și planificarea unui traseu optim.',
        'Echipa ITL a colaborat îndeaproape cu autoritățile din fiecare țară pentru a asigura traversarea frontierelor fără întârzieri și cu respectarea tuturor reglementărilor.',
        'Utilizând tehnologia de transport multimodal, am combinat transportul rutier cu cel feroviar pentru a optimiza eficiența și a reduce costurile.',
        'Proiectul s-a finalizat cu succes, demonstrând expertiza noastră în gestionarea transporturilor internaționale de mare complexitate.'
      ]
    },
    relatedProjects: [
      {
        id: 'transport-agabaritic-industria-petroliera',
        title: 'Transport agabaritic in industria petroliera',
        image: '/images/projectcargo.webp',
        division: 'Project Cargo'
      },
      {
        id: 'heavy-lift-echipament-industrial',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        image: '/images/heavylift.webp',
        division: 'Heavy Lift'
      },
      {
        id: 'agro-specializat',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        image: '/images/agro.webp',
        division: 'Agro'
      }
    ],
    seo: {
      title: 'Transport 200 Tone - Operațiune Internațională ITL | Holleman',
      description: 'Studiu de caz: transport internațional de 200 tone echipamente industriale. Soluții ITL multimodale pentru transporturi excepționale.',
      canonicalUrl: 'https://holleman.ro/proiecte/transport-200-tone'
    }
  },
  {
    id: 'heavy-lift-echipament-industrial',
    title: 'Lorem ipsum dolor sit amet, consectetur',
    subtitle: 'relocare complexă de echipamente industriale',
    division: 'heavy-lift',
    gallery: {
      mainImage: '/images/heavylift.webp',
      images: [
        '/images/heavylift.webp',
        '/images/source/heavyliftex1.webp',
        '/images/source/heavyliftex2.webp',
        '/images/source/heavyliftex3.webp',
        '/images/source/flota.webp'
      ]
    },
    description: {
      paragraphs: [
        'Relocarea complexă de echipamente industriale cu macarale specializate și logistică avansată reprezintă una dintre competențele noastre de bază.',
        'Acest proiect a implicat utilizarea sistemelor hidraulice mobile și a tehnologiilor de transport specializate pentru relocarea unor echipamente de mari dimensiuni.',
        'Echipa Heavy Lift a dezvoltat soluții inovatoare pentru navigarea în spații restrânse și pentru poziționarea precisă a echipamentelor.',
        'Utilizând portale hidraulice mobile de mare capacitate și cărucioare modulare cu role de transport, am reușit să finalizăm relocarea în condiții de siguranță maximă.',
        'Proiectul demonstrează capacitatea noastră de a adapta soluțiile la specificul fiecărui amplasament și la cerințele tehnice ale clientului.'
      ]
    },
    relatedProjects: [
      {
        id: 'transport-agabaritic-industria-petroliera',
        title: 'Transport agabaritic in industria petroliera',
        image: '/images/projectcargo.webp',
        division: 'Project Cargo'
      },
      {
        id: 'transport-200-tone',
        title: 'Transport impresionant de 200 de tone',
        image: '/images/itl.webp',
        division: 'ITL'
      },
      {
        id: 'project-cargo-energie',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        image: '/images/slide5.webp',
        division: 'Project Cargo'
      }
    ],
    seo: {
      title: 'Heavy Lift - Relocare Echipamente Industriale | Holleman',
      description: 'Studiu de caz: relocare complexă echipamente industriale cu macarale specializate. Soluții Heavy Lift pentru operațiuni de mare complexitate.',
      canonicalUrl: 'https://holleman.ro/proiecte/heavy-lift-echipament-industrial'
    }
  },
  {
    id: 'agro-specializat',
    title: 'Lorem ipsum dolor sit amet, consectetur',
    subtitle: 'servicii specializate pentru sectorul agricol',
    division: 'agro',
    gallery: {
      mainImage: '/images/agro.webp',
      images: [
        '/images/agro.webp',
        '/images/slide3.webp',
        '/images/slide6.webp',
        '/images/slide1.webp',
        '/images/slide2.webp'
      ]
    },
    description: {
      paragraphs: [
        'Serviciile specializate pentru sectorul agricol cu echipamente adaptate și soluții eficiente reprezintă o nouă direcție de dezvoltare pentru Holleman.',
        'În acest proiect, am dezvoltat soluții de transport și logistică specifice pentru echipamentele agricole moderne, care necesită manipulare specială.',
        'Echipa Holleman Agro a colaborat cu producători de echipamente agricole pentru a dezvolta protocoale de transport optimizate.',
        'Utilizând remorci specializate și sisteme de fixare adaptate, am asigurat transportul în siguranță al echipamentelor sensibile.',
        'Proiectul a demonstrat capacitatea noastră de a ne adapta la cerințele specifice ale sectorului agricol și de a oferi soluții inovatoare.'
      ]
    },
    relatedProjects: [
      {
        id: 'transport-200-tone',
        title: 'Transport impresionant de 200 de tone',
        image: '/images/itl.webp',
        division: 'ITL'
      },
      {
        id: 'heavy-lift-echipament-industrial',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        image: '/images/slide4.webp',
        division: 'Heavy Lift'
      },
      {
        id: 'transport-agabaritic-industria-petroliera',
        title: 'Transport agabaritic in industria petroliera',
        image: '/images/projectcargo.webp',
        division: 'Project Cargo'
      }
    ],
    seo: {
      title: 'Holleman Agro - Servicii Specializate Sectorul Agricol',
      description: 'Studiu de caz: servicii specializate pentru sectorul agricol. Soluții de transport și logistică pentru echipamente agricole moderne.',
      canonicalUrl: 'https://holleman.ro/proiecte/agro-specializat'
    }
  },
  {
    id: 'project-cargo-energie',
    title: 'Lorem ipsum dolor sit amet, consectetur',
    subtitle: 'gestionarea proiectelor de transport agabaritic',
    division: 'project-cargo',
    gallery: {
      mainImage: '/images/slide2.webp',
      images: [
        '/images/slide2.webp',
        '/images/slide5.webp',
        '/images/projectcargo.webp',
        '/images/slide3.webp',
        '/images/slide4.webp'
      ]
    },
    description: {
      paragraphs: [
        'Gestionarea proiectelor de transport agabaritic cu planificare detaliată și execuție impecabilă este marca distinctivă a serviciilor noastre Project Cargo.',
        'Acest proiect a implicat coordonarea multiplelor echipe și gestionarea unor componente pentru industria energetică de mari dimensiuni.',
        'Echipa noastră a dezvoltat un plan de proiect comprehensive, incluzând analiza de risc, planificarea resurselor și coordonarea cu toți stakeholders.',
        'Utilizând cele mai avansate tehnologii de management de proiect și sisteme de tracking în timp real, am asigurat transparența completă pentru client.',
        'Finalizarea cu succes a proiectului în termenele stabilite demonstrează expertiza noastră în gestionarea proiectelor complexe de transport agabaritic.'
      ]
    },
    relatedProjects: [
      {
        id: 'transport-agabaritic-industria-petroliera',
        title: 'Transport agabaritic in industria petroliera',
        image: '/images/projectcargo.webp',
        division: 'Project Cargo'
      },
      {
        id: 'transport-200-tone',
        title: 'Transport impresionant de 200 de tone',
        image: '/images/itl.webp',
        division: 'ITL'
      },
      {
        id: 'heavy-lift-echipament-industrial',
        title: 'Lorem ipsum dolor sit amet, consectetur',
        image: '/images/heavylift.webp',
        division: 'Heavy Lift'
      }
    ],
    seo: {
      title: 'Project Cargo Energie - Management Transport Agabaritic | Holleman',
      description: 'Studiu de caz: gestionarea proiectelor transport agabaritic pentru industria energetică. Planificare detaliată și execuție impecabilă.',
      canonicalUrl: 'https://holleman.ro/proiecte/project-cargo-energie'
    }
  },
  {
    id: 'heavy-lift-turbina-eoliana',
    title: 'Transport turbină eoliană 150 tone',
    subtitle: 'operațiune heavy lift complexă',
    division: 'heavy-lift',
    gallery: {
      mainImage: '/images/source/heavyliftex4.webp',
      images: [
        '/images/source/heavyliftex4.webp',
        '/images/source/heavyliftex1.webp',
        '/images/source/heavyliftex2.webp',
        '/images/heavylift.webp',
        '/images/slide6.webp'
      ]
    },
    description: {
      paragraphs: [
        'Transportul unei turbine eoliene de 150 de tone reprezintă una dintre cele mai complexe operațiuni Heavy Lift pe care le-am realizat.',
        'Proiectul a necesitat utilizarea celor mai avansate echipamente de ridicare și transport, incluzând macarale hidraulice mobile de mare capacitate.',
        'Echipa noastră a dezvoltat un plan detaliat pentru demontarea, transportul și remontarea turbinei în noua locație.',
        'Utilizând sisteme de ridicare hidraulică și cărucioare modulare specializate, am reușit să finalizăm operațiunea în siguranță completă.',
        'Acest proiect demonstrează expertiza noastră în gestionarea echipamentelor de mari dimensiuni pentru industria energiei regenerabile.'
      ]
    },
    relatedProjects: [
      {
        id: 'transport-agabaritic-industria-petroliera',
        title: 'Transport agabaritic in industria petroliera',
        image: '/images/projectcargo.webp',
        division: 'Project Cargo'
      },
      {
        id: 'itl-container-special',
        title: 'Transport container special ITL',
        image: '/images/slide1.webp',
        division: 'ITL'
      },
      {
        id: 'agro-combine-moderne',
        title: 'Transport echipamente agricole moderne',
        image: '/images/agro.webp',
        division: 'Agro'
      }
    ],
    seo: {
      title: 'Heavy Lift Turbină Eoliană 150 Tone | Holleman',
      description: 'Studiu de caz: transport Heavy Lift turbină eoliană 150 tone. Operațiune complexă cu echipamente specializate pentru energia regenerabilă.',
      canonicalUrl: 'https://holleman.ro/proiecte/heavy-lift-turbina-eoliana'
    }
  },
  {
    id: 'itl-container-special',
    title: 'Transport container special ITL',
    subtitle: 'logistică internațională avansată',
    division: 'itl',
    gallery: {
      mainImage: '/images/slide1.webp',
      images: [
        '/images/slide1.webp',
        '/images/itl.webp',
        '/images/slide2.webp',
        '/images/slide6.webp',
        '/images/source/heavyliftex3.webp'
      ]
    },
    description: {
      paragraphs: [
        'Transportul internațional de containere speciale necesită expertise în logistica multimodală și coordonarea complexă între multiple țări.',
        'Acest proiect ITL a implicat transportul unui container special cu echipamente sensibile pe ruta Europa Centrală - Europa de Est.',
        'Echipa noastră a coordonat toate aspectele: documentația vamală, autorizațiile de tranzit și planificarea rutei optime.',
        'Utilizând o combinație de transport rutier și feroviar, am optimizat costurile și timpii de livrare.',
        'Proiectul s-a finalizat cu succes, respectând toate termenele și cerințele specifice ale clientului.'
      ]
    },
    relatedProjects: [
      {
        id: 'heavy-lift-turbina-eoliana',
        title: 'Transport turbină eoliană 150 tone',
        image: '/images/source/heavyliftex4.webp',
        division: 'Heavy Lift'
      },
      {
        id: 'project-cargo-petrolier',
        title: 'Echipament petrochimie complex',
        image: '/images/slide5.webp',
        division: 'Project Cargo'
      },
      {
        id: 'agro-combine-moderne',
        title: 'Transport echipamente agricole moderne',
        image: '/images/agro.webp',
        division: 'Agro'
      }
    ],
    seo: {
      title: 'ITL Container Special - Transport Internațional | Holleman',
      description: 'Studiu de caz: transport ITL container special cu logistică internațională avansată. Soluții multimodale pentru transporturi complexe.',
      canonicalUrl: 'https://holleman.ro/proiecte/itl-container-special'
    }
  },
  {
    id: 'agro-combine-moderne',
    title: 'Transport echipamente agricole moderne',
    subtitle: 'soluții specializate pentru agricultură',
    division: 'agro',
    gallery: {
      mainImage: '/images/agro.webp',
      images: [
        '/images/agro.webp',
        '/images/slide4.webp',
        '/images/slide1.webp',
        '/images/slide3.webp',
        '/images/source/flota.webp'
      ]
    },
    description: {
      paragraphs: [
        'Transportul echipamentelor agricole moderne necesită soluții specializate adaptate la specificul și sensibilitatea acestor utilaje.',
        'În acest proiect Holleman Agro, am gestionat transportul unei game complete de combine și tractoare de ultimă generație.',
        'Echipa noastră a dezvoltat protocoale speciale de fixare și protecție pentru a preveni deteriorarea echipamentelor sensibile.',
        'Utilizând remorci specializate cu sisteme de suspensie adaptate, am asigurat transportul în condiții optime.',
        'Proiectul demonstrează capacitatea noastră de a ne adapta la cerințele specifice ale sectorului agricol modern.'
      ]
    },
    relatedProjects: [
      {
        id: 'heavy-lift-turbina-eoliana',
        title: 'Transport turbină eoliană 150 tone',
        image: '/images/source/heavyliftex4.webp',
        division: 'Heavy Lift'
      },
      {
        id: 'itl-container-special',
        title: 'Transport container special ITL',
        image: '/images/slide1.webp',
        division: 'ITL'
      },
      {
        id: 'project-cargo-petrolier',
        title: 'Echipament petrochimie complex',
        image: '/images/slide5.webp',
        division: 'Project Cargo'
      }
    ],
    seo: {
      title: 'Agro Echipamente Moderne - Transport Specializat | Holleman',
      description: 'Studiu de caz: transport echipamente agricole moderne cu soluții specializate. Holleman Agro pentru agricultura de performanță.',
      canonicalUrl: 'https://holleman.ro/proiecte/agro-combine-moderne'
    }
  },
  {
    id: 'project-cargo-petrolier',
    title: 'Echipament petrochimie complex',
    subtitle: 'transport agabaritic pentru rafinării',
    division: 'project-cargo',
    gallery: {
      mainImage: '/images/slide5.webp',
      images: [
        '/images/slide5.webp',
        '/images/projectcargo.webp',
        '/images/slide2.webp',
        '/images/slide4.webp',
        '/images/source/heavyliftex2.webp'
      ]
    },
    description: {
      paragraphs: [
        'Transportul echipamentelor pentru industria petrochimică necesită cel mai înalt nivel de specializare și siguranță.',
        'Acest proiect Project Cargo a implicat transportul unei coloane de distilare de mari dimensiuni pentru o rafinărie modernă.',
        'Echipa noastră a coordonat toate aspectele: analiza rutei, obținerea permiselor speciale și escort-ul specializat.',
        'Utilizând cel mai avansat sistem de transport agabaritic, am reușit să navigăm prin zone urbane dense și pe autostrăzi.',
        'Finalizarea cu succes a acestui proiect confirmă poziția Holleman ca lider în transportul echipamentelor petrochimice.'
      ]
    },
    relatedProjects: [
      {
        id: 'transport-agabaritic-industria-petroliera',
        title: 'Transport agabaritic in industria petroliera',
        image: '/images/projectcargo.webp',
        division: 'Project Cargo'
      },
      {
        id: 'heavy-lift-turbina-eoliana',
        title: 'Transport turbină eoliană 150 tone',
        image: '/images/source/heavyliftex4.webp',
        division: 'Heavy Lift'
      },
      {
        id: 'itl-multimodal-europa',
        title: 'Transport multimodal Europa',
        image: '/images/slide3.webp',
        division: 'ITL'
      }
    ],
    seo: {
      title: 'Project Cargo Petrochimie - Echipament Complex | Holleman',
      description: 'Studiu de caz: transport Project Cargo echipament petrochimie complex. Soluții agabaritice pentru industria de rafinare.',
      canonicalUrl: 'https://holleman.ro/proiecte/project-cargo-petrolier'
    }
  },
  {
    id: 'itl-multimodal-europa',
    title: 'Transport multimodal Europa',
    subtitle: 'logistică avansată rutier-feroviar',
    division: 'itl',
    gallery: {
      mainImage: '/images/slide3.webp',
      images: [
        '/images/slide3.webp',
        '/images/itl.webp',
        '/images/slide6.webp',
        '/images/slide1.webp',
        '/images/source/heavyliftex1.webp'
      ]
    },
    description: {
      paragraphs: [
        'Transportul multimodal în Europa necesită coordonarea perfectă între diferite moduri de transport și sisteme logistice.',
        'Acest proiect ITL a combinat transportul rutier cu cel feroviar pentru optimizarea costurilor și timpilor de tranzit.',
        'Echipa noastră a gestionat coordonarea între terminalele intermodale și operatorii feroviari din 5 țări europene.',
        'Utilizând tehnologia de tracking în timp real, clientul a avut vizibilitate completă asupra întregului transport.',
        'Proiectul demonstrează expertiza Holleman în orchestrarea soluțiilor logistice complexe la nivel european.'
      ]
    },
    relatedProjects: [
      {
        id: 'transport-200-tone',
        title: 'Transport impresionant de 200 de tone',
        image: '/images/itl.webp',
        division: 'ITL'
      },
      {
        id: 'project-cargo-petrolier',
        title: 'Echipament petrochimie complex',
        image: '/images/slide5.webp',
        division: 'Project Cargo'
      },
      {
        id: 'heavy-lift-industrial-relocare',
        title: 'Relocare industrială completă',
        image: '/images/source/heavyliftex3.webp',
        division: 'Heavy Lift'
      }
    ],
    seo: {
      title: 'ITL Multimodal Europa - Transport Rutier-Feroviar | Holleman',
      description: 'Studiu de caz: transport ITL multimodal Europa cu logistică rutier-feroviar avansată. Soluții integrate pentru eficiență maximă.',
      canonicalUrl: 'https://holleman.ro/proiecte/itl-multimodal-europa'
    }
  },
  {
    id: 'heavy-lift-industrial-relocare',
    title: 'Relocare industrială completă',
    subtitle: 'mutarea unei linii de producție',
    division: 'heavy-lift',
    gallery: {
      mainImage: '/images/source/heavyliftex3.webp',
      images: [
        '/images/source/heavyliftex3.webp',
        '/images/source/heavyliftex5.webp',
        '/images/heavylift.webp',
        '/images/source/flota.webp',
        '/images/slide4.webp'
      ]
    },
    description: {
      paragraphs: [
        'Relocarea unei linii complete de producție reprezintă una dintre cele mai complexe operațiuni Heavy Lift din portofoliul nostru.',
        'Proiectul a implicat demontarea, transportul și remontarea a peste 200 de componente industriale în noua locație.',
        'Echipa Holleman a coordonat operațiunea timp de 6 luni, utilizând echipamente specializate și personal tehnic expert.',
        'Fiecare componentă a fost catalogată, protejată și transportată conform protocoalelor stricte de siguranță.',
        'Finalizarea cu succes a acestui proiect confirmă capacitatea noastră de a gestiona relocări industriale de amploare.'
      ]
    },
    relatedProjects: [
      {
        id: 'heavy-lift-turbina-eoliana',
        title: 'Transport turbină eoliană 150 tone',
        image: '/images/source/heavyliftex4.webp',
        division: 'Heavy Lift'
      },
      {
        id: 'project-cargo-petrolier',
        title: 'Echipament petrochimie complex',
        image: '/images/slide5.webp',
        division: 'Project Cargo'
      },
      {
        id: 'agro-parc-masini',
        title: 'Transport parc mașini agricole',
        image: '/images/slide6.webp',
        division: 'Agro'
      }
    ],
    seo: {
      title: 'Heavy Lift Relocare Industrială - Linie Producție | Holleman',
      description: 'Studiu de caz: relocare industrială completă Heavy Lift. Transport și remontare linie de producție cu echipamente specializate.',
      canonicalUrl: 'https://holleman.ro/proiecte/heavy-lift-industrial-relocare'
    }
  },
  {
    id: 'agro-parc-masini',
    title: 'Transport parc mașini agricole',
    subtitle: 'soluții complete pentru ferme moderne',
    division: 'agro',
    gallery: {
      mainImage: '/images/slide6.webp',
      images: [
        '/images/slide6.webp',
        '/images/agro.webp',
        '/images/slide2.webp',
        '/images/slide4.webp',
        '/images/source/heavyliftex5.webp'
      ]
    },
    description: {
      paragraphs: [
        'Transportul unui parc complet de mașini agricole pentru o fermă modernă de mari dimensiuni a necesitat planificare meticuloasă.',
        'Proiectul Holleman Agro a inclus transportul a 15 tractoare, 8 combine și diverse echipamente auxiliare.',
        'Echipa noastră a dezvoltat un sistem de organizare și transport care să minimizeze timpii de încărcare și descărcare.',
        'Utilizând remorci multiple și coordinare sincronizată, am reușit să finalizăm transportul în doar 3 zile.',
        'Acest proiect demonstrează capacitatea noastră de a gestiona operațiuni logistice complexe în sectorul agricol.'
      ]
    },
    relatedProjects: [
      {
        id: 'agro-combine-moderne',
        title: 'Transport echipamente agricole moderne',
        image: '/images/agro.webp',
        division: 'Agro'
      },
      {
        id: 'heavy-lift-industrial-relocare',
        title: 'Relocare industrială completă',
        image: '/images/source/heavyliftex3.webp',
        division: 'Heavy Lift'
      },
      {
        id: 'itl-multimodal-europa',
        title: 'Transport multimodal Europa',
        image: '/images/slide3.webp',
        division: 'ITL'
      }
    ],
    seo: {
      title: 'Agro Parc Mașini Agricole - Transport Complet | Holleman',
      description: 'Studiu de caz: transport parc complet mașini agricole. Soluții Holleman Agro pentru ferme moderne de mari dimensiuni.',
      canonicalUrl: 'https://holleman.ro/proiecte/agro-parc-masini'
    }
  }
];

export const getProjectById = (id: string): ProjectData | undefined => {
  return projectsData.find(project => project.id === id);
};

export const getRelatedProjects = (currentProjectId: string, division?: string): ProjectData[] => {
  return projectsData
    .filter(project => project.id !== currentProjectId)
    .filter(project => !division || project.division === division);
};

export const getAllProjects = (): ProjectData[] => {
  return projectsData;
};
