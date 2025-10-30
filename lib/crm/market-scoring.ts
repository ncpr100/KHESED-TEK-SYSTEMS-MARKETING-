// Enhanced market-aware lead scoring for KHESED-TEK SYSTEMS
import { Lead, Activity, ActivityType, LeadScoring, ScoringRule } from './types';

export type Market = 'LATAM' | 'USA' | 'GLOBAL';

interface MarketSpecificScoring {
  market: Market;
  weight: number; // Multiplier for market importance
  qualifiers: string[]; // Keywords that indicate this market
  culturalFactors: ScoringRule[];
  marketSpecificRules: ScoringRule[];
}

// Market-specific scoring configurations
const MARKET_SCORING_CONFIG: Record<Market, MarketSpecificScoring> = {
  LATAM: {
    market: 'LATAM',
    weight: 1.2, // Higher weight due to primary market focus
    qualifiers: ['iglesia', 'ministerio', 'pastor', 'colombia', 'barranquilla', 'bogotá', 'medellín'],
    culturalFactors: [
      {
        name: 'whatsapp_provided',
        condition: (lead, _) => {
          const phone = lead.phone?.toLowerCase() || '';
          return !!(phone.includes('whatsapp') || phone.includes('+57') || phone.includes('573'));
        },
        points: 20,
        description: 'WhatsApp number provided (preferred in Colombia)',
      },
      {
        name: 'spanish_content_preference',
        condition: (lead, activities) => {
          const spanishIndicators = activities.filter(a => 
            a.metadata?.language === 'es' || 
            a.metadata?.page?.includes('/latam') ||
            (a.description && (a.description.includes('español') || a.description.includes('demo en español')))
          );
          return spanishIndicators.length > 0;
        },
        points: 15,
        description: 'Prefers Spanish content and communication',
      },
      {
        name: 'colombian_indicators',
        condition: (lead, _) => {
          const company = lead.company?.toLowerCase() || '';
          const email = lead.email?.toLowerCase() || '';
          return !!(company.includes('colombia') || 
                    company.includes('barranquilla') ||
                    email.includes('.co') ||
                    (lead.phone && lead.phone.includes('+57')));
        },
        points: 25,
        description: 'Strong Colombian market indicators',
      }
    ],
    marketSpecificRules: [
      {
        name: 'church_size_indicator_latam',
        condition: (lead, _) => {
          const company = lead.company?.toLowerCase() || '';
          const message = lead.customFields?.initialMessage?.toLowerCase() || '';
          const largeChurchIndicators = ['catedral', 'central', 'principal', '1000', '2000', 'mega'];
          return largeChurchIndicators.some(indicator => 
            company.includes(indicator) || message.includes(indicator)
          );
        },
        points: 30,
        description: 'Indicates large church (high revenue potential)',
      },
      {
        name: 'local_payment_interest',
        condition: (_, activities) => {
          return activities.some(a => 
            a.description?.includes('pse') ||
            a.description?.includes('bancolombia') ||
            a.description?.includes('efecty') ||
            a.description?.includes('pago local')
          );
        },
        points: 20,
        description: 'Interest in local payment methods',
      }
    ]
  },

  USA: {
    market: 'USA',
    weight: 1.1, // High weight for strategic expansion
    qualifiers: ['church', 'ministry', 'pastor', 'enterprise', 'multi-campus', 'usa', 'america'],
    culturalFactors: [
      {
        name: 'enterprise_indicators',
        condition: (lead) => {
          const company = lead.company?.toLowerCase() || '';
          const message = lead.customFields?.initialMessage?.toLowerCase() || '';
          const enterpriseTerms = ['enterprise', 'corporation', 'llc', 'inc', 'headquarters', 'corporate'];
          return enterpriseTerms.some(term => company.includes(term) || message.includes(term));
        },
        points: 25,
        description: 'Enterprise-level organization indicators',
      },
      {
        name: 'multi_campus_interest',
        condition: (lead) => {
          const company = lead.company?.toLowerCase() || '';
          const message = lead.customFields?.initialMessage?.toLowerCase() || '';
          return company.includes('multi') || 
                 company.includes('campus') ||
                 message.includes('location') ||
                 message.includes('branch') ||
                 message.includes('site');
        },
        points: 35,
        description: 'Multi-campus church (high-value prospect)',
      },
      {
        name: 'budget_indicators',
        condition: (lead) => {
          const message = lead.customFields?.initialMessage?.toLowerCase() || '';
          const budgetTerms = ['budget', 'investment', 'cost', 'pricing', 'enterprise', 'solution'];
          return budgetTerms.some(term => message.includes(term));
        },
        points: 20,
        description: 'Budget and investment mindset',
      }
    ],
    marketSpecificRules: [
      {
        name: 'usa_phone_format',
        condition: (lead) => {
          const phone = lead.phone || '';
          return phone.includes('+1') || /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone);
        },
        points: 15,
        description: 'USA phone number format',
      },
      {
        name: 'compliance_interest',
        condition: (_, activities) => {
          return activities.some(a => 
            a.description?.includes('compliance') ||
            a.description?.includes('sox') ||
            a.description?.includes('audit') ||
            a.description?.includes('security')
          );
        },
        points: 25,
        description: 'Interest in compliance and security features',
      }
    ]
  },

  GLOBAL: {
    market: 'GLOBAL',
    weight: 1.0, // Standard weight
    qualifiers: ['international', 'global', 'worldwide', 'multi-country', 'network'],
    culturalFactors: [
      {
        name: 'international_indicators',
        condition: (lead) => {
          const company = lead.company?.toLowerCase() || '';
          const email = lead.email?.toLowerCase() || '';
          const internationalTlds = ['.uk', '.eu', '.au', '.ca', '.de', '.fr', '.br'];
          return company.includes('international') ||
                 company.includes('global') ||
                 company.includes('worldwide') ||
                 internationalTlds.some(tld => email.includes(tld));
        },
        points: 20,
        description: 'International organization indicators',
      },
      {
        name: 'multilingual_needs',
        condition: (lead) => {
          const message = lead.customFields?.initialMessage?.toLowerCase() || '';
          const multilingualTerms = ['language', 'translation', 'multilingual', 'international', 'global'];
          return multilingualTerms.some(term => message.includes(term));
        },
        points: 25,
        description: 'Multi-language requirements (complex needs)',
      },
      {
        name: 'timezone_considerations',
        condition: (lead) => {
          const message = lead.customFields?.initialMessage?.toLowerCase() || '';
          return message.includes('timezone') ||
                 message.includes('time zone') ||
                 message.includes('support hours') ||
                 message.includes('24/7');
        },
        points: 20,
        description: 'Global timezone support needs',
      }
    ],
    marketSpecificRules: [
      {
        name: 'gdpr_compliance_interest',
        condition: (_, activities) => {
          return activities.some(a => 
            a.description?.includes('gdpr') ||
            a.description?.includes('data protection') ||
            a.description?.includes('privacy') ||
            a.description?.includes('compliance')
          );
        },
        points: 30,
        description: 'GDPR and data protection compliance interest',
      },
      {
        name: 'multi_currency_needs',
        condition: (lead) => {
          const message = lead.customFields?.initialMessage?.toLowerCase() || '';
          return message.includes('currency') ||
                 message.includes('euro') ||
                 message.includes('pound') ||
                 message.includes('international payment');
        },
        points: 25,
        description: 'Multi-currency payment requirements',
      }
    ]
  }
};

