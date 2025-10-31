// ROI Calculator Types and Interfaces

export interface ROIInput {
  churchSize: 'small' | 'medium' | 'large' | 'mega';
  currentSoftwareCost: number;
  adminHoursPerWeek: number;
  volunteerHours: number;
  manualProcesses: number; // 1-10 scale
  growthGoals: 'maintain' | 'modest' | 'aggressive';
}

export interface ROICalculation {
  inputs: ROIInput;
  savings: {
    softwareCost: number;
    timeValue: number;
    efficiencyGains: number;
    total: number;
  };
  investment: {
    monthlySubscription: number;
    implementationCost: number;
    trainingCost: number;
    total: number;
  };
  roi: {
    monthly: number;
    yearly: number;
    paybackPeriod: number; // months
    netValue: number;
  };
  insights: string[];
}

export interface ChurchProfile {
  size: 'small' | 'medium' | 'large' | 'mega';
  memberCount: number;
  typicalBudget: number;
  adminComplexity: number;
  averageHourlyValue: number;
}

export interface ROICalculatorProps {
  language?: 'es' | 'en';
  market?: 'LATAM' | 'USA' | 'GLOBAL';
  showDetailed?: boolean;
  onCalculationChange?: (calculation: ROICalculation) => void;
  className?: string;
}