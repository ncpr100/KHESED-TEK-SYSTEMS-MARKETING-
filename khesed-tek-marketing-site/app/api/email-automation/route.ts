import { NextRequest } from 'next/server';
import { getEmailEngine } from '@/lib/email/automation';
import { CampaignManager } from '@/lib/email/campaigns';
import { TemplateManager } from '@/lib/email/templates';
import { SubscriberStatus, EmailCategory, EmailJobStatus } from '@/lib/email/types';
import { getCRM } from '@/lib/crm/manager';
import { ActivityType } from '@/lib/crm/types';
import { securityManager } from '@/lib/security/manager';

const campaignManager = new CampaignManager();
const templateManager = new TemplateManager();

export async function POST(request: NextRequest) {
  try {
    // Apply API rate limiting
    const protection = await securityManager.protectRoute(request, 'api');
    if (!protection.success) {
      return protection.response!;
    }

    const body = await request.json();
    const { action, data } = body;

    const emailEngine = getEmailEngine();
    if (!emailEngine) {
      return await securityManager.createSecureResponse(
        { error: 'Email automation not configured' },
        { status: 503 }
      );
    }

    switch (action) {
      case 'trigger_campaign': {
        const { subscriberEmail, campaignId, variables } = data;
        
        // Find active campaigns for this trigger
        const campaign = campaignManager.getCampaign(campaignId);
        if (!campaign) {
          return await securityManager.createSecureResponse(
            { error: 'Campaign not found' },
            { status: 404 }
          );
        }

        // Create subscriber object
        const subscriber = {
          id: `sub_${Date.now()}`,
          email: subscriberEmail,
          firstName: variables.firstName,
          lastName: variables.lastName,
          company: variables.company,
          status: SubscriberStatus.ACTIVE,
          tags: [],
          customFields: variables,
          preferences: {
            emailFrequency: 'weekly' as const,
            categories: [],
            language: 'es' as const,
            timezone: 'America/Bogota'
          },
          subscriptionDate: new Date(),
        };

        // Schedule email jobs
        const jobs = campaignManager.scheduleEmailJobs(campaignId, subscriber);
        
        // Send first email immediately if scheduled now
        const immediateJobs = jobs.filter(job => job.scheduledAt <= new Date());
        const results = [];

        for (const job of immediateJobs) {
          const result = await emailEngine.sendCampaignEmail(
            subscriberEmail,
            job.templateId,
            {
              ...variables,
              subscriberId: subscriber.id,
            },
            campaignId
          );

          if (result.success) {
            campaignManager.updateJobStatus(job.id, EmailJobStatus.SENT, { emailId: result.emailId });
            
            // Log in CRM if available
            const crm = getCRM();
            if (crm && variables.crmLeadId) {
              await crm.getAdapter().logActivity(variables.crmLeadId, {
                type: ActivityType.EMAIL_SENT,
                description: `Campaign email sent: ${campaign.name}`,
                timestamp: new Date(),
                metadata: {
                  campaignId,
                  emailId: result.emailId,
                  templateId: job.templateId,
                },
              });
            }
          }

          results.push({
            jobId: job.id,
            success: result.success,
            emailId: result.emailId,
            error: result.error,
          });
        }

        return await securityManager.createSecureResponse({
          success: true,
          campaign: campaign.name,
          jobsScheduled: jobs.length,
          jobsSent: immediateJobs.length,
          results,
        });
      }

      case 'send_template': {
        const { email, templateId, variables } = data;
        
        const rendered = templateManager.renderTemplate(templateId, variables);
        if (!rendered) {
          return await securityManager.createSecureResponse(
            { error: 'Template not found' },
            { status: 404 }
          );
        }

        const result = await emailEngine.sendCampaignEmail(
          email,
          templateId,
          variables,
          'manual'
        );

        return await securityManager.createSecureResponse({
          success: result.success,
          emailId: result.emailId,
          error: result.error,
        });
      }

      case 'get_campaigns': {
        const campaigns = campaignManager.getActiveCampaigns();
        return await securityManager.createSecureResponse({
          success: true,
          campaigns: campaigns.map(c => ({
            id: c.id,
            name: c.name,
            description: c.description,
            type: c.type,
            status: c.status,
            metrics: campaignManager.getCampaignMetrics(c.id),
          })),
        });
      }

      case 'get_templates': {
        const templates = templateManager.getAllTemplates();
        return await securityManager.createSecureResponse({
          success: true,
          templates: templates.map(t => ({
            id: t.id,
            name: t.name,
            category: t.category,
            language: t.language,
            active: t.active,
            variables: t.variables,
          })),
        });
      }

      case 'webhook': {
        // Handle email provider webhooks
        const { provider, payload } = data;
        
        if (provider === 'resend') {
          // Process Resend webhook
          const emailId = payload.data?.email_id;
          const eventType = payload.type;
          
          console.log(`Email webhook received: ${eventType} for ${emailId}`);
          
          // Update job status based on webhook
          // This would require mapping email IDs to job IDs
          
          return await securityManager.createSecureResponse({ success: true });
        }

        return await securityManager.createSecureResponse(
          { error: 'Unknown provider' },
          { status: 400 }
        );
      }

      default:
        return await securityManager.createSecureResponse(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Email automation API error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'status': {
        const emailEngine = getEmailEngine();
        return await securityManager.createSecureResponse({
          enabled: !!emailEngine,
          campaigns: campaignManager.getActiveCampaigns().length,
          templates: templateManager.getAllTemplates().length,
        });
      }

      case 'campaigns': {
        const campaigns = campaignManager.getActiveCampaigns();
        return await securityManager.createSecureResponse({
          success: true,
          campaigns: campaigns.map(c => ({
            id: c.id,
            name: c.name,
            description: c.description,
            type: c.type,
            status: c.status,
            metrics: campaignManager.getCampaignMetrics(c.id),
          })),
        });
      }

      case 'templates': {
        const category = searchParams.get('category');
        const templates = category 
          ? templateManager.getTemplatesByCategory(category as any)
          : templateManager.getAllTemplates();
          
        return await securityManager.createSecureResponse({
          success: true,
          templates: templates.map(t => ({
            id: t.id,
            name: t.name,
            subject: t.subject,
            category: t.category,
            language: t.language,
            active: t.active,
            variables: t.variables,
          })),
        });
      }

      default:
        return await securityManager.createSecureResponse(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Email automation API error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}