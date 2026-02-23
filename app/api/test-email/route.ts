import { sendMarketAwareEmail } from '@/lib/email-service';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { testEmail } = await request.json();
    
    console.log('Testing email delivery to:', testEmail);
    
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
      priority: { label: 'High', color: 'red' }
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