import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  console.log('🧪 Direct Gmail SMTP Test Starting...');
  
  const results: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    tests: []
  };

  // Test 1: Environment Variables
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  
  results.tests.push({
    test: 'Environment Variables',
    gmailUser: gmailUser ? `✅ Set (${gmailUser})` : '❌ Missing',
    gmailPassword: gmailPassword ? `✅ Set (${gmailPassword.length} chars)` : '❌ Missing',
    contactEmails: {
      latam: process.env.CONTACT_EMAIL_LATAM || '❌ Missing',
      usa: process.env.CONTACT_EMAIL_USA || '❌ Missing',
      global: process.env.CONTACT_EMAIL_GLOBAL || '❌ Missing'
    }
  });

  if (!gmailUser || !gmailPassword) {
    return Response.json(results, { status: 500 });
  }

  // Test 2: Create Transporter
  let transporter;
  try {
    const cleanPassword = gmailPassword.replace(/\s/g, '');
    
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: cleanPassword
      },
      secure: true,
      port: 465,
      debug: true,
      logger: true
    });

    results.tests.push({
      test: 'Transporter Creation',
      status: '✅ Success',
      config: {
        user: gmailUser,
        passwordLength: cleanPassword.length,
        service: 'gmail',
        port: 465
      }
    });
  } catch (error) {
    results.tests.push({
      test: 'Transporter Creation',
      status: '❌ Failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return Response.json(results, { status: 500 });
  }

  // Test 3: SMTP Connection Verification
  try {
    console.log('🔌 Testing SMTP connection...');
    await transporter.verify();
    
    results.tests.push({
      test: 'SMTP Connection',
      status: '✅ Success - Gmail authenticated successfully',
      details: 'Connection to Gmail SMTP servers verified'
    });
  } catch (error) {
    console.error('❌ SMTP Connection failed:', error);
    results.tests.push({
      test: 'SMTP Connection',
      status: '❌ Failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Gmail SMTP authentication failed. Check credentials.'
    });
    return Response.json(results, { status: 500 });
  }

  // Test 4: Send Test Email
  try {
    console.log('📧 Sending test email...');
    
    const testResult = await transporter.sendMail({
      from: `KHESED-TEK Test <${gmailUser}>`,
      to: process.env.CONTACT_EMAIL_LATAM || gmailUser,
      subject: 'Gmail SMTP Test - Success!',
      text: `Gmail SMTP is working correctly!
      
Test completed at: ${new Date().toISOString()}
Environment: ${process.env.NODE_ENV}
From: ${gmailUser}
      
This confirms that your Gmail SMTP configuration is working properly.`,
      headers: {
        'X-Test': 'Gmail-SMTP-Direct-Test',
        'X-Timestamp': Date.now().toString()
      }
    });

    results.tests.push({
      test: 'Email Sending',
      status: '✅ Success',
      messageId: testResult.messageId,
      to: process.env.CONTACT_EMAIL_LATAM || gmailUser,
      details: 'Test email sent successfully via Gmail SMTP'
    });

    console.log('✅ Test email sent successfully:', testResult.messageId);

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    results.tests.push({
      test: 'Email Sending',
      status: '❌ Failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return Response.json(results, { status: 500 });
  }

  return Response.json(results);
}