export class MarketAwareLeadScoring implements LeadScoring {
  private baseRules: ScoringRule[];
  
  // Implement required interface property
  get rules(): ScoringRule[] {
    return this.baseRules;
  }

  constructor() {
    // Base demographic and behavioral rules (apply to all markets)
    this.baseRules = [
      // Demographic Scoring
      {
        name: 'has_company',
        condition: (lead) => !!lead.company,
        points: 10,
        description: 'Lead has provided company information',
      },
      {
        name: 'has_phone',
        condition: (lead) => !!lead.phone,
        points: 15,
        description: 'Lead has provided phone number',
      },
      {
        name: 'religious_organization',
        condition: (lead) => {
          const company = lead.company?.toLowerCase() || '';
          const message = lead.customFields?.initialMessage?.toLowerCase() || '';
          const religiousTerms = ['iglesia', 'church', 'ministerio', 'ministry', 'pastor', 'congregación', 'congregation'];
          return religiousTerms.some(term => company.includes(term) || message.includes(term));
        },
        points: 25,
        description: 'Religious organization (target market)',
      },

      // Behavioral Scoring
      {
        name: 'demo_requested',
        condition: (_, activities) => 
          activities.some(a => a.type === ActivityType.DEMO_REQUESTED),
        points: 50,
        description: 'Lead requested a demo',
      },
      {
        name: 'form_submitted',
        condition: (_, activities) => 
          activities.some(a => a.type === ActivityType.FORM_SUBMITTED),
        points: 20,
        description: 'Lead submitted contact form',
      },
      {
        name: 'multiple_page_visits',
        condition: (_, activities) => 
          activities.filter(a => a.type === ActivityType.PAGE_VISITED).length >= 3,
        points: 15,
        description: 'Lead visited multiple pages',
      },
      {
        name: 'email_engagement',
        condition: (_, activities) => 
          activities.some(a => a.type === ActivityType.EMAIL_OPENED) &&
          activities.some(a => a.type === ActivityType.EMAIL_CLICKED),
        points: 30,
        description: 'Lead engaged with email campaigns',
      },

      // Timing and Frequency
      {
        name: 'recent_activity',
        condition: (_, activities) => {
          const recentActivities = activities.filter(a => {
            const daysSince = (Date.now() - a.timestamp.getTime()) / (1000 * 60 * 60 * 24);
            return daysSince <= 7;
          });
          return recentActivities.length >= 2;
        },
        points: 20,
        description: 'Multiple recent activities (hot lead)',
      },

      // Negative Scoring
      {
        name: 'generic_email',
        condition: (lead) => {
          const email = lead.email?.toLowerCase() || '';
          return email.includes('test') || 
                 email.includes('example') || 
                 email.includes('demo') ||
                 email.startsWith('admin@') ||
                 email.startsWith('info@');
        },
        points: -15,
        description: 'Generic or test email address',
      },
    ];
  }

