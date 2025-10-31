'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, HERO_HEADLINE_TEST, HERO_HEADLINE_CONTENT, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';

export default function HomePage() {
  const router = useRouter();
  const { market, language, isLoading, geoData } = useGlobalMarket();
  
  // Redirect to market-specific page based on user location
  useEffect(() => {
    if (!isLoading && geoData && market) {
      const marketPath = market.toLowerCase();
      
      // Small delay to ensure proper loading
      setTimeout(() => {
        router.push(`/${marketPath}`);
      }, 500);
    }
  }, [isLoading, geoData, market, router]);
  
  const heroVariant = useABTest(HERO_HEADLINE_TEST, market);
  const ctaVariant = useABTest(CTA_BUTTON_TEST, market);
  
  const heroText = getVariantContent(HERO_HEADLINE_TEST, heroVariant, language, HERO_HEADLINE_CONTENT);
  const ctaText = getVariantContent(CTA_BUTTON_TEST, ctaVariant, language, CTA_BUTTON_CONTENT);

  const handleCTAClick = () => {
    trackCTAClick('hero_section', ctaText);
    trackABTestConversion(CTA_BUTTON_TEST.testId, ctaVariant, 'cta_click', market);
  };

  // Show loading state while determining market
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Detectando tu ubicación...</p>
          <p className="text-sm text-gray-500">Detecting your location...</p>
        </div>
      </main>
    );
  }

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
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text leading-tight hero-heading">
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
        <h2 className="text-3xl font-semibold mb-6">Sobre KHESED-TEK SYSTEMS</h2>
        <div style={{ color: 'var(--muted)' }} className="text-lg space-y-4">
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
