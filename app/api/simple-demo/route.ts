import { NextRequest } from 'next/server';
import { sendMarketAwareEmail, detectMarketFromEmail } from '@/lib/gmail-service';

// Simplified demo request handler - focuses ONLY on email sending
export async function POST(request: NextRequest) {
  try {
    console.log('🟢 Simple demo request started');
    
    // Parse form data
    const formData = await request.formData();
    console.log('✅ Form data parsed successfully');
    
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      org: String(formData.get('org') || '').trim(),
      whatsapp: String(formData.get('whatsapp') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      wantsDemo: !!formData.get('wantsDemo'),
      receivedAt: new Date().toISOString(),
    };

    console.log('📋 Payload created:', { name: payload.name, email: payload.email, org: payload.org });

    // Validate required fields
    if (!payload.name || !payload.email) {
      console.log('❌ Validation failed: missing name or email');
      return Response.json(
        { ok: false, error: 'Nombre y correo son obligatorios.' }, 
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      console.log('❌ Validation failed: invalid email format');
      return Response.json(
        { ok: false, error: 'Correo electrónico inválido.' }, 
        { status: 400 }
      );
    }

    console.log('✅ Validation passed');

    // Detect market
    const market = detectMarketFromEmail(payload.email, payload);
    console.log('🌍 Market detected:', market);

    // Send email notification
    console.log('📧 Attempting to send email...');
    const emailResult = await sendMarketAwareEmail({
      ...payload,
      market
    });

    console.log('📬 Email result:', emailResult);

    if (emailResult.success) {
      console.log('✅ Email sent successfully!');
      return Response.json({ 
        ok: true, 
        message: 'Solicitud enviada exitosamente',
        emailId: emailResult.data?.id,
        market
      });
    } else {
      console.error('❌ Email failed:', emailResult.error);
      return Response.json(
        { 
          ok: false, 
          error: 'Error al enviar el correo', 
          details: emailResult.error 
        }, 
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('💥 Unexpected error in simple-demo:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    return Response.json(
      { 
        ok: false, 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}
