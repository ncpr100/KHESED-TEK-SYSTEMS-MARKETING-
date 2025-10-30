import { EmailProvider, SendEmailParams, SendEmailResult, DeliveryStatus, WebhookResult, EmailEvent } from './types';
import { Resend } from 'resend';

export class ResendEmailProvider implements EmailProvider {
  readonly name = 'Resend';
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: params.from,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
        reply_to: params.replyTo,
        tags: params.tags?.map(tag => ({ name: 'campaign', value: tag })),
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to send email',
        };
      }

      return {
        success: true,
        emailId: data?.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async trackDelivery(emailId: string): Promise<DeliveryStatus> {
    // Resend doesn't provide a direct API for delivery status
    // This would typically be handled via webhooks
    return {
      status: 'unknown',
    };
  }

  async handleWebhook(payload: any): Promise<WebhookResult> {
    const events: EmailEvent[] = [];
    
    try {
      // Parse Resend webhook payload
      const { type, data } = payload;
      
      if (type && data) {
        const event: EmailEvent = {
          type: this.mapResendEventType(type),
          emailId: data.email_id || data.id,
          timestamp: new Date(data.created_at || Date.now()),
          metadata: data,
        };
        
        events.push(event);
      }

      return {
        processed: true,
        events,
      };
    } catch (error) {
      console.error('Error processing webhook:', error);
      return {
        processed: false,
        events: [],
      };
    }
  }

  private mapResendEventType(resendType: string): EmailEvent['type'] {
    switch (resendType) {
      case 'email.sent':
        return 'sent';
      case 'email.delivered':
        return 'delivered';
      case 'email.opened':
        return 'opened';
      case 'email.clicked':
        return 'clicked';
      case 'email.bounced':
        return 'bounced';
      case 'email.complained':
        return 'complained';
      default:
        return 'sent';
    }
  }
}

// Email automation engine
export class EmailAutomationEngine {
  private emailProvider: EmailProvider;
  private isRunning: boolean = false;
  private processingInterval?: NodeJS.Timeout;

  constructor(emailProvider: EmailProvider) {
    this.emailProvider = emailProvider;
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('Email automation engine started');
    
    // Process jobs every minute
    this.processingInterval = setInterval(() => {
      this.processScheduledJobs();
    }, 60000);
  }

  stop(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
    console.log('Email automation engine stopped');
  }

  private async processScheduledJobs(): Promise<void> {
    try {
      // This would typically integrate with a job queue system
      // For now, we'll use a simple in-memory approach
      console.log('Processing scheduled email jobs...');
      
      // Implementation would:
      // 1. Get jobs ready to send from CampaignManager
      // 2. Send emails via email provider
      // 3. Update job status
      // 4. Log activities in CRM
      
    } catch (error) {
      console.error('Error processing scheduled jobs:', error);
    }
  }

  async sendCampaignEmail(
    subscriberEmail: string,
    templateId: string,
    variables: Record<string, any>,
    campaignId: string
  ): Promise<SendEmailResult> {
    // This would integrate with TemplateManager to render the template
    // and then send via the email provider
    
    const from = process.env.EMAIL_FROM || 'KHESED-TEK <onboarding@resend.dev>';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.khesed-tek.com';
    
    // Add default variables
    const templateVariables = {
      ...variables,
      websiteUrl: baseUrl,
      unsubscribeUrl: `${baseUrl}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}&campaign=${campaignId}`,
      companyName: 'KHESED-TEK',
    };

    // For demo purposes, we'll send a simple email
    // In production, this would use the TemplateManager
    const result = await this.emailProvider.sendEmail({
      to: subscriberEmail,
      from,
      subject: `Información de KHESED-TEK para ${variables.firstName || 'usted'}`,
      html: this.generateSimpleHtml(templateVariables),
      text: this.generateSimpleText(templateVariables),
      tags: ['campaign', campaignId],
      metadata: {
        campaignId,
        templateId,
        subscriberId: variables.subscriberId,
      },
    });

    return result;
  }

  private generateSimpleHtml(variables: Record<string, any>): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e293b;">¡Hola ${variables.firstName || 'amigo'}!</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Gracias por tu interés en KHESED-TEK. Estamos emocionados de ayudarte a transformar digitalmente ${variables.company || 'tu organización'}.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${variables.websiteUrl}/contact" style="background: linear-gradient(90deg, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Programa tu Demo
          </a>
        </div>
        
        <p style="font-size: 14px; color: #64748b; text-align: center;">
          Si ya no deseas recibir estos correos, puedes <a href="${variables.unsubscribeUrl}" style="color: #3b82f6;">darte de baja aquí</a>.
        </p>
      </div>
    `;
  }

  private generateSimpleText(variables: Record<string, any>): string {
    return `
¡Hola ${variables.firstName || 'amigo'}!

Gracias por tu interés en KHESED-TEK. Estamos emocionados de ayudarte a transformar digitalmente ${variables.company || 'tu organización'}.

Programa tu demo: ${variables.websiteUrl}/contact

Si ya no deseas recibir estos correos, puedes darte de baja aquí: ${variables.unsubscribeUrl}

Bendiciones,
El equipo de KHESED-TEK
    `;
  }
}

// Initialize email automation
let emailEngine: EmailAutomationEngine | null = null;

export function initializeEmailAutomation(): EmailAutomationEngine | null {
  if (emailEngine) return emailEngine;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not found. Email automation disabled.');
    return null;
  }

  try {
    const emailProvider = new ResendEmailProvider(resendApiKey);
    emailEngine = new EmailAutomationEngine(emailProvider);
    
    // Start the engine
    emailEngine.start();
    
    console.log('Email automation initialized successfully');
    return emailEngine;
  } catch (error) {
    console.error('Failed to initialize email automation:', error);
    return null;
  }
}

export function getEmailEngine(): EmailAutomationEngine | null {
  return emailEngine || initializeEmailAutomation();
}