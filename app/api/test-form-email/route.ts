import { NextRequest } from 'next/server';
import { sendMarketAwareEmail, detectMarketFromEmail } from '@/lib/gmail-service';

export async function GET(request: NextRequest) {
  console.log('🧪 Testing form email sending...');
  
  // Mimic exact form submission data
  const testFormData = {
    name: 'Test Church User',
    email: 'test@iglesia.co', // .co domain to test LATAM market
    org: 'Iglesia Test',
    whatsapp: '+57 300 1234567',
    message: 'Testing email from form submission',
    wantsDemo: true,
    receivedAt: new Date().toISOString()
  };

  const market = detectMarketFromEmail(testFormData.email, testFormData);
  
  console.log('📋 Test data prepared:', {
    market,
    email: testFormData.email,
    name: testFormData.name
  });

  try {
    const emailResult = await sendMarketAwareEmail({
      ...testFormData,
      market
    });

    console.log('📬 Email result:', emailResult);

    return Response.json({
      ok: emailResult.success,
      emailResult,
      testData: testFormData,
      detectedMarket: market,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Test error:', error);
    return Response.json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      testData: testFormData
    }, { status: 500 });
  }
}
