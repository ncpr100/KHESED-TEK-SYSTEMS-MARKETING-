'use client';

import { TrustSignal, TrustSignalsProps } from '@/types/testimonials';

// Trust signals data
const TRUST_SIGNALS: TrustSignal[] = [
  {
    id: 'ssl-security',
    type: 'security',
    icon: '🔒',
    title: 'SSL Seguro',
    description: 'Encriptación de datos de nivel bancario',
    value: '256-bit',
    market: 'LATAM'
  },
  {
    id: 'ssl-security-en',
    type: 'security',
    icon: '🔒',
    title: 'SSL Secure',
    description: 'Bank-level data encryption',
    value: '256-bit',
    market: 'USA'
  },
  {
    id: 'gdpr-compliance',
    type: 'compliance',
    icon: '🛡️',
    title: 'GDPR Compliant',
    description: 'Cumplimiento total de protección de datos',
    market: 'GLOBAL'
  },
  {
    id: 'iso-certification',
    type: 'certification',
    icon: '📋',
    title: 'ISO 27001',
    description: 'Certificación de seguridad internacional',
    verificationUrl: '#',
    market: 'GLOBAL'
  },
  {
    id: 'soc2-compliance',
    type: 'compliance',
    icon: '✅',
    title: 'SOC 2 Type II',
    description: 'Auditoría de seguridad independiente',
    market: 'USA'
  },
  {
    id: 'uptime-guarantee',
    type: 'uptime',
    icon: '⚡',
    title: 'Uptime',
    description: 'Disponibilidad garantizada',
    value: '99.9%'
  },
  {
    id: 'client-count',
    type: 'clients',
    icon: '🏛️',
    title: 'Iglesias',
    description: 'Confían en nuestra plataforma',
    value: '200+'
  },
  {
    id: 'support-coverage',
    type: 'certification',
    icon: '📞',
    title: 'Soporte',
    description: 'Disponible cuando lo necesitas',
    value: '24/7'
  }
];

export default function TrustSignalsSection({
  signals = TRUST_SIGNALS,
  layout = 'grid',
  showDescriptions = true,
  animated = true,
  className = ""
}: TrustSignalsProps) {

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap justify-center gap-6';
      case 'badges':
        return 'flex flex-wrap justify-center gap-4';
      case 'grid':
      default:
        return 'grid grid-cols-2 md:grid-cols-4 gap-6';
    }
  };

  const getItemClasses = (layout: string) => {
    switch (layout) {
      case 'badges':
        return 'flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm hover:border-[var(--brand)] transition';
      case 'horizontal':
        return 'flex flex-col items-center p-4 min-w-[120px]';
      case 'grid':
      default:
        return 'text-center p-4 card hover:border-[var(--brand)] transition-all duration-300';
    }
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-2">Seguridad y Confianza</h3>
          <p className="text-[var(--muted)] text-sm">
            Protegemos tu información con los más altos estándares de seguridad
          </p>
        </div>

        {/* Trust Signals Grid/Layout */}
        <div className={getLayoutClasses()}>
          {signals.map((signal, index) => (
            <div
              key={signal.id}
              className={`${getItemClasses(layout)} ${animated ? 'hover:scale-105' : ''}`}
              style={{
                animationDelay: animated ? `${index * 100}ms` : undefined
              }}
            >
              {/* Icon */}
              <div className="text-2xl mb-2">
                {signal.icon}
              </div>

              {/* Title */}
              <div className="font-semibold text-sm mb-1">
                {signal.title}
                {signal.value && (
                  <span className="ml-2 text-[var(--brand)] font-bold">
                    {signal.value}
                  </span>
                )}
              </div>

              {/* Description */}
              {showDescriptions && layout !== 'badges' && (
                <div className="text-xs text-[var(--muted)] leading-relaxed">
                  {signal.description}
                </div>
              )}

              {/* Verification Link */}
              {signal.verificationUrl && (
                <a
                  href={signal.verificationUrl}
                  className="text-xs text-[var(--brand)] hover:underline mt-1 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Verificar
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Additional Security Statement */}
        <div className="text-center mt-8 p-4 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
          <div className="text-sm text-[var(--muted)] leading-relaxed">
            🔐 <strong>Compromiso de Seguridad:</strong> Todos los datos están encriptados en tránsito y en reposo. 
            Realizamos auditorías de seguridad regulares y cumplimos con las regulaciones internacionales de protección de datos.
          </div>
        </div>
      </div>
    </section>
  );
}

// Compact Trust Badges Component (for headers/footers)
export function TrustBadges({ 
  variant = 'minimal',
  className = "" 
}: { 
  variant?: 'minimal' | 'detailed';
  className?: string;
}) {
  const badges = [
    { icon: '🔒', text: 'SSL Seguro' },
    { icon: '✅', text: 'GDPR' },
    { icon: '⚡', text: '99.9% Uptime' },
    { icon: '📞', text: '24/7 Soporte' }
  ];

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <div 
          key={index}
          className="flex items-center gap-2 px-3 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-full text-xs text-[var(--muted)] hover:border-[var(--brand)] transition"
        >
          <span>{badge.icon}</span>
          <span>{badge.text}</span>
        </div>
      ))}
    </div>
  );
}