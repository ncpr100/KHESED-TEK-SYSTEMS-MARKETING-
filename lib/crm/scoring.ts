import { Lead, Activity, ActivityType, LeadScoring, ScoringRule } from './types';

export class DefaultLeadScoring implements LeadScoring {
  rules: ScoringRule[] = [
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
      name: 'church_in_company_name',
      condition: (lead) => {
        const company = lead.company?.toLowerCase() || '';
        return company.includes('iglesia') || 
               company.includes('church') || 
               company.includes('ministerio') || 
               company.includes('ministry');
      },
      points: 25,
      description: 'Company name indicates religious organization',
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

    // Frequency Scoring
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
      description: 'Multiple activities in the last 7 days',
    },
    {
      name: 'high_engagement',
      condition: (_, activities) => activities.length >= 5,
      points: 25,
      description: 'High overall engagement (5+ activities)',
    },

    // Negative Scoring
    {
      name: 'no_recent_activity',
      condition: (_, activities) => {
        if (activities.length === 0) return false;
        const lastActivity = Math.max(...activities.map(a => a.timestamp.getTime()));
        const daysSince = (Date.now() - lastActivity) / (1000 * 60 * 60 * 24);
        return daysSince > 30;
      },
      points: -10,
      description: 'No activity in the last 30 days',
    },
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

  calculate(lead: Lead, activities: Activity[]): number {
    let totalScore = 0;
    const appliedRules: string[] = [];

    for (const rule of this.rules) {
      try {
        if (rule.condition(lead, activities)) {
          totalScore += rule.points;
          appliedRules.push(rule.name);
        }
      } catch (error) {
        console.warn(`Error evaluating scoring rule ${rule.name}:`, error);
      }
    }

    // Ensure score is between 0 and 100
    const finalScore = Math.max(0, Math.min(100, totalScore));

    // Log scoring details for debugging
    console.log(`Lead scoring for ${lead.email}:`, {
      finalScore,
      totalScore,
      appliedRules,
      activitiesCount: activities.length,
    });

    return finalScore;
  }

  getScoreBreakdown(lead: Lead, activities: Activity[]): {
    score: number;
    breakdown: { rule: string; points: number; description: string }[];
  } {
    const breakdown: { rule: string; points: number; description: string }[] = [];
    let totalScore = 0;

    for (const rule of this.rules) {
      try {
        if (rule.condition(lead, activities)) {
          totalScore += rule.points;
          breakdown.push({
            rule: rule.name,
            points: rule.points,
            description: rule.description,
          });
        }
      } catch (error) {
        console.warn(`Error evaluating scoring rule ${rule.name}:`, error);
      }
    }

    const finalScore = Math.max(0, Math.min(100, totalScore));

    return {
      score: finalScore,
      breakdown,
    };
  }
}

export function getLeadPriority(score: number): {
  level: 'high' | 'medium' | 'low';
  label: string;
  color: string;
} {
  if (score >= 70) {
    return {
      level: 'high',
      label: 'Hot Lead',
      color: '#ef4444', // red
    };
  } else if (score >= 40) {
    return {
      level: 'medium',
      label: 'Warm Lead',
      color: '#f59e0b', // amber
    };
  } else {
    return {
      level: 'low',
      label: 'Cold Lead',
      color: '#6b7280', // gray
    };
  }
}

export function shouldAutoAssign(lead: Lead, score: number): boolean {
  // Auto-assign high-priority leads
  if (score >= 70) return true;
  
  // Auto-assign demo requests regardless of score
  return lead.customFields?.wantsDemo === true;
}

export function getRecommendedActions(lead: Lead, activities: Activity[], score: number): string[] {
  const actions: string[] = [];
  const priority = getLeadPriority(score);

  if (priority.level === 'high') {
    actions.push('Contact within 1 hour');
    actions.push('Schedule demo call');
  } else if (priority.level === 'medium') {
    actions.push('Contact within 24 hours');
    actions.push('Send personalized email');
  } else {
    actions.push('Add to nurture campaign');
    actions.push('Monitor engagement');
  }

  // Specific recommendations based on data
  if (!lead.phone) {
    actions.push('Request phone number');
  }

  if (!lead.company) {
    actions.push('Ask about organization');
  }

  const hasEmailEngagement = activities.some(a => 
    a.type === ActivityType.EMAIL_OPENED || a.type === ActivityType.EMAIL_CLICKED
  );
  
  if (!hasEmailEngagement) {
    actions.push('Try different email approach');
  }

  const recentActivities = activities.filter(a => {
    const daysSince = (Date.now() - a.timestamp.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= 7;
  });

  if (recentActivities.length === 0 && activities.length > 0) {
    actions.push('Re-engagement campaign needed');
  }

  return actions;
}