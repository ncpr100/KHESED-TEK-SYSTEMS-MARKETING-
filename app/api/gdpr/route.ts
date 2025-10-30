import { NextRequest } from 'next/server';
import { consentManager } from '@/lib/gdpr/consent';
import { dataRightsManager } from '@/lib/gdpr/data-rights';
import { securityManager } from '@/lib/security/manager';
import { ConsentType, ExportFormat, DeletionReason, DataCategory } from '@/lib/gdpr/types';

export async function POST(request: NextRequest) {
  try {
    // Apply security protection
    const protection = await securityManager.protectRoute(request, 'api');
    if (!protection.success) {
      return protection.response!;
    }

    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'set_cookie_consent': {
        const { email, preferences, ipAddress, userAgent } = data;
        
        if (!email || !preferences) {
          return await securityManager.createSecureResponse(
            { error: 'Email and preferences are required' },
            { status: 400 }
          );
        }

        const subjectId = consentManager.generateSubjectId(email);
        consentManager.setCookieConsent(subjectId, preferences, ipAddress, userAgent);

        return await securityManager.createSecureResponse({
          success: true,
          message: 'Consent preferences saved'
        });
      }

      case 'withdraw_consent': {
        const { email, consentTypes, ipAddress, userAgent } = data;
        
        if (!email || !consentTypes || !Array.isArray(consentTypes)) {
          return await securityManager.createSecureResponse(
            { error: 'Email and consent types are required' },
            { status: 400 }
          );
        }

        const subjectId = consentManager.generateSubjectId(email);
        consentManager.withdrawConsent(subjectId, consentTypes, ipAddress, userAgent);

        return await securityManager.createSecureResponse({
          success: true,
          message: 'Consent withdrawn successfully'
        });
      }

      case 'request_data_export': {
        const { email, dataCategories, format } = data;
        
        if (!email) {
          return await securityManager.createSecureResponse(
            { error: 'Email is required' },
            { status: 400 }
          );
        }

        const result = await dataRightsManager.requestDataExport(
          email,
          dataCategories || Object.values(DataCategory),
          format || ExportFormat.JSON
        );

        if (result.success) {
          return await securityManager.createSecureResponse({
            success: true,
            requestId: result.requestId,
            message: 'Data export request submitted. You will receive an email when ready.'
          });
        } else {
          return await securityManager.createSecureResponse(
            { error: result.error },
            { status: 500 }
          );
        }
      }

      case 'request_data_deletion': {
        const { email, reason, dataCategories } = data;
        
        if (!email) {
          return await securityManager.createSecureResponse(
            { error: 'Email is required' },
            { status: 400 }
          );
        }

        const result = await dataRightsManager.requestDataDeletion(
          email,
          reason || DeletionReason.USER_REQUEST,
          dataCategories || Object.values(DataCategory)
        );

        if (result.success) {
          return await securityManager.createSecureResponse({
            success: true,
            requestId: result.requestId,
            verificationCode: result.verificationCode,
            message: 'Data deletion request submitted. Please check your email for verification.'
          });
        } else {
          return await securityManager.createSecureResponse(
            { error: result.error },
            { status: 500 }
          );
        }
      }

      case 'verify_deletion': {
        const { requestId, verificationCode } = data;
        
        if (!requestId || !verificationCode) {
          return await securityManager.createSecureResponse(
            { error: 'Request ID and verification code are required' },
            { status: 400 }
          );
        }

        const result = await dataRightsManager.verifyDeletionRequest(requestId, verificationCode);

        if (result.success) {
          return await securityManager.createSecureResponse({
            success: true,
            message: 'Deletion request verified. Processing will begin shortly.'
          });
        } else {
          return await securityManager.createSecureResponse(
            { error: result.error },
            { status: 400 }
          );
        }
      }

      case 'get_consent_status': {
        const { email } = data;
        
        if (!email) {
          return await securityManager.createSecureResponse(
            { error: 'Email is required' },
            { status: 400 }
          );
        }

        const subjectId = consentManager.generateSubjectId(email);
        const consentStatus = consentManager.getConsentStatus(subjectId);
        const isConsentRequired = consentManager.isConsentRequired(subjectId);

        return await securityManager.createSecureResponse({
          success: true,
          consentStatus,
          isConsentRequired,
          policyVersion: consentManager.getCurrentPolicyVersion().version
        });
      }

      default:
        return await securityManager.createSecureResponse(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('GDPR API error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Apply security protection
    const protection = await securityManager.protectRoute(request, 'api');
    if (!protection.success) {
      return protection.response!;
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'export_status': {
        const requestId = searchParams.get('requestId');
        
        if (!requestId) {
          return await securityManager.createSecureResponse(
            { error: 'Request ID is required' },
            { status: 400 }
          );
        }

        const exportRequest = dataRightsManager.getExportRequest(requestId);
        
        if (!exportRequest) {
          return await securityManager.createSecureResponse(
            { error: 'Export request not found' },
            { status: 404 }
          );
        }

        return await securityManager.createSecureResponse({
          success: true,
          status: exportRequest.status,
          requestDate: exportRequest.requestDate,
          completedDate: exportRequest.completedDate,
          downloadUrl: exportRequest.downloadUrl,
          expiryDate: exportRequest.expiryDate
        });
      }

      case 'deletion_status': {
        const requestId = searchParams.get('requestId');
        
        if (!requestId) {
          return await securityManager.createSecureResponse(
            { error: 'Request ID is required' },
            { status: 400 }
          );
        }

        const deletionRequest = dataRightsManager.getDeletionRequest(requestId);
        
        if (!deletionRequest) {
          return await securityManager.createSecureResponse(
            { error: 'Deletion request not found' },
            { status: 404 }
          );
        }

        return await securityManager.createSecureResponse({
          success: true,
          status: deletionRequest.status,
          requestDate: deletionRequest.requestDate,
          verifiedDate: deletionRequest.verifiedDate,
          completedDate: deletionRequest.completedDate,
          retentionOverrides: deletionRequest.retentionOverrides
        });
      }

      case 'privacy_policy': {
        const policyVersion = consentManager.getCurrentPolicyVersion();
        
        return await securityManager.createSecureResponse({
          success: true,
          version: policyVersion.version,
          effectiveDate: policyVersion.effectiveDate,
          content: policyVersion.content,
          changes: policyVersion.changes
        });
      }

      case 'cookie_banner_config': {
        const config = consentManager.getDefaultBannerConfig();
        
        return await securityManager.createSecureResponse({
          success: true,
          config
        });
      }

      default:
        return await securityManager.createSecureResponse(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('GDPR API GET error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}