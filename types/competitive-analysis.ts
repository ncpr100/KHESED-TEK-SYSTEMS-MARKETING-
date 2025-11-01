// Real KHESED-TEK-CMS Features Enhancement Data

export interface KhesedTekFeature {
  id: string
  name: {
    es: string
    en: string
  }
  category: 'core' | 'advanced' | 'ai' | 'cultural' | 'integration'
  description: {
    es: string
    en: string
  }
  competitorComparison: {
    planningCenter: 'none' | 'basic' | 'similar' | 'limited'
    breeze: 'none' | 'basic' | 'similar' | 'limited'
    churchTrac: 'none' | 'basic' | 'similar' | 'limited'
    aplos: 'none' | 'basic' | 'similar' | 'limited'
    advantage: {
      es: string
      en: string
    }
  }
  technicalSpecs: {
    implementation: string
    apiEndpoint?: string
    automation?: boolean
    aiPowered?: boolean
  }
  businessImpact: {
    efficiency: number // 1-100%
    engagement: number // 1-100% 
    cost_savings: number // 1-100%
  }
  targetMarket: ('LATAM' | 'USA' | 'GLOBAL')[]
}

export const khesedTekFeatures: KhesedTekFeature[] = [
  {
    id: 'smart-volunteer-matching',
    name: {
      es: 'Emparejamiento Inteligente de Voluntarios',
      en: 'Smart Volunteer Matching'
    },
    category: 'ai',
    description: {
      es: 'Sistema de IA que empareja automáticamente voluntarios con ministerios basado en dones espirituales, disponibilidad y experiencia previa.',
      en: 'AI-powered system that automatically matches volunteers with ministries based on spiritual gifts, availability, and previous experience.'
    },
    competitorComparison: {
      planningCenter: 'basic',
      breeze: 'basic', 
      churchTrac: 'basic',
      aplos: 'none',
      advantage: {
        es: 'Único sistema con IA que analiza dones espirituales y genera recomendaciones automáticas',
        en: 'Only system with AI that analyzes spiritual gifts and generates automatic recommendations'
      }
    },
    technicalSpecs: {
      implementation: 'Machine learning algorithm with spiritual gifts assessment integration',
      apiEndpoint: '/api/volunteers/smart-matching',
      automation: true,
      aiPowered: true
    },
    businessImpact: {
      efficiency: 75,
      engagement: 85,
      cost_savings: 60
    },
    targetMarket: ['LATAM', 'USA', 'GLOBAL']
  },
  {
    id: 'whatsapp-business-native',
    name: {
      es: 'WhatsApp Business Nativo',
      en: 'Native WhatsApp Business'
    },
    category: 'cultural',
    description: {
      es: 'Integración completa con WhatsApp Business API para comunicación masiva, seguimiento pastoral y automatización de respuestas.',
      en: 'Complete WhatsApp Business API integration for mass communication, pastoral follow-up, and response automation.'
    },
    competitorComparison: {
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none', 
      aplos: 'none',
      advantage: {
        es: 'Primer y único ChMS con WhatsApp Business completamente integrado para el mercado latinoamericano',
        en: 'First and only ChMS with fully integrated WhatsApp Business for Latin American market'
      }
    },
    technicalSpecs: {
      implementation: 'WhatsApp Business API with automated workflows',
      apiEndpoint: '/api/communications/whatsapp',
      automation: true,
      aiPowered: false
    },
    businessImpact: {
      efficiency: 90,
      engagement: 95,
      cost_savings: 70
    },
    targetMarket: ['LATAM', 'GLOBAL']
  },
  {
    id: 'colombian-payments',
    name: {
      es: 'Métodos de Pago Colombianos',
      en: 'Colombian Payment Methods'
    },
    category: 'cultural',
    description: {
      es: 'Integración nativa con Nequi, PSE, transferencias bancarias colombianas y billeteras digitales locales.',
      en: 'Native integration with Nequi, PSE, Colombian bank transfers, and local digital wallets.'
    },
    competitorComparison: {
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      advantage: {
        es: 'Único sistema que soporta métodos de pago colombianos populares como Nequi y PSE',
        en: 'Only system supporting popular Colombian payment methods like Nequi and PSE'
      }
    },
    technicalSpecs: {
      implementation: 'Multi-gateway payment processor with Colombian banking integration',
      apiEndpoint: '/api/donations/colombia',
      automation: true,
      aiPowered: false
    },
    businessImpact: {
      efficiency: 80,
      engagement: 90,
      cost_savings: 85
    },
    targetMarket: ['LATAM']
  },
  {
    id: 'prayer-automation-engine',
    name: {
      es: 'Motor de Automatización de Oración',
      en: 'Prayer Automation Engine'
    },
    category: 'ai',
    description: {
      es: 'Sistema automatizado de seguimiento de peticiones de oración con notificaciones pastorales, análisis de sentimientos y respuestas templadas.',
      en: 'Automated prayer request tracking with pastoral notifications, sentiment analysis, and templated responses.'
    },
    competitorComparison: {
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      advantage: {
        es: 'Sistema único de automatización pastoral con IA para análisis de emociones y seguimiento',
        en: 'Unique pastoral automation system with AI for emotion analysis and follow-up'
      }
    },
    technicalSpecs: {
      implementation: 'NLP-powered sentiment analysis with automated workflow triggers',
      apiEndpoint: '/api/prayer-requests/automation',
      automation: true,
      aiPowered: true
    },
    businessImpact: {
      efficiency: 85,
      engagement: 90,
      cost_savings: 65
    },
    targetMarket: ['LATAM', 'USA', 'GLOBAL']
  },
  {
    id: 'spiritual-gifts-assessment',
    name: {
      es: 'Evaluación de Dones Espirituales',
      en: 'Spiritual Gifts Assessment'
    },
    category: 'advanced',
    description: {
      es: 'Sistema completo de evaluación y seguimiento de dones espirituales integrado con gestión de ministerios y desarrollo de liderazgo.',
      en: 'Complete spiritual gifts assessment and tracking system integrated with ministry management and leadership development.'
    },
    competitorComparison: {
      planningCenter: 'basic',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      advantage: {
        es: 'Evaluación científica de dones espirituales con seguimiento de desarrollo y recomendaciones automáticas',
        en: 'Scientific spiritual gifts assessment with development tracking and automatic recommendations'
      }
    },
    technicalSpecs: {
      implementation: 'Psychometric assessment with ministry matching algorithms',
      apiEndpoint: '/api/spiritual-gifts/assessment',
      automation: true,
      aiPowered: true
    },
    businessImpact: {
      efficiency: 70,
      engagement: 85,
      cost_savings: 60
    },
    targetMarket: ['LATAM', 'USA', 'GLOBAL']
  },
  {
    id: 'multi-campus-intelligence',
    name: {
      es: 'Inteligencia Multi-Campus',
      en: 'Multi-Campus Intelligence'
    },
    category: 'advanced',
    description: {
      es: 'Dashboard unificado con análisis comparativo entre campus, transferencias automáticas de miembros y reportes consolidados.',
      en: 'Unified dashboard with comparative campus analysis, automatic member transfers, and consolidated reporting.'
    },
    competitorComparison: {
      planningCenter: 'similar',
      breeze: 'limited',
      churchTrac: 'limited',
      aplos: 'none',
      advantage: {
        es: 'Análisis predictivo entre campus con transferencias inteligentes y optimización de recursos',
        en: 'Predictive cross-campus analysis with intelligent transfers and resource optimization'
      }
    },
    technicalSpecs: {
      implementation: 'Advanced analytics engine with cross-campus data correlation',
      apiEndpoint: '/api/multi-campus/analytics',
      automation: true,
      aiPowered: true
    },
    businessImpact: {
      efficiency: 80,
      engagement: 75,
      cost_savings: 70
    },
    targetMarket: ['USA', 'GLOBAL']
  },
  {
    id: 'cultural-adaptation-engine',
    name: {
      es: 'Motor de Adaptación Cultural',
      en: 'Cultural Adaptation Engine'
    },
    category: 'cultural',
    description: {
      es: 'Sistema que adapta automáticamente la interfaz, comunicaciones y flujos de trabajo según el contexto cultural y geográfico.',
      en: 'System that automatically adapts interface, communications, and workflows based on cultural and geographic context.'
    },
    competitorComparison: {
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      advantage: {
        es: 'Único sistema que se adapta automáticamente a diferentes contextos culturales latinoamericanos',
        en: 'Only system that automatically adapts to different Latin American cultural contexts'
      }
    },
    technicalSpecs: {
      implementation: 'Cultural intelligence engine with localization automation',
      apiEndpoint: '/api/cultural-adaptation',
      automation: true,
      aiPowered: true
    },
    businessImpact: {
      efficiency: 85,
      engagement: 95,
      cost_savings: 60
    },
    targetMarket: ['LATAM', 'GLOBAL']
  },
  {
    id: 'predictive-engagement',
    name: {
      es: 'Engagement Predictivo',
      en: 'Predictive Engagement'
    },
    category: 'ai',
    description: {
      es: 'IA que predice el nivel de compromiso de miembros y sugiere intervenciones pastorales preventivas.',
      en: 'AI that predicts member engagement levels and suggests preventive pastoral interventions.'
    },
    competitorComparison: {
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      advantage: {
        es: 'Predicción avanzada de deserción con recomendaciones automáticas de retención',
        en: 'Advanced churn prediction with automatic retention recommendations'
      }
    },
    technicalSpecs: {
      implementation: 'Machine learning models for engagement prediction and intervention',
      apiEndpoint: '/api/analytics/predictive-engagement',
      automation: true,
      aiPowered: true
    },
    businessImpact: {
      efficiency: 75,
      engagement: 90,
      cost_savings: 80
    },
    targetMarket: ['LATAM', 'USA', 'GLOBAL']
  },
  {
    id: 'integrated-social-media',
    name: {
      es: 'Redes Sociales Integradas',
      en: 'Integrated Social Media'
    },
    category: 'integration',
    description: {
      es: 'Gestión unificada de Facebook, Instagram, YouTube y TikTok con programación automática y análisis de engagement.',
      en: 'Unified Facebook, Instagram, YouTube, and TikTok management with automatic scheduling and engagement analytics.'
    },
    competitorComparison: {
      planningCenter: 'limited',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      advantage: {
        es: 'Gestión completa de redes sociales con análisis de engagement y programación inteligente',
        en: 'Complete social media management with engagement analytics and smart scheduling'
      }
    },
    technicalSpecs: {
      implementation: 'Multi-platform social media API integration with analytics',
      apiEndpoint: '/api/social-media/management',
      automation: true,
      aiPowered: true
    },
    businessImpact: {
      efficiency: 85,
      engagement: 90,
      cost_savings: 75
    },
    targetMarket: ['LATAM', 'USA', 'GLOBAL']
  },
  {
    id: 'comprehensive-automation',
    name: {
      es: 'Automatización Integral',
      en: 'Comprehensive Automation'
    },
    category: 'ai',
    description: {
      es: 'Motor de automatización completo con triggers personalizados, flujos de trabajo complejos y respuestas inteligentes.',
      en: 'Complete automation engine with custom triggers, complex workflows, and intelligent responses.'
    },
    competitorComparison: {
      planningCenter: 'basic',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      advantage: {
        es: 'Sistema de automatización más avanzado del mercado con IA y triggers personalizados',
        en: 'Most advanced automation system in the market with AI and custom triggers'
      }
    },
    technicalSpecs: {
      implementation: 'Advanced workflow engine with AI-powered decision making',
      apiEndpoint: '/api/automation/workflows',
      automation: true,
      aiPowered: true
    },
    businessImpact: {
      efficiency: 95,
      engagement: 80,
      cost_savings: 85
    },
    targetMarket: ['LATAM', 'USA', 'GLOBAL']
  }
]

