import { 
  Campaign, 
  CampaignType, 
  CampaignStatus, 
  CampaignTrigger,
  TriggerType,
  Subscriber,
  EmailJob,
  EmailJobStatus,
  EmailCategory 
} from './types';

// Predefined campaigns for KHESED-TEK
export const defaultCampaigns: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'metrics'>[] = [
  // Welcome Series
  {
    name: 'Bienvenida - Nueva Lead',
    description: 'Serie de bienvenida automática para nuevos contactos',
    type: CampaignType.DRIP,
    status: CampaignStatus.ACTIVE,
    trigger: {
      type: TriggerType.FORM_SUBMISSION,
      conditions: [
        { field: 'source', operator: 'equals', value: 'website_form' }
      ],
      delay: 5 // 5 minutes after form submission
    },
    emails: [
      {
        id: 'welcome_1',
        templateId: 'template_1',
        stepNumber: 1,
        delay: 0, // Immediate
        active: true
      },
      {
        id: 'welcome_2',
        templateId: 'template_2',
        stepNumber: 2,
        delay: 24, // 24 hours after first email
        active: true
      },
      {
        id: 'welcome_3',
        templateId: 'template_3',
        stepNumber: 3,
        delay: 72, // 3 days after second email
        active: true
      }
    ],
    settings: {
      timezone: 'America/Bogota',
      sendingHours: { start: 9, end: 18 },
      sendingDays: [1, 2, 3, 4, 5], // Monday to Friday
      maxEmailsPerDay: 2,
      respectUnsubscribes: true,
      respectDoNotContact: true
    }
  },

  // Demo Follow-up
  {
    name: 'Seguimiento Demo',
    description: 'Seguimiento automático para leads que solicitaron demo',
    type: CampaignType.BEHAVIORAL,
    status: CampaignStatus.ACTIVE,
    trigger: {
      type: TriggerType.DEMO_REQUEST,
      conditions: [
        { field: 'wantsDemo', operator: 'equals', value: true }
      ],
      delay: 60 // 1 hour after demo request
    },
    emails: [
      {
        id: 'demo_followup_1',
        templateId: 'template_2',
        stepNumber: 1,
        delay: 0,
        active: true
      },
      {
        id: 'demo_followup_2',
        templateId: 'template_3',
        stepNumber: 2,
        delay: 48, // 2 days later
        conditions: [
          { field: 'lastActivity', operator: 'less_than', value: '2_days_ago' }
        ],
        active: true
      }
    ],
    settings: {
      timezone: 'America/Bogota',
      sendingHours: { start: 8, end: 19 },
      sendingDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
      maxEmailsPerDay: 1,
      respectUnsubscribes: true,
      respectDoNotContact: true
    }
  },

  // High-Value Lead Nurture
  {
    name: 'Nurture - Lead Calificado',
    description: 'Campaña especial para leads con alto puntaje',
    type: CampaignType.BEHAVIORAL,
    status: CampaignStatus.ACTIVE,
    trigger: {
      type: TriggerType.LEAD_SCORE_THRESHOLD,
      conditions: [
        { field: 'score', operator: 'greater_than', value: 70 }
      ],
      delay: 30 // 30 minutes after reaching threshold
    },
    emails: [
      {
        id: 'high_value_1',
        templateId: 'template_2',
        stepNumber: 1,
        delay: 0,
        active: true
      }
    ],
    settings: {
      timezone: 'America/Bogota',
      sendingHours: { start: 9, end: 17 },
      sendingDays: [1, 2, 3, 4, 5],
      maxEmailsPerDay: 1,
      respectUnsubscribes: true,
      respectDoNotContact: true
    }
  },

  // Re-engagement Campaign
  {
    name: 'Reactivación - 30 días',
    description: 'Reactivación para leads inactivos por 30 días',
    type: CampaignType.TIME_BASED,
    status: CampaignStatus.ACTIVE,
    trigger: {
      type: TriggerType.TIME_BASED,
      conditions: [
        { field: 'lastActivity', operator: 'less_than', value: '30_days_ago' },
        { field: 'status', operator: 'equals', value: 'active' }
      ],
      delay: 0
    },
    emails: [
      {
        id: 'reengagement_1',
        templateId: 'template_4',
        stepNumber: 1,
        delay: 0,
        active: true
      }
    ],
    settings: {
      timezone: 'America/Bogota',
      sendingHours: { start: 10, end: 16 },
      sendingDays: [2, 3, 4], // Tuesday to Thursday
      maxEmailsPerDay: 1,
      respectUnsubscribes: true,
      respectDoNotContact: true
    }
  }
];

