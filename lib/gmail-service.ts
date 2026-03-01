// Google SMTP email service for KHESED-TEK SYSTEMS
import * as nodemailer from 'nodemailer';

export type Market = 'LATAM' | 'USA' | 'GLOBAL';

interface MarketConfig {
  from: string;
  to: string;
  language: 'es' | 'en';
  timezone: string;
  currency: string;
}

// Market-specific email configuration using Google Workspace
const MARKET_EMAIL_CONFIG = {
  'LATAM': {
    from: 'contacto@khesed-tek-systems.org',
    to: process.env.CONTACT_EMAIL_LATAM || 'contacto@khesed-tek-systems.org',
    name: 'LATAM',
    timezone: 'America/Bogota',
    language: 'es',
    currency: 'USD'
  },
  
  'USA': {
    from: 'contact@khesed-tek-systems.org',
    to: process.env.CONTACT_EMAIL_USA || 'contact@khesed-tek-systems.org',
    name: 'USA',
    timezone: 'America/New_York',
    language: 'en',
    currency: 'USD'
  },
  
  'GLOBAL': {
    from: 'global@khesed-tek-systems.org',
    to: process.env.CONTACT_EMAIL_GLOBAL || 'global@khesed-tek-systems.org',
    name: 'GLOBAL',
    timezone: 'UTC',
    language: 'en',
    currency: 'USD'
  }
} as const;

// Multi-language email templates
const EMAIL_TEMPLATES = {
  demo_request: {
    es: {
      subject: (prioritary: boolean, name: string) => 
        `${prioritary ? '🔥 PRIORITARIO - ' : ''}Nueva solicitud de demo - ${name}`,
      body: (data: any) => `
Nueva solicitud de demo - KHESED-TEK SYSTEMS
${data.leadId ? `\n🆔 CRM ID: ${data.leadId}` : ''}
${data.leadScore ? `📊 Puntuación Lead: ${data.leadScore}/100 (${data.priority?.label})` : ''}

👤 Nombre: ${data.name}
📧 Correo: ${data.email}
🏢 Organización: ${data.org || 'No especificada'}
📱 WhatsApp: ${data.whatsapp || 'No especificado'}
🎯 Quiere demo: ${data.wantsDemo ? 'Sí' : 'No'}
🌍 Mercado: ${data.market}

📊 DETALLES DE LA ORGANIZACIÓN:
${data.churchSize ? `• Tamaño: ${data.churchSize}` : ''}
${data.currentSoftware ? `• Sistema actual: ${data.currentSoftware}` : ''}
${data.timeline ? `• Cronograma: ${data.timeline}` : ''}
${data.budget ? `• Presupuesto: ${data.budget}` : ''}
${data.features && data.features.length > 0 ? `\n🎯 Funciones prioritarias:\n${data.features.map((f: string) => `  • ${f}`).join('\n')}` : ''}

Mensaje:
${data.message || 'Sin mensaje'}

Recibido: ${new Date(data.receivedAt).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
${data.priority?.level === 'high' ? '\n🔥 LEAD PRIORITARIO - Contactar inmediatamente' : ''}
      `.trim()
    },
    en: {
      subject: (prioritary: boolean, name: string) => 
        `${prioritary ? '🔥 HIGH PRIORITY - ' : ''}New demo request - ${name}`,
      body: (data: any) => `
New demo request - KHESED-TEK SYSTEMS
${data.leadId ? `\n🆔 CRM ID: ${data.leadId}` : ''}
${data.leadScore ? `📊 Lead Score: ${data.leadScore}/100 (${data.priority?.label})` : ''}

👤 Name: ${data.name}
📧 Email: ${data.email}
🏢 Organization: ${data.org || 'Not specified'}
📱 WhatsApp: ${data.whatsapp || 'Not specified'}
🎯 Wants demo: ${data.wantsDemo ? 'Yes' : 'No'}
🌍 Market: ${data.market}

📊 ORGANIZATION DETAILS:
${data.churchSize ? `• Size: ${data.churchSize}` : ''}
${data.currentSoftware ? `• Current system: ${data.currentSoftware}` : ''}
${data.timeline ? `• Timeline: ${data.timeline}` : ''}
${data.budget ? `• Budget: ${data.budget}` : ''}
${data.features && data.features.length > 0 ? `\n🎯 Priority features:\n${data.features.map((f: string) => `  • ${f}`).join('\n')}` : ''}

Message:
${data.message || 'No message'}

Received: ${new Date(data.receivedAt).toLocaleString('en-US', { 
  timeZone: data.market === 'USA' ? 'America/New_York' : 'UTC' 
})}
${data.priority?.level === 'high' ? '\n🔥 HIGH PRIORITY LEAD - Contact immediately' : ''}
      `.trim()
    }
  },
  customer_confirmation: {
    es: {
      subject: (name: string) => `Gracias por contactarnos, ${name}`,
      body: (data: any) => `
Hola ${data.name},

¡Gracias por contactar a KHESED-TEK SYSTEMS!

Hemos recibido tu solicitud${data.wantsDemo ? ' de demostración' : ''} y nos pondremos en contacto contigo muy pronto.

📧 Tu información:
• Nombre: ${data.name}
• Email: ${data.email}
• Organización: ${data.org || 'No especificada'}
${data.whatsapp ? `• WhatsApp: ${data.whatsapp}` : ''}

${data.message ? `Tu mensaje:\n"${data.message}"\n` : ''}
Nuestro equipo revisará tu solicitud y te responderá dentro de las próximas 24 horas.

${data.wantsDemo ? '🎯 Tu demostración será programada pronto. Te enviaremos un enlace de calendario para que elijas el horario que mejor te convenga.\n' : ''}
Mientras tanto, puedes:
• Visitar nuestro sitio web: https://www.khesed-tek-systems.org
• Conocer nuestros servicios: https://www.khesed-tek-systems.org/latam
• Leer testimonios de clientes: https://www.khesed-tek-systems.org/latam#testimonials

¿Tienes alguna pregunta urgente? Contáctanos:
📱 WhatsApp: +57 300 123 4567
📧 Email: contacto@khesed-tek-systems.org

¡Bendiciones!

El equipo de KHESED-TEK SYSTEMS
Soluciones tecnológicas para iglesias y organizaciones religiosas
      `.trim()
    },
    en: {
      subject: (name: string) => `Thank you for contacting us, ${name}`,
      body: (data: any) => `
Hello ${data.name},

Thank you for contacting KHESED-TEK SYSTEMS!

We have received your ${data.wantsDemo ? 'demo ' : ''}request and will get back to you very soon.

📧 Your information:
• Name: ${data.name}
• Email: ${data.email}
• Organization: ${data.org || 'Not specified'}
${data.whatsapp ? `• WhatsApp: ${data.whatsapp}` : ''}

${data.message ? `Your message:\n"${data.message}"\n` : ''}
Our team will review your request and respond within the next 24 hours.

${data.wantsDemo ? '🎯 Your demo will be scheduled soon. We\'ll send you a calendar link to choose a time that works best for you.\n' : ''}
In the meantime, you can:
• Visit our website: https://www.khesed-tek-systems.org
• Learn about our services: https://www.khesed-tek-systems.org/usa
• Read client testimonials: https://www.khesed-tek-systems.org/usa#testimonials

Have an urgent question? Contact us:
📱 Phone: +1 (555) 123-4567
📧 Email: contact@khesed-tek-systems.org

Blessings!

The KHESED-TEK SYSTEMS Team
Technology solutions for churches and religious organizations
      `.trim()
    }
  }
} as const;

