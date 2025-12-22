// Global market context provider
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { detectUserMarket } from '@/lib/analytics';

interface UserGeoData {
  country: string;
  region: string;
  market: 'LATAM' | 'USA' | 'GLOBAL';
  language: 'es' | 'en';
  timezone: string;
}

interface GlobalMarketContextType {
  geoData: UserGeoData | null;
  isLoading: boolean;
  language: 'es' | 'en';
  market: 'LATAM' | 'USA' | 'GLOBAL';
  setLanguage: (language: 'es' | 'en') => void;
}

const GlobalMarketContext = createContext<GlobalMarketContextType | null>(null);

interface GlobalMarketProviderProps {
  children: ReactNode;
  initialLanguage?: 'es' | 'en';
}

export function GlobalMarketProvider({ children, initialLanguage = 'es' }: GlobalMarketProviderProps) {
  const [geoData, setGeoData] = useState<UserGeoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'es' | 'en'>(initialLanguage);

  useEffect(() => {
    const initializeGeoData = async () => {
      try {
        const detectedGeoData = await detectUserMarket();
        setGeoData(detectedGeoData);
        
        // Force Spanish for LATAM countries (similar to header logic)
        const LATAM_COUNTRIES = ['CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'VE', 'BO', 'PY', 'UY', 'CR', 'PA', 'GT', 'HN', 'NI', 'SV'];
        const isLATAM = LATAM_COUNTRIES.includes(detectedGeoData.country);
        const effectiveLanguage = isLATAM ? 'es' : (initialLanguage || detectedGeoData.language);
        
        setLanguage(effectiveLanguage);
        
        // Store geo data for analytics
        localStorage.setItem('user_geo_data', JSON.stringify(detectedGeoData));
        
      } catch (error) {
        console.warn('Failed to detect user market:', error);
        // Fallback to LATAM defaults (Colombian company serving primarily LATAM market)
        const fallbackGeoData: UserGeoData = {
          country: 'CO',
          region: 'Atlantico',
          market: 'LATAM',
          language: 'es',
          timezone: 'America/Bogota'
        };
        setGeoData(fallbackGeoData);
        setLanguage(fallbackGeoData.language);
      } finally {
        setIsLoading(false);
      }
    };

    initializeGeoData();
  }, [initialLanguage]);

  const contextValue: GlobalMarketContextType = {
    geoData,
    isLoading,
    language,
    market: geoData?.market || 'USA',
    setLanguage: (newLanguage: 'es' | 'en') => {
      setLanguage(newLanguage);
      
      // Store language preference
      localStorage.setItem('user_language_preference', newLanguage);
      
      // Track language change
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'language_change', {
          event_category: 'User Interaction',
          event_label: `${geoData?.market || 'unknown'}_${newLanguage}`,
          market: geoData?.market,
          language: newLanguage,
        });
      }
    }
  };

  return (
    <GlobalMarketContext.Provider value={contextValue}>
      {children}
    </GlobalMarketContext.Provider>
  );
}

export function useGlobalMarket() {
  const context = useContext(GlobalMarketContext);
  if (!context) {
    throw new Error('useGlobalMarket must be used within a GlobalMarketProvider');
  }
  return context;
}

// Language switcher component
export function LanguageSwitcher() {
  const { language, setLanguage, market } = useGlobalMarket();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          language === 'es' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-600 hover:text-blue-600'
        }`}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          language === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-600 hover:text-blue-600'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      {market && (
        <span className="text-xs text-gray-500 ml-2">
          {market}
        </span>
      )}
    </div>
  );
}

// Hook for conditional rendering based on market
export function useMarketContent<T>(content: {
  LATAM?: T;
  USA?: T;
  GLOBAL?: T;
  default: T;
}): T {
  const { market } = useGlobalMarket();
  
  return content[market] || content.default;
}

// Hook for language-specific content
export function useLanguageContent<T>(content: {
  es: T;
  en: T;
}): T {
  const { language } = useGlobalMarket();
  
  return content[language];
}