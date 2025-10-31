'use client';
import { useState } from 'react';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick, trackServiceView } from '@/lib/analytics';
import AnimatedPricingCard from '@/components/pricing/animated-pricing-card';
import FeatureComparisonTable from '@/components/pricing/feature-comparison';
import LocalizedPriceDisplay from '@/components/pricing/currency-localization';
import { PricingPlan } from '@/types/pricing';
import { useABTest, getVariantContent, trackABTestConversion, HERO_HEADLINE_TEST, HERO_HEADLINE_CONTENT, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';
import TestimonialsSection from '@/components/social-proof/testimonials-section';
import TrustSignalsSection, { TrustBadges } from '@/components/social-proof/trust-signals';
import ROICalculator from '@/components/conversion/roi-calculator';
import DemoVideoSection from '@/components/conversion/demo-video-section';

export default function LatamMarketPage() {
  const { market, language } = useGlobalMarket();
  
  const heroVariant = useABTest(HERO_HEADLINE_TEST, 'LATAM');
  const ctaVariant = useABTest(CTA_BUTTON_TEST, 'LATAM');
  
  const heroText = getVariantContent(HERO_HEADLINE_TEST, heroVariant, 'es', HERO_HEADLINE_CONTENT);
  const ctaText = getVariantContent(CTA_BUTTON_TEST, ctaVariant, 'es', CTA_BUTTON_CONTENT);

  const handleCTAClick = () => {
    trackCTAClick('latam_hero_section', ctaText);
    trackABTestConversion(CTA_BUTTON_TEST.testId, ctaVariant, 'cta_click', 'LATAM');
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* LATAM-Specific Hero Section */}
      <section
        className="relative overflow-hidden text-center px-6 py-24"
        style={{
          background:
            'radial-gradient(1200px 400px at 10% -10%, rgba(110,231,255,.07), transparent 60%), radial-gradient(900px 300px at 90% -20%, rgba(139,92,246,.08), transparent 55%), var(--bg)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-sm uppercase tracking-wide text-[var(--brand)] mb-4">
            🇨🇴 Mercado LATAM - Especialistas en Colombia
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text leading-tight hero-heading">
            {heroText}
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-6" style={{ color: 'var(--muted)' }}>
            KHESED-TEK SYSTEMS presenta KHESED-TEK-CMS: nuestro sistema de gestión integral 
            diseñado específicamente para iglesias colombianas. Más de 50 congregaciones en 
            Barranquilla ya confían en nuestra solución.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition"
              onClick={handleCTAClick}
            >
              {ctaText}
            </a>
            <a
              href="https://wa.me/573021234410"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition"
              onClick={() => trackCTAClick('latam_whatsapp', 'WhatsApp directo')}
            >
              ▣ WhatsApp directo
            </a>
          </div>
          <div className="text-sm text-[var(--muted)]">
            ● Soporte en horario colombiano (COT) • ◆ Atención en español • ▣ Especialistas en iglesias
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <DemoVideoSection 
        market="LATAM" 
        language="es" 
        className="bg-[var(--surface)]"
      />

      {/* Trust Signals */}
      <TrustSignalsSection className="bg-[var(--bg)]" />

      {/* LATAM-Specific Features */}
      <section id="features" className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 py-12">
        {[
          { 
            pill: 'WhatsApp', 
            title: 'Integración nativa con WhatsApp', 
            desc: 'Conecta directamente con tu congregación a través de la plataforma favorita en Colombia.',
            icon: '▣'
          },
          { 
            pill: 'Pagos Locales', 
            title: 'Diezmos y ofrendas en COP', 
            desc: 'PSE, Bancolombia, Efecty y transferencias locales para facilitar las donaciones.',
            icon: '◆'
          },
          { 
            pill: 'Soporte Local', 
            title: 'Equipo en Barranquilla', 
            desc: 'Atención personalizada en tu zona horaria con comprensión de la cultura local.',
            icon: '●'
          },
          { 
            pill: 'Eventos', 
            title: 'Gestión de cultos y actividades', 
            desc: 'Organiza servicios, células, retiros y eventos especiales de manera eficiente.',
            icon: '◗'
          },
          { 
            pill: 'Membresía', 
            title: 'Base de datos de miembros', 
            desc: 'Registro completo de congregación con historial de participación y crecimiento.',
            icon: '◉'
          },
          { 
            pill: 'Multimedia', 
            title: 'Transmisiones en vivo', 
            desc: 'Streaming integrado para cultos virtuales y alcance de nuevas audiencias.',
            icon: '▢'
          },
        ].map((f) => (
          <div className="card p-6 hover:-translate-y-1 transition" key={f.title}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{f.icon}</span>
              <span
                className="text-xs uppercase tracking-wide px-2 py-1 rounded-full border inline-block"
                style={{ background: '#1f1f23', borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                {f.pill}
              </span>
            </div>
            <h3 className="text-xl font-semibold mt-3 mb-1">{f.title}</h3>
            <p style={{ color: 'var(--muted)' }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Colombian Church Success Stories */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Iglesias que ya confían en nosotros</h2>
          <p style={{ color: 'var(--muted)' }}>
            Casos de éxito reales en el territorio colombiano
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              church: "Iglesia Central Barranquilla",
              location: "Barranquilla, Atlántico", 
              members: "1,200+ miembros",
              result: "500% aumento en participación digital",
              quote: "KHESED-TEK transformó nuestra manera de conectar con la congregación.",
              pastor: "Pastor Miguel Rodríguez"
            },
            {
              church: "Ministerio Cristiano Vida",
              location: "Soledad, Atlántico",
              members: "800+ miembros", 
              result: "300% mejora en gestión de diezmos",
              quote: "La plataforma simplificó completamente nuestra administración.",
              pastor: "Pastora Ana Martínez"
            },
            {
              church: "Chiesa Evangelica",
              location: "Malambo, Atlántico",
              members: "500+ miembros",
              result: "200% crecimiento en nuevos miembros", 
              quote: "El sistema nos permitió expandir nuestro alcance ministerial.",
              pastor: "Pastor Carlos Ruiz"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="card p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-lg">{testimonial.church}</h4>
                <div className="text-sm text-[var(--muted)] mb-2">
                  ▪ {testimonial.location} • ◉ {testimonial.members}
                </div>
                <div className="text-sm font-medium text-[var(--brand)]">
                  📈 {testimonial.result}
                </div>
              </div>
              <blockquote className="italic text-[var(--muted)] mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-sm">
                — {testimonial.pastor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATAM Pricing Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Planes adaptados al mercado colombiano</h2>
          <p className="text-[var(--muted)] mb-4">
            Precios justos con métodos de pago locales y soporte en español
          </p>
          <div className="text-sm text-[var(--muted)]">
            <LocalizedPriceDisplay basePrice={149.99} showEstimates={true} />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              id: "small",
              name: "Iglesia Pequeña",
              price: "$149.99 USD",
              period: "/mes",
              members: "Hasta 200 miembros",
              features: ["Gestión básica de miembros", "WhatsApp integrado", "Soporte en español", "Pagos PSE"],
              ctaText: "Comenzar gratis",
              ctaUrl: "/contact?plan=small"
            },
            {
              id: "medium",
              name: "Iglesia Mediana", 
              price: "$299.99 USD",
              period: "/mes",
              members: "Hasta 1,000 miembros",
              features: ["Todo lo anterior", "Eventos y actividades", "Reportes avanzados", "Transmisiones en vivo"],
              popular: true,
              ctaText: "Más popular",
              ctaUrl: "/contact?plan=medium"
            },
            {
              id: "large",
              name: "Iglesia Grande",
              price: "$599.99 USD", 
              period: "/mes",
              members: "Miembros ilimitados",
              features: ["Todo lo anterior", "Multi-campus", "API personalizada", "Soporte prioritario"],
              ctaText: "Solicitar demo",
              ctaUrl: "/contact?plan=large"
            }
          ].map((plan, idx) => (
            <AnimatedPricingCard
              key={plan.id}
              plan={plan as PricingPlan}
              index={idx}
              onSelect={(planId) => trackCTAClick('latam_pricing', `Plan ${planId}`)}
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <FeatureComparisonTable 
          plans={[
            { id: "small", name: "Iglesia Pequeña", price: "$149.99", period: "/mes", members: "200", features: [] },
            { id: "medium", name: "Iglesia Mediana", price: "$299.99", period: "/mes", members: "1,000", features: [], popular: true },
            { id: "large", name: "Iglesia Grande", price: "$599.99", period: "/mes", members: "Ilimitado", features: [] }
          ]}
          language="es"
          className="mt-16"
        />

        <div className="text-sm text-[var(--muted)] text-center mt-8">
          ◆ Acepta PSE, Bancolombia, Efecty y transferencias • ● Soporte telefónico incluido
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Calcule su Retorno de Inversión</h2>
          <p className="text-[var(--muted)] text-lg">
            Descubra cuánto puede ahorrar su iglesia con KHESED-TEK
          </p>
        </div>
        <ROICalculator 
          language="es" 
          market="LATAM" 
          showDetailed={true}
          className="max-w-4xl mx-auto"
        />
      </section>

      {/* About Section - Nosotros */}
      <section id="about" className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6">Sobre KHESED-TEK SYSTEMS</h2>
        <div style={{ color: 'var(--muted)' }} className="text-lg mb-8 space-y-4">
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
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">50+</div>
            <div className="text-sm text-[var(--muted)]">Iglesias atendidas en Colombia</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">5+</div>
            <div className="text-sm text-[var(--muted)]">Años especializados en iglesias</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">24/7</div>
            <div className="text-sm text-[var(--muted)]">Soporte en español</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection 
        autoRotate={true}
        showMetrics={true}
        variant="carousel"
        className="bg-[var(--surface)]"
      />

      {/* Local Contact Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-2">Conversemos sobre tu iglesia</h2>
        <p style={{ color: 'var(--muted)' }} className="mb-8">
          Nuestro equipo en Barranquilla está listo para ayudarte a transformar tu ministerio
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4">▣ Contacto directo</h3>
            <div className="space-y-2 text-sm">
              <div>✉ soporte@khesed-tek-systems.org</div>
              <div>▣ +57 302 123 4410 (WhatsApp)</div>
              <div>◗ Barranquilla, Atlántico, Colombia</div>
              <div>● Lunes a Viernes 8AM - 6PM (COT)</div>
            </div>
          </div>
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4">◆ Demo personalizada</h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div>✓ Demostración adaptada a tu iglesia</div>
              <div>✓ Análisis de necesidades sin costo</div>
              <div>✓ Plan de implementación personalizado</div>
              <div>✓ Acompañamiento en tu zona horaria</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}