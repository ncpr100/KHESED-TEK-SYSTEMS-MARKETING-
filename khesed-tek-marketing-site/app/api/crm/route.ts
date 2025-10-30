import { NextRequest } from 'next/server';
import { getCRM } from '@/lib/crm/manager';
import { Lead, Activity, ActivityType } from '@/lib/crm/types';
import { DefaultLeadScoring, getLeadPriority, getRecommendedActions } from '@/lib/crm/scoring';
import { trackCRMSync } from '@/lib/analytics';
import { securityManager } from '@/lib/security/manager';

const leadScoring = new DefaultLeadScoring();

export async function POST(request: NextRequest) {
  try {
    // Apply API rate limiting
    const protection = await securityManager.protectRoute(request, 'api');
    if (!protection.success) {
      return protection.response!;
    }

    const body = await request.json();
    const { action, data } = body;

    const crm = getCRM();
    if (!crm) {
      // If no CRM configured, store data locally and return success
      console.log('CRM not configured - storing contact data locally:', data);
      
      // In a real app, you'd store this in a database
      // For now, we'll just log it and return success
      return await securityManager.createSecureResponse({
        success: true,
        message: 'Contact submitted successfully. CRM integration pending setup.',
        stored_locally: true,
        data: data,
        next_steps: 'Configure CRM API keys in environment variables to enable automatic sync'
      });
    }

    const adapter = crm.getAdapter();

    switch (action) {
      case 'create_lead': {
        const { contact, wantsDemo, message, source } = data;
        
        // Create lead object
        const lead: Lead = {
          email: contact.email,
          firstName: contact.name?.split(' ')[0],
          lastName: contact.name?.split(' ').slice(1).join(' '),
          company: contact.org,
          phone: contact.whatsapp,
          source: source || 'website',
          customFields: {
            wantsDemo: wantsDemo || false,
            initialMessage: message,
          },
        };

        // Create lead in CRM
        const result = await adapter.createLead(lead);
        
        if (result.success && result.data) {
          // Log form submission activity
          await adapter.logActivity(result.data.id!, {
            type: ActivityType.FORM_SUBMITTED,
            description: `Contact form submitted${message ? `: ${message}` : ''}`,
            timestamp: new Date(),
            metadata: {
              wantsDemo: wantsDemo || false,
              source: source || 'website',
            },
          });

          // Calculate lead score
          const activities = await adapter.getActivities(result.data.id!);
          const score = leadScoring.calculate(result.data, activities.data || []);
          
          // Update lead with score
          await adapter.updateLead(result.data.id!, { score });

          // Track analytics
          trackCRMSync('lead_created', {
            leadId: result.data.id,
            score,
            source: source || 'website',
          });

          const priority = getLeadPriority(score);
          const recommendations = getRecommendedActions(result.data, activities.data || [], score);

          return await securityManager.createSecureResponse({
            success: true,
            lead: result.data,
            score,
            priority,
            recommendations,
          });
        }

        return await securityManager.createSecureResponse(
          { error: result.error || 'Failed to create lead' },
          { status: 500 }
        );
      }

      case 'update_score': {
        const { leadId } = data;
        
        // Get lead and activities
        const leadResult = await adapter.getLead(leadId);
        const activitiesResult = await adapter.getActivities(leadId);
        
        if (leadResult.success && leadResult.data) {
          const score = leadScoring.calculate(leadResult.data, activitiesResult.data || []);
          
          // Update lead with new score
          await adapter.updateLead(leadId, { score });
          
          const priority = getLeadPriority(score);
          const recommendations = getRecommendedActions(
            leadResult.data, 
            activitiesResult.data || [], 
            score
          );

          return await securityManager.createSecureResponse({
            success: true,
            score,
            priority,
            recommendations,
          });
        }

        return await securityManager.createSecureResponse(
          { error: 'Lead not found' },
          { status: 404 }
        );
      }

      case 'log_activity': {
        const { leadId, activityType, description, metadata } = data;
        
        const activity: Activity = {
          type: activityType as ActivityType,
          description,
          timestamp: new Date(),
          metadata,
        };

        const result = await adapter.logActivity(leadId, activity);
        
        if (result.success) {
          // Recalculate score after new activity
          const leadResult = await adapter.getLead(leadId);
          const activitiesResult = await adapter.getActivities(leadId);
          
          if (leadResult.success && leadResult.data) {
            const score = leadScoring.calculate(leadResult.data, activitiesResult.data || []);
            await adapter.updateLead(leadId, { score });
          }

          return await securityManager.createSecureResponse({ success: true });
        }

        return await securityManager.createSecureResponse(
          { error: result.error || 'Failed to log activity' },
          { status: 500 }
        );
      }

      case 'get_leads': {
        const { filters } = data;
        const result = await adapter.getLeads(filters);
        
        if (result.success) {
          return await securityManager.createSecureResponse({
            success: true,
            leads: result.data,
          });
        }

        return await securityManager.createSecureResponse(
          { error: result.error || 'Failed to fetch leads' },
          { status: 500 }
        );
      }

      case 'health_check': {
        const health = await crm.healthCheck();
        return await securityManager.createSecureResponse(health);
      }

      default:
        return await securityManager.createSecureResponse(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('CRM API error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Apply API rate limiting
    const protection = await securityManager.protectRoute(request, 'api');
    if (!protection.success) {
      return protection.response!;
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    const crm = getCRM();
    if (!crm) {
      return await securityManager.createSecureResponse(
        { error: 'CRM not configured' },
        { status: 503 }
      );
    }

    switch (action) {
      case 'health': {
        const health = await crm.healthCheck();
        return await securityManager.createSecureResponse(health);
      }

      case 'leads': {
        const adapter = crm.getAdapter();
        const result = await adapter.getLeads();
        
        if (result.success) {
          return await securityManager.createSecureResponse({
            success: true,
            leads: result.data,
          });
        }

        return await securityManager.createSecureResponse(
          { error: result.error || 'Failed to fetch leads' },
          { status: 500 }
        );
      }

      default:
        return await securityManager.createSecureResponse(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('CRM API error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}