'use client';

import { useState, useEffect } from 'react';
import { ROIInput, ROICalculation, ChurchProfile, ROICalculatorProps } from '@/types/roi-calculator';
import { trackCTAClick } from '@/lib/analytics';

// Church size profiles with realistic data
const CHURCH_PROFILES: Record<string, ChurchProfile> = {
  small: {
    size: 'small',
    memberCount: 150,
    typicalBudget: 5000,
    adminComplexity: 3,
    averageHourlyValue: 15 // USD/hour for admin work
  },
  medium: {
    size: 'medium',
    memberCount: 500,
    typicalBudget: 15000,
    adminComplexity: 6,
    averageHourlyValue: 20
  },
  large: {
    size: 'large',
    memberCount: 1200,
    typicalBudget: 35000,
    adminComplexity: 8,
    averageHourlyValue: 25
  },
  mega: {
    size: 'mega',
    memberCount: 3000,
    typicalBudget: 75000,
    adminComplexity: 10,
    averageHourlyValue: 30
  }
};

// KHESED-TEK pricing based on church size
const PRICING_TIERS = {
  small: { monthly: 149.99, setup: 299, training: 199 },
  medium: { monthly: 299.99, setup: 599, training: 399 },
  large: { monthly: 599.99, setup: 1199, training: 799 },
  mega: { monthly: 999.99, setup: 1999, training: 1299 }
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
    
    // Calculate savings
    const softwareCostSavings = Math.max(0, inputs.currentSoftwareCost - pricing.monthly);
    const adminEfficiency = inputs.adminHoursPerWeek * 0.3; // 30% time savings
    const volunteerEfficiency = inputs.volunteerHours * 0.25; // 25% volunteer time savings
    const timeValueSavings = (adminEfficiency * profile.averageHourlyValue + volunteerEfficiency * 10) * 4.33; // monthly
    
    // Process efficiency gains (based on manual processes score)
    const processEfficiencyValue = inputs.manualProcesses * 50 * (profile.adminComplexity / 10);
    
    const totalMonthlySavings = softwareCostSavings + timeValueSavings + processEfficiencyValue;
    
    // Calculate investment
    const monthlyInvestment = pricing.monthly;
    const totalInvestment = pricing.monthly + pricing.setup + pricing.training;
    
    // ROI calculations
    const monthlyROI = ((totalMonthlySavings - monthlyInvestment) / monthlyInvestment) * 100;
    const yearlyROI = (((totalMonthlySavings * 12) - (monthlyInvestment * 12)) / (monthlyInvestment * 12)) * 100;
    const paybackPeriod = totalInvestment / Math.max(totalMonthlySavings - monthlyInvestment, 1);
    const netYearlyValue = (totalMonthlySavings - monthlyInvestment) * 12;

    // Generate insights
    const insights = generateInsights(inputs, profile, {
      monthlySavings: totalMonthlySavings,
      monthlyInvestment,
      paybackPeriod,
      yearlyROI
    }, language);

    const newCalculation: ROICalculation = {
      inputs,
      savings: {
        softwareCost: softwareCostSavings,
        timeValue: timeValueSavings,
        efficiencyGains: processEfficiencyValue,
        total: totalMonthlySavings
      },
      investment: {
        monthlySubscription: pricing.monthly,
        implementationCost: pricing.setup,
        trainingCost: pricing.training,
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
    if (market === 'LATAM') {
      return `$${amount.toLocaleString('es-CO')} USD`;
    }
    return `$${amount.toLocaleString('en-US')}`;
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
            {/* ROI Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className="text-2xl font-bold gradient-text mb-1">
                  {formatCurrency(calculation.savings.total)}
                </div>
                <div className="text-sm text-[var(--muted)]">{t.monthlySavings}</div>
              </div>
              
              <div className="text-center p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className="text-2xl font-bold gradient-text mb-1">
                  {calculation.roi.yearly.toFixed(0)}%
                </div>
                <div className="text-sm text-[var(--muted)]">{t.yearlyROI}</div>
              </div>
              
              <div className="text-center p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className="text-2xl font-bold gradient-text mb-1">
                  {calculation.roi.paybackPeriod.toFixed(1)}
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
                      <span>{t.softwareSavings}</span>
                      <span className="font-medium">{formatCurrency(calculation.savings.softwareCost)}/mes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.timeSavings}</span>
                      <span className="font-medium">{formatCurrency(calculation.savings.timeValue)}/mes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.efficiencyGains}</span>
                      <span className="font-medium">{formatCurrency(calculation.savings.efficiencyGains)}/mes</span>
                    </div>
                    <div className="border-t border-[var(--border)] pt-2 flex justify-between font-semibold">
                      <span>{t.totalSavings}</span>
                      <span className="text-green-400">{formatCurrency(calculation.savings.total)}/mes</span>
                    </div>
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="bg-[var(--bg)] rounded-lg p-4 border border-[var(--border)]">
                  <h5 className="font-medium mb-3 text-[var(--brand)]">{t.investmentBreakdown}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t.monthlySubscription}</span>
                      <span className="font-medium">{formatCurrency(calculation.investment.monthlySubscription)}/mes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.implementation}</span>
                      <span className="font-medium">{formatCurrency(calculation.investment.implementationCost)} {t.oneTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.training}</span>
                      <span className="font-medium">{formatCurrency(calculation.investment.trainingCost)} {t.oneTime}</span>
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
                    <span className="text-[var(--brand)] mt-1">💡</span>
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
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to generate insights based on calculation
function generateInsights(
  inputs: ROIInput, 
  profile: ChurchProfile, 
  results: { monthlySavings: number; monthlyInvestment: number; paybackPeriod: number; yearlyROI: number },
  language: 'es' | 'en'
): string[] {
  const insights: string[] = [];

  if (language === 'es') {
    if (results.yearlyROI > 100) {
      insights.push('Excelente ROI: Su inversión se duplicará en el primer año.');
    }
    
    if (results.paybackPeriod < 6) {
      insights.push('Retorno rápido: Recuperará su inversión en menos de 6 meses.');
    }
    
    if (inputs.manualProcesses >= 7) {
      insights.push('Alto potencial de automatización: Sus procesos manuales pueden optimizarse significativamente.');
    }
    
    if (inputs.adminHoursPerWeek > 20) {
      insights.push('Importante ahorro de tiempo: Reducirá considerablemente las horas administrativas.');
    }
    
    if (profile.memberCount > 500 && inputs.growthGoals === 'aggressive') {
      insights.push('Escalabilidad garantizada: El sistema crecerá con su iglesia sin costos adicionales.');
    }
  } else {
    if (results.yearlyROI > 100) {
      insights.push('Excellent ROI: Your investment will double in the first year.');
    }
    
    if (results.paybackPeriod < 6) {
      insights.push('Quick payback: You\'ll recover your investment in less than 6 months.');
    }
    
    if (inputs.manualProcesses >= 7) {
      insights.push('High automation potential: Your manual processes can be significantly optimized.');
    }
    
    if (inputs.adminHoursPerWeek > 20) {
      insights.push('Significant time savings: You\'ll considerably reduce administrative hours.');
    }
    
    if (profile.memberCount > 500 && inputs.growthGoals === 'aggressive') {
      insights.push('Guaranteed scalability: The system will grow with your church without additional costs.');
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
      calculate: '📊 Calcular ROI',
      monthlySavings: 'Ahorro mensual',
      yearlyROI: 'ROI anual',
      paybackMonths: 'Meses de retorno',
      breakdown: 'Desglose detallado',
      savingsBreakdown: '💰 Ahorros mensuales',
      investmentBreakdown: '📊 Inversión requerida',
      softwareSavings: 'Ahorro en software',
      timeSavings: 'Valor del tiempo ahorrado',
      efficiencyGains: 'Ganancias por eficiencia',
      totalSavings: 'Total de ahorros',
      monthlySubscription: 'Suscripción mensual',
      implementation: 'Implementación',
      training: 'Capacitación',
      oneTime: '(única vez)',
      keyInsights: '🎯 Puntos clave',
      ctaTitle: '¿Listo para transformar su iglesia?',
      ctaDescription: 'Solicite una demostración personalizada y vea estos resultados en acción.',
      ctaButton: 'Solicitar demostración →',
      members: 'miembros',
      minimal: 'Mínimos',
      extensive: 'Extensos',
      sizes: {
        small: 'Pequeña',
        medium: 'Mediana', 
        large: 'Grande',
        mega: 'Mega'
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
      calculate: '📊 Calculate ROI',
      monthlySavings: 'Monthly savings',
      yearlyROI: 'Yearly ROI',
      paybackMonths: 'Payback months',
      breakdown: 'Detailed breakdown',
      savingsBreakdown: '💰 Monthly savings',
      investmentBreakdown: '📊 Required investment',
      softwareSavings: 'Software savings',
      timeSavings: 'Time value saved',
      efficiencyGains: 'Efficiency gains',
      totalSavings: 'Total savings',
      monthlySubscription: 'Monthly subscription',
      implementation: 'Implementation',
      training: 'Training',
      oneTime: '(one-time)',
      keyInsights: '🎯 Key insights',
      ctaTitle: 'Ready to transform your church?',
      ctaDescription: 'Request a personalized demo and see these results in action.',
      ctaButton: 'Request demo →',
      members: 'members',
      minimal: 'Minimal',
      extensive: 'Extensive',
      sizes: {
        small: 'Small',
        medium: 'Medium',
        large: 'Large', 
        mega: 'Mega'
      },
      goals: {
        maintain: 'Maintain',
        modest: 'Modest',
        aggressive: 'Aggressive'
      }
    };
  }
}