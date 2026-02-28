import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(req: NextRequest) {
  console.log('=== DETAILED EMAIL TEST START ===');
  
  // Check environment variables
  const hasGmailUser = !!process.env.GMAIL_USER;
  const hasPassword = !!process.env.GMAIL_APP_PASSWORD;
  const gmailUser = process.env.GMAIL_USER;
  const passwordLength = process.env.GMAIL_APP_PASSWORD?.length || 0;
  
  console.log('Environment Check:', {
    hasGmailUser,
    hasPassword,
    gmailUser,
    passwordLength,
    contactLatam: process.env.CONTACT_EMAIL_LATAM,
    contactUsa: process.env.CONTACT_EMAIL_USA,
    contactGlobal: process.env.CONTACT_EMAIL_GLOBAL
  });

  if (!hasGmailUser || !hasPassword) {
    return NextResponse.json({
      success: false,
      error: 'Missing environment variables',
      details: { hasGmailUser, hasPassword }
    });
  }

  try {
    // Create transporter with maximum debugging
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '')
      },
      secure: true,
      port: 465,
      debug: true,
      logger: true
    });

    console.log('Transporter created, verifying connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    // Send test email
    const testTo = process.env.CONTACT_EMAIL_USA || 'contact@khesed-tek-systems.org';
    console.log(`Sending test email TO: ${testTo} FROM: ${gmailUser}`);
    
    const mailOptions = {
      from: `KHESED-TEK TEST <${gmailUser}>`,
      to: testTo,
      replyTo: 'test@example.com',
      subject: 'Test Email - ' + new Date().toISOString(),
      text: `This is a test email sent at ${new Date().toISOString()}\n\nFrom: ${gmailUser}\nTo: ${testTo}`,
      html: `<p>This is a test email sent at ${new Date().toISOString()}</p><p>From: ${gmailUser}<br>To: ${testTo}</p>`
    };

    console.log('Calling sendMail...');
    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ sendMail completed:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected,
      pending: result.pending
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      details: {
        messageId: result.messageId,
        response: result.response,
        accepted: result.accepted,
        rejected: result.rejected,
        from: gmailUser,
        to: testTo,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('❌ ERROR:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack
    });

    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode
      }
    }, { status: 500 });
  }
}
