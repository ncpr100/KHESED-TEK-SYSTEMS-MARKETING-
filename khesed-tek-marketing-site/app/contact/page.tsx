'use client';
import { useState } from 'react';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackFormSubmission, trackEmailClick, trackWhatsAppClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, FORM_TITLE_TEST } from '@/lib/ab-testing';
import { contactPageSchema, generateBreadcrumbSchema } from '@/lib/seo';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const formTitleVariant = useABTest(FORM_TITLE_TEST);
  const formTitle = getVariantContent(FORM_TITLE_TEST, formTitleVariant);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://www.khesed-tek.com' },
    { name: 'Contacto', url: 'https://www.khesed-tek.com/contact' }
  ]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

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
      trackABTestConversion(FORM_TITLE_TEST.testId, formTitleVariant, 'form_submit');

      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      // Track form submission error
      trackFormSubmission('demo_request', false);
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
            <div className="text-xs uppercase tracking-wide text-[#b9bec7] mb-1">Correo</div>
            <a 
              href="mailto:soporte@khesed-tek.com" 
              className="text-[var(--text)] hover:underline"
              onClick={() => trackEmailClick('contact_page')}
            >
              soporte@khesed-tek.com
            </a>
          </div>
          <div className="card p-5">
            <div className="text-xs uppercase tracking-wide text-[#b9bec7] mb-1">WhatsApp</div>
            <a 
              href="https://wa.me/573021234410" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--text)] hover:underline"
              onClick={() => trackWhatsAppClick('contact_page')}
            >
              +57 302 123 4410
            </a>
          </div>
          <div className="card p-5">
            <div className="text-xs uppercase tracking-wide text-[#b9bec7] mb-1">Ubicación</div>
            <div className="text-[var(--text)]">Barranquilla, Atlántico, Colombia</div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-2">{formTitle}</h2>
          <p className="text-[var(--muted)] mb-6">
            Déjanos tus datos y te contactaremos para una demostración personalizada.
          </p>

          {submitted && (
            <div className="mb-4 p-4 rounded-xl bg-green-900/20 border border-green-700 text-green-200 flex items-start gap-3">
              <span className="text-xl">✓</span>
              <div><strong>¡Gracias!</strong> Hemos recibido tu solicitud. Te contactaremos pronto.</div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-900/20 border border-red-700 text-red-200 flex items-start gap-3">
              <span className="text-xl">⚠</span>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm text-[var(--muted)]">Nombre <span className="text-red-400">*</span></label>
              <input id="name" name="name" required className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm text-[var(--muted)]">Correo <span className="text-red-400">*</span></label>
              <input id="email" name="email" type="email" required className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition" />
            </div>
            <div>
              <label htmlFor="org" className="block mb-1 text-sm text-[var(--muted)]">Iglesia u organización</label>
              <input id="org" name="org" className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition" />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block mb-1 text-sm text-[var(--muted)]">WhatsApp</label>
              <input id="whatsapp" name="whatsapp" type="tel" placeholder="+57 302 123 4410" className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-1 text-sm text-[var(--muted)]">Mensaje</label>
              <textarea id="message" name="message" rows={5} className="w-full rounded-xl bg-transparent border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--brand)] focus:outline-none transition resize-none" placeholder="Cuéntanos tus necesidades, tamaño del equipo, fechas preferidas para la demo, etc." />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input id="wantsDemo" name="wantsDemo" type="checkbox" className="h-4 w-4 rounded accent-[var(--brand)]" defaultChecked />
              <label htmlFor="wantsDemo" className="text-sm text-[var(--muted)]">Quiero una demostración del sistema</label>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" disabled={loading} className="inline-flex items-center font-semibold px-6 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition hover:scale-105" style={{ background: loading ? '#555' : 'linear-gradient(90deg, var(--brand), var(--brand2))', color: '#0b0b0d' }}>
                {loading ? 'Enviando...' : 'Enviar solicitud →'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
