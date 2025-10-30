import { 
  CRMAdapter, 
  Contact, 
  Lead, 
  CRMResponse, 
  CRMConfig, 
  LeadFilters, 
  Activity,
  ActivityType,
  LeadStatus 
} from '../types';

export class SalesforceAdapter implements CRMAdapter {
  readonly name = 'Salesforce';
  private config: CRMConfig;
  private baseUrl: string;
  private accessToken?: string;

  constructor(config: CRMConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://login.salesforce.com';
  }

  private async authenticate(): Promise<boolean> {
    if (this.accessToken) {
      return true;
    }

    try {
      const response = await fetch(`${this.baseUrl}/services/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.config.additionalConfig?.clientId || '',
          client_secret: this.config.additionalConfig?.clientSecret || '',
        }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        this.accessToken = data.access_token;
        return true;
      }

      console.error('Salesforce authentication failed:', data);
      return false;
    } catch (error) {
      console.error('Salesforce authentication error:', error);
      return false;
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ): Promise<CRMResponse<T>> {
    const authenticated = await this.authenticate();
    if (!authenticated) {
      return {
        success: false,
        error: 'Failed to authenticate with Salesforce',
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: responseData.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private contactToSalesforce(contact: Contact): any {
    return {
      Email: contact.email,
      FirstName: contact.firstName,
      LastName: contact.lastName,
      Company: contact.company,
      Phone: contact.phone,
      Website: contact.website,
      LeadSource: contact.source || 'Website',
      ...contact.customFields,
    };
  }

  private salesforceToContact(sfContact: any): Contact {
    return {
      id: sfContact.Id,
      email: sfContact.Email,
      firstName: sfContact.FirstName,
      lastName: sfContact.LastName,
      company: sfContact.Company,
      phone: sfContact.Phone,
      website: sfContact.Website,
      source: sfContact.LeadSource,
      createdAt: new Date(sfContact.CreatedDate),
      updatedAt: new Date(sfContact.LastModifiedDate),
    };
  }

  private leadToSalesforce(lead: Lead): any {
    const contact = this.contactToSalesforce(lead);
    contact.Status = lead.status || LeadStatus.NEW;
    contact.Rating = lead.score ? this.scoreToRating(lead.score) : 'Cold';
    contact.Description = lead.notes;
    return contact;
  }

  private salesforceToLead(sfLead: any): Lead {
    return {
      id: sfLead.Id,
      email: sfLead.Email,
      firstName: sfLead.FirstName,
      lastName: sfLead.LastName,
      company: sfLead.Company,
      phone: sfLead.Phone,
      website: sfLead.Website,
      source: sfLead.LeadSource,
      status: sfLead.Status as LeadStatus,
      score: this.ratingToScore(sfLead.Rating),
      notes: sfLead.Description,
      createdAt: new Date(sfLead.CreatedDate),
      updatedAt: new Date(sfLead.LastModifiedDate),
    };
  }

  private scoreToRating(score: number): string {
    if (score >= 80) return 'Hot';
    if (score >= 60) return 'Warm';
    return 'Cold';
  }

  private ratingToScore(rating: string): number {
    switch (rating) {
      case 'Hot': return 90;
      case 'Warm': return 70;
      case 'Cold': return 30;
      default: return 0;
    }
  }

  async testConnection(): Promise<CRMResponse> {
    const result = await this.makeRequest('/services/data/v58.0/sobjects/Lead/describe');
    return {
      success: result.success,
      error: result.error,
    };
  }

  async createContact(contact: Contact): Promise<CRMResponse<Contact>> {
    const sfData = this.contactToSalesforce(contact);
    const result = await this.makeRequest<any>('/services/data/v58.0/sobjects/Contact', 'POST', sfData);
    
    if (result.success && result.data?.id) {
      const getResult = await this.getContact(result.data.id);
      return getResult;
    }
    
    return result;
  }

  async updateContact(id: string, contact: Partial<Contact>): Promise<CRMResponse<Contact>> {
    const sfData = this.contactToSalesforce(contact as Contact);
    const result = await this.makeRequest(`/services/data/v58.0/sobjects/Contact/${id}`, 'PUT', sfData);
    
    if (result.success) {
      const getResult = await this.getContact(id);
      return getResult;
    }
    
    return {
      success: false,
      error: result.error,
    };
  }

  async getContact(id: string): Promise<CRMResponse<Contact>> {
    const result = await this.makeRequest<any>(`/services/data/v58.0/sobjects/Contact/${id}`);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.salesforceToContact(result.data),
      };
    }
    
    return result;
  }

  async searchContacts(query: string): Promise<CRMResponse<Contact[]>> {
    const soqlQuery = `SELECT Id, Email, FirstName, LastName, Company, Phone, Website, LeadSource, CreatedDate, LastModifiedDate FROM Contact WHERE Email LIKE '%${query}%' LIMIT 50`;
    const result = await this.makeRequest<any>(`/services/data/v58.0/query/?q=${encodeURIComponent(soqlQuery)}`);
    
    if (result.success && result.data?.records) {
      return {
        ...result,
        data: result.data.records.map((contact: any) => this.salesforceToContact(contact)),
      };
    }
    
    return result;
  }

  async createLead(lead: Lead): Promise<CRMResponse<Lead>> {
    const sfData = this.leadToSalesforce(lead);
    const result = await this.makeRequest<any>('/services/data/v58.0/sobjects/Lead', 'POST', sfData);
    
    if (result.success && result.data?.id) {
      const getResult = await this.getLead(result.data.id);
      return getResult;
    }
    
    return result;
  }

  async updateLead(id: string, lead: Partial<Lead>): Promise<CRMResponse<Lead>> {
    const sfData = this.leadToSalesforce(lead as Lead);
    const result = await this.makeRequest(`/services/data/v58.0/sobjects/Lead/${id}`, 'PUT', sfData);
    
    if (result.success) {
      const getResult = await this.getLead(id);
      return getResult;
    }
    
    return {
      success: false,
      error: result.error,
    };
  }

  async getLead(id: string): Promise<CRMResponse<Lead>> {
    const result = await this.makeRequest<any>(`/services/data/v58.0/sobjects/Lead/${id}`);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.salesforceToLead(result.data),
      };
    }
    
    return result;
  }

  async getLeads(filters?: LeadFilters): Promise<CRMResponse<Lead[]>> {
    let whereClause = '';
    const conditions: string[] = [];

    if (filters?.status) {
      conditions.push(`Status = '${filters.status}'`);
    }
    
    if (filters?.source) {
      conditions.push(`LeadSource = '${filters.source}'`);
    }

    if (conditions.length > 0) {
      whereClause = ` WHERE ${conditions.join(' AND ')}`;
    }

    const soqlQuery = `SELECT Id, Email, FirstName, LastName, Company, Phone, Website, LeadSource, Status, Rating, Description, CreatedDate, LastModifiedDate FROM Lead${whereClause} LIMIT 100`;
    const result = await this.makeRequest<any>(`/services/data/v58.0/query/?q=${encodeURIComponent(soqlQuery)}`);
    
    if (result.success && result.data?.records) {
      return {
        ...result,
        data: result.data.records.map((lead: any) => this.salesforceToLead(lead)),
      };
    }
    
    return result;
  }

  async logActivity(contactId: string, activity: Activity): Promise<CRMResponse> {
    const taskData = {
      WhoId: contactId,
      Subject: this.mapActivityTypeToSubject(activity.type),
      Description: activity.description,
      ActivityDate: activity.timestamp.toISOString().split('T')[0],
      Status: 'Completed',
      Type: this.mapActivityTypeToTaskType(activity.type),
    };

    return this.makeRequest('/services/data/v58.0/sobjects/Task', 'POST', taskData);
  }

  async getActivities(contactId: string): Promise<CRMResponse<Activity[]>> {
    const soqlQuery = `SELECT Id, Subject, Description, ActivityDate, Type, CreatedDate FROM Task WHERE WhoId = '${contactId}' ORDER BY CreatedDate DESC LIMIT 50`;
    const result = await this.makeRequest<any>(`/services/data/v58.0/query/?q=${encodeURIComponent(soqlQuery)}`);
    
    if (result.success && result.data?.records) {
      const activities: Activity[] = result.data.records.map((task: any) => ({
        type: this.mapTaskTypeToActivityType(task.Type),
        description: task.Description || task.Subject,
        timestamp: new Date(task.ActivityDate || task.CreatedDate),
        metadata: {
          id: task.Id,
          subject: task.Subject,
        },
      }));

      return {
        ...result,
        data: activities,
      };
    }
    
    return result;
  }

  private mapActivityTypeToSubject(type: ActivityType): string {
    switch (type) {
      case ActivityType.EMAIL_SENT:
        return 'Email Sent';
      case ActivityType.EMAIL_OPENED:
        return 'Email Opened';
      case ActivityType.EMAIL_CLICKED:
        return 'Email Clicked';
      case ActivityType.FORM_SUBMITTED:
        return 'Form Submitted';
      case ActivityType.DEMO_REQUESTED:
        return 'Demo Requested';
      case ActivityType.CALL_MADE:
        return 'Call Made';
      case ActivityType.MEETING_SCHEDULED:
        return 'Meeting Scheduled';
      default:
        return 'Activity Logged';
    }
  }

  private mapActivityTypeToTaskType(type: ActivityType): string {
    switch (type) {
      case ActivityType.EMAIL_SENT:
      case ActivityType.EMAIL_OPENED:
      case ActivityType.EMAIL_CLICKED:
        return 'Email';
      case ActivityType.CALL_MADE:
        return 'Call';
      case ActivityType.MEETING_SCHEDULED:
        return 'Meeting';
      default:
        return 'Other';
    }
  }

  private mapTaskTypeToActivityType(taskType: string): ActivityType {
    switch (taskType) {
      case 'Email':
        return ActivityType.EMAIL_SENT;
      case 'Call':
        return ActivityType.CALL_MADE;
      case 'Meeting':
        return ActivityType.MEETING_SCHEDULED;
      default:
        return ActivityType.NOTE_ADDED;
    }
  }
}