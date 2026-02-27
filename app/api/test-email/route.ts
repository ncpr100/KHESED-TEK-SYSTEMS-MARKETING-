import { sendMarketAwareEmail } from '@/lib/gmail-service';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testEmail = body.testEmail || body.to || 'test@example.com';
    
    console.log('Testing email delivery to:', testEmail);
    console.log('Gmail User:', process.env.GMAIL_USER ? 'Set' : 'Missing');
    console.log('Gmail App Password:', process.env.GMAIL_APP_PASSWORD ? 'Set (16 chars)' : 'Missing');
    
    // Test email delivery
    const result = await sendMarketAwareEmail({
      name: 'Email Test',
      email: testEmail || 'test@example.com',
      org: 'KHESED-TEK Systems',
      message: 'This is a test email to verify configuration.',
      wantsDemo: false,
      receivedAt: new Date().toISOString(),
      market: 'LATAM',
      leadId: 'test-123',
      leadScore: 85,
      priority: { 
        level: 'high',
        label: 'Hot Lead', 
        color: '#ef4444',
        marketContext: 'LATAM market - High priority',
        recommendedActions: ['Contact within 2 hours', 'Schedule demo call']
      }
    });

    if (result.success) {
      return Response.json({ 
        success: true, 
        message: '✅ Email sent successfully!',
        details: result
      });
    } else {
      return Response.json({ 
        success: false, 
        error: 'Failed to send email',
        details: result.error 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Email test error:', error);
    return Response.json({ 
      success: false, 
      error: 'Email test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}