  // Detect market from lead data
  private detectMarket(lead: Lead, activities: Activity[]): Market {
    const scores: Record<Market, number> = { LATAM: 0, USA: 0, GLOBAL: 0 };
    
    // Check company name, email, phone, and message for market indicators
    const textFields = [
      lead.company?.toLowerCase() || '',
      lead.email?.toLowerCase() || '',
      lead.phone?.toLowerCase() || '',
      lead.customFields?.initialMessage?.toLowerCase() || ''
    ].join(' ');

    // Score based on qualifiers
    Object.entries(MARKET_SCORING_CONFIG).forEach(([market, config]) => {
      config.qualifiers.forEach(qualifier => {
        if (textFields.includes(qualifier)) {
          scores[market as Market] += 1;
        }
      });
    });

    // Check activities for market indicators
    activities.forEach(activity => {
      const activityText = (activity.description?.toLowerCase() || '') + 
                          (JSON.stringify(activity.metadata || {}).toLowerCase());
      
      Object.entries(MARKET_SCORING_CONFIG).forEach(([market, config]) => {
        config.qualifiers.forEach(qualifier => {
          if (activityText.includes(qualifier)) {
            scores[market as Market] += 0.5;
          }
        });
      });
    });

    // Return market with highest score, default to LATAM
    const detectedMarket = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as Market] > scores[b[0] as Market] ? a : b
    )[0] as Market;

    return scores[detectedMarket] > 0 ? detectedMarket : 'LATAM';
  }

  calculate(lead: Lead, activities: Activity[]): number {
    const market = this.detectMarket(lead, activities);
    const marketConfig = MARKET_SCORING_CONFIG[market];
    
    let totalScore = 0;
    const appliedRules: string[] = [];

    // Apply base rules
    for (const rule of this.baseRules) {
      try {
        if (rule.condition(lead, activities)) {
          totalScore += rule.points;
          appliedRules.push(rule.name);
        }
      } catch (error) {
        console.warn(`Error evaluating base rule ${rule.name}:`, error);
      }
    }

    // Apply market-specific cultural factors
    for (const rule of marketConfig.culturalFactors) {
      try {
        if (rule.condition(lead, activities)) {
          totalScore += rule.points;
          appliedRules.push(`${market}_${rule.name}`);
        }
      } catch (error) {
        console.warn(`Error evaluating cultural rule ${rule.name}:`, error);
      }
    }

    // Apply market-specific rules
    for (const rule of marketConfig.marketSpecificRules) {
      try {
        if (rule.condition(lead, activities)) {
          totalScore += rule.points;
          appliedRules.push(`${market}_${rule.name}`);
        }
      } catch (error) {
        console.warn(`Error evaluating market rule ${rule.name}:`, error);
      }
    }

    // Apply market weight
    totalScore = Math.round(totalScore * marketConfig.weight);

    // Ensure score is between 0 and 100
    const finalScore = Math.max(0, Math.min(100, totalScore));

    console.log(`Market-aware lead scoring for ${lead.email}:`, {
      detectedMarket: market,
      marketWeight: marketConfig.weight,
      finalScore,
      rawScore: totalScore,
      appliedRules,
      activitiesCount: activities.length,
    });

    return finalScore;
  }

  getMarketAnalysis(lead: Lead, activities: Activity[]): {
    detectedMarket: Market;
    marketConfidence: number;
    marketIndicators: string[];
    score: number;
    breakdown: { rule: string; points: number; description: string; category: string }[];
  } {
    const market = this.detectMarket(lead, activities);
    const marketConfig = MARKET_SCORING_CONFIG[market];
    
    const breakdown: { rule: string; points: number; description: string; category: string }[] = [];
    const marketIndicators: string[] = [];
    let totalScore = 0;
    let marketSpecificPoints = 0;

    // Analyze base rules
    for (const rule of this.baseRules) {
      try {
        if (rule.condition(lead, activities)) {
          totalScore += rule.points;
          breakdown.push({
            rule: rule.name,
            points: rule.points,
            description: rule.description,
            category: 'base'
          });
        }
      } catch (error) {
        console.warn(`Error in market analysis for rule ${rule.name}:`, error);
      }
    }

    // Analyze market-specific factors
    for (const rule of marketConfig.culturalFactors) {
      try {
        if (rule.condition(lead, activities)) {
          totalScore += rule.points;
          marketSpecificPoints += rule.points;
          breakdown.push({
            rule: rule.name,
            points: rule.points,
            description: rule.description,
            category: 'cultural'
          });
          marketIndicators.push(rule.description);
        }
      } catch (error) {
        console.warn(`Error in cultural analysis for rule ${rule.name}:`, error);
      }
    }

    for (const rule of marketConfig.marketSpecificRules) {
      try {
        if (rule.condition(lead, activities)) {
          totalScore += rule.points;
          marketSpecificPoints += rule.points;
          breakdown.push({
            rule: rule.name,
            points: rule.points,
            description: rule.description,
            category: 'market-specific'
          });
          marketIndicators.push(rule.description);
        }
      } catch (error) {
        console.warn(`Error in market-specific analysis for rule ${rule.name}:`, error);
      }
    }

    // Calculate market confidence based on market-specific points
    const marketConfidence = Math.min(100, (marketSpecificPoints / 50) * 100);

    // Apply market weight
    totalScore = Math.round(totalScore * marketConfig.weight);
    const finalScore = Math.max(0, Math.min(100, totalScore));

    return {
      detectedMarket: market,
      marketConfidence,
      marketIndicators,
      score: finalScore,
      breakdown
    };
  }
}

