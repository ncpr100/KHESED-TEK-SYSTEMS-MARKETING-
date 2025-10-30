// CRM Integration Types and Interfaces

export interface Contact {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  website?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Lead extends Contact {
  score?: number;
  status?: LeadStatus;
  stage?: string;
  notes?: string;
  lastActivity?: Date;
  assignedTo?: string;
}

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost'
}

export interface CRMResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  rateLimitRemaining?: number;
}

export interface CRMConfig {
  provider: string;
  apiKey: string;
  baseUrl?: string;
  additionalConfig?: Record<string, any>;
}

export interface CRMAdapter {
  name: string;
  
  // Contact Management
  createContact(contact: Contact): Promise<CRMResponse<Contact>>;
  updateContact(id: string, contact: Partial<Contact>): Promise<CRMResponse<Contact>>;
  getContact(id: string): Promise<CRMResponse<Contact>>;
  searchContacts(query: string): Promise<CRMResponse<Contact[]>>;
  
  // Lead Management
  createLead(lead: Lead): Promise<CRMResponse<Lead>>;
  updateLead(id: string, lead: Partial<Lead>): Promise<CRMResponse<Lead>>;
  getLead(id: string): Promise<CRMResponse<Lead>>;
  getLeads(filters?: LeadFilters): Promise<CRMResponse<Lead[]>>;
  
  // Activities
  logActivity(contactId: string, activity: Activity): Promise<CRMResponse>;
  getActivities(contactId: string): Promise<CRMResponse<Activity[]>>;
  
  // Health Check
  testConnection(): Promise<CRMResponse>;
}

export interface LeadFilters {
  status?: LeadStatus;
  stage?: string;
  assignedTo?: string;
  source?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  minScore?: number;
  maxScore?: number;
}

export interface Activity {
  type: ActivityType;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export enum ActivityType {
  EMAIL_SENT = 'email_sent',
  EMAIL_OPENED = 'email_opened',
  EMAIL_CLICKED = 'email_clicked',
  FORM_SUBMITTED = 'form_submitted',
  PAGE_VISITED = 'page_visited',
  DEMO_REQUESTED = 'demo_requested',
  CALL_MADE = 'call_made',
  MEETING_SCHEDULED = 'meeting_scheduled',
  NOTE_ADDED = 'note_added'
}

export interface LeadScoring {
  rules: ScoringRule[];
  calculate(lead: Lead, activities: Activity[]): number;
}

export interface ScoringRule {
  name: string;
  condition: (lead: Lead, activities: Activity[]) => boolean;
  points: number;
  description: string;
}