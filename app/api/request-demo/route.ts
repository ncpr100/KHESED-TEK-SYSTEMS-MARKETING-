import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { getCRM } from '@/lib/crm/manager';
import { Lead, ActivityType } from '@/lib/crm/types';
import { DefaultLeadScoring, getLeadPriority } from '@/lib/crm/scoring';
import { securityManager } from '@/lib/security/manager';

// Lazy-load Resend to avoid build-time API key requirement
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const leadScoring = new DefaultLeadScoring();

function generateSessionId(req: NextRequest): string {
  const ip = getClientIP(req);
  const userAgent = req.headers.get('user-agent') || 'unknown';
  return Buffer.from(`${ip}:${userAgent}`).toString('base64');
}

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    // Apply security protection with contact rate limiting
    const sessionId = generateSessionId(req);
    const protection = await securityManager.protectRoute(req, 'contact', false, sessionId);
    if (!protection.success) {
      return protection.response!;
    }

    const formData = await req.formData();
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
      return await securityManager.createSecureResponse(
        { ok: false, error: 'Nombre y correo son obligatorios.' }, 
        { status: 400 }
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return await securityManager.createSecureResponse(
        { ok: false, error: 'Correo electrónico inválido.' }, 
        { status: 400 }
      );
    }

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

          // Calculate lead score
          const activities = await adapter.getActivities(leadId!);
          leadScore = leadScoring.calculate(leadResult.data, activities.data || []);
          leadPriority = getLeadPriority(leadScore);
          
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

    // Prepare email body with CRM info
    const emailBody = `
Nueva solicitud de demo - KHESED-TEK
${leadId ? `\n🆔 CRM ID: ${leadId}` : ''}
${leadScore ? `📊 Lead Score: ${leadScore}/100 (${leadPriority?.label})` : ''}

👤 Nombre: ${payload.name}
📧 Correo: ${payload.email}
🏢 Organización: ${payload.org || 'No especificada'}
📱 WhatsApp: ${payload.whatsapp || 'No especificado'}
🎯 Quiere demo: ${payload.wantsDemo ? 'Sí' : 'No'}

Mensaje:
${payload.message || 'Sin mensaje'}

Recibido: ${new Date(payload.receivedAt).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
${leadPriority?.level === 'high' ? '\n🔥 LEAD PRIORITARIO - Contactar inmediatamente' : ''}
    `.trim();

    // Send email notification
    const resend = getResend();
    let emailSent = false;
    let emailData = null;
    
    if (resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'KHESED-TEK Demo <onboarding@resend.dev>',
          to: process.env.CONTACT_EMAIL || 'soporte@khesed-tek.com',
          reply_to: payload.email,
          subject: `${leadPriority?.level === 'high' ? '🔥 PRIORITARIO - ' : ''}Nueva solicitud de demo - ${payload.name}`,
          text: emailBody,
        });

        if (error) {
          console.error('Resend error:', error);
          // If email fails but CRM succeeded, log the email failure
          if (crm && leadId) {
            const adapter = crm.getAdapter();
            await adapter.logActivity(leadId, {
              type: ActivityType.NOTE_ADDED,
              description: `Email notification failed: ${error.message}`,
              timestamp: new Date(),
              metadata: { error: error.message, type: 'email_failure' },
            });
          }
        } else {
          emailSent = true;
          emailData = data;
          console.log('Email sent successfully:', data?.id);
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Log email failure in CRM if available
        if (crm && leadId) {
          const adapter = crm.getAdapter();
          await adapter.logActivity(leadId, {
            type: ActivityType.NOTE_ADDED,
            description: `Email sending failed: ${emailError instanceof Error ? emailError.message : 'Unknown error'}`,
            timestamp: new Date(),
            metadata: { error: emailError, type: 'email_failure' },
          });
        }
      }
    } else {
      console.log('Resend not configured - email notification skipped');
    }

    // Log successful email send in CRM
    if (emailSent && crm && leadId) {
      const adapter = crm.getAdapter();
      await adapter.logActivity(leadId, {
        type: ActivityType.EMAIL_SENT,
        description: 'Demo request notification email sent to team',
        timestamp: new Date(),
        metadata: { 
          emailId: emailData?.id,
          recipient: process.env.CONTACT_EMAIL,
          type: 'internal_notification' 
        },
      });
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
    });

    return await securityManager.createSecureResponse({ 
      ok: true, 
      id: emailData?.id,
      leadId,
      leadScore,
      priority: leadPriority?.label,
    });
  } catch (err) {
    console.error('Request Demo Error:', err);
    return await securityManager.createSecureResponse(
      { ok: false, error: 'Error al procesar la solicitud.' }, 
      { status: 500 }
    );
  }
}
