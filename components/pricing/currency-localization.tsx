// Currency Localization Hook and Component
'use client';

import { useState, useEffect } from 'react';
import { LocalizedPrice, CurrencyRate } from '@/types/pricing';

// Simulated exchange rates (in production, fetch from API)
const EXCHANGE_RATES: Record<string, CurrencyRate> = {
  'USD_COP': {
    from: 'USD',
    to: 'COP',
    rate: 4200, // 1 USD = 4200 COP (approximate)
    lastUpdated: new Date()
  },
  'USD_EUR': {
    from: 'USD', 
    to: 'EUR',
    rate: 0.92,
    lastUpdated: new Date()
  },
  'USD_GBP': {
    from: 'USD',
    to: 'GBP', 
    rate: 0.79,
    lastUpdated: new Date()
  }
};

export function useCurrencyLocalization(basePrice: number, baseCurrency: string = 'USD') {
  const [localizedPrices, setLocalizedPrices] = useState<LocalizedPrice[]>([]);
  const [userCurrency, setUserCurrency] = useState<string>('USD');

  useEffect(() => {
    // Detect user's currency based on location (simplified)
    const detectUserCurrency = () => {
      try {
        const locale = navigator.language || 'en-US';
        if (locale.includes('es') && locale.includes('CO')) return 'COP';
        if (locale.includes('es') && locale.includes('MX')) return 'MXN';
        if (locale.includes('eu')) return 'EUR';
        if (locale.includes('gb')) return 'GBP';
        return 'USD';
      } catch {
        return 'USD';
      }
    };

    const detected = detectUserCurrency();
    setUserCurrency(detected);

    // Calculate localized prices
    const prices: LocalizedPrice[] = [];
    
    // Add base currency
    prices.push({
      amount: basePrice,
      currency: baseCurrency,
      symbol: '$',
      formatted: `$${basePrice.toFixed(2)}`,
      isEstimate: false
    });

    // Add localized currencies
    Object.values(EXCHANGE_RATES).forEach(rate => {
      if (rate.from === baseCurrency) {
        const convertedAmount = basePrice * rate.rate;
        const symbol = getCurrencySymbol(rate.to);
        
        prices.push({
          amount: convertedAmount,
          currency: rate.to,
          symbol,
          formatted: formatCurrency(convertedAmount, rate.to),
          isEstimate: true
        });
      }
    });

    setLocalizedPrices(prices);
  }, [basePrice, baseCurrency]);

  return { localizedPrices, userCurrency };
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    COP: '$',
    EUR: '€',
    GBP: '£',
    MXN: '$'
  };
  return symbols[currency] || '$';
}

function formatCurrency(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  
  if (currency === 'COP') {
    // Format Colombian Pesos with thousands separator
    return `${symbol}${Math.round(amount).toLocaleString('es-CO')}`;
  }
  
  return `${symbol}${amount.toFixed(2)}`;
}

interface LocalizedPriceDisplayProps {
  basePrice: number;
  baseCurrency?: string;
  showEstimates?: boolean;
  className?: string;
}

export default function LocalizedPriceDisplay({ 
  basePrice, 
  baseCurrency = 'USD',
  showEstimates = true,
  className = '' 
}: LocalizedPriceDisplayProps) {
  const { localizedPrices, userCurrency } = useCurrencyLocalization(basePrice, baseCurrency);
  const [showAll, setShowAll] = useState(false);

  // Find primary price (user's currency or base currency)
  const primaryPrice = localizedPrices.find(p => p.currency === userCurrency) || localizedPrices[0];
  const estimatedPrices = localizedPrices.filter(p => p.isEstimate && p.currency !== userCurrency);

  if (!primaryPrice) return null;

  return (
    <div className={`localized-price ${className}`}>
      {/* Primary Price */}
      <div className="text-2xl font-bold gradient-text mb-1">
        {primaryPrice.formatted}
        {primaryPrice.isEstimate && (
          <span className="text-xs text-[var(--muted)] ml-1">*</span>
        )}
      </div>

      {/* Estimated Prices */}
      {showEstimates && estimatedPrices.length > 0 && (
        <div className="space-y-1">
          {!showAll && estimatedPrices.length > 1 ? (
            <button
              onClick={() => setShowAll(true)}
              className="text-xs text-[var(--muted)] hover:text-[var(--brand)] transition-colors"
            >
              ≈ {estimatedPrices[0].formatted} • Ver más monedas
            </button>
          ) : (
            estimatedPrices.slice(0, showAll ? undefined : 1).map((price) => (
              <div key={price.currency} className="text-xs text-[var(--muted)]">
                ≈ {price.formatted} {price.currency}
              </div>
            ))
          )}
          
          {showAll && estimatedPrices.length > 1 && (
            <button
              onClick={() => setShowAll(false)}
              className="text-xs text-[var(--muted)] hover:text-[var(--brand)] transition-colors"
            >
              Mostrar menos
            </button>
          )}
        </div>
      )}

      {/* Disclaimer */}
      {showEstimates && estimatedPrices.some(p => p.isEstimate) && (
        <div className="text-xs text-[var(--muted)] mt-2 opacity-75">
          * Precios estimados basados en tasas de cambio actuales
        </div>
      )}
    </div>
  );
}