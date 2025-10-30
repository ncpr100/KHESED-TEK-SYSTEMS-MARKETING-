import { 
  CookieConsentPreferences, 
  ConsentRecord, 
  ConsentType, 
  ConsentMethod, 
  LegalBasis,
  GDPRAuditLog,
  GDPRAction,
  PrivacyPolicyVersion,
  CookieBannerConfig
} from './types';

export class ConsentManager {
  private static instance: ConsentManager;
  private consentRecords = new Map<string, ConsentRecord[]>();
  private auditLogs: GDPRAuditLog[] = [];
  private currentPolicyVersion: PrivacyPolicyVersion;

  constructor() {
    this.currentPolicyVersion = {
      version: '1.0.0',
      effectiveDate: new Date(),
      content: 'Default privacy policy content',
      changes: ['Initial privacy policy'],
      notificationSent: false,
      acceptanceRequired: false
    };
  }

  static getInstance(): ConsentManager {
    if (!ConsentManager.instance) {
      ConsentManager.instance = new ConsentManager();
    }
    return ConsentManager.instance;
  }

  // Cookie consent management
  setCookieConsent(
    subjectId: string, 
    preferences: CookieConsentPreferences,
    ipAddress?: string,
    userAgent?: string
  ): void {
    const consentRecords: ConsentRecord[] = [];
    
    // Create consent records for each category
    const consentTypes = [
      { type: ConsentType.COOKIES, granted: preferences.necessary },
      { type: ConsentType.ANALYTICS, granted: preferences.analytics },
      { type: ConsentType.EMAIL_MARKETING, granted: preferences.marketing },
      { type: ConsentType.FUNCTIONAL, granted: preferences.functional }
    ];

    consentTypes.forEach(({ type, granted }) => {
      const record: ConsentRecord = {
        id: this.generateId(),
        subjectId,
        consentType: type,
        granted,
        timestamp: new Date(),
        method: ConsentMethod.WEBSITE_BANNER,
        ipAddress,
        userAgent,
        legalBasis: type === ConsentType.COOKIES ? LegalBasis.LEGITIMATE_INTERESTS : LegalBasis.CONSENT,
        version: preferences.version
      };
      
      consentRecords.push(record);
    });

    // Store consent records
    this.consentRecords.set(subjectId, consentRecords);

    // Log consent action
    this.logAuditEvent({
      action: GDPRAction.CONSENT_GIVEN,
      subjectId,
      details: {
        consentTypes: consentTypes.map(c => c.type),
        preferences,
        method: ConsentMethod.WEBSITE_BANNER
      },
      performedBy: 'system',
      ipAddress,
      userAgent
    });

    // Store in browser
    this.storeCookieConsent(preferences);
  }

  getCookieConsent(): CookieConsentPreferences | null {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem('khesed-cookie-consent');
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  private storeCookieConsent(preferences: CookieConsentPreferences): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('khesed-cookie-consent', JSON.stringify(preferences));
    
    // Set individual cookies for easier access
    this.setCookie('consent-analytics', preferences.analytics.toString(), 365);
    this.setCookie('consent-marketing', preferences.marketing.toString(), 365);
    this.setCookie('consent-functional', preferences.functional.toString(), 365);
  }

  private setCookie(name: string, value: string, days: number): void {
    if (typeof document === 'undefined') return;
    
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
  }

  // Withdraw consent
  withdrawConsent(
    subjectId: string, 
    consentTypes: ConsentType[],
    ipAddress?: string,
    userAgent?: string
  ): void {
    const existingRecords = this.consentRecords.get(subjectId) || [];
    
    consentTypes.forEach(consentType => {
      // Find and update existing consent record
      const existingRecord = existingRecords.find(r => 
        r.consentType === consentType && r.granted && !r.withdrawn
      );
      
      if (existingRecord) {
        existingRecord.withdrawn = new Date();
      }
      
      // Create new withdrawal record
      const withdrawalRecord: ConsentRecord = {
        id: this.generateId(),
        subjectId,
        consentType,
        granted: false,
        timestamp: new Date(),
        method: ConsentMethod.WEBSITE_BANNER,
        ipAddress,
        userAgent,
        legalBasis: LegalBasis.CONSENT,
        version: this.currentPolicyVersion.version
      };
      
      existingRecords.push(withdrawalRecord);
    });

    this.consentRecords.set(subjectId, existingRecords);

    // Log withdrawal
    this.logAuditEvent({
      action: GDPRAction.CONSENT_WITHDRAWN,
      subjectId,
      details: {
        consentTypes,
        method: ConsentMethod.WEBSITE_BANNER
      },
      performedBy: 'user',
      ipAddress,
      userAgent
    });

    // Update browser storage
    const currentConsent = this.getCookieConsent();
    if (currentConsent) {
      consentTypes.forEach(type => {
        switch (type) {
          case ConsentType.ANALYTICS:
            currentConsent.analytics = false;
            break;
          case ConsentType.EMAIL_MARKETING:
            currentConsent.marketing = false;
            break;
          case ConsentType.FUNCTIONAL:
            currentConsent.functional = false;
            break;
        }
      });
      
      this.storeCookieConsent(currentConsent);
    }
  }

