'use client';

import { useState, useEffect } from 'react';
import { ROIInput, ROICalculation, ChurchProfile, ROICalculatorProps } from '@/types/roi-calculator';
import { trackCTAClick } from '@/lib/analytics';
import OutlineIcon from '@/components/ui/outline-icon';

// Church size profiles with realistic data
const CHURCH_PROFILES: Record<string, ChurchProfile> = {
  small: {
    size: 'small',
    memberCount: 200,
    typicalBudget: 8000,
    adminComplexity: 4,
    averageHourlyValue: 15
  },
  medium: {
    size: 'medium',
    memberCount: 1000,
    typicalBudget: 15000,
    adminComplexity: 6,
    averageHourlyValue: 20
  },
  large: {
    size: 'large',
    memberCount: 9999, // Unlimited - using high number for calculations
    typicalBudget: 35000,
    adminComplexity: 8,
    averageHourlyValue: 25
  }
};

// KHESED-TEK pricing based on church size - NO implementation or training fees!
const PRICING_TIERS = {
  small: { monthly: 149.99, setup: 0, training: 0 },
  medium: { monthly: 299.99, setup: 0, training: 0 },
  large: { monthly: 'custom', setup: 0, training: 0 } // Custom pricing for large churches
};

export default function ROICalculator({
  language = 'es',
  market = 'LATAM',
  showDetailed = true,
  onCalculationChange,
  className = ""
}: ROICalculatorProps) {
  const [inputs, setInputs] = useState<ROIInput>({
    churchSize: 'medium',
    currentSoftwareCost: 200,
    adminHoursPerWeek: 15,
    volunteerHours: 8,
    manualProcesses: 5,
    growthGoals: 'modest'
  });

  const [calculation, setCalculation] = useState<ROICalculation | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Calculate ROI based on inputs
  useEffect(() => {
    const profile = CHURCH_PROFILES[inputs.churchSize];
    const pricing = PRICING_TIERS[inputs.churchSize];
    
    // Handle custom pricing case for large churches
    if (pricing.monthly === 'custom') {
      // For custom pricing, show a message to contact sales
      const customResult: ROICalculation = {
        inputs,
        savings: {
          softwareCost: 0,
          timeValue: 0,
          efficiencyGains: 0,
          total: 0
        },
        investment: {
          monthlySubscription: 0,
          implementationCost: 0,
          trainingCost: 0,
          total: 0
        },
        roi: {
          monthly: 0,
          yearly: 0,
          paybackPeriod: 0,
          netValue: 0
        },
        insights: [
          language === 'es' 
            ? 'Para iglesias grandes, ofrecemos soluciones completamente personalizadas'
            : 'For large churches, we offer fully customized solutions',
          language === 'es'
            ? 'Implementación y capacitación completamente gratuitas'
            : 'Completely free implementation and training',
          language === 'es'
            ? 'Precios adaptados a sus necesidades específicas'
            : 'Pricing tailored to your specific needs'
        ]
      };
      setCalculation(customResult);
      onCalculationChange?.(customResult);
      return;
    }
    
    // Calculate savings with realistic percentages
    const monthlySubscriptionCost = pricing.monthly as number;
    const softwareCostSavings = inputs.currentSoftwareCost - monthlySubscriptionCost; // Can be negative
    
    // Competitive advantage: Most church software charges $500-2000 for setup + training
    const competitorImplementationCost = inputs.churchSize === 'small' ? 800 : 
                                       inputs.churchSize === 'medium' ? 1200 : 2000;
    const implementationSavings = competitorImplementationCost; // We charge $0, competitors charge this
    
    const adminEfficiency = inputs.adminHoursPerWeek * 0.15; // Realistic 15% time savings
    const volunteerEfficiency = inputs.volunteerHours * 0.10; // Conservative 10% volunteer time savings
    const timeValueSavings = (adminEfficiency * profile.averageHourlyValue + volunteerEfficiency * 10) * 4.33; // monthly
    
    // Process efficiency gains (evidence-based: $25 per manual process eliminated per month)
    const manualProcessesEliminated = Math.min(inputs.manualProcesses * 0.6, inputs.manualProcesses); // 60% of processes can be automated
    const processEfficiencyValue = manualProcessesEliminated * 25; // $25 per process per month
    
    const totalMonthlySavings = timeValueSavings + processEfficiencyValue; // Only count real operational savings
    const netMonthlySavings = totalMonthlySavings + softwareCostSavings; // Include software cost difference (can be negative)
    
    // Calculate investment - KHESED-TEK advantage: $0 setup and training costs!
    const monthlyInvestment = monthlySubscriptionCost;
    const totalInvestment = monthlySubscriptionCost; // Only first month, no setup costs!
    
    // Realistic ROI calculations based on NET cash flow + implementation savings advantage
    const monthlyNetCashFlow = netMonthlySavings; // Net benefit after all costs
    const yearlyNetCashFlow = monthlyNetCashFlow * 12;
    const firstYearSavings = yearlyNetCashFlow + implementationSavings; // Add one-time implementation savings
    const totalFirstYearCost = monthlySubscriptionCost * 12; // Only subscription cost, no setup!
    
    // ROI = (Net Benefit - Total Investment) / Total Investment * 100
    const yearlyROI = firstYearSavings > 0 ? ((firstYearSavings - totalFirstYearCost) / totalFirstYearCost) * 100 : -100;
    const monthlyROI = monthlyNetCashFlow > 0 ? ((monthlyNetCashFlow - monthlyInvestment) / monthlyInvestment) * 100 : -100;
    
    // Payback period: Much faster with no upfront costs!
    const paybackPeriod = monthlyNetCashFlow > 0 ? totalInvestment / Math.max(monthlyNetCashFlow, 1) : 999; // 999 = never pays back
    const netYearlyValue = firstYearSavings;

    // Generate realistic insights
    const insights = generateInsights(inputs, profile, {
      monthlySavings: netMonthlySavings,
      monthlyInvestment,
      paybackPeriod,
      yearlyROI,
      implementationSavings: competitorImplementationCost
    }, language);

    const newCalculation: ROICalculation = {
      inputs,
      savings: {
        softwareCost: softwareCostSavings, // Can be negative (additional cost)
        timeValue: timeValueSavings,
        efficiencyGains: processEfficiencyValue + (implementationSavings / 12), // Include amortized implementation savings
        total: netMonthlySavings + (implementationSavings / 12) // Net total including amortized implementation advantage
      },
      investment: {
        monthlySubscription: monthlySubscriptionCost,
        implementationCost: pricing.setup, // $0 - our competitive advantage!
        trainingCost: pricing.training, // $0 - our competitive advantage!
        total: totalInvestment
      },
      roi: {
        monthly: monthlyROI,
        yearly: yearlyROI,
        paybackPeriod,
        netValue: netYearlyValue
      },
      insights
    };

    setCalculation(newCalculation);
    onCalculationChange?.(newCalculation);
  }, [inputs, onCalculationChange, language]);

  const handleInputChange = (field: keyof ROIInput, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    setShowResults(true);
    trackCTAClick('roi_calculator', 'calculate_roi');
  };

  const formatCurrency = (amount: number) => {
    // Use en-US format for consistent decimal points (not commas) across all markets
    const formattedAmount = amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    
    if (market === 'LATAM') {
      return `$${formattedAmount} USD`;
    }
    return `$${formattedAmount}`;
  };

  const t = getTranslations(language);

  return (
    <div className={`bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-[var(--brand)]/10 to-[var(--brand2)]/10">
        <h3 className="text-2xl font-semibold mb-2">{t.title}</h3>
        <p className="text-[var(--muted)]">{t.subtitle}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Church Size Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">{t.churchSize}</label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(CHURCH_PROFILES).map(([size, profile]) => (
              <button
                key={size}
                onClick={() => handleInputChange('churchSize', size)}
                className={`p-3 rounded-lg border text-center transition ${
                  inputs.churchSize === size
                    ? 'border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand)]'
                    : 'border-[var(--border)] hover:border-[var(--brand)]'
                }`}
              >
                <div className="font-medium text-sm">{t.sizes[size as keyof typeof t.sizes]}</div>
                <div className="text-xs text-[var(--muted)] mt-1">{profile.memberCount} {t.members}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Software Cost */}
        <div>
          <label className="block text-sm font-medium mb-2">{t.currentCost}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">$</span>
            <input
              type="number"
              value={inputs.currentSoftwareCost}
              onChange={(e) => handleInputChange('currentSoftwareCost', Number(e.target.value))}
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:border-[var(--brand)] focus:outline-none transition"
              placeholder="200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] text-sm">/mes</span>
          </div>
        </div>

        {/* Time Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t.adminHours}</label>
            <div className="relative">
              <input
                type="number"
                value={inputs.adminHoursPerWeek}
                onChange={(e) => handleInputChange('adminHoursPerWeek', Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:border-[var(--brand)] focus:outline-none transition"
                min="1"
                max="40"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] text-sm">hrs/sem</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.volunteerHours}</label>
            <div className="relative">
              <input
                type="number"
                value={inputs.volunteerHours}
                onChange={(e) => handleInputChange('volunteerHours', Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent focus:border-[var(--brand)] focus:outline-none transition"
                min="0"
                max="30"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] text-sm">hrs/sem</span>
            </div>
          </div>
        </div>

        {/* Manual Processes Scale */}
        <div>
          <label className="block text-sm font-medium mb-2">{t.manualProcesses}</label>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="10"
              value={inputs.manualProcesses}
              onChange={(e) => handleInputChange('manualProcesses', Number(e.target.value))}
              className="w-full accent-[var(--brand)]"
            />
            <div className="flex justify-between text-xs text-[var(--muted)]">
              <span>{t.minimal}</span>
              <span className="font-medium text-[var(--brand)]">{inputs.manualProcesses}/10</span>
              <span>{t.extensive}</span>
            </div>
          </div>
        </div>

        {/* Growth Goals */}
        <div>
          <label className="block text-sm font-medium mb-2">{t.growthGoals}</label>
          <div className="grid grid-cols-3 gap-3">
            {(['maintain', 'modest', 'aggressive'] as const).map((goal) => (
              <button
                key={goal}
                onClick={() => handleInputChange('growthGoals', goal)}
                className={`p-3 rounded-lg border text-center transition ${
                  inputs.growthGoals === goal
                    ? 'border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand)]'
                    : 'border-[var(--border)] hover:border-[var(--brand)]'
                }`}
              >
                <div className="text-sm font-medium">{t.goals[goal]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full gradient-btn text-black font-semibold py-3 rounded-lg hover:scale-105 transition"
        >
          {t.calculate}
        </button>

        {/* Results */}
        {showResults && calculation && (
          <div className="space-y-6 pt-6 border-t border-[var(--border)]">
            {/* Special handling for large churches with custom pricing */}
            {inputs.churchSize === 'large' ? (
              <div className="text-center p-8 bg-gradient-to-r from-[var(--brand)]/10 to-[var(--brand2)]/10 rounded-lg border border-[var(--border)]">
                <h4 className="text-xl font-semibold mb-4">
                  {language === 'es' ? 'Soluciones Personalizadas para Iglesias Grandes' : 'Custom Solutions for Large Churches'}
                </h4>
                <p className="text-[var(--muted)] mb-6">
                  {language === 'es' 
                    ? 'Para iglesias grandes con necesidades específicas, ofrecemos soluciones completamente personalizadas con precios adaptados a su organización.'
                    : 'For large churches with specific needs, we offer fully customized solutions with pricing tailored to your organization.'
                  }
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                    <h5 className="font-medium mb-2 text-[var(--brand)]">
                      {language === 'es' ? 'Incluido Siempre' : 'Always Included'}
                    </h5>
                    <ul className="text-sm space-y-1 text-left">
                      <li className="flex items-center gap-2">
                        <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                        <span>{language === 'es' ? 'Implementación GRATIS' : 'FREE Implementation'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <OutlineIcon name="zap" className="w-3 h-3 text-cyan-400" />
                        <span>{language === 'es' ? 'Capacitación completa' : 'Complete Training'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <OutlineIcon name="headphones" className="w-3 h-3 text-cyan-400" />
                        <span>{language === 'es' ? 'Soporte dedicado' : 'Dedicated Support'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <OutlineIcon name="diamond" className="w-3 h-3 text-cyan-400" />
                        <span>{language === 'es' ? 'API personalizada' : 'Custom API'}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                    <h5 className="font-medium mb-2 text-[var(--brand)]">
                      {language === 'es' ? 'Características Avanzadas' : 'Advanced Features'}
                    </h5>
                    <ul className="text-sm space-y-1 text-left">
                      <li className="flex items-center gap-2">
                        <OutlineIcon name="marker" className="w-3 h-3 text-cyan-400" />
                        <span>{language === 'es' ? 'Multi-campus' : 'Multi-campus'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <OutlineIcon name="square" className="w-3 h-3 text-cyan-400" />
                        <span>{language === 'es' ? 'Integración completa' : 'Full Integration'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <OutlineIcon name="shield" className="w-3 h-3 text-cyan-400" />
                        <span>{language === 'es' ? 'Cumplimiento GDPR' : 'GDPR Compliance'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <OutlineIcon name="users" className="w-3 h-3 text-cyan-400" />
                        <span>{language === 'es' ? 'SLA garantizado' : 'Guaranteed SLA'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <a
                  href="/contact?plan=large"
                  className="inline-flex items-center gradient-btn text-black font-semibold px-8 py-3 rounded-lg hover:scale-105 transition"
                  onClick={() => trackCTAClick('roi_calculator', 'request_custom_quote')}
                >
                  {language === 'es' ? 'Solicitar Cotización Personalizada' : 'Request Custom Quote'}
                </a>
              </div>
            ) : (
              <>
                {/* Standard ROI Summary for small/medium churches */}
            {/* ROI Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className={`text-2xl font-bold mb-1 ${calculation.savings.total >= 0 ? 'gradient-text' : 'text-red-400'}`}>
                  {calculation.savings.total >= 0 ? '+' : ''}{formatCurrency(calculation.savings.total)}
                </div>
                <div className="text-sm text-[var(--muted)]">{t.monthlySavings}</div>
              </div>
              
              <div className="text-center p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className={`text-2xl font-bold mb-1 ${calculation.roi.yearly >= 0 ? 'gradient-text' : 'text-red-400'}`}>
                  {calculation.roi.yearly >= 0 ? '+' : ''}{calculation.roi.yearly.toFixed(0)}%
                </div>
                <div className="text-sm text-[var(--muted)]">{t.yearlyROI}</div>
              </div>
              
              <div className="text-center p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className={`text-2xl font-bold mb-1 ${calculation.roi.paybackPeriod < 36 ? 'gradient-text' : 'text-yellow-400'}`}>
                  {calculation.roi.paybackPeriod > 100 ? '∞' : calculation.roi.paybackPeriod.toFixed(1)}
                </div>
                <div className="text-sm text-[var(--muted)]">{t.paybackMonths}</div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            {showDetailed && (
              <div className="space-y-4">
                <h4 className="font-semibold">{t.breakdown}</h4>
                
                {/* Savings Breakdown */}
                <div className="bg-[var(--bg)] rounded-lg p-4 border border-[var(--border)]">
                  <h5 className="font-medium mb-3 text-green-400">{t.savingsBreakdown}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{calculation.savings.softwareCost >= 0 ? t.softwareSavings : 'Costo adicional de software'}</span>
                      <span className={`font-medium ${calculation.savings.softwareCost >= 0 ? '' : 'text-red-400'}`}>
                        {calculation.savings.softwareCost >= 0 ? '+' : ''}{formatCurrency(calculation.savings.softwareCost)}/mes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.timeSavings}</span>
                      <span className="font-medium text-green-400">+{formatCurrency(calculation.savings.timeValue)}/mes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.efficiencyGains}</span>
                      <span className="font-medium text-green-400">+{formatCurrency(calculation.savings.efficiencyGains)}/mes</span>
                    </div>
                    <div className="border-t border-[var(--border)] pt-2 flex justify-between font-semibold">
                      <span>{t.totalSavings}</span>
                      <span className={`${calculation.savings.total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {calculation.savings.total >= 0 ? '+' : ''}{formatCurrency(calculation.savings.total)}/mes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="bg-[var(--bg)] rounded-lg p-4 border border-[var(--border)]">
                  <h5 className="font-medium mb-3 text-[var(--brand)]">{t.investmentBreakdown}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t.monthlySubscription}</span>
                      <span className="font-medium">
                        {calculation.investment.monthlySubscription === 0 ? 
                          (language === 'es' ? 'Contactar para precio' : 'Contact for pricing') : 
                          `${formatCurrency(calculation.investment.monthlySubscription)}/mes`
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.implementation}</span>
                      <span className="font-bold text-green-400">GRATIS (${formatCurrency(800)}-${formatCurrency(3000)} ahorro)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.training}</span>
                      <span className="font-bold text-green-400">GRATIS (incluido)</span>
                    </div>
                    <div className="border-t border-[var(--border)] pt-2 flex justify-between font-semibold">
                      <span>Total inicial</span>
                      <span className="text-[var(--brand)]">
                        {calculation.investment.monthlySubscription === 0 ? 
                          (language === 'es' ? 'Contactar para precio' : 'Contact for pricing') : 
                          `${formatCurrency(calculation.investment.monthlySubscription)} (solo 1er mes)`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Key Insights */}
            <div className="bg-gradient-to-r from-[var(--brand)]/10 to-[var(--brand2)]/10 rounded-lg p-4 border border-[var(--border)]">
              <h5 className="font-medium mb-3">{t.keyInsights}</h5>
              <ul className="space-y-2 text-sm">
                {calculation.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <OutlineIcon name="check" className="w-3 h-3 text-[var(--brand)] mt-1 flex-shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center p-6 bg-gradient-to-r from-[var(--brand)]/5 to-[var(--brand2)]/5 rounded-lg border border-[var(--border)]">
              <h4 className="font-semibold mb-2">{t.ctaTitle}</h4>
              <p className="text-[var(--muted)] mb-4 text-sm">{t.ctaDescription}</p>
              <a
                href="/contact"
                className="inline-flex items-center gradient-btn text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 transition"
                onClick={() => trackCTAClick('roi_calculator', 'request_demo')}
              >
                {t.ctaButton}
              </a>
            </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to generate realistic insights based on calculation
function generateInsights(
  inputs: ROIInput, 
  profile: ChurchProfile, 
  results: { monthlySavings: number; monthlyInvestment: number; paybackPeriod: number; yearlyROI: number; implementationSavings: number },
  language: 'es' | 'en'
): string[] {
  const insights: string[] = [];

  if (language === 'es') {
    // Always highlight our implementation advantage
    insights.push(`Ahorro en implementación: $${results.implementationSavings.toLocaleString('en-US')} vs competidores (implementación y capacitación GRATIS).`);
    
    if (results.yearlyROI > 20) {
      insights.push('ROI positivo: Su inversión generará retornos superiores al 20% anual.');
    } else if (results.yearlyROI < 0) {
      insights.push('Inversión a largo plazo: Los beneficios se materializarán gradualmente.');
    }
    
    if (results.paybackPeriod < 12) {
      insights.push('Retorno rápido: Sin costos iniciales, recupera la inversión en menos de 1 año.');
    } else if (results.paybackPeriod < 24) {
      insights.push('Retorno razonable: Recuperará su inversión en menos de 2 años.');
    }
    
    if (inputs.manualProcesses >= 7) {
      insights.push('Potencial de automatización: Puede eliminar aproximadamente 60% de procesos manuales.');
    }
    
    if (inputs.adminHoursPerWeek > 20) {
      insights.push('Ahorro de tiempo estimado: Reducción del 15% en horas administrativas.');
    }
    
    if (profile.memberCount > 500) {
      insights.push('Escalabilidad necesaria: Un sistema robusto es esencial para iglesias grandes.');
    }
  } else {
    // Always highlight our implementation advantage
    insights.push(`Implementation savings: $${results.implementationSavings.toLocaleString('en-US')} vs competitors (FREE setup and training).`);
    
    if (results.yearlyROI > 20) {
      insights.push('Positive ROI: Your investment will generate returns above 20% annually.');
    } else if (results.yearlyROI < 0) {
      insights.push('Long-term investment: Benefits will materialize gradually over time.');
    }
    
    if (results.paybackPeriod < 12) {
      insights.push('Quick payback: With no upfront costs, you recover investment in less than 1 year.');
    } else if (results.paybackPeriod < 24) {
      insights.push('Reasonable payback: You\'ll recover your investment in less than 2 years.');
    }
    
    if (inputs.manualProcesses >= 7) {
      insights.push('Automation potential: You can eliminate approximately 60% of manual processes.');
    }
    
    if (inputs.adminHoursPerWeek > 20) {
      insights.push('Estimated time savings: 15% reduction in administrative hours.');
    }
    
    if (profile.memberCount > 500) {
      insights.push('Scalability needed: A robust system is essential for large churches.');
    }
  }

  return insights;
}

// Translation helper
function getTranslations(language: 'es' | 'en') {
  if (language === 'es') {
    return {
      title: 'Calculadora de ROI',
      subtitle: 'Descubra cuánto puede ahorrar su iglesia con KHESED-TEK',
      churchSize: 'Tamaño de su iglesia',
      currentCost: 'Costo actual de software (mensual)',
      adminHours: 'Horas administrativas por semana',
      volunteerHours: 'Horas de voluntarios por semana',
      manualProcesses: 'Nivel de procesos manuales',
      growthGoals: 'Objetivos de crecimiento',
      calculate: '田 Calcular ROI',
      monthlySavings: 'Ahorro mensual',
      yearlyROI: 'ROI anual',
      paybackMonths: 'Meses de retorno',
      breakdown: 'Desglose detallado',
      savingsBreakdown: '$ Ahorros mensuales',
      investmentBreakdown: '田 Inversión requerida',
      softwareSavings: 'Ahorro en software',
      timeSavings: 'Valor del tiempo ahorrado',
      efficiencyGains: 'Ganancias por eficiencia',
      totalSavings: 'Total de ahorros',
      monthlySubscription: 'Suscripción mensual',
      implementation: 'Implementación',
      training: 'Capacitación',
      oneTime: '(única vez)',
      keyInsights: 'Puntos clave',
      ctaTitle: '¿Listo para transformar su iglesia?',
      ctaDescription: 'Solicite una demostración personalizada y vea estos resultados en acción.',
      ctaButton: 'Solicitar demostración →',
      members: 'miembros',
      minimal: 'Mínimos',
      extensive: 'Extensos',
      sizes: {
        small: 'Pequeña',
        medium: 'Mediana', 
        large: 'Grande'
      },
      goals: {
        maintain: 'Mantener',
        modest: 'Moderado',
        aggressive: 'Agresivo'
      }
    };
  } else {
    return {
      title: 'ROI Calculator',
      subtitle: 'Discover how much your church can save with KHESED-TEK',
      churchSize: 'Church size',
      currentCost: 'Current software cost (monthly)',
      adminHours: 'Administrative hours per week',
      volunteerHours: 'Volunteer hours per week',
      manualProcesses: 'Manual processes level',
      growthGoals: 'Growth objectives',
      calculate: '田 Calculate ROI',
      monthlySavings: 'Monthly savings',
      yearlyROI: 'Yearly ROI',
      paybackMonths: 'Payback months',
      breakdown: 'Detailed breakdown',
      savingsBreakdown: '$ Monthly savings',
      investmentBreakdown: '田 Required investment',
      softwareSavings: 'Software savings',
      timeSavings: 'Time value saved',
      efficiencyGains: 'Efficiency gains',
      totalSavings: 'Total savings',
      monthlySubscription: 'Monthly subscription',
      implementation: 'Implementation',
      training: 'Training',
      oneTime: '(one-time)',
      keyInsights: 'Key insights',
      ctaTitle: 'Ready to transform your church?',
      ctaDescription: 'Request a personalized demo and see these results in action.',
      ctaButton: 'Request demo →',
      members: 'members',
      minimal: 'Minimal',
      extensive: 'Extensive',
      sizes: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large'
      },
      goals: {
        maintain: 'Maintain',
        modest: 'Modest',
        aggressive: 'Aggressive'
      }
    };
  }
}