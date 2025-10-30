// Multi-language content management for KHESED-TEK SYSTEMS
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en';
export type Market = 'LATAM' | 'USA' | 'GLOBAL';

// Content structure for multilingual support
export interface MultiLanguageContent {
  es: string;
  en: string;
}

export interface ContentVariant {
  id: string;
  title: MultiLanguageContent;
  description: MultiLanguageContent;
  cta: MultiLanguageContent;
  features?: MultiLanguageContent[];
  metadata?: {
    targetMarket?: Market[];
    priority?: number;
    context?: string;
  };
}

// Global content library
export const CONTENT_LIBRARY = {
  // Hero Headlines
  hero_headlines: {
    innovation_focus: {
      id: 'innovation_focus',
      title: {
        es: 'Innovación que impulsa tu misión',
        en: 'Innovation that drives your mission'
      },
      description: {
        es: 'Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones.',
        en: 'Reliable, secure, and elegant technology solutions for churches and organizations.'
      },
      cta: {
        es: 'Hablar con nosotros →',
        en: 'Talk to us →'
      },
      metadata: {
        targetMarket: ['LATAM', 'USA', 'GLOBAL'],
        priority: 1,
        context: 'General innovation positioning'
      }
    },
    technology_transformation: {
      id: 'technology_transformation',
      title: {
        es: 'Tecnología que transforma tu iglesia',
        en: 'Technology that transforms your church'
      },
      description: {
        es: 'Moderniza tu ministerio con herramientas digitales diseñadas para el crecimiento espiritual.',
        en: 'Modernize your ministry with digital tools designed for spiritual growth.'
      },
      cta: {
        es: 'Solicitar demo gratuito →',
        en: 'Request free demo →'
      },
      metadata: {
        targetMarket: ['LATAM', 'GLOBAL'],
        priority: 2,
        context: 'Transformation-focused messaging'
      }
    },
    enterprise_solutions: {
      id: 'enterprise_solutions',
      title: {
        es: 'Soluciones empresariales para iglesias grandes',
        en: 'Enterprise church management solutions'
      },
      description: {
        es: 'Plataforma escalable para mega-iglesias con múltiples campus y operaciones complejas.',
        en: 'Scalable platform for mega-churches with multiple campuses and complex operations.'
      },
      cta: {
        es: 'Contactar ventas →',
        en: 'Contact sales →'
      },
      metadata: {
        targetMarket: ['USA'],
        priority: 1,
        context: 'Enterprise positioning for USA market'
      }
    }
  },

  // Feature Descriptions
  features: {
    whatsapp_integration: {
      id: 'whatsapp_integration',
      title: {
        es: 'Integración nativa con WhatsApp',
        en: 'Native WhatsApp integration'
      },
      description: {
        es: 'Conecta directamente con tu congregación a través de la plataforma favorita en Colombia.',
        en: 'Connect directly with your congregation through the preferred platform in Latin America.'
      },
      cta: {
        es: 'Ver demo de WhatsApp',
        en: 'See WhatsApp demo'
      },
      metadata: {
        targetMarket: ['LATAM'],
        priority: 1,
        context: 'LATAM-specific communication preference'
      }
    },
    multi_campus: {
      id: 'multi_campus',
      title: {
        es: 'Gestión multi-campus',
        en: 'Multi-campus management'
      },
      description: {
        es: 'Administra múltiples sedes desde una plataforma centralizada con reportes unificados.',
        en: 'Manage multiple locations from a centralized platform with unified reporting.'
      },
      cta: {
        es: 'Explorar funciones',
        en: 'Explore features'
      },
      metadata: {
        targetMarket: ['USA', 'GLOBAL'],
        priority: 1,
        context: 'Enterprise and growth-focused features'
      }
    },
    gdpr_compliance: {
      id: 'gdpr_compliance',
      title: {
        es: 'Cumplimiento GDPR y protección de datos',
        en: 'GDPR compliance and data protection'
      },
      description: {
        es: 'Protección avanzada de datos personales cumpliendo con regulaciones internacionales.',
        en: 'Advanced personal data protection complying with international regulations.'
      },
      cta: {
        es: 'Ver seguridad',
        en: 'View security'
      },
      metadata: {
        targetMarket: ['GLOBAL'],
        priority: 1,
        context: 'International compliance requirements'
      }
    }
  },

  // Call-to-Action Variants
  cta_buttons: {
    demo_request: {
      id: 'demo_request',
      title: {
        es: 'Solicitar demo gratuito',
        en: 'Request free demo'
      },
      description: {
        es: 'Demostración personalizada sin compromiso',
        en: 'Personalized demonstration with no commitment'
      },
      cta: {
        es: 'Solicitar demo →',
        en: 'Request demo →'
      }
    },
    contact_sales: {
      id: 'contact_sales',
      title: {
        es: 'Hablar con ventas',
        en: 'Talk to sales'
      },
      description: {
        es: 'Conversación directa con nuestro equipo',
        en: 'Direct conversation with our team'
      },
      cta: {
        es: 'Contactar →',
        en: 'Contact →'
      }
    },
    free_trial: {
      id: 'free_trial',
      title: {
        es: 'Comenzar prueba gratuita',
        en: 'Start free trial'
      },
      description: {
        es: '30 días de acceso completo sin costo',
        en: '30 days of full access at no cost'
      },
      cta: {
        es: 'Comenzar →',
        en: 'Get started →'
      }
    }
  },

  // Navigation and UI Elements
  navigation: {
    home: { es: 'Inicio', en: 'Home' },
    features: { es: 'Funciones', en: 'Features' },
    pricing: { es: 'Precios', en: 'Pricing' },
    about: { es: 'Nosotros', en: 'About' },
    contact: { es: 'Contacto', en: 'Contact' },
    demo: { es: 'Demo', en: 'Demo' },
    blog: { es: 'Blog', en: 'Blog' },
    support: { es: 'Soporte', en: 'Support' },
    login: { es: 'Ingresar', en: 'Login' }
  },

  // Form Labels and Messages
  forms: {
    name: { es: 'Nombre', en: 'Name' },
    email: { es: 'Correo electrónico', en: 'Email' },
    phone: { es: 'Teléfono', en: 'Phone' },
    organization: { es: 'Iglesia u organización', en: 'Church or organization' },
    message: { es: 'Mensaje', en: 'Message' },
    submit: { es: 'Enviar', en: 'Submit' },
    sending: { es: 'Enviando...', en: 'Sending...' },
    success: { es: '¡Gracias! Te contactaremos pronto.', en: 'Thank you! We\'ll contact you soon.' },
    error: { es: 'Error al enviar. Intenta de nuevo.', en: 'Send error. Please try again.' },
    required: { es: 'Campo obligatorio', en: 'Required field' }
  },

  // Market-Specific Content
  market_messaging: {
    latam: {
      value_proposition: {
        es: 'La plataforma favorita de las iglesias colombianas',
        en: 'The preferred platform for Colombian churches'
      },
      social_proof: {
        es: 'Más de 50 iglesias en Colombia ya confían en nosotros',
        en: 'Over 50 churches in Colombia already trust us'
      },
      local_support: {
        es: 'Soporte local en Barranquilla con atención en español',
        en: 'Local support in Barranquilla with Spanish service'
      }
    },
    usa: {
      value_proposition: {
        es: 'Soluciones empresariales para mega-iglesias americanas',
        en: 'Enterprise solutions for American mega-churches'
      },
      social_proof: {
        es: 'Confiado por iglesias líderes en Estados Unidos',
        en: 'Trusted by leading churches across the United States'
      },
      enterprise_focus: {
        es: 'Arquitectura escalable para operaciones complejas',
        en: 'Scalable architecture for complex operations'
      }
    },
    global: {
      value_proposition: {
        es: 'Conectando ministerios alrededor del mundo',
        en: 'Connecting ministries around the world'
      },
      social_proof: {
        es: 'Presente en 15+ países con soporte 24/7',
        en: 'Present in 15+ countries with 24/7 support'
      },
      multilingual: {
        es: 'Soporte multiidioma y cumplimiento internacional',
        en: 'Multi-language support and international compliance'
      }
    }
  }
};

