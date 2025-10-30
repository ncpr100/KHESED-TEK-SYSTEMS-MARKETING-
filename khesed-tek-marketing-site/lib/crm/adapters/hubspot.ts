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

export class HubSpotAdapter implements CRMAdapter {
  readonly name = 'HubSpot';
  private config: CRMConfig;
  private baseUrl: string;

  constructor(config: CRMConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.hubapi.com';
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ): Promise<CRMResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
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
        rateLimitRemaining: parseInt(response.headers.get('X-HubSpot-RateLimit-Remaining') || '0'),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private contactToHubSpot(contact: Contact): any {
    return {
      properties: {
        email: contact.email,
        firstname: contact.firstName,
        lastname: contact.lastName,
        company: contact.company,
        phone: contact.phone,
        website: contact.website,
        lifecyclestage: 'lead',
        lead_source: contact.source || 'website',
        ...contact.customFields,
      },
    };
  }

  private hubSpotToContact(hubspotContact: any): Contact {
    const props = hubspotContact.properties;
    return {
      id: hubspotContact.id,
      email: props.email,
      firstName: props.firstname,
      lastName: props.lastname,
      company: props.company,
      phone: props.phone,
      website: props.website,
      source: props.lead_source,
      createdAt: new Date(props.createdate),
      updatedAt: new Date(props.lastmodifieddate),
    };
  }

  private leadToHubSpot(lead: Lead): any {
    const contact = this.contactToHubSpot(lead);
    contact.properties.hs_lead_status = lead.status;
    contact.properties.lead_score = lead.score;
    contact.properties.notes = lead.notes;
    return contact;
  }

  private hubSpotToLead(hubspotContact: any): Lead {
    const contact = this.hubSpotToContact(hubspotContact);
    const props = hubspotContact.properties;
    
    return {
      ...contact,
      score: parseInt(props.lead_score) || 0,
      status: props.hs_lead_status as LeadStatus || LeadStatus.NEW,
      notes: props.notes,
      lastActivity: props.notes_last_contacted ? new Date(props.notes_last_contacted) : undefined,
    };
  }

  async testConnection(): Promise<CRMResponse> {
    const result = await this.makeRequest('/crm/v3/objects/contacts?limit=1');
    return {
      success: result.success,
      error: result.error,
      rateLimitRemaining: result.rateLimitRemaining,
    };
  }