  // Get consent status for a subject
  getConsentStatus(subjectId: string): Record<ConsentType, boolean> {
    const records = this.consentRecords.get(subjectId) || [];
    const status: Record<ConsentType, boolean> = {
      [ConsentType.COOKIES]: true,              // Always true (necessary)
      [ConsentType.ANALYTICS]: false,
      [ConsentType.EMAIL_MARKETING]: false,
      [ConsentType.FUNCTIONAL]: false,
      [ConsentType.DATA_PROCESSING]: false,
      [ConsentType.THIRD_PARTY]: false
    };

    // Get latest consent for each type
    Object.values(ConsentType).forEach(type => {
      const latestRecord = records
        .filter(r => r.consentType === type && !r.withdrawn)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
      
      if (latestRecord) {
        status[type] = latestRecord.granted;
      }
    });

    return status;
  }

  // Check if consent is required (policy updated, consent expired, etc.)
  isConsentRequired(subjectId: string): boolean {
    const currentConsent = this.getCookieConsent();
    if (!currentConsent) return true;

    // Check if policy version has changed
    if (currentConsent.version !== this.currentPolicyVersion.version) {
      return this.currentPolicyVersion.acceptanceRequired;
    }

    // Check if consent is expired (1 year)
    const consentAge = Date.now() - currentConsent.timestamp;
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    
    return consentAge > oneYear;
  }

  // Privacy policy management
  updatePrivacyPolicy(
    version: string,
    content: string,
    changes: string[],
    requiresReConsent = false
  ): void {
    this.currentPolicyVersion = {
      version,
      effectiveDate: new Date(),
      content,
      changes,
      notificationSent: false,
      acceptanceRequired: requiresReConsent
    };

    this.logAuditEvent({
      action: GDPRAction.POLICY_UPDATED,
      details: {
        version,
        changes,
        requiresReConsent
      },
      performedBy: 'admin'
    });
  }

  getCurrentPolicyVersion(): PrivacyPolicyVersion {
    return { ...this.currentPolicyVersion };
  }

  // Generate subject ID from user data
  generateSubjectId(email: string): string {
    // In production, use a more secure method
    return Buffer.from(email.toLowerCase()).toString('base64');
  }

  // Get all consent records for a subject
  getConsentRecords(subjectId: string): ConsentRecord[] {
    return [...(this.consentRecords.get(subjectId) || [])];
  }

  // Audit logging
  private logAuditEvent(event: Omit<GDPRAuditLog, 'id' | 'timestamp'>): void {
    const auditLog: GDPRAuditLog = {
      id: this.generateId(),
      timestamp: new Date(),
      ...event
    };

    this.auditLogs.push(auditLog);

    // Keep only last 10000 logs to prevent memory issues
    if (this.auditLogs.length > 10000) {
      this.auditLogs = this.auditLogs.slice(-10000);
    }

    // In production, send to persistent storage/monitoring service
    console.log('GDPR Audit Event:', auditLog);
  }

  getAuditLogs(subjectId?: string): GDPRAuditLog[] {
    if (subjectId) {
      return this.auditLogs.filter(log => log.subjectId === subjectId);
    }
    return [...this.auditLogs];
  }

  // Default cookie banner configuration
  getDefaultBannerConfig(): CookieBannerConfig {
    return {
      title: 'Respetamos tu Privacidad',
      description: 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio web, analizar el tráfico y personalizar el contenido. Puedes aceptar todas las cookies o personalizar tus preferencias.',
      acceptAllText: 'Aceptar Todo',
      rejectAllText: 'Rechazar Todo',
      customizeText: 'Personalizar',
      policyLinkText: 'Política de Privacidad',
      policyUrl: '/privacy-policy',
      position: 'bottom',
      theme: 'light',
      showRejectButton: true,
      showCustomizeButton: true
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Export singleton instance
export const consentManager = ConsentManager.getInstance();