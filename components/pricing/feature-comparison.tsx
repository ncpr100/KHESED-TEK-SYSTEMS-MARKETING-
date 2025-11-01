// Feature Comparison Table Component
'use client';

import { useState } from 'react';
import { PricingPlan } from '@/types/pricing';

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
  core: { name: 'Funciones Básicas', icon: '⚡' },
  communication: { name: 'Comunicación', icon: '♡' },
  support: { name: 'Soporte', icon: '○' },
  advanced: { name: 'Funciones Avanzadas', icon: '⚡' },
  analytics: { name: 'Reportes y Analytics', icon: '田' },
  media: { name: 'Multimedia', icon: '○' },
  security: { name: 'Seguridad', icon: '♡' }
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
        <span className="text-green-400 text-lg">✓</span>
      ) : (
        <span className="text-red-400 text-lg">✗</span>
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
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            showAllFeatures 
              ? 'bg-[var(--brand)] text-black' 
              : 'border border-[var(--border)] hover:border-[var(--brand)]'
          }`}
        >
          📋 Todas las funciones
        </button>
        
        {Object.entries(CATEGORIES).map(([key, category]) => (
          <button
            key={key}
            onClick={() => {
              setExpandedCategory(key);
              setShowAllFeatures(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              expandedCategory === key && !showAllFeatures
                ? 'bg-[var(--brand)] text-black' 
                : 'border border-[var(--border)] hover:border-[var(--brand)]'
            }`}
          >
            {category.icon} {category.name}
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
                      <div className="text-xs bg-[var(--surface)] px-2 py-1 rounded">
                        {CATEGORIES[feature.category as keyof typeof CATEGORIES]?.icon}
                      </div>
                    )}
                  </div>
                </td>
                
                {planIds.map((planId) => (
                  <td key={planId} className="text-center p-4">
                    {renderFeatureValue(feature.plans[planId] || false)}
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