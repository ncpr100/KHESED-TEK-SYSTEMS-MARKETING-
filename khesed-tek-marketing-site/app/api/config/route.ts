import { NextRequest, NextResponse } from 'next/server';

interface NextStep {
  priority: 'low' | 'medium' | 'high' | 'none';
  action: string;
  description: string;
  impact: string;
}

export async function GET(request: NextRequest) {
  try {
    // Check what services are configured
    const config = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        crm: {
          hubspot: !!process.env.HUBSPOT_API_KEY,
          salesforce: !!(process.env.SALESFORCE_CLIENT_ID && process.env.SALESFORCE_CLIENT_SECRET),
          configured: !!(process.env.HUBSPOT_API_KEY || (process.env.SALESFORCE_CLIENT_ID && process.env.SALESFORCE_CLIENT_SECRET))
        },
        email: {
          sendgrid: !!process.env.SENDGRID_API_KEY,
          smtp: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
          configured: !!(process.env.SENDGRID_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS))
        },
        security: {
          jwt: !!process.env.JWT_SECRET,
          encryption: !!process.env.ENCRYPTION_KEY,
          api_secret: !!process.env.API_SECRET,
          configured: !!(process.env.JWT_SECRET && process.env.API_SECRET)
        }
      },
      setup_status: {
        basic_functionality: 'ready', // Always ready
        crm_integration: !!(process.env.HUBSPOT_API_KEY || (process.env.SALESFORCE_CLIENT_ID && process.env.SALESFORCE_CLIENT_SECRET)) ? 'ready' : 'pending',
        email_automation: !!(process.env.SENDGRID_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)) ? 'ready' : 'pending',
        advanced_security: !!(process.env.JWT_SECRET && process.env.API_SECRET) ? 'ready' : 'basic'
      },
      next_steps: [] as NextStep[]
    };

    // Add recommendations
    if (!config.services.crm.configured) {
      config.next_steps.push({
        priority: 'medium',
        action: 'Configure CRM integration',
        description: 'Add HUBSPOT_API_KEY or SALESFORCE credentials to enable automatic contact sync',
        impact: 'Contact forms will work but won\'t sync to CRM automatically'
      });
    }

    if (!config.services.email.configured) {
      config.next_steps.push({
        priority: 'medium', 
        action: 'Configure email automation',
        description: 'Add SENDGRID_API_KEY or SMTP settings to enable automated emails',
        impact: 'Contact forms will work but no automated email responses will be sent'
      });
    }

    if (!config.services.security.configured) {
      config.next_steps.push({
        priority: 'low',
        action: 'Configure advanced security',
        description: 'Add JWT_SECRET and API_SECRET for enhanced security features',
        impact: 'Basic security works, but advanced encryption features are disabled'
      });
    }

    if (config.next_steps.length === 0) {
      config.next_steps.push({
        priority: 'none',
        action: 'All systems configured!',
        description: 'Your marketing site is fully configured with all integrations',
        impact: 'All features are operational'
      });
    }

    return NextResponse.json(config, { status: 200 });

  } catch (error) {
    console.error('Configuration check error:', error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}