export class CampaignManager {
  private campaigns: Map<string, Campaign> = new Map();
  private activeJobs: Map<string, EmailJob> = new Map();

  constructor() {
    this.loadDefaultCampaigns();
  }

  private loadDefaultCampaigns(): void {
    const now = new Date();
    defaultCampaigns.forEach((campaign, index) => {
      const id = `campaign_${index + 1}`;
      this.campaigns.set(id, {
        ...campaign,
        id,
        createdAt: now,
        updatedAt: now,
        metrics: {
          totalSubscribers: 0,
          activeSubscribers: 0,
          emailsSent: 0,
          emailsDelivered: 0,
          emailsOpened: 0,
          emailsClicked: 0,
          unsubscribes: 0,
          bounces: 0,
          complaints: 0,
          conversions: 0,
          revenue: 0
        }
      });
    });
  }

  getCampaign(id: string): Campaign | undefined {
    return this.campaigns.get(id);
  }

  getActiveCampaigns(): Campaign[] {
    return Array.from(this.campaigns.values()).filter(
      campaign => campaign.status === CampaignStatus.ACTIVE
    );
  }

  // Check if a subscriber should trigger a campaign
  shouldTriggerCampaign(
    campaign: Campaign, 
    subscriber: Subscriber, 
    context: Record<string, any>
  ): boolean {
    if (campaign.status !== CampaignStatus.ACTIVE) {
      return false;
    }

    // Check trigger conditions
    return this.evaluateConditions(campaign.trigger.conditions, {
      ...subscriber,
      ...context
    });
  }

  private evaluateConditions(
    conditions: any[], 
    data: Record<string, any>
  ): boolean {
    return conditions.every(condition => {
      const value = data[condition.field];
      
      switch (condition.operator) {
        case 'equals':
          return value === condition.value;
        case 'not_equals':
          return value !== condition.value;
        case 'contains':
          return String(value).toLowerCase().includes(String(condition.value).toLowerCase());
        case 'greater_than':
          if (condition.field === 'score') {
            return Number(value) > Number(condition.value);
          }
          return false;
        case 'less_than':
          if (condition.value.includes('_days_ago')) {
            const days = parseInt(condition.value.split('_')[0]);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            return new Date(value) < cutoffDate;
          }
          return false;
        case 'exists':
          return value !== undefined && value !== null && value !== '';
        case 'not_exists':
          return value === undefined || value === null || value === '';
        default:
          return false;
      }
    });
  }

  // Schedule email jobs for a subscriber
  scheduleEmailJobs(
    campaignId: string,
    subscriber: Subscriber,
    startDate: Date = new Date()
  ): EmailJob[] {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return [];

    const jobs: EmailJob[] = [];
    let currentDate = new Date(startDate);

    // Add trigger delay
    if (campaign.trigger.delay) {
      currentDate.setMinutes(currentDate.getMinutes() + campaign.trigger.delay);
    }

    for (const email of campaign.emails.filter(e => e.active)) {
      // Calculate scheduled time
      const scheduledAt = new Date(currentDate);
      scheduledAt.setHours(scheduledAt.getHours() + email.delay);

      // Respect sending hours and days
      const adjustedTime = this.adjustToSendingWindow(scheduledAt, campaign.settings);

      const job: EmailJob = {
        id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        subscriberId: subscriber.id,
        campaignId,
        emailId: email.id,
        templateId: email.templateId,
        scheduledAt: adjustedTime,
        status: EmailJobStatus.SCHEDULED,
        metadata: {
          campaignName: campaign.name,
          stepNumber: email.stepNumber,
          subscriberEmail: subscriber.email
        }
      };

      jobs.push(job);
      this.activeJobs.set(job.id, job);

      // Update current date for next email
      currentDate = adjustedTime;
    }

    return jobs;
  }

