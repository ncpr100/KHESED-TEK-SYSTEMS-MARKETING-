import {
  GDPRDataSubject,
  DataExportRequest,
  DataDeletionRequest,
  ExportStatus,
  ExportFormat,
  DeletionStatus,
  DeletionReason,
  DataCategory,
  GDPRAuditLog,
  GDPRAction,
  RetentionOverride,
  LegalBasis
} from './types';
import { consentManager } from './consent';

export class DataRightsManager {
  private static instance: DataRightsManager;
  private exportRequests = new Map<string, DataExportRequest>();
  private deletionRequests = new Map<string, DataDeletionRequest>();
  private dataSubjects = new Map<string, GDPRDataSubject>();

  static getInstance(): DataRightsManager {
    if (!DataRightsManager.instance) {
      DataRightsManager.instance = new DataRightsManager();
    }
    return DataRightsManager.instance;
  }

  // Data Export (Right to Portability - Article 20)
  async requestDataExport(
    email: string,
    dataCategories: DataCategory[] = Object.values(DataCategory),
    format: ExportFormat = ExportFormat.JSON
  ): Promise<{ success: boolean; requestId?: string; error?: string }> {
    try {
      const subjectId = consentManager.generateSubjectId(email);
      const requestId = this.generateId();

      const exportRequest: DataExportRequest = {
        id: requestId,
        subjectId,
        email,
        requestDate: new Date(),
        status: ExportStatus.PENDING,
        dataCategories,
        format
      };

      this.exportRequests.set(requestId, exportRequest);

      // Log the request
      this.logAuditEvent({
        action: GDPRAction.ACCESS_GRANTED,
        subjectId,
        details: {
          requestId,
          dataCategories,
          format,
          email
        },
        performedBy: 'user'
      });

      // Start processing in background
      this.processExportRequest(requestId);

      return { success: true, requestId };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  private async processExportRequest(requestId: string): Promise<void> {
    const request = this.exportRequests.get(requestId);
    if (!request) return;

    try {
      // Update status to processing
      request.status = ExportStatus.PROCESSING;
      this.exportRequests.set(requestId, request);

      // Collect data from various sources
      const exportData = await this.collectUserData(request.subjectId, request.dataCategories);

      // Generate export file
      const exportUrl = await this.generateExportFile(exportData, request.format, requestId);

      // Update request with completion details
      request.status = ExportStatus.COMPLETED;
      request.completedDate = new Date();
      request.downloadUrl = exportUrl;
      request.expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      
      this.exportRequests.set(requestId, request);

      // Log completion
      this.logAuditEvent({
        action: GDPRAction.DATA_EXPORTED,
        subjectId: request.subjectId,
        details: {
          requestId,
          format: request.format,
          dataCategories: request.dataCategories
        },
        performedBy: 'system'
      });

      // Send notification email (implement based on your email system)
      await this.sendExportNotificationEmail(request);

    } catch (error) {
      request.status = ExportStatus.FAILED;
      this.exportRequests.set(requestId, request);
      
      console.error('Export request failed:', error);
    }
  }

  private async collectUserData(subjectId: string, categories: DataCategory[]): Promise<any> {
    const userData: any = {
      subjectId,
      exportDate: new Date().toISOString(),
      dataCategories: categories,
      data: {}
    };

    for (const category of categories) {
      switch (category) {
        case DataCategory.PERSONAL_IDENTIFIERS:
          userData.data.personalIdentifiers = await this.getPersonalIdentifiers(subjectId);
          break;
        
        case DataCategory.CONTACT_INFORMATION:
          userData.data.contactInformation = await this.getContactInformation(subjectId);
          break;
        
        case DataCategory.BEHAVIORAL_DATA:
          userData.data.behavioralData = await this.getBehavioralData(subjectId);
          break;
        
        case DataCategory.MARKETING_DATA:
          userData.data.marketingData = await this.getMarketingData(subjectId);
          break;
        
        case DataCategory.TECHNICAL_DATA:
          userData.data.technicalData = await this.getTechnicalData(subjectId);
          break;
        
        case DataCategory.COMMUNICATION_DATA:
          userData.data.communicationData = await this.getCommunicationData(subjectId);
          break;
      }
    }

    // Include consent records
    userData.data.consentRecords = consentManager.getConsentRecords(subjectId);

    return userData;
  }

  private async generateExportFile(data: any, format: ExportFormat, requestId: string): Promise<string> {
    // In a real implementation, you would:
    // 1. Generate the file in the requested format
    // 2. Store it securely (encrypted)
    // 3. Return a secure download URL
    
    const fileName = `data-export-${requestId}.${format}`;
    const mockUrl = `/api/gdpr/download/${requestId}?token=${this.generateSecureToken()}`;
    
    // Store file content (mock implementation)
    // In production, use secure file storage with encryption
    
    return mockUrl;
  }

  // Data Deletion (Right to Erasure - Article 17)
  async requestDataDeletion(
    email: string,
    reason: DeletionReason = DeletionReason.USER_REQUEST,
    dataCategories: DataCategory[] = Object.values(DataCategory)
  ): Promise<{ success: boolean; requestId?: string; verificationCode?: string; error?: string }> {
    try {
      const subjectId = consentManager.generateSubjectId(email);
      const requestId = this.generateId();
      const verificationCode = this.generateVerificationCode();

      const deletionRequest: DataDeletionRequest = {
        id: requestId,
        subjectId,
        email,
        requestDate: new Date(),
        status: DeletionStatus.PENDING_VERIFICATION,
        reason,
        dataCategories,
        verificationCode
      };

      this.deletionRequests.set(requestId, deletionRequest);

      // Log the request
      this.logAuditEvent({
        action: GDPRAction.DATA_DELETED,
        subjectId,
        details: {
          requestId,
          reason,
          dataCategories,
          email,
          status: 'requested'
        },
        performedBy: 'user'
      });

      // Send verification email
      await this.sendDeletionVerificationEmail(deletionRequest);

      return { 
        success: true, 
        requestId, 
        verificationCode 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async verifyDeletionRequest(requestId: string, verificationCode: string): Promise<{ success: boolean; error?: string }> {
    const request = this.deletionRequests.get(requestId);
    if (!request) {
      return { success: false, error: 'Request not found' };
    }

    if (request.verificationCode !== verificationCode) {
      return { success: false, error: 'Invalid verification code' };
    }

    // Update status and start processing
    request.status = DeletionStatus.VERIFIED;
    request.verifiedDate = new Date();
    this.deletionRequests.set(requestId, request);

    // Start deletion process
    this.processDeletionRequest(requestId);

    return { success: true };
  }

  private async processDeletionRequest(requestId: string): Promise<void> {
    const request = this.deletionRequests.get(requestId);
    if (!request) return;

    try {
      // Update status
      request.status = DeletionStatus.PROCESSING;
      this.deletionRequests.set(requestId, request);

      // Check for retention requirements
      const retentionOverrides = await this.checkRetentionRequirements(request.subjectId, request.dataCategories);
      request.retentionOverrides = retentionOverrides;

      // Perform deletion
      const deletionResults = await this.performDataDeletion(request.subjectId, request.dataCategories, retentionOverrides);

      // Update completion status
      const hasPartialDeletions = retentionOverrides.length > 0;
      request.status = hasPartialDeletions ? DeletionStatus.PARTIALLY_COMPLETED : DeletionStatus.COMPLETED;
      request.completedDate = new Date();
      
      this.deletionRequests.set(requestId, request);

      // Log completion
      this.logAuditEvent({
        action: GDPRAction.DATA_DELETED,
        subjectId: request.subjectId,
        details: {
          requestId,
          deletedCategories: request.dataCategories.filter(cat => 
            !retentionOverrides.some(override => override.dataCategory === cat)
          ),
          retainedCategories: retentionOverrides.map(override => override.dataCategory),
          status: 'completed'
        },
        performedBy: 'system'
      });

      // Send completion notification
      await this.sendDeletionCompletionEmail(request);

    } catch (error) {
      request.status = DeletionStatus.REJECTED;
      this.deletionRequests.set(requestId, request);
      
      console.error('Deletion request failed:', error);
    }
  }

  private async checkRetentionRequirements(subjectId: string, dataCategories: DataCategory[]): Promise<RetentionOverride[]> {
    const overrides: RetentionOverride[] = [];

    // Example retention rules
    for (const category of dataCategories) {
      switch (category) {
        case DataCategory.FINANCIAL_DATA:
          // Legal requirement to retain financial records
          overrides.push({
            dataCategory: category,
            reason: 'Tax law compliance - financial records must be retained for 7 years',
            legalBasis: LegalBasis.LEGAL_OBLIGATION,
            retentionPeriod: 7 * 365, // 7 years
            expiryDate: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000)
          });
          break;
        
        case DataCategory.COMMUNICATION_DATA:
          // Business requirement for customer service
          overrides.push({
            dataCategory: category,
            reason: 'Customer service and dispute resolution',
            legalBasis: LegalBasis.LEGITIMATE_INTERESTS,
            retentionPeriod: 365, // 1 year
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          });
          break;
      }
    }

    return overrides;
  }

  private async performDataDeletion(
    subjectId: string, 
    dataCategories: DataCategory[], 
    retentionOverrides: RetentionOverride[]
  ): Promise<void> {
    const categoriesToDelete = dataCategories.filter(category =>
      !retentionOverrides.some(override => override.dataCategory === category)
    );

    for (const category of categoriesToDelete) {
      switch (category) {
        case DataCategory.PERSONAL_IDENTIFIERS:
          await this.deletePersonalIdentifiers(subjectId);
          break;
        
        case DataCategory.CONTACT_INFORMATION:
          await this.deleteContactInformation(subjectId);
          break;
        
        case DataCategory.BEHAVIORAL_DATA:
          await this.deleteBehavioralData(subjectId);
          break;
        
        case DataCategory.MARKETING_DATA:
          await this.deleteMarketingData(subjectId);
          break;
        
        case DataCategory.TECHNICAL_DATA:
          await this.deleteTechnicalData(subjectId);
          break;
        
        case DataCategory.COMMUNICATION_DATA:
          await this.deleteCommunicationData(subjectId);
          break;
      }
    }

    // Anonymize retained data where possible
    for (const override of retentionOverrides) {
      await this.anonymizeData(subjectId, override.dataCategory);
    }
  }

  // Data collection methods (implement based on your data sources)
  private async getPersonalIdentifiers(subjectId: string): Promise<any> {
    // Collect from CRM, user database, etc.
    return {
      subjectId,
      // Add actual data collection logic
    };
  }

  private async getContactInformation(subjectId: string): Promise<any> {
    // Collect contact details
    return {};
  }

  private async getBehavioralData(subjectId: string): Promise<any> {
    // Collect analytics, website behavior, etc.
    return {};
  }

  private async getMarketingData(subjectId: string): Promise<any> {
    // Collect email campaigns, preferences, etc.
    return {};
  }

  private async getTechnicalData(subjectId: string): Promise<any> {
    // Collect IP addresses, browser info, etc.
    return {};
  }

  private async getCommunicationData(subjectId: string): Promise<any> {
    // Collect emails, chat logs, etc.
    return {};
  }

  // Data deletion methods (implement based on your data sources)
  private async deletePersonalIdentifiers(subjectId: string): Promise<void> {
    // Delete from CRM, user database, etc.
  }

  private async deleteContactInformation(subjectId: string): Promise<void> {
    // Delete contact details
  }

  private async deleteBehavioralData(subjectId: string): Promise<void> {
    // Delete analytics data
  }

  private async deleteMarketingData(subjectId: string): Promise<void> {
    // Delete from email lists, campaigns, etc.
  }

  private async deleteTechnicalData(subjectId: string): Promise<void> {
    // Delete logs, IP addresses, etc.
  }

  private async deleteCommunicationData(subjectId: string): Promise<void> {
    // Delete emails, chat logs, etc.
  }

  private async anonymizeData(subjectId: string, category: DataCategory): Promise<void> {
    // Replace personal identifiers with anonymous ones
    this.logAuditEvent({
      action: GDPRAction.DATA_ANONYMIZED,
      subjectId,
      dataCategory: category,
      details: {
        reason: 'Data retention requirement - anonymized instead of deleted'
      },
      performedBy: 'system'
    });
  }

  // Get request status
  getExportRequest(requestId: string): DataExportRequest | null {
    return this.exportRequests.get(requestId) || null;
  }

  getDeletionRequest(requestId: string): DataDeletionRequest | null {
    return this.deletionRequests.get(requestId) || null;
  }

  // Email notifications (implement based on your email system)
  private async sendExportNotificationEmail(request: DataExportRequest): Promise<void> {
    // Send email with download link
    console.log(`Export ready for ${request.email}: ${request.downloadUrl}`);
  }

  private async sendDeletionVerificationEmail(request: DataDeletionRequest): Promise<void> {
    // Send verification email
    console.log(`Deletion verification for ${request.email}: ${request.verificationCode}`);
  }

  private async sendDeletionCompletionEmail(request: DataDeletionRequest): Promise<void> {
    // Send completion notification
    console.log(`Deletion completed for ${request.email}`);
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateVerificationCode(): string {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  private generateSecureToken(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 16);
  }

  private logAuditEvent(event: Omit<GDPRAuditLog, 'id' | 'timestamp'>): void {
    // Use the consent manager's audit logging
    const auditLog: GDPRAuditLog = {
      id: this.generateId(),
      timestamp: new Date(),
      ...event
    };

    console.log('GDPR Data Rights Event:', auditLog);
  }
}

// Export singleton instance
export const dataRightsManager = DataRightsManager.getInstance();