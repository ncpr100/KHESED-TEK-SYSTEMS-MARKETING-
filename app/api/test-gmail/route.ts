import { NextRequest } from 'next/server';
import { sendMarketAwareEmail } from '@/lib/gmail-service';

export async function GET(request: NextRequest) {
  console.log('🧪 Testing Gmail SMTP configuration...');
  
  // Check environment variables
  const hasGmailUser = !!process.env.GMAIL_USER;
  const hasGmailPassword = !!process.env.GMAIL_APP_PASSWORD;
  const hasContactEmail = !!process.env.CONTACT_EMAIL_LATAM;
  
  console.log('Environment check:', {
    GMAIL_USER: hasGmailUser ? 'SET' : 'MISSING',
    GMAIL_APP_PASSWORD: hasGmailPassword ? 'SET' : 'MISSING',
    CONTACT_EMAIL_LATAM: hasContactEmail ? 'SET' : 'MISSING',
    gmailUserValue: process.env.GMAIL_USER || 'NOT SET'
  });
  
  if (!hasGmailUser || !hasGmailPassword) {
    return Response.json({
      ok: false,
      error: 'Gmail credentials not configured',
      details: {
        GMAIL_USER: hasGmailUser,
        GMAIL_APP_PASSWORD: hasGmailPassword
      }
    }, { status: 500 });
  }
  
  // Try sending a test email
  try {
    const result = await sendMarketAwareEmail({
      name: 'Test User',
      email: 'test@example.com',
      org: 'Test Organization',
      message: 'This is a test email from the Gmail configuration test endpoint',
      wantsDemo: true,
      receivedAt: new Date().toISOString(),
      market: 'LATAM'
    });
    
    console.log('Test email result:', result);
    
    return Response.json({
      ok: result.success,
      result,
      config: {
        GMAIL_USER: process.env.GMAIL_USER,
        hasPassword: hasGmailPassword,
        passwordLength: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '').length
      }
    });
  } catch (error) {
    console.error('Test email error:', error);
    return Response.json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
