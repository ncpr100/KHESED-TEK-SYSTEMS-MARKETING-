// Email automation types and interfaces

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  category: EmailCategory;
  language: 'es' | 'en';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum EmailCategory {
  WELCOME = 'welcome',
  NURTURE = 'nurture',
  DEMO_FOLLOW_UP = 'demo_follow_up',
  ONBOARDING = 'onboarding',
  RE_ENGAGEMENT = 're_engagement',
  PROMOTIONAL = 'promotional',
  TRANSACTIONAL = 'transactional'
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  trigger: CampaignTrigger;
  emails: CampaignEmail[];
  settings: CampaignSettings;
  metrics: CampaignMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export enum CampaignType {
  DRIP = 'drip',
  BEHAVIORAL = 'behavioral',
  ONE_TIME = 'one_time',
  RECURRING = 'recurring',
  TIME_BASED = 'time_based'
}

export enum CampaignStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

export interface CampaignTrigger {
  type: TriggerType;
  conditions: TriggerCondition[];
  delay?: number; // minutes
}

export enum TriggerType {
  FORM_SUBMISSION = 'form_submission',
  DEMO_REQUEST = 'demo_request',
  EMAIL_OPENED = 'email_opened',
  EMAIL_CLICKED = 'email_clicked',
  PAGE_VISIT = 'page_visit',
  LEAD_SCORE_THRESHOLD = 'lead_score_threshold',
  TIME_BASED = 'time_based',
  MANUAL = 'manual'
}

export interface TriggerCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'exists' | 'not_exists';
  value: any;
}

export interface CampaignEmail {
  id: string;
  templateId: string;
  stepNumber: number;
  delay: number; // hours after trigger or previous email
  conditions?: TriggerCondition[];
  active: boolean;
}

export interface CampaignSettings {
  timezone: string;
  sendingHours: {
    start: number; // 0-23
    end: number;   // 0-23
  };
  sendingDays: number[]; // 0-6 (Sunday=0)
  maxEmailsPerDay: number;
  respectUnsubscribes: boolean;
  respectDoNotContact: boolean;
}

export interface CampaignMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  emailsSent: number;
  emailsDelivered: number;
  emailsOpened: number;
  emailsClicked: number;
  unsubscribes: number;
  bounces: number;
  complaints: number;
  conversions: number;
  revenue: number;
}

export interface Subscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  status: SubscriberStatus;
  tags: string[];
  customFields: Record<string, any>;
  preferences: SubscriberPreferences;
  subscriptionDate: Date;
  lastActivityDate?: Date;
  unsubscribeDate?: Date;
  unsubscribeReason?: string;
}

export enum SubscriberStatus {
  ACTIVE = 'active',
  UNSUBSCRIBED = 'unsubscribed',
  BOUNCED = 'bounced',
  COMPLAINED = 'complained',
  PENDING = 'pending'
}

export interface SubscriberPreferences {
  emailFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
  categories: EmailCategory[];
  language: 'es' | 'en';
  timezone: string;
}

export interface EmailJob {
  id: string;
  subscriberId: string;
  campaignId: string;
  emailId: string;
  templateId: string;
  scheduledAt: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  status: EmailJobStatus;
  error?: string;
  metadata: Record<string, any>;
}

export enum EmailJobStatus {
  SCHEDULED = 'scheduled',
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  BOUNCED = 'bounced',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface EmailProvider {
  name: string;
  sendEmail(params: SendEmailParams): Promise<SendEmailResult>;
  trackDelivery(emailId: string): Promise<DeliveryStatus>;
  handleWebhook(payload: any): Promise<WebhookResult>;
}

export interface SendEmailParams {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface SendEmailResult {
  success: boolean;
  emailId?: string;
  error?: string;
  rateLimitRemaining?: number;
}

export interface DeliveryStatus {
  status: 'delivered' | 'bounced' | 'complained' | 'unknown';
  timestamp?: Date;
  reason?: string;
}

export interface WebhookResult {
  processed: boolean;
  events: EmailEvent[];
}

export interface EmailEvent {
  type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'unsubscribed';
  emailId: string;
  subscriberId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}