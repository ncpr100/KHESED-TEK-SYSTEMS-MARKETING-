import { NextRequest } from 'next/server';
import { getCRM } from '@/lib/crm/manager';
import { Lead, ActivityType } from '@/lib/crm/types';
import { MarketAwareLeadScoring, getMarketAwarePriority } from '@/lib/crm/market-scoring';
import { sendMarketAwareEmail, detectMarketFromEmail, type Market } from '@/lib/email-service';

const leadScoring = new MarketAwareLeadScoring();

export async function POST(request: NextRequest) {
  console.log('=== Contact Form Debug Info ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Request URL:', request.url);
  
  try {
    const formData = await request.formData();
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      org: String(formData.get('org') || '').trim(),
      whatsapp: String(formData.get('whatsapp') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      wantsDemo: !!formData.get('wantsDemo'),
      receivedAt: new Date().toISOString(),
    };

    if (!payload.name || !payload.email) {
      return Response.json(
        { ok: false, error: 'Nombre y correo son obligatorios.' }, 
        { status: 400 }
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return Response.json(
        { ok: false, error: 'Correo electrónico inválido.' }, 
        { status: 400 }
      );
    }

    // Detect market from form data
    const market = detectMarketFromEmail(payload.email, payload);

    // Create CRM lead first (before email to ensure we capture even if email fails)
    let leadId: string | undefined;
    let leadScore: number | undefined;
    let leadPriority: any;

    const crm = getCRM();
    if (crm) {
      try {
        const adapter = crm.getAdapter();
        const [firstName, ...lastNameParts] = payload.name.split(' ');
        
        const lead: Lead = {
          email: payload.email,
          firstName,
          lastName: lastNameParts.join(' ') || undefined,
          company: payload.org || undefined,
          phone: payload.whatsapp || undefined,
          source: 'website_form',
          customFields: {
            wantsDemo: payload.wantsDemo,
            initialMessage: payload.message,
            formSubmissionDate: payload.receivedAt,
          },
        };

        const leadResult = await adapter.createLead(lead);
        
        if (leadResult.success && leadResult.data) {
          leadId = leadResult.data.id;
          
          // Log form submission activity
          await adapter.logActivity(leadId!, {
            type: ActivityType.FORM_SUBMITTED,
            description: `Contact form submitted${payload.message ? `: ${payload.message}` : ''}`,
            timestamp: new Date(),
            metadata: {
              wantsDemo: payload.wantsDemo,
              source: 'website_contact_form',
              formData: payload,
            },
          });

          // Log demo request activity if applicable
          if (payload.wantsDemo) {
            await adapter.logActivity(leadId!, {
              type: ActivityType.DEMO_REQUESTED,
              description: 'Demo requested via contact form',
              timestamp: new Date(),
              metadata: {
                source: 'website_contact_form',
              },
            });
          }

          // Calculate market-aware lead score
          const activities = await adapter.getActivities(leadId!);
          leadScore = leadScoring.calculate(leadResult.data, activities.data || []);
          leadPriority = getMarketAwarePriority(leadScore, market, leadResult.data);
          
          // Update lead with score
          await adapter.updateLead(leadId!, { score: leadScore });

          console.log('✓ Lead created in CRM:', leadId, 'Score:', leadScore, 'Priority:', leadPriority.label);
        } else {
          console.warn('Failed to create CRM lead:', leadResult.error);
        }
      } catch (crmError) {
        console.warn('CRM integration error (continuing with email):', crmError);
      }
    }

    // Log form submission to console (for development/testing)
    console.log('\n🎉 ===== NEW FORM SUBMISSION =====');
    console.log(`Market: ${market}, Lead ID: ${leadId}, Score: ${leadScore}`);
    console.log('==================================\n');

    // Send market-aware email notification
    const emailResult = await sendMarketAwareEmail({
      name: payload.name,
      email: payload.email,
      org: payload.org,
      whatsapp: payload.whatsapp,
      message: payload.message,
      wantsDemo: payload.wantsDemo,
      receivedAt: payload.receivedAt,
      market,
      leadId,
      leadScore,
      priority: leadPriority
    });

    let emailSent = emailResult.success;
    let emailData = emailResult.data;

    // Log email result in CRM
    if (crm && leadId) {
      const adapter = crm.getAdapter();
      if (emailResult.success) {
        await adapter.logActivity(leadId, {
          type: ActivityType.EMAIL_SENT,
          description: `Demo request notification sent to ${emailResult.market} team`,
          timestamp: new Date(),
          metadata: { 
            emailId: emailData?.id,
            market: emailResult.market,
            type: 'internal_notification' 
          },
        });
      } else {
        await adapter.logActivity(leadId, {
          type: ActivityType.NOTE_ADDED,
          description: `Email notification failed: ${emailResult.error}`,
          timestamp: new Date(),
          metadata: { 
            error: emailResult.error, 
            market: emailResult.market,
            type: 'email_failure' 
          },
        });
      }
    }

    // Trigger email automation campaign
    try {
      const emailAutomationResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/email-automation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'trigger_campaign',
          data: {
            subscriberEmail: payload.email,
            campaignId: payload.wantsDemo ? 'campaign_2' : 'campaign_1', // Demo follow-up or Welcome series
            variables: {
              firstName: payload.name.split(' ')[0],
              lastName: payload.name.split(' ').slice(1).join(' '),
              company: payload.org || 'su organización',
              crmLeadId: leadId,
              wantsDemo: payload.wantsDemo,
              source: 'website_form',
            },
          },
        }),
      });

      if (emailAutomationResponse.ok) {
        const automationResult = await emailAutomationResponse.json();
        console.log('✓ Email automation triggered:', automationResult);
      } else {
        console.warn('Email automation trigger failed, but continuing...');
      }
    } catch (automationError) {
      console.warn('Email automation error (non-critical):', automationError);
    }

    console.log('✓ Demo request processed:', {
      emailId: emailData?.id,
      leadId,
      leadScore,
      priority: leadPriority?.label,
      market,
      emailSent
    });

    return Response.json({ 
      ok: true, 
      id: emailData?.id,
      leadId,
      leadScore,
      priority: leadPriority?.label,
      market
    });
  } catch (err) {
    console.error('Request Demo Error:', err);
    return Response.json(
      { ok: false, error: 'Error al procesar la solicitud.' }, 
      { status: 500 }
    );
  }
}