  async createContact(contact: Contact): Promise<CRMResponse<Contact>> {
    const hubspotData = this.contactToHubSpot(contact);
    const result = await this.makeRequest<any>('/crm/v3/objects/contacts', 'POST', hubspotData);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.hubSpotToContact(result.data),
      };
    }
    
    return result;
  }

  async updateContact(id: string, contact: Partial<Contact>): Promise<CRMResponse<Contact>> {
    const hubspotData = this.contactToHubSpot(contact as Contact);
    const result = await this.makeRequest<any>(`/crm/v3/objects/contacts/${id}`, 'PUT', hubspotData);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.hubSpotToContact(result.data),
      };
    }
    
    return result;
  }

  async getContact(id: string): Promise<CRMResponse<Contact>> {
    const result = await this.makeRequest<any>(`/crm/v3/objects/contacts/${id}`);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.hubSpotToContact(result.data),
      };
    }
    
    return result;
  }

  async searchContacts(query: string): Promise<CRMResponse<Contact[]>> {
    const searchData = {
      filterGroups: [{
        filters: [{
          propertyName: 'email',
          operator: 'CONTAINS_TOKEN',
          value: query,
        }],
      }],
    };

    const result = await this.makeRequest<any>('/crm/v3/objects/contacts/search', 'POST', searchData);
    
    if (result.success && result.data?.results) {
      return {
        ...result,
        data: result.data.results.map((contact: any) => this.hubSpotToContact(contact)),
      };
    }
    
    return result;
  }

  async createLead(lead: Lead): Promise<CRMResponse<Lead>> {
    const hubspotData = this.leadToHubSpot(lead);
    const result = await this.makeRequest<any>('/crm/v3/objects/contacts', 'POST', hubspotData);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.hubSpotToLead(result.data),
      };
    }
    
    return result;
  }

  async updateLead(id: string, lead: Partial<Lead>): Promise<CRMResponse<Lead>> {
    const hubspotData = this.leadToHubSpot(lead as Lead);
    const result = await this.makeRequest<any>(`/crm/v3/objects/contacts/${id}`, 'PUT', hubspotData);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.hubSpotToLead(result.data),
      };
    }
    
    return result;
  }

  async getLead(id: string): Promise<CRMResponse<Lead>> {
    const result = await this.makeRequest<any>(`/crm/v3/objects/contacts/${id}`);
    
    if (result.success && result.data) {
      return {
        ...result,
        data: this.hubSpotToLead(result.data),
      };
    }
    
    return result;
  }

  async getLeads(filters?: LeadFilters): Promise<CRMResponse<Lead[]>> {
    let endpoint = '/crm/v3/objects/contacts?limit=100';
    
    if (filters) {
      // Build search query for filters
      const searchData: any = {
        filterGroups: [],
      };

      if (filters.status) {
        searchData.filterGroups.push({
          filters: [{
            propertyName: 'hs_lead_status',
            operator: 'EQ',
            value: filters.status,
          }],
        });
      }

      if (filters.minScore) {
        searchData.filterGroups.push({
          filters: [{
            propertyName: 'lead_score',
            operator: 'GTE',
            value: filters.minScore.toString(),
          }],
        });
      }

      const result = await this.makeRequest<any>('/crm/v3/objects/contacts/search', 'POST', searchData);
      
      if (result.success && result.data?.results) {
        return {
          ...result,
          data: result.data.results.map((contact: any) => this.hubSpotToLead(contact)),
        };
      }
      
      return result;
    }

    const result = await this.makeRequest<any>(endpoint);
    
    if (result.success && result.data?.results) {
      return {
        ...result,
        data: result.data.results.map((contact: any) => this.hubSpotToLead(contact)),
      };
    }
    
    return result;
  }

  async logActivity(contactId: string, activity: Activity): Promise<CRMResponse> {
    const engagementData = {
      engagement: {
        active: true,
        type: this.mapActivityTypeToEngagement(activity.type),
        timestamp: activity.timestamp.getTime(),
      },
      associations: {
        contactIds: [contactId],
      },
      metadata: {
        body: activity.description,
        ...activity.metadata,
      },
    };

    return this.makeRequest('/engagements/v1/engagements', 'POST', engagementData);
  }

  async getActivities(contactId: string): Promise<CRMResponse<Activity[]>> {
    const result = await this.makeRequest<any>(`/engagements/v1/engagements/associated/contact/${contactId}/paged`);
    
    if (result.success && result.data?.results) {
      const activities: Activity[] = result.data.results.map((engagement: any) => ({
        type: this.mapEngagementToActivityType(engagement.engagement.type),
        description: engagement.metadata?.body || '',
        timestamp: new Date(engagement.engagement.timestamp),
        metadata: engagement.metadata,
      }));

      return {
        ...result,
        data: activities,
      };
    }
    
    return result;
  }

  private mapActivityTypeToEngagement(type: ActivityType): string {
    switch (type) {
      case ActivityType.EMAIL_SENT:
      case ActivityType.EMAIL_OPENED:
      case ActivityType.EMAIL_CLICKED:
        return 'EMAIL';
      case ActivityType.CALL_MADE:
        return 'CALL';
      case ActivityType.MEETING_SCHEDULED:
        return 'MEETING';
      case ActivityType.NOTE_ADDED:
        return 'NOTE';
      default:
        return 'NOTE';
    }
  }

  private mapEngagementToActivityType(engagementType: string): ActivityType {
    switch (engagementType) {
      case 'EMAIL':
        return ActivityType.EMAIL_SENT;
      case 'CALL':
        return ActivityType.CALL_MADE;
      case 'MEETING':
        return ActivityType.MEETING_SCHEDULED;
      case 'NOTE':
        return ActivityType.NOTE_ADDED;
      default:
        return ActivityType.NOTE_ADDED;
    }
  }
}