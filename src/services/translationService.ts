// Translation service for real-time AI translation
export interface TranslationCache {
  [key: string]: {
    [targetLang: string]: string;
  };
}

class TranslationService {
  private cache: TranslationCache = {};
  private apiKey: string | null = null;

  constructor() {
    // Load cache from localStorage
    const savedCache = localStorage.getItem('translationCache');
    if (savedCache) {
      try {
        this.cache = JSON.parse(savedCache);
      } catch (error) {
        console.warn('Failed to load translation cache:', error);
      }
    }
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  private saveCache() {
    try {
      localStorage.setItem('translationCache', JSON.stringify(this.cache));
    } catch (error) {
      console.warn('Failed to save translation cache:', error);
    }
  }

  private getCacheKey(text: string): string {
    return text.trim().toLowerCase();
  }

  // Check if translation exists in cache
  private getCachedTranslation(text: string, targetLang: string): string | null {
    const key = this.getCacheKey(text);
    return this.cache[key]?.[targetLang] || null;
  }

  // Save translation to cache
  private setCachedTranslation(text: string, targetLang: string, translation: string) {
    const key = this.getCacheKey(text);
    if (!this.cache[key]) {
      this.cache[key] = {};
    }
    this.cache[key][targetLang] = translation;
    this.saveCache();
  }

  // Google Translate API (free tier with limitations)
  private async translateWithGoogle(text: string, targetLang: string): Promise<string> {
    try {
      // Using the free Google Translate API endpoint
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ro&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );
      
      if (!response.ok) {
        throw new Error('Translation API request failed');
      }

      const data = await response.json();
      
      // Parse Google Translate response format
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        return data[0][0][0];
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.warn('Google Translate failed:', error);
      return text; // Return original text if translation fails
    }
  }

  // LibreTranslate API (free, open source alternative)
  private async translateWithLibre(text: string, targetLang: string): Promise<string> {
    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: 'ro',
          target: targetLang === 'en' ? 'en' : targetLang,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error('LibreTranslate API request failed');
      }

      const data = await response.json();
      return data.translatedText || text;
    } catch (error) {
      console.warn('LibreTranslate failed:', error);
      return text;
    }
  }

  // Main translation method
  async translate(text: string, targetLang: string): Promise<string> {
    // If target language is Romanian, return original text
    if (targetLang === 'ro' || !text.trim()) {
      return text;
    }

    // Check cache first
    const cached = this.getCachedTranslation(text, targetLang);
    if (cached) {
      return cached;
    }

    try {
      // Try Google Translate first, fallback to LibreTranslate
      let translation = await this.translateWithGoogle(text, targetLang);
      
      // If Google Translate didn't work, try LibreTranslate
      if (translation === text) {
        translation = await this.translateWithLibre(text, targetLang);
      }

      // Cache the result
      if (translation !== text) {
        this.setCachedTranslation(text, targetLang, translation);
      }

      return translation;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Return original text if all translation methods fail
    }
  }

  // Batch translate multiple texts
  async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    const promises = texts.map(text => this.translate(text, targetLang));
    return Promise.all(promises);
  }

  // Clear cache
  clearCache() {
    this.cache = {};
    localStorage.removeItem('translationCache');
  }
}

// Export singleton instance
export const translationService = new TranslationService();