// Create Gmail SMTP transporter
function createGmailTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('⚠️  Gmail SMTP not configured - email notification skipped');
    console.log('💡 To enable emails: Set GMAIL_USER and GMAIL_APP_PASSWORD in environment variables');
    return null;
  }

  const appPassword = process.env.GMAIL_APP_PASSWORD.replace(/\s/g, ''); // Remove any spaces
  
  console.log('🔧 Creating Gmail transporter for:', process.env.GMAIL_USER);
  console.log('📝 App password length:', appPassword.length);

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // your-email@khesed-tek-systems.org
      pass: appPassword // App-specific password from Google (16 chars, no spaces)
    },
    secure: true,
    port: 465,
    debug: true, // Enable debug logging to troubleshoot delivery issues
    logger: true // Enable logging to see SMTP conversation
  });
}

// Determine market from various inputs
export function detectMarketFromEmail(email: string, formData?: any): Market {
  // USA domains
  const emailDomain = email.split('@')[1]?.toLowerCase();
  
  if (emailDomain?.endsWith('.us') || 
      emailDomain?.endsWith('.org') ||  // US organizations typically use .org
      emailDomain?.includes('church') ||  // Church domains indicate US market
      (formData?.whatsapp && formData.whatsapp.includes('+1'))) {
    return 'USA';
  }
  
  // Colombian domains or phone
  if (emailDomain?.endsWith('.co') || emailDomain?.includes('colombia') ||
      (formData?.whatsapp && formData.whatsapp.includes('+57'))) {
    return 'LATAM';
  }
  
  // European or other international indicators  
  if (emailDomain?.match(/\.(eu|de|fr|uk|au|ca|mx|br|com)$/)) {  // Added .com for global
    return 'GLOBAL';
  }
  
  // Default based on content language or fallback to LATAM
  if (formData?.language === 'en') {
    return 'GLOBAL';
  }
  
  return 'LATAM'; // Default market
}

interface EmailData {
  name: string;
  email: string;
  org?: string;
  whatsapp?: string;
  message?: string;
  wantsDemo: boolean;  // Organization details
  churchSize?: string;
  currentSoftware?: string;
  timeline?: string;
  budget?: string;
  features?: string[];  receivedAt: string;
  market?: Market;
  leadId?: string;
  leadScore?: number;
  priority?: { 
    level: 'high' | 'medium' | 'low';
    label: string;
    color: string;
    marketContext: string;
    recommendedActions: string[];
  };
}

