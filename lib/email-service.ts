// Market-aware email service for KHESED-TEK SYSTEMS
import { Resend } from 'resend';

export type Market = 'LATAM' | 'USA' | 'GLOBAL';

interface MarketConfig {
  from: string;
  to: string;
  language: 'es' | 'en';
  timezone: string;
  currency: string;
}

// Market-specific email configuration
const MARKET_EMAIL_CONFIG: Record<Market, MarketConfig> = {
  LATAM: {
    from: 'KHESED-TEK SYSTEMS <soporte@khesed-tek.com>',
    to: process.env.CONTACT_EMAIL_LATAM || 'soporte@khesed-tek.com',
    language: 'es',
    timezone: 'America/Bogota',
    currency: 'COP'
  },
  USA: {
    from: 'KHESED-TEK SYSTEMS <usa@khesed-tek.com>',
    to: process.env.CONTACT_EMAIL_USA || 'usa@khesed-tek.com',
    language: 'en',
    timezone: 'America/New_York',
    currency: 'USD'
  },
  GLOBAL: {
    from: 'KHESED-TEK SYSTEMS <global@khesed-tek.com>',
    to: process.env.CONTACT_EMAIL_GLOBAL || 'global@khesed-tek.com',
    language: 'en',
    timezone: 'UTC',
    currency: 'USD'
  }
};

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

Message:
${data.message || 'No message'}

Received: ${new Date(data.receivedAt).toLocaleString('en-US', { 
  timeZone: data.market === 'USA' ? 'America/New_York' : 'UTC' 
})}
${data.priority?.level === 'high' ? '\n🔥 HIGH PRIORITY LEAD - Contact immediately' : ''}
      `.trim()
    }
  }
};

// Lazy-load Resend to avoid build-time API key requirement
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Determine market from various inputs
export function detectMarketFromEmail(email: string, formData?: any): Market {
  // USA domains
  const usaDomains = ['.com', '.org', '.net', '.edu', '.gov'];
  const emailDomain = email.split('@')[1]?.toLowerCase();
  
  if (emailDomain?.endsWith('.us') || 
      (formData?.whatsapp && formData.whatsapp.includes('+1'))) {
    return 'USA';
  }
  
  // Colombian domains or phone
  if (emailDomain?.endsWith('.co') || emailDomain?.includes('colombia') ||
      (formData?.whatsapp && formData.whatsapp.includes('+57'))) {
    return 'LATAM';
  }
  
  // European or other international indicators
  if (emailDomain?.match(/\.(eu|de|fr|uk|au|ca|mx|br)$/)) {
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
  wantsDemo: boolean;
  receivedAt: string;
  market?: Market;
  leadId?: string;
  leadScore?: number;
  priority?: { level: string; label: string };
}

export async function sendMarketAwareEmail(
  emailData: EmailData,
  templateType: keyof typeof EMAIL_TEMPLATES = 'demo_request'
): Promise<{ success: boolean; data?: any; error?: any; market: Market }> {
  
  const market = emailData.market || detectMarketFromEmail(emailData.email, emailData);
  const config = MARKET_EMAIL_CONFIG[market];
  const template = EMAIL_TEMPLATES[templateType][config.language];
  
  const resend = getResend();
  if (!resend) {
    console.log('⚠️  Resend not configured - email notification skipped');
    console.log('💡 To enable emails: Set RESEND_API_KEY in .env.local');
    return { success: false, error: 'Resend not configured', market };
  }

  try {
    const isPriority = emailData.priority?.level === 'high';
    const subject = template.subject(isPriority, emailData.name);
    const body = template.body({
      ...emailData,
      market: market,
      priority: emailData.priority
    });

    // Use verified domain if available, fallback to resend.dev
    const fromAddress = process.env.RESEND_DOMAIN 
      ? config.from 
      : `KHESED-TEK SYSTEMS Demo <onboarding@resend.dev>`;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: config.to,
      reply_to: emailData.email,
      subject,
      text: body,
      headers: {
        'X-Market': market,
        'X-Lead-Score': emailData.leadScore?.toString() || '0',
        'X-Priority': emailData.priority?.level || 'normal'
      }
    });

    if (error) {
      console.error(`❌ Email failed for ${market} market:`, error);
      return { success: false, error, market };
    }

    console.log(`✅ Email sent successfully to ${market} market:`, data?.id);
    return { success: true, data, market };

  } catch (emailError) {
    console.error(`Email sending failed for ${market} market:`, emailError);
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
  const hasApiKey = !!process.env.RESEND_API_KEY;
  const hasTargetEmail = !!config.to;
  
  return hasApiKey && hasTargetEmail;
}

// Get all configured markets
export function getConfiguredMarkets(): Market[] {
  return Object.keys(MARKET_EMAIL_CONFIG) as Market[];
}

export { MARKET_EMAIL_CONFIG };