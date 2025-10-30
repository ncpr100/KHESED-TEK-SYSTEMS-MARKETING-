import { CRMAdapter, CRMConfig } from './types';
import { HubSpotAdapter } from './adapters/hubspot';
import { SalesforceAdapter } from './adapters/salesforce';
import { PipedriveAdapter } from './adapters/pipedrive';

export class CRMFactory {
  private static adapters: Map<string, new (config: CRMConfig) => CRMAdapter> = new Map();

  static {
    this.adapters.set('hubspot', HubSpotAdapter);
    this.adapters.set('salesforce', SalesforceAdapter);
    this.adapters.set('pipedrive', PipedriveAdapter);
  }

  static createAdapter(provider: string, config: CRMConfig): CRMAdapter {
    const AdapterClass = this.adapters.get(provider.toLowerCase());
    
    if (!AdapterClass) {
      throw new Error(`CRM provider "${provider}" is not supported. Available providers: ${Array.from(this.adapters.keys()).join(', ')}`);
    }

    return new AdapterClass(config);
  }

  static getSupportedProviders(): string[] {
    return Array.from(this.adapters.keys());
  }

  static registerAdapter(name: string, adapterClass: new (config: CRMConfig) => CRMAdapter): void {
    this.adapters.set(name.toLowerCase(), adapterClass);
  }
}

export class CRMManager {
  private adapter: CRMAdapter;
  private config: CRMConfig;

  constructor(provider: string, config: CRMConfig) {
    this.config = config;
    this.adapter = CRMFactory.createAdapter(provider, config);
  }

  async initialize(): Promise<boolean> {
    try {
      const result = await this.adapter.testConnection();
      return result.success;
    } catch (error) {
      console.error('Failed to initialize CRM connection:', error);
      return false;
    }
  }

  getAdapter(): CRMAdapter {
    return this.adapter;
  }

  getProvider(): string {
    return this.config.provider;
  }

  async healthCheck(): Promise<{
    provider: string;
    connected: boolean;
    lastCheck: Date;
    rateLimitRemaining?: number;
  }> {
    const result = await this.adapter.testConnection();
    
    return {
      provider: this.config.provider,
      connected: result.success,
      lastCheck: new Date(),
      rateLimitRemaining: result.rateLimitRemaining,
    };
  }
}

// Singleton instance for the application
let crmInstance: CRMManager | null = null;

export function initializeCRM(): CRMManager | null {
  if (crmInstance) {
    return crmInstance;
  }

  const provider = process.env.CRM_PROVIDER;
  const apiKey = process.env.CRM_API_KEY;
  
  if (!provider || !apiKey) {
    console.warn('CRM configuration not found. CRM features will be disabled.');
    return null;
  }

  const config: CRMConfig = {
    provider,
    apiKey,
    baseUrl: process.env.CRM_BASE_URL,
    additionalConfig: {
      hubId: process.env.CRM_HUB_ID,
      domain: process.env.CRM_DOMAIN,
      clientId: process.env.CRM_CLIENT_ID,
      clientSecret: process.env.CRM_CLIENT_SECRET,
    },
  };

  try {
    crmInstance = new CRMManager(provider, config);
    return crmInstance;
  } catch (error) {
    console.error('Failed to initialize CRM:', error);
    return null;
  }
}

export function getCRM(): CRMManager | null {
  return crmInstance || initializeCRM();
}