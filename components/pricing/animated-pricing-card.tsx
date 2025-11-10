// Pricing Card Animation Component
'use client';

import { useState } from 'react';
import { PricingPlan } from '@/types/pricing';
import OutlineIcon from '@/components/ui/outline-icon';

interface AnimatedPricingCardProps {
  plan: PricingPlan;
  index: number;
  onSelect?: (planId: string) => void;
  className?: string;
}

export default function AnimatedPricingCard({ 
  plan, 
  index, 
  onSelect,
  className = '' 
}: AnimatedPricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    try {
      if (onSelect) {
        onSelect(plan.id);
      }
      // Navigate to contact form with pre-selected plan
      window.location.href = `/contact?plan=${plan.id}`;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`
        pricing-card group relative overflow-hidden
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
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-black text-sm font-bold px-6 py-2 rounded-full shadow-xl border-2 border-white">
            MÁS POPULAR
          </div>
        </div>
      )}

      {/* Hover Gradient Overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
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
        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          className={`
            w-full font-semibold px-6 py-3 rounded-xl transition-all duration-300
            transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
            ${plan.popular 
              ? 'gradient-btn text-black hover:shadow-xl' 
              : 'border border-[var(--border)] hover:border-[var(--brand)] hover:bg-[var(--brand)]/10'
            }
            ${isHovered ? 'shadow-lg translate-y-[-2px]' : ''}
            ${isLoading ? 'animate-pulse' : ''}
          `}
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                {plan.ctaText || 'Comenzar ahora'}
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