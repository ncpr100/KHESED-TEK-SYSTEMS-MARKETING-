// GDPR Compliance system type definitions
export interface CookieConsentPreferences {
  necessary: boolean;          // Always true - required for site functionality
  analytics: boolean;          // Google Analytics, performance tracking
  marketing: boolean;          // Marketing emails, remarketing
  functional: boolean;         // Enhanced user experience features
  timestamp: number;           // When consent was given
  version: string;             // Privacy policy version
  ip?: string;                // IP address (for audit trail)
  userAgent?: string;          // Browser info (for audit trail)
}

export interface GDPRDataSubject {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  consentRecords: ConsentRecord[];
  dataCategories: DataCategory[];
  lastActivityDate: Date;
  dataRetentionDate?: Date;    // When data should be deleted
  optOutDate?: Date;           // When user opted out
}

export interface ConsentRecord {
  id: string;
  subjectId: string;
  consentType: ConsentType;
  granted: boolean;
  timestamp: Date;
  method: ConsentMethod;       // How consent was obtained
  ipAddress?: string;
  userAgent?: string;
  legalBasis: LegalBasis;
  version: string;             // Privacy policy version
  withdrawn?: Date;            // When consent was withdrawn
}

export enum ConsentType {
  COOKIES = 'cookies',
  EMAIL_MARKETING = 'email_marketing',
  DATA_PROCESSING = 'data_processing',
  ANALYTICS = 'analytics',
  FUNCTIONAL = 'functional',
  THIRD_PARTY = 'third_party'
}

export enum ConsentMethod {
  WEBSITE_BANNER = 'website_banner',
  EMAIL_CONFIRMATION = 'email_confirmation',
  PHONE_CALL = 'phone_call',
  PAPER_FORM = 'paper_form',
  API = 'api',
  IMPORT = 'import'
}

export enum LegalBasis {
  CONSENT = 'consent',                    // Article 6(1)(a) - Consent
  CONTRACT = 'contract',                  // Article 6(1)(b) - Contract performance
  LEGAL_OBLIGATION = 'legal_obligation',  // Article 6(1)(c) - Legal obligation
  VITAL_INTERESTS = 'vital_interests',    // Article 6(1)(d) - Vital interests
  PUBLIC_TASK = 'public_task',           // Article 6(1)(e) - Public task
  LEGITIMATE_INTERESTS = 'legitimate_interests' // Article 6(1)(f) - Legitimate interests
}

export enum DataCategory {
  PERSONAL_IDENTIFIERS = 'personal_identifiers',    // Name, email, phone
  CONTACT_INFORMATION = 'contact_information',      // Address, contact details
  BEHAVIORAL_DATA = 'behavioral_data',              // Website interactions, analytics
  MARKETING_DATA = 'marketing_data',                // Preferences, campaign data
  TECHNICAL_DATA = 'technical_data',                // IP address, browser info
  COMMUNICATION_DATA = 'communication_data',        // Email history, chat logs
  FINANCIAL_DATA = 'financial_data',                // Payment info (if applicable)
  SENSITIVE_DATA = 'sensitive_data'                 // Special category data
}

export interface DataExportRequest {
  id: string;
  subjectId: string;
  email: string;
  requestDate: Date;
  status: ExportStatus;
  completedDate?: Date;
  downloadUrl?: string;
  expiryDate?: Date;           // When download link expires
  dataCategories: DataCategory[];
  format: ExportFormat;
}

export enum ExportStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired'
}

export enum ExportFormat {
  JSON = 'json',
  CSV = 'csv',
  PDF = 'pdf'
}

export interface DataDeletionRequest {
  id: string;
  subjectId: string;
  email: string;
  requestDate: Date;
  status: DeletionStatus;
  completedDate?: Date;
  reason: DeletionReason;
  dataCategories: DataCategory[];
  retentionOverrides?: RetentionOverride[];
  verificationCode?: string;   // For request verification
  verifiedDate?: Date;
}

export enum DeletionStatus {
  PENDING_VERIFICATION = 'pending_verification',
  VERIFIED = 'verified',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  PARTIALLY_COMPLETED = 'partially_completed',
  REJECTED = 'rejected'
}

export enum DeletionReason {
  USER_REQUEST = 'user_request',
  DATA_RETENTION_POLICY = 'data_retention_policy',
  CONSENT_WITHDRAWN = 'consent_withdrawn',
  ACCOUNT_CLOSURE = 'account_closure',
  LEGAL_REQUIREMENT = 'legal_requirement'
}

export interface RetentionOverride {
  dataCategory: DataCategory;
  reason: string;
  legalBasis: LegalBasis;
  retentionPeriod: number;     // Additional retention in days
  expiryDate: Date;
}

export interface PrivacyPolicyVersion {
  version: string;
  effectiveDate: Date;
  content: string;
  changes: string[];           // Summary of changes from previous version
  notificationSent: boolean;   // Whether users were notified
  acceptanceRequired: boolean; // Whether re-consent is required
}

export interface GDPRAuditLog {
  id: string;
  timestamp: Date;
  action: GDPRAction;
  subjectId?: string;
  dataCategory?: DataCategory;
  legalBasis?: LegalBasis;
  details: Record<string, unknown>;
  performedBy: string;         // System user who performed action
  ipAddress?: string;
  userAgent?: string;
}

export enum GDPRAction {
  CONSENT_GIVEN = 'consent_given',
  CONSENT_WITHDRAWN = 'consent_withdrawn',
  DATA_EXPORTED = 'data_exported',
  DATA_DELETED = 'data_deleted',
  DATA_ANONYMIZED = 'data_anonymized',
  RETENTION_APPLIED = 'retention_applied',
  POLICY_UPDATED = 'policy_updated',
  BREACH_DETECTED = 'breach_detected',
  ACCESS_GRANTED = 'access_granted'
}

export interface CookieBannerConfig {
  title: string;
  description: string;
  acceptAllText: string;
  rejectAllText: string;
  customizeText: string;
  policyLinkText: string;
  policyUrl: string;
  position: 'top' | 'bottom' | 'center';
  theme: 'light' | 'dark' | 'auto';
  showRejectButton: boolean;
  showCustomizeButton: boolean;
  autoAcceptDelay?: number;    // Auto-accept after X seconds (not recommended)
}

export interface GDPRComplianceStatus {
  consentManagement: boolean;
  dataExportCapability: boolean;
  dataDeletionCapability: boolean;
  auditLogging: boolean;
  privacyPolicyManagement: boolean;
  retentionPolicyEnforcement: boolean;
  lastComplianceCheck: Date;
  issues: ComplianceIssue[];
}

export interface ComplianceIssue {
  id: string;
  type: 'warning' | 'error' | 'info';
  category: 'consent' | 'retention' | 'access' | 'deletion' | 'security';
  message: string;
  details?: string;
  remediation?: string;
  discovered: Date;
  resolved?: Date;
}