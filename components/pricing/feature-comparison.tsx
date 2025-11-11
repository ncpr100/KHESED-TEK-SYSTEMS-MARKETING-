// Feature Comparison Table Component
'use client';

import { useState } from 'react';
import type { PricingPlan } from '@/types/pricing';

// Icon component for outline icons
const OutlineIcon = ({ name, className = "w-4 h-4" }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    'zap': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
      </svg>
    ),
    'message-circle': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
      </svg>
    ),
    'headphones': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
      </svg>
    ),
    'rocket': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
      </svg>
    ),
    'bar-chart': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    ),
    'video': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    ),
    'shield': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  };

  return icons[name] || null;
};

interface FeatureComparison {
  feature: string;
  description?: string;
  plans: {
    [planId: string]: boolean | string | number;
  };
  category?: string;
}

interface FeatureComparisonTableProps {
  plans: PricingPlan[];
  language?: 'es' | 'en';
  className?: string;
}

const FEATURE_COMPARISONS: FeatureComparison[] = [
  // Core Features
  {
    feature: 'Gestión de miembros',
    description: 'Base de datos completa de miembros con perfiles detallados',
    category: 'core',
    plans: {
      small: true,
      medium: true,
      large: true
    }
  },
  {
    feature: 'Límite de miembros',
    category: 'core',
    plans: {
      small: '200',
      medium: '1,000', 
      large: 'Ilimitado'
    }
  },
  {
    feature: 'WhatsApp integrado',
    description: 'Comunicación directa con miembros via WhatsApp',
    category: 'communication',
    plans: {
      small: true,
      medium: true,
      large: true
    }
  },
  {
    feature: 'Soporte técnico',
    category: 'support',
    plans: {
      small: 'Email',
      medium: 'Email + Chat',
      large: '24/7 Prioritario'
    }
  },
  // Advanced Features
  {
    feature: 'Multi-campus',
    description: 'Gestión de múltiples ubicaciones y sedes',
    category: 'advanced',
    plans: {
      small: false,
      medium: true,
      large: true
    }
  },
  {
    feature: 'API personalizada',
    description: 'Integraciones personalizadas con otros sistemas',
    category: 'advanced',
    plans: {
      small: false,
      medium: false,
      large: true
    }
  },
  {
    feature: 'Reportes avanzados',
    description: 'Analytics detallados y reportes personalizables',
    category: 'analytics',
    plans: {
      small: 'Básicos',
      medium: 'Avanzados',
      large: 'Completos + BI'
    }
  },
  {
    feature: 'Transmisiones en vivo',
    description: 'Streaming y gestión de eventos virtuales',
    category: 'media',
    plans: {
      small: false,
      medium: true,
      large: true
    }
  },
  {
    feature: 'Cumplimiento GDPR',
    description: 'Protección de datos según regulaciones internacionales',
    category: 'security',
    plans: {
      small: false,
      medium: 'Básico',
      large: 'Completo'
    }
  }
];

const CATEGORIES = {
  core: { name: 'Funciones Básicas', icon: 'zap' },
  communication: { name: 'Comunicación', icon: 'message-circle' },
  support: { name: 'Soporte', icon: 'headphones' },
  advanced: { name: 'Funciones Avanzadas', icon: 'rocket' },
  analytics: { name: 'Reportes y Analytics', icon: 'bar-chart' },
  media: { name: 'Multimedia', icon: 'video' },
  security: { name: 'Seguridad', icon: 'shield' }
};

export default function FeatureComparisonTable({ 
  plans, 
  language = 'es',
  className = '' 
}: FeatureComparisonTableProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('core');
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const planIds = plans.map(plan => plan.id);
  const visibleFeatures = showAllFeatures 
    ? FEATURE_COMPARISONS 
    : FEATURE_COMPARISONS.filter(f => f.category === expandedCategory);

  const renderFeatureValue = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center justify-center">
          <span className="text-green-400 text-lg font-bold">✓</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-red-400 text-lg">✗</span>
        </div>
      );
    }
    if (value === undefined || value === null) {
      return (
        <div className="flex items-center justify-center">
          <span className="text-red-400 text-lg">✗</span>
        </div>
      );
    }
    return <span className="text-sm text-[var(--text)]">{value}</span>;
  };

  return (
    <div className={`feature-comparison ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Comparación Detallada de Funciones
        </h3>
        <p className="text-[var(--muted)] max-w-2xl mx-auto">
          Encuentra el plan perfecto comparando todas las funciones disponibles para tu iglesia.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setShowAllFeatures(!showAllFeatures)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            showAllFeatures 
              ? 'bg-[var(--brand)] text-black' 
              : 'border border-[var(--border)] hover:border-[var(--brand)]'
          }`}
        >
          {/* Outline List Icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          Todas las funciones
        </button>
        
        {Object.entries(CATEGORIES).map(([key, category]) => (
          <button
            key={key}
            onClick={() => {
              setExpandedCategory(key);
              setShowAllFeatures(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              expandedCategory === key && !showAllFeatures
                ? 'bg-[var(--brand)] text-black' 
                : 'border border-[var(--border)] hover:border-[var(--brand)]'
            }`}
          >
            <OutlineIcon name={category.icon} className="w-4 h-4" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left p-4 font-semibold">Función</th>
              {plans.map((plan) => (
                <th key={plan.id} className="text-center p-4 min-w-[140px]">
                  <div className={`
                    p-3 rounded-lg border transition-all
                    ${plan.popular 
                      ? 'border-[var(--brand)] bg-[var(--brand)]/10' 
                      : 'border-[var(--border)]'
                    }
                  `}>
                    <div className="font-semibold">{plan.name}</div>
                    <div className="text-sm text-[var(--brand)] font-bold">
                      {plan.price}{plan.period}
                    </div>
                    {plan.popular && (
                      <div className="text-xs text-[var(--brand)] mt-1">
                        MÁS POPULAR
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {visibleFeatures.map((feature, index) => (
              <tr 
                key={feature.feature}
                className={`
                  border-b border-[var(--border)]/50 hover:bg-[var(--surface)]/50 
                  transition-colors group
                `}
              >
                <td className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-medium">{feature.feature}</div>
                      {feature.description && (
                        <div className="text-sm text-[var(--muted)] mt-1">
                          {feature.description}
                        </div>
                      )}
                    </div>
                    {feature.category && (
                      <div className="text-xs bg-[var(--surface)] px-2 py-1 rounded flex items-center justify-center">
                        <OutlineIcon 
                          name={CATEGORIES[feature.category as keyof typeof CATEGORIES]?.icon} 
                          className="w-4 h-4 text-[var(--brand)]"
                        />
                      </div>
                    )}
                  </div>
                </td>
                
                {planIds.map((planId) => (
                  <td key={planId} className="text-center p-4">
                    {renderFeatureValue(feature.plans[planId as keyof typeof feature.plans] || false)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-8 p-6 bg-[var(--surface)] rounded-xl">
        <h4 className="font-semibold mb-2">¿Necesitas ayuda para decidir?</h4>
        <p className="text-[var(--muted)] mb-4">
          Nuestro equipo puede ayudarte a elegir el plan perfecto para tu iglesia.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 gradient-btn text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-transform"
        >
          Solicitar Consulta Gratuita →
        </a>
      </div>
    </div>
  );
}