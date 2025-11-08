'use client';
import { useState } from 'react';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackFormSubmission, trackEmailClick, trackWhatsAppClick, trackFunnelStep, trackEngagementMilestone } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, FORM_TITLE_TEST, FORM_TITLE_CONTENT } from '@/lib/ab-testing';
import { contactPageSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { useGlobalMarket } from '@/lib/global-market';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { market, language } = useGlobalMarket();
  
  const formTitleVariant = useABTest(FORM_TITLE_TEST, market);
  const formTitle = getVariantContent(FORM_TITLE_TEST, formTitleVariant, language, FORM_TITLE_CONTENT);

  // Track page view and funnel entry
  useState(() => {
    const geoData = { 
      market, 
      country: market === 'LATAM' ? 'CO' : market === 'USA' ? 'US' : 'GLOBAL', 
      region: market === 'LATAM' ? 'Atlantico' : market === 'USA' ? 'Florida' : 'Global',
      language, 
      timezone: 'America/Bogota' 
    };
    trackFunnelStep('contact_page_view', 1, geoData);
  });

  // Track form interactions
  const handleFormInteraction = (fieldName: string) => {
    const geoData = { 
      market, 
      country: market === 'LATAM' ? 'CO' : market === 'USA' ? 'US' : 'GLOBAL', 
      region: market === 'LATAM' ? 'Atlantico' : market === 'USA' ? 'Florida' : 'Global',
      language, 
      timezone: 'America/Bogota' 
    };
    trackFunnelStep(`form_field_${fieldName}`, 2, geoData);
  };

  // Market-specific contact information
  const getMarketSpecificContact = () => {
    switch (market) {
      case 'USA':
        return {
          email: 'usa@khesed-tek-systems.org',
          whatsapp: '+1 (555) 123-4567',
          location: 'Miami, FL, USA',
          timezone: 'EST/EDT',
          supportHours: '9 AM - 6 PM EST'
        };
      case 'GLOBAL':
        return {
          email: 'global@khesed-tek-systems.org',
          whatsapp: '+57 302 123 4410',
          location: 'Available Worldwide',
          timezone: 'Multiple Timezones',
          supportHours: '24/7 Global Support'
        };
      default: // LATAM
        return {
          email: 'contacto@khesed-tek-systems.org',
          whatsapp: '+57 302 123 4410',
          location: 'Barranquilla, Atlántico, Colombia',
          timezone: 'COT (UTC-5)',
          supportHours: '9 AM - 6 PM COT'
        };
    }
  };

  const contactInfo = getMarketSpecificContact();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://www.khesed-tek-systems.org' },
    { name: 'Contacto', url: 'https://www.khesed-tek-systems.org/contact' }
  ]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    // Track form submission attempt
    const geoData = { 
      market, 
      country: market === 'LATAM' ? 'CO' : market === 'USA' ? 'US' : 'GLOBAL', 
      region: market === 'LATAM' ? 'Atlantico' : market === 'USA' ? 'Florida' : 'Global',
      language, 
      timezone: 'America/Bogota' 
    };
    
    trackFunnelStep('form_submit_attempt', 3, geoData);

    try {
      const res = await fetch('/api/request-demo', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar');
      }

      // Track successful form submission
      trackFormSubmission('demo_request', true);
      trackABTestConversion(FORM_TITLE_TEST.testId, formTitleVariant, 'form_submit', market);
      trackFunnelStep('form_submit_success', 4, geoData);
      trackEngagementMilestone('lead_generated', { 
        leadId: data.leadId, 
        leadScore: data.leadScore,
        market: data.market,
        formType: 'demo_request'
      });

      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      // Track form submission error
      trackFormSubmission('demo_request', false);
      trackFunnelStep('form_submit_error', 3, geoData);
      setError(err.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Contact Page Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-6">Contacto</h1>

        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <div className="card p-5">
            <div className="text-xs uppercase tracking-wide text-[#b9bec7] mb-1">
              {language === 'en' ? 'Email' : 'Correo'}
            </div>
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="text-[var(--text)] hover:underline"
              onClick={() => trackEmailClick('contact_page')}
            >
              {contactInfo.email}
            </a>
          </div>
          <div className="card p-5">
            <div className="text-xs uppercase tracking-wide text-[#b9bec7] mb-1">WhatsApp</div>
            <a 
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--text)] hover:underline"
              onClick={() => trackWhatsAppClick('contact_page')}
            >
              {contactInfo.whatsapp}
            </a>
          </div>
          <div className="card p-5">
            <div className="text-xs uppercase tracking-wide text-[#b9bec7] mb-1">
              {language === 'en' ? 'Location' : 'Ubicación'}
            </div>
            <div className="text-[var(--text)]">{contactInfo.location}</div>
            {contactInfo.supportHours && (
              <div className="text-xs text-[#b9bec7] mt-1">
                {language === 'en' ? 'Support: ' : 'Soporte: '}{contactInfo.supportHours}
              </div>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-2">{formTitle}</h2>
          <p className="text-[var(--muted)] mb-6">
            Déjanos tus datos y te contactaremos para una demostración personalizada.
          </p>

          {submitted && (
            <div className="mb-6 p-6 rounded-xl bg-green-900/20 border border-green-700 text-green-200">
              <div className="flex items-start gap-3 mb-4">
                {/* Outline Check Icon */}
                <div className="text-green-200 w-6 h-6 mt-0.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                </div>
                <div><strong>¡Gracias!</strong> Hemos recibido tu solicitud. Te contactaremos pronto.</div>
              </div>
              
              {/* Calendar Booking CTA */}
              <div className="border-t border-green-700/50 pt-4">
                <p className="text-sm mb-3 text-green-300">
                  <strong>¿Quiere agendar su videollamada ahora?</strong> Reserve directamente en nuestro calendario:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/schedule"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg transition text-sm"
                  >
                    {/* Outline Calendar Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Agendar Videollamada Personal
                  </a>
                  <a
                    href="https://wa.me/573021234410?text=Hola,%20acabo%20de%20enviar%20el%20formulario%20y%20me%20gustaría%20agendar%20una%20videollamada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-green-600 hover:bg-green-600/10 text-green-200 font-semibold px-4 py-2 rounded-lg transition text-sm"
                  >
                    {/* Outline Phone Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    WhatsApp Directo
                  </a>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-900/20 border border-red-700 text-red-200 flex items-start gap-3">
              {/* Outline Alert Triangle Icon */}
              <div className="text-red-200 w-6 h-6 mt-0.5 flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="m12 17 .01 0"></path>
                </svg>
              </div>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">
                {language === 'en' ? 'Contact Information' : 'Información de Contacto'}
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm text-[var(--muted)]">
                    {language === 'en' ? 'Name' : 'Nombre'} <span className="text-red-400">*</span>
                  </label>
                  <input 
                    id="name" 
                    name="name" 
                    required 
                    onFocus={() => handleFormInteraction('name')}
                    className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm text-[var(--muted)]">
                    {language === 'en' ? 'Email' : 'Correo'} <span className="text-red-400">*</span>
                  </label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    onFocus={() => handleFormInteraction('email')}
                    className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition" 
                  />
                </div>
                <div>
                  <label htmlFor="org" className="block mb-1 text-sm text-[var(--muted)]">
                    {language === 'en' ? 'Church/Organization' : 'Iglesia u organización'}
                  </label>
                  <input 
                    id="org" 
                    name="org" 
                    onFocus={() => handleFormInteraction('organization')}
                    className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition" 
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block mb-1 text-sm text-[var(--muted)]">WhatsApp</label>
                  <input 
                    id="whatsapp" 
                    name="whatsapp" 
                    type="tel" 
                    placeholder={language === 'es' ? '+57 XXX XXX XXXX' : '+57 XXX XXX XXXX'} 
                    onFocus={() => handleFormInteraction('whatsapp')}
                    className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition" 
                  />
                </div>
              </div>
            </div>

            {/* Church/Organization Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">
                {language === 'en' ? 'Organization Details' : 'Detalles de la Organización'}
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Church Size */}
                <div>
                  <label htmlFor="churchSize" className="block mb-2 text-sm text-[var(--muted)]">
                    {language === 'en' ? 'Organization Size' : 'Tamaño de la organización'}
                  </label>
                  <select 
                    id="churchSize" 
                    name="churchSize"
                    className="w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition"
                  >
                    <option value="">
                      {language === 'en' ? 'Select size' : 'Selecciona el tamaño'}
                    </option>
                    <option value="small">
                      {language === 'en' ? 'Small (50-200 members)' : 'Pequeña (50-200 miembros)'}
                    </option>
                    <option value="medium">
                      {language === 'en' ? 'Medium (200-1000 members)' : 'Mediana (200-1000 miembros)'}
                    </option>
                    <option value="large">
                      {language === 'en' ? 'Large (1000+ members)' : 'Grande (1000+ miembros)'}
                    </option>
                    <option value="network">
                      {language === 'en' ? 'Multi-campus/Network' : 'Multi-campus/Red de iglesias'}
                    </option>
                  </select>
                </div>

                {/* Current Software */}
                <div>
                  <label htmlFor="currentSoftware" className="block mb-2 text-sm text-[var(--muted)]">
                    {language === 'en' ? 'Current Management System' : 'Sistema actual de gestión'}
                  </label>
                  <select 
                    id="currentSoftware" 
                    name="currentSoftware"
                    className="w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition"
                  >
                    <option value="">
                      {language === 'en' ? 'Select current system' : 'Selecciona sistema actual'}
                    </option>
                    <option value="none">
                      {language === 'en' ? 'No system (Manual processes)' : 'Sin sistema (Procesos manuales)'}
                    </option>
                    <option value="excel">
                      {language === 'en' ? 'Spreadsheets (Excel/Google Sheets)' : 'Hojas de cálculo (Excel/Google Sheets)'}
                    </option>
                    <option value="church-software">
                      {language === 'en' ? 'Church management software' : 'Software de gestión eclesiástica'}
                    </option>
                    <option value="custom">
                      {language === 'en' ? 'Custom/Homegrown solution' : 'Solución personalizada/propia'}
                    </option>
                    <option value="other">
                      {language === 'en' ? 'Other' : 'Otro'}
                    </option>
                  </select>
                </div>

                {/* Implementation Timeline */}
                <div>
                  <label htmlFor="timeline" className="block mb-2 text-sm text-[var(--muted)]">
                    {language === 'en' ? 'Implementation Timeline' : 'Cronograma de implementación'}
                  </label>
                  <select 
                    id="timeline" 
                    name="timeline"
                    className="w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition"
                  >
                    <option value="">
                      {language === 'en' ? 'Select timeline' : 'Selecciona cronograma'}
                    </option>
                    <option value="asap">
                      {language === 'en' ? 'As soon as possible' : 'Lo antes posible'}
                    </option>
                    <option value="1-3-months">
                      {language === 'en' ? '1-3 months' : '1-3 meses'}
                    </option>
                    <option value="3-6-months">
                      {language === 'en' ? '3-6 months' : '3-6 meses'}
                    </option>
                    <option value="6-12-months">
                      {language === 'en' ? '6-12 months' : '6-12 meses'}
                    </option>
                    <option value="planning">
                      {language === 'en' ? 'Just planning/researching' : 'Solo planificando/investigando'}
                    </option>
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="budget" className="block mb-2 text-sm text-[var(--muted)]">
                    {language === 'en' ? 'Monthly Budget Range' : 'Rango de presupuesto mensual'}
                  </label>
                  <select 
                    id="budget" 
                    name="budget"
                    className="w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition"
                  >
                    <option value="">
                      {language === 'en' ? 'Select budget range' : 'Selecciona rango de presupuesto'}
                    </option>
                    <option value="under-150">
                      {language === 'en' ? 'Under $150 USD' : 'Menos de $150 USD'}
                    </option>
                    <option value="150-300">$150 - $300 USD</option>
                    <option value="300-600">$300 - $600 USD</option>
                    <option value="600-1000">$600 - $1000 USD</option>
                    <option value="1000+">
                      {language === 'en' ? '$1000+ USD' : 'Más de $1000 USD'}
                    </option>
                    <option value="tbd">
                      {language === 'en' ? 'To be determined' : 'Por determinar'}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Primary Needs */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[var(--border)] pb-2">
                {language === 'en' ? 'Primary Needs' : 'Necesidades Principales'}
              </h3>
              
              <div>
                <label className="block mb-2 text-sm text-[var(--muted)]">
                  {language === 'en' ? 'Which features are most important? (Select all that apply)' : '¿Qué funciones son más importantes? (Selecciona todas las que apliquen)'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { en: 'Member management', es: 'Gestión de miembros', value: 'members' },
                    { en: 'Online donations', es: 'Donaciones en línea', value: 'donations' },
                    { en: 'Event management', es: 'Gestión de eventos', value: 'events' },
                    { en: 'Communication tools', es: 'Herramientas de comunicación', value: 'communication' },
                    { en: 'Financial reports', es: 'Reportes financieros', value: 'finances' },
                    { en: 'Volunteer management', es: 'Gestión de voluntarios', value: 'volunteers' },
                    { en: 'Multi-campus support', es: 'Soporte multi-campus', value: 'multicampus' },
                    { en: 'Mobile app', es: 'Aplicación móvil', value: 'mobile' },
                    { en: 'Website integration', es: 'Integración web', value: 'website' }
                  ].map((feature) => (
                    <label key={feature.value} className="flex items-center space-x-2 text-sm">
                      <input 
                        type="checkbox" 
                        name="features" 
                        value={feature.value}
                        className="rounded border-[var(--border)] text-[var(--brand)] focus:ring-[var(--brand)] focus:ring-offset-0"
                      />
                      <span>{language === 'en' ? feature.en : feature.es}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Message and Demo Request */}
            <div className="space-y-4">
              <div>
                <label htmlFor="message" className="block mb-2 text-sm text-[var(--muted)]">
                  {language === 'en' ? 'Additional Information' : 'Información Adicional'}
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  onFocus={() => handleFormInteraction('message')}
                  className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition resize-none" 
                  placeholder={language === 'en' 
                    ? "Tell us about specific challenges, special requirements, or questions you have..." 
                    : "Cuéntanos sobre desafíos específicos, requisitos especiales, o preguntas que tengas..."
                  }
                />
              </div>

              <div className="flex items-center gap-3">
                <input id="wantsDemo" name="wantsDemo" type="checkbox" className="h-4 w-4 rounded accent-[var(--brand)]" defaultChecked />
                <label htmlFor="wantsDemo" className="text-sm text-[var(--muted)]">
                  {language === 'en' 
                    ? 'I would like to schedule a personalized demo' 
                    : 'Quiero agendar una demostración personalizada'
                  }
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full inline-flex items-center justify-center font-semibold px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition hover:scale-105" 
                style={{ 
                  background: loading ? '#555' : 'linear-gradient(90deg, var(--brand), var(--brand2))', 
                  color: '#0b0b0d' 
                }}
              >
                {loading 
                  ? (language === 'en' ? 'Sending...' : 'Enviando...') 
                  : (language === 'en' ? 'Send Request →' : 'Enviar solicitud →')
                }
              </button>
              <p className="text-xs text-[var(--muted)] text-center mt-2">
                {language === 'en' 
                  ? 'We typically respond within 2 hours during business hours' 
                  : 'Normalmente respondemos en 2 horas durante horario laboral'
                }
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 py-12">
        {[
          { 
            pill: language === 'en' ? 'Performance' : 'Rendimiento', 
            title: language === 'en' ? 'Fast and efficient' : 'Rápido y eficiente', 
            desc: language === 'en' 
              ? 'Optimized architecture for minimal load times and high availability.' 
              : 'Arquitectura optimizada para tiempos de carga mínimos y alta disponibilidad.' 
          },
          { 
            pill: language === 'en' ? 'Security' : 'Seguridad', 
            title: language === 'en' ? 'Advanced protection' : 'Protección avanzada', 
            desc: language === 'en' 
              ? 'Encryption and best practices to safeguard your community data.' 
              : 'Cifrado y mejores prácticas para resguardar los datos de tu comunidad.' 
          },
          { 
            pill: language === 'en' ? 'Design' : 'Diseño', 
            title: language === 'en' ? 'Elegance and precision' : 'Elegancia y precisión', 
            desc: language === 'en' 
              ? 'Sophisticated professional quality that elevates your church\'s digital presence and reflects ministry excellence.' 
              : 'Calidad profesional sofisticada que eleva la presencia digital de tu iglesia y refleja la excelencia ministerial.' 
          },
        ].map((f) => (
          <div className="card p-6 hover:-translate-y-1 transition" key={f.title}>
            <span
              className="text-xs uppercase tracking-wide px-2 py-1 rounded-full border inline-block"
              style={{ background: '#1f1f23', borderColor: 'var(--border)', color: 'var(--muted)' }}
            >
              {f.pill}
            </span>
            <h3 className="text-xl font-semibold mt-3 mb-1">{f.title}</h3>
            <p style={{ color: 'var(--muted)' }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6">
          {language === 'en' ? 'About KHESED-TEK SYSTEMS' : 'Sobre KHESED-TEK SYSTEMS'}
        </h2>
        <div style={{ color: 'var(--muted)' }} className="text-lg space-y-4">
          {language === 'en' ? (
            <>
              <p>
                KHESED-TEK SYSTEMS is an innovative software and automation company dedicated to serving the Christian community. 
                Based in Barranquilla, Atlántico, we empower churches and faith-based organizations through custom artificial 
                intelligence and integration solutions that address their unique operational challenges.
              </p>
              <p>
                We understand that your mission is spiritual, but your operations are practical. Our goal is to optimize your 
                administrative tasks, improve resource allocation, and enhance productivity. By handling the complexities 
                of technology, we free your team to focus on what matters most: serving your congregation and strengthening your community.
              </p>
              <p className="font-medium text-[var(--brand)]">
                Let us build the technological foundation that supports and amplifies your impact.
              </p>
            </>
          ) : (
            <>
              <p>
                KHESED-TEK SYSTEMS es una empresa innovadora de software y automatización dedicada a servir a la comunidad cristiana. 
                Con sede en Barranquilla, Atlántico, empoderamos a iglesias y organizaciones basadas en la fe mediante el diseño de 
                soluciones personalizadas de inteligencia artificial e integración que abordan sus desafíos operacionales únicos.
              </p>
              <p>
                Entendemos que su misión es espiritual, pero sus operaciones son prácticas. Nuestro objetivo es optimizar sus 
                tareas administrativas, mejorar la asignación de recursos y potenciar la productividad. Al manejar las complejidades 
                de la tecnología, liberamos a su equipo para enfocarse en lo que más importa: servir a su congregación y fortalecer su comunidad.
              </p>
              <p className="font-medium text-[var(--brand)]">
                Permítanos construir la base tecnológica que respalda y amplifica su impacto.
              </p>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