export async function sendMarketAwareEmail(
  emailData: EmailData,
  templateType: keyof typeof EMAIL_TEMPLATES = 'demo_request'
): Promise<{ success: boolean; data?: any; error?: any; market: Market; details?: any }> {
  
  const market = emailData.market || detectMarketFromEmail(emailData.email, emailData);
  const config = MARKET_EMAIL_CONFIG[market];
  const template = EMAIL_TEMPLATES[templateType][config.language as 'es' | 'en'];
  
  const transporter = createGmailTransporter();
  if (!transporter) {
    return { success: false, error: 'Gmail SMTP not configured', market };
  }

  // Verify SMTP connection
  try {
    await transporter.verify();
    console.log('✅ Gmail SMTP connection verified');
  } catch (verifyError) {
    console.error('❌ Gmail SMTP connection failed:', verifyError);
    return { 
      success: false, 
      error: 'Gmail SMTP authentication failed. Check GMAIL_USER and GMAIL_APP_PASSWORD.',
      details: verifyError,
      market 
    };
  }

  try {
    const isPriority = emailData.priority?.level === 'high';
    
    // Generate subject based on template type
    const subject = templateType === 'demo_request' 
      ? (template as any).subject(isPriority, emailData.name)
      : (template as any).subject(emailData.name);
      
    const body = template.body({
      ...emailData,
      market: market,
      priority: emailData.priority
    });

    const mailOptions = {
      from: `KHESED-TEK SYSTEMS <${process.env.GMAIL_USER}>`, // Use GMAIL_USER directly
      to: config.to,
      replyTo: emailData.email,
      subject,
      text: body,
      headers: {
        'X-Market': market,
        'X-Lead-Score': emailData.leadScore?.toString() || '0',
        'X-Priority': emailData.priority?.level || 'normal'
      }
    };

    console.log('📧 Attempting to send email:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      market: market
    });

    const result = await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully to ${market} market via Gmail:`, result.messageId);
    console.log('📋 Full SMTP response:', JSON.stringify(result, null, 2));
    
    // Check if email was actually accepted
    if (result.rejected && result.rejected.length > 0) {
      console.error('⚠️ Some recipients were rejected:', result.rejected);
      return { 
        success: false, 
        error: `Recipients rejected: ${result.rejected.join(', ')}`,
        market,
        details: result
      };
    }
    
    return { success: true, data: { id: result.messageId, response: result.response }, market };

  } catch (emailError) {
    console.error(`❌ Email sending failed for ${market} market:`, {
      error: emailError instanceof Error ? emailError.message : emailError,
      stack: emailError instanceof Error ? emailError.stack : undefined,
      config: {
        hasGmailUser: !!process.env.GMAIL_USER,
        hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
        targetEmail: config.to,
        market: market
      }
    });
    return { 
      success: false, 
      error: emailError instanceof Error ? emailError.message : 'Unknown error',
      market,
      details: emailError
    };
  }
}

// Send customer confirmation email
export async function sendCustomerConfirmation(
  emailData: EmailData
): Promise<{ success: boolean; data?: any; error?: any; market: Market }> {
  
  const market = emailData.market || detectMarketFromEmail(emailData.email, emailData);
  const config = MARKET_EMAIL_CONFIG[market];
  const template = EMAIL_TEMPLATES['customer_confirmation'][config.language as 'es' | 'en'];
  
  const transporter = createGmailTransporter();
  if (!transporter) {
    return { success: false, error: 'Gmail SMTP not configured', market };
  }

  try {
    const subject = template.subject(emailData.name);
    const body = template.body({
      ...emailData,
      market: market
    });

    const mailOptions = {
      from: `KHESED-TEK SYSTEMS <${process.env.GMAIL_USER}>`,
      to: emailData.email, // Send to customer
      replyTo: config.to, // Reply goes to internal team
      subject,
      text: body,
      headers: {
        'X-Market': market,
        'X-Email-Type': 'customer_confirmation'
      }
    };

    console.log('📧 Sending customer confirmation email:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      market: market
    });

    const result = await transporter.sendMail(mailOptions);

    console.log(`✅ Customer confirmation sent to ${emailData.email}:`, result.messageId);
    
    if (result.rejected && result.rejected.length > 0) {
      console.error('⚠️ Customer email rejected:', result.rejected);
      return { 
        success: false, 
        error: `Recipient rejected: ${result.rejected.join(', ')}`,
        market
      };
    }
    
    return { success: true, data: { id: result.messageId }, market };

  } catch (emailError) {
    console.error(`❌ Customer confirmation failed:`, emailError);
    return { 
      success: false, 
      error: emailError instanceof Error ? emailError.message : 'Unknown error',
      market
    };
  }
}

// Get market-specific configuration
export function getMarketConfig(market: Market): MarketConfig {
  return MARKET_EMAIL_CONFIG[market];
}

// Validate email configuration for a market
export function validateMarketEmailConfig(market: Market): boolean {
  const config = MARKET_EMAIL_CONFIG[market];
  const hasGmailConfig = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
  const hasTargetEmail = !!config.to;
  
  return hasGmailConfig && hasTargetEmail;
}

// Get all configured markets
export function getConfiguredMarkets(): Market[] {
  return Object.keys(MARKET_EMAIL_CONFIG) as Market[];
}

export { MARKET_EMAIL_CONFIG };