// Content Management Context
interface ContentContextType {
  language: Language;
  market: Market;
  setLanguage: (language: Language) => void;
  setMarket: (market: Market) => void;
  getContent: (key: string, fallback?: string) => string;
  getContentVariant: (category: string, variantId: string, field: keyof ContentVariant) => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Content Provider Component
interface ContentProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
  defaultMarket?: Market;
}

export function ContentProvider({ 
  children, 
  defaultLanguage = 'es', 
  defaultMarket = 'LATAM' 
}: ContentProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [market, setMarket] = useState<Market>(defaultMarket);

  // Auto-detect language from browser if not set
  useEffect(() => {
    if (typeof window !== 'undefined' && defaultLanguage === 'es') {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') {
        setLanguage('en');
      }
    }
  }, [defaultLanguage]);

  // Get content by dot notation key (e.g., 'navigation.home')
  const getContent = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let content: any = CONTENT_LIBRARY;
    
    for (const k of keys) {
      content = content?.[k];
      if (!content) break;
    }

    if (content && typeof content === 'object' && content[language]) {
      return content[language];
    }

    return fallback || key;
  };

  // Get specific content variant
  const getContentVariant = (category: string, variantId: string, field: keyof ContentVariant): string => {
    const categoryContent = (CONTENT_LIBRARY as any)[category];
    const variant = categoryContent?.[variantId];
    
    if (!variant) return variantId;

    const fieldContent = variant[field];
    if (typeof fieldContent === 'object' && fieldContent[language]) {
      return fieldContent[language];
    }

    return fieldContent || variantId;
  };

  return (
    <ContentContext.Provider value={{
      language,
      market,
      setLanguage,
      setMarket,
      getContent,
      getContentVariant
    }}>
      {children}
    </ContentContext.Provider>
  );
}