// Enhanced priority determination with market context
export function getMarketAwarePriority(
  score: number, 
  market: Market, 
  leadData: Lead
): {
  level: 'high' | 'medium' | 'low';
  label: string;
  color: string;
  marketContext: string;
  recommendedActions: string[];
} {
  let level: 'high' | 'medium' | 'low';
  let label: string;
  let color: string;
  let marketContext: string;
  let recommendedActions: string[] = [];

  // Market-specific priority thresholds
  const thresholds = {
    LATAM: { high: 65, medium: 35 }, // Lower threshold for primary market
    USA: { high: 75, medium: 45 },   // Higher threshold for strategic market
    GLOBAL: { high: 70, medium: 40 } // Standard thresholds
  };

  const marketThreshold = thresholds[market];

  if (score >= marketThreshold.high) {
    level = 'high';
    label = 'Hot Lead';
    color = '#ef4444';
  } else if (score >= marketThreshold.medium) {
    level = 'medium';
    label = 'Warm Lead';
    color = '#f59e0b';
  } else {
    level = 'low';
    label = 'Cold Lead';
    color = '#6b7280';
  }

  // Market-specific context and actions
  switch (market) {
    case 'LATAM':
      marketContext = 'Mercado primario - Colombia focus';
      if (level === 'high') {
        recommendedActions = [
          'Contactar por WhatsApp en 1 hora',
          'Agendar demo en español',
          'Involucrar equipo de Barranquilla'
        ];
      } else if (level === 'medium') {
        recommendedActions = [
          'Llamada en horario colombiano (COT)',
          'Email de seguimiento en español',
          'Compartir casos de éxito locales'
        ];
      } else {
        recommendedActions = [
          'Agregar a campaña de nurturing en español',
          'Monitorear engagement',
          'Contenido sobre iglesias colombianas'
        ];
      }
      break;

    case 'USA':
      marketContext = 'Strategic expansion market - Enterprise focus';
      if (level === 'high') {
        recommendedActions = [
          'Schedule enterprise demo within 2 hours',
          'Connect with USA sales team',
          'Prepare multi-campus presentation'
        ];
      } else if (level === 'medium') {
        recommendedActions = [
          'Business hours follow-up call',
          'Send enterprise feature overview',
          'Share USA case studies'
        ];
      } else {
        recommendedActions = [
          'Add to enterprise nurture campaign',
          'Monitor compliance-related interests',
          'Educational content on scaling'
        ];
      }
      break;

    case 'GLOBAL':
      marketContext = 'International market - Multi-language needs';
      if (level === 'high') {
        recommendedActions = [
          'Schedule international demo (timezone-aware)',
          'Multi-language support preparation',
          'GDPR compliance discussion'
        ];
      } else if (level === 'medium') {
        recommendedActions = [
          'Regional timezone follow-up',
          'International features presentation',
          'Currency and payment options'
        ];
      } else {
        recommendedActions = [
          'Global nurture campaign enrollment',
          'Monitor timezone preferences',
          'Localization content sharing'
        ];
      }
      break;
  }

  return {
    level,
    label,
    color,
    marketContext,
    recommendedActions
  };
}

// Legacy compatibility
export const DefaultLeadScoring = MarketAwareLeadScoring;

export function getLeadPriority(score: number): {
  level: 'high' | 'medium' | 'low';
  label: string;
  color: string;
} {
  // Fallback for legacy usage
  if (score >= 70) {
    return { level: 'high', label: 'Hot Lead', color: '#ef4444' };
  } else if (score >= 40) {
    return { level: 'medium', label: 'Warm Lead', color: '#f59e0b' };
  } else {
    return { level: 'low', label: 'Cold Lead', color: '#6b7280' };
  }
}