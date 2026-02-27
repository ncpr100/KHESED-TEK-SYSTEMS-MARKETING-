import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      emailConfig: {
        emailService: 'Gmail SMTP',
        gmailUser: process.env.GMAIL_USER ? `✅ Set (${process.env.GMAIL_USER})` : '❌ Missing',
        gmailAppPassword: process.env.GMAIL_APP_PASSWORD ? '✅ Set (password configured)' : '❌ Missing',
        contactEmailLatam: process.env.CONTACT_EMAIL_LATAM || '❌ Missing',
        contactEmailUsa: process.env.CONTACT_EMAIL_USA || '❌ Missing', 
        contactEmailGlobal: process.env.CONTACT_EMAIL_GLOBAL || '❌ Missing',
      },
      fromAddresses: {
        latam: 'KHESED-TEK SYSTEMS <contacto@khesed-tek-systems.org>',
        usa: 'KHESED-TEK SYSTEMS <contact@khesed-tek-systems.org>',
        global: 'KHESED-TEK SYSTEMS <global@khesed-tek-systems.org>',
      },
      gmailSetup: 'Using Google App Password for SMTP authentication',
      nextSteps: [
        'Ensure Gmail user account has 2FA enabled',
        'Generate Google App Password in Google Account Security settings',
        'Set GMAIL_USER and GMAIL_APP_PASSWORD environment variables',
        'Test email sending with Gmail SMTP service'
      ]
    };

    return NextResponse.json(diagnostics, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      error: 'Diagnostics failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}