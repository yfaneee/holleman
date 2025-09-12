import { useState, useEffect, useCallback } from 'react';
import { translationService } from '../services/translationService';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const supportedLanguages: Language[] = [
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '/images/RO.webp' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '/images/icons/GBFlag.webp' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '/images/icons/DEFlag.webp' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '/images/icons/FRFlag.webp' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '/images/icons/ESFlag.webp' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '/images/icons/ITFlag.webp' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '/images/icons/HUflag.webp' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '/images/icons/BGflag.webp' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '/images/icons/SRflag.webp' }
];

export const useAITranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('selectedLanguage');
    return supportedLanguages.find(lang => lang.code === saved) || supportedLanguages[0];
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const [originalTexts, setOriginalTexts] = useState<Map<Element, string>>(new Map());
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // Store original Romanian text when first loading
  const storeOriginalTexts = useCallback(() => {
    const textElements = document.querySelectorAll('*:not(script):not(style)');
    const newOriginalTexts = new Map<Element, string>();
    
    // Texts that should never be translated (brand names, company names, etc.)
    const skipTranslation = [
      'HOLLEMAN',
      'Project Cargo',
      'Heavy Lift',
      'ITL',
      'Holleman Agro',
      'HOLLEMAN SPECIAL TRANSPORT & PROJECT CARGO SRL'
    ];
    
    textElements.forEach(element => {
      // Only store direct text content, not nested elements
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.parentElement === element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      let textContent = '';
      let node;
      while (node = walker.nextNode()) {
        textContent += node.textContent || '';
      }
      
      const trimmedText = textContent.trim();
      
      // Skip if text should not be translated
      if (trimmedText && !skipTranslation.includes(trimmedText)) {
        newOriginalTexts.set(element, trimmedText);
      }
    });
    
    setOriginalTexts(newOriginalTexts);
  }, []);

  // Translate all text on the page
  const translatePage = useCallback(async (targetLang: string) => {
    if (targetLang === 'ro') {
      // Restore original Romanian text
      originalTexts.forEach((originalText, element) => {
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              return node.parentElement === element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
          }
        );
        
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent) {
            node.textContent = originalText;
            break;
          }
        }
      });
      return;
    }

    setIsTranslating(true);
    
    try {
      // Get all text elements that need translation
      const textsToTranslate: { element: Element; text: string }[] = [];
      
      originalTexts.forEach((originalText, element) => {
        if (originalText.trim()) {
          textsToTranslate.push({ element, text: originalText });
        }
      });

      // Translate in batches to avoid overwhelming the API
      const batchSize = 10;
      for (let i = 0; i < textsToTranslate.length; i += batchSize) {
        const batch = textsToTranslate.slice(i, i + batchSize);
        const texts = batch.map(item => item.text);
        
        const translations = await translationService.translateBatch(texts, targetLang);
        
        // Apply translations to DOM
        batch.forEach((item, index) => {
          const translation = translations[index];
          if (translation && translation !== item.text) {
            const walker = document.createTreeWalker(
              item.element,
              NodeFilter.SHOW_TEXT,
              {
                acceptNode: (node) => {
                  return node.parentElement === item.element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
              }
            );
            
            let node;
            while (node = walker.nextNode()) {
              if (node.textContent) {
                node.textContent = translation;
                break;
              }
            }
          }
        });

        // Small delay between batches to be nice to the API
        if (i + batchSize < textsToTranslate.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  }, [originalTexts]);

  // Function to manually trigger re-storage of original texts (for route changes)
  const refreshOriginalTexts = useCallback(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Change language and trigger translation
  const changeLanguage = useCallback(async (languageCode: string) => {
    const language = supportedLanguages.find(lang => lang.code === languageCode);
    if (!language) return;

    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', languageCode);
    
    await translatePage(languageCode);
  }, [translatePage]);

  // Initialize original texts when component mounts or route changes
  useEffect(() => {
    // Clear previous original texts when route changes
    setOriginalTexts(new Map());
    
    // Store original texts after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      storeOriginalTexts();
    }, 1000);

    return () => clearTimeout(timer);
  }, [storeOriginalTexts, currentPath]);

  // Translate to current language when original texts are ready
  useEffect(() => {
    if (originalTexts.size > 0 && currentLanguage.code !== 'ro') {
      translatePage(currentLanguage.code);
    }
  }, [originalTexts, currentLanguage.code, translatePage]);

  return {
    currentLanguage,
    changeLanguage,
    isTranslating,
    supportedLanguages,
    translatePage,
    refreshOriginalTexts
  };
};