// Hook to use content
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

// Language Switcher Component
export function LanguageSwitcher() {
  const { language, setLanguage } = useContent();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('es')}
        className={`px-2 py-1 text-sm rounded transition ${
          language === 'es' 
            ? 'bg-[var(--brand)] text-black' 
            : 'text-[var(--muted)] hover:text-[var(--text)]'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-sm rounded transition ${
          language === 'en' 
            ? 'bg-[var(--brand)] text-black' 
            : 'text-[var(--muted)] hover:text-[var(--text)]'
        }`}
      >
        EN
      </button>
    </div>
  );
}

// Market-aware content filtering
export function getMarketSpecificContent(
  market: Market, 
  language: Language,
  category: keyof typeof CONTENT_LIBRARY
): ContentVariant[] {
  const categoryContent = CONTENT_LIBRARY[category] as Record<string, ContentVariant>;
  
  return Object.values(categoryContent).filter(variant => {
    if (!variant.metadata?.targetMarket) return true;
    return variant.metadata.targetMarket.includes(market);
  }).sort((a, b) => (b.metadata?.priority || 0) - (a.metadata?.priority || 0));
}

// SEO and metadata content
export function generateSEOContent(language: Language, market: Market) {
  const baseTitle = language === 'es' 
    ? 'KHESED-TEK SYSTEMS - Soluciones Tecnológicas para Iglesias'
    : 'KHESED-TEK SYSTEMS - Technology Solutions for Churches';

  const baseDescription = language === 'es'
    ? 'Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones.'
    : 'Reliable, secure, and elegant technology solutions for churches and organizations.';

  const marketSpecific = {
    LATAM: {
      title: language === 'es' 
        ? `${baseTitle} - Colombia`
        : `${baseTitle} - Latin America`,
      description: language === 'es'
        ? `${baseDescription} Especialistas en el mercado colombiano con soporte local.`
        : `${baseDescription} Specialists in the Colombian market with local support.`,
      keywords: language === 'es'
        ? 'tecnología iglesias colombia, software religioso barranquilla, gestión iglesias'
        : 'church technology colombia, religious software barranquilla, church management'
    },
    USA: {
      title: language === 'es'
        ? `${baseTitle} - Estados Unidos`
        : `${baseTitle} - United States`,
      description: language === 'es'
        ? `${baseDescription} Soluciones empresariales para mega-iglesias americanas.`
        : `${baseDescription} Enterprise solutions for American mega-churches.`,
      keywords: language === 'es'
        ? 'iglesias empresariales usa, mega iglesias tecnología, church management usa'
        : 'enterprise church usa, mega church technology, church management software'
    },
    GLOBAL: {
      title: language === 'es'
        ? `${baseTitle} - Mundial`
        : `${baseTitle} - Worldwide`,
      description: language === 'es'
        ? `${baseDescription} Soporte multiidioma y cumplimiento internacional.`
        : `${baseDescription} Multi-language support and international compliance.`,
      keywords: language === 'es'
        ? 'iglesias internacionales, software multiidioma, church technology global'
        : 'international churches, multilingual software, global church technology'
    }
  };

  return marketSpecific[market];
}

// Utility functions
export function detectLanguageFromMarket(market: Market): Language {
  return market === 'LATAM' ? 'es' : 'en';
}

export function getMarketFromLanguage(language: Language): Market {
  return language === 'es' ? 'LATAM' : 'GLOBAL';
}

// Content validation and fallbacks
export function validateContent(content: MultiLanguageContent): boolean {
  return !!(content.es && content.en);
}

export function getContentWithFallback(
  content: MultiLanguageContent, 
  language: Language, 
  fallback: string = ''
): string {
  return content[language] || content['es'] || content['en'] || fallback;
}