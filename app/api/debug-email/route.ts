import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      emailConfig: {
        resendApiKey: process.env.RESEND_API_KEY ? `✅ Set (${process.env.RESEND_API_KEY.substring(0, 8)}...)` : '❌ Missing',
        resendDomain: process.env.RESEND_DOMAIN || '❌ Not set',
        contactEmailLatam: process.env.CONTACT_EMAIL_LATAM || '❌ Missing',
        contactEmailUsa: process.env.CONTACT_EMAIL_USA || '❌ Missing', 
        contactEmailGlobal: process.env.CONTACT_EMAIL_GLOBAL || '❌ Missing',
      },
      fromAddresses: {
        latam: 'KHESED-TEK SYSTEMS <contacto@khesed-tek-systems.org>',
        usa: 'KHESED-TEK SYSTEMS <contact@khesed-tek-systems.org>',
        global: 'KHESED-TEK SYSTEMS <global@khesed-tek-systems.org>',
      },
      domainVerificationRequired: 'khesed-tek-systems.org must be verified in Resend',
      nextSteps: [
        'Check Resend dashboard for domain verification status',
        'Verify DNS records for khesed-tek-systems.org are set correctly',
        'Test email sending with verified domain',
        'Check Resend logs for detailed error messages'
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