// Competitor Pricing Data (from PDF analysis)
export const competitorPricing = {
  planningCenter: {
    model: 'modular',
    range: '$35-100+',
    period: 'monthly',
    notes: 'Pay per module, no user limits',
    userLimits: 'unlimited',
    features: 'modular'
  },
  breeze: {
    model: 'flat_tiered',
    range: '$67-119',
    period: 'monthly', 
    notes: 'Based on church size',
    userLimits: 'unlimited',
    features: 'all_included'
  },
  churchTrac: {
    model: 'member_based',
    range: '$8-25',
    period: 'monthly',
    notes: 'Based on active members',
    userLimits: 'unlimited',
    features: 'all_included'
  },
  aplos: {
    model: 'feature_tiered',
    range: '$79-229',
    period: 'monthly',
    notes: 'Lite/Core/Premium tiers',
    userLimits: 'unlimited',
    features: 'tiered'
  },
  khesedTek: {
    model: 'cultural_optimized',
    range: '$89-149',
    period: 'monthly',
    notes: 'Culturally adapted, all features included',
    userLimits: 'unlimited',
    features: 'all_included_plus_ai'
  }
}

// Market positioning advantages
export const marketAdvantages = {
  LATAM: {
    cultural: [
      'Spanish-first interface design',
      'WhatsApp Business integration',
      'Colombian payment methods (Nequi, PSE)',
      'Cultural adaptation engine',
      'Local compliance (LGPD, Colombian data protection)'
    ],
    technical: [
      'Latin American timezone optimization',
      'Regional server infrastructure',
      'Local bank integrations',
      'Spanish language AI/NLP models',
      'Cultural workflow adaptations'
    ],
    business: [
      'Lower cost than US competitors',
      'Local customer support',
      'Colombian business hour coverage',
      'Regional market expertise',
      'Local partnership network'
    ]
  },
  USA: {
    enterprise: [
      'SOX compliance ready',
      'Enterprise security features',
      'Multi-campus intelligence',
      'Advanced analytics dashboard',
      'White-label options'
    ],
    integration: [
      'Stripe/ACH native integration',
      'Salesforce CRM connectivity', 
      'Microsoft Teams integration',
      'Advanced API ecosystem',
      'Third-party app marketplace'
    ],
    scalability: [
      'Unlimited user scaling',
      'Multi-tenant architecture',
      'CDN global distribution',
      'Auto-scaling infrastructure',
      'Enterprise SLA guarantees'
    ]
  },
  GLOBAL: {
    localization: [
      'Multi-language native support',
      'Currency localization',
      'Regional payment methods',
      'Cultural adaptation engine',
      'Timezone optimization'
    ],
    compliance: [
      'GDPR compliance',
      'Multi-jurisdiction data handling',
      'International banking integration',
      'Regional compliance automation',
      'Data sovereignty options'
    ],
    support: [
      '24/7 global support coverage',
      'Multi-language customer service',
      'Regional implementation teams',
      'Cultural training programs',
      'Global partner network'
    ]
  }
}