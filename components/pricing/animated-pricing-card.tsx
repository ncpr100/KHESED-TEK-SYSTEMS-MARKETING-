// Pricing Card Animation Component
'use client';

import { useState } from 'react';
import { PricingPlan } from '@/types/pricing';
import OutlineIcon from '@/components/ui/outline-icon';
// BUG-06 FIX: analytics import REMOVED. Tracking is now the caller's
// responsibility so demo_request never fires twice per click.

interface AnimatedPricingCardProps {
  plan: PricingPlan;
  index: number;
  onSelect?: (planId: string) => void;
  className?: string;
  /**
   * BUG-07 FIX: language prop added so the card renders localized strings.
   * Defaults to 'es' to keep existing LATAM pages working without changes.
   */
  language?: 'es' | 'en';
}

// BUG-07 FIX: all user-visible strings moved into this map
const i18n = {
  es: { popular: 'Más popular', loading: 'Cargando...', cta: 'Solicitar demo' },
  en: { popular: 'Most popular', loading: 'Loading...',  cta: 'Request demo'  },
} as const;

export default function AnimatedPricingCard({ 
  plan, 
  index, 
  onSelect,
  className = '',
  language = 'es',
}: AnimatedPricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const t = i18n[language];

  const handleGetStarted = async () => {
    setIsLoading(true);
    try {
      if (onSelect) {
        onSelect(plan.id);
      }
      // BUG-06 FIX: analytics.demoRequest removed — caller handles it via onSelect
      window.location.href = `/contact?plan=${plan.id}`;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`
        pricing-card group relative overflow-hidden h-full flex flex-col
        transition-all duration-300 ease-out
        ${plan.popular ? 'scale-105 border-[var(--brand)] shadow-lg' : 'hover:scale-105'}
        ${isHovered ? 'shadow-2xl -translate-y-2' : 'shadow-lg'}
        card p-6 cursor-pointer
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
        transformOrigin: 'center bottom'
      }}
    >

      {/* Hover Gradient Overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-6">
          {/* BUG-07 FIX: t.popular replaces hardcoded "Más popular" */}
          {plan.popular && (
            <span className="inline-block bg-[var(--brand)] text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {t.popular}
            </span>
          )}
          <h3 className={`
            text-xl font-semibold mb-2 transition-colors duration-300
            ${isHovered ? 'text-[var(--brand)]' : ''}
          `}>
            {plan.name}
          </h3>
          
          {/* Price with Animation */}
          <div className="relative overflow-hidden">
            <div className={`
              text-3xl font-bold gradient-text mb-1 transition-transform duration-300
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}>
              {plan.price}
              <span className="text-sm text-[var(--muted)] ml-1">{plan.period}</span>
            </div>
            
            {/* Price highlight animation */}
            <div className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-[var(--brand)]/20 to-transparent
              transform transition-transform duration-700 ease-out
              ${isHovered ? 'translate-x-full' : '-translate-x-full'}
            `} />
          </div>
          
          <div className="text-sm text-[var(--muted)]">{plan.members}</div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, fidx) => (
            <li 
              key={fidx} 
              className={`
                flex items-center gap-3 text-sm transition-all duration-300
                ${isHovered ? 'translate-x-1' : ''}
              `}
              style={{ 
                animationDelay: `${(index * 100) + (fidx * 50)}ms`,
                transitionDelay: `${fidx * 30}ms`
              }}
            >
              <OutlineIcon 
                name="check"
                className={`
                  w-4 h-4 text-green-400 transition-all duration-300
                  ${isHovered ? 'scale-125 rotate-12' : ''}
                `}
              />
              <span className={`
                transition-colors duration-300
                ${isHovered ? 'text-[var(--text)]' : ''}
              `}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="mt-auto">
        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          className={`
            w-full font-bold px-6 py-4 transition-all duration-300
            transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
            ${plan.popular 
              ? 'gradient-btn text-black hover:shadow-2xl rounded-full text-lg shadow-xl ring-2 ring-white/20 hover:ring-white/40' 
              : 'border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand)]/10 rounded-xl font-semibold'
            }
            ${isHovered ? 'shadow-lg translate-y-[-2px]' : ''}
            ${isLoading ? 'animate-pulse' : ''}
          `}
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                {/* BUG-07 FIX: t.loading replaces hardcoded "Cargando..." */}
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {t.loading}
              </>
            ) : (
              <>
                {/*
                  BUG-07 FIX: plan.ctaText honoured first (per-plan override),
                  then falls back to localised default (t.cta).
                */}
                {plan.ctaText ?? t.cta}
                <span className={`
                  transition-transform duration-300
                  ${isHovered ? 'translate-x-1' : ''}
                `}>
                  →
                </span>
              </>
            )}
          </span>
        </button>
        </div>
      </div>

      {/* Animated Border */}
      <div className={`
        absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)]
        transition-opacity duration-300 -z-10
        ${plan.popular ? 'opacity-100' : isHovered ? 'opacity-100' : 'opacity-0'}
      `} 
      style={{ 
        padding: '1px',
        background: isHovered 
          ? 'linear-gradient(45deg, var(--brand), var(--brand2), var(--brand))' 
          : undefined
      }} 
      />
    </div>
  );
}