  private adjustToSendingWindow(
    dateTime: Date, 
    settings: any
  ): Date {
    const adjusted = new Date(dateTime);
    
    // Check day of week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = adjusted.getDay();
    if (!settings.sendingDays.includes(dayOfWeek)) {
      // Move to next valid day
      const daysToAdd = settings.sendingDays.find((day: number) => day > dayOfWeek) || 
                        (7 - dayOfWeek + settings.sendingDays[0]);
      adjusted.setDate(adjusted.getDate() + (daysToAdd - dayOfWeek));
    }

    // Check sending hours
    const hour = adjusted.getHours();
    if (hour < settings.sendingHours.start) {
      adjusted.setHours(settings.sendingHours.start, 0, 0, 0);
    } else if (hour >= settings.sendingHours.end) {
      // Move to next day at start hour
      adjusted.setDate(adjusted.getDate() + 1);
      adjusted.setHours(settings.sendingHours.start, 0, 0, 0);
      
      // Re-check day of week
      return this.adjustToSendingWindow(adjusted, settings);
    }

    return adjusted;
  }

  // Get scheduled jobs ready to send
  getJobsReadyToSend(maxJobs: number = 50): EmailJob[] {
    const now = new Date();
    return Array.from(this.activeJobs.values())
      .filter(job => 
        job.status === EmailJobStatus.SCHEDULED && 
        job.scheduledAt <= now
      )
      .slice(0, maxJobs);
  }

  updateJobStatus(jobId: string, status: EmailJobStatus, metadata?: Record<string, any>): void {
    const job = this.activeJobs.get(jobId);
    if (job) {
      job.status = status;
      if (metadata) {
        job.metadata = { ...job.metadata, ...metadata };
      }

      // Set timestamps based on status
      const now = new Date();
      switch (status) {
        case EmailJobStatus.SENT:
          job.sentAt = now;
          break;
        case EmailJobStatus.DELIVERED:
          job.deliveredAt = now;
          break;
      }

      // Update campaign metrics
      this.updateCampaignMetrics(job.campaignId, status);
    }
  }

  private updateCampaignMetrics(campaignId: string, status: EmailJobStatus): void {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return;

    switch (status) {
      case EmailJobStatus.SENT:
        campaign.metrics.emailsSent++;
        break;
      case EmailJobStatus.DELIVERED:
        campaign.metrics.emailsDelivered++;
        break;
      case EmailJobStatus.BOUNCED:
        campaign.metrics.bounces++;
        break;
    }
  }

  // Get campaign performance
  getCampaignMetrics(campaignId: string) {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return null;

    const metrics = campaign.metrics;
    return {
      ...metrics,
      deliveryRate: metrics.emailsSent > 0 ? (metrics.emailsDelivered / metrics.emailsSent) * 100 : 0,
      openRate: metrics.emailsDelivered > 0 ? (metrics.emailsOpened / metrics.emailsDelivered) * 100 : 0,
      clickRate: metrics.emailsOpened > 0 ? (metrics.emailsClicked / metrics.emailsOpened) * 100 : 0,
      unsubscribeRate: metrics.emailsDelivered > 0 ? (metrics.unsubscribes / metrics.emailsDelivered) * 100 : 0
    };
  }
}