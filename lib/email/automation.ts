import { EmailProvider, SendEmailParams, SendEmailResult, DeliveryStatus, WebhookResult, EmailEvent } from './types';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

export class GmailEmailProvider implements EmailProvider {
  readonly name = 'Gmail';
  private transporter: nodemailer.Transporter | null = null;

  constructor(
    private gmailUser: string,
    private gmailAppPassword: string
  ) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.gmailUser,
          pass: this.gmailAppPassword,
        },
        secure: true,
      });
    } catch (error) {
      console.error('Failed to initialize Gmail transporter:', error);
    }
  }

  async sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
    if (!this.transporter) {
      return {
        success: false,
        error: 'Gmail transporter not initialized',
      };
    }

    try {
      const emailId = uuidv4();
      
      const info = await this.transporter.sendMail({
        from: params.from || this.gmailUser,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
        replyTo: params.replyTo,
        headers: {
          'X-Email-ID': emailId,
          'X-Campaign-Tags': params.tags?.join(',') || '',
          'X-Metadata': JSON.stringify(params.metadata || {}),
        } as any, // Type assertion for custom headers
      });

      return {
        success: true,
        emailId: info.messageId || emailId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async trackDelivery(emailId: string): Promise<DeliveryStatus> {
    // Gmail SMTP doesn't provide direct delivery tracking
    // This would require additional setup with Gmail API
    return {
      status: 'unknown',
    };
  }

  async handleWebhook(payload: any): Promise<WebhookResult> {
    // Gmail SMTP doesn't have native webhooks
    // This would need to be implemented with Gmail API for advanced tracking
    return {
      processed: false,
      events: [],
    };
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
    
    const from = process.env.GMAIL_USER || 'contacto@khesed-tek-systems.org';
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
          <a href="${variables.websiteUrl}/contact" style="background: linear-gradient(90deg, #C9922A, #F0B83C); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Programa tu Demo
          </a>
        </div>
        
        <p style="font-size: 14px; color: #64748b; text-align: center;">
          Si ya no deseas recibir estos correos, puedes <a href="${variables.unsubscribeUrl}" style="color: #C9922A;">darte de baja aquí</a>.
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

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  
  if (!gmailUser || !gmailAppPassword) {
    console.warn('GMAIL_USER or GMAIL_APP_PASSWORD not found. Email automation disabled.');
    return null;
  }

  try {
    const emailProvider = new GmailEmailProvider(gmailUser, gmailAppPassword);
    emailEngine = new EmailAutomationEngine(emailProvider);
    
    // Start the engine
    emailEngine.start();
    
    console.log('Email automation initialized successfully with Gmail');
    return emailEngine;
  } catch (error) {
    console.error('Failed to initialize email automation:', error);
    return null;
  }
}

export function getEmailEngine(): EmailAutomationEngine | null {
  return emailEngine || initializeEmailAutomation();
}