'use client';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, HERO_HEADLINE_TEST, CTA_BUTTON_TEST } from '@/lib/ab-testing';

export default function HomePage() {
  const heroVariant = useABTest(HERO_HEADLINE_TEST);
  const ctaVariant = useABTest(CTA_BUTTON_TEST);
  
  const heroText = getVariantContent(HERO_HEADLINE_TEST, heroVariant);
  const ctaText = getVariantContent(CTA_BUTTON_TEST, ctaVariant);

  const handleCTAClick = () => {
    trackCTAClick('hero_section', ctaText);
    trackABTestConversion(CTA_BUTTON_TEST.testId, ctaVariant, 'cta_click');
  };

  return (
    <main className="min-h-screen">
      <Header />

      <section
        className="relative overflow-hidden text-center px-6 py-24"
        style={{
          background:
            'radial-gradient(1200px 400px at 10% -10%, rgba(110,231,255,.07), transparent 60%), radial-gradient(900px 300px at 90% -20%, rgba(139,92,246,.08), transparent 55%), var(--bg)',
        }}
      >
        <h1 className="text-4xl sm:text-6xl font-bold mb-3 gradient-text">
          {heroText}
        </h1>
        <p className="max-w-3xl mx-auto text-lg mb-6" style={{ color: 'var(--muted)' }}>
          Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition"
          onClick={handleCTAClick}
        >
          {ctaText}
        </a>
      </section>

      <section id="features" className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 py-12">
        {[
          { pill: 'Rendimiento', title: 'Rápido y eficiente', desc: 'Arquitectura optimizada para tiempos de carga mínimos y alta disponibilidad.' },
          { pill: 'Seguridad', title: 'Protección avanzada', desc: 'Cifrado y mejores prácticas para resguardar los datos de tu comunidad.' },
          { pill: 'Diseño', title: 'Elegancia en negro', desc: 'Interfaz oscura, limpia y accesible que resalta tu identidad.' },
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

      <section id="about" className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-2">Sobre KHESED-TEK SYSTEMS</h2>
        <p style={{ color: 'var(--muted)' }}>
          Creamos herramientas digitales para servir a iglesias y organizaciones con excelencia, integridad e innovación.
        </p>
      </section>

      <Footer />
    </main>
  );
}
