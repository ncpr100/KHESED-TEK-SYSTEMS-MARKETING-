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

export class PipedriveAdapter implements CRMAdapter {
  readonly name = 'Pipedrive';
  private config: CRMConfig;
  private baseUrl: string;

  constructor(config: CRMConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.pipedrive.com/v1';
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ): Promise<CRMResponse<T>> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      url.searchParams.append('api_token', this.config.apiKey);

      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        return {
          success: false,
          error: responseData.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: responseData.data,
        rateLimitRemaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0'),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private contactToPipedrive(contact: Contact): any {
    return {
      email: [{ value: contact.email, primary: true }],
      name: `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
      phone: contact.phone ? [{ value: contact.phone, primary: true }] : undefined,
      org_name: contact.company,
      ...contact.customFields,
    };
  }

  private pipedriveToContact(pdContact: any): Contact {
    const primaryEmail = pdContact.email?.find((e: any) => e.primary)?.value || 
                        pdContact.email?.[0]?.value;
    const primaryPhone = pdContact.phone?.find((p: any) => p.primary)?.value || 
                        pdContact.phone?.[0]?.value;
    
    const [firstName, ...lastNameParts] = (pdContact.name || '').split(' ');
    
    return {
      id: pdContact.id?.toString(),
      email: primaryEmail,
      firstName: firstName || undefined,
      lastName: lastNameParts.join(' ') || undefined,
      company: pdContact.org_name,
      phone: primaryPhone,
      createdAt: new Date(pdContact.add_time),
      updatedAt: new Date(pdContact.update_time),
    };
  }

  private leadToPipedrive(lead: Lead): any {
    return {
      title: `${lead.firstName || ''} ${lead.lastName || ''} - ${lead.company || 'Lead'}`.trim(),
      person_id: lead.id ? parseInt(lead.id) : undefined,
      value: { amount: lead.score || 0, currency: 'USD' },
      status: this.mapLeadStatusToPipedrive(lead.status),
      stage_id: 1, // Default to first stage
      expected_close_date: lead.lastActivity ? lead.lastActivity.toISOString().split('T')[0] : undefined,
      notes: lead.notes,
    };
  }

  private pipedriveToDeal(pdDeal: any): Lead {
    return {
      id: pdDeal.id?.toString(),
      email: '', // Will be populated from person data
      firstName: undefined,
      lastName: undefined,
      company: pdDeal.org_name,
      score: pdDeal.value || 0,
      status: this.mapPipedriveStatusToLead(pdDeal.status),
      notes: pdDeal.notes,
      createdAt: new Date(pdDeal.add_time),
      updatedAt: new Date(pdDeal.update_time),
    };
  }

  private mapLeadStatusToPipedrive(status?: LeadStatus): string {
    switch (status) {
      case LeadStatus.NEW:
        return 'open';
      case LeadStatus.CONTACTED:
      case LeadStatus.QUALIFIED:
      case LeadStatus.PROPOSAL:
      case LeadStatus.NEGOTIATION:
        return 'open';
      case LeadStatus.CLOSED_WON:
        return 'won';
      case LeadStatus.CLOSED_LOST:
        return 'lost';
      default:
        return 'open';
    }
  }

  private mapPipedriveStatusToLead(status: string): LeadStatus {
    switch (status) {
      case 'won':
        return LeadStatus.CLOSED_WON;
      case 'lost':
        return LeadStatus.CLOSED_LOST;
      case 'open':
      default:
        return LeadStatus.NEW;
    }
  }

  async testConnection(): Promise<CRMResponse> {
    const result = await this.makeRequest('/users/me');
    return {
      success: result.success,
      error: result.error,
      rateLimitRemaining: result.rateLimitRemaining,
    };
  }

  async createContact(contact: Contact): Promise<CRMResponse<Contact>> {
    const pdData = this.contactToPipedrive(contact);
    const result = await this.makeRequest<any>('/persons', 'POST', pdData);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.pipedriveToContact(result.data),
      };
    }
    
    return result;
  }

  async updateContact(id: string, contact: Partial<Contact>): Promise<CRMResponse<Contact>> {
    const pdData = this.contactToPipedrive(contact as Contact);
    const result = await this.makeRequest<any>(`/persons/${id}`, 'PUT', pdData);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.pipedriveToContact(result.data),
      };
    }
    
    return result;
  }

  async getContact(id: string): Promise<CRMResponse<Contact>> {
    const result = await this.makeRequest<any>(`/persons/${id}`);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.pipedriveToContact(result.data),
      };
    }
    
    return result;
  }

  async searchContacts(query: string): Promise<CRMResponse<Contact[]>> {
    const result = await this.makeRequest<any>(`/persons/search?term=${encodeURIComponent(query)}`);
    
    if (result.success && result.data?.items) {
      return {
        ...result,
        data: result.data.items.map((item: any) => this.pipedriveToContact(item.item)),
      };
    }
    
    return result;
  }

  async createLead(lead: Lead): Promise<CRMResponse<Lead>> {
    // First create the person if needed
    let personId: string | undefined;
    
    if (lead.email) {
      const contactResult = await this.createContact(lead);
      if (contactResult.success && contactResult.data?.id) {
        personId = contactResult.data.id;
      }
    }

    // Create the deal
    const dealData = this.leadToPipedrive(lead);
    if (personId) {
      dealData.person_id = parseInt(personId);
    }

    const result = await this.makeRequest<any>('/deals', 'POST', dealData);
    
    if (result.success && result.data) {
      const leadData = this.pipedriveToDeal(result.data);
      // Populate contact info if we have a person
      if (personId) {
        const contactResult = await this.getContact(personId);
        if (contactResult.success && contactResult.data) {
          leadData.email = contactResult.data.email;
          leadData.firstName = contactResult.data.firstName;
          leadData.lastName = contactResult.data.lastName;
        }
      }
      
      return {
        ...result,
        data: leadData,
      };
    }
    
    return result;
  }

  async updateLead(id: string, lead: Partial<Lead>): Promise<CRMResponse<Lead>> {
    const dealData = this.leadToPipedrive(lead as Lead);
    const result = await this.makeRequest<any>(`/deals/${id}`, 'PUT', dealData);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.pipedriveToDeal(result.data),
      };
    }
    
    return result;
  }

  async getLead(id: string): Promise<CRMResponse<Lead>> {
    const result = await this.makeRequest<any>(`/deals/${id}`);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.pipedriveToDeal(result.data),
      };
    }
    
    return result;
  }

  async getLeads(filters?: LeadFilters): Promise<CRMResponse<Lead[]>> {
    let endpoint = '/deals';
    const params: string[] = [];

    if (filters?.status) {
      params.push(`status=${this.mapLeadStatusToPipedrive(filters.status)}`);
    }

    if (params.length > 0) {
      endpoint += `?${params.join('&')}`;
    }

    const result = await this.makeRequest<any>(endpoint);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: result.data.map((deal: any) => this.pipedriveToDeal(deal)),
      };
    }
    
    return result;
  }

  async logActivity(contactId: string, activity: Activity): Promise<CRMResponse> {
    const activityData = {
      subject: this.mapActivityTypeToSubject(activity.type),
      type: this.mapActivityTypeToPipedrive(activity.type),
      person_id: parseInt(contactId),
      note: activity.description,
      due_date: activity.timestamp.toISOString().split('T')[0],
      done: 1,
    };

    return this.makeRequest('/activities', 'POST', activityData);
  }

  async getActivities(contactId: string): Promise<CRMResponse<Activity[]>> {
    const result = await this.makeRequest<any>(`/persons/${contactId}/activities`);
    
    if (result.success && result.data) {
      const activities: Activity[] = result.data.map((pdActivity: any) => ({
        type: this.mapPipedriveToActivityType(pdActivity.type),
        description: pdActivity.note || pdActivity.subject,
        timestamp: new Date(pdActivity.due_date || pdActivity.add_time),
        metadata: {
          id: pdActivity.id,
          subject: pdActivity.subject,
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

  private mapActivityTypeToPipedrive(type: ActivityType): string {
    switch (type) {
      case ActivityType.EMAIL_SENT:
      case ActivityType.EMAIL_OPENED:
      case ActivityType.EMAIL_CLICKED:
        return 'email';
      case ActivityType.CALL_MADE:
        return 'call';
      case ActivityType.MEETING_SCHEDULED:
        return 'meeting';
      default:
        return 'task';
    }
  }

  private mapPipedriveToActivityType(pdType: string): ActivityType {
    switch (pdType) {
      case 'email':
        return ActivityType.EMAIL_SENT;
      case 'call':
        return ActivityType.CALL_MADE;
      case 'meeting':
        return ActivityType.MEETING_SCHEDULED;
      default:
        return ActivityType.NOTE_ADDED;
    }
  }
}